document.addEventListener('DOMContentLoaded', () => {
    
    const UI = {
        homeView: document.getElementById('view-home'),
        mainHeader: document.getElementById('mainHeader'),
        userBadge: document.getElementById('userTypeBadge'),
        btnHome: document.getElementById('btnHome'),
        topNavLinks: document.getElementById('topNavLinks'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn')
    };

    // تعريف مسارات الصفحات وعناوينها للشريط العلوي
    const tracks = {
        patient: [
            { id: 'view-p-1', label: 'خريطة المسار' },
            { id: 'view-p-2', label: 'المحتوى التثقيفي' },
            { id: 'view-p-3', label: 'التدريب العملي' },
            { id: 'view-p-4', label: 'المراجعة' }
        ],
        companion: [
            { id: 'view-c-1', label: 'خريطة المسار' },
            { id: 'view-c-2', label: 'فهم التقنية' },
            { id: 'view-c-3', label: 'المساعدة' }
        ]
    };

    let currentTrack = [];

    // --- إظهار القائمة في الجوال ---
    if(UI.mobileMenuBtn) {
        UI.mobileMenuBtn.addEventListener('click', () => {
            UI.topNavLinks.classList.toggle('show');
        });
    }

    // --- بدء الرحلة ---
    window.startJourney = function(role) {
        currentTrack = tracks[role];
        
        UI.userBadge.textContent = role === 'patient' ? 'مريض' : 'مرافق';
        UI.mainHeader.style.display = 'block'; 

        // بناء أزرار الشريط العلوي ديناميكياً
        UI.topNavLinks.innerHTML = '';
        currentTrack.forEach((step, index) => {
            const btn = document.createElement('button');
            btn.className = 'nav-link';
            btn.textContent = step.label;
            btn.onclick = () => renderView(step.id, btn);
            UI.topNavLinks.appendChild(btn);
        });

        // فتح أول صفحة تلقائياً
        if(currentTrack.length > 0) {
            renderView(currentTrack[0].id, UI.topNavLinks.firstChild);
        }
    };

    // --- العودة للرئيسية ---
    window.goHome = function() {
        // إخفاء جميع الصفحات
        document.querySelectorAll('.step-view').forEach(el => el.classList.remove('active'));
        
        UI.homeView.classList.add('active');
        UI.mainHeader.style.display = 'none';
        UI.topNavLinks.classList.remove('show');
        
        // إيقاف أداة التنفس إذا كانت تعمل
        if(document.getElementById('stopTrainBtn')) {
            document.getElementById('stopTrainBtn').click();
        }
    };

    if(UI.btnHome) UI.btnHome.addEventListener('click', goHome);

    // --- التنقل بين الصفحات ---
    function renderView(viewId, clickedBtn) {
        // إخفاء الرئيسية وجميع الصفحات
        UI.homeView.classList.remove('active');
        document.querySelectorAll('.step-view').forEach(el => el.classList.remove('active'));

        // إظهار الصفحة المحددة
        const currentViewEl = document.getElementById(viewId);
        if(currentViewEl) currentViewEl.classList.add('active');

        // تحديث شكل الزر النشط في الشريط العلوي
        document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
        if(clickedBtn) clickedBtn.classList.add('active');

        // إغلاق قائمة الجوال بعد الاختيار
        UI.topNavLinks.classList.remove('show');

        // إيقاف التنفس إذا خرج المستخدم من صفحة التدريب
        if(viewId !== 'view-p-3' && document.getElementById('stopTrainBtn')) {
            document.getElementById('stopTrainBtn').click();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // --- برمجة أداة التنفس التفاعلية ---
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
