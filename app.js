// Modern Cybersecurity Portfolio - Interactive JavaScript

// Skills data from JSON
const skillsData = {
  security: [
    {name: "Penetration Testing", level: 95, years: 6},
    {name: "Digital Forensics", level: 90, years: 5},
    {name: "Incident Response", level: 85, years: 4},
    {name: "Threat Intelligence", level: 80, years: 3},
    {name: "Vulnerability Assessment", level: 92, years: 6},
    {name: "Security Architecture", level: 78, years: 3}
  ],
  technical: [
    {name: "Python Programming", level: 88, years: 5},
    {name: "Network Security", level: 90, years: 6},
    {name: "Web Application Security", level: 85, years: 4},
    {name: "Malware Analysis", level: 75, years: 3},
    {name: "Cryptography", level: 70, years: 3},
    {name: "SIEM Administration", level: 82, years: 4}
  ],
  cloud: [
    {name: "Oracle Cloud Infrastructure", level: 95, years: 2},
    {name: "Amazon Web Services", level: 88, years: 3},
    {name: "Cloud Security Posture Management", level: 85, years: 2},
    {name: "DevSecOps", level: 80, years: 2},
    {name: "Infrastructure as Code", level: 78, years: 2}
  ],
  tools: [
    {name: "Burp Suite", level: 90, years: 5},
    {name: "Metasploit", level: 85, years: 4},
    {name: "Wireshark", level: 88, years: 6},
    {name: "Splunk", level: 80, years: 3},
    {name: "Autopsy", level: 85, years: 4},
    {name: "Nmap", level: 92, years: 6},
    {name: "OWASP ZAP", level: 87, years: 4},
    {name: "Volatility", level: 82, years: 3}
  ]
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initParticles();
  initTypingAnimation();
  initCounterAnimation();
  initSkillsVisualization();
  initProjectFilters();
  initScrollAnimations();
  initContactForm();
  initChallengeExpansion();
  
  console.log('🛡️ Cybersecurity Portfolio - Modern Dark Theme Initialized');
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active navigation link on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Listen for scroll events with throttling
  let scrollTimer = null;
  window.addEventListener('scroll', function() {
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(updateActiveNavLink, 10);
  });
  
  // Header background change on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
      }
    }
  });
}

// Animated particles background
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${animationDuration}s;
      animation-delay: ${delay}s;
    `;
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, (animationDuration + delay) * 1000);
  }
  
  // Create initial particles
  for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, Math.random() * 5000);
  }
  
  // Create new particles periodically
  setInterval(createParticle, 500);
}

// Typing animation for hero section
function initTypingAnimation() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const texts = [
    'Cybersecurity Engineer',
    'Penetration Tester',
    'Digital Forensics Investigator',
    'Cloud Security Expert',
    'Threat Intelligence Analyst'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 200;
  
  function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      delay = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      delay = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 500;
    }
    
    setTimeout(typeEffect, delay);
  }
  
  // Start typing animation after a delay
  setTimeout(typeEffect, 1000);
}

// Animated counter for statistics
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  let hasCounted = false;
  
  function animateCounters() {
    if (hasCounted) return;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const suffix = counter.textContent.includes('+') ? '+' : '';
      let current = 0;
      const increment = target / 50;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      };
      
      updateCounter();
    });
    
    hasCounted = true;
  }
  
  // Trigger counter animation when hero section is visible
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 500);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
  }
}

// Skills visualization with interactive categories
function initSkillsVisualization() {
  const skillCategories = document.querySelectorAll('.skill-category');
  const skillsGrid = document.getElementById('skills-grid');
  
  if (!skillsGrid) return;
  
  function renderSkills(category) {
    const skills = skillsData[category] || [];
    
    skillsGrid.innerHTML = skills.map(skill => `
      <div class="skill-item">
        <div class="skill-info">
          <h4>${skill.name}</h4>
          <div class="skill-meta">${skill.years} years experience</div>
        </div>
        <div class="skill-level">
          <div class="skill-progress">
            <div class="skill-progress-fill" data-level="${skill.level}"></div>
          </div>
          <div class="skill-percentage">${skill.level}%</div>
        </div>
      </div>
    `).join('');
    
    // Animate progress bars
    setTimeout(() => {
      const progressBars = skillsGrid.querySelectorAll('.skill-progress-fill');
      progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
      });
    }, 100);
  }
  
  // Category click handlers
  skillCategories.forEach(category => {
    category.addEventListener('click', function() {
      // Remove active class from all categories
      skillCategories.forEach(cat => cat.classList.remove('active'));
      
      // Add active class to clicked category
      this.classList.add('active');
      
      // Get category type and render skills
      const categoryType = this.getAttribute('data-category');
      if (categoryType && skillsData[categoryType]) {
        renderSkills(categoryType);
      }
    });
  });
  
  // Initialize with security skills
  renderSkills('security');
}

// Project filtering functionality
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Scroll-based animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.glass-card, .expertise-item, .timeline-item, .skill-category'
  );
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, observerOptions);
  
  // Set initial styles and observe elements
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(element);
  });
  
  // Parallax effect for floating cards
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
      const speed = 0.5 + (index * 0.2);
      card.style.transform = `translateY(${parallax * speed}px)`;
    });
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Sending...</span><i class="btn-icon">⏳</i>';
    submitButton.disabled = true;
    
    setTimeout(() => {
      showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// Lab challenge expansion functionality
function initChallengeExpansion() {
  // This function will be called from the HTML onclick attribute
  window.toggleChallenge = function(button) {
    const challengeCard = button.closest('.challenge-card');
    const expandedContent = challengeCard.querySelector('.challenge-expanded');
    const expandIcon = button.querySelector('.expand-icon');
    
    if (expandedContent.classList.contains('open')) {
      expandedContent.classList.remove('open');
      button.classList.remove('expanded');
      button.querySelector('span').textContent = 'View Details';
    } else {
      // Close all other expanded challenges
      document.querySelectorAll('.challenge-expanded.open').forEach(content => {
        content.classList.remove('open');
      });
      document.querySelectorAll('.challenge-expand.expanded').forEach(btn => {
        btn.classList.remove('expanded');
        btn.querySelector('span').textContent = 'View Details';
      });
      
      // Open this challenge
      expandedContent.classList.add('open');
      button.classList.add('expanded');
      button.querySelector('span').textContent = 'Hide Details';
    }
  };
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  // Notification styles
  const notificationStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '15px',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.9rem',
    zIndex: '10000',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };
  
  Object.assign(notification.style, notificationStyles);
  
  // Set background based on type
  switch (type) {
    case 'success':
      notification.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
      break;
    case 'error':
      notification.style.background = 'linear-gradient(135deg, #ff6b35, #ff3030)';
      break;
    case 'warning':
      notification.style.background = 'linear-gradient(135deg, #ffa726, #ff9800)';
      break;
    default:
      notification.style.background = 'linear-gradient(135deg, #00d4ff, #8b5cf6)';
  }
  
  // Add to DOM and animate
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Enhanced button interactions
function initButtonInteractions() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s linear;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
  });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close mobile menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
    
    // Close expanded challenges
    document.querySelectorAll('.challenge-expanded.open').forEach(content => {
      content.classList.remove('open');
    });
    document.querySelectorAll('.challenge-expand.expanded').forEach(btn => {
      btn.classList.remove('expanded');
      btn.querySelector('span').textContent = 'View Details';
    });
  }
});

// Scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #00ff88);
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize additional features
setTimeout(() => {
  initButtonInteractions();
  initScrollProgress();
}, 500);

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .skill-progress-fill {
    width: 0;
    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .project-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .challenge-expanded {
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .floating-card {
    transition: transform 0.1s ease-out;
  }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Handle scroll-based animations here if needed
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

console.log('🚀 Modern Cybersecurity Portfolio fully loaded with enhanced interactivity!');
console.log('✨ Features: Dark theme, animations, particles, typing effects, and more!');