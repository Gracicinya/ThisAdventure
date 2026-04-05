    /* ─── CURSOR ─── */
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (dot && ring) {   // ← only runs if the elements exist on this page
    let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        function animCursor() {
            dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
        rx += (mx - rx) * 0.12;    ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(animCursor);
        }
        animCursor();
        document.querySelectorAll('a, button, .filter-btn').forEach(el => {
            // , .char-card, .lore-tag -- add these when/if needed and any other elements you want to trigger the hover effect into document.querySelectorAll('...')
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.btn-hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    navMenu.classList.toggle('open');
    this.classList.toggle('open');
    this.setAttribute('aria-expanded', String(!expanded));
    });
}

    /* ─── Launch Date & Countdown Timer Constants ─── */
    const launchDate = new Date("2029-06-15T09:00:00").getTime(); // Launch date and time
    const el = document.getElementById("launch-date");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const messageEl = document.getElementById("message");

    // Launch Date
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    if (el) {
        el.textContent = `${new Date(launchDate).toLocaleDateString(undefined, options)}`;
    }
    // Countdown Timer
    let timer;
    function updateCountdown() {
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance <= 0) {clearInterval(timer); return;}

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }

    updateCountdown();
    timer = setInterval(updateCountdown, 1000);