/* ============================================
SHARED JAVASCRIPT - USED ACROSS ALL PAGES
============================================ */


/* Theme Toggle */
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const currentTheme = localStorage.getItem("theme") || "dark";

  html.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector(".theme-toggle-icon");
  if (icon) {
    icon.textContent = theme === "dark" ? "\u2600\uFE0F" : "\u263E";
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function handleAnchorClick(event) {
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

function initFadeInOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });
}

if (!document.getElementById("fade-in-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "fade-in-styles";
  styleSheet.textContent = `
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
  document.head.appendChild(styleSheet);
}

function showLoading(element) {
  element.innerHTML = '<div class="loading-spinner">Loading...</div>';
}

function hideLoading(element) {
  element.innerHTML = "";
}

function showMessage(message, type = "success") {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: var(--space-md);
    background: ${type === "success" ? "var(--nature-green)" : "#b05555"};
    color: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

if (!document.getElementById("message-animations")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "message-animations";
  styleSheet.textContent = `
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
  document.head.appendChild(styleSheet);
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSmoothScroll();
  initFadeInOnScroll();
});
