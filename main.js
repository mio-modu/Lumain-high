import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import SplitType from 'split-type';

// GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance optimization: Use requestAnimationFrame for smooth animations
let ticking = false;

// Initialize Locomotive Scroll with performance optimizations
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.05,
    smartphone: {
        smooth: true,
        multiplier: 1
    },
    tablet: {
        smooth: true,
        multiplier: 1
    }
});

// Update ScrollTrigger when locomotive scroll updates
scroll.on('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            ScrollTrigger.update();
            ticking = false;
        });
        ticking = true;
    }
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Mouse move event
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor animation
function updateCursor() {
    // Main cursor
    cursorX = mouseX;
    cursorY = mouseY;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Follower cursor with smooth follow
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(updateCursor);
}

// Start cursor animation
updateCursor();

// Cursor states
const cursorStates = {
    default: {
        scale: 1,
        followerScale: 1
    },
    hover: {
        scale: 1.5,
        followerScale: 2
    }
};

// Update cursor state
function updateCursorState(newState) {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${newState.scale})`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(${newState.followerScale})`;
}

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-item, .philosophy-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        updateCursorState(cursorStates.hover);
    });
    
    element.addEventListener('mouseleave', () => {
        updateCursorState(cursorStates.default);
    });
});

// Text hover effect
const textElements = document.querySelectorAll('h1, h2, h3, p');
textElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            updateCursorState(cursorStates.hover);
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            updateCursorState(cursorStates.default);
        }
    });
});

// Preloader animation with performance optimization
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const main = document.querySelector('main');
    
    gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            preloader.style.display = 'none';
            gsap.to(main, {
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    });
});

// Enhanced text animations
const splitTexts = document.querySelectorAll('.split-text');
splitTexts.forEach(text => {
    const split = new SplitType(text, { types: 'chars, words' });
    
    gsap.from(split.chars, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
        clearProps: 'all'
    });
    
    // Add hover effect to words
    split.words.forEach(word => {
        word.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                gsap.to(word, {
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        word.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                gsap.to(word, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
});

// Timeline animations with performance optimization
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out'
    });
});

// Enhanced section transitions
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    const sectionContent = section.querySelector('.section-content');
    const visualElements = section.querySelectorAll('.visual-element');
    
    // Initial section animation
    gsap.from(sectionContent, {
        scrollTrigger: {
            trigger: section,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    // Visual elements animation
    visualElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: section,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.3
        });
    });

    // Parallax effect for visual elements
    gsap.to(visualElements, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        ease: 'none'
    });
});

// Enhanced project item animations
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach((item, index) => {
    const content = item.querySelector('.project-content');
    const visual = item.querySelector('.visual-element');
    
    // Initial animation
    gsap.from(content, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out'
    });

    gsap.from(visual, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out'
    });

    // Hover animation
    item.addEventListener('mouseenter', () => {
        gsap.to(visual, {
            scale: 1.1,
            opacity: 0.2,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        gsap.to(content, {
            y: -10,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(visual, {
            scale: 1,
            opacity: 0.1,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        gsap.to(content, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
});

// Philosophy items animation
const philosophyItems = document.querySelectorAll('.philosophy-item');
philosophyItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out'
    });

    // Hover animation
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.4,
            ease: 'power2.out'
        });
    });
});

// Smooth scroll between sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            scroll.scrollTo(target);
        }
    });
});

// Performance optimization for resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        scroll.update();
        ScrollTrigger.refresh();
    }, 250);
}); 