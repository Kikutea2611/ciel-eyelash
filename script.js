document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial State Setting (to prevent FOUC if CSS didn't handle it, though 'from' tweens handle most)
    // It's often safer to use .from() for entry animations so elements are visible if JS fails,
    // but for "premium" feel avoiding the jump is key. 
    // We will use .from() with opacity: 0 which GSAP handles immediately.

    // --- Hero Animation ---
    const tlHero = gsap.timeline();

    tlHero.from(".hero-content", {
        duration: 1.5,
        opacity: 0,
        y: 30,
        ease: "power3.out",
        delay: 0.2
    })
        .from(".subtitle", {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power2.out"
        }, "-=1.0")
        .from("h1", {
            duration: 1,
            opacity: 0,
            scale: 0.95,
            ease: "power2.out"
        }, "-=0.8")
        .from(".hero-btn", {
            duration: 0.8,
            opacity: 0,
            y: 10,
            ease: "back.out(1.7)"
        }, "-=0.6");


    // --- Common Section Title Animation ---
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50, // Increased movement
            scale: 0.9, // Added scale for more emphasis
            duration: 1,
            ease: "power3.out"
        });
    });

    // --- Concept Section ---
    gsap.from(".concept-text p", {
        scrollTrigger: {
            trigger: ".concept-text",
            start: "top 80%",
        },
        y: 50, // Increased movement
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out"
    });


    // --- Menu Section ---
    // Make menu headers animate first
    gsap.utils.toArray(".menu-category").forEach(category => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30, // Horizontal slide for category
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Use batch for menu items to handle layout shifts better and ensure visibility
    ScrollTrigger.batch(".menu-item", {
        interval: 0.1, // time window (in seconds) for batching to occur. 
        batchMax: 3,   // maximum batch size (targets)
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        onLeave: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }), // Increased reset distance
        onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }), // Increased reset distance
        start: "top 90%",
    });

    // Set initial state for batch items manually to avoid FOUC or permanent invisibility
    gsap.set(".menu-item", { y: 50, opacity: 0 });


    // --- News Section ---
    gsap.from(".news-slider", {
        scrollTrigger: {
            trigger: ".news",
            start: "top 80%",
        },
        opacity: 0,
        scale: 0.9, // More dramatic scale
        y: 30,
        duration: 1,
        ease: "power3.out"
    });

    // --- Access Section ---
    gsap.from(".access-image", {
        scrollTrigger: {
            trigger: ".access-content",
            start: "top 75%",
        },
        x: -50,
        y: 30, // Added vertical movement
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".access-info", {
        scrollTrigger: {
            trigger: ".access-content",
            start: "top 75%",
        },
        x: 50,
        y: 30, // Added vertical movement
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2 // Slight delay after image
    });

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const newsImages = document.querySelectorAll('.news-item img');

    newsImages.forEach(img => {
        img.addEventListener('click', function () {
            lightbox.classList.add('active');
            lightboxImg.src = this.src;
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
        });
    });

    // Close on button click
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});
