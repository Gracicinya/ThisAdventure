/* ================================================================
THE SHATTERED CROWN — main.js
Shared JS loaded on every page.
Handles: 
    -theme toggle, 
    -hamburger nav,
    -back-to-top button,
    -Fade in on scroll, 
    -FAQ accordion, 
    -countdown timer 
    -newsletter form 
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
Uses WorldTimeAPI to get accurate UTC time regardless of the
visitor's device clock. Falls back to Date.now() if the API
is unavailable.
================================================================ */
(function initCountdown() {
    const daysEl    = document.getElementById('days');
    const hoursEl   = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');

    /* Exit immediately if not on the contact page */
    if (!daysEl || !hoursEl || !minutesEl) return;

    /* Target release: 1 December 2026, midnight UTC */
    const RELEASE = new Date('2026-12-01T00:00:00Z');

    /* Calculate and display time remaining given a Date object for "now" */
    function render(now) {
        const diff = RELEASE - now;

        if (diff <= 0) {
            /* Release has passed — show zeroes */
            daysEl.textContent    = '000';
            hoursEl.textContent   = '00';
            minutesEl.textContent = '00';
            return;
        }

        const totalMinutes = Math.floor(diff / 60000);
        const totalHours   = Math.floor(totalMinutes / 60);
        const days         = Math.floor(totalHours / 24);
        const hours        = totalHours % 24;
        const minutes      = totalMinutes % 60;

        /* padStart ensures numbers always have the right number of digits
           e.g. 7 days → '007', 3 hours → '03' */
        daysEl.textContent    = String(days).padStart(3, '0');
        hoursEl.textContent   = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
    }

    /* Fetch the real current UTC time from WorldTimeAPI.
       Returns a Date object — falls back to device clock on any error. */
    async function fetchNow() {
        try {
            const response = await fetch('https://worldtimeapi.org/api/timezone/UTC');
            if (!response.ok) throw new Error('API response was not OK');
            const data = await response.json();
            return new Date(data.datetime); /* accurate server time */
        } catch {
            return new Date(); /* fallback: use device clock */
        }
    }

    /* On load: call the API, render immediately, then tick every 60s
       using an offset so we stay accurate without re-calling the API */
    fetchNow().then(function (apiNow) {
        const deviceAtFetch = Date.now(); /* record device time at API response */
        render(apiNow);                   /* display immediately */

        setInterval(function () {
            const elapsed   = Date.now() - deviceAtFetch;     /* ms since API call */
            const corrected = new Date(apiNow.getTime() + elapsed); /* API time + elapsed */
            render(corrected);
        }, 60_000); /* update every 60 seconds */
    });

}());

/* ================================================================
   NEWSLETTER FORM
   Handles the simpler newsletter sign-up (not the full contact form).
================================================================ */

(function initNewsletter() {
    const submitBtn  = document.getElementById('nl-submit');
    const emailInput = document.getElementById('nl-email');
    const errorEl    = document.getElementById('nl-error');
    const successEl  = document.getElementById('newsletter-success');
    const wrapEl     = document.getElementById('newsletter-wrap');

    if (!submitBtn || !emailInput) return;

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    submitBtn.addEventListener('click', async function () {
        const val = emailInput.value.trim();

        if (!emailRe.test(val)) {
            if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
            emailInput.focus();
            return;
        }

        if (errorEl) errorEl.textContent = '';

        /* Simulate async send */
        submitBtn.disabled   = true;
        submitBtn.textContent = 'Joining…';
        await new Promise(resolve => setTimeout(resolve, 800));

        /* Show success */
        if (wrapEl)     wrapEl.hidden   = true;
        if (successEl)  successEl.hidden = false;
    });

    /* Clear error on input */
    emailInput.addEventListener('input', function () {
        if (errorEl) errorEl.textContent = '';
    });
}());

/* ================================================================
   FADE-IN ON SCROLL
   Adds .visible to .fade-in elements when they enter the viewport.
   
================================================================ */

(function initFadeIn() {
    const targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px", }
    );

    targets.forEach((el) => observer.observe(el));
}());
/* ================================================================
THE SHATTERED CROWN — main.js
Shared JS loaded on every page.
Handles: 
    -theme toggle, 
    -hamburger nav,
    -back-to-top button,
    -Fade in on scroll, 
    -FAQ accordion, 
    -countdown timer 
    -newsletter form 
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
Uses WorldTimeAPI to get accurate UTC time regardless of the
visitor's device clock. Falls back to Date.now() if the API
is unavailable.
================================================================ */
(function initCountdown() {
    const daysEl    = document.getElementById('days');
    const hoursEl   = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');

    /* Exit immediately if not on the contact page */
    if (!daysEl || !hoursEl || !minutesEl) return;

    /* Target release: 1 December 2026, midnight UTC */
    const RELEASE = new Date('2026-12-01T00:00:00Z');

    /* Calculate and display time remaining given a Date object for "now" */
    function render(now) {
        const diff = RELEASE - now;

        if (diff <= 0) {
            /* Release has passed — show zeroes */
            daysEl.textContent    = '000';
            hoursEl.textContent   = '00';
            minutesEl.textContent = '00';
            return;
        }

        const totalMinutes = Math.floor(diff / 60000);
        const totalHours   = Math.floor(totalMinutes / 60);
        const days         = Math.floor(totalHours / 24);
        const hours        = totalHours % 24;
        const minutes      = totalMinutes % 60;

        /* padStart ensures numbers always have the right number of digits
           e.g. 7 days → '007', 3 hours → '03' */
        daysEl.textContent    = String(days).padStart(3, '0');
        hoursEl.textContent   = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
    }

    /* Fetch the real current UTC time from WorldTimeAPI.
       Returns a Date object — falls back to device clock on any error. */
    async function fetchNow() {
        try {
            const response = await fetch('https://worldtimeapi.org/api/timezone/UTC');
            if (!response.ok) throw new Error('API response was not OK');
            const data = await response.json();
            return new Date(data.datetime); /* accurate server time */
        } catch {
            return new Date(); /* fallback: use device clock */
        }
    }

    /* On load: call the API, render immediately, then tick every 60s
       using an offset so we stay accurate without re-calling the API */
    fetchNow().then(function (apiNow) {
        const deviceAtFetch = Date.now(); /* record device time at API response */
        render(apiNow);                   /* display immediately */

        setInterval(function () {
            const elapsed   = Date.now() - deviceAtFetch;     /* ms since API call */
            const corrected = new Date(apiNow.getTime() + elapsed); /* API time + elapsed */
            render(corrected);
        }, 60_000); /* update every 60 seconds */
    });

}());

/* ================================================================
   NEWSLETTER FORM
   Handles the simpler newsletter sign-up (not the full contact form).
================================================================ */

(function initNewsletter() {
    const submitBtn  = document.getElementById('nl-submit');
    const emailInput = document.getElementById('nl-email');
    const errorEl    = document.getElementById('nl-error');
    const successEl  = document.getElementById('newsletter-success');
    const wrapEl     = document.getElementById('newsletter-wrap');

    if (!submitBtn || !emailInput) return;

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    submitBtn.addEventListener('click', async function () {
        const val = emailInput.value.trim();

        if (!emailRe.test(val)) {
            if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
            emailInput.focus();
            return;
        }

        if (errorEl) errorEl.textContent = '';

        /* Simulate async send */
        submitBtn.disabled   = true;
        submitBtn.textContent = 'Joining…';
        await new Promise(resolve => setTimeout(resolve, 800));

        /* Show success */
        if (wrapEl)     wrapEl.hidden   = true;
        if (successEl)  successEl.hidden = false;
    });

    /* Clear error on input */
    emailInput.addEventListener('input', function () {
        if (errorEl) errorEl.textContent = '';
    });
}());

/* ================================================================
   FADE-IN ON SCROLL
   Adds .visible to .fade-in elements when they enter the viewport.
   
================================================================ */

(function initFadeIn() {
    const targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px", }
    );

    targets.forEach((el) => observer.observe(el));
}());