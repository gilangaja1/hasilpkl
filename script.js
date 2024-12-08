// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submit Message
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
    form.reset();
});

// Animasi Scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    observer.observe(section);
});

// Galeri Foto Interaktif
const images = document.querySelectorAll('.project-card img');
images.forEach(image => {
    image.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const img = document.createElement('img');
        img.src = image.src;
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => overlay.remove());
    });
});

// Dark Mode Toggle
const toggleDarkMode = document.createElement('button');
toggleDarkMode.textContent = '🌙 Mode Gelap';
toggleDarkMode.classList.add('dark-mode-toggle');
document.body.appendChild(toggleDarkMode);

toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleDarkMode.textContent = document.body.classList.contains('dark-mode') 
        ? '☀️ Mode Terang' 
        : '🌙 Mode Gelap';
});

// Loading Animation
window.addEventListener('load', () => {
    document.getElementById('loading').style.display = 'none';
});

// Sticky Navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Menu Burger Toggle (untuk mobile)
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.textContent = '☰';
document.querySelector('.navbar').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    const navbarContent = document.querySelector('.navbar-content');
    navbarContent.classList.toggle('show');
});

// Reveal Navbar on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});

// Animasi Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => revealObserver.observe(element));

function createSkillProgressBars() {
    const skills = [
        { name: 'PHP', percentage: 80 },
        { name: 'MySQL', percentage: 70 },
        { name: 'JavaScript', percentage: 65 },
        { name: 'HTML/CSS', percentage: 75 },
    ];

    // Pastikan elemen #skills ada
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) {
        console.error('Elemen #skills tidak ditemukan di HTML.');
        return;
    }

    // Membuat elemen skill bar untuk setiap skill
    skills.forEach(skill => {
        const skillBar = document.createElement('div');
        skillBar.classList.add('skill-bar');
        skillBar.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-progress">
                <div class="skill-percentage" style="width: ${skill.percentage}%" data-percentage="${skill.percentage}">
                    ${skill.percentage}%
                </div>
            </div>
        `;
        skillsSection.appendChild(skillBar);
    });

    console.log('Skill bars berhasil dibuat.');
}


// Project Filter
function createProjectFilter() {
    // Cek apakah filter sudah ada, jika ada, hapus
    const existingFilter = document.querySelector('.project-filter');
    if (existingFilter) existingFilter.remove();

    const projects = [
        { name: 'Pengembangan Website Absensi Karyawan', category: 'Web Development', technologies: ['PHP', 'MySQL'] },
        { name: 'Sistem Pengelolaan Data Keluhan Pelanggan', category: 'Database', technologies: ['PHP', 'MySQL', 'AJAX'] },
        { name: 'Sistem Login dan Hak Akses Pengguna', category: 'Web Development', technologies: ['PHP', 'MySQL'] },
        { name: 'Desain Antarmuka Pengguna (UI) yang Responsif', category: 'Web Development', technologies: ['HTML', 'CSS', 'JavaScript'] }
    ];

    // Membuat elemen filter
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('project-filter');
    filterContainer.innerHTML = `
        <h3>Filter Proyek</h3>
        <button data-filter="all" class="active">Semua Proyek</button>
        <button data-filter="Web Development">Web Development</button>
        <button data-filter="Database">Database</button>
    `;

    // Menyisipkan filter di atas project-grid
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.parentNode.insertBefore(filterContainer, projectGrid);

    // Event listener untuk tombol filter
    filterContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const filter = e.target.getAttribute('data-filter');
            
            // Menambahkan highlight pada tombol aktif
            document.querySelectorAll('.project-filter button').forEach(button => {
                button.classList.remove('active');
            });
            e.target.classList.add('active');

            // Menyembunyikan/menampilkan kartu proyek
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// Memastikan createProjectFilter hanya dipanggil satu kali
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.project-filter')) {
        createProjectFilter();
    }
});


// Page Load Enhancements
document.addEventListener('DOMContentLoaded', () => {
    createSkillProgressBars();
    createProjectFilter();
    
    // Animated Counter for Project Stats
    const statsSection = document.createElement('section');
    statsSection.id = 'project-stats';
    statsSection.innerHTML = `
        <h2>Statistik Proyek</h2>
        <div class="stats-container">
            <div class="stat">
                <span class="counter" data-target="2">0</span>
                <p>Total Proyek</p>
            </div>
            <div class="stat">
                <span class="counter" data-target="5">0</span>
                <p>Bulan PKL</p>
            </div>
            <div class="stat">
                <span class="counter" data-target="95">0</span>
                <p>Persentase Keberhasilan</p>
            </div>
        </div>
    `;
    document.body.insertBefore(statsSection, document.querySelector('#kontak'));

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCounter = () => {
            const current = +counter.textContent;
            const increment = target / 100;
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
});

// Menutup navbar saat tautan diklik
const navbarLinks = document.querySelectorAll('.navbar-content a');
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navbarContent = document.querySelector('.navbar-content');
        if (navbarContent.classList.contains('show')) {
            navbarContent.classList.remove('show');
        }
    });
});

// Reveal animation on scroll
const scrollRevealElements = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
    scrollRevealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            el.classList.add('animate');
        }
    });
});

const filterButtons = document.querySelectorAll('.project-filter button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus kelas "active" dari semua tombol
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tambahkan kelas "active" ke tombol yang diklik
        button.classList.add('active');
    });
});

// Fungsi memperbesar gambar saat diklik
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(image => {
    image.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        overlay.appendChild(img);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => overlay.remove());
    });
});

