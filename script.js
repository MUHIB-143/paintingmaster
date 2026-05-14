/* ========================================
   Painting Master - Production Ready JavaScript
   Optimized, SEO-friendly, Professional
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initLoader();
    initNavbar();
    initScrollTop();
    initCounters();
    initScrollReveal();
    initFormValidation();
    initMobileMenu();
}

function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 800);
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                
                counter.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(function(el) {
        observer.observe(el);
    });
}

function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (!validatePhone(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(function() {
            alert('Thank you ' + name + '! Your quote request has been submitted. We will contact you shortly.');
            form.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (input.value.trim() !== '') {
                input.style.borderColor = '#06D6A0';
            } else {
                input.style.borderColor = '#E9ECEF';
            }
        });
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[\d\s\-+()]{10,}$/.test(phone);
}

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('.gallery-item').forEach(function(item) {
    item.addEventListener('click', function() {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h4').textContent;
        const category = item.querySelector('.project-category').textContent;
        createLightbox(imgSrc, title, category);
    });
});

function createLightbox(src, title, category) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-container"><button class="lightbox-close">&times;</button><img src="' + src + '" alt="' + title + '"><div class="lightbox-info"><span class="lightbox-category">' + category + '</span><h3>' + title + '</h3></div></div>';
    
    const style = document.createElement('style');
    style.textContent = '.lightbox{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease}.lightbox-container{max-width:90%;max-height:90%;position:relative;animation:scaleIn 0.3s ease}.lightbox-container img{max-width:100%;max-height:70vh;border-radius:12px}.lightbox-info{text-align:center;color:white;padding:25px}.lightbox-category{background:#FF6B35;padding:6px 14px;border-radius:20px;font-size:0.8rem;font-weight:600}.lightbox-info h3{margin-top:15px;font-size:1.5rem}.lightbox-close{position:absolute;top:-50px;right:0;background:none;border:none;color:white;font-size:2.5rem;cursor:pointer;transition:transform 0.3s ease}.lightbox-close:hover{transform:rotate(90deg)}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes scaleIn{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}';
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.remove();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') lightbox.remove();
    });
}

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';