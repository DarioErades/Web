# 🚀 Darío Erades — Developer Portfolio

¡Bienvenido a mi portfolio personal! Soy estudiante de **Ingeniería Informática** y desarrollador centrado en el ecosistema **Java** con más de 5 años de experiencia construyendo software robusto y escalable.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" />
</p>

## ✨ Características destacadas

- **Panel de Analíticas Privado:** Un dashboard implementado en Node.js, Express y SQLite para monitorizar las visitas (países, horas, días) de forma totalmente privada y sin depender de terceros.
- **Animaciones de Scroll Avanzadas:** Implementación de GSAP y ScrollTrigger para una experiencia de navegación dinámica.
- **Pinning de Contadores:** Bloqueo inteligente del scroll vertical mientras las estadísticas de impacto (usuarios alcanzados, audiencia) crecen progresivamente.
- **Diseño Moderno:** Interfaz oscura con estética *glassmorphic*, efectos de cursor dinámicos y tipografía cuidada.
- **Contacto Directo:** Formulario funcional integrado con **Formspree** para recepción de mensajes vía AJAX sin recarga de página.

## 🛠️ Stack Tecnológico

- **Frontend:** HTML5, CSS3 (Vanilla CSS), JavaScript (ES6+), Chart.js.
- **Backend (Portfolio):** Node.js, Express, SQLite (Analytics).
- **Backend (Proyectos):** Java (Spring Boot, JDA para bots de Discord), SQL, Python.
- **Animaciones:** GSAP (GreenSock Animation Platform) + ScrollTrigger.
- **Infraestructura:** Linux Sysadmin, Docker, GitHub Actions, Nginx, PM2.

## 🚀 Despliegue Local (Panel de Analíticas)

El proyecto incluye un servidor Node.js que sirve el portfolio y recopila analíticas en una base de datos local SQLite.

```bash
# Instalar dependencias
npm install

# Iniciar servidor (por defecto en el puerto 3000)
npm start
```

El panel de administración estará disponible en `/panel`. Para modificar las credenciales por defecto, accede a la base de datos `analytics.db` o edita el script de inicialización en `database.js`.

---
Hecho con ☕ por [Darío Erades](https://github.com/DarioErades)