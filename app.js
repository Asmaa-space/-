document.addEventListener('DOMContentLoaded', () => {
    
    // --- متغيرات الحالة ---
    let currentTrack = null; 
    let currentStepIndex = 0;
    let trackViews = []; 

    // --- عناصر الـ DOM ---
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

    // مصفوفات تحمل معرفات (IDs) الصفحات لكل مسار
    const patientViews = ['view-p-1', 'view-p-2', 'view-p-3', 'view-p-4'];
    const companionViews = ['view-c-1', 'view-c-2', 'view-c-3'];

    // --- دوال التنقل الأساسية ---

    // 1. الدخول למسار معين
    window.startJourney = function(role) {
        currentTrack = role;
        currentStepIndex = 0;
        trackViews = role === 'patient' ? patientViews : companionViews;

        // تحديث الشريط العلوي
        UI.userBadge.textContent = role === 'patient' ? 'مسار المريض' : 'مسار المرافق';
        UI.mainHeader.style.display = 'block'; // إظهار الشريط العلوي الذي يحوي الشعار الصغير
        UI.bottomNav.style.display = 'flex';   // إظهار أزرار التنقل

        renderView();
    };

    // 2. العودة للرئيسية
    window.goHome = function() {
        // إخفاء جميع صفحات المسار
        trackViews.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.remove('active');
        });
        
        // إعادة تعيين المتغيرات
        currentTrack = null;
        currentStepIndex = 0;
        trackViews = [];

        // إرجاع واجهة المستخدم لحالتها الأولى
        UI.homeView.classList.add('active');
        UI.mainHeader.style.display = 'none';
        UI.bottomNav.style.display = 'none';
        
        // إيقاف أداة التنفس إذا كانت تعمل
        if(document.getElementById('stopTrainBtn')) {
            document.getElementById('stopTrainBtn').click();
        }
    };

    if(UI.btnHome) UI.btnHome.addEventListener('click', goHome);

    // 3. زر التالي
    if(UI.btnNext) {
        UI.btnNext.addEventListener('click', () => {
            if (currentStepIndex < trackViews.length - 1) {
                currentStepIndex++;
                renderView();
            }
        });
    }

    // 4. زر السابق
    if(UI.btnPrev) {
        UI.btnPrev.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                renderView();
            }
        });
    }

    // 5. دالة تحديث الشاشة (إخفاء وإظهار)
    function renderView() {
        // إخفاء الصفحة الرئيسية
        UI.homeView.classList.remove('active');

        // إخفاء كل صفحات المسار الحالي
        trackViews.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.remove('active');
        });

        // إظهار الصفحة المطلوبة فقط
        const currentViewId = trackViews[currentStepIndex];
        const currentViewEl = document.getElementById(currentViewId);
        
        if(currentViewEl) {
            currentViewEl.classList.add('active');
            // تحديث عنوان الشريط العلوي بناءً على الصفحة
            UI.stepTitle.textContent = currentViewEl.getAttribute('data-title');
        }

        // تحديث شريط التقدم وأزرار التنقل
        UI.progress.textContent = `الصفحة ${currentStepIndex + 1} من ${trackViews.length}`;
        UI.btnPrev.disabled = currentStepIndex === 0;
        UI.btnNext.disabled = currentStepIndex === trackViews.length - 1;

        // الصعود لأعلى الصفحة بسلاسة
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- برمجة أداة التنفس التفاعلية (تعمل فقط في مسار المريض صفحة 3) ---
    
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
            phaseTimeout = setTimeout(startCycle, 15000); // 15 ثانية كهدف لحبس النفس
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
