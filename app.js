// JavaScript for Jamun Tree webpage
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(targetId);
                }
            });
        });
    }
    
    // Update active navigation link
    function updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }
    
    // Navbar scroll behavior
    function initNavbarScrollBehavior() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for styling
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Clear previous timeout
            clearTimeout(scrollTimeout);
            
            // Set timeout to handle scroll end
            scrollTimeout = setTimeout(() => {
                updateActiveNavOnScroll();
            }, 100);
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Update active nav link based on scroll position
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        let activeSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = '#' + section.getAttribute('id');
            }
        });
        
        if (activeSection) {
            updateActiveNavLink(activeSection);
        }
    }
    
    // Intersection Observer for fade-in animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.card, .fact-card, .benefit-card, .section-title');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Add hover effects to cards
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.card, .fact-card, .benefit-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Add click-to-copy functionality for scientific name
    function initCopyFeature() {
        const scientificName = document.querySelector('.hero-subtitle');
        
        if (scientificName) {
            scientificName.style.cursor = 'pointer';
            scientificName.title = 'Click to copy scientific name';
            
            scientificName.addEventListener('click', async function() {
                try {
                    await navigator.clipboard.writeText('Syzygium cumini');
                    
                    // Show feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied! ✓';
                    this.style.color = 'var(--color-success)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 1500);
                    
                } catch (err) {
                    console.log('Clipboard not available, showing alert instead');
                    alert('Scientific name: Syzygium cumini');
                }
            });
        }
    }
    
    // Add dynamic content loading animation
    function initContentAnimation() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
            section.classList.add('section-enter');
        });
    }
    
    // Add parallax effect to hero section
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (scrolled < hero.offsetHeight) {
                    heroContent.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    }
    
    // Add seasonal greeting based on time
    function addSeasonalGreeting() {
        const heroDescription = document.querySelector('.hero-description');
        const currentMonth = new Date().getMonth();
        
        let seasonalText = '';
        
        // Summer months (March-June) - Jamun season
        if (currentMonth >= 2 && currentMonth <= 5) {
            seasonalText = ' 🌞 It\'s Jamun season!';
        }
        // Monsoon months (July-September) - Growing season
        else if (currentMonth >= 6 && currentMonth <= 8) {
            seasonalText = ' 🌧️ Growing season is here!';
        }
        // Winter months - Preparation time
        else {
            seasonalText = ' ❄️ Planning for the next harvest!';
        }
        
        if (heroDescription) {
            const currentText = heroDescription.textContent;
            heroDescription.textContent = currentText + seasonalText;
        }
    }
    
    // Add keyboard navigation support
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Alt + number keys to navigate to sections
            if (e.altKey) {
                const sectionMap = {
                    '1': '#overview',
                    '2': '#facts',
                    '3': '#botanical',
                    '4': '#benefits',
                    '5': '#culture'
                };
                
                const targetSection = sectionMap[e.key];
                if (targetSection) {
                    e.preventDefault();
                    const section = document.querySelector(targetSection);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    }
    
    // Add loading screen functionality
    function handlePageLoad() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations after a short delay
        setTimeout(() => {
            initScrollAnimations();
            initContentAnimation();
        }, 300);
    }
    
    // Add print functionality
    function initPrintSupport() {
        // Add print button (optional - can be uncommented if needed)
        /*
        const printButton = document.createElement('button');
        printButton.textContent = '🖨️ Print';
        printButton.className = 'btn btn--outline';
        printButton.style.position = 'fixed';
        printButton.style.bottom = '20px';
        printButton.style.right = '20px';
        printButton.style.zIndex = '1000';
        
        printButton.addEventListener('click', () => {
            window.print();
        });
        
        document.body.appendChild(printButton);
        */
        
        // Optimize for print
        window.addEventListener('beforeprint', function() {
            document.body.classList.add('printing');
        });
        
        window.addEventListener('afterprint', function() {
            document.body.classList.remove('printing');
        });
    }
    
    // Performance optimization - throttle scroll events
    function throttle(func, wait) {
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
    
    // Initialize all functionality
    function init() {
        try {
            initSmoothScrolling();
            initNavbarScrollBehavior();
            initCardHoverEffects();
            initCopyFeature();
            initParallaxEffect();
            addSeasonalGreeting();
            initKeyboardNavigation();
            initPrintSupport();
            handlePageLoad();
            
            // Add throttled scroll listener for performance
            const throttledScrollHandler = throttle(updateActiveNavOnScroll, 16);
            window.addEventListener('scroll', throttledScrollHandler);
            
            console.log('🌿 Jamun Tree webpage initialized successfully!');
            
        } catch (error) {
            console.error('Error initializing webpage:', error);
        }
    }
    
    // Start initialization
    init();
    
    // Add accessibility improvements
    function improveAccessibility() {
        // Add skip navigation link
        const skipLink = document.createElement('a');
        skipLink.href = '#overview';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '10px';
        skipLink.style.left = '10px';
        skipLink.style.zIndex = '9999';
        skipLink.style.background = 'var(--color-primary)';
        skipLink.style.color = 'white';
        skipLink.style.padding = '8px 16px';
        skipLink.style.borderRadius = '4px';
        skipLink.style.textDecoration = 'none';
        
        skipLink.addEventListener('focus', function() {
            this.classList.remove('sr-only');
        });
        
        skipLink.addEventListener('blur', function() {
            this.classList.add('sr-only');
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add ARIA labels where needed
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.setAttribute('role', 'navigation');
            navbar.setAttribute('aria-label', 'Main navigation');
        }
        
        const main = document.querySelector('main');
        if (main) {
            main.setAttribute('role', 'main');
        }
    }
    
    // Call accessibility improvements
    improveAccessibility();
    
    // Add fun easter egg
    let clickCount = 0;
    document.querySelector('.hero-decoration').addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            this.style.animation = 'spin 2s linear infinite';
            setTimeout(() => {
                this.style.animation = '';
                clickCount = 0;
            }, 4000);
        }
    });
});

// Add custom CSS for additional animations via JavaScript
const additionalStyles = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .navbar.scrolled {
        background: rgba(var(--color-surface), 0.95);
        backdrop-filter: blur(10px);
    }
    
    .section-enter {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu a.active {
        color: var(--color-primary);
        background: var(--color-secondary);
    }
    
    @media print {
        .navbar, .footer {
            display: none !important;
        }
        
        .hero {
            page-break-after: always;
        }
        
        .section {
            page-break-inside: avoid;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);