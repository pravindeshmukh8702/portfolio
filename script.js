// script.js
// Initialize EmailJS with your Public Key (REPLACE WITH YOUR ACTUAL KEY)
(function() {
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Get from https://www.emailjs.com
})();

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // ===== TYPING ANIMATION =====
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Everything.',
        'Deployments.',
        'Infrastructure.',
        'Monitoring.',
        'Security.',
        'Recovery.',
        'Compliance.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeEffect() {
        if (isPaused) return;

        const currentPhrase = phrases[phraseIndex];
        if (!isDeleting && charIndex < currentPhrase.length) {
            typingText.textContent += currentPhrase.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex > 0) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                setTimeout(typeEffect, 1500);
            }, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        }
    }
    setTimeout(typeEffect, 1000);

    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 20);
        } else {
            counter.innerText = target.toFixed(target % 1 ? 2 : 0);
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // ===== MOBILE NAV TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===== TAB FUNCTIONALITY =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Show active pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // ===== SKILLS CLOUD =====
    const skills = [
        { name: 'AWS', icon: 'fab fa-aws' },
        { name: 'Kubernetes', icon: 'fas fa-cubes' },
        { name: 'Terraform', icon: 'fas fa-cloud' },
        { name: 'Docker', icon: 'fab fa-docker' },
        { name: 'Jenkins', icon: 'fab fa-jenkins' },
        { name: 'Ansible', icon: 'fas fa-server' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'GitHub Actions', icon: 'fab fa-github' },
        { name: 'ArgoCD', icon: 'fas fa-sync-alt' },
        { name: 'Prometheus', icon: 'fas fa-chart-line' },
        { name: 'Grafana', icon: 'fas fa-chart-bar' },
        { name: 'Linux', icon: 'fab fa-linux' },
        { name: 'Bash', icon: 'fas fa-terminal' },
        { name: 'CloudFormation', icon: 'fas fa-layer-group' },
        { name: 'Helm', icon: 'fas fa-ship' }
    ];

    const skillsCloud = document.querySelector('.skills-cloud');
    skills.forEach(skill => {
        const skillEl = document.createElement('div');
        skillEl.className = 'skill-item';
        skillEl.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
        skillsCloud.appendChild(skillEl);
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            sender_name: document.getElementById('senderName').value,
            sender_email: document.getElementById('senderEmail').value,
            message: document.getElementById('message').value,
            to_name: "Pravin Deshmukh",
            to_email: "pravindeshmukh8702@gmail.com"
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData) // REPLACE WITH YOUR IDs
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                // Show success toast
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
                // Reset form
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Oops! Something went wrong. Please email me directly at pravindeshmukh8702@gmail.com');
            });
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // ===== INITIALIZE TOOLTIPS =====
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            // Tooltip is handled by CSS
        });
    });

    console.log('🤖 Automation Portfolio v2.0 Loaded');
});
