// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // Initialize core functionality only
    try {
        initializeNavigation();
        console.log('Navigation initialized');
        
        // Skip complex animations for now
        console.log('Skipping complex animations to debug display issues');
        
        // Ensure project and cert sections are visible
        ensureSectionsVisible();
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Ensure sections are visible
function ensureSectionsVisible() {
    console.log('Ensuring sections are visible...');
    
    const projectsSection = document.querySelector('.projects');
    const certificationsSection = document.querySelector('.certifications');
    const projectCards = document.querySelectorAll('.project-card');
    const certCards = document.querySelectorAll('.cert-card');
    
    if (projectsSection) {
        projectsSection.style.display = 'block';
        projectsSection.style.visibility = 'visible';
        projectsSection.style.opacity = '1';
        console.log('Projects section made visible');
    }
    
    if (certificationsSection) {
        certificationsSection.style.display = 'block';
        certificationsSection.style.visibility = 'visible';
        certificationsSection.style.opacity = '1';
        console.log('Certifications section made visible');
    }
    
    projectCards.forEach((card, index) => {
        card.style.display = 'flex';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        console.log(`Project card ${index + 1} made visible`);
    });
    
    certCards.forEach((card, index) => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        console.log(`Cert card ${index + 1} made visible`);
    });
    
    console.log(`Total project cards: ${projectCards.length}`);
    console.log(`Total cert cards: ${certCards.length}`);
}

// Navigation functionality
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) {
        console.error('Navigation elements not found');
        return;
    }

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Ensure project links work properly
    const projectLinks = document.querySelectorAll('.project-link');
    console.log(`Found ${projectLinks.length} project links`);
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Project link clicked:', this.href);
            // Let the default behavior handle the link opening
        });
    });
    
    console.log('Navigation initialized successfully');
}

// Scroll animations
function initializeAnimations() {
    console.log('Initializing animations...');
    
    try {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        console.log(`Found ${animatedElements.length} elements to animate`);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add staggered animation delay for multiple elements
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Add animation classes to elements
        const aboutContent = document.querySelector('.about-content .about-text');
        const skillItems = document.querySelectorAll('.skill-item');
        const projectCards = document.querySelectorAll('.project-card');
        const certCards = document.querySelectorAll('.cert-card');

        if (aboutContent) aboutContent.classList.add('fade-in');
        skillItems.forEach(item => item.classList.add('fade-in'));
        projectCards.forEach(card => card.classList.add('fade-in'));
        certCards.forEach(card => card.classList.add('fade-in'));
        
        console.log('Animations initialized successfully');
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Progress bar on scroll
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Typing animation for hero subtitle
function initializeTypingAnimation() {
    console.log('Initializing typing animation...');
    
    try {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) {
            console.log('Typing element not found, skipping...');
            return;
        }

        const text = '🎯 AI/ML Enthusiast | Python Programmer | Lifelong Learner';
        let index = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            if (!isDeleting) {
                currentText = text.slice(0, index);
                index++;
                if (index > text.length) {
                    isDeleting = true;
                    setTimeout(type, 2000); // Pause before deleting
                    return;
                }
            } else {
                currentText = text.slice(0, index);
                index--;
                if (index === 0) {
                    isDeleting = false;
                    setTimeout(type, 500); // Pause before typing again
                    return;
                }
            }

            typingElement.textContent = currentText;
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }

        // Start typing animation
        setTimeout(type, 1000);
        console.log('Typing animation initialized successfully');
    } catch (error) {
        console.error('Error initializing typing animation:', error);
    }
}

// Particle animation for hero section
function initializeParticles() {
    console.log('Initializing particles...');
    
    try {
        const hero = document.querySelector('.hero');
        if (!hero) {
            console.log('Hero section not found, skipping particles...');
            return;
        }

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(particlesContainer);

        // Create fewer particles to improve performance
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer);
        }

        function createParticle(container) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            container.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    // Don't create new particles to prevent memory issues
                }
            }, (Math.random() * 10 + 10) * 1000);
        }

        // Add CSS animation for particles
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float-particle {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('Particles initialized successfully');
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
}

// Loading screen
function initializeLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
        <div class="spinner"></div>
    `;
    document.body.appendChild(loadingScreen);

    // Hide loading screen after content loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1000);
    });
}

// Theme toggle (dark/light mode)
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Theme toggle functionality (placeholder for future implementation)
    themeToggle.addEventListener('click', function() {
        // Add theme toggle logic here
        console.log('Theme toggle clicked - implement dark mode here');
    });
}

// Utility functions
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

// Add smooth hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card, .cert-card, .skill-item, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add tilt effect to floating icons
document.addEventListener('DOMContentLoaded', function() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .project-link, .cert-link, .contact-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });

    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 600ms linear;
            background-color: rgba(255, 255, 255, 0.6);
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add scroll-to-top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
    `;
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(0)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Add cursor trail effect
document.addEventListener('DOMContentLoaded', function() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.circle');

    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(circle);
    }

    const allCircles = document.querySelectorAll('.circle');

    window.addEventListener('mousemove', function(e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        allCircles.forEach(function(circle, index) {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.scale = (allCircles.length - index) / allCircles.length;
            circle.style.opacity = (allCircles.length - index) / allCircles.length * 0.5;

            circle.x = x;
            circle.y = y;

            const nextCircle = allCircles[index + 1] || allCircles[0];
            x += (nextCircle.x || x) / 10;
            y += (nextCircle.y || y) / 10;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
});

// Add performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Optimize scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Add scroll-based effects here
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});

// Add keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        // Arrow keys for navigation (optional)
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could add user-friendly error handling here
});

// Add resize handler
window.addEventListener('resize', debounce(function() {
    // Handle responsive changes
    const isMobile = window.innerWidth <= 768;
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!isMobile) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}, 250));
