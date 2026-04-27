// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');
const scrollButtons = document.querySelectorAll('[data-section]');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const animatedElements = document.querySelectorAll('.fade-in, .fade-up');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const currentYearElement = document.getElementById('currentYear');
const sections = document.querySelectorAll('section');
const currentYearSpan = document.getElementById('currentYear');

// Set current year
currentYearElement.textContent = new Date().getFullYear();
currentYearSpan.textContent = new Date().getFullYear();

// Navbar scroll event
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Check for elements to animate
  animateOnScroll();
}

// Mobile menu toggle
function toggleMobileMenu() {
  navMenu.classList.toggle('open');
  mobileMenuBtn.classList.toggle('mobile-menu-open');
  document.body.classList.toggle('no-scroll');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -80; // Header offset
    const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (navMenu.classList.contains('open')) {
      toggleMobileMenu();
    }
  }
}

// Animate elements on scroll
function animateOnScroll() {
  animatedElements.forEach(element => {
    const position = element.getBoundingClientRect();
    
    // Check if element is in viewport
    if (position.top < window.innerHeight - 100) {
      // Get animation delay
      const delay = element.getAttribute('data-delay') || 0;
      
      // Set animation delay
      element.style.animationDelay = delay;
      
      // Add animation class
      element.classList.add('animate');
    }
  });
  
  // Animate skill bars
  skillProgressBars.forEach(bar => {
    const position = bar.getBoundingClientRect();
    
    if (position.top < window.innerHeight - 100) {
      // Get animation delay
      const delay = bar.getAttribute('data-delay') || 0;
      
      // Set animation delay
      bar.style.animationDelay = delay;
      
      // Add animation class
      bar.classList.add('animate');
    }
  });
}

// Smooth scrolling for navigation
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        
        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and elements with fade-up class
document.querySelectorAll('section, .fade-up').forEach(element => {
    observer.observe(element);
});

// Skill bar animations
const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
    const delay = bar.getAttribute('data-delay') || '0s';
    bar.style.transitionDelay = delay;
});

// Update hero title periodically
const titles = [
    'Hello, I\'m Nitesh',
    'Backend Developer',
    'PHP & Laravel Expert',
    'Full Stack Developer',
    'API Specialist',
    'Problem Solver'
];

let counter = 0;
const next = () => {
    fx.setText(titles[counter]).then(() => {
        setTimeout(next, 3000); // Increased duration to 3 seconds for better readability
    });
    counter = (counter + 1) % titles.length;
};

// Contact Form Handling
if (contactForm) {
    // Initialize EmailJS with your public key
    emailjs.init("3HpeVxp7QIXVg6z7Q"); // Replace with your EmailJS public key

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form elements
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            Sending...
        `;

        try {
            // Get form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value
            };

            // Validate form data
            const errors = [];
            if (!formData.name) errors.push("Name is required");
            if (!formData.email) errors.push("Email is required");
            if (!formData.subject) errors.push("Subject is required");
            if (!formData.message) errors.push("Message is required");
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formData.email && !emailRegex.test(formData.email)) {
                errors.push("Invalid email format");
            }

            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            // Send email using EmailJS
            const response = await emailjs.send(
                "service_j03qbb8", // Replace with your EmailJS service ID
                "template_wq0yymj", // Replace with your EmailJS template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: "Nitesh", // Your name
                }
            );

            // Show success message
            toast.querySelector('.toast-message').textContent = 'Message sent successfully!';
            toast.querySelector('.toast-description').textContent = 'I will get back to you as soon as possible.';
            toast.classList.add('show', 'success');
            
            // Reset form
            contactForm.reset();

        } catch (error) {
            console.error('Error:', error);
            toast.querySelector('.toast-message').textContent = 'Failed to send message';
            toast.querySelector('.toast-description').textContent = error.message || 'Please try again later.';
            toast.classList.add('show', 'error');
        } finally {
            // Hide toast after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show', 'success', 'error');
            }, 5000);

            // Re-enable submit button and restore original text
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    });
}

// Add loading spinner styles
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 8px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px;
        border-radius: 8px;
        background: var(--card-bg);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }

    .toast.success {
        border-left: 4px solid var(--success);
    }

    .toast.error {
        border-left: 4px solid var(--error);
    }

    .toast-message {
        font-weight: 600;
        margin-bottom: 4px;
    }

    .toast-description {
        font-size: 0.9em;
        color: var(--text-secondary);
    }
`;
document.head.appendChild(style);

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
`;
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', animateOnScroll);
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Set up click events for nav items and buttons
scrollButtons.forEach(button => {
  button.addEventListener('click', () => {
    const section = button.getAttribute('data-section');
    scrollToSection(section);
  });
});

// Initial scroll check
handleScroll();
//  Google tag (gtag.js)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.track-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const url = this.href;

      gtag('event', 'button_click', {
        event_category: 'Outbound Link',
        event_label: this.dataset.label,
        transport_type: 'beacon',
        event_callback: function () {
          window.location.href = url;
        }
      });
    });
  });
});
