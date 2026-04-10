/* ============================================
   THE SHATTERED CROWN — story.js
   Handles two things on the Story page:
     1. Parallax effect on the floating sun and moon images
     2. Fade-in animation for timeline and lore items as you scroll
   Note: the lore expand/collapse accordion is handled in main.js
============================================ */


/* ============================================
   PARALLAX ON HERO DECORATIONS
   Moves the sun and moon images slightly as the user scrolls.
   This gives a floating depth effect.
============================================ */
function initHeroDeco() {

  /* Grab the two decorative images from the page */
  var deco1 = document.querySelector('.deco-1');
  var deco2 = document.querySelector('.deco-2');

  /* If neither image exists on this page, stop here */
  if (!deco1 && !deco2) return;

  /* How many pixels the images can move up or down */
  var maxOffset = 40;

  /* This function runs every time the user scrolls.
     It works out how far down the page we are (0 = top, 1 = bottom),
     then moves the images by a small amount based on that. */
  function handleMove() {

    /* ratio is a number between 0 and 1 showing scroll progress */
    var ratio = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);

    /* y is the amount to shift the images up or down */
    var y = Math.round((ratio - 0.5) * -maxOffset);

    /* Move deco1 by the full amount */
    if (deco1) {
      deco1.style.transform = 'translateY(' + y + 'px) rotate(-10deg)';
    }

    /* Move deco2 by 60% of the amount so they drift at different speeds */
    if (deco2) {
      deco2.style.transform = 'translateY(' + (y * 0.6) + 'px) rotate(-8deg)';
    }
  }

  /* Listen for scroll and touch scroll events */
  window.addEventListener('scroll', handleMove, { passive: true });
  window.addEventListener('touchmove', handleMove, { passive: true });
}


/* ============================================
   SCROLL REVEAL ANIMATION
   Timeline items and lore sections start invisible.
   They fade in and slide up when the user scrolls to them.
============================================ */
function initScrollReveal() {

  /* IntersectionObserver watches elements and tells us when they appear on screen */
  var observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

      /* When an element becomes visible, make it fade in */
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });

  }, {
    threshold: 0.1,              /* trigger when 10% of the element is visible */
    rootMargin: '0px 0px -50px 0px' /* trigger slightly before the element reaches the bottom of the screen */
  });

  /* Find all timeline and lore items on the page */
  var timelineItems = document.querySelectorAll('.timeline-item');
  var loreItems = document.querySelectorAll('.lore-item');

  /* Set each item to start hidden and slightly below its final position */
  /* Then hand it to the observer to watch */
  timelineItems.forEach(function(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });

  loreItems.forEach(function(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}


/* ============================================
   START EVERYTHING
   Wait for the page to finish loading, then run both functions.
============================================ */
document.addEventListener('DOMContentLoaded', function() {
  initHeroDeco();
  initScrollReveal();
});
