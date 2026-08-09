/**
 * Hexo Theme Verse - Main JavaScript
 * Version: 1.0.0
 */

(function() {
  'use strict';

  // ===========================
  // Dark Mode Toggle
  // ===========================
  function initDarkMode() {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    if (!toggle) return;

    // Get saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Set initial theme
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateIcon(initialTheme);

    // Toggle theme
    toggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
    });

    function updateIcon(theme) {
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }

  // ===========================
  // Mobile Menu Toggle
  // ===========================
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-nav');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
      }
    });
  }

  // ===========================
  // Reading Progress Bar
  // ===========================
  function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress');

    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;

      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }

  // ===========================
  // Back to Top Button
  // ===========================
  function initBackToTop() {
    const button = document.getElementById('back-to-top');

    if (!button) return;

    // Show/hide button based on scroll position
    function toggleButton() {
      if (window.pageYOffset > 300) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleButton);
    toggleButton();

    // Scroll to top on click
    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Update progress indicator if enabled
    const progressIndicator = button.querySelector('.progress-indicator');
    if (progressIndicator) {
      function updateProgressIndicator() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 360;

        progressIndicator.style.transform = 'rotate(' + progress + 'deg)';
      }

      window.addEventListener('scroll', updateProgressIndicator);
      updateProgressIndicator();
    }
  }

  // ===========================
  // TOC Active Link
  // ===========================
  function initTOC() {
    const toc = document.querySelector('.toc');

    if (!toc) return;

    const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6');
    const tocLinks = toc.querySelectorAll('a');

    if (headings.length === 0 || tocLinks.length === 0) return;

    function updateActiveTOC() {
      let current = '';

      headings.forEach(function(heading) {
        const top = heading.getBoundingClientRect().top;
        if (top < 100) {
          current = heading.id;
        }
      });

      tocLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveTOC);
    updateActiveTOC();
  }

  // ===========================
  // Smooth Scroll for Anchor Links
  // ===========================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===========================
  // Lazy Load Images
  // ===========================
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[loading="lazy"]');

      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  // ===========================
  // Copy Code Button
  // ===========================
  function initCopyCode() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(function(codeBlock) {
      const pre = codeBlock.parentElement;
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code');

      button.addEventListener('click', function() {
        const text = codeBlock.textContent;

        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function() {
            button.textContent = 'Copied!';
            setTimeout(function() {
              button.textContent = 'Copy';
            }, 2000);
          });
        }
      });

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  }

  // ===========================
  // Initialize All
  // ===========================
  function init() {
    initDarkMode();
    initMobileMenu();
    initReadingProgress();
    initBackToTop();
    initTOC();
    initSmoothScroll();
    initLazyLoad();
    initCopyCode();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
