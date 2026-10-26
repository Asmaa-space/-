document.addEventListener('DOMContentLoaded', () => {
    
    // عناصر الواجهة
    const UI = {
        homeView: document.getElementById('view-home'),
        btnRolePatient: document.getElementById('btnRolePatient'),
        btnRoleCompanion: document.getElementById('btnRoleCompanion'),
        btnHome: document.getElementById('btnHome'),
        topNavLinks: document.getElementById('topNavLinks'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        views: document.querySelectorAll('.step-view')
    };

    // تعريف مسارات الصفحات وعناوينها
    const tracks = {
        patient: [
            { id: 'view-p-1', label: 'الدليل الإرشادي' },
            { id: 'view-p-2', label: 'الاستكشاف' },
            { id: 'view-p-3', label: 'التدريب' },
            { id: 'view-p-4', label: 'المكتبة والأسئلة' }
        ],
        companion: [
            { id: 'view-c-1', label: 'دليل المرافق' },
            { id: 'view-c-2', label: 'فهم التقنية' },
            { id: 'view-c-3', label: 'المساعدة' }
        ]
    };

    // إظهار/إخفاء قائمة الجوال
    if(UI.mobileMenuBtn) {
        UI.mobileMenuBtn.addEventListener('click', () => {
            UI.topNavLinks.classList.toggle('show');
        });
    }

    // --- دالة بدء الرحلة ---
    function startJourney(role) {
        const currentTrack = tracks[role];
        
        // إظهار زر الرئيسية
        UI.btnHome.classList.remove('hidden');

        // بناء الشريط العلوي
        UI.topNavLinks.innerHTML = '';
        currentTrack.forEach((step) => {
            const btn = document.createElement('button');
            btn.className = 'nav-link';
            btn.textContent = step.label;
            btn.addEventListener('click', () => renderView(step.id, btn));
            UI.topNavLinks.appendChild(btn);
        });

        // فتح أول صفحة
        if(currentTrack.length > 0) {
            renderView(currentTrack[0].id, UI.topNavLinks.firstChild);
        }
    }

    // ربط أزرار البداية (هذا هو الإصلاح للمشكلة)
    if(UI.btnRolePatient) {
        UI.btnRolePatient.addEventListener('click', () => startJourney('patient'));
    }
    if(UI.btnRoleCompanion) {
        UI.btnRoleCompanion.addEventListener('click', () => startJourney('companion'));
    }

    // --- العودة للرئيسية ---
    function goHome() {
        UI.views.forEach(el => el.classList.remove('active'));
        UI.homeView.classList.add('active');
        
        UI.topNavLinks.innerHTML = '';
        UI.btnHome.classList.add('hidden');
        UI.topNavLinks.classList.remove('show');
        
        if(document.getElementById('stopTrainBtn')) {
            document.getElementById('stopTrainBtn').click();
        }
    }

    if(UI.btnHome) {
        UI.btnHome.addEventListener('click', goHome);
    }

    // --- التنقل بين الصفحات ---
    function renderView(viewId, clickedBtn) {
        UI.views.forEach(el => el.classList.remove('active'));

        const currentViewEl = document.getElementById(viewId);
        if(currentViewEl) currentViewEl.classList.add('active');

        document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
        if(clickedBtn) clickedBtn.classList.add('active');

        UI.topNavLinks.classList.remove('show');

        // إيقاف التنفس إذا خرج المستخدم
        if(viewId !== 'view-p-3' && document.getElementById('stopTrainBtn')) {
            document.getElementById('stopTrainBtn').click();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // --- برمجة أداة التنفس ---
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
            breathUI.btnStart.classList.add('hidden');
            breathUI.btnStop.classList.remove('hidden');
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
            breathUI.btnStart.classList.remove('hidden');
            breathUI.btnStop.classList.add('hidden');
        });
    }
});
