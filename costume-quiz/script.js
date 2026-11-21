// ============================================
// IMAGE PRELOADING & CACHING
// ============================================

// Daftar semua gambar yang perlu di-preload
const imagesToPreload = [
    'https://game.afifedu.com/character.png',
    'https://game.afifedu.com/icon_home.png',
    'https://game.afifedu.com/icon_tarik.png',
    'https://game.afifedu.com/icon_panjat.png',
    'https://game.afifedu.com/icon_balap_karung.png',
    'https://game.afifedu.com/panjat_pinang/tiang.png',
    'https://game.afifedu.com/panjat_pinang/standleft.png',
    'https://game.afifedu.com/panjat_pinang/standright.png',
    'https://game.afifedu.com/panjat_pinang/climbleft.png',
    'https://game.afifedu.com/panjat_pinang/climbright.png',
    'https://game.afifedu.com/balap_karung/track.png',
    'https://game.afifedu.com/balap_karung/blue_stand.png',
    'https://game.afifedu.com/balap_karung/blue_hop.png',
    'https://game.afifedu.com/balap_karung/red_stand.png',
    'https://game.afifedu.com/balap_karung/red_hop.png'
];

// Object untuk menyimpan gambar yang sudah dimuat
const preloadedImages = {};
let imagesLoaded = 0;
let totalImages = imagesToPreload.length;

// Fungsi untuk preload gambar
function preloadImages() {
    console.log('🖼️ Preloading images...');
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        
        img.onload = () => {
            preloadedImages[src] = img;
            imagesLoaded++;
            console.log(`✅ Loaded: ${src} (${imagesLoaded}/${totalImages})`);
            
            // Semua gambar sudah dimuat
            if (imagesLoaded === totalImages) {
                console.log('🎉 All images preloaded successfully!');
            }
        };
        
        img.onerror = () => {
            console.error(`❌ Failed to load: ${src}`);
            imagesLoaded++;
        };
        
        img.src = src;
    });
}

// Preload semua gambar saat halaman dimuat
window.addEventListener('load', () => {
    preloadImages();
});

// ============================================
// SISTEM FOLDER & BANK KOSTUM SOAL (SEMUA MAPEL)
// ============================================

const STORAGE_KEY_FOLDER_DATA = 'afifedu_quiz_folders_v2';

const defaultFolderStore = {
    activeFolderId: 'folder_tik',
    folders: [
        {
            id: 'folder_tik',
            name: 'Informatika (TIK)',
            questions: [
                {
                    question: 'Apa kepanjangan dari CPU pada komputer?',
                    options: { A: 'Central Process Unit', B: 'Central Processing Unit', C: 'Computer Personal Unit', D: 'Control Processing Unit' },
                    answer: 'B'
                },
                {
                    question: 'Perangkat lunak yang digunakan untuk mengolah angka adalah...',
                    options: { A: 'Microsoft Word', B: 'Microsoft PowerPoint', C: 'Microsoft Excel', D: 'CorelDraw' },
                    answer: 'C'
                },
                {
                    question: 'Tombol pintas (shortcut) pada keyboard untuk menyalin teks adalah...',
                    options: { A: 'Ctrl + C', B: 'Ctrl + V', C: 'Ctrl + X', D: 'Ctrl + Z' },
                    answer: 'A'
                },
                {
                    question: 'Perangkat keras yang berfungsi menampilkan output visual ke layar adalah...',
                    options: { A: 'Keyboard', B: 'Scanner', C: 'Monitor', D: 'Microphone' },
                    answer: 'C'
                }
            ]
        },
        {
            id: 'folder_ipa',
            name: 'IPA (Sains)',
            questions: [
                {
                    question: 'Organ tubuh manusia yang berfungsi memompa darah adalah...',
                    options: { A: 'Paru-paru', B: 'Hati', C: 'Ginjal', D: 'Jantung' },
                    answer: 'D'
                },
                {
                    question: 'Gas yang dibutuhkan tumbuhan untuk proses fotosintesis adalah...',
                    options: { A: 'Oksigen', B: 'Karbon dioksida', C: 'Nitrogen', D: 'Hidrogen' },
                    answer: 'B'
                },
                {
                    question: 'Planet terdekat dengan Matahari dalam tata surya adalah...',
                    options: { A: 'Venus', B: 'Mars', C: 'Merkurius', D: 'Bumi' },
                    answer: 'C'
                },
                {
                    question: 'Perubahan wujud benda dari cair menjadi gas disebut...',
                    options: { A: 'Membeku', B: 'Menguap', C: 'Menyublim', D: 'Mengembun' },
                    answer: 'B'
                }
            ]
        },
        {
            id: 'folder_ips',
            name: 'IPS & PPKn',
            questions: [
                {
                    question: 'Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal...',
                    options: { A: '17 Agustus 1945', B: '18 Agustus 1945', C: '1 Juni 1945', D: '28 Oktober 1928' },
                    answer: 'A'
                },
                {
                    question: 'Sila ketiga Pancasila dilambangkan dengan gambar...',
                    options: { A: 'Bintang', B: 'Rantai', C: 'Pohon Beringin', D: 'Kepala Banteng' },
                    answer: 'C'
                },
                {
                    question: 'Ibukota negara Jepang adalah...',
                    options: { A: 'Seoul', B: 'Beijing', C: 'Tokyo', D: 'Bangkok' },
                    answer: 'C'
                }
            ]
        }
    ]
};

let folderStore = {
    activeFolderId: '',
    folders: []
};

// Folder yang sedang dibuka/dilihat di halaman kelola soal
let viewingFolderId = '';

function loadFolderStore() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_FOLDER_DATA);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && Array.isArray(parsed.folders) && parsed.folders.length > 0) {
                folderStore = parsed;
            } else {
                folderStore = JSON.parse(JSON.stringify(defaultFolderStore));
                saveFolderStore();
            }
        } else {
            folderStore = JSON.parse(JSON.stringify(defaultFolderStore));
            saveFolderStore();
        }
    } catch (e) {
        console.error('Gagal memuat data folder dari localStorage:', e);
        folderStore = JSON.parse(JSON.stringify(defaultFolderStore));
    }

    // Pastikan activeFolderId valid
    if (!folderStore.folders.some(f => f.id === folderStore.activeFolderId)) {
        folderStore.activeFolderId = folderStore.folders[0]?.id || '';
    }

    // Pastikan viewingFolderId valid
    if (!viewingFolderId || !folderStore.folders.some(f => f.id === viewingFolderId)) {
        viewingFolderId = folderStore.activeFolderId || (folderStore.folders[0]?.id || '');
    }

    updateActiveFolderBadgeUI();
}

function saveFolderStore() {
    try {
        localStorage.setItem(STORAGE_KEY_FOLDER_DATA, JSON.stringify(folderStore));
    } catch (e) {
        console.error('Gagal menyimpan data folder ke localStorage:', e);
    }
    updateActiveFolderBadgeUI();
}

function getActiveFolder() {
    return folderStore.folders.find(f => f.id === folderStore.activeFolderId) || null;
}

function getViewingFolder() {
    return folderStore.folders.find(f => f.id === viewingFolderId) || null;
}

function updateActiveFolderBadgeUI() {
    const activeFolder = getActiveFolder();
    const badgeName = document.getElementById('activeFolderBadge');
    const badgeCount = document.getElementById('questionCountBadge');
    const headerActiveName = document.getElementById('headerActiveFolderName');

    const folderName = activeFolder ? activeFolder.name : 'Belum dipilih';
    const qCount = activeFolder ? activeFolder.questions.length : 0;

    if (badgeName) badgeName.textContent = folderName;
    if (badgeCount) badgeCount.textContent = `${qCount} Soal`;
    if (headerActiveName) headerActiveName.textContent = `${folderName} (${qCount} soal)`;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Render semua bagian UI Kelola Folder & Soal
function renderFolderManagerUI() {
    renderFolderList();
    renderTargetFolderDropdown();
    renderViewingFolderQuestions();
    updateActiveFolderBadgeUI();
}

function renderFolderList() {
    const container = document.getElementById('folderListContainer');
    if (!container) return;

    if (folderStore.folders.length === 0) {
        container.innerHTML = '<div class="empty-soal-msg">Belum ada folder. Buat folder mata pelajaran di atas.</div>';
        return;
    }

    container.innerHTML = folderStore.folders.map(folder => {
        const isActive = folder.id === folderStore.activeFolderId;
        const isViewing = folder.id === viewingFolderId;
        return `
            <div class="folder-item ${isViewing ? 'viewing' : ''} ${isActive ? 'active-play' : ''}" onclick="selectViewingFolder('${folder.id}')">
                <div class="folder-item-top">
                    <div class="folder-name-wrap">
                        <span class="folder-icon">${isActive ? '📂' : '📁'}</span>
                        <span class="folder-title">${escapeHtml(folder.name)}</span>
                    </div>
                    <span class="folder-count-pill">${folder.questions.length} soal</span>
                </div>
                <div class="folder-item-actions" onclick="event.stopPropagation()">
                    ${isActive 
                        ? `<span class="active-tag">✅ Aktif Dipakai</span>` 
                        : `<button type="button" class="folder-use-btn" onclick="setActiveFolder('${folder.id}')">Aktifkan</button>`
                    }
                    <div class="folder-mini-btns">
                        <button type="button" class="folder-icon-btn" onclick="renameFolder('${folder.id}')" title="Ubah Nama Folder">✏️</button>
                        <button type="button" class="folder-icon-btn danger" onclick="deleteFolder('${folder.id}')" title="Hapus Folder">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderTargetFolderDropdown() {
    const select = document.getElementById('selectTargetFolder');
    if (!select) return;

    select.innerHTML = folderStore.folders.map(folder => {
        const isActive = folder.id === folderStore.activeFolderId;
        return `<option value="${folder.id}" ${folder.id === viewingFolderId ? 'selected' : ''}>
            ${escapeHtml(folder.name)} (${folder.questions.length} soal)${isActive ? ' ★ Aktif' : ''}
        </option>`;
    }).join('');
}

function onTargetFolderSelectChange() {
    const select = document.getElementById('selectTargetFolder');
    if (!select) return;
    viewingFolderId = select.value;
    renderFolderList();
    renderViewingFolderQuestions();
}

function selectViewingFolder(folderId) {
    viewingFolderId = folderId;
    renderFolderManagerUI();
}

function setActiveFolder(folderId) {
    const target = folderStore.folders.find(f => f.id === folderId);
    if (!target) return;
    folderStore.activeFolderId = folderId;
    viewingFolderId = folderId;
    saveFolderStore();
    renderFolderManagerUI();
}

function activateViewingFolder() {
    if (!viewingFolderId) return;
    setActiveFolder(viewingFolderId);
}

function createNewFolder() {
    const input = document.getElementById('inputNewFolderName');
    if (!input) return;
    const name = input.value.trim();

    if (!name) {
        alert('Masukkan nama folder mata pelajaran terlebih dahulu!');
        return;
    }

    const exists = folderStore.folders.some(f => f.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert('Folder dengan nama tersebut sudah ada!');
        return;
    }

    const newId = 'folder_' + Date.now();
    folderStore.folders.push({
        id: newId,
        name: name,
        questions: []
    });

    // Otomatis pilih folder yang baru dibuat agar mudah langsung diisi
    viewingFolderId = newId;
    if (!folderStore.activeFolderId) {
        folderStore.activeFolderId = newId;
    }

    input.value = '';
    saveFolderStore();
    renderFolderManagerUI();
}

function renameFolder(folderId) {
    const folder = folderStore.folders.find(f => f.id === folderId);
    if (!folder) return;

    const newName = prompt('Ubah nama folder mata pelajaran:', folder.name);
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) {
        alert('Nama folder tidak boleh kosong!');
        return;
    }

    folder.name = trimmed;
    saveFolderStore();
    renderFolderManagerUI();
}

function deleteFolder(folderId) {
    if (folderStore.folders.length <= 1) {
        alert('Minimal harus tersisa 1 folder mata pelajaran!');
        return;
    }

    const folder = folderStore.folders.find(f => f.id === folderId);
    if (!folder) return;

    if (!confirm(`Hapus folder "${folder.name}" beserta seluruh ${folder.questions.length} soal di dalamnya?`)) {
        return;
    }

    folderStore.folders = folderStore.folders.filter(f => f.id !== folderId);

    if (folderStore.activeFolderId === folderId) {
        folderStore.activeFolderId = folderStore.folders[0].id;
    }
    if (viewingFolderId === folderId) {
        viewingFolderId = folderStore.activeFolderId;
    }

    saveFolderStore();
    renderFolderManagerUI();
}

function renderViewingFolderQuestions() {
    const listContainer = document.getElementById('customQuestionList');
    const titleEl = document.getElementById('viewingFolderTitle');
    const totalEl = document.getElementById('totalCustomQuestions');
    const activateBtn = document.getElementById('activateViewingFolderBtn');
    if (!listContainer) return;

    const folder = getViewingFolder();
    if (!folder) {
        if (titleEl) titleEl.textContent = '-';
        if (totalEl) totalEl.textContent = '0';
        listContainer.innerHTML = '<div class="empty-soal-msg">Pilih atau buat folder terlebih dahulu.</div>';
        return;
    }

    if (titleEl) titleEl.textContent = folder.name;
    if (totalEl) totalEl.textContent = folder.questions.length;

    if (activateBtn) {
        const isCurrentActive = folder.id === folderStore.activeFolderId;
        activateBtn.textContent = isCurrentActive ? '✅ Sedang Aktif' : '⚡ Aktifkan Folder Ini';
        activateBtn.disabled = isCurrentActive;
    }

    if (folder.questions.length === 0) {
        listContainer.innerHTML = `<div class="empty-soal-msg">Folder <b>${escapeHtml(folder.name)}</b> masih kosong.<br>Tambahkan soal manual di samping atau klik <b>Import File!</b>.</div>`;
        return;
    }

    listContainer.innerHTML = folder.questions.map((item, idx) => `
        <div class="soal-item">
            <div class="soal-item-main">
                <div class="soal-item-q"><strong>${idx + 1}.</strong> ${escapeHtml(item.question)}</div>
                <div class="soal-item-opts">
                    <span class="${item.answer === 'A' ? 'opt-correct' : ''}">A: ${escapeHtml(item.options.A)}</span>
                    <span class="${item.answer === 'B' ? 'opt-correct' : ''}">B: ${escapeHtml(item.options.B)}</span>
                    <span class="${item.answer === 'C' ? 'opt-correct' : ''}">C: ${escapeHtml(item.options.C)}</span>
                    <span class="${item.answer === 'D' ? 'opt-correct' : ''}">D: ${escapeHtml(item.options.D)}</span>
                </div>
            </div>
            <div class="soal-item-side-btns">
                <button type="button" class="move-soal-btn" onclick="moveQuestionToAnotherFolder(${idx})" title="Pindahkan ke folder lain">↪️</button>
                <button type="button" class="delete-soal-btn" onclick="deleteCustomQuestion(${idx})" title="Hapus Soal">✕</button>
            </div>
        </div>
    `).join('');
}

function addCustomQuestion() {
    const targetSelect = document.getElementById('selectTargetFolder');
    const targetFolderId = targetSelect ? targetSelect.value : viewingFolderId;
    const targetFolder = folderStore.folders.find(f => f.id === targetFolderId);

    if (!targetFolder) {
        alert('Pilih folder tujuan terlebih dahulu!');
        return;
    }

    const qInput = document.getElementById('inputQuestionText');
    const optA = document.getElementById('inputOptionA');
    const optB = document.getElementById('inputOptionB');
    const optC = document.getElementById('inputOptionC');
    const optD = document.getElementById('inputOptionD');
    const correctSelect = document.getElementById('inputCorrectOption');

    const question = qInput.value.trim();
    const A = optA.value.trim();
    const B = optB.value.trim();
    const C = optC.value.trim();
    const D = optD.value.trim();
    const answer = correctSelect.value;

    if (!question || !A || !B || !C || !D) {
        alert('Harap isi pertanyaan dan semua pilihan jawaban (A, B, C, D)!');
        return;
    }

    targetFolder.questions.push({
        question,
        options: { A, B, C, D },
        answer
    });

    viewingFolderId = targetFolder.id;
    saveFolderStore();
    renderFolderManagerUI();

    qInput.value = '';
    optA.value = '';
    optB.value = '';
    optC.value = '';
    optD.value = '';
    correctSelect.value = 'A';
}

function moveQuestionToAnotherFolder(questionIndex) {
    const sourceFolder = getViewingFolder();
    if (!sourceFolder || !sourceFolder.questions[questionIndex]) return;

    const otherFolders = folderStore.folders.filter(f => f.id !== sourceFolder.id);
    if (otherFolders.length === 0) {
        alert('Buat folder tujuan lain terlebih dahulu untuk memindahkan soal!');
        return;
    }

    const choicesText = otherFolders.map((f, i) => `${i + 1}. ${f.name}`).join('\n');
    const input = prompt(`Pindahkan soal ke folder nomor berapa?\n${choicesText}`);
    if (input === null) return;

    const chosenIdx = parseInt(input.trim(), 10) - 1;
    if (isNaN(chosenIdx) || chosenIdx < 0 || chosenIdx >= otherFolders.length) {
        alert('Nomor folder tidak valid!');
        return;
    }

    const [movedQuestion] = sourceFolder.questions.splice(questionIndex, 1);
    otherFolders[chosenIdx].questions.push(movedQuestion);

    saveFolderStore();
    renderFolderManagerUI();
}

function deleteCustomQuestion(index) {
    const folder = getViewingFolder();
    if (!folder) return;
    folder.questions.splice(index, 1);
    saveFolderStore();
    renderFolderManagerUI();
}

function clearViewingFolderQuestions() {
    const folder = getViewingFolder();
    if (!folder) return;
    if (folder.questions.length === 0) return;

    if (confirm(`Kosongkan semua soal di dalam folder "${folder.name}"?`)) {
        folder.questions = [];
        saveFolderStore();
        renderFolderManagerUI();
    }
}

// ============================================
// IMPORT & EXPORT FILE JSON PER FOLDER
// ============================================

function triggerJsonUpload() {
    const targetSelect = document.getElementById('selectTargetFolder');
    const targetFolderId = targetSelect ? targetSelect.value : viewingFolderId;
    if (!targetFolderId) {
        alert('Pilih folder tujuan terlebih dahulu!');
        return;
    }
    const fileInput = document.getElementById('jsonFileInput');
    if (fileInput) {
        fileInput.value = '';
        fileInput.click();
    }
}

function normalizeImportedQuestion(raw) {
    if (!raw || typeof raw !== 'object') return null;

    const question = String(raw.question || raw.pertanyaan || raw.soal || '').trim();
    if (!question) return null;

    let A = '', B = '', C = '', D = '';
    if (raw.options && typeof raw.options === 'object' && !Array.isArray(raw.options)) {
        A = String(raw.options.A ?? raw.options.a ?? '').trim();
        B = String(raw.options.B ?? raw.options.b ?? '').trim();
        C = String(raw.options.C ?? raw.options.c ?? '').trim();
        D = String(raw.options.D ?? raw.options.d ?? '').trim();
    } else if (Array.isArray(raw.options) && raw.options.length >= 4) {
        A = String(raw.options[0] ?? '').trim();
        B = String(raw.options[1] ?? '').trim();
        C = String(raw.options[2] ?? '').trim();
        D = String(raw.options[3] ?? '').trim();
    } else {
        A = String(raw.A ?? raw.a ?? raw.opsiA ?? '').trim();
        B = String(raw.B ?? raw.b ?? raw.opsiB ?? '').trim();
        C = String(raw.C ?? raw.c ?? raw.opsiC ?? '').trim();
        D = String(raw.D ?? raw.d ?? raw.opsiD ?? '').trim();
    }

    const answer = String(raw.answer || raw.kunci || raw.jawaban || '').trim().toUpperCase();

    if (!A || !B || !C || !D || !['A', 'B', 'C', 'D'].includes(answer)) {
        return null;
    }

    return {
        question,
        options: { A, B, C, D },
        answer
    };
}

function handleJsonFileUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const targetSelect = document.getElementById('selectTargetFolder');
    const targetFolderId = targetSelect ? targetSelect.value : viewingFolderId;
    const targetFolder = folderStore.folders.find(f => f.id === targetFolderId);

    if (!targetFolder) {
        alert('Folder tujuan tidak ditemukan!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            let rawList = [];

            if (Array.isArray(parsed)) {
                rawList = parsed;
            } else if (parsed && Array.isArray(parsed.questions)) {
                rawList = parsed.questions;
            } else if (parsed && Array.isArray(parsed.soal)) {
                rawList = parsed.soal;
            } else {
                throw new Error('Struktur JSON harus berupa array soal atau objek dengan properti "questions".');
            }

            const validQuestions = [];
            rawList.forEach(item => {
                const normalized = normalizeImportedQuestion(item);
                if (normalized) validQuestions.push(normalized);
            });

            if (validQuestions.length === 0) {
                alert('Tidak ada soal valid di dalam file JSON tersebut. Pastikan setiap soal memiliki "question", "options" (A, B, C, D), dan "answer" (A/B/C/D).');
                return;
            }

            targetFolder.questions.push(...validQuestions);
            viewingFolderId = targetFolder.id;
            saveFolderStore();
            renderFolderManagerUI();

            alert(`Berhasil mengimpor ${validQuestions.length} soal ke folder "${targetFolder.name}"!`);
        } catch (err) {
            console.error('Error parsing JSON:', err);
            alert('Gagal membaca file JSON! Pastikan format file JSON benar.\nDetail: ' + err.message);
        }
    };

    reader.readAsText(file, 'UTF-8');
}

function downloadJsonTemplate() {
    const sampleData = [
        {
            question: "Contoh Soal 1: Apa ibukota provinsi Jawa Timur?",
            options: {
                A: "Malang",
                B: "Surabaya",
                C: "Bandung",
                D: "Semarang"
            },
            answer: "B"
        },
        {
            question: "Contoh Soal 2: Bahasa Inggris dari 'Buku' adalah...",
            options: {
                A: "Pen",
                B: "Table",
                C: "Book",
                D: "Chair"
            },
            answer: "C"
        }
    ];

    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template-soal-kuis.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportSelectedFolderJson() {
    const folder = getViewingFolder();
    if (!folder) return;

    if (folder.questions.length === 0) {
        alert(`Folder "${folder.name}" masih kosong, belum ada soal untuk di-export.`);
        return;
    }

    const safeFileName = folder.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'soal';
    const blob = new Blob([JSON.stringify(folder.questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soal-${safeFileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================
// GAME STATE
// ============================================

// Inisialisasi game state
const gameState = {
    leftPlayer: {
        answer: '',
        score: 0,
        climbPosition: 0, // untuk panjat pinang (0-7)
        racePosition: 0,   // untuk balap karung (0-10)
        lastQuestionIndex: -1, // index soal terakhir untuk mencegah duplikat
        currentQuestionObj: null,
        isLocked: false
    },
    rightPlayer: {
        answer: '',
        score: 0,
        climbPosition: 0, // untuk panjat pinang (0-7)
        racePosition: 0,   // untuk balap karung (0-10)
        lastQuestionIndex: -1, // index soal terakhir untuk mencegah duplikat
        currentQuestionObj: null,
        isLocked: false
    },
    ropePosition: 50, // posisi tali (50 = tengah, 0 = kiri menang, 100 = kanan menang)
    currentGameType: 'tarik-tambang' // 'tarik-tambang', 'panjat-pinang', or 'balap-karung'
};

// Fungsi untuk mengupdate status kotak feedback jawaban player
function updateAnswer(player, text, statusClass = '') {
    let gameScreen;
    if (gameState.currentGameType === 'tarik-tambang') {
        gameScreen = '#gameScreenTarikTambang';
    } else if (gameState.currentGameType === 'panjat-pinang') {
        gameScreen = '#gameScreenPanjatPinang';
    } else {
        gameScreen = '#gameScreenBalapKarung';
    }
    
    const answerBox = document.querySelector(`${gameScreen} .${player}-player .answer-box`);
    if (!answerBox) return;

    if (player === 'left') {
        gameState.leftPlayer.answer = text;
    } else {
        gameState.rightPlayer.answer = text;
    }

    answerBox.textContent = text || 'Pilih Jawaban';
    answerBox.classList.remove('correct', 'wrong');
    if (statusClass) {
        answerBox.classList.add(statusClass);
    }
}

// Fungsi untuk mengecek jawaban pilihan ganda
function checkAnswer(player, selectedOption) {
    const playerState = player === 'left' ? gameState.leftPlayer : gameState.rightPlayer;
    if (playerState.isLocked || !playerState.currentQuestionObj) return false;

    let gameScreen;
    if (gameState.currentGameType === 'tarik-tambang') {
        gameScreen = '#gameScreenTarikTambang';
    } else if (gameState.currentGameType === 'panjat-pinang') {
        gameScreen = '#gameScreenPanjatPinang';
    } else {
        gameScreen = '#gameScreenBalapKarung';
    }
    
    const section = document.querySelector(`${gameScreen} .${player}-player`);
    const selectedBtn = section.querySelector(`.option-btn[data-option="${selectedOption}"]`);
    const correctOption = playerState.currentQuestionObj.answer;
    const selectedText = playerState.currentQuestionObj.options[selectedOption];

    playerState.isLocked = true;

    if (selectedOption === correctOption) {
        // Jawaban benar
        updateAnswer(player, `✅ ${selectedOption}. ${selectedText}`, 'correct');
        if (selectedBtn) selectedBtn.classList.add('opt-btn-correct');
        
        if (gameState.currentGameType === 'tarik-tambang') {
            // Logic untuk Tarik Tambang
            if (player === 'left') {
                gameState.ropePosition -= 10;
            } else {
                gameState.ropePosition += 10;
            }
            updateRopePosition();
            
            // Cek kemenangan Tarik Tambang
            if (gameState.ropePosition <= 0) {
                setTimeout(() => {
                    showWinnerModal('Pemain Kiri', 'Selamat! Anda berhasil menarik tali ke garis akhir!');
                }, 400);
                return true;
            } else if (gameState.ropePosition >= 100) {
                setTimeout(() => {
                    showWinnerModal('Pemain Kanan', 'Selamat! Anda berhasil menarik tali ke garis akhir!');
                }, 400);
                return true;
            }

            setTimeout(() => {
                generateNewQuestion(player);
            }, 350);
        } else if (gameState.currentGameType === 'panjat-pinang') {
            // Logic untuk Panjat Pinang - Jawaban BENAR
            if (player === 'left') {
                gameState.leftPlayer.climbPosition++;
            } else {
                gameState.rightPlayer.climbPosition++;
            }
            updateClimberPosition(player);
            updateScoreDisplay(player); // Update tampilan score
            
            // Cek kemenangan Panjat Pinang
            const WINNING_STEPS = 7; // EDIT: Jumlah step untuk menang
            if (gameState.leftPlayer.climbPosition >= WINNING_STEPS) {
                setTimeout(() => {
                    showWinnerModal('Pemain Kiri', 'Selamat! Anda berhasil mencapai puncak tiang pinang!');
                }, 600);
                return true;
            } else if (gameState.rightPlayer.climbPosition >= WINNING_STEPS) {
                setTimeout(() => {
                    showWinnerModal('Pemain Kanan', 'Selamat! Anda berhasil mencapai puncak tiang pinang!');
                }, 600);
                return true;
            }

            setTimeout(() => {
                generateNewQuestion(player);
            }, 500);
        } else if (gameState.currentGameType === 'balap-karung') {
            // Logic untuk Balap Karung - Jawaban BENAR
            if (player === 'left') {
                gameState.leftPlayer.racePosition++;
            } else {
                gameState.rightPlayer.racePosition++;
            }
            updateRacerPosition(player);
            updateScoreDisplay(player); // Update tampilan score
            
            // Cek kemenangan Balap Karung
            const WINNING_HOPS = 10; // 10 lompatan untuk menang
            if (gameState.leftPlayer.racePosition >= WINNING_HOPS) {
                setTimeout(() => {
                    showWinnerModal('Pemain Kiri', 'Selamat! Anda berhasil mencapai garis finish!');
                }, 600);
                return true;
            } else if (gameState.rightPlayer.racePosition >= WINNING_HOPS) {
                setTimeout(() => {
                    showWinnerModal('Pemain Kanan', 'Selamat! Anda berhasil mencapai garis finish!');
                }, 600);
                return true;
            }

            setTimeout(() => {
                generateNewQuestion(player);
            }, 500);
        }
        
        return true;
    } else {
        // Jawaban salah - tampilkan animasi error
        updateAnswer(player, `❌ Salah (${selectedOption})`, 'wrong');
        if (selectedBtn) selectedBtn.classList.add('opt-btn-wrong');
        
        // Logic untuk Panjat Pinang - Jawaban SALAH
        if (gameState.currentGameType === 'panjat-pinang') {
            const currentPosition = player === 'left' ? 
                gameState.leftPlayer.climbPosition : 
                gameState.rightPlayer.climbPosition;
            
            // Hanya kurangi jika posisi > 0 (sudah mulai memanjat)
            if (currentPosition > 0) {
                if (player === 'left') {
                    gameState.leftPlayer.climbPosition--;
                } else {
                    gameState.rightPlayer.climbPosition--;
                }
                updateClimberPosition(player); // Turunkan posisi
                updateScoreDisplay(player);    // Update tampilan score
            }
        }
        
        // Logic untuk Balap Karung - Jawaban SALAH (Shake animation)
        if (gameState.currentGameType === 'balap-karung') {
            const racerClass = player === 'left' ? '.left-racer' : '.right-racer';
            const racerContainer = document.querySelector(`#gameScreenBalapKarung ${racerClass}`);
            
            // Trigger shake animation
            racerContainer.classList.add('shaking');
            
            // Remove shake class setelah animasi selesai
            setTimeout(() => {
                racerContainer.classList.remove('shaking');
            }, 500);
        }

        // Ganti ke soal berikutnya setelah jeda singkat
        setTimeout(() => {
            generateNewQuestion(player);
        }, 650);
        
        return false;
    }
}

// Fungsi untuk mengupdate posisi tali dan pemain
function updateRopePosition() {
    const scene = document.querySelector('.tug-of-war-scene');
    const gameContainer = document.querySelector('#gameScreenTarikTambang');
    
    if (!scene || !gameContainer) return;
    
    // Get actual widths for boundary calculation
    const leftSection = gameContainer.querySelector('.left-player');
    const rightSection = gameContainer.querySelector('.right-player');
    const centerSection = gameContainer.querySelector('.center-section');
    
    // Calculate safe boundaries (don't overlap with keypad areas)
    const leftBoundary = leftSection ? leftSection.offsetWidth : 340;
    const rightBoundary = rightSection ? rightSection.offsetWidth : 340;
    const centerWidth = centerSection ? centerSection.offsetWidth : 500;
    
    // Calculate maximum safe movement in pixels
    const maxLeftMove = Math.min(centerWidth * 0.4, leftBoundary * 0.3);  // Max 40% of center or 30% of keypad width
    const maxRightMove = Math.min(centerWidth * 0.4, rightBoundary * 0.3);
    
    // Calculate position based on game state (0-100 scale)
    let offset = 0;
    if (gameState.ropePosition < 50) {
        // Moving left (left player winning)
        const leftProgress = (50 - gameState.ropePosition) / 50; // 0 to 1
        offset = -leftProgress * maxLeftMove;
    } else if (gameState.ropePosition > 50) {
        // Moving right (right player winning)
        const rightProgress = (gameState.ropePosition - 50) / 50; // 0 to 1
        offset = rightProgress * maxRightMove;
    }
    
    scene.style.left = `${offset}px`;
}

// Fungsi untuk update tampilan score
function updateScoreDisplay(player) {
    let gameScreen;
    if (gameState.currentGameType === 'tarik-tambang') {
        gameScreen = '#gameScreenTarikTambang';
    } else if (gameState.currentGameType === 'panjat-pinang') {
        gameScreen = '#gameScreenPanjatPinang';
    } else {
        gameScreen = '#gameScreenBalapKarung';
    }
    
    const scoreElement = document.querySelector(`${gameScreen} .${player}-player .score-value`);
    
    if (scoreElement && gameState.currentGameType === 'panjat-pinang') {
        const score = player === 'left' ? 
            gameState.leftPlayer.climbPosition : 
            gameState.rightPlayer.climbPosition;
        scoreElement.textContent = `${score}/7`;
    } else if (scoreElement && gameState.currentGameType === 'balap-karung') {
        const score = player === 'left' ? 
            gameState.leftPlayer.racePosition : 
            gameState.rightPlayer.racePosition;
        scoreElement.textContent = `${score}/10`;
    }
}

// Fungsi untuk mengupdate posisi pemanjat
function updateClimberPosition(player) {
    const climberClass = player === 'left' ? '.left-climber' : '.right-climber';
    const climberContainer = document.querySelector(`#gameScreenPanjatPinang ${climberClass}`);
    const standImage = climberContainer.querySelector('.stand');
    const climbImage = climberContainer.querySelector('.climb');
    
    // Update posisi vertikal (setiap jawaban benar naik)
    const climbPosition = player === 'left' ? 
        gameState.leftPlayer.climbPosition : 
        gameState.rightPlayer.climbPosition;
    
    // ============================================
    // PENGATURAN PANJAT PINANG (EDIT DI SINI)
    // ============================================
    const TOTAL_STEPS = 7;           // Jumlah jawaban benar untuk menang
    const MAX_HEIGHT_PERCENT = 75;   // Tinggi maksimal (% dari tiang)
    
    // Hitung persentase ketinggian
    const heightPercentage = (climbPosition / TOTAL_STEPS) * MAX_HEIGHT_PERCENT;
    
    // Cek posisi dan ganti gambar sesuai
    if (climbPosition === 0) {
        // Posisi 0: Kembali ke stand
        climbImage.style.display = 'none';
        standImage.style.display = 'block';
        climberContainer.style.bottom = '0%';
    } else if (climbPosition === 1) {
        // Posisi 1: Ganti dari stand ke climb (pertama kali memanjat)
        standImage.style.display = 'none';
        climbImage.style.display = 'block';
        
        // Force reflow
        void climberContainer.offsetHeight;
        
        // Update posisi vertikal dengan animasi
        setTimeout(() => {
            climberContainer.style.bottom = `${heightPercentage}%`;
        }, 50);
    } else {
        // Posisi 2-7: Hanya update posisi vertikal (tetap climb)
        climberContainer.style.bottom = `${heightPercentage}%`;
    }
}

// Fungsi untuk mengupdate posisi racer (Balap Karung)
function updateRacerPosition(player) {
    const racerClass = player === 'left' ? '.left-racer' : '.right-racer';
    const racerContainer = document.querySelector(`#gameScreenBalapKarung ${racerClass}`);
    const standImage = racerContainer.querySelector('.stand');
    const hopImage = racerContainer.querySelector('.hop');
    
    // Get track actual width for pixel calculation
    const raceTrack = document.querySelector('#gameScreenBalapKarung .race-track');
    const trackWidth = raceTrack ? raceTrack.offsetWidth : 900;
    
    // Update posisi horizontal (setiap jawaban benar maju)
    const racePosition = player === 'left' ? 
        gameState.leftPlayer.racePosition : 
        gameState.rightPlayer.racePosition;
    
    // ============================================
    // PENGATURAN BALAP KARUNG (3D PERSPECTIVE)
    // ============================================
    const TOTAL_HOPS = 10;          // Jumlah hop untuk menang
    
    // Different track lengths for 3D perspective
    // Player di jalur atas (merah/right) memiliki jarak lebih pendek karena perspective
    let START_PIXEL, FINISH_PIXEL, HOP_DISTANCE;
    
    if (player === 'left') {
        // Blue player - jalur bawah (lebih panjang)
        START_PIXEL = trackWidth * 0.035;      // 4% dari kiri (dimundurkan)
        // Finish line di 82%
        FINISH_PIXEL = trackWidth * 0.82;     // 82% - finish line
        
        // Bagi merata untuk 10 hop
        HOP_DISTANCE = (FINISH_PIXEL - START_PIXEL) / 10;
    } else {
        // Red player - jalur atas (lebih pendek karena perspective)
        START_PIXEL = trackWidth * 0.065;     // 6.5% dari kiri
        // Finish line dengan perspective (lebih dekat)
        FINISH_PIXEL = trackWidth * 0.78;     // 78% - finish line perspective (lebih pendek)
        
        // Bagi merata untuk 10 hop
        HOP_DISTANCE = (FINISH_PIXEL - START_PIXEL) / 10;
    }
    
    // Calculate current position in pixels - simple linear progression
    const currentPixelPosition = START_PIXEL + (racePosition * HOP_DISTANCE);
    
    // PERBAIKAN: Ganti gambar LANGSUNG dari stand ke hop (tanpa delay)
    standImage.style.display = 'none';
    hopImage.style.display = 'block';
    
    // Tambahkan class hopping untuk trigger animasi parabola
    racerContainer.classList.add('hopping');
    
    // Update posisi horizontal menggunakan PIXELS (bergerak sambil hop)
    racerContainer.style.left = `${currentPixelPosition}px`;
    
    // Vertical position (bottom) sudah diatur di CSS dengan responsive values
    // Tidak perlu diubah di JavaScript agar tetap responsive saat fullscreen
    
    // Setelah animasi hop selesai (500ms), langsung ganti ke stand
    setTimeout(() => {
        // Langsung ganti gambar hop ke stand
        hopImage.style.display = 'none';
        standImage.style.display = 'block';
        
        // Hapus class hopping
        racerContainer.classList.remove('hopping');
        
        // Maintain scale based on player lane
        if (player === 'left') {
            racerContainer.style.transform = 'scale(1)';  // Front lane
        } else {
            racerContainer.style.transform = 'scale(0.9)';  // Back lane
        }
    }, 500);
}

// Fungsi untuk membuat confetti
function createConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 3;

        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = randomInRange(0, 100) + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = randomInRange(2, 4) + 's';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }, 50);
}

// Fungsi untuk menampilkan modal pemenang
function showWinnerModal(winner, message) {
    createConfetti();
    
    const modal = document.getElementById('winnerModal');
    const winnerText = document.getElementById('winnerText');
    const winnerMessage = document.getElementById('winnerMessage');
    winnerText.innerHTML = `<span>🎉</span><span>${winner} Menang!</span><span>🎉</span>`;
    winnerMessage.textContent = message;
    modal.style.display = 'flex';
    
    // Hide tombol Home dan Fullscreen ketika modal muncul
    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'none';
    if (fullscreenBtn) fullscreenBtn.style.display = 'none';
}

// Fungsi untuk menutup modal dan restart game dengan countdown
function closeModal() {
    const modal = document.getElementById('winnerModal');
    modal.style.display = 'none';
    
    // Show kembali tombol Home dan Fullscreen ketika modal ditutup
    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'flex';
    if (fullscreenBtn) fullscreenBtn.style.display = 'flex';
    
    // Tampilkan countdown sebelum restart game
    showCountdown();
}

// Fungsi untuk mengambil soal acak dari folder yang sedang AKTIF
function getRandomQuestionFromActiveFolder(excludeIndex) {
    const activeFolder = getActiveFolder();
    const pool = (activeFolder && activeFolder.questions.length > 0)
        ? activeFolder.questions
        : defaultFolderStore.folders[0].questions;

    if (pool.length === 1) {
        return { item: pool[0], index: 0 };
    }
    let randomIndex = Math.floor(Math.random() * pool.length);
    let retries = 0;
    while (randomIndex === excludeIndex && retries < 20) {
        randomIndex = Math.floor(Math.random() * pool.length);
        retries++;
    }
    return { item: pool[randomIndex], index: randomIndex };
}

// Fungsi untuk generate soal baru dari folder yang diaktifkan
function generateNewQuestion(player) {
    let gameScreen;
    if (gameState.currentGameType === 'tarik-tambang') {
        gameScreen = '#gameScreenTarikTambang';
    } else if (gameState.currentGameType === 'panjat-pinang') {
        gameScreen = '#gameScreenPanjatPinang';
    } else {
        gameScreen = '#gameScreenBalapKarung';
    }

    const section = document.querySelector(`${gameScreen} .${player}-player`);
    const questionBox = section.querySelector('.question-box');
    const playerState = player === 'left' ? gameState.leftPlayer : gameState.rightPlayer;

    const { item, index } = getRandomQuestionFromActiveFolder(playerState.lastQuestionIndex);
    
    playerState.lastQuestionIndex = index;
    playerState.currentQuestionObj = item;
    playerState.isLocked = false;

    // Update teks soal
    questionBox.textContent = item.question;

    // Update pilihan jawaban A, B, C, D
    ['A', 'B', 'C', 'D'].forEach(opt => {
        const btn = section.querySelector(`.option-btn[data-option="${opt}"]`);
        if (btn) {
            btn.classList.remove('opt-btn-correct', 'opt-btn-wrong');
            const textSpan = btn.querySelector('.opt-text');
            if (textSpan) {
                textSpan.textContent = item.options[opt];
            }
        }
    });

    updateAnswer(player, '');
}

// Fungsi untuk reset game
function resetGame() {
    gameState.ropePosition = 50;
    gameState.leftPlayer.answer = '';
    gameState.rightPlayer.answer = '';
    gameState.leftPlayer.score = 0;
    gameState.rightPlayer.score = 0;
    gameState.leftPlayer.climbPosition = 0;
    gameState.rightPlayer.climbPosition = 0;
    gameState.leftPlayer.racePosition = 0;
    gameState.rightPlayer.racePosition = 0;
    gameState.leftPlayer.lastQuestionIndex = -1;
    gameState.rightPlayer.lastQuestionIndex = -1;
    gameState.leftPlayer.isLocked = false;
    gameState.rightPlayer.isLocked = false;
    
    if (gameState.currentGameType === 'tarik-tambang') {
        updateRopePosition();
    } else if (gameState.currentGameType === 'panjat-pinang') {
        // Reset climber positions
        document.querySelectorAll('.climber-container').forEach(container => {
            container.style.bottom = '0';
            const standImage = container.querySelector('.stand');
            const climbImage = container.querySelector('.climb');
            standImage.style.display = 'block';
            climbImage.style.display = 'none';
        });
        
        // Update score display untuk reset ke 0/7
        updateScoreDisplay('left');
        updateScoreDisplay('right');
    } else if (gameState.currentGameType === 'balap-karung') {
        // Reset racer positions - kembali ke posisi awal menggunakan pixels
        const leftRacer = document.querySelector('#gameScreenBalapKarung .left-racer');
        const rightRacer = document.querySelector('#gameScreenBalapKarung .right-racer');
        const raceTrack = document.querySelector('#gameScreenBalapKarung .race-track');
        const trackWidth = raceTrack ? raceTrack.offsetWidth : 900;
        
        if (leftRacer) {
            const startPixelLeft = trackWidth * 0.035;  // 4% - dimundurkan
            leftRacer.style.left = `${startPixelLeft}px`;
            // Bottom position sudah diatur di CSS dengan responsive values (clamp)
            leftRacer.style.transform = 'scale(1)';  // Normal size for front lane
            leftRacer.classList.remove('hopping');
            leftRacer.classList.remove('shaking');
            const standImage = leftRacer.querySelector('.stand');
            const hopImage = leftRacer.querySelector('.hop');
            standImage.style.display = 'block';
            hopImage.style.display = 'none';
        }
        
        if (rightRacer) {
            const startPixelRight = trackWidth * 0.065;  // 6.5% - mundur sedikit saja dari 7%
            rightRacer.style.left = `${startPixelRight}px`;
            // Bottom position sudah diatur di CSS dengan responsive values (clamp)
            rightRacer.style.transform = 'scale(0.9)';  // Smaller for back lane (perspective)
            rightRacer.classList.remove('hopping');
            rightRacer.classList.remove('shaking');
            const standImage = rightRacer.querySelector('.stand');
            const hopImage = rightRacer.querySelector('.hop');
            standImage.style.display = 'block';
            hopImage.style.display = 'none';
        }
        
        // Update score display untuk reset ke 0/10
        updateScoreDisplay('left');
        updateScoreDisplay('right');
    }
    
    generateNewQuestion('left');
    generateNewQuestion('right');
}

// Setup event listeners for all game screens (Pilihan Ganda A, B, C, D)
function setupEventListeners(gameScreenId) {
    const gameScreen = document.getElementById(gameScreenId);
    
    gameScreen.querySelectorAll('.player-section').forEach(section => {
        const player = section.classList.contains('left-player') ? 'left' : 'right';
    
        // Option buttons (A, B, C, D) - Use touchstart for faster response on mobile
        section.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
            }, { passive: false });
            
            const handleClick = () => {
                requestAnimationFrame(() => {
                    const selectedOption = btn.getAttribute('data-option');
                    checkAnswer(player, selectedOption);
                });
            };
            
            btn.addEventListener('click', handleClick);
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleClick();
            }, { passive: false });
        });
    });
}

// Setup event listeners for all game screens
setupEventListeners('gameScreenTarikTambang');
setupEventListeners('gameScreenPanjatPinang');
setupEventListeners('gameScreenBalapKarung');

// Fungsi untuk menampilkan menu game type (Tarik Tambang / Panjat Pinang / Balap Karung)
function showGameTypeMenu() {
    document.getElementById('gameTypeMenu').style.display = 'flex';
    document.getElementById('customQuestionMenu').style.display = 'none';
    document.getElementById('gameScreenTarikTambang').style.display = 'none';
    document.getElementById('gameScreenPanjatPinang').style.display = 'none';
    document.getElementById('gameScreenBalapKarung').style.display = 'none';
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) homeBtn.style.display = 'none';
    updateActiveFolderBadgeUI();
}

// Fungsi untuk menampilkan menu Kostum Soal & Folder
function showCustomQuestionMenu() {
    document.getElementById('gameTypeMenu').style.display = 'none';
    document.getElementById('customQuestionMenu').style.display = 'flex';
    document.getElementById('gameScreenTarikTambang').style.display = 'none';
    document.getElementById('gameScreenPanjatPinang').style.display = 'none';
    document.getElementById('gameScreenBalapKarung').style.display = 'none';
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) homeBtn.style.display = 'none';
    renderFolderManagerUI();
}

// Fungsi untuk memilih game type dan memastikan folder aktif memiliki soal
function selectGameType(gameType) {
    const activeFolder = getActiveFolder();
    if (!activeFolder || activeFolder.questions.length === 0) {
        const folderName = activeFolder ? activeFolder.name : 'yang dipilih';
        alert(`Folder aktif "${folderName}" masih kosong! Silakan tambahkan soal, import file JSON, atau aktifkan folder lain yang sudah berisi soal.`);
        showCustomQuestionMenu();
        return;
    }
    gameState.currentGameType = gameType;
    showCountdown();
}

// Fungsi untuk menampilkan countdown
function showCountdown() {
    const overlay = document.getElementById('countdownOverlay');
    
    // Hide tombol Home dan Fullscreen saat countdown berjalan
    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'none';
    if (fullscreenBtn) fullscreenBtn.style.display = 'none';
    
    // Show overlay
    overlay.classList.add('show');
    
    const countdownSequence = [
        { number: '3', text: 'Bersiap...' },
        { number: '2', text: 'Konsentrasi...' },
        { number: '1', text: 'Fokus...' },
        { number: 'Mulai!', text: 'Gasskan!!!...', isStart: true }
    ];
    
    function updateCountdown(index) {
        if (index >= countdownSequence.length) {
            // Countdown selesai, sembunyikan overlay dan mulai game
            setTimeout(() => {
                overlay.classList.remove('show');
                startGame();
            }, 500);
            return;
        }
        
        const current = countdownSequence[index];
        
        // Query element setiap kali (karena setelah replaceWith, reference lama jadi invalid)
        const numberEl = document.getElementById('countdownNumber');
        const textEl = document.getElementById('countdownText');
        
        // Update content
        numberEl.textContent = current.number;
        textEl.textContent = current.text;
        
        // Tambah/hapus class khusus untuk "Mulai!"
        if (current.isStart) {
            numberEl.classList.add('start');
            textEl.classList.add('start');
        } else {
            numberEl.classList.remove('start');
            textEl.classList.remove('start');
        }
        
        // Trigger reflow untuk restart animation
        numberEl.style.animation = 'none';
        textEl.style.animation = 'none';
        void numberEl.offsetHeight; // Trigger reflow
        numberEl.style.animation = '';
        textEl.style.animation = '';
        
        // Schedule next countdown
        if (index < countdownSequence.length - 1) {
            setTimeout(() => updateCountdown(index + 1), 1000);
        } else {
            // "Mulai!" - tahan lebih lama sebelum mulai game
            setTimeout(() => updateCountdown(index + 1), 800);
        }
    }
    
    // Mulai countdown
    updateCountdown(0);
}

// Fungsi untuk memulai game
function startGame() {
    document.getElementById('gameTypeMenu').style.display = 'none';
    document.getElementById('customQuestionMenu').style.display = 'none';
    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'flex';
    if (fullscreenBtn) fullscreenBtn.style.display = 'flex';
    
    // Show the appropriate game screen
    if (gameState.currentGameType === 'tarik-tambang') {
        document.getElementById('gameScreenTarikTambang').style.display = 'flex';
        document.getElementById('gameScreenPanjatPinang').style.display = 'none';
        document.getElementById('gameScreenBalapKarung').style.display = 'none';
    } else if (gameState.currentGameType === 'panjat-pinang') {
        document.getElementById('gameScreenTarikTambang').style.display = 'none';
        document.getElementById('gameScreenPanjatPinang').style.display = 'flex';
        document.getElementById('gameScreenBalapKarung').style.display = 'none';
    } else if (gameState.currentGameType === 'balap-karung') {
        document.getElementById('gameScreenTarikTambang').style.display = 'none';
        document.getElementById('gameScreenPanjatPinang').style.display = 'none';
        document.getElementById('gameScreenBalapKarung').style.display = 'flex';
    }
    
    resetGame();
}

// Fungsi untuk kembali ke menu game type
function backToGameTypeMenu() {
    showGameTypeMenu();
}

// Initialize - muat data folder & tampilkan menu game type
loadFolderStore();
showGameTypeMenu();

// ============================================
// FIT TO SCREEN HANDLING - IMPROVED
// ============================================

// Prevent zoom on double-tap (mobile) - only register once
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Prevent pinch zoom on mobile
document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// Function to detect device type and resolution
function getDeviceInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    
    // Detect Interactive Flat Panel (high resolution, large screen)
    const isInteractivePanel = (screenWidth >= 3840 || screenHeight >= 2160) ||
                              (width >= 3840 || height >= 2160);
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    (width <= 768 && 'ontouchstart' in window);
    
    // Detect tablet
    const isTablet = (width >= 768 && width <= 1024) && 'ontouchstart' in window;
    
    return {
        width,
        height,
        dpr,
        screenWidth,
        screenHeight,
        isInteractivePanel,
        isMobile,
        isTablet,
        aspectRatio: width / height
    };
}

// Function to optimize layout based on device
function optimizeLayout() {
    const deviceInfo = getDeviceInfo();
    
    // Set custom CSS variables based on device
    if (deviceInfo.isInteractivePanel) {
        // Interactive Flat Panel optimizations
        document.documentElement.style.setProperty('--custom-scale', '1.5');
        document.documentElement.style.setProperty('--custom-font-scale', '1.6');
        console.log('📺 Interactive Flat Panel detected - applying optimizations');
    } else if (deviceInfo.isMobile) {
        // Mobile optimizations
        document.documentElement.style.setProperty('--custom-scale', '0.8');
        document.documentElement.style.setProperty('--custom-font-scale', '0.9');
        console.log('📱 Mobile device detected');
    } else if (deviceInfo.isTablet) {
        // Tablet optimizations
        document.documentElement.style.setProperty('--custom-scale', '0.9');
        document.documentElement.style.setProperty('--custom-font-scale', '1');
        console.log('📱 Tablet device detected');
    }
    
    // Handle aspect ratio
    if (deviceInfo.aspectRatio > 2) {
        // Ultra-wide displays
        document.body.classList.add('ultra-wide');
    } else if (deviceInfo.aspectRatio < 0.6) {
        // Very tall displays (portrait phones)
        document.body.classList.add('tall-display');
    }
    
    console.log('📊 Device Info:', deviceInfo);
}

// Function to force fit to screen and prevent scroll
function forceFitToScreen() {
    // Prevent any scrolling
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // Force viewport units
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    
    // Set CSS variables for dynamic viewport
    document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    document.documentElement.style.setProperty('--vw', `${vw * 0.01}px`);
    
    // Prevent pull-to-refresh
    document.body.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehaviorY = 'none';
    document.body.style.touchAction = 'none';
    
    // Optimize layout based on device
    optimizeLayout();
    
    // Update rope position if in tarik tambang game
    if (gameState.currentGameType === 'tarik-tambang' && 
        document.getElementById('gameScreenTarikTambang').style.display === 'flex') {
        updateRopePosition();
    }
}

// Call on load
window.addEventListener('load', () => {
    forceFitToScreen();
    
    // Set initial viewport meta tag for better mobile support
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    }
});

// Handle window resize/orientation change
let resizeTimeout;
window.addEventListener('resize', () => {
    // Debounce resize for performance
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        forceFitToScreen();
        
        // Recalculate Balap Karung positions on resize
        if (gameState.currentGameType === 'balap-karung' && 
            document.getElementById('gameScreenBalapKarung').style.display === 'flex') {
            recalculateRacerPositions();
        }
        
        // Recalculate Tarik Tambang position on resize
        if (gameState.currentGameType === 'tarik-tambang' && 
            document.getElementById('gameScreenTarikTambang').style.display === 'flex') {
            updateRopePosition();
        }
    }, 100);
});

// Function to recalculate racer positions after resize
function recalculateRacerPositions() {
    const raceTrack = document.querySelector('#gameScreenBalapKarung .race-track');
    if (!raceTrack) return;
    
    const trackWidth = raceTrack.offsetWidth;
    
    // Recalculate left racer position (blue - jalur bawah)
    const leftRacer = document.querySelector('#gameScreenBalapKarung .left-racer');
    if (leftRacer) {
        const START_LEFT = trackWidth * 0.035;    // Sama dengan updateRacerPosition (4%)
        const FINISH_LEFT = trackWidth * 0.82;   // Finish line di 82%
        const HOP_DISTANCE_LEFT = (FINISH_LEFT - START_LEFT) / 10;
        
        const leftPosition = START_LEFT + (gameState.leftPlayer.racePosition * HOP_DISTANCE_LEFT);
        leftRacer.style.left = `${leftPosition}px`;
        leftRacer.style.transform = 'scale(1)';  // Maintain scale for front lane
    }
    
    // Recalculate right racer position (red - jalur atas)
    const rightRacer = document.querySelector('#gameScreenBalapKarung .right-racer');
    if (rightRacer) {
        const START_RIGHT = trackWidth * 0.065;  // Sama dengan updateRacerPosition
        const FINISH_RIGHT = trackWidth * 0.78;  // Finish line perspective (78%)
        const HOP_DISTANCE_RIGHT = (FINISH_RIGHT - START_RIGHT) / 10;
        
        const rightPosition = START_RIGHT + (gameState.rightPlayer.racePosition * HOP_DISTANCE_RIGHT);
        rightRacer.style.left = `${rightPosition}px`;
        rightRacer.style.transform = 'scale(0.9)';  // Maintain scale for back lane
    }
}

// Handle orientation change (mobile devices)
window.addEventListener('orientationchange', () => {
    // Delay to ensure new dimensions are available
    setTimeout(() => {
        forceFitToScreen();
        // Force a re-render
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
    }, 300);
});

// Also handle visual viewport changes (mobile browser address bar)
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        forceFitToScreen();
    });
    
    window.visualViewport.addEventListener('scroll', () => {
        // Reset scroll position
        window.scrollTo(0, 0);
    });
}

// Prevent default touch behaviors
document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });

// ============================================
// FULLSCREEN FUNCTIONALITY - ENHANCED
// ============================================

// Function to toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement && 
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        // Enter fullscreen
        const elem = document.documentElement;
        
        // Try to request fullscreen with navigation UI hidden (for mobile)
        const fullscreenOptions = {
            navigationUI: 'hide'
        };
        
        if (elem.requestFullscreen) {
            elem.requestFullscreen(fullscreenOptions).then(() => {
                console.log('✅ Entered fullscreen mode');
                forceFitToScreen();
            }).catch(err => {
                console.error('❌ Error entering fullscreen:', err);
            });
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
            // For iOS Safari
            if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.webkitEnterFullscreen) {
                elem.webkitEnterFullscreen();
            }
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                console.log('✅ Exited fullscreen mode');
                forceFitToScreen();
            });
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

// Listen for fullscreen changes to update the icon
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    if (document.fullscreenElement || 
        document.mozFullScreenElement || 
        document.webkitFullscreenElement || 
        document.msFullscreenElement) {
        // In fullscreen mode
        document.body.classList.add('fullscreen');
        console.log('🔳 Fullscreen mode: ON');
    } else {
        // Not in fullscreen mode
        document.body.classList.remove('fullscreen');
        console.log('🔲 Fullscreen mode: OFF');
    }
    
    // Re-optimize layout after fullscreen change
    setTimeout(() => {
        forceFitToScreen();
    }, 100);
}

// Auto-enter fullscreen on first user interaction (optional)
let hasInteracted = false;
function tryAutoFullscreen() {
    if (!hasInteracted) {
        hasInteracted = true;
        const deviceInfo = getDeviceInfo();
        
        // Auto fullscreen for Interactive Panels and tablets
        if (deviceInfo.isInteractivePanel || deviceInfo.isTablet) {
            console.log('🎯 Auto-requesting fullscreen for optimal experience');
            // Small delay to ensure user gesture is registered
            setTimeout(() => {
                toggleFullscreen();
            }, 100);
        }
    }
}

// Add listeners for first interaction
document.addEventListener('click', tryAutoFullscreen, { once: true });
document.addEventListener('touchstart', tryAutoFullscreen, { once: true });
