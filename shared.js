/* ============================================
   SHARED JAVASCRIPT - USED ACROSS ALL PAGES
   Person 2: Created theme toggle functionality
   ============================================ */

// ============================================
// THEME TOGGLE (Light/Dark Mode)
// ============================================

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', currentTheme);
  
  // Update toggle icon based on current theme
  updateThemeIcon(currentTheme);
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-toggle-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '☪';
  }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ============================================
// FADE-IN ANIMATIONS ON SCROLL
// ============================================

function initFadeInOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);
  
  // Observe all elements with .fade-in class
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Add CSS for fade-in effect
const fadeInStyles = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Inject fade-in styles if they don't exist
if (!document.getElementById('fade-in-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'fade-in-styles';
  styleSheet.textContent = fadeInStyles;
  document.head.appendChild(styleSheet);
}

// ============================================
// INITIALIZE SHARED FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSmoothScroll();
  initFadeInOnScroll();
  
  console.log('Shared JS initialized - Theme toggle and animations ready');
});

// ============================================
// UTILITY FUNCTIONS (For team to use)
// ============================================

// Show/hide loading spinner
function showLoading(element) {
  element.innerHTML = '<div class="loading-spinner">⏳ Loading...</div>';
}

function hideLoading(element) {
  element.innerHTML = '';
}

// Show success/error messages
function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: var(--space-md);
    background: ${type === 'success' ? 'var(--accent-teal)' : 'var(--primary-red)'};
    color: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

// Add animation keyframes
const messageAnimations = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;

if (!document.getElementById('message-animations')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'message-animations';
  styleSheet.textContent = messageAnimations;
  document.head.appendChild(styleSheet);
}
