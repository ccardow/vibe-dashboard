// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    fetchWeather();
    fetchVerse();
    fetchVibes();
    logActivity("Vibe Dashboard v1.3 Dynamic Initialized");
});

// Real-time Clock
function updateClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Local Vibe Sync (Politics/News)
async function fetchVibes() {
    try {
        const response = await fetch('vibes.json');
        const data = await response.json();
        
        if (data.politics) {
            document.getElementById('politics-headline').textContent = data.politics.headline;
            document.getElementById('politics-summary').textContent = data.politics.summary;
            logActivity(`Politics card synced: ${data.politics.source}`);
        }
    } catch (e) {
        console.log("Local vibes.json not found, waiting for agent sync.");
    }
}

// Weather Logic (Steinbach, MB)
async function fetchWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=49.5258&longitude=-96.6839&current_weather=true');
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        document.querySelector('.temp').textContent = `${temp}°C`;
        logActivity(`Weather updated: ${temp}°C in Steinbach`);
    } catch (e) {
        console.error("Weather fetch failed", e);
    }
}

// Bible Verse Logic
async function fetchVerse() {
    try {
        const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
        const data = await response.json();
        const verse = data[0];
        document.querySelector('.verse-text').textContent = `"${verse.text}"`;
        document.querySelector('.verse-ref').textContent = `${verse.bookname} ${verse.chapter}:${verse.verse}`;
        logActivity(`Daily inspiration synced: ${verse.bookname}`);
    } catch (e) {
        console.error("Verse fetch failed", e);
    }
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
        
        // Update button icon
        const isLight = body.classList.contains('light-theme');
        themeToggle.textContent = isLight ? '🌑' : '🌓';
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    if (themeToggle) themeToggle.textContent = '🌑';
}

// Activity Log Logic
function logActivity(message) {
    const log = document.getElementById('activity-log');
    if (!log) return;
    const item = document.createElement('div');
    item.className = 'log-item';
    item.textContent = `> ${new Date().toLocaleTimeString()}: ${message}`;
    log.prepend(item);
    
    // Keep log concise
    if (log.children.length > 10) {
        log.lastChild.remove();
    }
}

// Keep simulation for other vibes
setInterval(() => {
    const events = [
        "Analyzing US/Canada trade sentiment...",
        "Scanning X for @realDonaldTrump updates...",
        "Optimizing local memory buffers",
        "System: Heartbeat OK"
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    logActivity(randomEvent);
}, 15000);
