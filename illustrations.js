// ============================================
// APPLE-STYLE ILLUSTRATIONS (SVG)
// ============================================

// SVG Illustration Templates
const illustrations = {
    about: `
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-about" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3CAC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#784BA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Person Icon -->
            <circle cx="150" cy="100" r="40" fill="url(#grad-about)" opacity="0.3"/>
            <path d="M 150 150 Q 100 180 80 250 L 220 250 Q 200 180 150 150 Z" fill="url(#grad-about)" opacity="0.3"/>
            <circle cx="150" cy="100" r="35" fill="none" stroke="url(#grad-about)" stroke-width="3"/>
            <path d="M 150 145 Q 105 170 90 240 L 210 240 Q 195 170 150 145 Z" fill="none" stroke="url(#grad-about)" stroke-width="3"/>
        </svg>
    `,

    experience: `
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-exp" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3CAC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#784BA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Ascending Steps -->
            <rect x="50" y="200" width="60" height="40" rx="5" fill="url(#grad-exp)" opacity="0.3"/>
            <rect x="120" y="160" width="60" height="80" rx="5" fill="url(#grad-exp)" opacity="0.4"/>
            <rect x="190" y="120" width="60" height="120" rx="5" fill="url(#grad-exp)" opacity="0.5"/>
            <!-- Arrow -->
            <path d="M 60 80 L 240 80" stroke="url(#grad-exp)" stroke-width="4" fill="none"/>
            <path d="M 220 65 L 245 80 L 220 95" stroke="url(#grad-exp)" stroke-width="4" fill="none" stroke-linejoin="round"/>
        </svg>
    `,

    education: `
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-edu" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3CAC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#784BA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Graduation Cap -->
            <path d="M 150 100 L 250 130 L 150 160 L 50 130 Z" fill="url(#grad-edu)" opacity="0.4"/>
            <path d="M 150 100 L 250 130 L 150 160 L 50 130 Z" fill="none" stroke="url(#grad-edu)" stroke-width="3"/>
            <rect x="140" y="160" width="20" height="80" fill="url(#grad-edu)" opacity="0.3"/>
            <circle cx="150" cy="250" r="15" fill="url(#grad-edu)" opacity="0.4"/>
            <!-- Book -->
            <rect x="100" y="180" width="40" height="50" rx="3" fill="url(#grad-edu)" opacity="0.2"/>
            <rect x="160" y="180" width="40" height="50" rx="3" fill="url(#grad-edu)" opacity="0.2"/>
        </svg>
    `,

    skills: `
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-skills" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3CAC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#784BA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Gear/Cog -->
            <circle cx="150" cy="150" r="50" fill="url(#grad-skills)" opacity="0.3" class="illustration-rotate"/>
            <circle cx="150" cy="150" r="30" fill="#000" opacity="0.1"/>
            <rect x="145" y="90" width="10" height="30" rx="2" fill="url(#grad-skills)" opacity="0.4"/>
            <rect x="145" y="180" width="10" height="30" rx="2" fill="url(#grad-skills)" opacity="0.4"/>
            <rect x="90" y="145" width="30" height="10" rx="2" fill="url(#grad-skills)" opacity="0.4"/>
            <rect x="180" y="145" width="30" height="10" rx="2" fill="url(#grad-skills)" opacity="0.4"/>
            <!-- Code Brackets -->
            <path d="M 80 100 L 60 120 L 80 140" stroke="url(#grad-skills)" stroke-width="4" fill="none" opacity="0.5"/>
            <path d="M 220 100 L 240 120 L 220 140" stroke="url(#grad-skills)" stroke-width="4" fill="none" opacity="0.5"/>
        </svg>
    `,

    projects: `
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-proj" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3CAC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#784BA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Rocket -->
            <path d="M 150 50 L 170 150 L 150 140 L 130 150 Z" fill="url(#grad-proj)" opacity="0.4"/>
            <ellipse cx="150" cy="150" rx="20" ry="10" fill="url(#grad-proj)" opacity="0.3"/>
            <path d="M 130 150 Q 120 180 110 200" stroke="url(#grad-proj)" stroke-width="8" fill="none" opacity="0.3" stroke-linecap="round"/>
            <path d="M 170 150 Q 180 180 190 200" stroke="url(#grad-proj)" stroke-width="8" fill="none" opacity="0.3" stroke-linecap="round"/>
            <!-- Stars -->
            <circle cx="80" cy="80" r="3" fill="url(#grad-proj)" opacity="0.5"/>
            <circle cx="220" cy="100" r="4" fill="url(#grad-proj)" opacity="0.5"/>
            <circle cx="200" cy="60" r="2" fill="url(#grad-proj)" opacity="0.5"/>
        </svg>
    `,

    contact: `
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-contact" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3CAC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#784BA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Envelope -->
            <rect x="70" y="110" width="160" height="100" rx="10" fill="url(#grad-contact)" opacity="0.3"/>
            <path d="M 70 110 L 150 160 L 230 110" stroke="url(#grad-contact)" stroke-width="4" fill="none"/>
            <rect x="70" y="110" width="160" height="100" rx="10" fill="none" stroke="url(#grad-contact)" stroke-width="3"/>
            <!-- Message Bubble -->
            <circle cx="200" cy="80" r="30" fill="url(#grad-contact)" opacity="0.4"/>
            <path d="M 190 95 L 200 105 L 185 105" fill="url(#grad-contact)" opacity="0.4"/>
            <circle cx="190" cy="75" r="3" fill="#fff"/>
            <circle cx="200" cy="75" r="3" fill="#fff"/>
            <circle cx="210" cy="75" r="3" fill="#fff"/>
        </svg>
    `,

    playground: `
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-play" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3CAC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#784BA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Code Window -->
            <rect x="60" y="80" width="180" height="140" rx="10" fill="url(#grad-play)" opacity="0.2"/>
            <rect x="60" y="80" width="180" height="140" rx="10" fill="none" stroke="url(#grad-play)" stroke-width="3"/>
            <circle cx="80" cy="100" r="5" fill="url(#grad-play)" opacity="0.5"/>
            <circle cx="100" cy="100" r="5" fill="url(#grad-play)" opacity="0.5"/>
            <circle cx="120" cy="100" r="5" fill="url(#grad-play)" opacity="0.5"/>
            <!-- Code Lines -->
            <line x1="80" y1="130" x2="160" y2="130" stroke="url(#grad-play)" stroke-width="3" opacity="0.4"/>
            <line x1="80" y1="150" x2="200" y2="150" stroke="url(#grad-play)" stroke-width="3" opacity="0.4"/>
            <line x1="80" y1="170" x2="140" y2="170" stroke="url(#grad-play)" stroke-width="3" opacity="0.4"/>
            <line x1="80" y1="190" x2="180" y2="190" stroke="url(#grad-play)" stroke-width="3" opacity="0.4"/>
        </svg>
    `
};

// Insert illustrations into sections
document.addEventListener('DOMContentLoaded', function () {
    // About section
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutIllustration = document.createElement('div');
        aboutIllustration.className = 'section-illustration about-illustration illustration-animate';
        aboutIllustration.innerHTML = illustrations.about;
        aboutSection.style.position = 'relative';
        aboutSection.appendChild(aboutIllustration);
    }

    // Experience section
    const expSection = document.querySelector('#experience');
    if (expSection) {
        const expIllustration = document.createElement('div');
        expIllustration.className = 'section-illustration experience-illustration illustration-pulse';
        expIllustration.innerHTML = illustrations.experience;
        expSection.style.position = 'relative';
        expSection.appendChild(expIllustration);
    }

    // Education section
    const eduSection = document.querySelector('#education');
    if (eduSection) {
        const eduIllustration = document.createElement('div');
        eduIllustration.className = 'section-illustration education-illustration';
        eduIllustration.innerHTML = illustrations.education;
        eduSection.style.position = 'relative';
        eduSection.appendChild(eduIllustration);
    }

    // Skills section
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsIllustration = document.createElement('div');
        skillsIllustration.className = 'section-illustration skills-illustration';
        skillsIllustration.innerHTML = illustrations.skills;
        skillsSection.style.position = 'relative';
        skillsSection.appendChild(skillsIllustration);
    }

    // Projects section
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        const projectsIllustration = document.createElement('div');
        projectsIllustration.className = 'section-illustration projects-illustration illustration-animate';
        projectsIllustration.innerHTML = illustrations.projects;
        projectsSection.style.position = 'relative';
        projectsSection.appendChild(projectsIllustration);
    }

    // Playground section
    const playgroundSection = document.querySelector('#playground');
    if (playgroundSection) {
        const playIllustration = document.createElement('div');
        playIllustration.className = 'section-illustration playground-illustration illustration-pulse';
        playIllustration.innerHTML = illustrations.playground;
        playgroundSection.style.position = 'relative';
        playgroundSection.appendChild(playIllustration);
    }

    // Contact section
    const contactSection = document.querySelector('#contact1');
    if (contactSection) {
        const contactIllustration = document.createElement('div');
        contactIllustration.className = 'section-illustration contact-illustration illustration-animate';
        contactIllustration.innerHTML = illustrations.contact;
        contactSection.style.position = 'relative';
        contactSection.appendChild(contactIllustration);
    }

    console.log('✓ Apple-style illustrations loaded');
});
