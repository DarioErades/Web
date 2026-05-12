const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'analytics.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Tabla de visitas
    db.run(`CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_hash TEXT,
        country TEXT,
        path TEXT,
        user_agent TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Tabla de admins
    db.run(`CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT
    )`, () => {
        // Creamos un admin por defecto si no existe (admin/admin)
        const username = 'admin';
        const pass = 'admin';
        const hash = bcrypt.hashSync(pass, 10);
        
        db.run(`INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)`, [username, hash]);
    });
});

module.exports = db;
