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