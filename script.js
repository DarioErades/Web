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

  const typedEl = document.getElementById('typed');
  const phrases = [
    'Java Developer',
    'Estudiante de Ingeniería Informática',
    'Creador de bots para +25K usuarios',
    'Backend Engineer',
    'Resolvedor de problemas'
  ];
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
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card').forEach(el => skillObs.observe(el));

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
      el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
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
