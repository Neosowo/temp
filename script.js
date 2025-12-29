// ===== TRANSLATIONS =====
const translations = {
    es: {
        timer: 'Timer',
        pomodoro: 'Pomodoro',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
        session: 'Sesión',
        type: 'Tipo',
        work: 'Trabajo',
        break: 'Descanso',
        longBreak: 'Largo',
        start: 'Iniciar',
        pause: 'Pausar',
        reset: 'Reiniciar',
        taskList: 'Tareas',
        addTask: 'Nueva tarea...',
        emptyTasks: 'Sin tareas por ahora',
        timeComplete: '¡Tiempo completado!',
        goodWork: '¡Buen trabajo! Toma un descanso.',
        timeUp: '¡Tiempo terminado!',
        focus: 'Enfócate'
    },
    en: {
        timer: 'Timer',
        pomodoro: 'Pomodoro',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
        session: 'Session',
        type: 'Type',
        work: 'Work',
        break: 'Break',
        longBreak: 'Long',
        start: 'Start',
        pause: 'Pause',
        reset: 'Reset',
        taskList: 'Tasks',
        addTask: 'New task...',
        emptyTasks: 'No tasks yet',
        timeComplete: 'Time complete!',
        goodWork: 'Good work! Take a break.',
        timeUp: 'Time is up!',
        focus: 'Focus'
    },
    pt: {
        timer: 'Timer',
        pomodoro: 'Pomodoro',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
        session: 'Sessão',
        type: 'Tipo',
        work: 'Trabalho',
        break: 'Pausa',
        longBreak: 'Longa',
        start: 'Iniciar',
        pause: 'Pausar',
        reset: 'Reiniciar',
        taskList: 'Tarefas',
        addTask: 'Nova tarefa...',
        emptyTasks: 'Sem tarefas',
        timeComplete: 'Tempo completo!',
        goodWork: 'Bom trabalho! Faça uma pausa.',
        timeUp: 'O tempo acabou!',
        focus: 'Foco'
    },
    fr: {
        timer: 'Minuteur',
        pomodoro: 'Pomodoro',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
        session: 'Session',
        type: 'Type',
        work: 'Travail',
        break: 'Pause',
        longBreak: 'Longue',
        start: 'Démarrer',
        pause: 'Pause',
        reset: 'Réinitialiser',
        taskList: 'Tâches',
        addTask: 'Nouvelle tâche...',
        emptyTasks: 'Aucune tâche',
        timeComplete: 'Temps terminé!',
        goodWork: 'Bon travail! Prenez une pause.',
        timeUp: 'Le temps est écoulé!',
        focus: 'Concentrez-vous'
    }
};

// ===== TIMEZONE DATA =====
const timezoneNames = {
    'America/Guayaquil': { es: 'Guayaquil', en: 'Guayaquil', pt: 'Guayaquil', fr: 'Guayaquil' },
    'America/New_York': { es: 'Nueva York', en: 'New York', pt: 'Nova York', fr: 'New York' },
    'America/Los_Angeles': { es: 'Los Ángeles', en: 'Los Angeles', pt: 'Los Angeles', fr: 'Los Angeles' },
    'America/Chicago': { es: 'Chicago', en: 'Chicago', pt: 'Chicago', fr: 'Chicago' },
    'America/Mexico_City': { es: 'CDMX', en: 'Mexico City', pt: 'Cidade do México', fr: 'Mexico' },
    'America/Bogota': { es: 'Bogotá', en: 'Bogotá', pt: 'Bogotá', fr: 'Bogotá' },
    'America/Lima': { es: 'Lima', en: 'Lima', pt: 'Lima', fr: 'Lima' },
    'America/Santiago': { es: 'Santiago', en: 'Santiago', pt: 'Santiago', fr: 'Santiago' },
    'America/Buenos_Aires': { es: 'Buenos Aires', en: 'Buenos Aires', pt: 'Buenos Aires', fr: 'Buenos Aires' },
    'America/Caracas': { es: 'Caracas', en: 'Caracas', pt: 'Caracas', fr: 'Caracas' },
    'America/Sao_Paulo': { es: 'São Paulo', en: 'São Paulo', pt: 'São Paulo', fr: 'São Paulo' },
    'Europe/Madrid': { es: 'Madrid', en: 'Madrid', pt: 'Madrid', fr: 'Madrid' },
    'Europe/London': { es: 'Londres', en: 'London', pt: 'Londres', fr: 'Londres' },
    'Europe/Paris': { es: 'París', en: 'Paris', pt: 'Paris', fr: 'Paris' },
    'Asia/Tokyo': { es: 'Tokio', en: 'Tokyo', pt: 'Tóquio', fr: 'Tokyo' },
    'Asia/Shanghai': { es: 'Shanghái', en: 'Shanghai', pt: 'Xangai', fr: 'Shanghai' },
    'Asia/Dubai': { es: 'Dubái', en: 'Dubai', pt: 'Dubai', fr: 'Dubaï' },
    'Australia/Sydney': { es: 'Sídney', en: 'Sydney', pt: 'Sydney', fr: 'Sydney' }
};

// ===== STATE =====
let timerInterval = null;
let totalSeconds = 0;
let remainingSeconds = 0;
let isRunning = false;
let currentMode = 'timer';

let pomodoroSession = 1;
let pomodoroType = 'work';
let completedPomodoros = 0;

let tasks = [];
let taskIdCounter = 0;

let currentTheme = 'purple';
let currentTimezone = 'America/Guayaquil';
let currentLanguage = 'es';
let soundEnabled = true;
let backgroundEnabled = true;

let audioContext;

// ===== DOM ELEMENTS =====
const timeDisplay = document.getElementById('timeDisplay');
const timerLabel = document.getElementById('timerLabel');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const skipBtn = document.getElementById('skipBtn');

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
const taskCountBadge = document.getElementById('taskCount');

const tasksToggle = document.getElementById('tasksToggle');
const tasksDrawer = document.getElementById('tasksDrawer');
const closeDrawer = document.getElementById('closeDrawer');

const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const saveSettingsBtn = document.getElementById('saveSettings');

const timezoneSelect = document.getElementById('timezoneSelect');
const languageSelect = document.getElementById('languageSelect');
const soundToggle = document.getElementById('soundToggle');
const backgroundToggle = document.getElementById('backgroundToggle');

const progressCircle = document.querySelector('.ring-progress');
const radius = 90;
const circumference = 2 * Math.PI * radius;

// ===== INITIALIZATION =====
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = 0;

// ===== SETTINGS =====
function loadSettings() {
    const saved = localStorage.getItem('timerSettings');
    if (saved) {
        const s = JSON.parse(saved);
        currentTheme = s.theme || 'purple';
        currentTimezone = s.timezone || 'America/Guayaquil';
        currentLanguage = s.language || 'es';
        soundEnabled = s.soundEnabled !== undefined ? s.soundEnabled : true;
        backgroundEnabled = s.backgroundEnabled !== undefined ? s.backgroundEnabled : true;
    }

    applyTheme(currentTheme);
    applyBackground(backgroundEnabled);
    updateTranslations();
    updateClockLabel();
}

function updateTranslations() {
    const t = translations[currentLanguage];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });

    if (tasks.length === 0) {
        tasksList.innerHTML = `<li class="empty-tasks">${t.emptyTasks}</li>`;
    }
}

function updateClockLabel() {
    const tzName = timezoneNames[currentTimezone];
    if (tzName && tzName[currentLanguage]) {
        clockLabelDisplay.textContent = tzName[currentLanguage];
    }
}

function applyTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);

    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.theme === theme);
    });

    updateGradientColors(theme);
}

function updateGradientColors(theme) {
    const colors = {
        purple: ['#a855f7', '#38bdf8', '#f472b6'],
        ocean: ['#22d3ee', '#3b82f6', '#06b6d4'],
        sunset: ['#fb923c', '#f43f5e', '#fbbf24'],
        forest: ['#4ade80', '#2dd4bf', '#a3e635'],
        rose: ['#f472b6', '#c084fc', '#fb7185'],
        midnight: ['#818cf8', '#a78bfa', '#60a5fa']
    };

    const c = colors[theme] || colors.purple;
    const stops = document.querySelectorAll('#gradient stop');

    if (stops.length >= 3) {
        stops[0].style.stopColor = c[0];
        stops[1].style.stopColor = c[1];
        stops[2].style.stopColor = c[2];
    }
}

function applyBackground(enabled) {
    backgroundEnabled = enabled;
    document.body.classList.toggle('no-animated-bg', !enabled);
}

function saveSettings() {
    const settings = {
        theme: currentTheme,
        timezone: timezoneSelect.value,
        language: languageSelect.value,
        soundEnabled: soundToggle.checked,
        backgroundEnabled: backgroundToggle.checked
    };

    localStorage.setItem('timerSettings', JSON.stringify(settings));

    currentTimezone = settings.timezone;
    currentLanguage = settings.language;
    soundEnabled = settings.soundEnabled;

    applyTheme(settings.theme);
    applyBackground(settings.backgroundEnabled);
    updateTranslations();
    updateClockLabel();

    settingsModal.classList.remove('open');
}

function syncSettingsUI() {
    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.theme === currentTheme);
    });
    timezoneSelect.value = currentTimezone;
    languageSelect.value = currentLanguage;
    soundToggle.checked = soundEnabled;
    backgroundToggle.checked = backgroundEnabled;
}

// ===== SETTINGS EVENTS =====
settingsBtn.addEventListener('click', () => {
    syncSettingsUI();
    settingsModal.classList.add('open');
});

settingsModal.addEventListener('click', e => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('open');
    }
});

document.querySelectorAll('.theme-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        currentTheme = dot.dataset.theme;
        applyTheme(currentTheme);
    });
});

saveSettingsBtn.addEventListener('click', saveSettings);

// ===== TASKS DRAWER =====
tasksToggle.addEventListener('click', () => {
    tasksDrawer.classList.add('open');
});

closeDrawer.addEventListener('click', () => {
    tasksDrawer.classList.remove('open');
});

// ===== CLOCK =====
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { timeZone: currentTimezone });
    const localTime = new Date(timeString);

    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');

    clockTimeDisplay.textContent = `${hours}:${minutes}`;

    const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: currentTimezone
    };

    let locale = 'es-ES';
    if (currentLanguage === 'en') locale = 'en-US';
    else if (currentLanguage === 'pt') locale = 'pt-BR';
    else if (currentLanguage === 'fr') locale = 'fr-FR';

    clockDateDisplay.textContent = localTime.toLocaleDateString(locale, dateOptions);
}

setInterval(updateClock, 1000);
updateClock();

// ===== AUDIO =====
function playNotificationSound() {
    if (!soundEnabled) return;

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.value = 800;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.5);

    setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();

        osc2.connect(gain2);
        gain2.connect(audioContext.destination);

        osc2.frequency.value = 1000;
        osc2.type = 'sine';

        gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.5);
    }, 200);
}

// ===== MODE SWITCHING =====
document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
        if (isRunning) stopTimer();

        document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
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

// ===== PICKER BUTTONS =====
document.querySelectorAll('.picker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        const action = btn.dataset.action;
        const input = document.getElementById(target);
        let value = parseInt(input.value) || 0;

        if (action === 'up') {
            value++;
            if (target === 'hours' && value > 23) value = 0;
            if ((target === 'minutes' || target === 'seconds') && value > 59) value = 0;
        } else {
            value--;
            if (value < 0) {
                if (target === 'hours') value = 23;
                else value = 59;
            }
        }

        input.value = value;
        if (!isRunning) updateTimerDisplay();
    });
});

[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('input', () => {
        if (!isRunning) updateTimerDisplay();
    });
});

[workDurationInput, breakDurationInput, longBreakDurationInput].forEach(input => {
    input.addEventListener('input', () => {
        if (!isRunning && currentMode === 'pomodoro') {
            updatePomodoroDisplay();
        }
    });
});

// ===== TIMER FUNCTIONS =====
function updateTimerDisplay() {
    const h = parseInt(hoursInput.value) || 0;
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;

    totalSeconds = h * 3600 + m * 60 + s;
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
        timeDisplay.textContent = `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        timerLabel.textContent = t.focus;
    } else if (pomodoroType === 'longBreak') {
        sessionTypeDisplay.textContent = t.longBreak;
        timerLabel.textContent = t.break;
    } else {
        sessionTypeDisplay.textContent = t.break;
        timerLabel.textContent = t.break;
    }
}

// ===== TIMER CONTROLS =====
startBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

skipBtn.addEventListener('click', () => {
    if (currentMode === 'pomodoro') {
        handlePomodoroComplete();
    }
});

function startTimer() {
    if (currentMode === 'timer') {
        const h = parseInt(hoursInput.value) || 0;
        const m = parseInt(minutesInput.value) || 0;
        const s = parseInt(secondsInput.value) || 0;

        if (h === 0 && m === 0 && s === 0) return;

        if (!isRunning) {
            totalSeconds = h * 3600 + m * 60 + s;
            remainingSeconds = totalSeconds;
        }
    } else {
        if (!isRunning) {
            updatePomodoroDisplay();
        }
    }

    if (remainingSeconds === 0) return;

    isRunning = true;
    updatePlayPauseIcon();

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
    updatePlayPauseIcon();
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

    if (currentMode === 'pomodoro') {
        handlePomodoroComplete();
    }
}

function handlePomodoroComplete() {
    if (pomodoroType === 'work') {
        completedPomodoros++;
        pomodoroType = completedPomodoros % 4 === 0 ? 'longBreak' : 'break';
    } else {
        pomodoroType = 'work';
        pomodoroSession++;
    }

    updatePomodoroDisplay();
}

function updatePlayPauseIcon() {
    const playIcon = startBtn.querySelector('.icon-play');
    const pauseIcon = startBtn.querySelector('.icon-pause');

    if (isRunning) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// ===== TASKS =====
function loadTasks() {
    const saved = localStorage.getItem('aestheticTimerTasks');
    if (saved) {
        tasks = JSON.parse(saved);
        taskIdCounter = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 0;
        renderTasks();
    } else {
        const t = translations[currentLanguage];
        tasksList.innerHTML = `<li class="empty-tasks">${t.emptyTasks}</li>`;
    }
    updateTaskCount();
}

function saveTasks() {
    localStorage.setItem('aestheticTimerTasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: taskIdCounter++,
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();
    updateTaskCount();
    taskInput.value = '';
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
    updateTaskCount();
}

function renderTasks() {
    const t = translations[currentLanguage];

    if (tasks.length === 0) {
        tasksList.innerHTML = `<li class="empty-tasks">${t.emptyTasks}</li>`;
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <li class="${task.completed ? 'completed' : ''}">
            <span class="task-check ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></span>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="task-delete" onclick="deleteTask(${task.id})">×</button>
        </li>
    `).join('');
}

function updateTaskCount() {
    const pending = tasks.filter(t => !t.completed).length;
    taskCountBadge.textContent = pending;
    taskCountBadge.classList.toggle('visible', pending > 0);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

// ===== NOTIFICATION PERMISSION =====
if ('Notification' in window && Notification.permission === 'default') {
    document.addEventListener('click', () => {
        Notification.requestPermission();
    }, { once: true });
}

// ===== INIT =====
loadSettings();
loadTasks();
updateTimerDisplay();

// Make functions global for onclick handlers
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
