/* ================================================================
THE SHATTERED CROWN — main.js
Shared JS loaded on every page.
Handles: theme toggle, hamburger nav,
        back-to-top button, FAQ accordion, countdown timer.
================================================================ */


/* ================================================================
THEME TOGGLE
================================================================ */

const themeToggle = document.getElementById('themeToggle');

/**
 * Apply a theme ('light' or 'dark') to the document
 */
/* ? is a shorter way of writing if/else
    condition ? valueIfTrue : valueIfFalse */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('scTheme', theme);

  /* Update button icon to the next state */
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
    }
}

/**
 * Toggle between light and dark.
 **/
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
}

/* Restore saved theme on every page load */
const saved = localStorage.getItem('scTheme') || 'light';
applyTheme(saved);

/* Wire up the toggle button */
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}


/* ================================================================
HAMBURGER MENU
Toggles .open turning the link list into a dropdown panel on mobile.
Closes when a link is tapped or the user clicks outside.
================================================================ */

const hamburger = document.querySelector('#hamburger');
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
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
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
    const navbar = document.getElementById('navbar');
    document.addEventListener('click', function (e) {
        if (navLinks && navLinks.classList.contains('open')) {
            if (!navbar.contains(e.target)) {
            closeMenu();
        }
    }
});


/* ================================================================
BACK TO TOP BUTTON
================================================================ */

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
is clicked. Closes all other open items.
   ================================================================ */
/*IIFE Immediately Invoked Function Expression - runs as soon as the script is loaded */
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

      /* Open clicked item */
        if (!isOpen) {
            item.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
        }
    });

    });
}());



/* ================================================================
COUNTDOWN TIMER (contact page only)
Targets #days, #hours, #minutes.
Counts down to the estimated release date: 1 December 2026.
================================================================ */
(function initCountdown() {
    const daysEl    = document.getElementById('days');
    const hoursEl   = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');

  /* Only run if the countdown elements exist on this page. So it only runs on the contact page */
    if (!daysEl || !hoursEl || !minutesEl) return;

  /* Target release: Winter 2026 — set to December 1, 2026 */
    const RELEASE = new Date('2026-12-01T00:00:00Z');

    function update() {
        const diff = RELEASE - Date.now(); /* milliseconds remaining */

        if (diff <= 0) {
            /* Release has passed — show zeroes */
            daysEl.textContent    = '000';
            hoursEl.textContent   = '00';
            minutesEl.textContent = '00';
            return;
        }

        /* Calculate remaining time AI assisted*/
        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours   = Math.floor(totalMinutes / 60);
        const days         = Math.floor(totalHours / 24);
        const hours        = totalHours % 24;
        const minutes      = totalMinutes % 60;

        daysEl.textContent    = String(days).padStart(3, '0');
        hoursEl.textContent   = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
    }

  update();                        /* run immediately */
  setInterval(update, 30_000);     /* refresh every 30 seconds */
}());
