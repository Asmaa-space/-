document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. i18n (Translation System)
    // ==========================================
    const dict = {
        ar: {
            brandName: "KAMC Oncology", navJourney: "رحلة العلاج", navTreatments: "أنواع العلاج", navBreathing: "الاسترخاء",
            login: "تسجيل الدخول", logout: "تسجيل الخروج", heroTitle: "ما الذي تحتاج معرفته اليوم؟",
            heroDesc: "منصة رقمية موثوقة لمساندة مرضى الأورام ومرافقيهم.", cardNew: "تم تشخيصي حديثاً",
            cardSession: "لدي جلسة علاج", cardCaregiver: "أنا مرافق لمريض", cardAI: "التحدث للمساعد",
            journeyTitle: "الدليل الإرشادي لرحلة العلاج", step1: "التشخيص", step2: "الخطة", step3: "الاستعداد",
            prev: "السابق", next: "التالي", breathTitle: "أداة الاسترخاء الذهني", breathReady: "جاهز؟",
            start: "بدء", pause: "إيقاف", stop: "إنهاء", aiTitle: "المساعد التثقيفي الذكي", send: "إرسال",
            chatPlaceholder: "اكتب سؤالك هنا...", email: "البريد الإلكتروني", password: "كلمة المرور",
            toastLogin: "تم تسجيل الدخول بنجاح", toastLogout: "تم تسجيل الخروج", toastError: "حدث خطأ في الاتصال"
        },
        en: {
            brandName: "KAMC Oncology", navJourney: "Journey", navTreatments: "Treatments", navBreathing: "Relaxation",
            login: "Login", logout: "Logout", heroTitle: "What do you need to know today?",
            heroDesc: "A reliable digital platform to support oncology patients and caregivers.", cardNew: "Newly Diagnosed",
            cardSession: "Upcoming Session", cardCaregiver: "I am a Caregiver", cardAI: "Talk to Assistant",
            journeyTitle: "Treatment Journey Guide", step1: "Diagnosis", step2: "Plan", step3: "Preparation",
            prev: "Previous", next: "Next", breathTitle: "Mental Relaxation Tool", breathReady: "Ready?",
            start: "Start", pause: "Pause", stop: "Stop", aiTitle: "Smart Edu Assistant", send: "Send",
            chatPlaceholder: "Type your question...", email: "Email", password: "Password",
            toastLogin: "Logged in successfully", toastLogout: "Logged out", toastError: "Connection Error"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'ar';
    
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.getElementById('langToggle').textContent = lang === 'ar' ? 'English' : 'العربية';
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            if(dict[lang][el.dataset.i18n]) el.textContent = dict[lang][el.dataset.i18n];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            if(dict[lang][el.dataset.i18nPlaceholder]) el.placeholder = dict[lang][el.dataset.i18nPlaceholder];
        });
    }
    
    document.getElementById('langToggle').addEventListener('click', () => {
        applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
    applyLanguage(currentLang);

    // ==========================================
    // 2. Authentication System (Secure Mock/Prep for API)
    // ==========================================
    const authModal = document.getElementById('authModal');
    const authBtnToggle = document.getElementById('authBtnToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    let isAuthenticated = localStorage.getItem('token') ? true : false;

    function updateAuthState() {
        if(isAuthenticated) {
            authBtnToggle.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
        } else {
            authBtnToggle.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
        }
    }
    updateAuthState();

    authBtnToggle.addEventListener('click', () => authModal.showModal());
    document.getElementById('closeAuth').addEventListener('click', () => authModal.close());
    
    document.getElementById('authForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitAuth');
        btn.disabled = true;
        btn.textContent = "...";
        
        // TODO: Replace with real API
        // const res = await fetch('https://your-api.com/auth/login', { method: 'POST', body: JSON.stringify({...}) });
        
        setTimeout(() => { // Simulated API Call
            localStorage.setItem('token', 'secure_mock_jwt_token_xyz');
            isAuthenticated = true;
            updateAuthState();
            authModal.close();
            showToast(dict[currentLang].toastLogin);
            btn.disabled = false;
            btn.textContent = dict[currentLang].login;
        }, 1000);
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        isAuthenticated = false;
        updateAuthState();
        showToast(dict[currentLang].toastLogout);
    });

    // ==========================================
    // 3. AI Assistant (Production Fetch Structure)
    // ==========================================
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `msg ${sender}`;
        div.textContent = text;
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if(!msg) return;

        addMessage(msg, 'user');
        chatInput.value = '';
        const submitBtn = document.getElementById('chat-submit');
        submitBtn.disabled = true;
        
        // Add loading indicator
        const loadingId = 'loading-' + Date.now();
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'msg ai';
        loadingMsg.id = loadingId;
        loadingMsg.textContent = "...";
        chatWindow.appendChild(loadingMsg);

        try {
            // TODO: REPLACE THIS URL WITH YOUR ACTUAL AI BACKEND ENDPOINT
            // Requirements: The backend MUST handle the RAG logic and return safe medical disclaimers.
            /*
            const response = await fetch('https://your-api.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: JSON.stringify({ message: msg, language: currentLang })
            });
            if(!response.ok) throw new Error('API Error');
            const data = await response.json();
            document.getElementById(loadingId).textContent = data.reply;
            */
            
            // Fallback Simulation for testing until API is ready:
            setTimeout(() => {
                const reply = currentLang === 'ar' 
                ? "بصفتي مساعداً تثقيفياً، أنصحك بمناقشة هذه التفاصيل مع طبيبك المعالج. هل تريد معلومات عامة عن كيفية الاستعداد للموعد؟"
                : "As an educational assistant, I advise discussing this with your doctor. Do you want general info on preparing for your appointment?";
                document.getElementById(loadingId).textContent = reply;
                submitBtn.disabled = false;
            }, 1500);

        } catch (error) {
            document.getElementById(loadingId).textContent = "❌ " + dict[currentLang].toastError;
            submitBtn.disabled = false;
        }
    });

    // ==========================================
    // 4. Breathing Tool (Restored Logic)
    // ==========================================
    const circle = document.querySelector('.breath-circle');
    const instruction = document.getElementById('breath-instruction');
    const timerDisplay = document.getElementById('breath-timer');
    const btnStart = document.getElementById('startBreath');
    const btnPause = document.getElementById('pauseBreath');
    const btnStop = document.getElementById('stopBreath');
    
    let breathInterval, timerInterval, timeRemaining = 60, isPaused = false, phase = 'ready';

    function updateBreathingPhase() {
        if(isPaused) return;
        if(phase === 'ready' || phase === 'exhale') {
            phase = 'inhale';
            instruction.textContent = currentLang === 'ar' ? 'شهيق' : 'Inhale';
            circle.className = 'breath-circle inhale';
            setTimeout(updateBreathingPhase, 4000);
        } else if(phase === 'inhale') {
            phase = 'hold';
            instruction.textContent = currentLang === 'ar' ? 'احتفاظ' : 'Hold';
            circle.className = 'breath-circle hold';
            setTimeout(updateBreathingPhase, 2000);
        } else if(phase === 'hold') {
            phase = 'exhale';
            instruction.textContent = currentLang === 'ar' ? 'زفير' : 'Exhale';
            circle.className = 'breath-circle exhale';
            setTimeout(updateBreathingPhase, 6000);
        }
    }

    btnStart.addEventListener('click', () => {
        btnStart.classList.add('hidden');
        btnPause.classList.remove('hidden');
        btnStop.classList.remove('hidden');
        timeRemaining = 60; // 1 minute
        isPaused = false;
        updateBreathingPhase();
        
        timerInterval = setInterval(() => {
            if(!isPaused) {
                timeRemaining--;
                const m = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
                const s = (timeRemaining % 60).toString().padStart(2, '0');
                timerDisplay.textContent = `${m}:${s}`;
                if(timeRemaining <= 0) btnStop.click();
            }
        }, 1000);
    });

    btnPause.addEventListener('click', () => {
        isPaused = !isPaused;
        btnPause.textContent = isPaused ? (currentLang === 'ar' ? 'استئناف' : 'Resume') : (currentLang === 'ar' ? 'إيقاف مؤقت' : 'Pause');
        if(isPaused) {
            circle.style.animationPlayState = 'paused';
            circle.style.transitionDuration = '0s'; // Freeze scale
        } else {
            circle.style.transitionDuration = phase === 'inhale' ? '4s' : phase === 'exhale' ? '6s' : '0s';
        }
    });

    btnStop.addEventListener('click', () => {
        isPaused = true;
        clearInterval(timerInterval);
        circle.className = 'breath-circle';
        instruction.textContent = dict[currentLang].breathReady;
        timerDisplay.textContent = "00:00";
        btnStart.classList.remove('hidden');
        btnPause.classList.add('hidden');
        btnStop.classList.add('hidden');
    });

    // ==========================================
    // 5. Journey Stepper (Dynamic Content)
    // ==========================================
    let currentStep = 0;
    const stepsData = [
        { ar: { t: "التشخيص", d: "تقييم مبدئي وتحديد الخطة." }, en: { t: "Diagnosis", d: "Initial evaluation." } },
        { ar: { t: "الخطة", d: "مناقشة الخيارات مع الطبيب." }, en: { t: "Plan", d: "Discussing options." } },
        { ar: { t: "الاستعداد", d: "الفحوصات التحضيرية." }, en: { t: "Preparation", d: "Preparatory tests." } }
    ];
    
    function renderStep() {
        document.querySelectorAll('.step-btn').forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentStep);
            btn.setAttribute('aria-selected', idx === currentStep);
        });
        document.getElementById('step-title').textContent = stepsData[currentStep][currentLang].t;
        document.getElementById('step-desc').textContent = stepsData[currentStep][currentLang].d;
        document.getElementById('prevStep').disabled = currentStep === 0;
        document.getElementById('nextStep').disabled = currentStep === 2;
    }

    document.getElementById('nextStep').addEventListener('click', () => { if(currentStep < 2) { currentStep++; renderStep(); }});
    document.getElementById('prevStep').addEventListener('click', () => { if(currentStep > 0) { currentStep--; renderStep(); }});

    // Utils
    function showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
});
