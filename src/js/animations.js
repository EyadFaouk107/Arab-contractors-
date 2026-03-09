/**
 * Scroll Animations
 * Uses IntersectionObserver for performance
 */

export function initAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after reveal
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Simple Parallax Effect for Hero
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        // Move background slightly slower than scroll
        heroSlides.forEach(slide => {
          slide.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        });
      }
    });
  }
}
