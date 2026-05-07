// Init icons
lucide.createIcons();


// === PAGE LOADER ===
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('done'), 800);
});

// === CUSTOM CURSOR ===
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
if (dot && ring) {
    document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX - 4 + 'px';
        dot.style.top = e.clientY - 4 + 'px';
        ring.style.left = e.clientX - 20 + 'px';
        ring.style.top = e.clientY - 20 + 'px';
    });
    document.querySelectorAll('a, button, .btn, .service-card, .tool-item').forEach(el => {
        el.addEventListener('mouseenter', () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.left = parseInt(ring.style.left) - 10 + 'px'; ring.style.top = parseInt(ring.style.top) - 10 + 'px'; ring.style.borderColor = 'rgba(168,85,247,0.8)'; });
        el.addEventListener('mouseleave', () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.borderColor = 'rgba(168,85,247,0.4)'; });
    });
}

// === SCROLL PROGRESS BAR ===
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollProgress').style.width = progress + '%';
});

// === NAVBAR SCROLL + ACTIVE LINK ===
const navbar = document.getElementById('navbar');
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active nav link
    let current = '';
    navSections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// === BACK TO TOP ===
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// === SCROLL ANIMATIONS ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// === SMOOTH NAV LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.getAttribute('href');
        if (id === '#') return;
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
});

// === MOBILE NAV ===
const mobileNav = document.getElementById('mobileNav');
document.getElementById('menuBtn').addEventListener('click', () => mobileNav.classList.add('open'));
document.getElementById('closeNav').addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// === TYPEWRITER ===
const words = ['Designer.', 'Editor.', 'Developer.', 'Storyteller.', 'Thinker.'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeLoop() {
    const current = words[wordIndex];
    typeEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);

    if (!isDeleting && charIndex > current.length) {
        setTimeout(() => { isDeleting = true; typeLoop(); }, 1800);
        return;
    }
    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeLoop, isDeleting ? 50 : 120);
}
typeLoop();

// === ANIMATED COUNTERS ===
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.target;
            const duration = 2000;
            const start = performance.now();
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                el.textContent = Math.floor(progress * target);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target;
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// === PARTICLES ===
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168,85,247,' + p.alpha + ')';
        ctx.fill();
    });
    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = 'rgba(168,85,247,' + (0.08 * (1 - dist / 150)) + ')';
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();

// === DRAGGABLE 3D CUBE ===
// Main cube handling stays unchanged
const cubeScene = document.getElementById('cubeScene');
const cube = document.getElementById('cube');
if (cubeScene && cube) {

    let isDragging = false;
    let currentRotation = { x: -20, y: -45 };
    let previousMousePosition = { x: 0, y: 0 };
    let targetScale = 1;
    let currentScale = 1;
    
    // Initial state
    cube.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg) scale(${currentScale})`;

    // Mouse events
    cubeScene.addEventListener('mousedown', (e) => {
        isDragging = true;
        cubeScene.style.cursor = 'grabbing';
        targetScale = 0.85; // Pop inward on click
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentRotation.y += e.movementX * 0.8;
        currentRotation.x -= e.movementY * 0.8;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            cubeScene.style.cursor = 'grab';
            targetScale = 1; // Pop back out
        }
    });

    // Touch events for mobile
    cubeScene.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        targetScale = 0.85;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        
        currentRotation.y += deltaX * 0.8;
        currentRotation.x -= deltaY * 0.8;
        
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            targetScale = 1;
        }
    });

    // Unified render loop for ultra-smooth animation
    function animateCube() {
        if (!isDragging) {
            currentRotation.y += 0.3;
            currentRotation.x += 0.15;
        }
        
        // Smooth scale interpolation (lerp)
        currentScale += (targetScale - currentScale) * 0.2;

        cube.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg) scale(${currentScale})`;
        
        requestAnimationFrame(animateCube);
    }
    animateCube();
}

// === CONTACT FORM → GMAIL ===
function buildGmailUrl(name, email, message) {
    const to = 'arpanbokshi1@gmail.com';
    const subject = encodeURIComponent('Portfolio Inquiry from ' + name);
    const body = encodeURIComponent('Hi Arpan,\n\n' + message + '\n\n---\nFrom: ' + name + '\nEmail: ' + email);
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + subject + '&body=' + body;
}

const sendBtn = document.getElementById('sendBtn');
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const messageEl = document.getElementById('message');
        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const message = messageEl.value.trim();

        // Highlight empty fields
        [nameEl, emailEl, messageEl].forEach(el => {
            if (!el.value.trim()) {
                el.style.borderColor = 'rgba(239,68,68,0.7)';
                el.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.1)';
                setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 1800);
            }
        });

        if (!name || !email || !message) {
            sendBtn.style.animation = 'shake 0.4s ease';
            setTimeout(() => sendBtn.style.animation = '', 400);
            return;
        }
        window.open(buildGmailUrl(name, email, message), '_blank');
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
        lucide.createIcons();
    });
}

const retryLink = document.getElementById('retryLink');
if (retryLink) {
    retryLink.addEventListener('click', e => {
        e.preventDefault();
        contactForm.style.display = 'flex';
        successMsg.style.display = 'none';
    });
}
