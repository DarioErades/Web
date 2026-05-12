const express = require('express');
const session = require('express-session');
const geoip = require('geoip-lite');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mi-secreto-super-seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Middleware de rastreo
app.use((req, res, next) => {
    // Solo rastreamos peticiones a la página principal o rutas que no sean assets estáticos
    const isStatic = /\.(css|js|svg|jpg|png|gif|ico|woff|woff2)$/.test(req.path);
    if (!isStatic && !req.path.startsWith('/api') && !req.path.startsWith('/panel') && !req.path.startsWith('/login')) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
        const geo = geoip.lookup(ip);
        const country = geo ? geo.country : 'Desconocido';
        const userAgent = req.headers['user-agent'];

        db.run(`INSERT INTO visits (ip_hash, country, path, user_agent) VALUES (?, ?, ?, ?)`, 
            [ipHash, country, req.path, userAgent], 
            (err) => {
                if (err) console.error('Error al registrar visita:', err.message);
            }
        );
    }
    next();
});

// Protección de rutas
const isAuthenticated = (req, res, next) => {
    if (req.session.adminId) return next();
    res.redirect('/login');
};

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));

// Login
app.get('/login', (req, res) => {
    if (req.session.adminId) return res.redirect('/panel');
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM admins WHERE username = ?`, [username], (err, admin) => {
        if (admin && bcrypt.compareSync(password, admin.password_hash)) {
            req.session.adminId = admin.id;
            res.redirect('/panel');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM admins WHERE username = ?`, [username], (err, admin) => {
        if (admin && bcrypt.compareSync(password, admin.password_hash)) {
            req.session.adminId = admin.id;
            res.json({ success: true, redirect: '/panel' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Panel
app.get('/panel', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'panel.html'));
});

// API para analíticas
app.get('/api/analytics', isAuthenticated, (req, res) => {
    const queries = {
        totalVisits: "SELECT COUNT(*) as count FROM visits",
        byCountry: "SELECT country, COUNT(*) as count FROM visits GROUP BY country ORDER BY count DESC",
        byDay: "SELECT strftime('%Y-%m-%d', timestamp) as day, COUNT(*) as count FROM visits GROUP BY day ORDER BY day DESC LIMIT 7",
        byHour: "SELECT strftime('%H', timestamp) as hour, COUNT(*) as count FROM visits GROUP BY hour ORDER BY hour ASC",
        recent: "SELECT country, path, timestamp FROM visits ORDER BY timestamp DESC LIMIT 10"
    };

    const results = {};
    let completed = 0;
    const totalQueries = Object.keys(queries).length;

    for (const [key, sql] of Object.entries(queries)) {
        db.all(sql, [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            results[key] = rows;
            completed++;
            if (completed === totalQueries) res.json(results);
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
