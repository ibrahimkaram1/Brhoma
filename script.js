/* ========================================
   APEX LANDING PAGE — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link highlight
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinksList.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  const animateElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach(el => observer.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuart(progress);
          el.textContent = Math.round(target * easedProgress);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');

  if (form) {
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending...';

      setTimeout(() => {
        if (formSuccess) formSuccess.classList.add('show');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Send Message';

        setTimeout(() => {
          if (formSuccess) formSuccess.classList.remove('show');
        }, 5000);

      }, 1200);
    });
  }

  // ===== SMOOTH SCROLL for all anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // ADVANCED UI / UX ENHANCEMENTS
  // ==========================================

  // 1. CUSTOM CURSOR
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let ringX = mouseX;
  let ringY = mouseY;

  // Track mouse movement
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows exactly
    if (cursorDot) {
      cursorDot.style.opacity = '1';
      cursorDot.style.display = 'flex'; // Ensure Flex layout for SVG alignment
      cursorDot.style.transform =
        `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }
  });

  // Smooth ring animation
  function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.transform =
        `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
  // Smooth ring animation
  function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.transform =
        `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  // Add hover state to interactive elements
  const interactives = document.querySelectorAll('a, button, .portfolio-card, .feature-card, .about-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // 2. TYPING EFFECT (Hero Subtitle)
  const typingSpan = document.getElementById('typing-text');
  if (typingSpan) {
    const roles = ["Front-End Developer", "Back-End Developer", "Flutter Developer", "UI/UX Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // faster delete
      } else {
        typingSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // normal type speed
      }

      // Check boundaries
      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next
      }

      setTimeout(typeEffect, typingSpeed);
    }
    // Start typing effect
    setTimeout(typeEffect, 1000);
  }

  // 3. 3D TILT EFFECT & 4. GLOWING BORDERS (Mouse Tracking)
  const tiltCards = document.querySelectorAll('.about-card, .feature-card, .portfolio-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.

      // Update custom properties for glowing borders
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculations
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5; // max rotation degrees
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      // Reset tilt strictly
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // 5. MAGNETIC BUTTONS
  const magneticBtns = document.querySelectorAll('.btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Pull button towards cursor slightly
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

});
