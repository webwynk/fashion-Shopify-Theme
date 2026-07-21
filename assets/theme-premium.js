/**
 * Premium Theme — Scroll Animations
 * Uses IntersectionObserver to trigger CSS animations
 * when elements enter the viewport.
 */
(function () {
  'use strict';

  // Observer for single animated elements [data-animate]
  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animateObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  // Observer for staggered grid children [data-animate-stagger]
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );

  function initAnimations() {
    document.querySelectorAll('[data-animate]').forEach((el) => {
      animateObserver.observe(el);
    });
    document.querySelectorAll('[data-animate-stagger]').forEach((el) => {
      staggerObserver.observe(el);
    });
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Re-init for dynamically added content (e.g. after AJAX)
  window.dsInitAnimations = initAnimations;

  /**
   * Header scroll shadow
   */
  const header = document.querySelector('.ds-site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /**
   * Announcement bar dismiss
   */
  const announcementClose = document.querySelector('[data-announcement-close]');
  if (announcementClose) {
    announcementClose.addEventListener('click', () => {
      const bar = document.querySelector('.ds-announcement-bar');
      if (bar) {
        bar.style.maxHeight = bar.offsetHeight + 'px';
        requestAnimationFrame(() => {
          bar.style.transition = 'max-height 350ms ease, opacity 350ms ease';
          bar.style.maxHeight = '0';
          bar.style.opacity = '0';
          bar.style.overflow = 'hidden';
        });
        // Remember dismissal
        try { sessionStorage.setItem('announcement_dismissed', '1'); } catch (e) {}
      }
    });
    // Check if already dismissed
    try {
      if (sessionStorage.getItem('announcement_dismissed') === '1') {
        const bar = document.querySelector('.ds-announcement-bar');
        if (bar) bar.style.display = 'none';
      }
    } catch (e) {}
  }

  /**
   * Mobile nav toggle
   */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navDrawer = document.querySelector('[data-nav-drawer]');
  const navOverlay = document.querySelector('[data-nav-overlay]');
  const navClose = document.querySelector('[data-nav-close]');

  function openNav() {
    navDrawer?.classList.add('is-open');
    navOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    navToggle?.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    navDrawer?.classList.remove('is-open');
    navOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  navToggle?.addEventListener('click', openNav);
  navClose?.addEventListener('click', closeNav);
  navOverlay?.addEventListener('click', closeNav);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

})();
