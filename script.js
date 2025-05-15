// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const languageSwitcher = document.querySelector('.language-switcher');
const currentLang = document.querySelector('.current-lang');
const languageDropdown = document.querySelector('.language-dropdown');

let menuOpen = false;
let langDropdownOpen = false;

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    menuOpen = navLinks.classList.contains('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Toggle language dropdown
if (languageSwitcher && currentLang && languageDropdown) {
    currentLang.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            languageSwitcher.classList.toggle('active');
            langDropdownOpen = languageSwitcher.classList.contains('active');
        }
    });

    // Prevent closing when clicking inside dropdown
    languageDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Handle language selection
    languageDropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                languageSwitcher.classList.remove('active');
                langDropdownOpen = false;
            }
            currentLang.textContent = this.textContent;
        });
    });
}

// Global click handler to close menu and dropdown if open and click is outside
document.addEventListener('click', function(e) {
    // Close language dropdown if open and click is outside
    if (
        window.innerWidth <= 768 &&
        langDropdownOpen &&
        languageSwitcher &&
        !languageSwitcher.contains(e.target)
    ) {
        languageSwitcher.classList.remove('active');
        langDropdownOpen = false;
    }
    // Close mobile menu if open and click is outside nav
    if (
        menuOpen &&
        navLinks &&
        !e.target.closest('nav')
    ) {
        navLinks.classList.remove('active');
        menuOpen = false;
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

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

document.querySelectorAll('.feature-card, .step').forEach(el => {
    observer.observe(el);
});

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