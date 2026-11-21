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
// SISTEM FOLDER & BANYAK FILE SOAL PER FOLDER
// ============================================

const STORAGE_KEY_FOLDER_DATA = 'afifedu_quiz_folders_v3';
const LEGACY_STORAGE_KEY_V2 = 'afifedu_quiz_folders_v2';
const STORAGE_KEY_TARGET_CORRECT = 'afifedu_quiz_target_correct_v1';

const defaultFolderStore = {
    activeFolderId: 'folder_tik',
    activeFileId: 'file_tik_7',
    folders: [
        {
            id: 'folder_tik',
            name: 'Informatika (TIK)',
            files: [
                {
                    id: 'file_tik_7',
                    name: 'Kelas 7',
                    questions: [
                        {
                            question: 'Apa kepanjangan dari CPU pada komputer?',
                            options: { A: 'Central Process Unit', B: 'Central Processing Unit', C: 'Computer Personal Unit', D: 'Control Processing Unit' },
                            answer: 'B'
                        },
                        {
                            question: 'Perangkat keras yang berfungsi menampilkan output visual ke layar adalah...',
                            options: { A: 'Keyboard', B: 'Scanner', C: 'Monitor', D: 'Microphone' },
                            answer: 'C'
                        },
                        {
                            question: 'Tombol pintas (shortcut) pada keyboard untuk menyalin teks adalah...',
                            options: { A: 'Ctrl + C', B: 'Ctrl + V', C: 'Ctrl + X', D: 'Ctrl + Z' },
                            answer: 'A'
                        }
                    ]
                },
                {
                    id: 'file_tik_8',
                    name: 'Kelas 8',
                    questions: [
                        {
                            question: 'Perangkat lunak yang digunakan untuk mengolah angka adalah...',
                            options: { A: 'Microsoft Word', B: 'Microsoft PowerPoint', C: 'Microsoft Excel', D: 'CorelDraw' },
                            answer: 'C'
                        },
                        {
                            question: 'Jaringan komputer yang mencakup area lokal seperti satu gedung sekolah disebut...',
                            options: { A: 'WAN', B: 'MAN', C: 'LAN', D: 'PAN' },
                            answer: 'C'
                        }
                    ]
                }
            ]
        },
        {
            id: 'folder_ipa',
            name: 'IPA (Sains)',
            files: [
                {
                    id: 'file_ipa_7',
                    name: 'Kelas 7 - Dasar Sains',
                    questions: [
                        {
                            question: 'Perubahan wujud benda dari cair menjadi gas disebut...',
                            options: { A: 'Membeku', B: 'Menguap', C: 'Menyublim', D: 'Mengembun' },
                            answer: 'B'
                        },
                        {
                            question: 'Planet terdekat dengan Matahari dalam tata surya adalah...',
                            options: { A: 'Venus', B: 'Mars', C: 'Merkurius', D: 'Bumi' },
                            answer: 'C'
                        }
                    ]
                },
                {
                    id: 'file_ipa_8',
                    name: 'Kelas 8 - Biologi Manusia',
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
                        }
                    ]
                }
            ]
        },
        {
            id: 'folder_ips',
            name: 'IPS & PPKn',
            files: [
                {
                    id: 'file_ips_umum',
                    name: 'Paket Umum',
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
        }
    ]
};

let folderStore = {
    activeFolderId: '',
    activeFileId: '',
    folders: []
};

// Folder dan File yang sedang dibuka/dilihat di halaman kelola soal
let viewingFolderId = '';
let viewingFileId = '';

// Ketentuan jumlah jawaban benar untuk menang (dapat diatur pengguna)
let targetCorrectRequired = 5;

function loadTargetCorrectSetting() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_TARGET_CORRECT);
        if (saved !== null) {
            const parsed = parseInt(saved, 10);
            if (!isNaN(parsed) && parsed >= 1) {
                targetCorrectRequired = parsed;
            }
        }
    } catch (e) {
        console.error('Gagal memuat pengaturan target soal benar:', e);
    }
    const inputEl = document.getElementById('targetCorrectInput');
    if (inputEl) {
        inputEl.value = targetCorrectRequired;
    }
    updateTargetWinLabels();
}

function onTargetCorrectChange() {
    const inputEl = document.getElementById('targetCorrectInput');
    if (!inputEl) return;
    let val = parseInt(inputEl.value, 10);
    if (isNaN(val) || val < 1) {
        val = 1;
    }
    targetCorrectRequired = val;
    try {
        localStorage.setItem(STORAGE_KEY_TARGET_CORRECT, String(targetCorrectRequired));
    } catch (e) {
        console.error('Gagal menyimpan pengaturan target soal benar:', e);
    }
    updateTargetWinLabels();
}

function getEffectiveTargetCorrect() {
    const inputEl = document.getElementById('targetCorrectInput');
    if (inputEl) {
        const parsed = parseInt(inputEl.value, 10);
        if (!isNaN(parsed) && parsed >= 1) {
            targetCorrectRequired = parsed;
            inputEl.value = parsed;
        } else {
            targetCorrectRequired = 1;
            inputEl.value = 1;
        }
    }
    return Math.max(1, targetCorrectRequired);
}

function updateTargetWinLabels() {
    const target = getEffectiveTargetCorrect();
    document.querySelectorAll('.target-win-label').forEach(el => {
        el.textContent = target;
    });
}

function migrateLegacyV2ToV3(parsedV2) {
    const migratedFolders = parsedV2.folders.map((f, idx) => {
        if (Array.isArray(f.files)) {
            return f;
        }
        return {
            id: f.id || ('folder_' + idx + '_' + Date.now()),
            name: f.name || 'Mata Pelajaran',
            files: [
                {
                    id: 'file_' + (f.id || idx) + '_default',
                    name: 'Paket Utama',
                    questions: Array.isArray(f.questions) ? f.questions : []
                }
            ]
        };
    });

    const activeF = migratedFolders.find(f => f.id === parsedV2.activeFolderId) || migratedFolders[0];
    return {
        activeFolderId: activeF ? activeF.id : '',
        activeFileId: (activeF && activeF.files[0]) ? activeF.files[0].id : '',
        folders: migratedFolders
    };
}

function loadFolderStore() {
    try {
        const savedV3 = localStorage.getItem(STORAGE_KEY_FOLDER_DATA);
        if (savedV3) {
            const parsed = JSON.parse(savedV3);
            if (parsed && Array.isArray(parsed.folders) && parsed.folders.length > 0) {
                folderStore = parsed;
            } else {
                folderStore = JSON.parse(JSON.stringify(defaultFolderStore));
                saveFolderStore();
            }
        } else {
            const savedV2 = localStorage.getItem(LEGACY_STORAGE_KEY_V2);
            if (savedV2) {
                const parsedV2 = JSON.parse(savedV2);
                if (parsedV2 && Array.isArray(parsedV2.folders) && parsedV2.folders.length > 0) {
                    folderStore = migrateLegacyV2ToV3(parsedV2);
                    saveFolderStore();
                } else {
                    folderStore = JSON.parse(JSON.stringify(defaultFolderStore));
                    saveFolderStore();
                }
            } else {
                folderStore = JSON.parse(JSON.stringify(defaultFolderStore));
                saveFolderStore();
            }
        }
    } catch (e) {
        console.error('Gagal memuat data folder dari localStorage:', e);
        folderStore = JSON.parse(JSON.stringify(defaultFolderStore));
    }

    // Pastikan setiap folder memiliki array files minimal 1 file
    folderStore.folders.forEach((f, idx) => {
        if (!Array.isArray(f.files) || f.files.length === 0) {
            f.files = [{
                id: 'file_' + f.id + '_' + idx + '_' + Date.now(),
                name: 'Paket Soal 1',
                questions: Array.isArray(f.questions) ? f.questions : []
            }];
        }
    });

    // Pastikan activeFolderId & activeFileId valid
    let activeFolder = folderStore.folders.find(f => f.id === folderStore.activeFolderId);
    if (!activeFolder) {
        activeFolder = folderStore.folders[0];
        folderStore.activeFolderId = activeFolder ? activeFolder.id : '';
    }
    if (activeFolder && !activeFolder.files.some(fl => fl.id === folderStore.activeFileId)) {
        folderStore.activeFileId = activeFolder.files[0]?.id || '';
    }

    // Pastikan viewingFolderId & viewingFileId valid
    let viewFolder = folderStore.folders.find(f => f.id === viewingFolderId);
    if (!viewFolder) {
        viewingFolderId = folderStore.activeFolderId || (folderStore.folders[0]?.id || '');
        viewFolder = folderStore.folders.find(f => f.id === viewingFolderId);
    }
    if (viewFolder && !viewFolder.files.some(fl => fl.id === viewingFileId)) {
        viewingFileId = (viewFolder.id === folderStore.activeFolderId && folderStore.activeFileId)
            ? folderStore.activeFileId
            : (viewFolder.files[0]?.id || '');
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

function getActiveFile() {
    const folder = getActiveFolder();
    if (!folder) return null;
    return folder.files.find(fl => fl.id === folderStore.activeFileId) || folder.files[0] || null;
}

function getViewingFolder() {
    return folderStore.folders.find(f => f.id === viewingFolderId) || null;
}

function getViewingFile() {
    const folder = getViewingFolder();
    if (!folder) return null;
    return folder.files.find(fl => fl.id === viewingFileId) || folder.files[0] || null;
}

function getFolderTotalQuestions(folder) {
    if (!folder || !Array.isArray(folder.files)) return 0;
    return folder.files.reduce((sum, fl) => sum + (Array.isArray(fl.questions) ? fl.questions.length : 0), 0);
}

function updateActiveFolderBadgeUI() {
    const activeFolder = getActiveFolder();
    const activeFile = getActiveFile();
    const badgeName = document.getElementById('activeFolderBadge');
    const badgeCount = document.getElementById('questionCountBadge');
    const headerActiveName = document.getElementById('headerActiveFolderName');

    const folderName = activeFolder ? activeFolder.name : 'Belum dipilih';
    const fileName = activeFile ? activeFile.name : '-';
    const qCount = activeFile ? activeFile.questions.length : 0;
    const fullTopicLabel = activeFolder && activeFile ? `${folderName} - ${fileName}` : folderName;

    if (badgeName) badgeName.textContent = fullTopicLabel;
    if (badgeCount) badgeCount.textContent = `${qCount} Soal`;
    if (headerActiveName) headerActiveName.textContent = `${fullTopicLabel} (${qCount} soal)`;

    // Update tampilan banyaknya soal di setiap tombol mode (Menu Utama)
    document.querySelectorAll('.mode-question-count').forEach(el => {
        el.textContent = `${qCount} Soal Tersedia (${fileName})`;
    });

    // Update tampilan banyaknya soal & topik aktif di dalam setiap layar mode permainan
    document.querySelectorAll('.mode-total-questions-label').forEach(el => {
        el.textContent = `${qCount} Soal`;
    });
    document.querySelectorAll('.active-topic-label').forEach(el => {
        el.textContent = fullTopicLabel;
    });

    updateTargetWinLabels();
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Render semua bagian UI Kelola Folder & File Soal
function renderFolderManagerUI() {
    renderFolderList();
    renderTargetFolderDropdown();
    renderTargetFileDropdown();
    renderViewingFileQuestions();
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
        const isFolderActive = folder.id === folderStore.activeFolderId;
        const isFolderViewing = folder.id === viewingFolderId;
        const totalInFolder = getFolderTotalQuestions(folder);

        const filesHtml = folder.files.map(file => {
            const isFileActive = isFolderActive && file.id === folderStore.activeFileId;
            const isFileViewing = isFolderViewing && file.id === viewingFileId;
            return `
                <div class="subfile-item ${isFileViewing ? 'viewing' : ''} ${isFileActive ? 'active-play' : ''}" onclick="event.stopPropagation(); selectViewingFile('${folder.id}', '${file.id}')">
                    <div class="subfile-left">
                        <span class="subfile-icon">📄</span>
                        <span class="subfile-title">${escapeHtml(file.name)}</span>
                        <span class="subfile-count">${file.questions.length} soal</span>
                    </div>
                    <div class="subfile-actions" onclick="event.stopPropagation()">
                        ${isFileActive
                            ? `<span class="active-tag-mini">✅ Aktif</span>`
                            : `<button type="button" class="folder-use-btn mini" onclick="setActiveFile('${folder.id}', '${file.id}')">Pakai</button>`
                        }
                        <button type="button" class="folder-icon-btn mini" onclick="renameQuestionFile('${folder.id}', '${file.id}')" title="Ubah Nama File">✏️</button>
                        <button type="button" class="folder-icon-btn danger mini" onclick="deleteQuestionFile('${folder.id}', '${file.id}')" title="Hapus File">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="folder-item ${isFolderViewing ? 'viewing' : ''} ${isFolderActive ? 'active-play' : ''}" onclick="selectViewingFolder('${folder.id}')">
                <div class="folder-item-top">
                    <div class="folder-name-wrap">
                        <span class="folder-icon">${isFolderViewing ? '📂' : '📁'}</span>
                        <span class="folder-title">${escapeHtml(folder.name)}</span>
                    </div>
                    <div class="folder-top-right" onclick="event.stopPropagation()">
                        <span class="folder-count-pill">${folder.files.length} file • ${totalInFolder} soal</span>
                        <button type="button" class="folder-icon-btn" onclick="renameFolder('${folder.id}')" title="Ubah Nama Folder">✏️</button>
                        <button type="button" class="folder-icon-btn danger" onclick="deleteFolder('${folder.id}')" title="Hapus Folder">🗑️</button>
                    </div>
                </div>
                <div class="subfiles-list">
                    ${filesHtml}
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
            ${escapeHtml(folder.name)} (${folder.files.length} file)${isActive ? ' ★' : ''}
        </option>`;
    }).join('');
}

function renderTargetFileDropdown() {
    const select = document.getElementById('selectTargetFile');
    if (!select) return;

    const folder = getViewingFolder();
    if (!folder || !folder.files) {
        select.innerHTML = '<option value="">- Tidak ada file -</option>';
        return;
    }

    select.innerHTML = folder.files.map(file => {
        const isActive = (folder.id === folderStore.activeFolderId && file.id === folderStore.activeFileId);
        return `<option value="${file.id}" ${file.id === viewingFileId ? 'selected' : ''}>
            ${escapeHtml(file.name)} (${file.questions.length} soal)${isActive ? ' ★ Aktif' : ''}
        </option>`;
    }).join('');
}

function onTargetFolderSelectChange() {
    const select = document.getElementById('selectTargetFolder');
    if (!select) return;
    viewingFolderId = select.value;
    const folder = getViewingFolder();
    if (folder && folder.files.length > 0) {
        viewingFileId = folder.files[0].id;
    } else {
        viewingFileId = '';
    }
    renderFolderManagerUI();
}

function onTargetFileSelectChange() {
    const select = document.getElementById('selectTargetFile');
    if (!select) return;
    viewingFileId = select.value;
    renderFolderList();
    renderViewingFileQuestions();
}

function selectViewingFolder(folderId) {
    viewingFolderId = folderId;
    const folder = getViewingFolder();
    if (folder && !folder.files.some(fl => fl.id === viewingFileId)) {
        viewingFileId = folder.files[0]?.id || '';
    }
    renderFolderManagerUI();
}

function selectViewingFile(folderId, fileId) {
    viewingFolderId = folderId;
    viewingFileId = fileId;
    renderFolderManagerUI();
}

function setActiveFile(folderId, fileId) {
    const folder = folderStore.folders.find(f => f.id === folderId);
    if (!folder) return;
    const file = folder.files.find(fl => fl.id === fileId);
    if (!file) return;

    folderStore.activeFolderId = folderId;
    folderStore.activeFileId = fileId;
    viewingFolderId = folderId;
    viewingFileId = fileId;
    saveFolderStore();
    renderFolderManagerUI();
}

function activateViewingFile() {
    if (!viewingFolderId || !viewingFileId) return;
    setActiveFile(viewingFolderId, viewingFileId);
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

    const newFolderId = 'folder_' + Date.now();
    const defaultFileId = 'file_' + Date.now() + '_1';
    folderStore.folders.push({
        id: newFolderId,
        name: name,
        files: [
            {
                id: defaultFileId,
                name: 'Paket Soal 1',
                questions: []
            }
        ]
    });

    viewingFolderId = newFolderId;
    viewingFileId = defaultFileId;
    if (!folderStore.activeFolderId) {
        folderStore.activeFolderId = newFolderId;
        folderStore.activeFileId = defaultFileId;
    }

    input.value = '';
    saveFolderStore();
    renderFolderManagerUI();
}

function createNewQuestionFile() {
    const folder = getViewingFolder();
    if (!folder) {
        alert('Pilih atau buat folder mata pelajaran terlebih dahulu!');
        return;
    }

    const input = document.getElementById('inputNewFileName');
    if (!input) return;
    const fileName = input.value.trim();

    if (!fileName) {
        alert('Masukkan nama file soal (misal: Kelas 7, Kelas 8, Bab 1) terlebih dahulu!');
        return;
    }

    const exists = folder.files.some(fl => fl.name.toLowerCase() === fileName.toLowerCase());
    if (exists) {
        alert(`File soal "${fileName}" sudah ada di dalam folder "${folder.name}"!`);
        return;
    }

    const newFileId = 'file_' + Date.now();
    folder.files.push({
        id: newFileId,
        name: fileName,
        questions: []
    });

    viewingFileId = newFileId;
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

function renameQuestionFile(folderId, fileId) {
    const folder = folderStore.folders.find(f => f.id === folderId);
    if (!folder) return;
    const file = folder.files.find(fl => fl.id === fileId);
    if (!file) return;

    const newName = prompt(`Ubah nama file soal dalam folder "${folder.name}":`, file.name);
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) {
        alert('Nama file soal tidak boleh kosong!');
        return;
    }

    file.name = trimmed;
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

    const totalQ = getFolderTotalQuestions(folder);
    if (!confirm(`Hapus folder "${folder.name}" beserta seluruh ${folder.files.length} file (${totalQ} soal) di dalamnya?`)) {
        return;
    }

    folderStore.folders = folderStore.folders.filter(f => f.id !== folderId);

    if (folderStore.activeFolderId === folderId) {
        const nextFolder = folderStore.folders[0];
        folderStore.activeFolderId = nextFolder.id;
        folderStore.activeFileId = nextFolder.files[0]?.id || '';
    }
    if (viewingFolderId === folderId) {
        viewingFolderId = folderStore.activeFolderId;
        viewingFileId = folderStore.activeFileId;
    }

    saveFolderStore();
    renderFolderManagerUI();
}

function deleteQuestionFile(folderId, fileId) {
    const folder = folderStore.folders.find(f => f.id === folderId);
    if (!folder) return;

    if (folder.files.length <= 1) {
        alert(`Minimal harus tersisa 1 file soal di dalam folder "${folder.name}"!`);
        return;
    }

    const file = folder.files.find(fl => fl.id === fileId);
    if (!file) return;

    if (!confirm(`Hapus file "${file.name}" (${file.questions.length} soal) dari folder "${folder.name}"?`)) {
        return;
    }

    folder.files = folder.files.filter(fl => fl.id !== fileId);

    if (folderStore.activeFolderId === folderId && folderStore.activeFileId === fileId) {
        folderStore.activeFileId = folder.files[0].id;
    }
    if (viewingFolderId === folderId && viewingFileId === fileId) {
        viewingFileId = folder.files[0].id;
    }

    saveFolderStore();
    renderFolderManagerUI();
}

function renderViewingFileQuestions() {
    const listContainer = document.getElementById('customQuestionList');
    const folderTitleEl = document.getElementById('viewingFolderTitle');
    const fileTitleEl = document.getElementById('viewingFileTitle');
    const totalEl = document.getElementById('totalCustomQuestions');
    const activateBtn = document.getElementById('activateViewingFolderBtn');
    if (!listContainer) return;

    const folder = getViewingFolder();
    const file = getViewingFile();

    if (!folder || !file) {
        if (folderTitleEl) folderTitleEl.textContent = '-';
        if (fileTitleEl) fileTitleEl.textContent = '-';
        if (totalEl) totalEl.textContent = '0';
        listContainer.innerHTML = '<div class="empty-soal-msg">Pilih atau buat folder dan file soal terlebih dahulu.</div>';
        return;
    }

    if (folderTitleEl) folderTitleEl.textContent = folder.name;
    if (fileTitleEl) fileTitleEl.textContent = file.name;
    if (totalEl) totalEl.textContent = file.questions.length;

    if (activateBtn) {
        const isCurrentActive = (folder.id === folderStore.activeFolderId && file.id === folderStore.activeFileId);
        activateBtn.textContent = isCurrentActive ? '✅ Sedang Aktif' : '⚡ Aktifkan File Ini';
        activateBtn.disabled = isCurrentActive;
    }

    if (file.questions.length === 0) {
        listContainer.innerHTML = `<div class="empty-soal-msg">File <b>${escapeHtml(folder.name)} / ${escapeHtml(file.name)}</b> masih kosong.<br>Tambahkan soal manual di samping atau klik <b>Import JSON</b>.</div>`;
        return;
    }

    listContainer.innerHTML = file.questions.map((item, idx) => `
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
                <button type="button" class="move-soal-btn" onclick="moveQuestionToAnotherFile(${idx})" title="Pindahkan ke file lain">↪️</button>
                <button type="button" class="delete-soal-btn" onclick="deleteCustomQuestion(${idx})" title="Hapus Soal">✕</button>
            </div>
        </div>
    `).join('');
}

function addCustomQuestion() {
    const targetFolderSelect = document.getElementById('selectTargetFolder');
    const targetFileSelect = document.getElementById('selectTargetFile');
    const targetFolderId = targetFolderSelect ? targetFolderSelect.value : viewingFolderId;
    const targetFolder = folderStore.folders.find(f => f.id === targetFolderId);

    if (!targetFolder) {
        alert('Pilih folder tujuan terlebih dahulu!');
        return;
    }

    const targetFileId = targetFileSelect ? targetFileSelect.value : viewingFileId;
    const targetFile = targetFolder.files.find(fl => fl.id === targetFileId);

    if (!targetFile) {
        alert('Pilih file soal tujuan terlebih dahulu!');
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

    targetFile.questions.push({
        question,
        options: { A, B, C, D },
        answer
    });

    viewingFolderId = targetFolder.id;
    viewingFileId = targetFile.id;
    saveFolderStore();
    renderFolderManagerUI();

    qInput.value = '';
    optA.value = '';
    optB.value = '';
    optC.value = '';
    optD.value = '';
    correctSelect.value = 'A';
}

function moveQuestionToAnotherFile(questionIndex) {
    const sourceFolder = getViewingFolder();
    const sourceFile = getViewingFile();
    if (!sourceFolder || !sourceFile || !sourceFile.questions[questionIndex]) return;

    const allTargets = [];
    folderStore.folders.forEach(folder => {
        folder.files.forEach(file => {
            if (!(folder.id === sourceFolder.id && file.id === sourceFile.id)) {
                allTargets.push({ folder, file });
            }
        });
    });

    if (allTargets.length === 0) {
        alert('Buat file soal atau folder lain terlebih dahulu untuk memindahkan soal!');
        return;
    }

    const choicesText = allTargets.map((t, i) => `${i + 1}. ${t.folder.name} -> ${t.file.name}`).join('
');
    const input = prompt(`Pindahkan soal ke tujuan nomor berapa?
${choicesText}`);
    if (input === null) return;

    const chosenIdx = parseInt(input.trim(), 10) - 1;
    if (isNaN(chosenIdx) || chosenIdx < 0 || chosenIdx >= allTargets.length) {
        alert('Nomor tujuan tidak valid!');
        return;
    }

    const [movedQuestion] = sourceFile.questions.splice(questionIndex, 1);
    allTargets[chosenIdx].file.questions.push(movedQuestion);

    saveFolderStore();
    renderFolderManagerUI();
}

function deleteCustomQuestion(index) {
    const file = getViewingFile();
    if (!file) return;
    file.questions.splice(index, 1);
    saveFolderStore();
    renderFolderManagerUI();
}

function clearViewingFileQuestions() {
    const folder = getViewingFolder();
    const file = getViewingFile();
    if (!folder || !file) return;
    if (file.questions.length === 0) return;

    if (confirm(`Kosongkan semua soal di dalam file "${folder.name} / ${file.name}"?`)) {
        file.questions = [];
        saveFolderStore();
        renderFolderManagerUI();
    }
}

// ============================================
// IMPORT & EXPORT FILE JSON PER FILE SOAL
// ============================================

function triggerJsonUpload() {
    const targetFolderSelect = document.getElementById('selectTargetFolder');
    const targetFileSelect = document.getElementById('selectTargetFile');
    const targetFolderId = targetFolderSelect ? targetFolderSelect.value : viewingFolderId;
    const targetFileId = targetFileSelect ? targetFileSelect.value : viewingFileId;
    if (!targetFolderId || !targetFileId) {
        alert('Pilih folder dan file soal tujuan terlebih dahulu!');
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

    const targetFolderSelect = document.getElementById('selectTargetFolder');
    const targetFileSelect = document.getElementById('selectTargetFile');
    const targetFolderId = targetFolderSelect ? targetFolderSelect.value : viewingFolderId;
    const targetFolder = folderStore.folders.find(f => f.id === targetFolderId);

    if (!targetFolder) {
        alert('Folder tujuan tidak ditemukan!');
        return;
    }

    const targetFileId = targetFileSelect ? targetFileSelect.value : viewingFileId;
    const targetQuestionFile = targetFolder.files.find(fl => fl.id === targetFileId);

    if (!targetQuestionFile) {
        alert('File soal tujuan tidak ditemukan!');
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

            targetQuestionFile.questions.push(...validQuestions);
            viewingFolderId = targetFolder.id;
            viewingFileId = targetQuestionFile.id;
            saveFolderStore();
            renderFolderManagerUI();

            alert(`Berhasil mengimpor ${validQuestions.length} soal ke "${targetFolder.name} / ${targetQuestionFile.name}"!`);
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

function exportSelectedFileJson() {
    const folder = getViewingFolder();
    const file = getViewingFile();
    if (!folder || !file) return;

    if (file.questions.length === 0) {
        alert(`File "${folder.name} / ${file.name}" masih kosong, belum ada soal untuk di-export.`);
        return;
    }

    const safeFolderName = folder.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'mapel';
    const safeFileName = file.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'paket';
    const blob = new Blob([JSON.stringify(file.questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soal-${safeFolderName}-${safeFileName}.json`;
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
        correctCount: 0,      // jumlah soal dijawab benar
        climbPosition: 0,     // untuk panjat pinang
        racePosition: 0,      // untuk balap karung
        questionQueue: [],    // antrean seluruh soal dari paket soal aktif
        questionCursor: 0,    // indeks soal yang sedang ditampilkan dari antrean
        totalQuestionsInPool: 0,
        lastQuestionIndex: -1,
        currentQuestionObj: null,
        isLocked: false
    },
    rightPlayer: {
        answer: '',
        score: 0,
        correctCount: 0,      // jumlah soal dijawab benar
        climbPosition: 0,     // untuk panjat pinang
        racePosition: 0,      // untuk balap karung
        questionQueue: [],    // antrean seluruh soal dari paket soal aktif
        questionCursor: 0,    // indeks soal yang sedang ditampilkan dari antrean
        totalQuestionsInPool: 0,
        lastQuestionIndex: -1,
        currentQuestionObj: null,
        isLocked: false
    },
    targetCorrectToWin: 5,    // ketentuan jumlah soal yang harus dijawab benar
    ropePosition: 50,         // posisi tali (50 = tengah, 0 = kiri menang, 100 = kanan menang)
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

// Fungsi untuk menentukan pemenang akhir jika semua isi soal sudah dikeluarkan
function resolveEndOfAllQuestions() {
    const leftCorrect = gameState.leftPlayer.correctCount;
    const rightCorrect = gameState.rightPlayer.correctCount;
    const targetWin = gameState.targetCorrectToWin;

    if (leftCorrect > rightCorrect) {
        showWinnerModal(
            'Pemain Kiri',
            `Semua soal telah selesai dikeluarkan! Pemain Kiri unggul dengan ${leftCorrect} jawaban benar (Target: ${targetWin}).`
        );
    } else if (rightCorrect > leftCorrect) {
        showWinnerModal(
            'Pemain Kanan',
            `Semua soal telah selesai dikeluarkan! Pemain Kanan unggul dengan ${rightCorrect} jawaban benar (Target: ${targetWin}).`
        );
    } else {
        showWinnerModal(
            'Hasil Seri',
            `Semua soal telah selesai dikeluarkan! Kedua pemain sama-sama menjawab ${leftCorrect} soal dengan benar (Target: ${targetWin}).`
        );
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
    const targetWin = gameState.targetCorrectToWin;

    playerState.isLocked = true;

    if (selectedOption === correctOption) {
        // Jawaban benar
        playerState.correctCount++;
        playerState.score = playerState.correctCount;
        updateAnswer(player, `✅ ${selectedOption}. ${selectedText}`, 'correct');
        if (selectedBtn) selectedBtn.classList.add('opt-btn-correct');
        updateScoreDisplay(player);

        const hasReachedTarget = playerState.correctCount >= targetWin;
        const winnerName = player === 'left' ? 'Pemain Kiri' : 'Pemain Kanan';
        
        if (gameState.currentGameType === 'tarik-tambang') {
            // Logic untuk Tarik Tambang berdasarkan proporsi ketentuan jumlah jawaban benar
            const stepPerCorrect = 50 / targetWin;
            if (player === 'left') {
                gameState.ropePosition = Math.max(0, 50 - (playerState.correctCount - gameState.rightPlayer.correctCount) * stepPerCorrect);
            } else {
                gameState.ropePosition = Math.min(100, 50 + (playerState.correctCount - gameState.leftPlayer.correctCount) * stepPerCorrect);
            }
            if (hasReachedTarget) {
                gameState.ropePosition = player === 'left' ? 0 : 100;
            }
            updateRopePosition();
            
            if (hasReachedTarget) {
                setTimeout(() => {
                    showWinnerModal(winnerName, `Selamat! Anda berhasil menjawab ${playerState.correctCount}/${targetWin} soal dengan benar dan menarik tali ke garis akhir!`);
                }, 400);
                return true;
            }

            setTimeout(() => {
                generateNewQuestion(player);
            }, 350);
        } else if (gameState.currentGameType === 'panjat-pinang') {
            // Logic untuk Panjat Pinang - Jawaban BENAR
            playerState.climbPosition = playerState.correctCount;
            updateClimberPosition(player);
            
            if (hasReachedTarget) {
                setTimeout(() => {
                    showWinnerModal(winnerName, `Selamat! Anda berhasil menjawab ${playerState.correctCount}/${targetWin} soal dengan benar dan mencapai puncak tiang pinang!`);
                }, 600);
                return true;
            }

            setTimeout(() => {
                generateNewQuestion(player);
            }, 500);
        } else if (gameState.currentGameType === 'balap-karung') {
            // Logic untuk Balap Karung - Jawaban BENAR
            playerState.racePosition = playerState.correctCount;
            updateRacerPosition(player);
            
            if (hasReachedTarget) {
                setTimeout(() => {
                    showWinnerModal(winnerName, `Selamat! Anda berhasil menjawab ${playerState.correctCount}/${targetWin} soal dengan benar dan mencapai garis finish!`);
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
        
        // Logic untuk Panjat Pinang - Jawaban SALAH (posisi tetap atau turun visual tanpa mengurangi hitungan benar jika perlu, tetap jaga visual sinkron)
        if (gameState.currentGameType === 'panjat-pinang') {
            if (playerState.climbPosition > 0) {
                playerState.climbPosition = Math.max(0, playerState.climbPosition - 1);
                updateClimberPosition(player);
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

        // Ganti ke soal berikutnya dari antrean seluruh isi soal setelah jeda singkat
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
    const targetWin = gameState.targetCorrectToWin;
    const correctCount = player === 'left' ? gameState.leftPlayer.correctCount : gameState.rightPlayer.correctCount;
    
    if (scoreElement) {
        scoreElement.textContent = `${correctCount}/${targetWin}`;
    }
}

// Fungsi untuk mengupdate posisi pemanjat
function updateClimberPosition(player) {
    const climberClass = player === 'left' ? '.left-climber' : '.right-climber';
    const climberContainer = document.querySelector(`#gameScreenPanjatPinang ${climberClass}`);
    const standImage = climberContainer.querySelector('.stand');
    const climbImage = climberContainer.querySelector('.climb');
    
    // Update posisi vertikal (setiap jawaban benar naik proporsional terhadap targetCorrectToWin)
    const climbPosition = player === 'left' ? 
        gameState.leftPlayer.climbPosition : 
        gameState.rightPlayer.climbPosition;
    
    const TOTAL_STEPS = Math.max(1, gameState.targetCorrectToWin);
    const MAX_HEIGHT_PERCENT = 75;   // Tinggi maksimal (% dari tiang)
    
    // Hitung persentase ketinggian
    const heightPercentage = Math.min(MAX_HEIGHT_PERCENT, (climbPosition / TOTAL_STEPS) * MAX_HEIGHT_PERCENT);
    
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
        // Posisi berikutnya: Hanya update posisi vertikal (tetap climb)
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
    
    // Update posisi horizontal (setiap jawaban benar maju proporsional terhadap targetCorrectToWin)
    const racePosition = player === 'left' ? 
        gameState.leftPlayer.racePosition : 
        gameState.rightPlayer.racePosition;
    
    const TOTAL_HOPS = Math.max(1, gameState.targetCorrectToWin);
    
    let START_PIXEL, FINISH_PIXEL, HOP_DISTANCE;
    
    if (player === 'left') {
        START_PIXEL = trackWidth * 0.035;
        FINISH_PIXEL = trackWidth * 0.82;
        HOP_DISTANCE = (FINISH_PIXEL - START_PIXEL) / TOTAL_HOPS;
    } else {
        START_PIXEL = trackWidth * 0.065;
        FINISH_PIXEL = trackWidth * 0.78;
        HOP_DISTANCE = (FINISH_PIXEL - START_PIXEL) / TOTAL_HOPS;
    }
    
    const currentPixelPosition = Math.min(FINISH_PIXEL, START_PIXEL + (racePosition * HOP_DISTANCE));
    
    // Ganti gambar LANGSUNG dari stand ke hop (tanpa delay)
    standImage.style.display = 'none';
    hopImage.style.display = 'block';
    
    // Tambahkan class hopping untuk trigger animasi parabola
    racerContainer.classList.add('hopping');
    
    // Update posisi horizontal menggunakan PIXELS (bergerak sambil hop)
    racerContainer.style.left = `${currentPixelPosition}px`;
    
    // Setelah animasi hop selesai (500ms), langsung ganti ke stand
    setTimeout(() => {
        hopImage.style.display = 'none';
        standImage.style.display = 'block';
        racerContainer.classList.remove('hopping');
        
        if (player === 'left') {
            racerContainer.style.transform = 'scale(1)';
        } else {
            racerContainer.style.transform = 'scale(0.9)';
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

// Fungsi untuk membuat antrean seluruh isi soal dari file soal aktif (semua soal tanpa terkecuali)
function buildFullQuestionQueue() {
    const activeFile = getActiveFile();
    const pool = (activeFile && activeFile.questions.length > 0)
        ? activeFile.questions
        : defaultFolderStore.folders[0].files[0].questions;

    // Salin seluruh isi soal yang ada agar semua soal dikeluarkan secara utuh
    return pool.map((item, idx) => ({
        item: item,
        index: idx
    }));
}

// Fungsi untuk mengambil soal berikutnya dari antrean seluruh isi soal
function getNextQuestionFromQueue(playerState) {
    if (!Array.isArray(playerState.questionQueue) || playerState.questionQueue.length === 0) {
        playerState.questionQueue = buildFullQuestionQueue();
        playerState.questionCursor = 0;
        playerState.totalQuestionsInPool = playerState.questionQueue.length;
    }

    // Jika semua isi soal sudah dikeluarkan dan pemain belum mencapai target benar,
    // periksa apakah pemain lain juga sudah habis atau ulangi siklus soal berikutnya
    if (playerState.questionCursor >= playerState.questionQueue.length) {
        const otherPlayer = playerState === gameState.leftPlayer ? gameState.rightPlayer : gameState.leftPlayer;
        if (otherPlayer.questionCursor >= otherPlayer.questionQueue.length && otherPlayer.isLocked) {
            return null; // Kedua pemain sudah mengeluarkan seluruh isi soal
        }
        // Ulangi dari awal daftar soal agar pemain tetap bisa mengejar ketentuan jumlah soal benar
        playerState.questionCursor = 0;
    }

    const entry = playerState.questionQueue[playerState.questionCursor];
    const currentNumber = playerState.questionCursor + 1;
    playerState.questionCursor++;
    return {
        item: entry.item,
        index: entry.index,
        questionNumber: currentNumber,
        totalQuestions: playerState.totalQuestionsInPool
    };
}

// Fungsi untuk generate soal baru dari seluruh isi file soal aktif
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
    const progressEl = section.querySelector('.question-progress-text');
    const playerState = player === 'left' ? gameState.leftPlayer : gameState.rightPlayer;

    const nextData = getNextQuestionFromQueue(playerState);
    if (!nextData) {
        resolveEndOfAllQuestions();
        return;
    }

    const { item, index, questionNumber, totalQuestions } = nextData;
    
    playerState.lastQuestionIndex = index;
    playerState.currentQuestionObj = item;
    playerState.isLocked = false;

    if (progressEl) {
        progressEl.textContent = `${questionNumber}/${totalQuestions}`;
    }

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
    gameState.targetCorrectToWin = getEffectiveTargetCorrect();
    gameState.ropePosition = 50;

    const leftQueue = buildFullQuestionQueue();
    const rightQueue = buildFullQuestionQueue();

    gameState.leftPlayer.answer = '';
    gameState.rightPlayer.answer = '';
    gameState.leftPlayer.score = 0;
    gameState.rightPlayer.score = 0;
    gameState.leftPlayer.correctCount = 0;
    gameState.rightPlayer.correctCount = 0;
    gameState.leftPlayer.climbPosition = 0;
    gameState.rightPlayer.climbPosition = 0;
    gameState.leftPlayer.racePosition = 0;
    gameState.rightPlayer.racePosition = 0;
    gameState.leftPlayer.questionQueue = leftQueue;
    gameState.rightPlayer.questionQueue = rightQueue;
    gameState.leftPlayer.questionCursor = 0;
    gameState.rightPlayer.questionCursor = 0;
    gameState.leftPlayer.totalQuestionsInPool = leftQueue.length;
    gameState.rightPlayer.totalQuestionsInPool = rightQueue.length;
    gameState.leftPlayer.lastQuestionIndex = -1;
    gameState.rightPlayer.lastQuestionIndex = -1;
    gameState.leftPlayer.isLocked = false;
    gameState.rightPlayer.isLocked = false;
    
    updateActiveFolderBadgeUI();
    updateScoreDisplay('left');
    updateScoreDisplay('right');

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
    } else if (gameState.currentGameType === 'balap-karung') {
        // Reset racer positions - kembali ke posisi awal menggunakan pixels
        const leftRacer = document.querySelector('#gameScreenBalapKarung .left-racer');
        const rightRacer = document.querySelector('#gameScreenBalapKarung .right-racer');
        const raceTrack = document.querySelector('#gameScreenBalapKarung .race-track');
        const trackWidth = raceTrack ? raceTrack.offsetWidth : 900;
        
        if (leftRacer) {
            const startPixelLeft = trackWidth * 0.035;
            leftRacer.style.left = `${startPixelLeft}px`;
            leftRacer.style.transform = 'scale(1)';
            leftRacer.classList.remove('hopping');
            leftRacer.classList.remove('shaking');
            const standImage = leftRacer.querySelector('.stand');
            const hopImage = leftRacer.querySelector('.hop');
            standImage.style.display = 'block';
            hopImage.style.display = 'none';
        }
        
        if (rightRacer) {
            const startPixelRight = trackWidth * 0.065;
            rightRacer.style.left = `${startPixelRight}px`;
            rightRacer.style.transform = 'scale(0.9)';
            rightRacer.classList.remove('hopping');
            rightRacer.classList.remove('shaking');
            const standImage = rightRacer.querySelector('.stand');
            const hopImage = rightRacer.querySelector('.hop');
            standImage.style.display = 'block';
            hopImage.style.display = 'none';
        }
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

// Fungsi untuk memilih game type dan memastikan file aktif memiliki soal
function selectGameType(gameType) {
    const activeFolder = getActiveFolder();
    const activeFile = getActiveFile();
    if (!activeFolder || !activeFile || activeFile.questions.length === 0) {
        const label = activeFolder && activeFile ? `${activeFolder.name} - ${activeFile.name}` : 'yang dipilih';
        alert(`File soal aktif "${label}" masih kosong! Silakan tambahkan soal, import file JSON, atau aktifkan file soal lain yang sudah terisi.`);
        showCustomQuestionMenu();
        return;
    }

    const targetWin = getEffectiveTargetCorrect();
    if (targetWin < 1) {
        alert('Ketentuan jumlah soal yang harus dijawab benar minimal 1 soal!');
        return;
    }

    gameState.targetCorrectToWin = targetWin;
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

// Initialize - muat data folder, pengaturan target benar & tampilkan menu game type
loadFolderStore();
loadTargetCorrectSetting();
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
    const TOTAL_HOPS = Math.max(1, gameState.targetCorrectToWin);
    
    // Recalculate left racer position (blue - jalur bawah)
    const leftRacer = document.querySelector('#gameScreenBalapKarung .left-racer');
    if (leftRacer) {
        const START_LEFT = trackWidth * 0.035;
        const FINISH_LEFT = trackWidth * 0.82;
        const HOP_DISTANCE_LEFT = (FINISH_LEFT - START_LEFT) / TOTAL_HOPS;
        
        const leftPosition = Math.min(FINISH_LEFT, START_LEFT + (gameState.leftPlayer.racePosition * HOP_DISTANCE_LEFT));
        leftRacer.style.left = `${leftPosition}px`;
        leftRacer.style.transform = 'scale(1)';
    }
    
    // Recalculate right racer position (red - jalur atas)
    const rightRacer = document.querySelector('#gameScreenBalapKarung .right-racer');
    if (rightRacer) {
        const START_RIGHT = trackWidth * 0.065;
        const FINISH_RIGHT = trackWidth * 0.78;
        const HOP_DISTANCE_RIGHT = (FINISH_RIGHT - START_RIGHT) / TOTAL_HOPS;
        
        const rightPosition = Math.min(FINISH_RIGHT, START_RIGHT + (gameState.rightPlayer.racePosition * HOP_DISTANCE_RIGHT));
        rightRacer.style.left = `${rightPosition}px`;
        rightRacer.style.transform = 'scale(0.9)';
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
