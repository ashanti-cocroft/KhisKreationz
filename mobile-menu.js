// Enhanced Mobile Menu Script with Smooth Animations
(function () {
  "use strict";

  // Create mobile menu styles
  const style = document.createElement("style");
  style.textContent = `
    /* Mobile Menu Overlay */
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    .mobile-menu-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    /* Mobile Menu Panel */
    .mobile-menu-panel {
      position: fixed;
      top: 0;
      right: -100%;
      width: 85%;
      max-width: 400px;
      height: 100%;
      background: var(--aged-white);
      z-index: 1001;
      overflow-y: auto;
      transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      box-shadow: -8px 0 24px rgba(0, 0, 0, 0.6);
      border-left: 5px solid var(--ink-black);
    }

    .mobile-menu-panel.active {
      right: 0;
    }

    /* Mobile Menu Header */
    .mobile-menu-header {
      background: var(--ink-black);
      color: var(--aged-white);
      padding: 20px;
      border-bottom: 3px double var(--aged-gold);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mobile-menu-title {
      font-family: "Playfair Display", serif;
      font-size: 1.4em;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .mobile-menu-close {
      background: none;
      border: 2px solid var(--aged-white);
      color: var(--aged-white);
      font-size: 1.8em;
      width: 45px;
      height: 45px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .mobile-menu-close:hover {
      background: var(--aged-white);
      color: var(--ink-black);
      transform: rotate(90deg);
    }

    /* Mobile Menu Content */
    .mobile-menu-content {
      padding: 30px 20px;
    }

    .mobile-menu-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .mobile-menu-links li {
      margin-bottom: 5px;
      opacity: 0;
      transform: translateX(30px);
      animation: slideInRight 0.4s ease forwards;
    }

    .mobile-menu-links li:nth-child(1) { animation-delay: 0.1s; }
    .mobile-menu-links li:nth-child(2) { animation-delay: 0.15s; }
    .mobile-menu-links li:nth-child(3) { animation-delay: 0.2s; }
    .mobile-menu-links li:nth-child(4) { animation-delay: 0.25s; }
    .mobile-menu-links li:nth-child(5) { animation-delay: 0.3s; }
    .mobile-menu-links li:nth-child(6) { animation-delay: 0.35s; }

    @keyframes slideInRight {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .mobile-menu-links a {
      display: block;
      padding: 18px 20px;
      color: var(--ink-black);
      text-decoration: none;
      font-family: "Special Elite", cursive;
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 2px;
      border: 3px solid var(--ink-black);
      background: white;
      margin-bottom: 10px;
      transition: all 0.3s;
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .mobile-menu-links a::before {
      content: "►";
      position: absolute;
      left: -30px;
      transition: left 0.3s;
      color: var(--vintage-red);
    }

    .mobile-menu-links a:hover,
    .mobile-menu-links a:active {
      transform: translate(-4px, -4px);
      box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.15);
      background: var(--aged-white);
      padding-left: 40px;
    }

    .mobile-menu-links a:hover::before,
    .mobile-menu-links a:active::before {
      left: 15px;
    }

    .mobile-menu-links .nav-book-btn {
      background: var(--ink-black);
      color: var(--aged-white);
      border-color: var(--ink-black);
      font-weight: bold;
      text-align: center;
    }

    .mobile-menu-links .nav-book-btn:hover,
    .mobile-menu-links .nav-book-btn:active {
      background: var(--vintage-red);
      color: var(--aged-white);
    }

    /* Ornamental Divider */
    .mobile-menu-divider {
      text-align: center;
      margin: 30px 0;
      font-size: 1.2em;
      color: var(--ink-black);
      opacity: 0.4;
      letter-spacing: 8px;
    }

    /* Hamburger Icon Animation */
    .mobile-menu-toggle.active {
      background: var(--aged-gold);
      color: var(--ink-black);
      border-color: var(--aged-gold);
    }

    /* Prevent body scroll when menu is open */
    body.menu-open {
      overflow: hidden;
    }

    /* Tablet adjustments */
    @media (min-width: 769px) {
      .mobile-menu-panel,
      .mobile-menu-overlay,
      .mobile-menu-toggle {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Wait for DOM to be ready
  function init() {
    const navLinks = document.querySelector(".nav-links");
    const navContent = document.querySelector(".nav-content");

    if (!navLinks || !navContent) return;

    // Create mobile menu toggle button
    let toggleBtn = document.querySelector(".mobile-menu-toggle");
    if (!toggleBtn) {
      toggleBtn = document.createElement("button");
      toggleBtn.className = "mobile-menu-toggle";
      toggleBtn.innerHTML = "☰";
      toggleBtn.setAttribute("aria-label", "Open menu");
      navContent.appendChild(toggleBtn);
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "mobile-menu-overlay";
    document.body.appendChild(overlay);

    // Create mobile menu panel
    const panel = document.createElement("div");
    panel.className = "mobile-menu-panel";
    panel.innerHTML = `
      <div class="mobile-menu-header">
        <div class="mobile-menu-title">Menu</div>
        <button class="mobile-menu-close" aria-label="Close menu">×</button>
      </div>
      <div class="mobile-menu-content">
        <ul class="mobile-menu-links"></ul>
      </div>
    `;
    document.body.appendChild(panel);

    // Clone navigation links
    const mobileLinks = panel.querySelector(".mobile-menu-links");
    const links = navLinks.querySelectorAll("a");

    links.forEach((link) => {
      const li = document.createElement("li");
      const a = link.cloneNode(true);
      li.appendChild(a);
      mobileLinks.appendChild(li);
    });

    // Get elements
    const closeBtn = panel.querySelector(".mobile-menu-close");

    // Toggle menu function
    function openMenu() {
      overlay.classList.add("active");
      panel.classList.add("active");
      document.body.classList.add("menu-open");
      toggleBtn.classList.add("active");
      toggleBtn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      overlay.classList.remove("active");
      panel.classList.remove("active");
      document.body.classList.remove("menu-open");
      toggleBtn.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
    }

    // Event listeners
    toggleBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // Close menu when clicking on a link
    mobileLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setTimeout(closeMenu, 300);
      });
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("active")) {
        closeMenu();
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
          closeMenu();
        }
      }, 250);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
