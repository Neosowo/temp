// ===== TRANSLATIONS =====
const translations = {
    es: {
        timer: 'Temporizador',
        pomodoro: 'Pomodoro',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos',
        session: 'Sesión',
        type: 'Tipo',
        work: 'Trabajo',
        break: 'Descanso',
        longBreak: 'Descanso largo',
        start: 'Iniciar',
        pause: 'Pausar',
        reset: 'Reiniciar',
        taskList: 'Lista de Tareas',
        addTask: 'Agregar nueva tarea...',
        emptyTasks: 'No hay tareas. ¡Agrega una para empezar!',
        timeComplete: '¡Tiempo completado!',
        goodWork: '¡Buen trabajo! Toma un descanso.',
        timeUp: '¡Tiempo terminado!'
    },
    en: {
        timer: 'Timer',
        pomodoro: 'Pomodoro',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        session: 'Session',
        type: 'Type',
        work: 'Work',
        break: 'Break',
        longBreak: 'Long break',
        start: 'Start',
        pause: 'Pause',
        reset: 'Reset',
        taskList: 'Task List',
        addTask: 'Add new task...',
        emptyTasks: 'No tasks. Add one to get started!',
        timeComplete: 'Time complete!',
        goodWork: 'Good work! Take a break.',
        timeUp: 'Time is up!'
    },
    pt: {
        timer: 'Temporizador',
        pomodoro: 'Pomodoro',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos',
        session: 'Sessão',
        type: 'Tipo',
        work: 'Trabalho',
        break: 'Pausa',
        longBreak: 'Pausa longa',
        start: 'Iniciar',
        pause: 'Pausar',
        reset: 'Reiniciar',
        taskList: 'Lista de Tarefas',
        addTask: 'Adicionar nova tarefa...',
        emptyTasks: 'Sem tarefas. Adicione uma para começar!',
        timeComplete: 'Tempo completo!',
        goodWork: 'Bom trabalho! Faça uma pausa.',
        timeUp: 'O tempo acabou!'
    },
    fr: {
        timer: 'Minuteur',
        pomodoro: 'Pomodoro',
        hours: 'Heures',
        minutes: 'Minutes',
        seconds: 'Secondes',
        session: 'Session',
        type: 'Type',
        work: 'Travail',
        break: 'Pause',
        longBreak: 'Longue pause',
        start: 'Démarrer',
        pause: 'Pause',
        reset: 'Réinitialiser',
        taskList: 'Liste des tâches',
        addTask: 'Ajouter une nouvelle tâche...',
        emptyTasks: 'Aucune tâche. Ajoutez-en une pour commencer!',
        timeComplete: 'Temps terminé!',
        goodWork: 'Bon travail! Prenez une pause.',
        timeUp: 'Le temps est écoulé!'
    }
};

// ===== TIMEZONE DATA =====
const timezoneNames = {
    'America/Guayaquil': { es: 'Guayaquil, Ecuador', en: 'Guayaquil, Ecuador', pt: 'Guayaquil, Equador', fr: 'Guayaquil, Équateur' },
    'America/New_York': { es: 'Nueva York, EE.UU.', en: 'New York, USA', pt: 'Nova York, EUA', fr: 'New York, États-Unis' },
    'America/Los_Angeles': { es: 'Los Ángeles, EE.UU.', en: 'Los Angeles, USA', pt: 'Los Angeles, EUA', fr: 'Los Angeles, États-Unis' },
    'America/Chicago': { es: 'Chicago, EE.UU.', en: 'Chicago, USA', pt: 'Chicago, EUA', fr: 'Chicago, États-Unis' },
    'America/Mexico_City': { es: 'Ciudad de México', en: 'Mexico City', pt: 'Cidade do México', fr: 'Mexico' },
    'America/Bogota': { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia', pt: 'Bogotá, Colômbia', fr: 'Bogotá, Colombie' },
    'America/Lima': { es: 'Lima, Perú', en: 'Lima, Peru', pt: 'Lima, Peru', fr: 'Lima, Pérou' },
    'America/Santiago': { es: 'Santiago, Chile', en: 'Santiago, Chile', pt: 'Santiago, Chile', fr: 'Santiago, Chili' },
    'America/Buenos_Aires': { es: 'Buenos Aires, Argentina', en: 'Buenos Aires, Argentina', pt: 'Buenos Aires, Argentina', fr: 'Buenos Aires, Argentine' },
    'America/Caracas': { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela', pt: 'Caracas, Venezuela', fr: 'Caracas, Venezuela' },
    'America/Sao_Paulo': { es: 'São Paulo, Brasil', en: 'São Paulo, Brazil', pt: 'São Paulo, Brasil', fr: 'São Paulo, Brésil' },
    'Europe/Madrid': { es: 'Madrid, España', en: 'Madrid, Spain', pt: 'Madrid, Espanha', fr: 'Madrid, Espagne' },
    'Europe/London': { es: 'Londres, Reino Unido', en: 'London, UK', pt: 'Londres, Reino Unido', fr: 'Londres, Royaume-Uni' },
    'Europe/Paris': { es: 'París, Francia', en: 'Paris, France', pt: 'Paris, França', fr: 'Paris, France' },
    'Asia/Tokyo': { es: 'Tokio, Japón', en: 'Tokyo, Japan', pt: 'Tóquio, Japão', fr: 'Tokyo, Japon' },
    'Asia/Shanghai': { es: 'Shanghái, China', en: 'Shanghai, China', pt: 'Xangai, China', fr: 'Shanghai, Chine' },
    'Asia/Dubai': { es: 'Dubái, EAU', en: 'Dubai, UAE', pt: 'Dubai, EAU', fr: 'Dubaï, EAU' },
    'Australia/Sydney': { es: 'Sídney, Australia', en: 'Sydney, Australia', pt: 'Sydney, Austrália', fr: 'Sydney, Australie' }
};

// ===== STATE MANAGEMENT =====
let timerInterval = null;
let totalSeconds = 0;
let remainingSeconds = 0;
let isRunning = false;
let currentMode = 'timer';

// Pomodoro state
let pomodoroSession = 1;
let pomodoroType = 'work';
let completedPomodoros = 0;

// Tasks state
let tasks = [];
let taskIdCounter = 0;

// Settings state
let currentTheme = 'purple';
let currentTimezone = 'America/Guayaquil';
let currentLanguage = 'es';
let soundEnabled = true;
let backgroundEnabled = true;
let customBgUrl = '';

// Audio context
let audioContext;
let hasInteracted = false;

// ===== DOM ELEMENTS =====
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

const workDurationInput = document.getElementById('workDuration');
const breakDurationInput = document.getElementById('breakDuration');
const longBreakDurationInput = document.getElementById('longBreakDuration');

const sessionCountDisplay = document.getElementById('sessionCount');
const sessionTypeDisplay = document.getElementById('sessionType');

const timerModeDiv = document.getElementById('timerMode');
const pomodoroModeDiv = document.getElementById('pomodoroMode');

const clockTimeDisplay = document.getElementById('clockTime');
const clockDateDisplay = document.getElementById('clockDate');
const clockLabelDisplay = document.getElementById('clockLabel');

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');

const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettings');
const saveSettingsBtn = document.getElementById('saveSettings');

const timezoneSelect = document.getElementById('timezoneSelect');
const languageSelect = document.getElementById('languageSelect');
const soundToggle = document.getElementById('soundToggle');
const backgroundToggle = document.getElementById('backgroundToggle');
const customBgUrlInput = document.getElementById('customBgUrl');

const progressCircle = document.querySelector('.progress-ring-circle');
const radius = 120;
const circumference = 2 * Math.PI * radius;

// ===== INITIALIZATION =====
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = 0;

// Add gradient to SVG
const svg = document.querySelector('.progress-ring');
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
gradient.setAttribute('id', 'gradient');
gradient.setAttribute('x1', '0%');
gradient.setAttribute('y1', '0%');
gradient.setAttribute('x2', '100%');
gradient.setAttribute('y2', '100%');

const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop1.setAttribute('offset', '0%');
stop1.setAttribute('style', 'stop-color:#a591ef;stop-opacity:1');

const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop2.setAttribute('offset', '100%');
stop2.setAttribute('style', 'stop-color:#6c5fcf;stop-opacity:1');

gradient.appendChild(stop1);
gradient.appendChild(stop2);
defs.appendChild(gradient);
svg.insertBefore(defs, svg.firstChild);

// Initialize audio context on first interaction
document.addEventListener('click', () => {
    if (!hasInteracted) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        hasInteracted = true;
    }
}, { once: true });

// ===== SETTINGS FUNCTIONS =====
function loadSettings() {
    const savedSettings = localStorage.getItem('timerSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        currentTheme = settings.theme || 'purple';
        currentTimezone = settings.timezone || 'America/Guayaquil';
        currentLanguage = settings.language || 'es';
        soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true;
        backgroundEnabled = settings.backgroundEnabled !== undefined ? settings.backgroundEnabled : true;
        customBgUrl = settings.customBgUrl || '';
    }

    const t = translations[currentLanguage];

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Update clock label
    updateClockLabel();

    // Update empty state if visible
    if (tasks.length === 0) {
        tasksList.innerHTML = `<div class="empty-state">${t.emptyTasks}</div>`;
    }

    function updateClockLabel() {
        const t = translations[currentLanguage];
        const tzName = timezoneNames[currentTimezone];
        if (tzName && tzName[currentLanguage]) {
            clockLabelDisplay.textContent = tzName[currentLanguage];
        }
    }

    // Apply theme and background settings
    applyTheme(currentTheme);
    applyBackgroundSetting(backgroundEnabled);
    applyCustomBackground(customBgUrl);
}

// ===== THEME AND SETTINGS FUNCTIONS =====
function applyTheme(themeName) {
    currentTheme = themeName;
    document.body.setAttribute('data-theme', themeName);

    // Update active theme card
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.theme === themeName) {
            card.classList.add('active');
        }
    });

    // Update SVG gradient colors based on theme
    updateGradientColors(themeName);
}

function updateGradientColors(themeName) {
    const themeColors = {
        purple: { start: '#a591ef', end: '#6c5fcf' },
        ocean: { start: '#00a8e8', end: '#0077be' },
        sunset: { start: '#ff8e53', end: '#ff6b6b' },
        forest: { start: '#52b788', end: '#2d6a4f' },
        rose: { start: '#f472b6', end: '#d946ef' },
        midnight: { start: '#a78bfa', end: '#7c3aed' }
    };

    const colors = themeColors[themeName] || themeColors.purple;
    const stop1 = document.querySelector('#gradient stop:first-child');
    const stop2 = document.querySelector('#gradient stop:last-child');

    if (stop1 && stop2) {
        stop1.setAttribute('style', `stop-color:${colors.start};stop-opacity:1`);
        stop2.setAttribute('style', `stop-color:${colors.end};stop-opacity:1`);
    }
}

function applyBackgroundSetting(enabled) {
    backgroundEnabled = enabled;
    if (enabled) {
        document.body.classList.remove('no-animated-bg');
    } else {
        document.body.classList.add('no-animated-bg');
    }
}

function applyCustomBackground(url) {
    customBgUrl = url;
    if (url && url.trim() !== '') {
        // Remove gradient and apply custom background
        document.body.classList.add('custom-bg');

        // Create or update the style rule for custom background
        let styleElement = document.getElementById('custom-bg-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'custom-bg-style';
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            body.custom-bg::before {
                background: url('${url}') !important;
                background-size: cover !important;
                background-position: center !important;
                background-repeat: no-repeat !important;
                animation: none !important;
            }
        `;
    } else {
        // Remove custom background and restore gradient
        document.body.classList.remove('custom-bg');
        const styleElement = document.getElementById('custom-bg-style');
        if (styleElement) {
            styleElement.remove();
        }
    }
}

function saveSettings() {
    // Get all settings values
    const settings = {
        theme: currentTheme,
        timezone: timezoneSelect.value,
        language: languageSelect.value,
        soundEnabled: soundToggle.checked,
        backgroundEnabled: backgroundToggle.checked,
        customBgUrl: customBgUrlInput.value.trim()
    };

    // Save to localStorage
    localStorage.setItem('timerSettings', JSON.stringify(settings));

    // Apply settings
    currentTimezone = settings.timezone;
    currentLanguage = settings.language;
    soundEnabled = settings.soundEnabled;
    customBgUrl = settings.customBgUrl;

    applyTheme(settings.theme);
    applyBackgroundSetting(settings.backgroundEnabled);
    applyCustomBackground(settings.customBgUrl);

    // Update UI with new language
    loadSettings();

    // Close modal
    settingsModal.classList.remove('active');
}

function syncSettingsUI() {
    // Sync theme cards
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.theme === currentTheme) {
            card.classList.add('active');
        }
    });

    // Sync select inputs
    timezoneSelect.value = currentTimezone;
    languageSelect.value = currentLanguage;

    // Sync toggles
    soundToggle.checked = soundEnabled;
    backgroundToggle.checked = backgroundEnabled;

    // Sync custom background URL
    customBgUrlInput.value = customBgUrl;
}

// ===== SETTINGS EVENT LISTENERS =====
settingsBtn.addEventListener('click', () => {
    syncSettingsUI();
    settingsModal.classList.add('active');
});

closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('active');
});

settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('active');
    }
});

// Theme card click handlers
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
        currentTheme = card.dataset.theme;
        document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// Save settings button
saveSettingsBtn.addEventListener('click', saveSettings);



// ===== CLOCK FUNCTIONALITY =====
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { timeZone: currentTimezone });
    const localTime = new Date(timeString);

    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    const seconds = localTime.getSeconds().toString().padStart(2, '0');

    clockTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: currentTimezone
    };

    let locale = 'es-ES';
    if (currentLanguage === 'en') locale = 'en-US';
    else if (currentLanguage === 'pt') locale = 'pt-BR';
    else if (currentLanguage === 'fr') locale = 'fr-FR';

    const dateString = localTime.toLocaleDateString(locale, dateOptions);
    clockDateDisplay.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

setInterval(updateClock, 1000);
updateClock();

// ===== AUDIO NOTIFICATION =====
function playNotificationSound() {
    if (!soundEnabled) return;

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();

        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);

        oscillator2.frequency.value = 1000;
        oscillator2.type = 'sine';

        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.5);
    }, 200);
}

// ===== TIMER FUNCTIONS =====
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
        }

        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentMode = btn.dataset.mode;

        if (currentMode === 'timer') {
            timerModeDiv.classList.add('active');
            pomodoroModeDiv.classList.remove('active');
            updateTimerDisplay();
        } else {
            timerModeDiv.classList.remove('active');
            pomodoroModeDiv.classList.add('active');
            resetPomodoro();
        }
    });
});

[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('input', () => {
        if (!isRunning) {
            updateTimerDisplay();
        }
    });
});

[workDurationInput, breakDurationInput, longBreakDurationInput].forEach(input => {
    input.addEventListener('input', () => {
        if (!isRunning && currentMode === 'pomodoro') {
            updatePomodoroDisplay();
        }
    });
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function updateTimerDisplay() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    remainingSeconds = totalSeconds;

    displayTime(remainingSeconds);
    updateProgress();
}

function updatePomodoroDisplay() {
    let duration;
    if (pomodoroType === 'work') {
        duration = parseInt(workDurationInput.value) || 25;
    } else if (pomodoroType === 'longBreak') {
        duration = parseInt(longBreakDurationInput.value) || 15;
    } else {
        duration = parseInt(breakDurationInput.value) || 5;
    }

    totalSeconds = duration * 60;
    remainingSeconds = totalSeconds;

    displayTime(remainingSeconds);
    updateProgress();
    updatePomodoroStats();
}

function displayTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
        timeDisplay.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        timeDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

function updateProgress() {
    if (totalSeconds === 0) {
        progressCircle.style.strokeDashoffset = 0;
        return;
    }

    const progress = remainingSeconds / totalSeconds;
    const offset = circumference - (progress * circumference);
    progressCircle.style.strokeDashoffset = offset;
}

function updatePomodoroStats() {
    const t = translations[currentLanguage];
    sessionCountDisplay.textContent = pomodoroSession;

    if (pomodoroType === 'work') {
        sessionTypeDisplay.textContent = t.work;
    } else if (pomodoroType === 'longBreak') {
        sessionTypeDisplay.textContent = t.longBreak;
    } else {
        sessionTypeDisplay.textContent = t.break;
    }
}

function startTimer() {
    if (currentMode === 'timer') {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;

        if (hours === 0 && minutes === 0 && seconds === 0) {
            return;
        }

        if (!isRunning) {
            totalSeconds = hours * 3600 + minutes * 60 + seconds;
            remainingSeconds = totalSeconds;
        }
    } else {
        if (!isRunning) {
            updatePomodoroDisplay();
        }
    }

    if (remainingSeconds === 0) {
        return;
    }

    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    timerInterval = setInterval(() => {
        remainingSeconds--;
        displayTime(remainingSeconds);
        updateProgress();

        if (remainingSeconds <= 0) {
            timerComplete();
        }
    }, 1000);
}

function pauseTimer() {
    stopTimer();
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    stopTimer();

    if (currentMode === 'timer') {
        updateTimerDisplay();
    } else {
        resetPomodoro();
    }
}

function resetPomodoro() {
    pomodoroSession = 1;
    pomodoroType = 'work';
    completedPomodoros = 0;
    updatePomodoroDisplay();
}

function timerComplete() {
    stopTimer();

    playNotificationSound();

    const t = translations[currentLanguage];
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(t.timeComplete, {
            body: currentMode === 'pomodoro' && pomodoroType === 'work' ? t.goodWork : t.timeUp
        });
    }

    timeDisplay.style.animation = 'pulse 0.5s ease-in-out 3';
    setTimeout(() => {
        timeDisplay.style.animation = '';
    }, 1500);

    if (currentMode === 'pomodoro') {
        handlePomodoroComplete();
    }
}

function handlePomodoroComplete() {
    if (pomodoroType === 'work') {
        completedPomodoros++;

        if (completedPomodoros % 4 === 0) {
            pomodoroType = 'longBreak';
        } else {
            pomodoroType = 'break';
        }
    } else {
        pomodoroType = 'work';
        pomodoroSession++;
    }

    updatePomodoroDisplay();
}

// ===== TASK MANAGEMENT =====
function loadTasks() {
    const savedTasks = localStorage.getItem('aestheticTimerTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        taskIdCounter = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 0;
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('aestheticTimerTasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = '';
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const t = translations[currentLanguage];

    if (tasks.length === 0) {
        tasksList.innerHTML = `<div class="empty-state">${t.emptyTasks}</div>`;
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
            <div class="task-text">${escapeHtml(task.text)}</div>
            <button class="task-delete" onclick="deleteTask(${task.id})">×</button>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// ===== INITIALIZE APP =====
loadSettings();
updateTimerDisplay();
loadTasks();
