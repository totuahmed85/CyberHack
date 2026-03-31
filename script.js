// ========================================
// Load Admin Data from localStorage
// ========================================
(function loadAdminData() {
    try {
        const raw = localStorage.getItem('cyberhack_admin_data');
        if (!raw) return;
        const d = JSON.parse(raw);

        function esc(s) { const el = document.createElement('div'); el.appendChild(document.createTextNode(s || '')); return el.innerHTML; }
        function setAttr(el, az, en) { if (el) { el.setAttribute('data-az', az); el.setAttribute('data-en', en); } }

        // Hero
        const heroBadge = document.querySelector('.hero-badge span[data-az]');
        if (heroBadge && d.hero) {
            heroBadge.textContent = d.hero.badgeAz || heroBadge.textContent;
            setAttr(heroBadge, d.hero.badgeAz, d.hero.badgeEn);
        }
        const heroLines = document.querySelectorAll('.hero-title .line');
        if (heroLines[0] && d.hero) { heroLines[0].textContent = d.hero.line1Az; setAttr(heroLines[0], d.hero.line1Az, d.hero.line1En); }
        if (heroLines[1] && d.hero) { heroLines[1].textContent = d.hero.line2Az; setAttr(heroLines[1], d.hero.line2Az, d.hero.line2En); }
        const heroSub = document.querySelector('.hero-subtitle');
        if (heroSub && d.hero) { heroSub.textContent = d.hero.subAz; setAttr(heroSub, d.hero.subAz, d.hero.subEn); }

        // Stats
        if (d.hero) {
            const stats = document.querySelectorAll('.hero-stats .stat-number');
            const targets = [d.hero.statHackathons, d.hero.statAwards, d.hero.statProjects];
            stats.forEach((el, i) => { if (targets[i] !== undefined) el.setAttribute('data-target', targets[i]); });
        }

        // About
        if (d.about) {
            const aboutDesc = document.querySelector('.about-description');
            if (aboutDesc) { aboutDesc.textContent = d.about.descAz; setAttr(aboutDesc, d.about.descAz, d.about.descEn); }
            const ghNumbers = document.querySelectorAll('.github-card .github-number');
            const ghTargets = [d.about.githubCommits, d.about.githubRepos, d.about.githubPRs, d.about.githubStars];
            ghNumbers.forEach((el, i) => { if (ghTargets[i] !== undefined) el.setAttribute('data-target', ghTargets[i]); });
        }

        // Team — rebuild team grid
        if (d.team && d.team.length > 0) {
            const teamGrid = document.querySelector('.team-grid');
            if (teamGrid) {
                teamGrid.innerHTML = d.team.map(m => `
                    <div class="team-card reveal-up">
                        <div class="team-avatar">
                            <div class="avatar-placeholder"><i class="fas fa-user"></i></div>
                            <div class="avatar-ring"></div>
                        </div>
                        <h3>${esc(m.name)}</h3>
                        <span class="team-role">${esc(m.role)}</span>
                        <p class="team-bio" data-az="${esc(m.bioAz)}" data-en="${esc(m.bioEn)}">${esc(m.bioAz)}</p>
                        <div class="team-skills-bars">
                            ${m.skills.map(s => s.name ? `
                            <div class="skill-bar-item">
                                <div class="skill-bar-header"><span>${esc(s.name)}</span><span>${s.val}%</span></div>
                                <div class="skill-bar-track"><div class="skill-bar-fill" data-width="${s.val}"></div></div>
                            </div>` : '').join('')}
                        </div>
                        <div class="team-socials">
                            <a href="${esc(m.github)}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                            <a href="${esc(m.linkedin)}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Projects — rebuild projects grid
        if (d.projects && d.projects.length > 0) {
            const projGrid = document.getElementById('projectsGrid');
            if (projGrid) {
                projGrid.innerHTML = d.projects.map(p => `
                    <div class="project-card" data-category="${esc(p.category)}">
                        <div class="project-image">
                            <div class="project-placeholder"><i class="${esc(p.icon)}"></i></div>
                            <div class="project-overlay">
                                <a href="${esc(p.demo)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i></a>
                                <a href="${esc(p.github)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-content">
                            <div class="project-tags">${p.tags.split(',').map(t => `<span>${esc(t.trim())}</span>`).join('')}</div>
                            <h3>${esc(p.name)}</h3>
                            <p data-az="${esc(p.descAz)}" data-en="${esc(p.descEn)}">${esc(p.descAz)}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Achievements — rebuild timeline
        if (d.achievements && d.achievements.length > 0) {
            const timeline = document.querySelector('.timeline');
            if (timeline) {
                const icons = { gold: 'fa-trophy', silver: 'fa-award', bronze: 'fa-certificate' };
                const badgeIcons = { gold: 'fa-medal', silver: 'fa-medal', bronze: 'fa-gem' };
                timeline.innerHTML = d.achievements.map(a => `
                    <div class="timeline-item">
                        <div class="timeline-dot"><i class="fas ${icons[a.badge] || 'fa-star'}"></i></div>
                        <div class="timeline-content">
                            <div class="timeline-date">${esc(a.year)}</div>
                            <h3>${esc(a.title)}</h3>
                            <p data-az="${esc(a.descAz)}" data-en="${esc(a.descEn)}">${esc(a.descAz)}</p>
                            <div class="timeline-badge ${esc(a.badge)}"><i class="fas ${badgeIcons[a.badge] || 'fa-star'}"></i> ${esc(a.badgeText)}</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Blog — rebuild blog grid
        if (d.blog && d.blog.length > 0) {
            const blogGrid = document.querySelector('.blog-grid');
            if (blogGrid) {
                blogGrid.innerHTML = d.blog.map(b => `
                    <article class="blog-card reveal-up">
                        <div class="blog-image">
                            <div class="blog-placeholder"><i class="${esc(b.icon)}"></i></div>
                            <div class="blog-date"><span>${esc(b.dateDay)}</span>${esc(b.dateMonth)}</div>
                        </div>
                        <div class="blog-content">
                            <div class="blog-tags">${b.tags.split(',').map(t => `<span>${esc(t.trim())}</span>`).join('')}</div>
                            <h3 data-az="${esc(b.titleAz)}" data-en="${esc(b.titleEn)}">${esc(b.titleAz)}</h3>
                            <p data-az="${esc(b.textAz)}" data-en="${esc(b.textEn)}">${esc(b.textAz)}</p>
                            <a href="#" class="blog-read-more" data-az="Davamını Oxu" data-en="Read More">Davamını Oxu <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </article>
                `).join('');
            }
        }

        // FAQ — rebuild faq list
        if (d.faq && d.faq.length > 0) {
            const faqList = document.querySelector('.faq-list');
            if (faqList) {
                faqList.innerHTML = d.faq.map(f => `
                    <div class="faq-item reveal-up">
                        <button class="faq-question">
                            <span data-az="${esc(f.questionAz)}" data-en="${esc(f.questionEn)}">${esc(f.questionAz)}</span>
                            <i class="fas fa-plus"></i>
                        </button>
                        <div class="faq-answer">
                            <p data-az="${esc(f.answerAz)}" data-en="${esc(f.answerEn)}">${esc(f.answerAz)}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Contact
        if (d.contact) {
            const emailLink = document.querySelector('.contact-items a[href^="mailto:"]');
            if (emailLink && d.contact.email) {
                emailLink.href = 'mailto:' + encodeURIComponent(d.contact.email);
                emailLink.textContent = d.contact.email;
            }
        }

        // Settings — countdown date
        if (d.settings && d.settings.countdownDate) {
            window._adminCountdownDate = new Date(d.settings.countdownDate).getTime();
        }
        if (d.settings) {
            const countdownEvent = document.querySelector('.countdown-event');
            if (countdownEvent) {
                countdownEvent.textContent = d.settings.countdownNameAz;
                setAttr(countdownEvent, d.settings.countdownNameAz, d.settings.countdownNameEn);
            }
        }

    } catch (e) { /* ignore errors, use default HTML */ }
})();

// ========================================
// Preloader
// ========================================
const preloader = document.getElementById('preloader');
const preloaderProgress = document.getElementById('preloaderProgress');
const preloaderPercent = document.getElementById('preloaderPercent');
let loadProgress = 0;

const preloaderInterval = setInterval(() => {
    loadProgress += Math.random() * 15 + 5;
    if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(preloaderInterval);
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 400);
    }
    preloaderProgress.style.width = loadProgress + '%';
    preloaderPercent.textContent = Math.floor(loadProgress) + '%';
}, 200);

document.body.style.overflow = 'hidden';

// ========================================
// Cursor Glow
// ========================================
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(min-width: 769px)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ========================================
// Cursor Trail (Canvas)
// ========================================
const trailCanvas = document.getElementById('cursorTrail');
if (trailCanvas && window.matchMedia('(min-width: 769px)').matches) {
    const ctx = trailCanvas.getContext('2d');
    let trailPoints = [];
    const maxPoints = 30;

    function resizeCanvas() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        trailPoints.push({
            x: e.clientX,
            y: e.clientY,
            life: 1,
            color: `hsla(${260 + Math.random() * 40}, 80%, 65%, `
        });
        if (trailPoints.length > maxPoints) trailPoints.shift();
    });

    function drawTrail() {
        ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = 0; i < trailPoints.length; i++) {
            const p = trailPoints[i];
            p.life -= 0.025;
            if (p.life <= 0) { trailPoints.splice(i, 1); i--; continue; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.life * 4, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.life + ')';
            ctx.fill();
        }
        requestAnimationFrame(drawTrail);
    }
    drawTrail();
}

// ========================================
// Particles
// ========================================
const particlesContainer = document.getElementById('particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = Math.random() * 4 + 's';
    const size = (Math.random() * 3 + 1) + 'px';
    particle.style.width = size;
    particle.style.height = size;
    const colors = ['#8b5cf6', '#06b6d4', '#a78bfa', '#22d3ee'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particlesContainer.appendChild(particle);
    particle.addEventListener('animationend', () => { particle.remove(); createParticle(); });
}
for (let i = 0; i < 25; i++) setTimeout(createParticle, Math.random() * 5000);

// ========================================
// Navbar
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========================================
// Theme Toggle (Dark/Light)
// ========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    currentTheme = theme;
    localStorage.setItem('theme', theme);
}
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ========================================
// Language Switch (AZ/EN)
// ========================================
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'az';

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-az][data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
    const active = langToggle.querySelector('.lang-active');
    const inactive = langToggle.querySelector('.lang-inactive');
    if (lang === 'az') { active.textContent = 'AZ'; inactive.textContent = 'EN'; }
    else { active.textContent = 'EN'; inactive.textContent = 'AZ'; }
}

langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'az' ? 'en' : 'az');
});

// Apply stored language on load
setTimeout(() => applyLang(currentLang), 100);

// ========================================
// Countdown Timer
// ========================================
const targetDate = window._adminCountdownDate || new Date('2026-06-15T09:00:00').getTime();

function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('cd-days').textContent = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-minutes').textContent = '00';
        document.getElementById('cd-seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ========================================
// Animated Counters
// ========================================
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    update();
}

// ========================================
// Parallax Scroll
// ========================================
function handleParallax() {
    const scrollY = window.scrollY;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = parseFloat(layer.dataset.speed) || 0.3;
        layer.style.transform = `translateY(${scrollY * speed}px)`;
    });
    // Floating shapes extra parallax
    document.querySelectorAll('.floating-shape').forEach((shape, i) => {
        const speed = 0.1 + i * 0.05;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
}
window.addEventListener('scroll', handleParallax);

// ========================================
// Intersection Observer (Reveal & Counters)
// ========================================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate counters
                entry.target.querySelectorAll('.stat-number, .github-number').forEach(counter => {
                    if (!counter.dataset.animated) {
                        counter.dataset.animated = 'true';
                        animateCounter(counter);
                    }
                });

                // Animate skill bars
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    if (!bar.dataset.animated) {
                        bar.dataset.animated = 'true';
                        setTimeout(() => {
                            bar.style.width = bar.dataset.width + '%';
                        }, 200);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all revealable elements
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .project-card, .timeline-item, .team-card, .github-card, .github-contrib').forEach(el => {
        observer.observe(el);
    });

    // Hero counters
    const heroSection = document.querySelector('.hero');
    if (heroSection) observer.observe(heroSection);

    // GitHub section
    const githubSection = document.querySelector('.github-stats');
    if (githubSection) observer.observe(githubSection);
}

// ========================================
// Project Filter
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.position = '';
            } else {
                card.classList.add('hidden');
                setTimeout(() => { card.style.position = 'absolute'; }, 500);
            }
        });
    });
});

// ========================================
// GitHub Contribution Graph
// ========================================
const contribGraph = document.getElementById('contribGraph');
if (contribGraph) {
    for (let week = 0; week < 26; week++) {
        const col = document.createElement('div');
        col.style.display = 'flex';
        col.style.flexDirection = 'column';
        col.style.gap = '3px';
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement('div');
            cell.classList.add('contrib-cell');
            const rand = Math.random();
            if (rand > 0.7) cell.classList.add('level-4');
            else if (rand > 0.5) cell.classList.add('level-3');
            else if (rand > 0.3) cell.classList.add('level-2');
            else if (rand > 0.15) cell.classList.add('level-1');
            col.appendChild(cell);
        }
        contribGraph.appendChild(col);
    }
}

// ========================================
// Testimonials Slider
// ========================================
const testimonialTrack = document.getElementById('testimonialTrack');
const sliderDotsContainer = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentSlide = 0;
const totalSlides = testimonialCards.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    sliderDotsContainer.appendChild(dot);
}

function goToSlide(index) {
    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
    });
}

prevBtn.addEventListener('click', () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides));
nextBtn.addEventListener('click', () => goToSlide((currentSlide + 1) % totalSlides));

// Auto-slide
setInterval(() => goToSlide((currentSlide + 1) % totalSlides), 6000);

// ========================================
// FAQ Accordion
// ========================================
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));

        // Toggle current
        if (!isActive) item.classList.add('active');
    });
});

// ========================================
// Gallery Lightbox
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const caption = item.dataset.caption || 'Foto';
        lightboxContent.innerHTML = `
            <div style="text-align:center;">
                <div style="width:600px;max-width:90vw;height:400px;background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(6,182,212,0.15));border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                    <i class="fas fa-image" style="font-size:4rem;opacity:0.3;"></i>
                </div>
                <p style="color:rgba(255,255,255,0.7);font-size:1rem;">${escapeHtml(caption)}</p>
            </div>
        `;
        lightbox.classList.add('active');
    });
});

lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
});

// ========================================
// Contact Form (Sanitized)
// ========================================
const contactForm = document.getElementById('contactForm');

function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return;

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> ' + (currentLang === 'az' ? 'Göndərildi!' : 'Sent!');
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        this.reset();
    }, 3000);
});

// ========================================
// Tilt Effect (Desktop)
// ========================================
if (window.matchMedia('(min-width: 769px)').matches) {
    document.querySelectorAll('.project-card, .team-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 25;
            const rotateY = (rect.width / 2 - x) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ========================================
// Code Window Typing
// ========================================
const codeBody = document.querySelector('.code-body code');
if (codeBody) {
    const originalHTML = codeBody.innerHTML;
    const text = codeBody.textContent;
    codeBody.textContent = '';
    let charIndex = 0;
    let isTyping = false;

    function typeCode() {
        if (isTyping) return;
        isTyping = true;
        codeBody.textContent = '';
        charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                codeBody.textContent += text[charIndex];
                charIndex++;
                setTimeout(typeChar, 18);
            } else {
                codeBody.innerHTML = originalHTML;
                isTyping = false;
            }
        };
        typeChar();
    }

    const aboutSection = document.querySelector('.about');
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping && charIndex === 0) {
                setTimeout(typeCode, 500);
            }
        });
    }, { threshold: 0.3 });

    if (aboutSection) codeObserver.observe(aboutSection);
}
