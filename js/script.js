// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // Set dynamic year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Dark/Light Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Check for saved user preference, if any, on load
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    htmlElement.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeIcon.classList.remove('text-yellow-400');
        themeIcon.classList.add('text-gray-800');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeIcon.classList.remove('text-gray-800');
        themeIcon.classList.add('text-yellow-400');
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);
mobileThemeToggleBtn.addEventListener('click', toggleTheme);

// Mobile Menu Toggle Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Change icon between bars and times (close)
    const icon = mobileMenuBtn.querySelector('i');
    if(mobileMenu.classList.contains('hidden')) {
        icon.classList.replace('fa-times', 'fa-bars');
    } else {
        icon.classList.replace('fa-bars', 'fa-times');
    }
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});