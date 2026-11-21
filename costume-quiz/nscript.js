// ============================================
// IMAGE PRELOADING & CACHING
// ============================================

const imagesToPreload = [
    'character.png',
    'icon_home.png',
    'icon_tarik.png',
    'icon_panjat.png',
    'icon_balap_karung.png',
    'panjat_pinang/tiang.png',
    'panjat_pinang/standleft.png',
    'panjat_pinang/standright.png',
    'panjat_pinang/climbleft.png',
    'panjat_pinang/climbright.png',
    'balap_karung/track.png',
    'balap_karung/blue_stand.png',
    'balap_karung/blue_hop.png',
    'balap_karung/red_stand.png',
    'balap_karung/red_hop.png'
];

const preloadedImages = {};
let imagesLoaded = 0;
const totalImages = imagesToPreload.length;

function preloadImages() {
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = () => {
            preloadedImages[src] = img;
            imagesLoaded++;
        };
        img.onerror = () => {
            imagesLoaded++;
        };
        img.src = src;
    });
}

window.addEventListener('load', () => {
    preloadImages();
});

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
        if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) {
            SoundEngine.sfx.correct();
        }

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
            pState.racePosition++;
            updateRacerPosition(player);
            updateScoreDisplay(player);

            if (pState.racePosition >= WIN_HOPS_BALAP) {
                gameState.isActive = false;
                const winnerLabel = player === 'left' ? 'Pemain Kiri' : 'Pemain Kanan';
                setTimeout(() => showWinnerModal(winnerLabel, 'Selamat! Anda berhasil mencapai garis finish!'), 550);
                return true;
            }

            setTimeout(() => {
                if (gameState.isActive) generateNewQuestion(player);
            }, 350);
        }

        return true;
    } else {
        if (clickedBtn) clickedBtn.classList.add('opt-wrong');
        if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) {
            SoundEngine.sfx.wrong();
        }

        if (gameState.currentGameType === 'panjat-pinang' && pState.climbPosition > 0) {
            pState.climbPosition--;
            updateClimberPosition(player);
            updateScoreDisplay(player);
        }

        if (gameState.currentGameType === 'balap-karung') {
            const racerClass = player === 'left' ? '.left-racer' : '.right-racer';
            const racerContainer = document.querySelector(`#gameScreenBalapKarung ${racerClass}`);
            if (racerContainer) {
                racerContainer.classList.add('shaking');
                setTimeout(() => racerContainer.classList.remove('shaking'), 500);
            }
        }

        setTimeout(() => {
            if (gameState.isActive) generateNewQuestion(player);
        }, 650);

        return false;
    }
}

// ============================================
// ARENA VISUAL UPDATES
// ============================================

function updateRopePosition() {
    const scene = document.querySelector('.tug-of-war-scene');
    const gameContainer = document.querySelector('#gameScreenTarikTambang');
    if (!scene || !gameContainer) return;

    const leftSection = gameContainer.querySelector('.left-player');
    const rightSection = gameContainer.querySelector('.right-player');
    const centerSection = gameContainer.querySelector('.center-section');

    const leftBoundary = leftSection ? leftSection.offsetWidth : 340;
    const rightBoundary = rightSection ? rightSection.offsetWidth : 340;
    const centerWidth = centerSection ? centerSection.offsetWidth : 500;

    const maxLeftMove = Math.min(centerWidth * 0.35, leftBoundary * 0.25);
    const maxRightMove = Math.min(centerWidth * 0.35, rightBoundary * 0.25);

    let offset = 0;
    if (gameState.ropePosition < 50) {
        const leftProgress = (50 - gameState.ropePosition) / 50;
        offset = -leftProgress * maxLeftMove;
    } else if (gameState.ropePosition > 50) {
        const rightProgress = (gameState.ropePosition - 50) / 50;
        offset = rightProgress * maxRightMove;
    }

    scene.style.transform = `translateX(${Math.round(offset)}px)`;
}

function updateScoreDisplay(player) {
    const screenSel = getGameScreenSelector();
    const scoreElement = document.querySelector(`${screenSel} .${player}-player .score-value`);
    if (!scoreElement) return;

    if (gameState.currentGameType === 'panjat-pinang') {
        const score = player === 'left' ? gameState.leftPlayer.climbPosition : gameState.rightPlayer.climbPosition;
        scoreElement.textContent = `${score}/${WIN_STEPS_PANJAT}`;
    } else if (gameState.currentGameType === 'balap-karung') {
        const score = player === 'left' ? gameState.leftPlayer.racePosition : gameState.rightPlayer.racePosition;
        scoreElement.textContent = `${score}/${WIN_HOPS_BALAP}`;
    }
}

function updateClimberPosition(player) {
    const climberClass = player === 'left' ? '.left-climber' : '.right-climber';
    const climberContainer = document.querySelector(`#gameScreenPanjatPinang ${climberClass}`);
    if (!climberContainer) return;

    const standImage = climberContainer.querySelector('.stand');
    const climbImage = climberContainer.querySelector('.climb');
    const climbPosition = player === 'left' ? gameState.leftPlayer.climbPosition : gameState.rightPlayer.climbPosition;

    const poleEl = climberContainer.closest('.pole-container');
    const poleImg = poleEl ? poleEl.querySelector('.pole-image') : null;
    const climbSpan = poleImg && poleImg.clientHeight ? Math.max(poleImg.clientHeight - 75, 110) : 180;
    const climbPixels = Math.round(Math.min(climbPosition / WIN_STEPS_PANJAT, 1) * climbSpan);

    if (climbPosition === 0) {
        if (climbImage) climbImage.style.display = 'none';
        if (standImage) standImage.style.display = 'block';
        climberContainer.style.setProperty('transform', 'translateX(-50%) translateY(0px)', 'important');
    } else {
        if (standImage) standImage.style.display = 'none';
        if (climbImage) climbImage.style.display = 'block';
        climberContainer.style.setProperty('transform', `translateX(-50%) translateY(-${climbPixels}px)`, 'important');

        setTimeout(() => {
            if (climbPosition > 0 && climbPosition < WIN_STEPS_PANJAT && standImage && climbImage) {
                climbImage.style.display = 'none';
                standImage.style.display = 'block';
            }
        }, 320);
    }
}

function updateRacerPosition(player) {
    const racerClass = player === 'left' ? '.left-racer' : '.right-racer';
    const racerContainer = document.querySelector(`#gameScreenBalapKarung ${racerClass}`);
    if (!racerContainer) return;

    const standImage = racerContainer.querySelector('.stand');
    const hopImage = racerContainer.querySelector('.hop');
    const raceTrack = document.querySelector('#gameScreenBalapKarung .race-track');
    const trackWidth = raceTrack ? raceTrack.offsetWidth : 900;

    const racePosition = player === 'left' ? gameState.leftPlayer.racePosition : gameState.rightPlayer.racePosition;

    let START_PIXEL, FINISH_PIXEL;
    if (player === 'left') {
        START_PIXEL = trackWidth * 0.035;
        FINISH_PIXEL = trackWidth * 0.82;
    } else {
        START_PIXEL = trackWidth * 0.065;
        FINISH_PIXEL = trackWidth * 0.78;
    }

    const HOP_DISTANCE = (FINISH_PIXEL - START_PIXEL) / WIN_HOPS_BALAP;
    const currentPixelPosition = START_PIXEL + (racePosition * HOP_DISTANCE);

    if (standImage) standImage.style.display = 'none';
    if (hopImage) hopImage.style.display = 'block';

    racerContainer.classList.add('hopping');
    racerContainer.style.left = `${currentPixelPosition}px`;

    setTimeout(() => {
        if (hopImage) hopImage.style.display = 'none';
        if (standImage) standImage.style.display = 'block';
        racerContainer.classList.remove('hopping');
        racerContainer.style.transform = player === 'left' ? 'scale(1)' : 'scale(0.9)';
    }, 450);
}

// ============================================
// CONFETTI, MODAL & COUNTDOWN
// ============================================

function createConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
        if (animationEnd - Date.now() <= 0) return clearInterval(interval);
        for (let i = 0; i < 3; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = randomInRange(0, 100) + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = randomInRange(2, 4) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }, 50);
}

function showWinnerModal(winner, message) {
    createConfetti();
    if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) {
        SoundEngine.sfx.win();
        SoundEngine.startBGM('menu');
    }

    const modal = document.getElementById('winnerModal');
    const winnerText = document.getElementById('winnerText');
    const winnerMessage = document.getElementById('winnerMessage');
    if (winnerText) winnerText.innerHTML = `<span>🎉</span><span>${winner} Menang!</span><span>🎉</span>`;
    if (winnerMessage) winnerMessage.textContent = message;
    if (modal) modal.style.display = 'flex';

    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'none';
    if (fullscreenBtn) fullscreenBtn.style.display = 'none';
}

function closeModal() {
    const modal = document.getElementById('winnerModal');
    if (modal) modal.style.display = 'none';

    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'flex';
    if (fullscreenBtn) fullscreenBtn.style.display = 'flex';

    showCountdown();
}

function restartCurrentMode() {
    const modal = document.getElementById('winnerModal');
    if (modal) modal.style.display = 'none';
    showCountdown();
}

function showCountdown() {
    const overlay = document.getElementById('countdownOverlay');
    if (!overlay) {
        startGame();
        return;
    }

    gameState.isActive = false;
    const homeBtn = document.getElementById('homeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (homeBtn) homeBtn.style.display = 'none';
    if (fullscreenBtn) fullscreenBtn.style.display = 'none';

    overlay.style.display = 'flex';
    overlay.classList.add('show');

    const countdownSequence = [
        { number: '3', text: 'Bersiap...' },
        { number: '2', text: 'Konsentrasi...' },
        { number: '1', text: 'Fokus...' },
        { number: 'Mulai!', text: 'Jawab secepat mungkin!', isStart: true }
    ];

    function updateCountdown(index) {
        if (index >= countdownSequence.length) {
            setTimeout(() => {
                overlay.classList.remove('show');
                overlay.style.display = 'none';
                startGame();
            }, 400);
            return;
        }

        const current = countdownSequence[index];
        const numberEl = document.getElementById('countdownNumber');
        const textEl = document.getElementById('countdownText');

        if (numberEl) numberEl.textContent = current.number;
        if (textEl) textEl.textContent = current.text;

        if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) {
            SoundEngine.sfx.countdownTick(Boolean(current.isStart));
            if (current.isStart) SoundEngine.startBGM('game');
        }

        if (index < countdownSequence.length - 1) {
            setTimeout(() => updateCountdown(index + 1), 850);
        } else {
            setTimeout(() => updateCountdown(index + 1), 650);
        }
    }

    updateCountdown(0);
}

function resetGame() {
    gameState.ropePosition = 50;
    gameState.leftPlayer.score = 0;
    gameState.rightPlayer.score = 0;
    gameState.leftPlayer.climbPosition = 0;
    gameState.rightPlayer.climbPosition = 0;
    gameState.leftPlayer.racePosition = 0;
    gameState.rightPlayer.racePosition = 0;
    gameState.leftPlayer.queue = shuffleArray(questionBank);
    gameState.rightPlayer.queue = shuffleArray(questionBank);
    gameState.isActive = true;

    if (gameState.currentGameType === 'tarik-tambang') {
        updateRopePosition();
    } else if (gameState.currentGameType === 'panjat-pinang') {
        document.querySelectorAll('.climber-container').forEach(container => {
            container.style.setProperty('transform', 'translateX(-50%) translateY(0px)', 'important');
            const standImage = container.querySelector('.stand');
            const climbImage = container.querySelector('.climb');
            if (standImage) standImage.style.display = 'block';
            if (climbImage) climbImage.style.display = 'none';
        });
        updateScoreDisplay('left');
        updateScoreDisplay('right');
    } else if (gameState.currentGameType === 'balap-karung') {
        const leftRacer = document.querySelector('#gameScreenBalapKarung .left-racer');
        const rightRacer = document.querySelector('#gameScreenBalapKarung .right-racer');
        const raceTrack = document.querySelector('#gameScreenBalapKarung .race-track');
        const trackWidth = raceTrack ? raceTrack.offsetWidth : 900;

        if (leftRacer) {
            leftRacer.style.left = `${trackWidth * 0.035}px`;
            leftRacer.style.transform = 'scale(1)';
            leftRacer.classList.remove('hopping', 'shaking');
            const standImage = leftRacer.querySelector('.stand');
            const hopImage = leftRacer.querySelector('.hop');
            if (standImage) standImage.style.display = 'block';
            if (hopImage) hopImage.style.display = 'none';
        }

        if (rightRacer) {
            rightRacer.style.left = `${trackWidth * 0.065}px`;
            rightRacer.style.transform = 'scale(0.9)';
            rightRacer.classList.remove('hopping', 'shaking');
            const standImage = rightRacer.querySelector('.stand');
            const hopImage = rightRacer.querySelector('.hop');
            if (standImage) standImage.style.display = 'block';
            if (hopImage) hopImage.style.display = 'none';
        }

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
        if (typeof openQuizEditor === 'function') openQuizEditor();
        return;
    }

    if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) {
        SoundEngine.sfx.nav();
    }

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
    if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) {
        SoundEngine.sfx.nav();
        SoundEngine.startBGM('menu');
    }
    showGameTypeMenu();
}

// ============================================
// CUSTOM QUIZ EDITOR HANDLERS
// ============================================

function openQuizEditor() {
    if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) SoundEngine.sfx.nav();
    const modal = document.getElementById('quizEditorModal');
    if (modal) modal.classList.add('active');
    renderQuestionList();
}

function closeQuizEditor() {
    if (typeof SoundEngine !== 'undefined' && SoundEngine.sfx) SoundEngine.sfx.click();
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
// VIEWPORT, DEVICE & FULLSCREEN HANDLING
// ============================================

let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

function getDeviceInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    const isInteractivePanel = (screenWidth >= 3840 || screenHeight >= 2160) ||
                              (width >= 3840 || height >= 2160);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    (width <= 768 && 'ontouchstart' in window);
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

function optimizeLayout() {
    const deviceInfo = getDeviceInfo();
    if (deviceInfo.isInteractivePanel) {
        document.documentElement.style.setProperty('--custom-scale', '1.5');
        document.documentElement.style.setProperty('--custom-font-scale', '1.6');
    } else if (deviceInfo.isMobile) {
        document.documentElement.style.setProperty('--custom-scale', '0.8');
        document.documentElement.style.setProperty('--custom-font-scale', '0.9');
    } else if (deviceInfo.isTablet) {
        document.documentElement.style.setProperty('--custom-scale', '0.9');
        document.documentElement.style.setProperty('--custom-font-scale', '1');
    }
}

function forceFitToScreen() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    document.documentElement.style.setProperty('--vw', `${vw * 0.01}px`);

    document.body.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehaviorY = 'none';
    document.body.style.touchAction = 'none';

    optimizeLayout();

    if (gameState.currentGameType === 'tarik-tambang' &&
        document.getElementById('gameScreenTarikTambang')?.style.display === 'flex') {
        updateRopePosition();
    }
}

window.addEventListener('load', () => {
    forceFitToScreen();
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        forceFitToScreen();
        if (gameState.currentGameType === 'balap-karung' &&
            document.getElementById('gameScreenBalapKarung')?.style.display === 'flex') {
            recalculateRacerPositions();
        }
        if (gameState.currentGameType === 'tarik-tambang' &&
            document.getElementById('gameScreenTarikTambang')?.style.display === 'flex') {
            updateRopePosition();
        }
    }, 100);
});

function recalculateRacerPositions() {
    const raceTrack = document.querySelector('#gameScreenBalapKarung .race-track');
    if (!raceTrack) return;
    const trackWidth = raceTrack.offsetWidth;

    const leftRacer = document.querySelector('#gameScreenBalapKarung .left-racer');
    if (leftRacer) {
        const startLeft = trackWidth * 0.035;
        const finishLeft = trackWidth * 0.82;
        const hopLeft = (finishLeft - startLeft) / WIN_HOPS_BALAP;
        leftRacer.style.left = `${startLeft + (gameState.leftPlayer.racePosition * hopLeft)}px`;
        leftRacer.style.transform = 'scale(1)';
    }

    const rightRacer = document.querySelector('#gameScreenBalapKarung .right-racer');
    if (rightRacer) {
        const startRight = trackWidth * 0.065;
        const finishRight = trackWidth * 0.78;
        const hopRight = (finishRight - startRight) / WIN_HOPS_BALAP;
        rightRacer.style.left = `${startRight + (gameState.rightPlayer.racePosition * hopRight)}px`;
        rightRacer.style.transform = 'scale(0.9)';
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen({ navigationUI: 'hide' }).then(forceFitToScreen).catch(() => {});
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(forceFitToScreen).catch(() => {});
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

document.addEventListener('fullscreenchange', () => setTimeout(forceFitToScreen, 100));

document.addEventListener('DOMContentLoaded', () => {
    loadQuestionBank();
    updateQuizUIInfo();
    showGameTypeMenu();
});
