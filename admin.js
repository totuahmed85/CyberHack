// ========================================
// Admin Panel — JavaScript
// ========================================

const STORAGE_KEY = 'cyberhack_admin_data';
const PASSWORD_KEY = 'cyberhack_admin_pass';
const DEFAULT_PASSWORD = 'cyberhack2026';

// ========================================
// Data Structure
// ========================================
function getDefaultData() {
    return {
        hero: {
            badgeAz: 'CyberHack — Secure The Future',
            badgeEn: 'CyberHack — Secure The Future',
            line1Az: 'Gələcəyi', line1En: 'Secure',
            line2Az: 'Təhlükəsiz Edirik', line2En: 'The Future',
            subAz: 'Kibertəhlükəsizlik və texnologiya sahəsində innovativ həllər yaradan, hakatonlarda rəqabət aparan CyberHack komandasıyıq.',
            subEn: 'We are CyberHack — a team creating innovative cybersecurity and technology solutions, competing in hackathons.',
            statHackathons: 10, statAwards: 5, statProjects: 15
        },
        about: {
            descAz: 'Biz CyberHack — kibertəhlükəsizlik və texnologiyaya həvəsli, yaradıcı və nəticəyönümlü bir komandayıq. Müxtəlif hakatonlarda iştirak edərək innovativ həllər yaradırıq.',
            descEn: 'We are CyberHack — a passionate, creative, and results-oriented cybersecurity team. We create innovative solutions by participating in various hackathons.',
            githubCommits: 1240, githubRepos: 85, githubPRs: 320, githubStars: 450
        },
        team: [
            { name: 'Ad Soyad', role: 'Team Lead / Full-Stack', bioAz: 'CyberHack-in lideri. 3+ il təcrübə.', bioEn: 'CyberHack leader. 3+ years experience.', github: '#', linkedin: '#', skills: [{ name: 'React', val: 90 }, { name: 'Node.js', val: 85 }, { name: 'Python', val: 80 }] },
            { name: 'Ad Soyad', role: 'Frontend Developer', bioAz: 'UI/UX və frontend mütəxəssisi.', bioEn: 'UI/UX and frontend specialist.', github: '#', linkedin: '#', skills: [{ name: 'Vue.js', val: 92 }, { name: 'CSS/SASS', val: 95 }, { name: 'Figma', val: 88 }] },
            { name: 'Ad Soyad', role: 'Backend Developer', bioAz: 'Server və DB arxitekturasında təcrübəli.', bioEn: 'Experienced in server & DB architecture.', github: '#', linkedin: '#', skills: [{ name: 'Java', val: 88 }, { name: 'PostgreSQL', val: 85 }, { name: 'Docker', val: 78 }] },
            { name: 'Ad Soyad', role: 'AI / ML Engineer', bioAz: 'Maşın öyrənməsi mütəxəssisi.', bioEn: 'Machine learning specialist.', github: '#', linkedin: '#', skills: [{ name: 'TensorFlow', val: 90 }, { name: 'Python', val: 95 }, { name: 'OpenCV', val: 82 }] }
        ],
        projects: [
            { name: 'AI Köməkçi Platforma', category: 'ai', descAz: 'Süni intellekt əsaslı müştəri xidməti platforması.', descEn: 'AI-based customer service platform.', tags: 'AI, Python, React', icon: 'fas fa-brain', demo: '#', github: '#' },
            { name: 'Sağlamlıq Tətbiqi', category: 'mobile', descAz: 'Sağlamlıq göstəricilərini izləyən mobil tətbiq.', descEn: 'Mobile app that tracks health metrics.', tags: 'Mobile, Flutter, Firebase', icon: 'fas fa-mobile-alt', demo: '#', github: '#' },
            { name: 'Ağıllı Əkinçilik', category: 'iot', descAz: 'IoT sensorlarla ağıllı kənd təsərrüfatı sistemi.', descEn: 'Smart agriculture system with IoT sensors.', tags: 'IoT, Node.js, Hardware', icon: 'fas fa-leaf', demo: '#', github: '#' },
            { name: 'Təhsil Platforması', category: 'web', descAz: 'Onlayn interaktiv öyrənmə platforması.', descEn: 'Online interactive learning platform.', tags: 'EdTech, React, MongoDB', icon: 'fas fa-graduation-cap', demo: '#', github: '#' },
            { name: 'Görüntü Tanıma', category: 'ai', descAz: 'CV ilə real-time obyekt tanıma sistemi.', descEn: 'Real-time object recognition with CV.', tags: 'AI, OpenCV, TensorFlow', icon: 'fas fa-eye', demo: '#', github: '#' },
            { name: 'Data Dashboard', category: 'web', descAz: 'Real-time analitika dashboard sistemi.', descEn: 'Real-time analytics dashboard system.', tags: 'Web, D3.js, Node.js', icon: 'fas fa-chart-line', demo: '#', github: '#' }
        ],
        achievements: [
            { title: '1-ci Yer — TechFest Hackathon', year: '2025', descAz: 'AI əsaslı həllimizlə 50+ komanda arasından CyberHack birinci yeri qazandı.', descEn: 'CyberHack won first place among 50+ teams with our AI-based solution.', badge: 'gold', badgeText: 'Qızıl Medal' },
            { title: 'Ən Yaxşı Dizayn — StartUp Weekend', year: '2025', descAz: 'İstifadəçi təcrübəsi baxımından ən yaxşı layihə seçildik.', descEn: 'Selected as the best project in terms of user experience.', badge: 'silver', badgeText: 'Dizayn Mükafatı' },
            { title: '2-ci Yer — Code Sprint', year: '2024', descAz: '72 saatlıq hackathonda ikinci yeri əldə etdik.', descEn: 'We achieved second place in the 72-hour hackathon.', badge: 'silver', badgeText: 'Gümüş Medal' },
            { title: 'Xüsusi Mükafat — İnnovasiya Həftəsi', year: '2024', descAz: 'IoT layihəmiz xüsusi mükafata layiq görüldü.', descEn: 'Our IoT project was awarded a special prize.', badge: 'bronze', badgeText: 'Xüsusi Mükafat' }
        ],
        blog: [
            { titleAz: 'TechFest 2025-də necə qalib gəldik', titleEn: 'How we won at TechFest 2025', textAz: '48 saat ərzində AI əsaslı həll yaratdıq və 50+ komanda arasından birinci olduq...', textEn: 'We created an AI-based solution in 48 hours and came first among 50+ teams...', dateDay: '15', dateMonth: 'Mar 2025', tags: 'Hackathon, AI', icon: 'fas fa-trophy' },
            { titleAz: 'Hackathon hazırlığı: 5 vacib məsləhət', titleEn: 'Hackathon preparation: 5 important tips', textAz: 'Hackathona gedməzdən əvvəl nələrə diqqət etməli? Təcrübəmizi bölüşürük...', textEn: 'What to pay attention to before going to a hackathon? We share our experience...', dateDay: '28', dateMonth: 'Feb 2025', tags: 'Tutorial, React', icon: 'fas fa-laptop-code' },
            { titleAz: 'CyberHack-in yaranma hekayəsi', titleEn: 'The story of how CyberHack was formed', textAz: 'Bir universitetdə tanış olduq və ilk hackathonumuza birlikdə getdik...', textEn: 'We met at university and went to our first hackathon together...', dateDay: '10', dateMonth: 'Jan 2025', tags: 'CyberHack, Story', icon: 'fas fa-users' }
        ],
        faq: [
            { questionAz: 'Komandanıza necə qoşula bilərəm?', questionEn: 'How can I join your team?', answerAz: 'Bizimlə əlaqə bölməsindən yazın. Texniki bacarıqlarınız və hackathon təcrübəniz haqqında məlumat verin.', answerEn: 'Write to us from the contact section. Provide information about your technical skills and hackathon experience.' },
            { questionAz: 'Hansı hackathonlarda iştirak edirsiniz?', questionEn: 'Which hackathons do you participate in?', answerAz: 'Azərbaycandakı əksər hackathonlarda, həmçinin beynəlxalq onlayn hackathonlarda iştirak edirik.', answerEn: 'We participate in most hackathons in Azerbaijan, as well as international online hackathons.' },
            { questionAz: 'Hansı texnologiyalardan istifadə edirsiniz?', questionEn: 'What technologies do you use?', answerAz: 'React, Node.js, Python, Flutter, TensorFlow, Docker və daha çox texnologiya ilə işləyirik.', answerEn: 'We work with React, Node.js, Python, Flutter, TensorFlow, Docker and many more technologies.' },
            { questionAz: 'Komanda neçə nəfərdən ibarətdir?', questionEn: 'How many people are on the team?', answerAz: 'Əsas komandamız 4 nəfərdən ibarətdir, lakin bəzi hackathonlarda 5-6 nəfərlik genişlənmiş komanda ilə iştirak edirik.', answerEn: 'Our core team consists of 4 people, but in some hackathons we participate with an expanded team of 5-6 people.' },
            { questionAz: 'Sponsorluq təklif edə bilərəm?', questionEn: 'Can I offer sponsorship?', answerAz: 'Əlbəttə! Sponsorluq və əməkdaşlıq təklifləri üçün bizə email vasitəsilə müraciət edin.', answerEn: 'Of course! Contact us by email for sponsorship and partnership proposals.' }
        ],
        contact: {
            email: 'cyberhack@email.com', phone: '+994 50 123 45 67',
            github: 'https://github.com/cyberhack', linkedin: 'https://linkedin.com/company/cyberhack',
            twitter: '', instagram: ''
        },
        settings: {
            countdownNameAz: 'TechFest 2026 — Bakı', countdownNameEn: 'TechFest 2026 — Baku',
            countdownDate: '2026-06-15T09:00'
        }
    };
}

// ========================================
// Storage
// ========================================
function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return getDefaultData();
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getPassword() {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
}

let adminData = loadData();

// ========================================
// Utility
// ========================================
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
}

function showToast(msg, isError) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.toggle('error', !!isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// ========================================
// Login
// ========================================
const loginScreen = document.getElementById('loginScreen');
const adminWrapper = document.getElementById('adminWrapper');
const loginBtn = document.getElementById('loginBtn');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');

function checkSession() {
    if (sessionStorage.getItem('cyberhack_admin_auth') === 'true') {
        loginScreen.classList.add('hidden');
        adminWrapper.style.display = 'flex';
    }
}
checkSession();

loginBtn.addEventListener('click', doLogin);
loginPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });

function doLogin() {
    const pass = loginPassword.value;
    if (pass === getPassword()) {
        sessionStorage.setItem('cyberhack_admin_auth', 'true');
        loginScreen.classList.add('hidden');
        adminWrapper.style.display = 'flex';
        loginError.textContent = '';
        loadAllFields();
    } else {
        loginError.textContent = 'Şifrə yanlışdır!';
        loginPassword.value = '';
        loginPassword.focus();
    }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('cyberhack_admin_auth');
    location.reload();
});

// ========================================
// Sidebar Navigation
// ========================================
const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
const pageTitle = document.getElementById('pageTitle');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

const sectionTitles = {
    dashboard: 'Dashboard', hero: 'Hero Bölmə', about: 'Haqqımızda',
    team: 'Komanda', projects: 'Layihələr', achievements: 'Uğurlar',
    blog: 'Bloq', faq: 'FAQ', contact: 'Əlaqə', settings: 'Parametrlər'
};

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(item.dataset.section);
    });
});

function showSection(section) {
    navItems.forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-section="${section}"]`);
    if (activeNav) activeNav.classList.add('active');

    document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
    const panel = document.getElementById('panel-' + section);
    if (panel) panel.classList.add('active');

    pageTitle.textContent = sectionTitles[section] || section;

    // Close mobile sidebar
    sidebar.classList.remove('mobile-open');
}

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
});

// ========================================
// Load Fields from Data
// ========================================
function loadAllFields() {
    const d = adminData;

    // Hero
    document.getElementById('heroBadgeAz').value = d.hero.badgeAz || '';
    document.getElementById('heroBadgeEn').value = d.hero.badgeEn || '';
    document.getElementById('heroLine1Az').value = d.hero.line1Az || '';
    document.getElementById('heroLine1En').value = d.hero.line1En || '';
    document.getElementById('heroLine2Az').value = d.hero.line2Az || '';
    document.getElementById('heroLine2En').value = d.hero.line2En || '';
    document.getElementById('heroSubAz').value = d.hero.subAz || '';
    document.getElementById('heroSubEn').value = d.hero.subEn || '';
    document.getElementById('statHackathons').value = d.hero.statHackathons || 0;
    document.getElementById('statAwards').value = d.hero.statAwards || 0;
    document.getElementById('statProjects').value = d.hero.statProjects || 0;

    // About
    document.getElementById('aboutDescAz').value = d.about.descAz || '';
    document.getElementById('aboutDescEn').value = d.about.descEn || '';
    document.getElementById('githubCommits').value = d.about.githubCommits || 0;
    document.getElementById('githubRepos').value = d.about.githubRepos || 0;
    document.getElementById('githubPRs').value = d.about.githubPRs || 0;
    document.getElementById('githubStars').value = d.about.githubStars || 0;

    // Contact
    document.getElementById('contactEmail').value = d.contact.email || '';
    document.getElementById('contactPhone').value = d.contact.phone || '';
    document.getElementById('contactGithub').value = d.contact.github || '';
    document.getElementById('contactLinkedin').value = d.contact.linkedin || '';
    document.getElementById('contactTwitter').value = d.contact.twitter || '';
    document.getElementById('contactInstagram').value = d.contact.instagram || '';

    // Settings
    document.getElementById('countdownNameAz').value = d.settings.countdownNameAz || '';
    document.getElementById('countdownNameEn').value = d.settings.countdownNameEn || '';
    document.getElementById('countdownDate').value = d.settings.countdownDate || '';

    // Render lists
    renderTeamList();
    renderProjectList();
    renderAchievementList();
    renderBlogList();
    renderFaqList();
    updateDashboard();
}

// ========================================
// Collect Fields into Data
// ========================================
function collectAllFields() {
    const d = adminData;

    d.hero.badgeAz = document.getElementById('heroBadgeAz').value.trim();
    d.hero.badgeEn = document.getElementById('heroBadgeEn').value.trim();
    d.hero.line1Az = document.getElementById('heroLine1Az').value.trim();
    d.hero.line1En = document.getElementById('heroLine1En').value.trim();
    d.hero.line2Az = document.getElementById('heroLine2Az').value.trim();
    d.hero.line2En = document.getElementById('heroLine2En').value.trim();
    d.hero.subAz = document.getElementById('heroSubAz').value.trim();
    d.hero.subEn = document.getElementById('heroSubEn').value.trim();
    d.hero.statHackathons = parseInt(document.getElementById('statHackathons').value) || 0;
    d.hero.statAwards = parseInt(document.getElementById('statAwards').value) || 0;
    d.hero.statProjects = parseInt(document.getElementById('statProjects').value) || 0;

    d.about.descAz = document.getElementById('aboutDescAz').value.trim();
    d.about.descEn = document.getElementById('aboutDescEn').value.trim();
    d.about.githubCommits = parseInt(document.getElementById('githubCommits').value) || 0;
    d.about.githubRepos = parseInt(document.getElementById('githubRepos').value) || 0;
    d.about.githubPRs = parseInt(document.getElementById('githubPRs').value) || 0;
    d.about.githubStars = parseInt(document.getElementById('githubStars').value) || 0;

    d.contact.email = document.getElementById('contactEmail').value.trim();
    d.contact.phone = document.getElementById('contactPhone').value.trim();
    d.contact.github = document.getElementById('contactGithub').value.trim();
    d.contact.linkedin = document.getElementById('contactLinkedin').value.trim();
    d.contact.twitter = document.getElementById('contactTwitter').value.trim();
    d.contact.instagram = document.getElementById('contactInstagram').value.trim();

    d.settings.countdownNameAz = document.getElementById('countdownNameAz').value.trim();
    d.settings.countdownNameEn = document.getElementById('countdownNameEn').value.trim();
    d.settings.countdownDate = document.getElementById('countdownDate').value;

    return d;
}

// ========================================
// Save All
// ========================================
document.getElementById('saveAllBtn').addEventListener('click', () => {
    adminData = collectAllFields();
    saveData(adminData);
    updateDashboard();
    showToast('Bütün dəyişikliklər saxlanıldı!');
});

// ========================================
// Dashboard
// ========================================
function updateDashboard() {
    document.getElementById('dashTeamCount').textContent = adminData.team.length;
    document.getElementById('dashProjectCount').textContent = adminData.projects.length;
    document.getElementById('dashAchievementCount').textContent = adminData.achievements.length;
    document.getElementById('dashBlogCount').textContent = adminData.blog.length;
}

// ========================================
// TEAM CRUD
// ========================================
function renderTeamList() {
    const container = document.getElementById('teamList');
    container.innerHTML = adminData.team.map((m, i) => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${escapeHtml(m.name)}</h4>
                <p>${escapeHtml(m.role)}</p>
            </div>
            <div class="list-item-actions">
                <button class="btn-edit" onclick="editTeam(${i})" title="Redaktə et"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteTeam(${i})" title="Sil"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

document.getElementById('addTeamBtn').addEventListener('click', () => {
    document.getElementById('teamEditIndex').value = '-1';
    document.getElementById('teamModalTitle').textContent = 'Yeni Üzv Əlavə Et';
    clearTeamForm();
    openModal('teamModal');
});

function editTeam(index) {
    const m = adminData.team[index];
    document.getElementById('teamEditIndex').value = index;
    document.getElementById('teamModalTitle').textContent = 'Üzvü Redaktə Et';
    document.getElementById('teamName').value = m.name;
    document.getElementById('teamRole').value = m.role;
    document.getElementById('teamBioAz').value = m.bioAz;
    document.getElementById('teamBioEn').value = m.bioEn;
    document.getElementById('teamGithub').value = m.github;
    document.getElementById('teamLinkedin').value = m.linkedin;
    for (let s = 0; s < 3; s++) {
        document.getElementById('skill' + (s + 1) + 'Name').value = m.skills[s] ? m.skills[s].name : '';
        document.getElementById('skill' + (s + 1) + 'Val').value = m.skills[s] ? m.skills[s].val : '';
    }
    openModal('teamModal');
}

function deleteTeam(index) {
    if (!confirm('Bu üzvü silmək istəyirsiniz?')) return;
    adminData.team.splice(index, 1);
    saveData(adminData);
    renderTeamList();
    updateDashboard();
    showToast('Üzv silindi');
}

function clearTeamForm() {
    ['teamName', 'teamRole', 'teamBioAz', 'teamBioEn', 'teamGithub', 'teamLinkedin',
        'skill1Name', 'skill1Val', 'skill2Name', 'skill2Val', 'skill3Name', 'skill3Val'
    ].forEach(id => document.getElementById(id).value = '');
}

document.getElementById('saveTeamBtn').addEventListener('click', () => {
    const name = document.getElementById('teamName').value.trim();
    if (!name) { showToast('Ad daxil edin!', true); return; }

    const member = {
        name: name,
        role: document.getElementById('teamRole').value.trim(),
        bioAz: document.getElementById('teamBioAz').value.trim(),
        bioEn: document.getElementById('teamBioEn').value.trim(),
        github: document.getElementById('teamGithub').value.trim() || '#',
        linkedin: document.getElementById('teamLinkedin').value.trim() || '#',
        skills: [
            { name: document.getElementById('skill1Name').value.trim(), val: parseInt(document.getElementById('skill1Val').value) || 0 },
            { name: document.getElementById('skill2Name').value.trim(), val: parseInt(document.getElementById('skill2Val').value) || 0 },
            { name: document.getElementById('skill3Name').value.trim(), val: parseInt(document.getElementById('skill3Val').value) || 0 }
        ]
    };

    const idx = parseInt(document.getElementById('teamEditIndex').value);
    if (idx >= 0) adminData.team[idx] = member;
    else adminData.team.push(member);

    saveData(adminData);
    renderTeamList();
    updateDashboard();
    closeModal('teamModal');
    showToast(idx >= 0 ? 'Üzv yeniləndi' : 'Yeni üzv əlavə edildi');
});

// ========================================
// PROJECTS CRUD
// ========================================
function renderProjectList() {
    const container = document.getElementById('projectList');
    container.innerHTML = adminData.projects.map((p, i) => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${escapeHtml(p.name)}</h4>
                <p>${escapeHtml(p.category)} — ${escapeHtml(p.tags)}</p>
            </div>
            <div class="list-item-actions">
                <button class="btn-edit" onclick="editProject(${i})" title="Redaktə et"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteProject(${i})" title="Sil"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

document.getElementById('addProjectBtn').addEventListener('click', () => {
    document.getElementById('projectEditIndex').value = '-1';
    document.getElementById('projectModalTitle').textContent = 'Yeni Layihə Əlavə Et';
    ['projectName', 'projectDescAz', 'projectDescEn', 'projectTags', 'projectIcon', 'projectDemo', 'projectGithub'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('projectCategory').value = 'ai';
    openModal('projectModal');
});

function editProject(index) {
    const p = adminData.projects[index];
    document.getElementById('projectEditIndex').value = index;
    document.getElementById('projectModalTitle').textContent = 'Layihəni Redaktə Et';
    document.getElementById('projectName').value = p.name;
    document.getElementById('projectCategory').value = p.category;
    document.getElementById('projectDescAz').value = p.descAz;
    document.getElementById('projectDescEn').value = p.descEn;
    document.getElementById('projectTags').value = p.tags;
    document.getElementById('projectIcon').value = p.icon;
    document.getElementById('projectDemo').value = p.demo;
    document.getElementById('projectGithub').value = p.github;
    openModal('projectModal');
}

function deleteProject(index) {
    if (!confirm('Bu layihəni silmək istəyirsiniz?')) return;
    adminData.projects.splice(index, 1);
    saveData(adminData);
    renderProjectList();
    updateDashboard();
    showToast('Layihə silindi');
}

document.getElementById('saveProjectBtn').addEventListener('click', () => {
    const name = document.getElementById('projectName').value.trim();
    if (!name) { showToast('Layihə adı daxil edin!', true); return; }

    const project = {
        name: name,
        category: document.getElementById('projectCategory').value,
        descAz: document.getElementById('projectDescAz').value.trim(),
        descEn: document.getElementById('projectDescEn').value.trim(),
        tags: document.getElementById('projectTags').value.trim(),
        icon: document.getElementById('projectIcon').value.trim() || 'fas fa-code',
        demo: document.getElementById('projectDemo').value.trim() || '#',
        github: document.getElementById('projectGithub').value.trim() || '#'
    };

    const idx = parseInt(document.getElementById('projectEditIndex').value);
    if (idx >= 0) adminData.projects[idx] = project;
    else adminData.projects.push(project);

    saveData(adminData);
    renderProjectList();
    updateDashboard();
    closeModal('projectModal');
    showToast(idx >= 0 ? 'Layihə yeniləndi' : 'Yeni layihə əlavə edildi');
});

// ========================================
// ACHIEVEMENTS CRUD
// ========================================
function renderAchievementList() {
    const container = document.getElementById('achievementList');
    container.innerHTML = adminData.achievements.map((a, i) => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${escapeHtml(a.title)}</h4>
                <p>${escapeHtml(a.year)} — ${escapeHtml(a.badgeText)}</p>
            </div>
            <div class="list-item-actions">
                <button class="btn-edit" onclick="editAchievement(${i})" title="Redaktə et"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteAchievement(${i})" title="Sil"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

document.getElementById('addAchievementBtn').addEventListener('click', () => {
    document.getElementById('achievementEditIndex').value = '-1';
    document.getElementById('achievementModalTitle').textContent = 'Yeni Uğur Əlavə Et';
    ['achievementTitle', 'achievementYear', 'achievementDescAz', 'achievementDescEn', 'achievementBadgeText'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('achievementBadge').value = 'gold';
    openModal('achievementModal');
});

function editAchievement(index) {
    const a = adminData.achievements[index];
    document.getElementById('achievementEditIndex').value = index;
    document.getElementById('achievementModalTitle').textContent = 'Uğuru Redaktə Et';
    document.getElementById('achievementTitle').value = a.title;
    document.getElementById('achievementYear').value = a.year;
    document.getElementById('achievementDescAz').value = a.descAz;
    document.getElementById('achievementDescEn').value = a.descEn;
    document.getElementById('achievementBadge').value = a.badge;
    document.getElementById('achievementBadgeText').value = a.badgeText;
    openModal('achievementModal');
}

function deleteAchievement(index) {
    if (!confirm('Bu uğuru silmək istəyirsiniz?')) return;
    adminData.achievements.splice(index, 1);
    saveData(adminData);
    renderAchievementList();
    updateDashboard();
    showToast('Uğur silindi');
}

document.getElementById('saveAchievementBtn').addEventListener('click', () => {
    const title = document.getElementById('achievementTitle').value.trim();
    if (!title) { showToast('Başlıq daxil edin!', true); return; }

    const achievement = {
        title: title,
        year: document.getElementById('achievementYear').value.trim(),
        descAz: document.getElementById('achievementDescAz').value.trim(),
        descEn: document.getElementById('achievementDescEn').value.trim(),
        badge: document.getElementById('achievementBadge').value,
        badgeText: document.getElementById('achievementBadgeText').value.trim()
    };

    const idx = parseInt(document.getElementById('achievementEditIndex').value);
    if (idx >= 0) adminData.achievements[idx] = achievement;
    else adminData.achievements.push(achievement);

    saveData(adminData);
    renderAchievementList();
    updateDashboard();
    closeModal('achievementModal');
    showToast(idx >= 0 ? 'Uğur yeniləndi' : 'Yeni uğur əlavə edildi');
});

// ========================================
// BLOG CRUD
// ========================================
function renderBlogList() {
    const container = document.getElementById('blogList');
    container.innerHTML = adminData.blog.map((b, i) => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${escapeHtml(b.titleAz)}</h4>
                <p>${escapeHtml(b.dateDay)} ${escapeHtml(b.dateMonth)} — ${escapeHtml(b.tags)}</p>
            </div>
            <div class="list-item-actions">
                <button class="btn-edit" onclick="editBlog(${i})" title="Redaktə et"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteBlog(${i})" title="Sil"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

document.getElementById('addBlogBtn').addEventListener('click', () => {
    document.getElementById('blogEditIndex').value = '-1';
    document.getElementById('blogModalTitle').textContent = 'Yeni Bloq Yazısı';
    ['blogTitleAz', 'blogTitleEn', 'blogTextAz', 'blogTextEn', 'blogDateDay', 'blogDateMonth', 'blogTags', 'blogIcon'].forEach(id => document.getElementById(id).value = '');
    openModal('blogModal');
});

function editBlog(index) {
    const b = adminData.blog[index];
    document.getElementById('blogEditIndex').value = index;
    document.getElementById('blogModalTitle').textContent = 'Bloq Yazısını Redaktə Et';
    document.getElementById('blogTitleAz').value = b.titleAz;
    document.getElementById('blogTitleEn').value = b.titleEn;
    document.getElementById('blogTextAz').value = b.textAz;
    document.getElementById('blogTextEn').value = b.textEn;
    document.getElementById('blogDateDay').value = b.dateDay;
    document.getElementById('blogDateMonth').value = b.dateMonth;
    document.getElementById('blogTags').value = b.tags;
    document.getElementById('blogIcon').value = b.icon;
    openModal('blogModal');
}

function deleteBlog(index) {
    if (!confirm('Bu yazını silmək istəyirsiniz?')) return;
    adminData.blog.splice(index, 1);
    saveData(adminData);
    renderBlogList();
    updateDashboard();
    showToast('Yazı silindi');
}

document.getElementById('saveBlogBtn').addEventListener('click', () => {
    const title = document.getElementById('blogTitleAz').value.trim();
    if (!title) { showToast('Başlıq daxil edin!', true); return; }

    const blog = {
        titleAz: title,
        titleEn: document.getElementById('blogTitleEn').value.trim(),
        textAz: document.getElementById('blogTextAz').value.trim(),
        textEn: document.getElementById('blogTextEn').value.trim(),
        dateDay: document.getElementById('blogDateDay').value.trim(),
        dateMonth: document.getElementById('blogDateMonth').value.trim(),
        tags: document.getElementById('blogTags').value.trim(),
        icon: document.getElementById('blogIcon').value.trim() || 'fas fa-newspaper'
    };

    const idx = parseInt(document.getElementById('blogEditIndex').value);
    if (idx >= 0) adminData.blog[idx] = blog;
    else adminData.blog.push(blog);

    saveData(adminData);
    renderBlogList();
    updateDashboard();
    closeModal('blogModal');
    showToast(idx >= 0 ? 'Yazı yeniləndi' : 'Yeni yazı əlavə edildi');
});

// ========================================
// FAQ CRUD
// ========================================
function renderFaqList() {
    const container = document.getElementById('faqList');
    container.innerHTML = adminData.faq.map((f, i) => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${escapeHtml(f.questionAz)}</h4>
                <p>${escapeHtml(f.answerAz).substring(0, 60)}...</p>
            </div>
            <div class="list-item-actions">
                <button class="btn-edit" onclick="editFaq(${i})" title="Redaktə et"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteFaq(${i})" title="Sil"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

document.getElementById('addFaqBtn').addEventListener('click', () => {
    document.getElementById('faqEditIndex').value = '-1';
    document.getElementById('faqModalTitle').textContent = 'Yeni Sual Əlavə Et';
    ['faqQuestionAz', 'faqQuestionEn', 'faqAnswerAz', 'faqAnswerEn'].forEach(id => document.getElementById(id).value = '');
    openModal('faqModal');
});

function editFaq(index) {
    const f = adminData.faq[index];
    document.getElementById('faqEditIndex').value = index;
    document.getElementById('faqModalTitle').textContent = 'Sualı Redaktə Et';
    document.getElementById('faqQuestionAz').value = f.questionAz;
    document.getElementById('faqQuestionEn').value = f.questionEn;
    document.getElementById('faqAnswerAz').value = f.answerAz;
    document.getElementById('faqAnswerEn').value = f.answerEn;
    openModal('faqModal');
}

function deleteFaq(index) {
    if (!confirm('Bu sualı silmək istəyirsiniz?')) return;
    adminData.faq.splice(index, 1);
    saveData(adminData);
    renderFaqList();
    showToast('Sual silindi');
}

document.getElementById('saveFaqBtn').addEventListener('click', () => {
    const q = document.getElementById('faqQuestionAz').value.trim();
    if (!q) { showToast('Sual daxil edin!', true); return; }

    const faq = {
        questionAz: q,
        questionEn: document.getElementById('faqQuestionEn').value.trim(),
        answerAz: document.getElementById('faqAnswerAz').value.trim(),
        answerEn: document.getElementById('faqAnswerEn').value.trim()
    };

    const idx = parseInt(document.getElementById('faqEditIndex').value);
    if (idx >= 0) adminData.faq[idx] = faq;
    else adminData.faq.push(faq);

    saveData(adminData);
    renderFaqList();
    closeModal('faqModal');
    showToast(idx >= 0 ? 'Sual yeniləndi' : 'Yeni sual əlavə edildi');
});

// ========================================
// Settings
// ========================================
document.getElementById('changePasswordBtn').addEventListener('click', () => {
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (!newPass || newPass.length < 4) { showToast('Şifrə ən azı 4 simvol olmalıdır!', true); return; }
    if (newPass !== confirm) { showToast('Şifrələr uyğun gəlmir!', true); return; }
    localStorage.setItem(PASSWORD_KEY, newPass);
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    showToast('Şifrə dəyişdirildi!');
});

document.getElementById('resetDataBtn').addEventListener('click', () => {
    if (!confirm('DİQQƏT: Bütün admin dəyişiklikləri silinəcək. Davam etmək istəyirsiniz?')) return;
    localStorage.removeItem(STORAGE_KEY);
    adminData = getDefaultData();
    loadAllFields();
    showToast('Məlumatlar sıfırlandı');
});

// Close modals with Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
});

// Close modal when clicking overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
});

// Initial load
loadAllFields();
