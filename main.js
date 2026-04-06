const THEME_KEY = 'scTheme';

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  themeToggle.textContent = theme === 'dark' ? '\u2600' : '\u263D';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeIcon(theme);
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_KEY) || document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');

  if (!hamburger || !navLinks || !navbar) return;

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  };

  hamburger.setAttribute('aria-expanded', 'false');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.classList.contains('open')) return;
    if (!navbar.contains(event.target)) {
      closeMenu();
    }
  });
}

function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let visible = false;

  const showCursor = () => {
    if (visible) return;
    visible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  };

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    showCursor();
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    visible = false;
  });

  const hoverTargets = 'a, button, input, textarea, label, select, .faq-question, .lore-header, .btn';
  document.querySelectorAll(hoverTargets).forEach((element) => {
    element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  function animate() {
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }

  animate();
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  const handleScroll = () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  };

  window.addEventListener('scroll', handleScroll);
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  handleScroll();
}

function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((entry) => {
        entry.classList.remove('open');
        entry.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');

  if (!daysEl || !hoursEl || !minutesEl || document.getElementById('seconds')) return;

  const releaseDate = new Date('2026-12-01T00:00:00Z');

  function render(now) {
    const diff = releaseDate - now;

    if (diff <= 0) {
      daysEl.textContent = '000';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      return;
    }

    const totalMinutes = Math.floor(diff / 60000);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    daysEl.textContent = String(days).padStart(3, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
  }

  async function fetchNow() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/UTC');
      if (!response.ok) {
        throw new Error('Unable to fetch current time.');
      }
      const data = await response.json();
      return new Date(data.datetime);
    } catch {
      return new Date();
    }
  }

  fetchNow().then((apiNow) => {
    const deviceAtFetch = Date.now();
    render(apiNow);

    setInterval(() => {
      const elapsed = Date.now() - deviceAtFetch;
      render(new Date(apiNow.getTime() + elapsed));
    }, 60000);
  });
}

function initNewsletter() {
  const submitBtn = document.getElementById('nl-submit');
  const emailInput = document.getElementById('nl-email');
  const errorEl = document.getElementById('nl-error');
  const successEl = document.getElementById('newsletter-success');
  const wrapEl = document.getElementById('newsletter-wrap');

  if (!submitBtn || !emailInput) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  submitBtn.addEventListener('click', async () => {
    const value = emailInput.value.trim();

    if (!emailRe.test(value)) {
      if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }

    if (errorEl) errorEl.textContent = '';

    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (wrapEl) wrapEl.hidden = true;
    if (successEl) successEl.hidden = false;

    submitBtn.disabled = false;
    submitBtn.textContent = 'Join the Journey';
  });

  emailInput.addEventListener('input', () => {
    if (errorEl) errorEl.textContent = '';
  });
}

function initFadeIn() {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  targets.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHamburgerMenu();
  initCustomCursor();
  initBackToTop();
  initFAQ();
  initCountdown();
  initNewsletter();
  initFadeIn();
});
