// script.js - Complete with Password Protection

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50
});

// ==================== DATA STORAGE KEYS ====================
let galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [
    'https://picsum.photos/id/20/400/300',
    'https://picsum.photos/id/26/400/300',
    'https://picsum.photos/id/28/400/300',
    'https://picsum.photos/id/30/400/300',
    'https://picsum.photos/id/32/400/300',
    'https://picsum.photos/id/36/400/300'
];

let friends = JSON.parse(localStorage.getItem('friendsData')) || [
    { name: 'Davin Arkananta', role: 'dapin', initial: 'DA' },
    { name: 'Abibanyu Altairu', role: 'biu', initial: 'AA' },
    { name: 'Azzam Kurniawan', role: 'jems', initial: 'Ak' },
    { name: 'Farhan Sychrezy', role: 'boang', initial: 'FS' }
];

let achievements = JSON.parse(localStorage.getItem('achievementsData')) || [
   
];

let timeline = JSON.parse(localStorage.getItem('timelineData')) || [
    
];

let quotes = JSON.parse(localStorage.getItem('quotesData')) || [
    { text: 'Pendidikan adalah senjata paling ampuh untuk mengubah dunia.', author: 'Nelson Mandela' },
    { text: 'Jadilah versi terbaik dari dirimu sendiri.', author: 'Unknown' },
    { text: 'Kesuksesan dimulai dari keberanian untuk mencoba.', author: 'Motivasi' }
];

// ==================== PASSWORD PROTECTION ====================
const ADMIN_PASSWORD = "fauzan123";
let isAdmin = sessionStorage.getItem('isAdmin') === 'true';

function askPassword(action = 'mengedit') {
    if (isAdmin) return true;
    
    const password = prompt(`🔒 Area Terbatas\n\nPassword diperlukan untuk ${action}.\nMasukkan password:`);
    
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        sessionStorage.setItem('isAdmin', 'true');
        alert('✅ Akses diberikan!');
        location.reload();
        return true;
    } else if (password !== null) {
        alert('❌ Password salah!');
        return false;
    }
    return false;
}

function logoutAdmin() {
    sessionStorage.removeItem('isAdmin');
    alert('🔒 Anda telah logout.');
    location.reload();
}

function addLogoutButton() {
    if (isAdmin && !document.getElementById('adminLogoutBtn')) {
        const container = document.querySelector('header .flex.justify-between.items-center .flex.items-center.gap-3');
        if (container) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'adminLogoutBtn';
            logoutBtn.className = 'text-xs px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            logoutBtn.onclick = logoutAdmin;
            container.appendChild(logoutBtn);
        }
    }
}

// ==================== DARK MODE ====================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
}

// ==================== MOBILE MENU ====================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

if (menuBtn && mobileMenu && closeMenuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
    });
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-x-full');
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.add('-translate-x-full');
    });
});

// ==================== PROFILE EDIT (About Page) ====================
const editProfileBtn = document.getElementById('editProfileBtn');
if (editProfileBtn) {
    const savedData = JSON.parse(localStorage.getItem('profileData') || '{}');
    if (document.getElementById('display-age')) document.getElementById('display-age').innerText = savedData.age || '—';
    if (document.getElementById('display-address')) document.getElementById('display-address').innerText = savedData.address || '—';
    if (document.getElementById('display-email')) document.getElementById('display-email').innerText = savedData.email || '—';
    if (document.getElementById('display-wa')) document.getElementById('display-wa').innerText = savedData.wa || '—';
    if (document.getElementById('display-ig')) document.getElementById('display-ig').innerText = savedData.ig || '—';
    
    editProfileBtn.addEventListener('click', () => {
        if (!askPassword('mengedit profil')) return;
        
        const age = prompt('Masukkan Umur:', document.getElementById('display-age').innerText === '—' ? '' : document.getElementById('display-age').innerText);
        const address = prompt('Masukkan Alamat:', document.getElementById('display-address').innerText === '—' ? '' : document.getElementById('display-address').innerText);
        const email = prompt('Masukkan Email:', document.getElementById('display-email').innerText === '—' ? '' : document.getElementById('display-email').innerText);
        const wa = prompt('Masukkan Nomor WhatsApp:', document.getElementById('display-wa').innerText === '—' ? '' : document.getElementById('display-wa').innerText);
        const ig = prompt('Masukkan Username Instagram:', document.getElementById('display-ig').innerText === '—' ? '' : document.getElementById('display-ig').innerText);
        
        if (age && document.getElementById('display-age')) document.getElementById('display-age').innerText = age;
        if (address && document.getElementById('display-address')) document.getElementById('display-address').innerText = address;
        if (email && document.getElementById('display-email')) document.getElementById('display-email').innerText = email;
        if (wa && document.getElementById('display-wa')) document.getElementById('display-wa').innerText = wa;
        if (ig && document.getElementById('display-ig')) document.getElementById('display-ig').innerText = ig;
        
        localStorage.setItem('profileData', JSON.stringify({
            age: document.getElementById('display-age')?.innerText,
            address: document.getElementById('display-address')?.innerText,
            email: document.getElementById('display-email')?.innerText,
            wa: document.getElementById('display-wa')?.innerText,
            ig: document.getElementById('display-ig')?.innerText
        }));
    });
}

// ==================== GALLERY PAGE ====================
function renderGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    container.innerHTML = '';
    galleryImages.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-card relative group overflow-hidden rounded-lg';
        div.innerHTML = `
            <img src="${src}" alt="Memory" class="w-full h-64 object-cover cursor-pointer transition hover:scale-105 duration-300">
            ${isAdmin ? `
                <button class="delete-photo absolute top-2 right-2 bg-black/60 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600" data-index="${index}">
                    <i class="fas fa-trash-alt text-sm"></i>
                </button>
            ` : ''}
        `;
        div.querySelector('img').onclick = () => openModal(src);
        if (isAdmin) {
            const deleteBtn = div.querySelector('.delete-photo');
            if (deleteBtn) {
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm('Hapus foto ini?')) {
                        galleryImages.splice(index, 1);
                        localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
                        renderGallery();
                    }
                };
            }
        }
        container.appendChild(div);
    });
}

const addPhotoBtn = document.getElementById('addPhotoBtn');
if (addPhotoBtn) {
    addPhotoBtn.addEventListener('click', () => {
        if (!askPassword('menambah foto')) return;
        const url = prompt('Masukkan URL gambar (mulai dengan http:// atau https://):');
        if (url && (url.startsWith('http') || url.startsWith('https'))) {
            galleryImages.push(url);
            localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
            renderGallery();
        } else if (url) {
            alert('URL tidak valid!');
        }
    });
}

// ==================== FRIENDS PAGE ====================
function renderFriends() {
    const container = document.getElementById('friendsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    friends.forEach((friend, index) => {
        const card = document.createElement('div');
        card.className = 'friend-card p-5 border border-neutral-200 dark:border-neutral-800 text-center transition relative group';
        card.innerHTML = `
            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xl font-medium">${friend.initial}</div>
            <h3 class="font-semibold">${friend.name}</h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">${friend.role}</p>
            ${isAdmin ? `
                <button class="delete-friend absolute top-2 right-2 text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition" data-index="${index}">
                    <i class="fas fa-trash-alt text-sm"></i>
                </button>
            ` : ''}
        `;
        if (isAdmin) {
            const deleteBtn = card.querySelector('.delete-friend');
            if (deleteBtn) {
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm(`Hapus ${friend.name}?`)) {
                        friends.splice(index, 1);
                        localStorage.setItem('friendsData', JSON.stringify(friends));
                        renderFriends();
                    }
                };
            }
        }
        container.appendChild(card);
    });
}

const addFriendBtn = document.getElementById('addFriendBtn');
if (addFriendBtn) {
    addFriendBtn.addEventListener('click', () => {
        if (!askPassword('menambah teman')) return;
        const name = prompt('Nama teman:');
        const role = prompt('Peran/kesan:');
        if (name && role) {
            const initial = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            friends.push({ name, role, initial });
            localStorage.setItem('friendsData', JSON.stringify(friends));
            renderFriends();
        }
    });
}

// ==================== ACHIEVEMENTS PAGE ====================
function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    achievements.forEach((ach, index) => {
        const div = document.createElement('div');
        div.className = 'p-4 border border-neutral-200 dark:border-neutral-800 flex justify-between items-start group';
        div.innerHTML = `
            <div class="flex-1">
                <div class="flex items-center gap-3 flex-wrap">
                    <span class="text-sm text-neutral-500">${ach.year}</span>
                    <h3 class="font-semibold">${ach.title}</h3>
                </div>
                <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">${ach.desc}</p>
            </div>
            ${isAdmin ? `
                <button class="delete-achievement text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition ml-4" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            ` : ''}
        `;
        if (isAdmin) {
            const deleteBtn = div.querySelector('.delete-achievement');
            if (deleteBtn) {
                deleteBtn.onclick = () => {
                    if (confirm(`Hapus prestasi "${ach.title}"?`)) {
                        achievements.splice(index, 1);
                        localStorage.setItem('achievementsData', JSON.stringify(achievements));
                        renderAchievements();
                    }
                };
            }
        }
        container.appendChild(div);
    });
}

const addAchievementBtn = document.getElementById('addAchievementBtn');
if (addAchievementBtn) {
    addAchievementBtn.addEventListener('click', () => {
        if (!askPassword('menambah prestasi')) return;
        const title = prompt('Judul prestasi:');
        const year = prompt('Tahun:');
        const desc = prompt('Deskripsi:');
        if (title && year && desc) {
            achievements.push({ title, year, desc });
            localStorage.setItem('achievementsData', JSON.stringify(achievements));
            renderAchievements();
        }
    });
}

// ==================== TIMELINE PAGE ====================
function renderTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;
    
    container.innerHTML = '';
    timeline.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'timeline-item relative pl-8 pb-8 border-l border-neutral-300 dark:border-neutral-700 last:border-l-0';
        div.innerHTML = `
            <div class="timeline-dot absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-neutral-400 dark:bg-neutral-500"></div>
            <span class="text-sm text-neutral-500">${item.year}</span>
            <h3 class="font-semibold text-lg mt-1">${item.title}</h3>
            <p class="text-neutral-600 dark:text-neutral-400 mt-1">${item.desc}</p>
            ${isAdmin ? `
                <button class="delete-timeline text-xs text-red-400 mt-2 hover:opacity-100 transition" data-index="${index}">
                    <i class="fas fa-trash-alt"></i> Hapus
                </button>
            ` : ''}
        `;
        if (isAdmin) {
            const deleteBtn = div.querySelector('.delete-timeline');
            if (deleteBtn) {
                deleteBtn.onclick = () => {
                    if (confirm(`Hapus momen "${item.title}"?`)) {
                        timeline.splice(index, 1);
                        localStorage.setItem('timelineData', JSON.stringify(timeline));
                        renderTimeline();
                    }
                };
            }
        }
        container.appendChild(div);
    });
}

const addTimelineBtn = document.getElementById('addTimelineBtn');
if (addTimelineBtn) {
    addTimelineBtn.addEventListener('click', () => {
        if (!askPassword('menambah momen')) return;
        const year = prompt('Tahun:');
        const title = prompt('Judul momen:');
        const desc = prompt('Ceritanya:');
        if (year && title && desc) {
            timeline.push({ year, title, desc });
            localStorage.setItem('timelineData', JSON.stringify(timeline));
            renderTimeline();
        }
    });
}

// ==================== QUOTES PAGE ====================
function renderQuotes() {
    const container = document.getElementById('quotesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    quotes.forEach((quote, index) => {
        const div = document.createElement('div');
        div.className = 'p-6 border-l-4 border-neutral-400 bg-neutral-50 dark:bg-neutral-800/20 relative group';
        div.innerHTML = `
            <i class="fas fa-quote-left text-neutral-300 dark:text-neutral-600 text-2xl mb-3 block"></i>
            <p class="text-lg italic leading-relaxed">"${escapeHtml(quote.text)}"</p>
            <p class="text-sm text-neutral-500 mt-3">— ${escapeHtml(quote.author)}</p>
            ${isAdmin ? `
                <button class="delete-quote absolute top-3 right-3 text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            ` : ''}
        `;
        if (isAdmin) {
            const deleteBtn = div.querySelector('.delete-quote');
            if (deleteBtn) {
                deleteBtn.onclick = () => {
                    if (confirm(`Hapus quote ini?`)) {
                        quotes.splice(index, 1);
                        localStorage.setItem('quotesData', JSON.stringify(quotes));
                        renderQuotes();
                    }
                };
            }
        }
        container.appendChild(div);
    });
}

const addQuoteBtn = document.getElementById('addQuoteBtn');
if (addQuoteBtn) {
    addQuoteBtn.addEventListener('click', () => {
        if (!askPassword('menambah quote')) return;
        const text = prompt('Tulis kutipan:');
        const author = prompt('Penulis/sumber:');
        if (text && author) {
            quotes.push({ text, author });
            localStorage.setItem('quotesData', JSON.stringify(quotes));
            renderQuotes();
        }
    });
}

// ==================== CONTACT & GUEST MESSAGES ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim();
        const message = document.getElementById('contactMessage')?.value.trim();
        
        if (!name || !message) {
            alert('Nama dan pesan harus diisi!');
            return;
        }
        
        const messages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
        messages.unshift({ name, message, date: new Date().toLocaleString('id-ID') });
        localStorage.setItem('guestMessages', JSON.stringify(messages.slice(0, 30)));
        
        alert('Pesan berhasil dikirim! Terima kasih 🙏');
        contactForm.reset();
        displayGuestMessages();
    });
}

function displayGuestMessages() {
    const container = document.getElementById('guestMessagesList');
    if (container) {
        const messages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
        if (messages.length === 0) {
            container.innerHTML = '<p class="text-neutral-500 text-center py-8">Belum ada pesan. Jadilah yang pertama!</p>';
            return;
        }
        container.innerHTML = messages.map(msg => `
            <div class="border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-3">
                <p class="font-medium text-sm">${escapeHtml(msg.name)}</p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">${escapeHtml(msg.message)}</p>
                <p class="text-xs text-neutral-400 mt-1">${msg.date}</p>
            </div>
        `).join('');
    }
}

// Edit Social Links
const editSocialBtn = document.getElementById('editSocialBtn');
if (editSocialBtn) {
    const savedSocial = JSON.parse(localStorage.getItem('socialLinks') || '{}');
    if (savedSocial.instagram && document.getElementById('instagramLink')) document.getElementById('instagramLink').href = savedSocial.instagram;
    if (savedSocial.github && document.getElementById('githubLink')) document.getElementById('githubLink').href = savedSocial.github;
    if (savedSocial.whatsapp && document.getElementById('whatsappLink')) document.getElementById('whatsappLink').href = savedSocial.whatsapp;
    
    editSocialBtn.addEventListener('click', () => {
        if (!askPassword('mengedit sosial media')) return;
        
        const ig = prompt('Link Instagram:', document.getElementById('instagramLink')?.href);
        const gh = prompt('Link GitHub:', document.getElementById('githubLink')?.href);
        const wa = prompt('Link WhatsApp (contoh: https://wa.me/628123456789):', document.getElementById('whatsappLink')?.href);
        
        if (ig && document.getElementById('instagramLink')) document.getElementById('instagramLink').href = ig;
        if (gh && document.getElementById('githubLink')) document.getElementById('https://github.com/zhan200918').href = gh;
        if (wa && document.getElementById('whatsappLink')) document.getElementById('https://wa.me/6285891327504').href = wa;
        
        localStorage.setItem('socialLinks', JSON.stringify({
            instagram: document.getElementById('instagramLink')?.href,
            github: document.getElementById('githubLink')?.href,
            whatsapp: document.getElementById('whatsappLink')?.href
        }));
    });
}

// ==================== MODAL GALLERY ====================
function openModal(imgSrc) {
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'modal fixed inset-0 bg-black/95 z-50 hidden justify-center items-center cursor-pointer';
        modal.innerHTML = `
            <span class="close-modal absolute top-5 right-8 text-white text-5xl cursor-pointer hover:text-gray-400">&times;</span>
            <img id="modalImage" class="max-w-[90%] max-h-[90%] object-contain">
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').onclick = closeModal;
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }
    document.getElementById('modalImage').src = imgSrc;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.style.display = 'none';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    renderFriends();
    renderAchievements();
    renderTimeline();
    renderQuotes();
    displayGuestMessages();
    addLogoutButton();
    
    if (isAdmin) {
        console.log('✅ Mode Admin aktif');
    }
});
