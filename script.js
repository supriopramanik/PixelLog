// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const languageSwitcher = document.querySelector('.language-switcher');
const currentLang = document.querySelector('.current-lang');
const languageDropdown = document.querySelector('.language-dropdown');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking outside (but not if inside nav or language switcher)
document.addEventListener('click', (e) => {
    if (
        navLinks.classList.contains('active') &&
        !e.target.closest('nav') &&
        !e.target.closest('.language-switcher')
    ) {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Language Switcher Logic
if (languageSwitcher && currentLang && languageDropdown) {
    // Toggle dropdown on click
    currentLang.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            languageSwitcher.classList.toggle('active');
        }
    });

    // Prevent closing when clicking inside dropdown
    languageDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (
            window.innerWidth <= 768 &&
            languageSwitcher.classList.contains('active') &&
            !languageSwitcher.contains(e.target)
        ) {
            languageSwitcher.classList.remove('active');
        }
    });

    // Handle language selection
    languageDropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                languageSwitcher.classList.remove('active');
            }
            currentLang.textContent = this.textContent;
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Don't try to scroll for just "#"
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step').forEach(el => {
    observer.observe(el);
});

// Add CSS class for animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .feature-card, .step {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .step.animate {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`); 