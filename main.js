// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-active');
  const isOpen = nav.classList.contains('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Animate numbers on scroll
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end; // Ensure it ends on the exact goal
    }
  };
  window.requestAnimationFrame(step);
}

// Intersection Observer for section and skill animations
const sections = document.querySelectorAll('.content-section, .carousel-section');

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      
      // Special staggered animation for skills
      if (entry.target.id === 'skills') {
        const skillChips = entry.target.querySelectorAll('.skill-chip');
        skillChips.forEach((chip, index) => {
          setTimeout(() => {
            chip.classList.add('is-visible');
          }, index * 100);
        });
      }

      // Animate stats in About section
      if (entry.target.id === 'about') {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
          const goal = parseInt(num.dataset.goal, 10);
          animateValue(num, 0, goal, 1500);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Parallax effect for hero background
const heroBg = document.querySelector('.hero__background-image');
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  }
});

// 3D Tilt effect for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const maxRotate = 15; // Max rotation in degrees

  card.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    const rotateY = (mouseX / (cardRect.width / 2)) * maxRotate;
    const rotateX = -1 * (mouseY / (cardRect.height / 2)) * maxRotate;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});
