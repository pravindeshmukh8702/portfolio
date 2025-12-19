// script.js
// Initialize EmailJS with your Public Key (FROM YOUR JS FILE)
(function() {
    emailjs.init("r3BlcMIylkXvfaeHs"); // Your actual public key from previous file
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

    // ===== CONTACT FORM WITH YOUR EMAILJS CREDENTIALS =====
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            from_name: document.getElementById('senderName').value,
            from_email: document.getElementById('senderEmail').value,
            subject: "Automation Proposal Request from Portfolio",
            message: document.getElementById('message').value,
            to_email: "pravindeshmukh8702@gmail.com"
        };

        console.log("Sending email with data:", formData);

        // Send email using YOUR EmailJS credentials from your previous file
        emailjs.send(
            "service_lioj3gi",  // Your Service ID
            "template_61v5d9b", // Your Template ID
            formData
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success toast
            toast.textContent = "✓ Automation request sent! I'll contact you soon.";
            toast.classList.add('show');
            
            // Reset form
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide toast after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            toast.textContent = "Failed to send. Please email me directly at pravindeshmukh8702@gmail.com";
            toast.classList.add('show');
            toast.style.borderLeftColor = "var(--danger)";
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide toast after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                toast.style.borderLeftColor = "var(--primary)";
            }, 5000);
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

    console.log('🤖 Pravin Automates Portfolio v2.0 Loaded');
});

// Add CSS for animations and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fa-spin {
        animation: fa-spin 1s infinite linear;
    }
    
    @keyframes fa-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .toast.show {
        transform: translateX(0);
        animation: slideInRight 0.5s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
