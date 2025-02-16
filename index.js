function toggleMenu() {
    const navicon = document.querySelector('.navicon');
    const menulink = document.querySelector('.menulink');
    
    navicon.classList.toggle('open');
    menulink.classList.toggle('open'); // Ensure menu opens/closes
}

// Close the menu when a link is clicked
document.querySelectorAll('.menulink a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.menulink').classList.remove('open');
        document.querySelector('.navicon').classList.remove('open');
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".hidden");
    elements.forEach(element => {
        element.classList.add("slide-in");
        element.classList.remove("hidden");
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("slide-in");
                entry.target.classList.remove("hidden");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll("#profile, #about, .sec_pro_container, .sec_txt, .about-section-content, .about-details-container");
    sections.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", function () {
    const featuredHeading = document.querySelector(".featured-heading");
    const boxes = document.querySelectorAll(".animated-box");
    const texts = document.querySelectorAll(".box-text");
    const boxContainers = document.querySelectorAll(".box-container");

    function scrollHandler() {
        // Animate heading
        if (featuredHeading.getBoundingClientRect().top < window.innerHeight - 100) {
            featuredHeading.style.opacity = 1;
            featuredHeading.style.transform = "translateY(0)";
        }

        // Animate boxes and their respective text
        boxes.forEach((box, index) => {
            const rect = box.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                box.style.opacity = 1;
                box.style.transform = "translateY(0)";
                box.style.transitionDelay = `${index * 0.2}s`;

                // Animate corresponding text
                texts[index].style.opacity = 1;
                texts[index].style.transform = "translateY(0)";
                texts[index].style.transitionDelay = `${index * 0.3}s`;
            }
        });
    }

    // Add click event to keep the holographic effect active
    boxContainers.forEach(container => {
        container.addEventListener("click", function () {
            // Remove active state from all
            boxContainers.forEach(c => c.setAttribute("data-active", "false"));

            // Activate clicked one
            container.setAttribute("data-active", "true");
        });
    });

    window.addEventListener("scroll", scrollHandler);
    scrollHandler(); // Run on load
});

document.addEventListener("DOMContentLoaded", function () {
    const experienceHeading = document.querySelector(".experience-heading");
    const experienceBoxes = document.querySelectorAll(".experience-box");

    function scrollHandler() {
        // Animate heading
        if (experienceHeading.getBoundingClientRect().top < window.innerHeight - 100) {
            experienceHeading.style.opacity = 1;
            experienceHeading.style.transform = "translateY(0)";
        }

        // Animate experience boxes
        experienceBoxes.forEach((box, index) => {
            const rect = box.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                box.style.opacity = 1;
                box.style.transform = "translateY(0)";
                box.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    }

    window.addEventListener("scroll", scrollHandler);
    scrollHandler(); // Run on load
});
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("slide-in");
                entry.target.classList.remove("hidden");
                observer.unobserve(entry.target); // Ensures it animates only once
            }
        });
    }, { threshold: 0.1 });

    // Apply animation only to Education section
    const educationSection = document.querySelector("#education");
    if (educationSection) observer.observe(educationSection);
});


function showCertificate(imagePath) {
    var modal = document.getElementById("certificateModal");
    var modalImg = document.getElementById("certificateImage");
    modal.style.display = "block";
    modalImg.src = imagePath;
}

function closeModal() {
    var modal = document.getElementById("certificateModal");
    modal.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.querySelector(".profile-pic");
    const aboutSection = document.querySelector("#about");

    function scrollHandler() {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (aboutSectionTop < windowHeight / 2) {
            profilePic.classList.add("in-about");
        } else {
            profilePic.classList.remove("in-about");
        }
    }

    window.addEventListener("scroll", scrollHandler);
    scrollHandler(); // Run on load
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section.hidden");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("slide-in");
                entry.target.classList.remove("hidden");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.box1, .section1 h2');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});
//projects
document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll(); // Ensure animations run at load
});

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(function(element) {
        if (isElementInViewport(element)) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
});
//contactinfo
document.getElementById("contactForm").addEventListener("submit", function (event) {
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
//scrolling
document.addEventListener("DOMContentLoaded", function () {
    const profileImg = document.getElementById("profile-img");
    const aboutSection = document.getElementById("about");

    function scrollHandler() {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Check if the about section is in view
        if (aboutSectionTop < windowHeight / 2) {
            profileImg.classList.add("scrolled");
        } else {
            profileImg.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", scrollHandler);
    scrollHandler(); // Run on load in case the page is already scrolled
});
//denied for copying elements
document.addEventListener('dragstart', event => event.preventDefault()); // Disable dragging images and videos
 // Disable dragging images and videos
document.querySelectorAll(".frame a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.stopPropagation(); // Allows the click to work without interfering scripts
    });
});
//box animation in skills
document.querySelectorAll('.box1').forEach(el => {
    el.addEventListener('mouseenter', () => console.log('Hovered!'));
});
getComputedStyle(document.querySelector('.box1')).transition
//tra
async function fixTransitions() {
    const box1Elements = document.querySelectorAll('.box1');
    const h3Elements = document.querySelectorAll('.section1 h3');
  
    // Fix for .box1 elements
    for (const el of box1Elements) {
      await setElementStyles(el, {
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      });
      el.classList.remove('visible');
    }
  
    // Fix for .section1 h3 elements
    for (const el of h3Elements) {
      await setElementStyles(el, {
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      });
      el.classList.remove('tte');
    }
  
    // Simulate adding the visible class after a delay (for demonstration)
    setTimeout(() => {
      for (const el of box1Elements) {
        el.classList.add('visible');
      }
      for (const el of h3Elements) {
        el.classList.add('visible');
      }
    }, 100);
  }
  
  fixTransitions();
  //faqs
  document.addEventListener("DOMContentLoaded", function () {
    const faqs = [
        {
            question: "Q. Are you open to full-time roles?",
            answer: "Yes, I'm actively looking for full-time roles."
        },
        {
            question: "Q. Are you open for new projects?",
            answer: "Yes, I'm available for new projects!"
        },
        {
            question: "Q. Are you open for design collaborations?",
            answer: "I'm always open to collaborate."
        },
        {
            question: "Q. How do you handle tight deadlines?",
            answer: "By prioritizing tasks, clear communication, and focused execution."
        }
    ];

    let currentIndex = 0;

    const questionElement = document.getElementById("faq-question");

    // Function to update the FAQ content
    function updateFAQ(index) {
        questionElement.innerHTML = `
            <div class="faq-question">${faqs[index].question}</div>
            <div class="faq-answer">${faqs[index].answer}</div>
        `;
    }

    // Navigation button logic
    document.getElementById("faq-prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + faqs.length) % faqs.length; // Circular navigation
        updateFAQ(currentIndex);
    });

    document.getElementById("faq-next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % faqs.length; // Circular navigation
        updateFAQ(currentIndex);
    });

    // Initialize with the first FAQ
    updateFAQ(currentIndex);
});
//arrows
document.addEventListener("DOMContentLoaded", function () {
    const scrollUp = document.getElementById("scroll-up");
    const scrollDown = document.getElementById("scroll-down");
    let scrollInterval;

    // Function to start scrolling smoothly
    function startScrolling(direction) {
        stopScrolling();
        scrollInterval = setInterval(() => {
            window.scrollBy({
                top: direction * 50,
                behavior: "auto"
            });
        }, 30);
    }

    // Function to stop scrolling
    function stopScrolling() {
        clearInterval(scrollInterval);
    }

    // Scroll one full page on single click
    scrollUp.addEventListener("click", () => {
        window.scrollBy({
            top: -window.innerHeight,
            behavior: "smooth"
        });
    });

    scrollDown.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });

    // Long press for faster scrolling
    scrollUp.addEventListener("mousedown", () => startScrolling(-4));
    scrollDown.addEventListener("mousedown", () => startScrolling(4));

    // Stop scrolling on mouse release
    scrollUp.addEventListener("mouseup", stopScrolling);
    scrollDown.addEventListener("mouseup", stopScrolling);

    // Stop scrolling if mouse leaves button
    scrollUp.addEventListener("mouseleave", stopScrolling);
    scrollDown.addEventListener("mouseleave", stopScrolling);

    // Hide arrows when at top or bottom
    function toggleArrows() {
        scrollUp.style.display = window.scrollY === 0 ? "none" : "block";
        scrollDown.style.display =
            window.innerHeight + window.scrollY >= document.body.offsetHeight
                ? "none"
                : "block";
    }

    window.addEventListener("scroll", toggleArrows);
    toggleArrows(); // Initialize visibility
});

//datanimation
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".experience-heading,.contact-box,.faq-section, .tte, .title1, .btn, .btncolor-1, .btncolor-2, .btn2, .box1, .section1 h3,#education, #skills, #contact, #projects, .clg-details, .edu-entry, .icon1, .cont, .grid, .frame, .project, .container2, .row");

    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("slide-up-animation");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "50px" });

    elements.forEach(element => observer.observe(element));
});
//navicon
document.addEventListener("DOMContentLoaded", function () {
    const nav3 = document.getElementById("nav3");
    const scrollThreshold = 300; // Configurable scroll threshold

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            nav3.style.opacity = "1";
            nav3.style.visibility = "visible";
            nav3.style.transform = "translateX(-50%) translateY(0)";
        } else {
            nav3.style.opacity = "0";
            nav3.style.visibility = "hidden";
            nav3.style.transform = "translateX(-50%) translateY(10px)";
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    window.addEventListener("scroll", debounce(handleScroll, 100));
    requestAnimationFrame(handleScroll); // Ensure smooth initial rendering
});
//cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.display = 'block'; // Show cursor inside the page
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none'; // Hide cursor when leaving the page
});





