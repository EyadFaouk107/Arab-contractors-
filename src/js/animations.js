/**
 * Scroll Animations
 * Uses IntersectionObserver for performance
 */

export function initAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .stagger-container, .stagger-grid');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Handle staggered grid items
        if (entry.target.classList.contains('stagger-grid')) {
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('active');
            }, index * 100); // 100ms stagger delay
          });
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Add micro-interactions for buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
      const x = e.pageX - btn.offsetLeft;
      const y = e.pageY - btn.offsetTop;
      
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      btn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // Refined Parallax Effect for Hero
  const heroContent = document.querySelector('.hero-content');
  const heroSlides = document.querySelectorAll('.hero-slide');
  
  if (heroSlides.length > 0 || heroContent) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        // Move background slightly slower than scroll
        heroSlides.forEach(slide => {
          slide.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
        
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollPosition * 0.15}px)`;
          heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
        }
      }
    }, { passive: true });
  }
}
