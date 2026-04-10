/* ================================================================
    THE SHATTERED CROWN — main.js
    Loaded on every page.

    Contains:
      - initThemeToggle      — light/dark mode toggle
      - initHamburgerMenu    — mobile nav open/close
      - initSmoothScroll     — smooth scrolling for anchor links
      - initCustomCursor     — animated cursor dot and ring
      - initBackToTop        — back-to-top button
      - initFadeIn           — fade-in animation on scroll
      - initFAQ              — expand/collapse FAQ accordion
      - initCountdown        — live countdown to release date
      - initNewsletter       — newsletter email signup (contact page)
      - attachEmailForm      — reusable email form handler (home page)
      - initLoreExpand       — expand/collapse lore sections (story page)
================================================================ */


/* ================================================================
   THEME TOGGLE
   Switches between light and dark mode.
   Saves the user's choice in localStorage so it is remembered
   on the next visit.
================================================================ */

/* The key name used to store the theme in localStorage */
var THEME_KEY = 'scTheme';

/* Updates the toggle button to show the icon for the opposite theme */
function updateThemeIcon(theme) {
  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  /* Show a sun icon in dark mode (click to go light), moon icon in light mode */
  if (theme === 'dark') {
    themeToggle.textContent = '\u2600'; /* sun symbol */
  } else {
    themeToggle.textContent = '\u263D'; /* moon symbol */
  }
}

/* Sets the theme on the page and saves it */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeIcon(theme);
}

function initThemeToggle() {

  /* Check for a saved theme, fall back to the page default, then fall back to dark */
  var savedTheme = localStorage.getItem(THEME_KEY)
    || document.documentElement.getAttribute('data-theme')
    || 'dark';

  applyTheme(savedTheme);

  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  /* When the button is clicked, flip to the other theme */
  themeToggle.addEventListener('click', function() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      applyTheme('light');
    } else {
      applyTheme('dark');
    }
  });
}


/* ================================================================
   HAMBURGER MENU
   Shows and hides the mobile navigation when the hamburger is clicked.
   Also closes the menu when a link is tapped or the user clicks outside.
================================================================ */
function initHamburgerMenu() {

  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks') || document.querySelector('.nav-links');
  var navbar    = document.getElementById('navbar');

  /* Stop if any of these elements are missing from the page */
  if (!hamburger || !navLinks || !navbar) return;

  /* Closes the menu and resets the button */
  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  /* Opens the menu */
  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  /* Start with the menu closed */
  hamburger.setAttribute('aria-expanded', 'false');

  /* Toggle open/closed when the hamburger button is clicked */
  hamburger.addEventListener('click', function() {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close the menu when any nav link is clicked */
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close the menu when the user clicks anywhere outside the navbar */
  document.addEventListener('click', function(event) {
    if (!navLinks.classList.contains('open')) return;
    if (!navbar.contains(event.target)) {
      closeMenu();
    }
  });
}


/* ================================================================
   SMOOTH SCROLL
   Makes links that point to a section on the same page (#section)
   scroll smoothly instead of jumping instantly.
================================================================ */
function initSmoothScroll() {

  /* Find all links that start with # */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {

    anchor.addEventListener('click', function(event) {
      var href = this.getAttribute('href');

      /* Ignore empty links like href="#" */
      if (!href || href === '#') return;

      /* Find the target section on the page */
      var target = document.querySelector(href);
      if (!target) return;

      /* Prevent the default jump and scroll smoothly instead */
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


/* ================================================================
   CUSTOM CURSOR
   Replaces the default cursor with an animated dot and ring.
   Only runs on devices with a mouse (not touchscreens).
================================================================ */
function initCustomCursor() {

  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  /* Check if the device uses touch (coarse pointer = finger) */
  var isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  /* Add a class so CSS can hide the default cursor */
  document.body.classList.add('has-custom-cursor');

  /* Only run the cursor animation on mouse devices */
  if (!isCoarse) {

    /* Track where the mouse is */
    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;

    /* The ring follows the mouse with a slight lag using these variables */
    var ringX = mouseX;
    var ringY = mouseY;

    var visible = false;

    /* Make the cursor visible when the mouse moves */
    function showCursor() {
      if (visible) return;
      visible = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }

    /* Update mouse position on every move */
    document.addEventListener('mousemove', function(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
      showCursor();
    });

    /* Hide the cursor when the mouse leaves the window */
    document.addEventListener('mouseleave', function() {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
      visible = false;
    });

    /* Add a class while the mouse button is held down */
    document.addEventListener('mousedown', function() {
      document.body.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', function() {
      document.body.classList.remove('cursor-active');
    });

    document.addEventListener('dragend', function() {
      document.body.classList.remove('cursor-active');
    });

    /* Add a hover class when the cursor is over a clickable element */
    var hoverTargets = 'a, button, input, textarea, label, select, .faq-question, .lore-header, .btn';

    document.querySelectorAll(hoverTargets).forEach(function(element) {
      element.addEventListener('mouseenter', function() {
        document.body.classList.add('cursor-hover');
      });
      element.addEventListener('mouseleave', function() {
        document.body.classList.remove('cursor-hover');
      });
    });

    /* Animation loop:
       - The dot snaps directly to the mouse position
       - The ring slowly catches up (easing effect) */
    function animate() {
      dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';

      /* Move the ring 12% of the way toward the mouse each frame */
      ringX = ringX + (mouseX - ringX) * 0.12;
      ringY = ringY + (mouseY - ringY) * 0.12;

      ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%, -50%)';

      /* Keep the loop going on every animation frame */
      requestAnimationFrame(animate);
    }

    animate();
  }
}


/* ================================================================
   BACK TO TOP BUTTON
   The button appears after scrolling down 300px.
   Clicking it scrolls smoothly back to the top.
================================================================ */
function initBackToTop() {

  var backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  /* Show or hide the button depending on how far down we are */
  function handleScroll() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll);

  /* Scroll to the top when clicked */
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Run once on load in case the page starts scrolled down */
  handleScroll();
}


/* ================================================================
   FADE IN ON SCROLL
   Elements with the class .fade-in start invisible.
   They become visible when they scroll into view.
================================================================ */
function initFadeIn() {

  var targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  /* IntersectionObserver watches elements and fires when they enter the screen */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        /* Add the visible class which triggers the CSS fade-in transition */
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, {
    threshold: 0.1,               /* trigger when 10% of the element is visible */
    rootMargin: '0px 0px -50px 0px' /* trigger slightly early */
  });

  targets.forEach(function(element) {
    observer.observe(element);
  });
}


/* ================================================================
   FAQ ACCORDION
   Clicking a question opens that answer and closes all others.
   Uses the aria-expanded attribute for accessibility.
   Only runs if .faq-item elements exist on the page.
================================================================ */
function initFAQ() {

  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function(item) {

    var question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function() {

      /* Check if this item is already open */
      var isOpen = item.classList.contains('open');

      /* Close all items first */
      items.forEach(function(entry) {
        entry.classList.remove('open');
        var q = entry.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      /* If the clicked item was not already open, open it */
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}


/* ================================================================
   COUNTDOWN TIMER
   Shows days, hours, minutes, and seconds until the release date.
   Updates every second.

   Uses the TimeAPI to get the correct UTC time so the countdown
   is accurate no matter what the visitor's device clock says.
   Falls back to the device time if the API is not available.
================================================================ */
(function initCountdown() {

  var daysEl    = document.getElementById('days');
  var hoursEl   = document.getElementById('hours');
  var minutesEl = document.getElementById('minutes');
  var secondsEl = document.getElementById('seconds');

  /* Stop if the countdown elements are not on this page */
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  /* The target release date: 1 December 2026, midnight UTC */
  var RELEASE = new Date('2026-12-01T00:00:00Z');

  /* Calculates and displays the time remaining given the current time */
  function render(now) {
    var diff = RELEASE - now; /* difference in milliseconds */

    /* If the release date has passed, show all zeros */
    if (diff <= 0) {
      daysEl.textContent    = '000';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    /* Convert milliseconds into days, hours, minutes, seconds */
    var totalSeconds  = Math.floor(diff / 1000);
    var totalMinutes  = Math.floor(totalSeconds / 60);
    var totalHours    = Math.floor(totalMinutes / 60);
    var days          = Math.floor(totalHours / 24);
    var hours         = totalHours % 24;
    var minutes       = totalMinutes % 60;
    var seconds       = totalSeconds % 60;

    /* Display each unit, padded with leading zeros */
    daysEl.textContent    = String(days).padStart(3, '0');
    hoursEl.textContent   = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  /* Try to get the current time from TimeAPI.
     If that fails, just use the device clock. */
  function fetchNow() {
    return fetch('https://timeapi.io/api/time/current/zone?timeZone=UTC')
      .then(function(response) {
        if (!response.ok) throw new Error('API failed');
        return response.json();
      })
      .then(function(data) {
        return new Date(data.dateTime);
      })
      .catch(function() {
        return new Date(); /* fallback to device clock */
      });
  }

  /* Get the time once, then update every second using the device clock
     adjusted by the difference from the API time */
  fetchNow().then(function(apiNow) {

    /* Remember what the device clock said when we got the API time */
    var deviceAtFetch = Date.now();

    /* Show the first tick right away */
    render(apiNow);

    /* Every second, add the elapsed time to the API time for accuracy */
    setInterval(function() {
      var elapsed   = Date.now() - deviceAtFetch;
      var corrected = new Date(apiNow.getTime() + elapsed);
      render(corrected);
    }, 1000);
  });

}());


/* ================================================================
   ATTACH EMAIL FORM
   A reusable function that handles a simple email signup form.
   Used on the home page newsletter form.

   Parameters:
     formId    — the id of the <form> element
     inputId   — the id of the email <input> element
     messageId — the id of the element where success/error messages go
================================================================ */
function attachEmailForm(formId, inputId, messageId) {

  var form    = document.getElementById(formId);
  var input   = document.getElementById(inputId);
  var message = document.getElementById(messageId);

  if (!form || !input || !message) return;

  /* Simple pattern to check if the value looks like an email address */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', function(event) {

    /* Stop the page from refreshing */
    event.preventDefault();

    var value = input.value.trim();

    /* Show an error if the email is not valid */
    if (!emailRe.test(value)) {
      message.textContent = 'Please enter a valid email address.';
      message.className   = 'form-msg form-msg-error';
      return;
    }

    /* Show a success message and reset the field */
    message.textContent = 'You are on the list. The forest will remember.';
    message.className   = 'form-msg form-msg-success';
    form.reset();
  });
}


/* ================================================================
   LORE EXPAND
   Expand and collapse lore sections on the story page.
   Clicking a .lore-header toggles the matching .lore-content panel.
================================================================ */
function initLoreExpand() {

  var loreHeaders = document.querySelectorAll('.lore-header');
  if (!loreHeaders.length) return;

  loreHeaders.forEach(function(header) {

    header.addEventListener('click', function() {

      /* Get the id of the content panel this header controls */
      var loreId      = header.getAttribute('data-lore');
      var loreContent = loreId ? document.getElementById(loreId) : null;
      if (!loreContent) return;

      /* Toggle the active class on both the header and its content panel */
      header.classList.toggle('active');
      loreContent.classList.toggle('active');
    });
  });
}


/* ================================================================
   NEWSLETTER FORM
   Handles the newsletter signup on the contact page.
   Shows a success message after a valid email is entered.
================================================================ */
function initNewsletter() {

  var submitBtn  = document.getElementById('newsletter-submit');
  var emailInput = document.getElementById('newsletter-email');
  var errorEl    = document.getElementById('newsletter-error');
  var successEl  = document.getElementById('newsletter-success');
  var wrapEl     = document.getElementById('newsletter-wrap');

  if (!submitBtn || !emailInput || !errorEl || !successEl || !wrapEl) return;

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  submitBtn.addEventListener('click', function() {

    var value = emailInput.value.trim();

    /* Show an error if the email is not valid */
    if (!emailRe.test(value)) {
      errorEl.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }

    /* Clear any old error */
    errorEl.textContent = '';

    /* Disable the button and show a loading message */
    submitBtn.disabled     = true;
    submitBtn.textContent  = 'Joining...';

    /* Wait 800ms then show the success message */
    setTimeout(function() {
      wrapEl.hidden    = true;
      successEl.hidden = false;

      submitBtn.disabled    = false;
      submitBtn.textContent = 'Join the Journey';
    }, 800);
  });

  /* Clear the error message as soon as the user starts typing again */
  emailInput.addEventListener('input', function() {
    errorEl.textContent = '';
  });
}


/* ================================================================
   START EVERYTHING
   Wait for the page to fully load, then run all the init functions.
================================================================ */
document.addEventListener('DOMContentLoaded', function() {
  initThemeToggle();
  initHamburgerMenu();
  initSmoothScroll();
  initCustomCursor();
  initBackToTop();
  initFadeIn();
  initFAQ();
  initNewsletter();
  attachEmailForm('newsletter-form', 'newsletter-email', 'newsletter-form-msg');
  initLoreExpand();
});
