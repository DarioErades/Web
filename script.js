(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const dot = document.querySelector('.cursor-dot');
  let mx = 0, my = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });

  document.querySelectorAll('a, button, .magnetic, [data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
  });

  const nav = document.getElementById('nav');
  const progress = document.querySelector('.progress-bar__fill');

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (y / h * 100) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // --- Internationalization ---
  const translations = {
    es: {
      "nav-about": "Sobre mí",
      "nav-skills": "Skills",
      "nav-projects": "Proyectos",
      "nav-contact": "Contacto",
      "hero-tagline": "Disponible para proyectos",
      "hero-description": "Construyendo software robusto en <strong>Java</strong> desde hace <strong>5 años</strong>. Estudiante de Ingeniería Informática, creador de bots usados por más de <strong>+20k personas</strong> y colaborador con creadores de contenido de más de <strong>+650k suscriptores</strong>.",
      "hero-btn-projects": "Ver proyectos",
      "hero-btn-contact": "Hablemos",
      "hero-scroll": "Scroll",
      "stat-experience": "años de experiencia",
      "stat-users": "usuarios alcanzados",
      "stat-audience": "audiencia colaborada",
      "about-tag": "01 — Sobre mí",
      "about-title": "Especialista en backend <span class=\"gradient-text\">y soluciones escalables.</span>",
      "about-description": "<p>Soy <strong>Darío Erades</strong>, estudiante de <strong>Ingeniería Informática</strong> y desarrollador con <strong>5 años de experiencia</strong> centrado en el ecosistema Java. Me apasiona construir sistemas bien diseñados que escalan y soportan miles de usuarios sin parpadear.</p><p>He desarrollado infraestructura para <strong>comunidades de Discord de más de +20k miembros</strong>, y he colaborado con <strong>youtubers de más de +650k suscriptores</strong> creando bots, automatizaciones y herramientas internas a medida.</p><p>Disfruto resolviendo problemas difíciles, aprendiendo nuevas tecnologías y dejando el código mejor de como lo encontré.</p>",
      "skills-tag": "02 — Stack",
      "skills-title": "Herramientas que <span class=\"gradient-text\">domino.</span>",
      "skill-java": "Lenguaje principal. POO, concurrencia, JVM y mejores prácticas modernas.",
      "skill-spring": "APIs REST, inyección de dependencias, seguridad y microservicios.",
      "skill-discord": "Bots escalables para comunidades grandes, slash commands y eventos.",
      "skill-python": "Automatizaciones, scripting, scraping y herramientas internas.",
      "skill-js": "Frontend dinámico, Node.js, integraciones y APIs en tiempo real.",
      "skill-csharp": "Desarrollo de aplicaciones, plugins y mods para videojuegos.",
      "skill-sql": "MySQL, PostgreSQL, MariaDB. Modelado relacional y optimización de consultas.",
      "skill-nosql": "MongoDB, Redis. Caching, almacenamiento de documentos y datos en tiempo real.",
      "skill-bash": "Automatización de tareas, despliegues, cron jobs y mantenimiento de servidores.",
      "skill-linux": "Administración avanzada de servidores Linux: systemd, nginx, hardening, backups, monitorización 24/7.",
      "skill-networks": "TCP/IP, DNS, VPN, firewalls (iptables/nftables), proxies inversos y troubleshooting.",
      "skill-docker": "Contenedores, despliegue continuo, orquestación y arquitecturas reproducibles.",
      "skill-apis": "REST, WebSockets, webhooks y arquitecturas event-driven con servicios de terceros.",
      "skill-security": "Autenticación, JWT, OAuth2, hashing, hardening de servidores y buenas prácticas OWASP.",
      "skill-git": "Control de versiones avanzado, GitHub Actions, pipelines y flujos colaborativos.",
      "exp-tag": "03 — Trayectoria",
      "exp-title": "5 años <span class=\"gradient-text\">construyendo.</span>",
      "exp-date-1": "2025 — Actualidad",
      "exp-role-1": "Desarrollador principal · Discord de KPI",
      "exp-desc-1": "Empecé como desarrollador principal del Discord de <strong>KPI</strong>, una comunidad de más de +20k miembros. Arquitectura y mantenimiento de un bot completo con base de datos, panel web, sistema de niveles, moderación, economía y analítica en tiempo real.",
      "exp-date-2": "2023 — Actualidad",
      "exp-role-2": "Ingeniería Informática",
      "exp-desc-2": "Formación universitaria en algoritmia, estructuras de datos, sistemas operativos, redes y arquitectura de software.",
      "exp-date-3": "2022 — Actualidad",
      "exp-role-3": "Desarrollador principal · Canales +650K subs",
      "exp-desc-3": "Desarrollador principal para canales de YouTube con audiencias de más de +650k suscriptores: bots a medida, herramientas internas, integraciones con APIs externas y dashboards privados usados a diario por sus equipos.",
      "exp-role-4": "Primer proyecto serio en Java",
      "exp-desc-4": "El comienzo de un camino: aprender bien las bases, romper cosas, arreglarlas, repetir.",
      "tag-java": "Java",
      "tag-sql": "SQL",
      "tag-webpanel": "Panel Web",
      "tag-concurrency": "Concurrencia",
      "tag-algos": "Algoritmos",
      "tag-systems": "Sistemas",
      "tag-networks": "Redes",
      "tag-apis": "APIs",
      "tag-backend": "Backend",
      "tag-learning": "Aprendizaje",
      "projects-tag": "03 — Trabajos",
      "projects-title": "Proyectos <span class=\"gradient-text\">destacados.</span>",
      "project-desc-1": "Bot completo desarrollado para el Discord de KPI (+20k miembros). Incluye base de datos robusta, panel web de administración, sistema de niveles, moderación automática, economía, analítica en tiempo real e integraciones con APIs externas. Funcionando 24/7.",
      "project-title-2": "Sistema de Licencias",
      "project-desc-2": "Plataforma de gestión de licencias con <strong>panel web</strong> completo y control integrado desde <strong>Discord</strong>. Generación, validación, revocación y monitorización de claves en tiempo real, con autenticación, logs y métricas de uso.",
      "project-title-3": "Plugins privados para videojuegos",
      "project-desc-3": "Desarrollo a medida de plugins y modificaciones privadas para videojuegos: mecánicas personalizadas, integraciones con backends externos, sistemas anti-cheat y herramientas internas para staff. Trabajos confidenciales bajo NDA.",
      "project-title-4": "Más en mi GitHub",
      "project-desc-4": "Experimentos, librerías, proyectos open source y herramientas. Todo lo que hago públicamente lo encuentras en mi perfil de GitHub.",
      "tag-opensource": "Open Source",
      "tag-more": "Más...",
      "contact-tag": "04 — Contacto",
      "contact-title": "¿Tienes una idea?<br/> <span class=\"gradient-text\">Hagámosla realidad.</span>",
      "contact-name": "Tu nombre",
      "contact-email": "Tu email",
      "contact-subject": "Asunto",
      "contact-message": "¿En qué puedo ayudarte?",
      "contact-send": "Enviar mensaje",
      "contact-direct": "O si lo prefieres:",
      "contact-instruction": "Rellena el formulario y te contactaré lo antes posible.",
      "footer-made": "Hecho con <em>café</em> y Java ☕",
      "phrases": [
        'Desarrollador Java',
        'Estudiante de Ingeniería Informática',
        'Creador de bots para +20K usuarios',
        'Ingeniero de Backend',
        'Resolvedor de problemas'
      ]
    },
    en: {
      "nav-about": "About",
      "nav-skills": "Skills",
      "nav-projects": "Projects",
      "nav-contact": "Contact",
      "hero-tagline": "Available for projects",
      "hero-description": "Building robust software in <strong>Java</strong> for <strong>5 years</strong>. Computer Engineering student, creator of bots used by more than <strong>+20k people</strong> and collaborator with content creators with more than <strong>+650k subscribers</strong>.",
      "hero-btn-projects": "View projects",
      "hero-btn-contact": "Let's talk",
      "hero-scroll": "Scroll",
      "stat-experience": "years of experience",
      "stat-users": "users reached",
      "stat-audience": "collaborated audience",
      "about-tag": "01 — About me",
      "about-title": "Curious by nature, <span class=\"gradient-text\">engineer by vocation.</span>",
      "about-description": "<p>I'm <strong>Darío Erades</strong>, a <strong>Computer Engineering</strong> student and developer with <strong>5 years of experience</strong> focused on the Java ecosystem. I am passionate about building well-designed systems that scale and support thousands of users without blinking.</p><p>I have developed infrastructure for <strong>Discord communities of more than +20k members</strong>, and have collaborated with <strong>youtubers with more than +650k subscribers</strong> creating custom bots, automations and internal tools.</p><p>I enjoy solving difficult problems, learning new technologies and leaving the code better than I found it.</p>",
      "skills-tag": "02 — Stack",
      "skills-title": "Tools I <span class=\"gradient-text\">master.</span>",
      "skill-java": "Core language. OOP, concurrency, JVM and modern best practices.",
      "skill-spring": "REST APIs, dependency injection, security and microservices.",
      "skill-discord": "Scalable bots for large communities, slash commands and events.",
      "skill-python": "Automations, scripting, scraping and internal tools.",
      "skill-js": "Dynamic frontend, Node.js, integrations and real-time APIs.",
      "skill-csharp": "Application development, plugins and mods for video games.",
      "skill-sql": "MySQL, PostgreSQL, MariaDB. Relational modeling and query optimization.",
      "skill-nosql": "MongoDB, Redis. Caching, document storage and real-time data.",
      "skill-bash": "Task automation, deployments, cron jobs and server maintenance.",
      "skill-linux": "Advanced Linux server administration: systemd, nginx, hardening, backups, 24/7 monitoring.",
      "skill-networks": "TCP/IP, DNS, VPN, firewalls (iptables/nftables), reverse proxies and troubleshooting.",
      "skill-docker": "Containers, continuous deployment, orchestration and reproducible architectures.",
      "skill-apis": "REST, WebSockets, webhooks and event-driven architectures with third-party services.",
      "skill-security": "Authentication, JWT, OAuth2, hashing, server hardening and OWASP best practices.",
      "skill-git": "Advanced version control, GitHub Actions, pipelines and collaborative flows.",
      "exp-tag": "03 — Journey",
      "exp-title": "5 years <span class=\"gradient-text\">building.</span>",
      "exp-date-1": "2025 — Present",
      "exp-role-1": "Lead Developer · KPI Discord",
      "exp-desc-1": "Started as lead developer for <strong>KPI</strong> Discord, a community of over +20k members. Architecture and maintenance of a complete bot with database, web panel, level system, moderation, economy and real-time analytics.",
      "exp-date-2": "2023 — Present",
      "exp-role-2": "Computer Engineering",
      "exp-desc-2": "University training in algorithms, data structures, operating systems, networks and software architecture.",
      "exp-date-3": "2022 — Present",
      "exp-role-3": "Lead Developer · Channels +650K subs",
      "exp-desc-3": "Lead developer for YouTube channels with audiences of over +650k subscribers: custom bots, internal tools, integrations with external APIs and private dashboards used daily by their teams.",
      "exp-role-4": "First serious project in Java",
      "exp-desc-4": "The beginning of a path: learning the basics well, breaking things, fixing them, repeating.",
      "tag-java": "Java",
      "tag-sql": "SQL",
      "tag-webpanel": "Web Panel",
      "tag-concurrency": "Concurrency",
      "tag-algos": "Algorithms",
      "tag-systems": "Systems",
      "tag-networks": "Networks",
      "tag-apis": "APIs",
      "tag-backend": "Backend",
      "tag-learning": "Learning",
      "projects-tag": "03 — Works",
      "projects-title": "Featured <span class=\"gradient-text\">projects.</span>",
      "project-desc-1": "Complete bot developed for KPI Discord (+20k members). Includes robust database, web administration panel, level system, automatic moderation, economy, real-time analytics and integrations with external APIs. Running 24/7.",
      "project-title-2": "License System",
      "project-desc-2": "License management platform with a complete <strong>web panel</strong> and integrated control from <strong>Discord</strong>. Real-time key generation, validation, revocation and monitoring, with authentication, logs and usage metrics.",
      "project-title-3": "Private Game Plugins",
      "project-desc-3": "Custom development of plugins and private modifications for video games: custom mechanics, integrations with external backends, anti-cheat systems and internal tools for staff. Confidential work under NDA.",
      "project-title-4": "More on my GitHub",
      "project-desc-4": "Experiments, libraries, open source projects and tools. Everything I do publicly can be found on my GitHub profile.",
      "tag-opensource": "Open Source",
      "tag-more": "More...",
      "contact-tag": "04 — Contact",
      "contact-title": "Have an idea?<br/> <span class=\"gradient-text\">Let's make it real.</span>",
      "contact-name": "Your name",
      "contact-email": "Your email",
      "contact-subject": "Subject",
      "contact-message": "How can I help you?",
      "contact-send": "Send message",
      "contact-direct": "Or if you prefer:",
      "contact-instruction": "Fill out the form and I will contact you as soon as possible.",
      "footer-made": "Made with <em>coffee</em> and Java ☕",
      "phrases": [
        'Java Developer',
        'Computer Engineering Student',
        'Bot Creator for +20K users',
        'Backend Engineer',
        'Problem Solver'
      ]
    }
  };

  let currentLang = localStorage.getItem('lang') || 'es';
  let phrases = translations[currentLang].phrases;

  const updateContent = () => {
    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) el.placeholder = t[key];
    });

    // Update nav hover attributes
    document.querySelectorAll('.nav__links a').forEach(a => {
      const key = a.getAttribute('data-i18n');
      if (t[key]) a.setAttribute('data-text', t[key]);
    });

    phrases = t.phrases;
    document.getElementById('lang-toggle').textContent = currentLang.toUpperCase();
    document.documentElement.lang = currentLang;
  };

  document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', currentLang);
    updateContent();
    // Restart typed animation index to avoid confusion
    pi = 0; ci = 0;
  });

  // --- Theme Management ---
  const themeToggle = document.getElementById('theme-toggle');
  let isDark = localStorage.getItem('theme') !== 'light';

  const updateTheme = () => {
    document.body.classList.toggle('light-mode', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    updateTheme();
  });

  // Initialize
  updateContent();
  updateTheme();

  // --- Rest of the script ---
  const typedEl = document.getElementById('typed');
  let pi = 0, ci = 0, deleting = false;

  const type = () => {
    const phrase = phrases[pi];
    if (!deleting) {
      typedEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; return setTimeout(type, 1800); }
    } else {
      typedEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 35 : 70);
  };
  setTimeout(type, 1200);

  // Animación de contadores con Pin (parar scroll de la página)
  gsap.to({}, {
    scrollTrigger: {
      trigger: '.hero', // Usamos el hero como base para el pin si los stats están dentro
      start: 'bottom 100%',
      end: '+=1000',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        // Actualizamos los números basado en el progreso del scrollTrigger
        document.querySelectorAll('.stat__num').forEach(el => {
          const target = +el.dataset.count;
          el.textContent = Math.floor(self.progress * target);
        });
      }
    }
  });

  // Skills revertidas al comportamiento original (Intersection Observer)
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        e.target.classList.add('visible');
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card').forEach(el => skillObs.observe(el));

  // Animación de proyectos entrando desde la derecha
  document.querySelectorAll('.project').forEach((project) => {
    gsap.from(project, {
      scrollTrigger: {
        trigger: project,
        start: 'top 92%',
        end: 'top 70%',
        scrub: 1,
        // Al usar scrub, la animación se vincula directamente al scroll
      },
      x: 100,
      opacity: 0,
      ease: 'power2.out'
    });
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    const strength = 0.35;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // Manejo del formulario vía AJAX
  const form = document.querySelector('.contact__form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      status.textContent = 'Enviando...';
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          status.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
          status.className = 'success';
          form.reset();
        } else {
          status.textContent = 'Ups! Hubo un problema al enviar el mensaje.';
          status.className = 'error';
        }
      } catch (error) {
        status.textContent = 'Ups! Hubo un problema al conectar con el servidor.';
        status.className = 'error';
      }
    });
  }

  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translateY(0)';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const mouse = { x: -9999, y: -9999 };

  const resize = () => {
    W = canvas.width = window.innerWidth * window.devicePixelRatio;
    H = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    initParticles();
  };

  const initParticles = () => {
    const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4 * window.devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.4 * window.devicePixelRatio,
      r: (Math.random() * 1.6 + 0.6) * window.devicePixelRatio
    }));
  };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX * window.devicePixelRatio;
    mouse.y = e.clientY * window.devicePixelRatio;
  });

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    const maxDist = 130 * window.devicePixelRatio;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      if (d < 140 * window.devicePixelRatio) {
        const f = (140 * window.devicePixelRatio - d) / (140 * window.devicePixelRatio);
        p.x += (dx / d) * f * 1.2;
        p.y += (dy / d) * f * 1.2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(184,255,58,0.55)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dxx = p.x - q.x, dyy = p.y - q.y;
        const dd = Math.hypot(dxx, dyy);
        if (dd < maxDist) {
          const alpha = (1 - dd / maxDist) * 0.18;
          ctx.strokeStyle = `rgba(124,92,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener('resize', resize);
  draw();

  const grid = document.querySelector('.hero__grid');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight && grid) {
      grid.style.transform = `translateY(${y * 0.3}px)`;
    }
  }, { passive: true });

})();
