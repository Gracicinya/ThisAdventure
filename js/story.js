/* ============================================
   STORY PAGE JAVASCRIPT
   Person 2: Created expand/collapse lore sections
      Handles: lore accordion expand/collapse, scroll-reveal animation.
   ============================================ */

/* ================================================================
    HERO DECORATION PARALLAX
    Moves the decorative sun/moon images based on scroll position.
================================================================ */
function initHeroDeco() {
  const deco1 = document.querySelector('.deco-1');
  const deco2 = document.querySelector('.deco-2');

  const maxOffset = 40; // px

  function handleMove() {
    const ratio = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    const y = Math.round((ratio - 0.5) * -maxOffset);
    if (deco1) deco1.style.transform = `translateY(${y}px) rotate(-10deg)`;
    if (deco2) deco2.style.transform = `translateY(${y * 0.6}px) rotate(-8deg)`;
  }

  // respond to touchmove as well as scroll so touch devices see the same effect
  window.addEventListener('scroll', handleMove, { passive: true });
  window.addEventListener('touchmove', handleMove, { passive: true });

}
// ============================================
// EXPAND/COLLAPSE LORE SECTIONS
// ============================================

function initLoreExpand() {
  const loreHeaders = document.querySelectorAll('.lore-header');
  
  loreHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const loreId = header.getAttribute('data-lore');
      const loreContent = document.getElementById(loreId);
      
      // Toggle active class on header
      header.classList.toggle('active');
      
      // Toggle active class on content
      loreContent.classList.toggle('active');
      
      // Optional: Close other open sections (accordion behavior)
      // Uncomment if you want only one section open at a time
      /*
      loreHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.classList.remove('active');
          const otherId = otherHeader.getAttribute('data-lore');
          const otherContent = document.getElementById(otherId);
          otherContent.classList.remove('active');
        }
      });
      */
    });
  });
}

// ============================================
// SCROLL REVEAL ANIMATION (Optional Enhancement)
// ============================================

function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Apply to timeline items and lore items
  const timelineItems = document.querySelectorAll('.timeline-item');
  const loreItems = document.querySelectorAll('.lore-item');
  
  [...timelineItems, ...loreItems].forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initLoreExpand();
  initScrollReveal();
  
  console.log('Story page loaded - Lore expand/collapse initialized');
});
