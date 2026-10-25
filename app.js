document.addEventListener('DOMContentLoaded', () => {
    
    let currentTrack = null; 
    let currentStepIndex = 0;
    let trackViews = []; 

    const UI = {
        homeView: document.getElementById('view-home'),
        mainHeader: document.getElementById('mainHeader'),
        userBadge: document.getElementById('userTypeBadge'),
        stepTitle: document.getElementById('headerStepTitle'),
        btnHome: document.getElementById('btnHome'),
        bottomNav: document.getElementById('bottomNav'),
        btnNext: document.getElementById('btnNext'),
        btnPrev: document.getElementById('btnPrev'),
        progress: document.getElementById('progressIndicator')
    };

    const patientViews = ['view-p-1', 'view-p-2', 'view-p-3', 'view-p-4'];
    const companionViews = ['view-c-1', 'view-c-2', 'view-c-3'];

    window.startJourney = function(role) {
        currentTrack = role;
        currentStepIndex = 0;
        trackViews = role === 'patient' ? patientViews : companionViews;

        UI.userBadge.textContent = role === 'patient' ? 'مسار المريض' : 'مسار المرافق';
        UI.mainHeader.style.display = 'block'; 
        UI.bottomNav.style.display = 'flex';   

        renderView();
    };

    window.goHome = function() {
        trackViews.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.remove('active');
        });
        
        currentTrack = null;
        currentStepIndex = 0;
        trackViews = [];

        UI.homeView.classList.add('active');
        UI.mainHeader.style.display = 'none';
        UI.bottomNav.style.display = 'none';
        
        if(document.getElementById('stopTrainBtn')) {
            document.getElementById('stopTrainBtn').click();
        }
    };

    if(UI.btnHome) UI.btnHome.addEventListener('click', goHome);

    if(UI.btnNext) {
        UI.btnNext.addEventListener('click', () => {
            if (currentStepIndex < trackViews.length - 1) {
                currentStepIndex++;
                renderView();
            }
        });
    }

    if(UI.btnPrev) {
        UI.btnPrev.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                renderView();
            }
        });
    }

    function renderView() {
        UI.homeView.classList.remove('active');

        trackViews.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.remove('active');
        });

        const currentViewId = trackViews[currentStepIndex];
        const currentViewEl = document.getElementById(currentViewId);
        
        if(currentViewEl) {
            currentViewEl.classList.add('active');
            UI.stepTitle.textContent = currentViewEl.getAttribute('data-title');
        }

        UI.progress.textContent = `الصفحة ${currentStepIndex + 1} من ${trackViews.length}`;
        UI.btnPrev.disabled = currentStepIndex === 0;
        UI.btnNext.disabled = currentStepIndex === trackViews.length - 1;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
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
            phaseTimeout = setTimeout(startCycle, 15000); 
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
