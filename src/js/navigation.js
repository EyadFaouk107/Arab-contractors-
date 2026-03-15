/**
 * Navigation Logic
 * Handles sticky header, mobile menu, and mega menu
 */

export function initNavigation() {
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-mobile-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const navClose = document.querySelector('.nav-close');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const langToggleMobile = document.querySelector('.lang-toggle-mobile');
  const body = document.body;

  const openDrawer = () => {
    navDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    navDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    body.style.overflow = '';
  };

  // Mobile Menu Toggle
  if (navToggle) {
    navToggle.addEventListener('click', openDrawer);
  }

  if (navClose) {
    navClose.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Mobile Lang Toggle
  if (langToggleMobile) {
    langToggleMobile.addEventListener('click', () => {
      const langToggle = document.querySelector('.lang-toggle');
      if (langToggle) langToggle.click();
      closeDrawer();
    });
  }

  // Scroll Header Shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-medium');
      header.classList.remove('shadow-subtle');
    } else {
      header.classList.remove('shadow-medium');
      header.classList.add('shadow-subtle');
    }
  });

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.nav-drawer a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Mega Menu Hover Logic (Desktop)
  const megaMenuTriggers = document.querySelectorAll('.has-mega-menu');
  megaMenuTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) {
        const menu = trigger.querySelector('.mega-menu');
        if (menu) menu.classList.add('active');
      }
    });
    trigger.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) {
        const menu = trigger.querySelector('.mega-menu');
        if (menu) menu.classList.remove('active');
      }
    });
  });
}
