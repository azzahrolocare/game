// ============================================
// SOUND ENGINE (WEB AUDIO API)
// ============================================

const SoundEngine = (() => {
    let ctx = null;
    let isMuted = false;
    let bgmTimer = null;
    let bgmStep = 0;
    let currentMood = 'menu';

    const notes = {
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
        C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, R: 0
    };

    const menuMelody = [
        'C5', 'E5', 'G5', 'E5', 'F5', 'A5', 'G5', 'R',
        'E5', 'G5', 'C5', 'D5', 'E5', 'D5', 'C5', 'R',
        'D5', 'F5', 'A5', 'F5', 'E5', 'G5', 'C5', 'R',
        'D5', 'B4', 'C5', 'E5', 'C5', 'R', 'R', 'R'
    ];

    const gameMelody = [
        'G4', 'C5', 'E5', 'C5', 'G5', 'G5', 'E5', 'C5',
        'A4', 'D5', 'F5', 'D5', 'A5', 'A5', 'G5', 'E5',
        'G4', 'C5', 'E5', 'G5', 'A5', 'G5', 'E5', 'C5',
        'D5', 'E5', 'D5', 'B4', 'C5', 'E5', 'C5', 'R'
    ];

    function init() {
        if (!ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            ctx = new AudioCtx();
        }
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
    }

    function playTone(freq, duration, type = 'sine', volume = 0.15, slideTo = null) {
        if (isMuted || !freq) return;
        init();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
    }

    const sfx = {
        click() { playTone(620, 0.07, 'triangle', 0.14, 820); },
        nav() {
            playTone(440, 0.08, 'sine', 0.15);
            setTimeout(() => playTone(660, 0.12, 'sine', 0.15), 55);
        },
        correct() {
            playTone(523.25, 0.09, 'triangle', 0.22);
            setTimeout(() => playTone(659.25, 0.09, 'triangle', 0.22), 65);
            setTimeout(() => playTone(783.99, 0.18, 'triangle', 0.25, 987.77), 130);
        },
        wrong() {
            playTone(220, 0.14, 'sawtooth', 0.12, 160);
            setTimeout(() => playTone(185, 0.18, 'sawtooth', 0.12, 140), 110);
        },
        countdownTick(isGo = false) {
            if (isGo) playTone(880, 0.35, 'triangle', 0.28, 1046.5);
            else playTone(440, 0.15, 'sine', 0.22);
        },
        win() {
            [
                { f: 523.25, t: 0, d: 0.14 },
                { f: 659.25, t: 120, d: 0.14 },
                { f: 783.99, t: 240, d: 0.14 },
                { f: 1046.50, t: 380, d: 0.35 },
                { f: 783.99, t: 620, d: 0.14 },
                { f: 1046.50, t: 780, d: 0.55 }
            ].forEach(n => setTimeout(() => playTone(n.f, n.d, 'triangle', 0.25), n.t));
        }
    };

    function startBGM(mood = 'menu') {
        currentMood = mood;
        if (bgmTimer) clearInterval(bgmTimer);
        const tempoMs = mood === 'game' ? 210 : 280;
        bgmTimer = setInterval(() => {
            if (isMuted || !ctx || ctx.state !== 'running') return;
            const seq = currentMood === 'game' ? gameMelody : menuMelody;
            const noteName = seq[bgmStep % seq.length];
            const freq = notes[noteName];
            if (freq > 0) {
                playTone(freq, (tempoMs / 1000) * 0.85, 'sine', 0.055);
                if (bgmStep % 4 === 0) playTone(freq / 2, (tempoMs / 1000) * 1.4, 'triangle', 0.045);
            }
            bgmStep++;
        }, tempoMs);
    }

    function toggleMute() {
        init();
        isMuted = !isMuted;
        const btn = document.getElementById('audioToggleBtn');
        if (btn) {
            document.getElementById('iconSoundOn').style.display = isMuted ? 'none' : 'block';
            document.getElementById('iconSoundOff').style.display = isMuted ? 'block' : 'none';
            btn.classList.toggle('muted', isMuted);
        }
        if (!isMuted) sfx.click();
    }

    return { init, sfx, startBGM, toggleMute };
})();

// ============================================
// IMAGE PRELOADING & FALLBACK
// ============================================

const imagesToPreload = [
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

const preloadedImages = {};

function preloadImages() {
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = () => { preloadedImages[src] = img; };
        img.src = src;
    });
}

function handleRacerImgError(imgEl, color, pose) {
    if (imgEl.dataset.fallbackApplied) return;
    imgEl.dataset.fallbackApplied = 'true';
    imgEl.onerror = null;

    const shirtColor = color === 'red' ? '#e74c3c' : '#3498db';
    const sackColor = color === 'red' ? '#d35400' : '#c08b5c';
    const yOffset = pose === 'hop' ? -12 : 0;
    const legBend = pose === 'hop' ? 'M38,95 Q50,82 62,95' : 'M38,105 L62,105';

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100" height="120">
        <g transform="translate(0, ${yOffset})">
            <circle cx="50" cy="24" r="14" fill="#fbd3b0" stroke="#333" stroke-width="2.5"/>
            <rect x="35" y="15" width="30" height="6" rx="2" fill="#e74c3c"/>
            <rect x="35" y="21" width="30" height="5" rx="2" fill="#ffffff"/>
            <circle cx="45" cy="26" r="2" fill="#222"/>
            <circle cx="55" cy="26" r="2" fill="#222"/>
            <path d="M45,31 Q50,35 55,31" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
            <rect x="36" y="38" width="28" height="24" rx="6" fill="${shirtColor}" stroke="#333" stroke-width="2.5"/>
            <circle cx="34" cy="58" r="5" fill="#fbd3b0" stroke="#333" stroke-width="2"/>
            <circle cx="66" cy="58" r="5" fill="#fbd3b0" stroke="#333" stroke-width="2"/>
            <path d="M32,58 L68,58 L72,105 Q50,112 28,105 Z" fill="${sackColor}" stroke="#5d4037" stroke-width="2.5"/>
            <path d="${legBend}" fill="none" stroke="#5d4037" stroke-width="2" stroke-dasharray="4,3"/>
        </g>
    </svg>`;
    imgEl.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}

// ============================================
// CUSTOM QUESTION BANK (MULTI-MAPEL)
// ============================================

const STORAGE_KEY_QUESTIONS = 'azzahro_custom_quiz_questions_v1';
const STORAGE_KEY_SUBJECT = 'azzahro_custom_quiz_subject_v1';

const DEFAULT_SUBJECT = 'Kuis Lomba Edukasi';
const DEFAULT_QUESTIONS = [
    {
        question: 'Apa kepanjangan dari CPU pada komputer?',
        options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Power Utility', 'Control Process Unit'],
        answer: 0
    },
    {
        question: 'Planet terbesar di tata surya kita adalah...',
        options: ['Mars', 'Saturnus', 'Jupiter', 'Neptunus'],
        answer: 2
    },
    {
        question: 'Perangkat keras yang berfungsi menampilkan output visual adalah...',
        options: ['Keyboard', 'Monitor', 'Scanner', 'Microphone'],
        answer: 1
    },
    {
        question: 'Bahasa Inggris dari kata "Perpustakaan" adalah...',
        options: ['Laboratory', 'Canteen', 'Bookstore', 'Library'],
        answer: 3
    },
    {
        question: 'Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal...',
        options: ['17 Agustus 1945', '28 Oktober 1928', '1 Juni 1945', '10 November 1945'],
        answer: 0
    },
    {
        question: 'Bagian tumbuhan yang berfungsi menyerap air dan mineral dari tanah adalah...',
        options: ['Daun', 'Batang', 'Akar', 'Bunga'],
        answer: 2
    },
    {
        question: 'Tombol pintasan (shortcut) untuk menyalin teks di komputer adalah...',
        options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + X', 'Ctrl + Z'],
        answer: 1
    },
    {
        question: 'Gunung tertinggi di Pulau Jawa adalah...',
        options: ['Gunung Bromo', 'Gunung Merapi', 'Gunung Semeru', 'Gunung Arjuno'],
        answer: 2
    },
    {
        question: 'Zat hijau daun yang membantu proses fotosintesis disebut...',
        options: ['Klorofil', 'Stomata', 'Oksigen', 'Karbohidrat'],
        answer: 0
    },
    {
        question: 'Simbol sila pertama Pancasila adalah...',
        options: ['Rantai Emas', 'Pohon Beringin', 'Kepala Banteng', 'Bintang'],
        answer: 3
    }
];

let quizSubject = localStorage.getItem(STORAGE_KEY_SUBJECT) || DEFAULT_SUBJECT;
let questionBank = [];

function loadQuestionBank() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                questionBank = parsed;
                return;
            }
        }
    } catch (e) {
        console.error('Gagal memuat bank soal:', e);
    }
    questionBank = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
}

function saveQuestionBank() {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questionBank));
    localStorage.setItem(STORAGE_KEY_SUBJECT, quizSubject);
    updateQuizUIInfo();
}

function updateQuizUIInfo() {
    const titleEl = document.getElementById('mainQuizTitleDisplay');
    const summaryEl = document.getElementById('activeQuizSummary');
    const badgeEl = document.getElementById('tabCountBadge');
    const subjectInput = document.getElementById('quizSubjectInput');

    if (titleEl) titleEl.textContent = quizSubject;
    if (summaryEl) summaryEl.textContent = `Mapel: ${quizSubject} • ${questionBank.length} Soal Tersedia`;
    if (badgeEl) badgeEl.textContent = questionBank.length;
    if (subjectInput) subjectInput.value = quizSubject;

    document.querySelectorAll('.dynamic-game-title').forEach(el => {
        const modeName = el.dataset.modeLabel || el.textContent.split(' • ')[0];
        el.dataset.modeLabel = modeName;
        el.textContent = `${modeName} • ${quizSubject}`;
    });
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function shuffleArray(arr) {
    const copy = JSON.parse(JSON.stringify(arr));
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// ============================================
// GAME STATE
// ============================================

const WIN_STEPS_PANJAT = 7;
const WIN_HOPS_BALAP = 10;
const ROPE_STEP = 10;

const gameState = {
    leftPlayer: {
        score: 0,
        climbPosition: 0,
        racePosition: 0,
        queue: [],
        currentQuestion: null
    },
    rightPlayer: {
        score: 0,
        climbPosition: 0,
        racePosition: 0,
        queue: [],
        currentQuestion: null
    },
    ropePosition: 50,
    currentGameType: 'tarik-tambang',
    isActive: false
};

function getGameScreenSelector() {
    if (gameState.currentGameType === 'tarik-tambang') return '#gameScreenTarikTambang';
    if (gameState.currentGameType === 'panjat-pinang') return '#gameScreenPanjatPinang';
    return '#gameScreenBalapKarung';
}

function getNextQuestionForPlayer(player) {
    const pState = player === 'left' ? gameState.leftPlayer : gameState.rightPlayer;
    if (!pState.queue || pState.queue.length === 0) {
        pState.queue = shuffleArray(questionBank);
    }
    const nextQ = pState.queue.pop();
    pState.currentQuestion = nextQ;
    return nextQ;
}

function generateNewQuestion(player) {
    if (!questionBank || questionBank.length === 0) return;

    const screenSel = getGameScreenSelector();
    const section = document.querySelector(`${screenSel} .${player}-player`);
    if (!section) return;

    const qObj = getNextQuestionForPlayer(player);
    const qBox = section.querySelector('.mcq-question-box');
    const optsBox = section.querySelector('.mcq-options-grid');

    if (qBox) {
        qBox.textContent = qObj.question;
    }

    if (optsBox) {
        optsBox.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];
        qObj.options.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'mcq-option-btn';
            btn.innerHTML = `
                <span class="mcq-opt-letter">${letters[idx] || idx + 1}</span>
                <span class="mcq-opt-text">${escapeHTML(optText)}</span>
            `;
            btn.addEventListener('click', () => {
                checkChoiceAnswer(player, idx, btn);
            });
            optsBox.appendChild(btn);
        });
    }
}

function checkChoiceAnswer(player, selectedIdx, clickedBtn) {
    if (!gameState.isActive) return false;

    const pState = player === 'left' ? gameState.leftPlayer : gameState.rightPlayer;
    const currentQ = pState.currentQuestion;
    if (!currentQ) return false;

    const screenSel = getGameScreenSelector();
    const section = document.querySelector(`${screenSel} .${player}-player`);
    if (section) {
        section.querySelectorAll('.mcq-option-btn').forEach(btn => {
            btn.disabled = true;
        });
    }

    const isCorrect = selectedIdx === currentQ.answer;

    if (isCorrect) {
        if (clickedBtn) clickedBtn.classList.add('opt-correct');
        SoundEngine.sfx.correct();
        pState.score++;

        if (gameState.currentGameType === 'tarik-tambang') {
            if (player === 'left') {
                gameState.ropePosition = Math.max(0, gameState.ropePosition - ROPE_STEP);
            } else {
                gameState.ropePosition = Math.min(100, gameState.ropePosition + ROPE_STEP);
            }
            updateRopePosition();

            if (gameState.ropePosition <= 0) {
                gameState.isActive = false;
                setTimeout(() => showWinnerModal('Pemain Kiri', `Selamat! Berhasil menarik tali pada ${quizSubject}!`), 400);
                return true;
            }
            if (gameState.ropePosition >= 100) {
                gameState.isActive = false;
                setTimeout(() => showWinnerModal('Pemain Kanan', `Selamat! Berhasil menarik tali pada ${quizSubject}!`), 400);
                return true;
            }

            setTimeout(() => {
                if (gameState.isActive) generateNewQuestion(player);
            }, 300);
        } else if (gameState.currentGameType === 'panjat-pinang') {
            pState.climbPosition++;
            updateClimberPosition(player);
            updateScoreDisplay(player);

            if (pState.climbPosition >= WIN_STEPS_PANJAT) {
                gameState.isActive = false;
                const winnerLabel = player === 'left' ? 'Pemain Kiri' : 'Pemain Kanan';
                setTimeout(() => showWinnerModal(winnerLabel, 'Selamat! Anda berhasil mencapai puncak tiang pinang!'), 550);
                return true;
            }

            setTimeout(() => {
                if (gameState.isActive) generateNewQuestion(player);
            }, 350);
        } else if (gameState.currentGameType === 'balap-karung') {
        const leftRacer = document.querySelector('#gameScreenBalapKarung .left-racer');
        const rightRacer = document.querySelector('#gameScreenBalapKarung .right-racer');
        if (leftRacer) leftRacer.classList.remove('hopping', 'shaking');
        if (rightRacer) rightRacer.classList.remove('hopping', 'shaking');

        requestAnimationFrame(() => {
            applyRacerLayout('left', 0, false);
            applyRacerLayout('right', 0, false);
        });

        updateScoreDisplay('left');
        updateScoreDisplay('right');
    }

    generateNewQuestion('left');
    generateNewQuestion('right');
}

// ============================================
// NAVIGATION & MODE SELECTION
// ============================================

function hideAllGameScreens() {
    const ids = [
        'gameTypeMenu',
        'gameScreenTarikTambang',
        'gameScreenPanjatPinang',
        'gameScreenBalapKarung',
        'winnerModal'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}

function showGameTypeMenu() {
    gameState.isActive = false;
    hideAllGameScreens();
    const menu = document.getElementById('gameTypeMenu');
    if (menu) menu.style.display = 'flex';
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) homeBtn.style.display = 'none';
}

function startGameMode(gameType) {
    if (!questionBank || questionBank.length === 0) {
        alert('Bank soal masih kosong! Silakan tambahkan minimal 1 soal terlebih dahulu.');
        openQuizEditor();
        return;
    }

    SoundEngine.sfx.nav();
    gameState.currentGameType = gameType;
    showCountdown();
}

function startGame() {
    hideAllGameScreens();
    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'flex';
    if (fullscreenBtn) fullscreenBtn.style.display = 'flex';

    if (gameState.currentGameType === 'tarik-tambang') {
        document.getElementById('gameScreenTarikTambang').style.display = 'flex';
    } else if (gameState.currentGameType === 'panjat-pinang') {
        document.getElementById('gameScreenPanjatPinang').style.display = 'flex';
    } else if (gameState.currentGameType === 'balap-karung') {
        document.getElementById('gameScreenBalapKarung').style.display = 'flex';
    }

    updateQuizUIInfo();
    resetGame();
}

function backToGameTypeMenu() {
    SoundEngine.sfx.nav();
    SoundEngine.startBGM('menu');
    showGameTypeMenu();
}

// ============================================
// CUSTOM QUIZ EDITOR HANDLERS
// ============================================

function openQuizEditor() {
    SoundEngine.sfx.nav();
    const modal = document.getElementById('quizEditorModal');
    if (modal) modal.classList.add('active');
    renderQuestionList();
}

function closeQuizEditor() {
    SoundEngine.sfx.click();
    const modal = document.getElementById('quizEditorModal');
    if (modal) modal.classList.remove('active');
}

function switchEditorTab(tabName, btnEl) {
    document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
    if (btnEl) {
        btnEl.classList.add('active');
    } else {
        const tabs = document.querySelectorAll('.editor-tab');
        const idx = tabName === 'list' ? 0 : tabName === 'add' ? 1 : 2;
        if (tabs[idx]) tabs[idx].classList.add('active');
    }

    document.getElementById('editorTab-list').style.display = tabName === 'list' ? 'block' : 'none';
    document.getElementById('editorTab-add').style.display = tabName === 'add' ? 'block' : 'none';
    document.getElementById('editorTab-bulk').style.display = tabName === 'bulk' ? 'block' : 'none';
}

function saveQuizSubject() {
    const val = document.getElementById('quizSubjectInput').value.trim();
    if (!val) return alert('Nama mata pelajaran tidak boleh kosong.');
    quizSubject = val;
    saveQuestionBank();
    alert('Judul mata pelajaran berhasil diperbarui!');
}

function renderQuestionList() {
    const container = document.getElementById('questionListContainer');
    if (!container) return;

    if (questionBank.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#64748b; padding:20px;">Belum ada soal. Silakan tambah soal baru atau impor dari teks.</p>';
        return;
    }

    const letters = ['A', 'B', 'C', 'D'];
    container.innerHTML = questionBank.map((q, idx) => `
        <div class="question-list-item">
            <div class="q-item-info">
                <div class="q-item-title">${idx + 1}. ${escapeHTML(q.question)}</div>
                <div class="q-item-opts">
                    ${q.options.map((opt, oIdx) => `
                        <span class="${oIdx === q.answer ? 'is-ans' : ''}">
                            ${letters[oIdx]}. ${escapeHTML(opt)} ${oIdx === q.answer ? '✓' : ''}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div style="display:flex; gap:6px;">
                <button type="button" class="btn-primary-sm" style="padding:6px 10px; font-size:0.82rem;" onclick="editQuestion(${idx})">✏️ Edit</button>
                <button type="button" class="btn-danger-sm" onclick="deleteQuestion(${idx})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function editQuestion(idx) {
    const q = questionBank[idx];
    if (!q) return;
    document.getElementById('editQuestionIndex').value = idx;
    document.getElementById('inputQText').value = q.question;
    document.getElementById('inputOptA').value = q.options[0] || '';
    document.getElementById('inputOptB').value = q.options[1] || '';
    document.getElementById('inputOptC').value = q.options[2] || '';
    document.getElementById('inputOptD').value = q.options[3] || '';
    document.getElementById('inputCorrectOpt').value = String(q.answer);
    switchEditorTab('add');
}

function resetSingleForm() {
    document.getElementById('editQuestionIndex').value = '-1';
    document.getElementById('inputQText').value = '';
    document.getElementById('inputOptA').value = '';
    document.getElementById('inputOptB').value = '';
    document.getElementById('inputOptC').value = '';
    document.getElementById('inputOptD').value = '';
    document.getElementById('inputCorrectOpt').value = '0';
}

function saveSingleQuestion() {
    const qText = document.getElementById('inputQText').value.trim();
    const optA = document.getElementById('inputOptA').value.trim();
    const optB = document.getElementById('inputOptB').value.trim();
    const optC = document.getElementById('inputOptC').value.trim();
    const optD = document.getElementById('inputOptD').value.trim();
    const ans = parseInt(document.getElementById('inputCorrectOpt').value, 10);

    if (!qText || !optA || !optB || !optC || !optD) {
        return alert('Harap isi pertanyaan dan keempat pilihan jawaban (A, B, C, D)!');
    }

    const newObj = {
        question: qText,
        options: [optA, optB, optC, optD],
        answer: ans
    };

    const editIdx = parseInt(document.getElementById('editQuestionIndex').value, 10);
    if (editIdx >= 0) {
        questionBank[editIdx] = newObj;
    } else {
        questionBank.push(newObj);
    }

    saveQuestionBank();
    resetSingleForm();
    renderQuestionList();
    switchEditorTab('list');
}

function deleteQuestion(idx) {
    if (!confirm(`Hapus soal nomor ${idx + 1}?`)) return;
    questionBank.splice(idx, 1);
    saveQuestionBank();
    renderQuestionList();
}

function importBulkText(replaceAll) {
    const raw = document.getElementById('bulkTextInput').value.trim();
    if (!raw) return alert('Tempel teks soal terlebih dahulu!');

    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    const imported = [];
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

    for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split('|').map(p => p.trim());
        if (parts.length < 6) {
            return alert(`Format salah pada baris ${i + 1}:\n"${lines[i]}"\n\nGunakan format: Pertanyaan | A | B | C | D | Kunci`);
        }
        const keyChar = parts[5].toUpperCase();
        if (!(keyChar in keyMap)) {
            return alert(`Kunci jawaban pada baris ${i + 1} harus A, B, C, atau D.`);
        }
        imported.push({
            question: parts[0],
            options: [parts[1], parts[2], parts[3], parts[4]],
            answer: keyMap[keyChar]
        });
    }

    questionBank = replaceAll ? imported : questionBank.concat(imported);
    saveQuestionBank();
    document.getElementById('bulkTextInput').value = '';
    renderQuestionList();
    switchEditorTab('list');
    alert(`Berhasil mengimpor ${imported.length} soal!`);
}

function exportQuestionsJSON() {
    const payload = { subject: quizSubject, questions: questionBank };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-soal-${quizSubject.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importQuestionsJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            const list = Array.isArray(data) ? data : data.questions;
            if (!Array.isArray(list) || list.length === 0) throw new Error('Format JSON tidak valid');
            if (data.subject) quizSubject = data.subject;
            questionBank = list;
            saveQuestionBank();
            renderQuestionList();
            switchEditorTab('list');
            alert(`Berhasil memuat ${list.length} soal dari file JSON!`);
        } catch (err) {
            alert('File JSON tidak valid: ' + err.message);
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

function resetToDefaultQuestions() {
    if (!confirm('Kembalikan ke soal contoh bawaan?')) return;
    quizSubject = DEFAULT_SUBJECT;
    questionBank = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
    saveQuestionBank();
    renderQuestionList();
    switchEditorTab('list');
}

// ============================================
// VIEWPORT & FULLSCREEN HANDLING
// ============================================

function forceFitToScreen() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);

    if (gameState.currentGameType === 'tarik-tambang' &&
        document.getElementById('gameScreenTarikTambang')?.style.display === 'flex') {
        updateRopePosition();
    }
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        forceFitToScreen();
        if (gameState.currentGameType === 'balap-karung' &&
            document.getElementById('gameScreenBalapKarung')?.style.display === 'flex') {
            applyRacerLayout('left', gameState.leftPlayer.racePosition, false);
            applyRacerLayout('right', gameState.rightPlayer.racePosition, false);
        }
        if (gameState.currentGameType === 'panjat-pinang' &&
            document.getElementById('gameScreenPanjatPinang')?.style.display === 'flex') {
            updateClimberPosition('left');
            updateClimberPosition('right');
        }
    }, 100);
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(forceFitToScreen).catch(() => {});
    } else {
        document.exitFullscreen().then(forceFitToScreen).catch(() => {});
    }
}

document.addEventListener('fullscreenchange', () => {
    document.body.classList.toggle('fullscreen', Boolean(document.fullscreenElement));
    setTimeout(forceFitToScreen, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    forceFitToScreen();
    loadQuestionBank();
    updateQuizUIInfo();
    showGameTypeMenu();

    const unlockAudio = () => {
        SoundEngine.init();
        SoundEngine.startBGM('menu');
        document.removeEventListener('pointerdown', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('pointerdown', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
});
