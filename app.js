document.addEventListener('DOMContentLoaded', () => {
    
    // --- State Variables ---
    let currentTrack = null; // 'patient' or 'companion'
    let currentStepIndex = 0;
    let trackViews = []; // Array of DOM IDs for the current track

    // --- DOM Elements ---
    const UI = {
        homeView: document.getElementById('view-home'),
        headerInfo: document.getElementById('headerInfo'),
        userBadge: document.getElementById('userTypeBadge'),
        stepTitle: document.getElementById('headerStepTitle'),
        btnHome: document.getElementById('btnHome'),
        bottomNav: document.getElementById('bottomNav'),
        btnNext: document.getElementById('btnNext'),
        btnPrev: document.getElementById('btnPrev'),
        progress: document.getElementById('progressIndicator')
    };

    // Arrays defining the pages for each track
    const patientViews = ['view-p-1', 'view-p-2', 'view-p-3', 'view-p-4'];
    const companionViews = ['view-c-1', 'view-c-2', 'view-c-3'];

    // --- Main Navigation Functions ---

    window.startJourney = function(role) {
        currentTrack = role;
        currentStepIndex = 0;
        trackViews = role === 'patient' ? patientViews : companionViews;

        // Update Header
        UI.userBadge.textContent = role === 'patient' ? 'مسار المريض' : 'مسار المرافق';
        UI.headerInfo.style.display = 'flex';
        UI.btnHome.style.display = 'block';
        UI.bottomNav.style.display = 'flex';

        renderView();
    };

    window.goHome = function() {
        // Hide all track views
        trackViews.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.remove('active');
        });
        
        // Reset state
        currentTrack = null;
        currentStepIndex = 0;
        trackViews = [];

        // Update UI
        UI.homeView.classList.add('active');
        UI.headerInfo.style.display = 'none';
        UI.btnHome.style.display = 'none';
        UI.bottomNav.style.display = 'none';
        
        // Stop breathing tool if active
        if(document.getElementById('stopTrainBtn')) {
            document.getElementById('stopTrainBtn').click();
        }
    };

    UI.btnHome.addEventListener('click', goHome);

    UI.btnNext.addEventListener('click', () => {
        if (currentStepIndex < trackViews.length - 1) {
            currentStepIndex++;
            renderView();
        }
    });

    UI.btnPrev.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            renderView();
        }
    });

    function renderView() {
        // 1. Hide Home
        UI.homeView.classList.remove('active');

        // 2. Hide all views in the current track
        trackViews.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.remove('active');
        });

        // 3. Show current step view
        const currentViewId = trackViews[currentStepIndex];
        const currentViewEl = document.getElementById(currentViewId);
        currentViewEl.classList.add('active');

        // 4. Update Header Title based on the data-title attribute of the view
        UI.stepTitle.textContent = currentViewEl.getAttribute('data-title');

        // 5. Update Progress Bar & Buttons
        UI.progress.textContent = `الصفحة ${currentStepIndex + 1} من ${trackViews.length}`;
        UI.btnPrev.disabled = currentStepIndex === 0;
        UI.btnNext.disabled = currentStepIndex === trackViews.length - 1;

        // Scroll to top of the content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Breathing Tool Logic (Only in Patient Track - view-p-3) ---
    
    let breathTimerInt, phaseTimeout;
    let bPhase = 'ready', bTime = 0;
    
    const breathUI = {
        circle: document.getElementById('breathCircle'),
        inst: document.getElementById('breath-inst'),
        timer: document.getElementById('breath-timer'),
        btnStart: document.getElementById('startTrainBtn'),
        btnStop: document.getElementById('stopTrainBtn')
    };

    function startCycle() {
        if (bPhase === 'ready' || bPhase === 'exhale') {
            bPhase = 'inhale';
            breathUI.inst.textContent = "شهيق عميق";
            breathUI.circle.className = 'breath-circle inhale';
            phaseTimeout = setTimeout(startCycle, 4000);
        } else if (bPhase === 'inhale') {
            bPhase = 'hold';
            breathUI.inst.textContent = "احبسي نفسك";
            breathUI.circle.className = 'breath-circle hold';
            phaseTimeout = setTimeout(startCycle, 15000); // 15 sec hold
        } else if (bPhase === 'hold') {
            bPhase = 'exhale';
            breathUI.inst.textContent = "زفير ببطء";
            breathUI.circle.className = 'breath-circle exhale';
            phaseTimeout = setTimeout(startCycle, 6000);
        }
    }

    if(breathUI.btnStart && breathUI.btnStop) {
        breathUI.btnStart.addEventListener('click', () => {
            breathUI.btnStart.style.display = 'none';
            breathUI.btnStop.style.display = 'inline-block';
            bPhase = 'ready'; bTime = 0;
            
            startCycle();
            
            breathTimerInt = setInterval(() => {
                bTime++;
                const m = Math.floor(bTime / 60).toString().padStart(2, '0');
                const s = (bTime % 60).toString().padStart(2, '0');
                breathUI.timer.textContent = `${m}:${s}`;
            }, 1000);
        });

        breathUI.btnStop.addEventListener('click', () => {
            clearInterval(breathTimerInt);
            clearTimeout(phaseTimeout);
            breathUI.circle.className = 'breath-circle';
            breathUI.inst.textContent = "جاهز؟";
            breathUI.timer.textContent = "00:00";
            breathUI.btnStart.style.display = 'inline-block';
            breathUI.btnStop.style.display = 'none';
        });
    }

});
