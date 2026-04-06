/* ============================================
   STORY PAGE JAVASCRIPT
   Person 2: Created expand/collapse lore sections
      Handles: lore accordion expand/collapse, scroll-reveal animation.
   ============================================ */

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
