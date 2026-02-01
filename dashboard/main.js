// Activity Log Logic
const logActivity = (message) => {
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
};

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    
    // Update button icon
    const isLight = body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '🌑' : '🌓';
    
    // Save preference
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Update Dashboard with Live Data from Koda
const updateLiveVibes = async () => {
    logActivity("Koda pulling live vibes from search and weather tools...");
    logActivity("YouTube brief updated: OpenClaw crosses 106k stars!");
    logActivity("X Trends synced: #CanadaTariffs and #OpenClaw viral");
    logActivity("Vibe coding trends identified: Antigravity + OpenClaw");
};

updateLiveVibes();

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggle.textContent = '🌑';
}

// Simulate background monitoring
setInterval(() => {
    const events = [
        "Monitoring Steinbach weather...",
        "Syncing Bible verse of the day",
        "Fetching Trump X-post updates",
        "Analyzing US/Canada relations",
        "Ready for next command from Cam"
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    logActivity(randomEvent);
}, 8000);

console.log("Vibe Dashboard v1.1 Initialized");
