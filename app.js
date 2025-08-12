// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typing-text');
const particlesContainer = document.getElementById('particles');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const statNumbers = document.querySelectorAll('.stat-number');
const progressBars = document.querySelectorAll('.progress-bar');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize theme
setTheme(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

// Mobile Menu Toggle
if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Fixed Smooth Scrolling Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Typing Animation
const roles = [
    'Full Stack Developer',
    'Blockchain Enthusiast', 
    'AI Innovator',
    'Software Engineer',
    'Problem Solver'
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeRole() {
    if (!typingText) return;
    
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 75;
    } else {
        typingText.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && currentCharIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
if (typingText) {
    typeRole();
}

// Particle System
function createParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const animationDuration = Math.random() * 20 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger stat counter animation
            if (entry.target.classList.contains('stat-number')) {
                animateStatNumber(entry.target);
            }
            
            // Trigger progress bar animation
            if (entry.target.classList.contains('progress-bar')) {
                animateProgressBar(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Add animation classes to elements
function addAnimationClasses() {
    // About section animations
    const aboutText = document.querySelector('.about-text');
    const aboutDetails = document.querySelector('.about-details');
    if (aboutText) aboutText.classList.add('fade-in');
    if (aboutDetails) aboutDetails.classList.add('slide-in-left');
    
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Experience section animations
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Project cards animations
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Skill categories animations
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add('fade-in');
        category.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Contact section animations
    document.querySelectorAll('.contact-card').forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) contactForm.classList.add('slide-in-right');
}

// Initialize animations
addAnimationClasses();

// Stat Number Animation
function animateStatNumber(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target % 1 === 0) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(2);
        }
    }, duration / steps);
}

// Progress Bar Animation
function animateProgressBar(element) {
    const progress = element.getAttribute('data-progress');
    setTimeout(() => {
        element.style.width = `${progress}%`;
    }, 200);
}

// Observe stat numbers and progress bars
statNumbers.forEach(stat => observer.observe(stat));
progressBars.forEach(bar => observer.observe(bar));

// Project Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        min-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: inherit;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.opacity = '0.8';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Fixed Contact Form Handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Fixed Resume Download
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show downloading state
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        
        // Create a comprehensive resume content
        const resumeContent = `PIYUSH BHARDWAJ
Software Developer & Blockchain Enthusiast

CONTACT INFORMATION
====================
Email: piyushkr07p@gmail.com
Phone: +91 7520319768
Location: Gurgaon, Haryana
LinkedIn: LinkedIn Profile
GitHub: GitHub Profile
LeetCode: LeetCode Profile

EDUCATION
=========
Chandigarh University, Mohali, Punjab
Bachelor of Engineering - Computer Science and Engineering
Duration: August 2022 – August 2026
CGPA: 8.22

Jawahar Navodaya Vidyalaya, Delhi, New Delhi
Intermediate - PCMB
Completed: August 2022
Percentage: 94.80%

TECHNICAL SKILLS
================
Programming Languages: Java, C, C++, JavaScript, SQL, Python
Web Technologies: HTML5, CSS3, Bootstrap, Tailwind CSS, ReactJS, NodeJS, ExpressJS, MongoDB, .NET Framework
Blockchain Technologies: Solidity, Web3.js, Smart Contracts, Ethereum, Avalanche, Polygon, MetaMask
Development Tools: VS Code, Git/GitHub, Postman
Core Competencies: Web Development, Blockchain Development, Data Structures & Algorithms, Operating Systems, Computer Architecture, Database Management Systems, Computer Networks, Object-Oriented Programming

PROFESSIONAL EXPERIENCE
========================
Software Engineer Intern (SDE I) | PolicyBazaar.com
May 2024 – July 2024 | Gurgaon, Haryana
• Contributed to developing investment-related features using React and MongoDB in the Investment Tech team
• Built scalable and efficient projects ensuring smooth user experiences and optimal performance
• Collaborated with cross-functional teams to deliver high-quality solutions for the investment domain
• Gained hands-on experience with enterprise-level software development practices

Project Intern | MetaCrafters
June 2024 – September 2024 | Online
• Worked on comprehensive blockchain projects across multiple platforms including Ethereum, Avalanche, and Polygon
• Gained practical experience in decentralized technologies and smart contract development
• Won scholarship for outstanding dedication and expertise in the blockchain domain
• Developed proficiency in various blockchain development tools and frameworks

KEY PROJECTS
============
Decentralized Dining Platform | February 2024
Technologies: Blockchain, Web3.js, Solidity, MetaMask
• Developed an innovative blockchain-based dining solution enabling customers to access decentralized menus
• Implemented secure cryptocurrency payment system via MetaMask integration
• Ensured transaction transparency, security, and decentralization to enhance customer dining experience
• Created smart contracts for handling payments and menu management

Advanced E-commerce Platform | November 2023  
Technologies: MongoDB, ExpressJS, ReactJS, NodeJS (MERN Stack)
• Built a comprehensive full-stack e-commerce platform with advanced filtering capabilities
• Implemented dynamic product search and filtering based on categories, price, ratings, and specifications
• Developed user authentication system, shopping cart functionality, and payment integration
• Created responsive design with admin panel for inventory and order management

AI-Based Traffic Management System | 2024
Technologies: IoT Sensors, AI/ML, Python, Computer Vision
• Developed intelligent traffic management system analyzing real-time traffic data
• Implemented dynamic traffic light control based on congestion levels and traffic flow patterns
• Integrated IoT sensors with machine learning algorithms for predictive traffic optimization
• Achieved significant improvements in traffic flow efficiency and reduced wait times

CERTIFICATIONS & ACHIEVEMENTS
=============================
Technical Certifications:
• ReactJS & IoT - Coursera
• Java Programming - Professional Certification
• Python & Django Web Development - Coursera
• Cloud Computing Fundamentals - NPTEL
• C++ Programming - Professional Certification  
• Computer Architecture - NPTEL
• Machine Learning, Flutter & Mobile Development - Workshop Certification

Notable Achievements:
• KVPY (Kishore Vaigyanik Protsahan Yojana) Bronze Medal Recipient
• SIH (Smart India Hackathon) & University Level Hackathon Certifications
• MetaCrafters Blockchain Development Scholarship Winner
• Consistent academic performance with 8.22 CGPA

AREAS OF EXPERTISE
==================
• Full-Stack Web Development (MERN Stack)
• Blockchain Development & Smart Contracts
• Artificial Intelligence & Machine Learning
• Internet of Things (IoT) Integration
• Database Design & Management
• Software Architecture & System Design
• Version Control & Collaborative Development
• Problem Solving & Algorithmic Thinking

LANGUAGES
=========
• English (Fluent)
• Hindi (Native)

INTERESTS
=========
• Blockchain Technology & DeFi
• Artificial Intelligence Research
• Open Source Contributions
• Tech Innovation & Entrepreneurship
• Continuous Learning & Skill Development

Generated on: ${new Date().toLocaleDateString()}
        `;
        
        setTimeout(() => {
            // Create and download file
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Piyush_Bhardwaj_Resume.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            // Restore button
            downloadResumeBtn.innerHTML = originalText;
            showNotification('Resume downloaded successfully!', 'success');
        }, 1000);
    });
}

// Fix Project Links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const linkText = link.textContent.trim();
        if (linkText.includes('Live Demo')) {
            showNotification('Live demo will be available soon!', 'error');
        } else if (linkText.includes('Code') || linkText.includes('GitHub')) {
            showNotification('Source code repository will be shared upon request!', 'error');
        }
    });
});

// Navbar Background on Scroll
function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Parallax Effect for Hero Section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const parallaxSpeed = 0.5;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
}

// Smooth reveal animations for elements
function revealElementsOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize skill animations
function initializeSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCategory = entry.target.closest('.skill-category');
                const items = skillCategory.querySelectorAll('.skill-item');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// Add hover effects for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    setTheme(currentTheme);
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Initialize navbar background
    updateNavbarBackground();
    
    // Initialize skill animations
    initializeSkillAnimations();
    
    // Initial reveal check
    setTimeout(() => {
        revealElementsOnScroll();
    }, 100);
    
    // Apply throttled scroll events
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
        updateNavbarBackground();
        updateParallax();
        revealElementsOnScroll();
    }, 16)); // ~60fps
});

// Loading screen management
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hide');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
});

// Add loading screen if it doesn't exist
function addLoadingScreen() {
    if (document.querySelector('.loading')) return;
    
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loading);
}

// Initialize loading screen
addLoadingScreen();