/* ================================================================
    THE SHATTERED CROWN — js/main.js
    Loaded on every page or functions contained on more than one page.

    Functions:
    - initThemeToggle — light/dark mode
    - initHamburgerMenu — mobile nav dropdown
    - initSmoothScroll  — smooth scrolling
    - initCustomCursor  — animated cursor 
    - initBackToTop — back-to-top button
    - initFadeIn  — fade-in on scroll 
    - initFAQ — accordion for FAQ section
    - initCountdown — live countdown
    - initNewsletter  — newsletter email signup
    - attachEmailForm — reusable email form handler
    - initHomeCharSlider  — character carousel on Home page
    - initHeroDeco  — parallax on hero decorative images
   ================================================================ */


/* ================================================================
    THEME TOGGLE
    Saves preference to localStorage so it persists across visits.
    ( ? : ) is shorthand for if/else.
================================================================ */

const THEME_KEY = 'scTheme';

/* Updates the toggle button icon to show the opposite state */
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  themeToggle.textContent = theme === 'dark' ? '\u2600' : '\u263D';
}

/* Applies a theme by setting data-theme on <html> */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeIcon(theme);
}

function initThemeToggle() {
  /* Read saved preference, fall back to page default, then 'light' */
  const savedTheme =
    localStorage.getItem(THEME_KEY) ||
    document.documentElement.getAttribute('data-theme') ||
    'dark';
  applyTheme(savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const nextTheme =
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';
    applyTheme(nextTheme);
  });
}

/* ================================================================
    HAMBURGER MENU
    Adds/removes the .open class to show or hide the mobile nav.
    Closes on: link tap, outside click.
================================================================ */
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');


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

   /* Close when any nav link is tapped */
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* Close when clicking outside the navbar */
  document.addEventListener('click', (event) => {
    if (!navLinks.classList.contains('open')) return;
    if (!navbar.contains(event.target)) {
      closeMenu();
    }
  });
}

/* ================================================================
    SMOOTH SCROLL
    Makes anchor links (#section) scroll smoothly instead of jumping.
================================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function handleAnchorClick(event) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ================================================================
    CUSTOM CURSOR
    Replaces the default cursor with an animated dot + ring.
================================================================ */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  document.body.classList.add('has-custom-cursor');

  if (!isCoarse) {
    
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

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });

    document.addEventListener('dragend', () => {
      document.body.classList.remove('cursor-active');
    });

    const hoverTargets =
      'a, button, input, textarea, label, select, .faq-question, .lore-header, .btn';

    /* Add hover class when over interactive elements */
    document.querySelectorAll(hoverTargets).forEach((element) => {
      element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    /* Animation loop — dot follows mouse instantly, ring lags behind */
    function animate() {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    }

    animate();
    return;
  }

  
}

/* ================================================================
    BACK TO TOP BUTTON
    Appears after scrolling 300px. Scrolls smoothly back to the top.
================================================================ */

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

/* ================================================================
    FADE IN ON SCROLL
    Watches .fade-in elements and adds .fade-in-visible. 
================================================================ */

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

/* ================================================================
    FAQ ACCORDION
    Single-open: clicking a question closes all others first,
    then opens the clicked one. Uses aria-expanded for accessibility.
    Only runs if .faq-item elements exist on the page.
================================================================ */
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

/* ================================================================
    COUNTDOWN
    Shows days, hours, minutes.
    Updates every minute. 
    Counts down to the estimated release date: 1 December 2026.
    Uses WorldTimeAPI to get accurate UTC time regardless of the
    visitor's device clock. Falls back to Date.now() if the API is unavailable.
================================================================ */

(function initCountdown() {
    const daysEl    = document.getElementById('days');
    const hoursEl   = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');

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

    /* AI Assisted - On load: call the API, render immediately, then tick every 60s
       stay accurate without re-calling the API */
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
    ATTACH EMAIL FORM
    Takes the IDs of the form, input, and message elements.
================================================================ */
function attachEmailForm(formId, inputId, messageId) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const message = document.getElementById(messageId);

  if (!form || !input || !message) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!emailRe.test(value)) {
      message.textContent = 'Please enter a valid email address.';
      message.className = 'form-msg form-msg-error';
      return;
    }

    message.textContent = 'You are on the list. The forest will remember.';
    message.className = 'form-msg form-msg-success';
    form.reset();
  });
}

function initLoreExpand() {
  const loreHeaders = document.querySelectorAll('.lore-header');
  if (!loreHeaders.length) return;

  loreHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const loreId = header.getAttribute('data-lore');
      const loreContent = loreId ? document.getElementById(loreId) : null;
      if (!loreContent) return;

      header.classList.toggle('active');
      loreContent.classList.toggle('active');
    });
  });
}

function initStoryReveal() {
  const items = [...document.querySelectorAll('.timeline-item'), ...document.querySelectorAll('.lore-item')];
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  items.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}

/* ================================================================
    NEWSLETTER FORM
    Handles the simpler newsletter sign-up in contact.
    Validates the email input and shows a success state.
================================================================ */
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

    /* Show success */
    if (wrapEl) wrapEl.hidden = true;
    if (successEl) successEl.hidden = false;

    submitBtn.disabled = false;
    submitBtn.textContent = 'Join the Journey';
  });

  /* Clear error on input */
  emailInput.addEventListener('input', () => {
    if (errorEl) errorEl.textContent = '';
  });
}


function initHomeCharacterSlider() {
  const track = document.getElementById('homeCharacterTrack');
  const dots = document.getElementById('homeCharacterDots');
  if (!track || !dots) return;

  const homeCharacters = [
    {
      name: 'Amara',
      role: 'Protagonist',
      title: 'The Light-Born Shadow',
      image: 'https://image2url.com/r2/default/images/1775492175130-be5936a7-410a-4b24-880c-a2718871e9b0.jpg',
      description: 'A girl from the light kingdom carrying the magic she was taught to fear.',
    },
    {
      name: 'Aria',
      role: 'Protagonist',
      title: 'The Dark-Born Flame',
      image: 'https://image2url.com/r2/default/images/1775492223024-17ddc84e-6f01-4776-92ae-a8a6d5dd3337.jpg',
      description: 'A runaway from Umbrath whose forbidden light could change the balance of the world.',
    },
    {
      name: 'Finn',
      role: 'Ally',
      title: "The Forest-Keeper's Son",
      image: 'https://image2url.com/r2/default/images/1775241763837-c6ea364f-69fc-4aad-aca4-8fa9bc12abf3.jpg',
      description: 'A sharp-eyed guide who knows the Twilight Forest better than anyone else alive.',
    },
    {
      name: 'Sable',
      role: 'Guardian',
      title: 'Keeper of the Broken Pieces',
      image: 'https://image2url.com/r2/default/images/1775492291829-a44e6246-1d5b-439e-80c8-5f56a03348f6.jpg',
      description: 'An ancient watcher guarding secrets tied to the shattered crown itself.',
    },
  ];

  track.innerHTML = homeCharacters
    .map(
      (character, i) => `
        <a class="home-character-card${i === 0 ? ' active' : ''}" href="characters.html" aria-label="Open the character page to learn more about ${character.name}">
          <div class="home-character-portrait">
            <img src="${character.image}" alt="Portrait of ${character.name}" loading="lazy">
          </div>
          <div class="home-character-info">
            <span class="home-character-role">${character.role}</span>
            <h3>${character.name}</h3>
            <p class="home-character-title">${character.title}</p>
            <p class="home-character-desc">${character.description}</p>
            <span class="home-character-link">Open Characters Page <span aria-hidden="true">&rarr;</span></span>
          </div>
        </a>
      `
    )
    .join('');

  dots.innerHTML = homeCharacters
    .map((_, index) => `<button class="home-character-dot${index === 0 ? ' active' : ''}" type="button" aria-label="Show character ${index + 1}"></button>`)
    .join('');

  const cardElements = [...track.querySelectorAll('.home-character-card')];
  const dotButtons = [...dots.querySelectorAll('.home-character-dot')];
  let activeIndex = 0;
  let autoAdvance;

  const render = (index) => {
    activeIndex = index;
    cardElements.forEach((card, i) => {
      card.classList.toggle('active', i === index);
      card.style.zIndex = i === index ? 3 : 1;
    });
    dotButtons.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
  };

  const restartAutoAdvance = () => {
    window.clearInterval(autoAdvance);
    autoAdvance = window.setInterval(() => {
      render((activeIndex + 1) % cardElements.length);
    }, 4200);
  };

  // Touch / swipe support for home character track
  let touchStartX = 0;
  let touchCurrentX = 0;
  let isTouching = false;
  const SWIPE_THRESHOLD = 40;

  track.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length === 0) return;
    isTouching = true;
    touchStartX = e.touches[0].clientX;
    touchCurrentX = touchStartX;
    window.clearInterval(autoAdvance);
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isTouching || !e.touches || e.touches.length === 0) return;
    touchCurrentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isTouching) return;
    const dx = touchCurrentX - touchStartX;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) render((activeIndex + 1) % cardElements.length);
      else render((activeIndex - 1 + cardElements.length) % cardElements.length);
    }
    isTouching = false;
    restartAutoAdvance();
  }, { passive: true });

  dotButtons.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      render(index);
      restartAutoAdvance();
    });
  });

  track.addEventListener('mouseenter', () => window.clearInterval(autoAdvance));
  track.addEventListener('mouseleave', restartAutoAdvance);

  // initial
  render(0);
  restartAutoAdvance();
}



  // small tap/click pulse
  function pulse(el) {
    if (!el) return;
    el.style.transition = 'transform 220ms ease, opacity 220ms ease';
    el.style.transform += ' scale(1.03)';
    el.style.opacity = '1';
    setTimeout(() => {
      el.style.transform = '';
      el.style.opacity = '';
    }, 260);
  }

  document.addEventListener('click', (e) => {
    // if user taps/clicks near top area, pulse decos
    pulse(deco1);
    pulse(deco2);
  }, { passive: true });


/* ================================================================
    INITIALISE — runs when the page is fully loaded
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHamburgerMenu();
  initSmoothScroll();
  initCustomCursor();
  initBackToTop();
  initFadeIn();
  initFAQ();
  initNewsletter();
  attachEmailForm('hero-email-form', 'hero-email', 'hero-form-msg');
  attachEmailForm('mailing-form', 'mailing-email', 'mailing-form-msg');
  initLoreExpand();
  initStoryReveal();
  initContactApp();
  initHomeCharacterSlider();
  initHeroDeco();
});
