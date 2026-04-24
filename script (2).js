document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Theme Toggle (Dark / Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Check local storage for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================
  // Parallax Scroll Effect
  // ==========================================
  const parallaxLayers = document.querySelectorAll('.layer');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxLayers.forEach(layer => {
      const speed = layer.getAttribute('data-speed');
      const yPos = -(scrollY * speed / 10);
      layer.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ==========================================
  // Navbar Scroll State
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // Scroll Reveal Animation (Intersection Observer)
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

});
