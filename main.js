/* ================================================================
   THE SHATTERED CROWN — main.js
   Shared JS loaded on every page.
   Handles: theme toggle, hamburger nav,
            back-to-top button, FAQ accordion, countdown timer.
   ================================================================ */


/* ================================================================
   THEME TOGGLE
   Reads saved preference from localStorage on load.
   Toggles data-theme="dark" on <html> and updates the button icon.
   ================================================================ */

const themeToggle = document.getElementById('themeToggle');

/**
 * Apply a theme ('light' or 'dark') to the document
 * and persist it so the preference survives page reloads.
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('scTheme', theme);

  /* Update button icon to reflect the opposite (next) state */
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
}

/**
 * Toggle between light ↔ dark.
 * Called by the theme button's onclick (or event listener below).
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* Restore saved theme on every page load */
(function initTheme() {
  const saved = localStorage.getItem('scTheme') || 'light';
  applyTheme(saved);
}());

/* Wire up the toggle button */
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}


/* ================================================================
   HAMBURGER MENU
   Toggles .open on both the hamburger button and .nav-links,
   turning the link list into a dropdown panel on mobile.
   Closes when a link is tapped or the user clicks outside.
   ================================================================ */

const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

function openMenu() {
  hamburger.classList.add('open');
  navLinks.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
}

if (hamburger) {
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', toggleMenu);
}

/* Close menu when any nav link is tapped */
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* Close menu on outside click */
document.addEventListener('click', function (e) {
  if (navLinks && navLinks.classList.contains('open')) {
    const navbar = document.getElementById('navbar');
    if (!navbar.contains(e.target)) {
      closeMenu();
    }
  }
});


/* ================================================================
   ACTIVE NAV LINK
   Marks the <a> whose href matches the current page filename.
   Works for both .nav-links and .mobile-nav.
   ================================================================ */
(function setActiveNav() {
  /* Get just the filename (e.g. "contact.html" or "" for index) */
  const current = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}());

/* Back to Top Button Functionality*/
const backToTopBtn = document.getElementById("backToTop");

// Show or hide the button based on scroll position //
function handleScroll() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Scroll to top of page //
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

window.addEventListener('scroll', handleScroll);
backToTopBtn.addEventListener('click', scrollToTop);

/* ================================================================
   FAQ ACCORDION
   Toggles .open on .faq-item when its .faq-question button
   is clicked. Closes all other open items (single-open behaviour).
   ================================================================ */
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      /* Close all items first */
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      /* Open clicked item (unless it was already open) */
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });

    /* Keyboard: Enter/Space also toggles */
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}());


/* ================================================================
   COUNTDOWN TIMER (contact page only)
   Targets #days, #hours, #minutes elements.
   Counts down to the estimated release date: 1 December 2026.
   ================================================================ */
(function initCountdown() {
  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');

  /* Only run if the countdown elements exist on this page */
  if (!daysEl || !hoursEl || !minutesEl) return;

  /* Target release: Winter 2026 — set to December 1, 2026 */
  const RELEASE = new Date('2026-12-01T00:00:00');

  function update() {
    const now  = new Date();
    const diff = RELEASE - now; /* milliseconds remaining */

    if (diff <= 0) {
      /* Release has passed — show zeroes */
      daysEl.textContent    = '000';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours   = Math.floor(totalMinutes / 60);
    const days         = Math.floor(totalHours / 24);
    const hours        = totalHours % 24;
    const minutes      = totalMinutes % 60;

    /* Pad numbers: days → 3 digits, hours/minutes → 2 digits */
    daysEl.textContent    = String(days).padStart(3, '0');
    hoursEl.textContent   = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
  }

  update();                        /* run immediately */
  setInterval(update, 30_000);     /* refresh every 30 seconds */
}());
