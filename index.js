// Wait for layout to be fully ready
window.addEventListener('load', () => {
    const container = document.querySelector('.capsule-area');
    const capsules = document.querySelectorAll('.capsule');

    if (!container || capsules.length === 0) {
        console.error("Animation Error: Container or capsules not found.");
        return;
    }

    // Physics constants
    const isMobile = window.innerWidth <= 768;
    // Zero gravity on mobile for "space floating" effect; normal gravity on desktop
    const GRAVITY = isMobile ? 0 : 0.1;
    // Lower friction on mobile to keep them moving longer
    const FRICTION = isMobile ? 0.99 : 0.95;
    const BOUNCE = 0.6;   // Bounciness

    // State for each capsule
    const bodies = Array.from(capsules).map(element => {
        // Initialize random positions if not set or parse standard style
        const rect = element.getBoundingClientRect();

        // Initial position relative to container
        // We use offsetLeft/Top which gives position relative to offsetParent (.hero-section likely)
        // But .capsule-area is absolute.
        // Let's rely on the visual position.

        let x = element.offsetLeft;
        let y = element.offsetTop;

        return {
            element,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 5, // Random initial velocity
            vy: (Math.random() - 0.5) * 5,
            width: rect.width,
            height: rect.height,
            isDragging: false,
            dragOffsetX: 0,
            dragOffsetY: 0,
            lastMouseX: 0,
            lastMouseY: 0
        };
    });

    // Main Animation Loop
    function update() {
        // Recalculate dimensions in case of resize
        const containerRect = container.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        bodies.forEach(body => {
            if (body.isDragging) {
                return;
            }

            // Apply Gravity
            body.vy += GRAVITY;

            // Apply Friction
            body.vx *= FRICTION;
            body.vy *= FRICTION;

            // Update Position
            body.x += body.vx;
            body.y += body.vy;

            // Floor Collision
            if (body.y + body.height > height) {
                body.y = height - body.height;
                body.vy *= -BOUNCE;

                // Prevent endless micro-bouncing when settling
                if (Math.abs(body.vy) < GRAVITY * 2) {
                    body.vy = 0;
                }
            }

            // Ceiling Collision
            if (body.y < 0) {
                body.y = 0;
                body.vy *= -BOUNCE;
            }

            // Wall Collision
            if (body.x + body.width > width) {
                body.x = width - body.width;
                body.vx *= -BOUNCE;
            }
            if (body.x < 0) {
                body.x = 0;
                body.vx *= -BOUNCE;
            }

            // Apply to DOM
            body.element.style.left = body.x + 'px';
            body.element.style.top = body.y + 'px';
        });

        requestAnimationFrame(update);
    }

    // Drag functionality (Touch + Mouse Support)
    bodies.forEach(body => {
        const startDrag = (e) => {
            body.isDragging = true;
            body.element.style.cursor = 'grabbing';
            const rect = body.element.getBoundingClientRect();

            // Get client coordinates from touch or mouse event
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            // Correct offset calculation: Mouse/Touch position relative to element
            body.dragOffsetX = clientX - rect.left;
            body.dragOffsetY = clientY - rect.top;

            // Stop movement while dragging
            body.vx = 0;
            body.vy = 0;

            body.lastMouseX = clientX;
            body.lastMouseY = clientY;

            e.preventDefault(); // Prevent text selection and scrolling
        };

        // Add both touch and mouse listeners
        body.element.addEventListener('mousedown', startDrag);
        body.element.addEventListener('touchstart', startDrag, { passive: false });
    });

    const onDrag = (e) => {
        bodies.forEach(body => {
            if (!body.isDragging) return;

            // Get client coordinates from touch or mouse event
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            // Mouse/Touch position relative to container
            const containerRect = container.getBoundingClientRect();

            // New X/Y relative to container-top-left
            const newX = clientX - containerRect.left - body.dragOffsetX;
            const newY = clientY - containerRect.top - body.dragOffsetY;

            body.x = newX;
            body.y = newY;

            // Apply directly
            body.element.style.left = body.x + 'px';
            body.element.style.top = body.y + 'px';

            // Calculate "Throw" velocity
            body.vx = (clientX - body.lastMouseX) * 0.5;
            body.vy = (clientY - body.lastMouseY) * 0.5;

            body.lastMouseX = clientX;
            body.lastMouseY = clientY;
        });
    };

    const stopDrag = () => {
        bodies.forEach(body => {
            if (body.isDragging) {
                body.isDragging = false;
                body.element.style.cursor = 'grab';
            }
        });
    };

    // Add both touch and mouse listeners to window
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });

    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);


    // Typewriter Effect
    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;

            // --- Dynamic Subtitle Update ---
            const subtitleEl = document.querySelector('.subtitle');
            const roleKey = fullTxt;
            const roleSubtitles = {
                "Analyst": "Turning raw data into actionable business insights.",
                "Scientist": "Building predictive models to solve complex challenges.",
                "Visualization": "Crafting compelling stories through interactive dashboards.",
                "Engineer": "Architecting scalable data pipelines and robust infrastructure."
            };

            if (subtitleEl && roleSubtitles[roleKey]) {
                subtitleEl.style.opacity = '0';
                setTimeout(() => {
                    subtitleEl.textContent = roleSubtitles[roleKey];
                    subtitleEl.style.opacity = '0.8';
                }, 300);
            }
            // -------------------------------

        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    // Initialize Typewriter
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // Inject CSS for cursor
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const nlinks = document.querySelector('.nlinks');

    if (menuToggle && nlinks) {
        menuToggle.addEventListener('click', () => {
            nlinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = nlinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                nlinks.classList.remove('active');
            });
        });
    }

    // Video Hover Effect
    // Video Hover Effect
    const videoCards = document.querySelectorAll('.card');
    console.log(`Found ${videoCards.length} cards for interaction.`);

    videoCards.forEach((card, index) => {
        const video = card.querySelector('.hover-video');
        if (video) {
            // Enforce properties for autoplay policy
            video.muted = true;
            video.playsInline = true;
            video.loop = true;

            // Preload to ensure readiness
            video.preload = "auto";

            card.addEventListener('mouseenter', () => {
                video.currentTime = 0; // Restart on enter
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn(`Video play failed for card ${index} (${video.src}):`, error);
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // 3D Tilt Effect
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max -5deg to 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // FAQ Logic
    // FAQ Logic
    const faqData = [
        { q: "Q. Are you open to full-time roles?", a: "Yes, I'm actively looking for full-time roles." },
        { q: "Q. Are you open for new projects?", a: "Yes, I'm available for new projects!" },
        { q: "Q. Are you open for design collaborations?", a: "I'm always open to collaborate." },
        { q: "Q. How do you handle tight deadlines?", a: "By prioritizing tasks, clear communication, and focused execution." }
    ];

    let currentFaq = 0;
    const questionEl = document.getElementById('faq-question');
    const answerEl = document.getElementById('faq-answer');
    const prevBtn = document.getElementById('faq-prev');
    const nextBtn = document.getElementById('faq-next');
    let faqInterval;

    function updateFaq() {
        if (!questionEl || !answerEl) return;

        // 1. Fade OUT
        questionEl.style.opacity = '0';
        questionEl.style.transform = 'translateY(10px)';
        answerEl.style.opacity = '0';
        answerEl.style.transform = 'translateY(10px)';

        // 2. Wait for fade out, then swap text and Fade IN
        setTimeout(() => {
            questionEl.textContent = faqData[currentFaq].q;
            answerEl.textContent = faqData[currentFaq].a;

            questionEl.style.opacity = '1';
            questionEl.style.transform = 'translateY(0)';
            answerEl.style.opacity = '1';
            answerEl.style.transform = 'translateY(0)';
        }, 500); // Matches CSS transition duration (0.5s)
    }

    function startFaqLoop() {
        if (faqInterval) clearInterval(faqInterval);
        faqInterval = setInterval(() => {
            currentFaq = (currentFaq + 1) % faqData.length;
            updateFaq();
        }, 5000); // Change every 5 seconds
    }

    function resetFaqLoop() {
        if (faqInterval) clearInterval(faqInterval);
        startFaqLoop();
    }

    if (prevBtn && nextBtn) {
        // Init first question
        updateFaq();
        startFaqLoop();

        nextBtn.addEventListener('click', () => {
            currentFaq = (currentFaq + 1) % faqData.length;
            updateFaq();
            resetFaqLoop();
        });

        prevBtn.addEventListener('click', () => {
            currentFaq = (currentFaq - 1 + faqData.length) % faqData.length;
            updateFaq();
            resetFaqLoop();
        });
    }


    // Contact Form Logic
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload

            // Editable variables for email and SMS
            const emailAddress = "puttasathvik16@gmail.com"; // Replace with your email address
            const smsNumber = "+1(475)837 8069"; // Replace with your SMS number (international format)

            // Get form values
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let phone = document.getElementById("phone").value.trim();
            let subject = document.getElementById("subject").value.trim();
            let message = document.getElementById("message").value.trim();

            // Regular expressions for validation
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let phonePattern = /^[0-9]{10,15}$/;

            // Validate input fields
            if (!name || !email || !phone || !subject || !message) {
                alert("⚠️ Please fill in all fields.");
                return;
            }

            // Validate email format
            if (!emailPattern.test(email)) {
                alert("⚠️ Please enter a valid email address.");
                return;
            }

            // Validate phone number format
            if (!phonePattern.test(phone)) {
                alert("⚠️ Please enter a valid phone number (only digits, min 10).");
                return;
            }

            // Email Submission via `mailto:`
            let mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\nPhone: " + phone +
                "\n\nMessage:\n" + message
            )}`;

            // SMS Submission via `sms:`
            let smsLink = `sms:${smsNumber}?body=${encodeURIComponent(
                "Name: " + name +
                "\nPhone: " + phone +
                "\n\nMessage:\n" + message
            )}`;

            // Ask the user how they want to send the form
            let submissionChoice = confirm("Do you want to submit via Email? Press 'Cancel' to send via SMS.");

            if (submissionChoice) {
                // Redirect to email client
                window.location.href = mailtoLink;
            } else {
                // Redirect to SMS app
                window.location.href = smsLink;
            }

            // Show success message (only appears if no redirection issues)
            alert("✅ Submission initiated!");

            // Clear the form
            document.getElementById("contactForm").reset();
        });
    }

    // Scroll Animation Observer
    // Enhanced Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Handle Stagger Containers (Parent triggers children)
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.querySelectorAll('.animate-on-scroll');
                    children.forEach((child, index) => {
                        // Apply incremental delay if not already set
                        if (!child.style.transitionDelay) {
                            child.style.transitionDelay = `${index * 150}ms`;
                        }
                        child.classList.add('active');
                    });

                    // Trigger Wiring Animations (Tree Trunk & Connectors)
                    const wiring = entry.target.querySelectorAll('.draw-on-scroll');
                    wiring.forEach(wire => wire.classList.add('active'));

                    entry.target.classList.add('active');
                }
                // 2. Handle Individual Elements
                else if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('active');
                }
                // 3. Handle Old Legacy 'reveal' Elements (Backwards compatibility)
                else if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                }
                // 4. Handle Draw-on-Scroll Elements (Skill Tree)
                else if (entry.target.classList.contains('draw-on-scroll')) {
                    entry.target.classList.add('active');
                }

                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all relevant elements
    const scrollElements = document.querySelectorAll('.animate-on-scroll, .stagger-container, .reveal, .draw-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    // Quick Ball Logic (Draggable & Responsive)
    const qbTrigger = document.getElementById('quick-ball-trigger');
    const qbContainer = document.getElementById('quick-ball-container');

    if (qbTrigger && qbContainer) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        let hasMoved = false;

        // --- Drag Functionality (Touch & Mouse) ---
        const startDrag = (e) => {
            // Only drag if clicking the trigger (ball)
            if (e.target.closest('.qb-item')) return; // Allow clicking items

            isDragging = true;
            hasMoved = false;
            qbContainer.classList.add('dragging'); // Disable transitions during drag

            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

            // Get current computed position
            const rect = qbContainer.getBoundingClientRect();
            startX = clientX;
            startY = clientY;

            // We use right/bottom in CSS, but for dragging we'll switch to fixed left/top calculation or modify transform
            // Easier approach: Use transform translate for dragging, then commit to left/top or right/bottom on release.
            // Let's stick to modifying 'right' and 'bottom' or convert to 'left'/'top'.
            // To allow free movement, let's switch to left/top fixed positioning once dragged.

            // Calculate current left/top based on viewport
            initialLeft = rect.left;
            initialTop = rect.top;

            // Remove bottom/right and set explicit left/top to allow dragging
            qbContainer.style.bottom = 'auto';
            qbContainer.style.right = 'auto';
            qbContainer.style.left = `${initialLeft}px`;
            qbContainer.style.top = `${initialTop}px`;
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scroll on touch

            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
            }

            let newLeft = initialLeft + deltaX;
            let newTop = initialTop + deltaY;

            // Boundary constraints
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const ballSize = qbContainer.offsetWidth;

            if (newLeft < 0) newLeft = 0;
            if (newLeft > viewportWidth - ballSize) newLeft = viewportWidth - ballSize;
            if (newTop < 0) newTop = 0;
            if (newTop > viewportHeight - ballSize) newTop = viewportHeight - ballSize;

            qbContainer.style.left = `${newLeft}px`;
            qbContainer.style.top = `${newTop}px`;
        };

        const stopDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            qbContainer.classList.remove('dragging');

            // Optional: Snap to nearest edge (X axis)
            /*
            const rect = qbContainer.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            if (rect.left + rect.width / 2 < viewportWidth / 2) {
                qbContainer.style.left = '10px';
            } else {
                qbContainer.style.left = (viewportWidth - rect.width - 10) + 'px';
            }
            */
        };

        // Event Listeners
        qbTrigger.addEventListener('mousedown', startDrag);
        qbTrigger.addEventListener('touchstart', startDrag, { passive: false });

        window.addEventListener('mousemove', onDrag);
        window.addEventListener('touchmove', onDrag, { passive: false });

        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);

        // Toggle Menu (Only if not dragged)
        qbTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!hasMoved) {
                qbContainer.classList.toggle('active');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!hasMoved && !qbContainer.contains(e.target)) {
                qbContainer.classList.remove('active');
            }
        });

        // Close when clicking a menu item
        const qbItems = document.querySelectorAll('.qb-item');
        qbItems.forEach(item => {
            item.addEventListener('click', () => {
                // Instant close for direct action
                qbContainer.classList.remove('active');
            });
        });
    }

    // Start the physics loop
    requestAnimationFrame(update);

    // ============================================
    // CUSTOM CURSOR FUNCTIONALITY
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;

        // Track mouse position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth animation loop for cursor
        function animateCursor() {
            // Smooth follow for dot (faster)
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;

            // Smooth follow for outline (slower for trail effect)
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn-designer, .card, .box-container, .glass-icon, input, textarea, .qb-item, .capsule, img[onclick], .hero-icon');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        // Click effect
        window.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-active');
        });

        window.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-active');
        });
    }

    // ============================================
    // GOOGLE ANALYTICS EVENT TRACKING
    // ============================================

    // Helper function to safely send GA events
    function trackEvent(eventName, eventParams = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventParams);
            console.log('GA Event:', eventName, eventParams);
        }
    }

    // Track Resume Download
    const resumeBtn = document.querySelector('.btn-designer[onclick*="Sathvik_Putta.pdf"]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            trackEvent('resume_download', {
                'event_category': 'engagement',
                'event_label': 'Resume PDF'
            });
        });
    }

    // Track Contact Button Clicks
    const contactBtns = document.querySelectorAll('.btn-designer[onclick*="contact"]');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('contact_click', {
                'event_category': 'engagement',
                'event_label': 'Contact Button'
            });
        });
    });

    // Track Social Media Clicks
    const socialLinks = {
        'linkedin': document.querySelector('img[onclick*="linkedin"]'),
        'github': document.querySelector('img[onclick*="github"]')
    };

    Object.entries(socialLinks).forEach(([platform, element]) => {
        if (element) {
            element.addEventListener('click', () => {
                trackEvent('social_click', {
                    'event_category': 'social_media',
                    'event_label': platform,
                    'platform': platform
                });
            });
        }
    });

    // Track Navigation Clicks
    const navLinks = document.querySelectorAll('.nlinks a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const section = link.getAttribute('href').replace('#', '');
            trackEvent('navigation', {
                'event_category': 'navigation',
                'event_label': section,
                'section': section
            });
        });
    });

    // Track Project Card Interactions
    const projectCards = document.querySelectorAll('.card');
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const projectTitle = card.querySelector('h2')?.textContent || `Project ${index + 1}`;
            trackEvent('project_view', {
                'event_category': 'engagement',
                'event_label': projectTitle,
                'project_index': index
            });
        });

        // Track project link clicks
        const projectLink = card.querySelector('a.btn-designer');
        if (projectLink) {
            projectLink.addEventListener('click', () => {
                const projectTitle = card.querySelector('h2')?.textContent || `Project ${index + 1}`;
                trackEvent('project_click', {
                    'event_category': 'engagement',
                    'event_label': projectTitle,
                    'project_index': index
                });
            });
        }
    });

    // Track Featured Platform Clicks
    const featuredBoxes = document.querySelectorAll('.box-container a');
    featuredBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const platform = box.querySelector('.box-text')?.textContent || 'Unknown';
            trackEvent('featured_platform_click', {
                'event_category': 'social_media',
                'event_label': platform,
                'platform': platform
            });
        });
    });

    // Track Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            trackEvent('form_submission', {
                'event_category': 'engagement',
                'event_label': 'Contact Form',
                'form_type': 'contact'
            });
        });
    }

    // Track Email/Phone Button Clicks
    const emailBtn = document.querySelector('button[onclick*="mailto"]');
    const phoneBtn = document.querySelector('button[onclick*="tel"]');

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            trackEvent('contact_method', {
                'event_category': 'engagement',
                'event_label': 'Email',
                'method': 'email'
            });
        });
    }

    if (phoneBtn) {
        phoneBtn.addEventListener('click', () => {
            trackEvent('contact_method', {
                'event_category': 'engagement',
                'event_label': 'Phone',
                'method': 'phone'
            });
        });
    }

    // Track Scroll Depth
    let scrollDepth = 0;
    const scrollMilestones = [25, 50, 75, 100];

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.scrollY / documentHeight) * 100;

        scrollMilestones.forEach(milestone => {
            if (scrolled >= milestone && scrollDepth < milestone) {
                scrollDepth = milestone;
                trackEvent('scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': `${milestone}%`,
                    'percentage': milestone
                });
            }
        });
    });

    // Track Time on Page
    let timeOnPage = 0;
    const timeInterval = setInterval(() => {
        timeOnPage += 30;
        if (timeOnPage % 60 === 0) { // Every 60 seconds
            trackEvent('time_on_page', {
                'event_category': 'engagement',
                'event_label': `${timeOnPage} seconds`,
                'seconds': timeOnPage
            });
        }
    }, 30000); // Check every 30 seconds

    // Track Page Visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            trackEvent('page_hidden', {
                'event_category': 'engagement',
                'event_label': 'User left page'
            });
        } else {
            trackEvent('page_visible', {
                'event_category': 'engagement',
                'event_label': 'User returned to page'
            });
        }
    });

    console.log('Google Analytics tracking initialized ✓');

    // ============================================
    // SOCIAL SHARE FUNCTIONALITY
    // ============================================

    const shareToggle = document.getElementById('shareToggle');
    const sharePanel = document.querySelector('.share-panel');
    const shareButtons = document.querySelectorAll('.share-btn');

    // Toggle share panel
    if (shareToggle) {
        shareToggle.addEventListener('click', () => {
            sharePanel.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!sharePanel.contains(e.target)) {
                sharePanel.classList.remove('active');
            }
        });
    }

    // Share functionality
    shareButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const platform = btn.dataset.share;
            // Use actual portfolio URL
            const url = 'https://sathvikputta.site';
            const title = 'Check out Sathvik Putta\'s Portfolio - Data Engineer';
            const description = 'Experienced Data Engineer specializing in scalable data pipelines, cloud solutions, and analytics. View my projects and experience!';

            // Handle copy separately
            if (platform === 'copy') {
                try {
                    await navigator.clipboard.writeText(url);
                    // Show success feedback
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    btn.style.background = 'rgba(147, 51, 234, 0.3)';

                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                    }, 2000);

                    // Track copy event
                    if (typeof trackEvent !== 'undefined') {
                        trackEvent('share', {
                            'event_category': 'social_share',
                            'event_label': 'copy_link',
                            'platform': 'copy'
                        });
                    }

                    console.log('✓ Link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy:', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        console.log('✓ Link copied (fallback method)');
                    } catch (err2) {
                        alert('Failed to copy link. Please copy manually: ' + url);
                    }
                    document.body.removeChild(textArea);
                }
                return;
            }

            // Try Web Share API first (mobile devices)
            if (navigator.share && platform !== 'email') {
                try {
                    await navigator.share({
                        title: title,
                        text: description,
                        url: url
                    });

                    // Track share event
                    if (typeof trackEvent !== 'undefined') {
                        trackEvent('share', {
                            'event_category': 'social_share',
                            'event_label': platform + '_native',
                            'platform': platform
                        });
                    }

                    console.log(`✓ Shared via native ${platform}`);
                    return;
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.log('Web Share API failed, using fallback');
                    }
                }
            }

            // Fallback to URL-based sharing
            let shareUrl = '';

            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`;
                    break;
            }

            if (shareUrl) {
                // Open in new window/tab
                const width = 600;
                const height = 500;
                const left = (window.innerWidth - width) / 2;
                const top = (window.innerHeight - height) / 2;

                const popup = window.open(
                    shareUrl,
                    'share',
                    `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
                );

                if (!popup) {
                    // Popup blocked, try opening in same tab
                    window.location.href = shareUrl;
                }

                // Track share event
                if (typeof trackEvent !== 'undefined') {
                    trackEvent('share', {
                        'event_category': 'social_share',
                        'event_label': platform,
                        'platform': platform
                    });
                }

                console.log(`✓ Opened ${platform} share dialog`);
            }
        });
    });

    console.log('✓ Social share buttons initialized');
});
