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
// BANK KOSTUM SOAL (SEMUA MATA PELAJARAN)
// ============================================

const STORAGE_KEY_CUSTOM_QUESTIONS = 'afifedu_custom_questions_v1';

const defaultQuestions = [
    {
        question: 'Apa kepanjangan dari CPU pada komputer?',
        options: { A: 'Central Process Unit', B: 'Central Processing Unit', C: 'Computer Personal Unit', D: 'Control Processing Unit' },
        answer: 'B'
    },
    {
        question: 'Ibukota negara Jepang adalah...',
        options: { A: 'Seoul', B: 'Beijing', C: 'Tokyo', D: 'Bangkok' },
        answer: 'C'
    },
    {
        question: 'Organ tubuh manusia yang berfungsi memompa darah adalah...',
        options: { A: 'Paru-paru', B: 'Hati', C: 'Ginjal', D: 'Jantung' },
        answer: 'D'
    },
    {
        question: 'Bahasa Inggris dari kata "Perpustakaan" adalah...',
        options: { A: 'Library', B: 'Laboratory', C: 'Bookstore', D: 'Canteen' },
        answer: 'A'
    },
    {
        question: 'Sila ketiga Pancasila dilambangkan dengan gambar...',
        options: { A: 'Bintang', B: 'Rantai', C: 'Pohon Beringin', D: 'Kepala Banteng' },
        answer: 'C'
    },
    {
        question: 'Gas yang dibutuhkan tumbuhan untuk fotosintesis adalah...',
        options: { A: 'Oksigen', B: 'Karbon dioksida', C: 'Nitrogen', D: 'Hidrogen' },
        answer: 'B'
    },
    {
        question: 'Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal...',
        options: { A: '17 Agustus 1945', B: '18 Agustus 1945', C: '1 Juni 1945', D: '28 Oktober 1928' },
        answer: 'A'
    },
    {
        question: 'Perangkat lunak yang digunakan untuk mengolah angka adalah...',
        options: { A: 'Microsoft Word', B: 'Microsoft PowerPoint', C: 'Microsoft Excel', D: 'CorelDraw' },
        answer: 'C'
    }
];

let customQuestions = [];

function loadCustomQuestions() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_QUESTIONS);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                customQuestions = parsed;
            } else {
                customQuestions = [...defaultQuestions];
                saveCustomQuestions();
            }
        } else {
            customQuestions = [...defaultQuestions];
            saveCustomQuestions();
        }
    } catch (e) {
        console.error('Gagal memuat soal dari localStorage:', e);
        customQuestions = [...defaultQuestions];
    }
    updateQuestionCountUI();
}

function saveCustomQuestions() {
    try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_QUESTIONS, JSON.stringify(customQuestions));
    } catch (e) {
        console.error('Gagal menyimpan soal ke localStorage:', e);
    }
    updateQuestionCountUI();
}

function updateQuestionCountUI() {
    const badge = document.getElementById('questionCountBadge');
    const totalEl = document.getElementById('totalCustomQuestions');
    if (badge) badge.textContent = `${customQuestions.length} Soal Tersedia`;
    if (totalEl) totalEl.textContent = customQuestions.length;
}

function renderCustomQuestionList() {
    const listContainer = document.getElementById('customQuestionList');
    if (!listContainer) return;

    if (customQuestions.length === 0) {
        listContainer.innerHTML = '<div class="empty-soal-msg">Belum ada soal. Tambahkan soal baru atau klik "Soal Contoh".</div>';
        return;
    }

    listContainer.innerHTML = customQuestions.map((item, idx) => `
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
            <button type="button" class="delete-soal-btn" onclick="deleteCustomQuestion(${idx})" title="Hapus Soal">✕</button>
        </div>
    `).join('');
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function addCustomQuestion() {
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

    customQuestions.push({
        question,
        options: { A, B, C, D },
        answer
    });

    saveCustomQuestions();
    renderCustomQuestionList();

    qInput.value = '';
    optA.value = '';
    optB.value = '';
    optC.value = '';
    optD.value = '';
    correctSelect.value = 'A';
}

function deleteCustomQuestion(index) {
    customQuestions.splice(index, 1);
    saveCustomQuestions();
    renderCustomQuestionList();
}

function clearAllCustomQuestions() {
    if (confirm('Hapus semua daftar soal saat ini?')) {
        customQuestions = [];
        saveCustomQuestions();
        renderCustomQuestionList();
    }
}

function resetDefaultQuestions() {
    if (confirm('Muat ulang soal contoh bawaan? Daftar soal saat ini akan diganti.')) {
        customQuestions = [...defaultQuestions];
        saveCustomQuestions();
        renderCustomQuestionList();
    }
}

function toggleBulkImport() {
    const box = document.getElementById('bulkImportBox');
    if (!box) return;
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function processBulkImport() {
    const textarea = document.getElementById('bulkImportText');
    if (!textarea) return;

    const lines = textarea.value.split('\n').map(l => l.trim()).filter(l => l !== '');
    if (lines.length === 0) {
        alert('Teks import masih kosong!');
        return;
    }

    let addedCount = 0;
    lines.forEach(line => {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length >= 6) {
            const [question, A, B, C, D, rawAns] = parts;
            const answer = rawAns.toUpperCase();
            if (question && A && B && C && D && ['A', 'B', 'C', 'D'].includes(answer)) {
                customQuestions.push({
                    question,
                    options: { A, B, C, D },
                    answer
                });
                addedCount++;
            }
        }
    });

    if (addedCount > 0) {
        saveCustomQuestions();
        renderCustomQuestionList();
        textarea.value = '';
        toggleBulkImport();
        alert(`Berhasil menambahkan ${addedCount} soal baru!`);
    } else {
        alert('Format tidak sesuai. Pastikan format per baris: Pertanyaan | Opsi A | Opsi B | Opsi C | Opsi D | Kunci (A/B/C/D)');
    }
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

        // Ganti ke soal berikutnya setelah jeda singkat agar pemain tidak sekadar menebak sisa opsi
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

// Fungsi untuk mengambil soal acak dari bank kostum soal
function getRandomCustomQuestion(excludeIndex) {
    const pool = customQuestions.length > 0 ? customQuestions : defaultQuestions;
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

// Fungsi untuk generate soal baru dari Kostum Soal
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

    const { item, index } = getRandomCustomQuestion(playerState.lastQuestionIndex);
    
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
    updateQuestionCountUI();
}

// Fungsi untuk menampilkan menu Kostum Soal
function showCustomQuestionMenu() {
    document.getElementById('gameTypeMenu').style.display = 'none';
    document.getElementById('customQuestionMenu').style.display = 'flex';
    document.getElementById('gameScreenTarikTambang').style.display = 'none';
    document.getElementById('gameScreenPanjatPinang').style.display = 'none';
    document.getElementById('gameScreenBalapKarung').style.display = 'none';
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) homeBtn.style.display = 'none';
    renderCustomQuestionList();
}

// Fungsi untuk memilih game type dan langsung mulai countdown
function selectGameType(gameType) {
    if (customQuestions.length === 0) {
        alert('Daftar soal masih kosong! Silakan tambahkan soal terlebih dahulu di menu Kelola Kostum Soal.');
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

// Initialize - muat kostum soal dan tampilkan menu game type
loadCustomQuestions();
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

// Prevent default touch behaviors (kecuali pada input/textarea di menu kostum soal)
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
