// ==============================================
// STEWARDSHIP SOLUTIONS - PRODUCTION JAVASCRIPT
// Enterprise AI Consulting Website
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================
    // 1. SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==============================================
    // 2. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for cards in the same container
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==============================================
    // 3. FORM VALIDATION & SUBMISSION
    // ==============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Phone validation regex (optional, flexible format)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;

        // Real-time validation feedback
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = 'var(--color-error)';
                    showError(this, 'Please enter a valid email address');
                } else {
                    this.style.borderColor = 'var(--color-secondary)';
                    clearError(this);
                }
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !phoneRegex.test(this.value)) {
                    this.style.borderColor = 'var(--color-error)';
                    showError(this, 'Please enter a valid phone number');
                } else {
                    this.style.borderColor = 'var(--color-secondary)';
                    clearError(this);
                }
            });
        }

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const formData = new FormData(this);
            
            // Check honeypot (spam protection)
            if (formData.get('_gotcha')) {
                e.preventDefault();
                return false;
            }

            // Validate required fields
            const requiredFields = ['name', 'email', 'message'];
            requiredFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field && !field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-error)';
                    showError(field, 'This field is required');
                }
            });

            // Validate email format
            const email = document.getElementById('email');
            if (email && email.value && !emailRegex.test(email.value)) {
                isValid = false;
                email.style.borderColor = 'var(--color-error)';
                showError(email, 'Please enter a valid email address');
            }

            // Validate phone if provided
            const phone = document.getElementById('phone');
            if (phone && phone.value && !phoneRegex.test(phone.value)) {
                isValid = false;
                phone.style.borderColor = 'var(--color-error)';
                showError(phone, 'Please enter a valid phone number');
            }

            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = document.querySelector('input[style*="border-color: var(--color-error)"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                
                return false;
            }

            // If valid, show loading state
            const submitButton = this.querySelector('.submit-button');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
        });

        // Helper function to show error message
        function showError(field, message) {
            clearError(field);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'var(--color-error)';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = message;
            field.parentElement.appendChild(errorDiv);
        }

        // Helper function to clear error message
        function clearError(field) {
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }

        // Clear errors on input
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = 'var(--color-secondary)';
                clearError(this);
            });
        });
    }

    // ==============================================
    // 4. HEADER SCROLL EFFECT (Optional Enhancement)
    // ==============================================
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.2)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ==============================================
    // 5. ACCESSIBILITY: KEYBOARD NAVIGATION
    // ==============================================
    
    // Trap focus in modal if needed (for future modal implementations)
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Add keyboard shortcuts info for power users
    document.addEventListener('keydown', (e) => {
        // Alt + C to jump to contact form
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const firstInput = contactSection.querySelector('input');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 500);
                }
            }
        }
    });

    // ==============================================
    // 6. PERFORMANCE: LAZY LOAD IMAGES (Future-proof)
    // ==============================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==============================================
    // 7. CONSOLE SIGNATURE (Professional Touch)
    // ==============================================
    
    console.log('%c🚀 Stewardship Solutions', 
        'font-size: 20px; font-weight: bold; color: #0077B6;');
    console.log('%cBuilt with expertise in AI Strategy & Data Consulting', 
        'font-size: 12px; color: #A0B3C4;');
    console.log('%cInterested in working with us? Contact: stewardshipsolutions@protonmail.com', 
        'font-size: 12px; color: #0096C7;');

    // ==============================================
    // 8. ANALYTICS EVENT TRACKING (Ready for GA4)
    // ==============================================
    
    // Track CTA button clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            // Ready for Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': button.textContent.trim()
                });
            }
        });
    });

    // Track form submission
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'lead',
                    'event_label': 'contact_form'
                });
            }
        });
    }

    // Track social link clicks
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'engagement',
                    'event_label': link.textContent.trim()
                });
            }
        });
    });

    // ==============================================
    // 9. SERVICE WORKER REGISTRATION (Future PWA)
    // ==============================================
    
    // Uncomment when ready to implement PWA
    /*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed:', err);
                });
        });
    }
    */

    // ==============================================
    // END OF SCRIPT
    // ==============================================
    
    console.log('%c✅ All systems initialized', 
        'font-size: 12px; color: #00C851; font-weight: bold;');
});