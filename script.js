document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const STORAGE_KEY = 'theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  /* ===== Modo oscuro ===== */
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark', isDark);
    themeIcon.classList.toggle('fa-moon', !isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
    toggleBtn.setAttribute('aria-pressed', String(isDark));
    toggleBtn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function storeTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* almacenamiento no disponible */ }
  }

  // Preferencia guardada > preferencia del sistema
  const saved = getStoredTheme();
  applyTheme(saved ? saved : (media.matches ? 'dark' : 'light'));

  toggleBtn.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    storeTheme(newTheme);
  });

  // Sigue el cambio del sistema solo si el usuario no eligió manualmente
  const onSystemChange = (e) => {
    if (!getStoredTheme()) applyTheme(e.matches ? 'dark' : 'light');
  };
  if (media.addEventListener) media.addEventListener('change', onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);

  /* ===== Smooth scroll en el navbar ===== */
  const navLinks = document.querySelectorAll('.navbar a.nav-link[href^="#"], .navbar-brand[href^="#"]');
  const navCollapse = document.getElementById('navMenu');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', link.getAttribute('href'));

      // Cierra el menú en móvil
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  /* ===== Formulario de contacto (simulado) ===== */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    alert('¡Mensaje enviado! 📧');
    form.reset();
    form.classList.remove('was-validated');
  });
});