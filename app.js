/**
 * KAMC ONCOLOGY - Premium Healthcare SPA Controller
 * Version: 2.0
 * Description: Handles i18n, UI interactions, DIBH tool, and AI Chat simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       01. STATE & DOM ELEMENTS
       ========================================================================== */
    const UI = {
        langToggle: document.getElementById('langToggle'),
        mobileBtn: document.getElementById('mobileMenuBtn'),
        navLinks: document.getElementById('navLinks'),
        toastContainer: document.getElementById('toastContainer'),
        
        // Modals
        authModal: document.getElementById('authModal'),
        registerModal: document.getElementById('registerModal'),
        authBtnToggle: document.getElementById('authBtnToggle'),
        profileBtn: document.getElementById('profileBtn'),
        openRegister: document.getElementById('openRegister'),
        
        // Stepper
        stepButtons: document.querySelectorAll('.step-btn'),
        stepTitle: document.getElementById('step-title'),
        stepDesc: document.getElementById('step-desc'),
        prevStepBtn: document.getElementById('prevStep'),
        nextStepBtn: document.getElementById('nextStep'),
        
        // Tabs
        tabButtons: document.querySelectorAll('.tab-btn'),
        tabContent: document.getElementById('treatment-content'),
        
        // Breathing Tool
        breathCircle: document.getElementById('breathCircle'),
        breathInst: document.getElementById('breath-instruction'),
        breathTimer: document.getElementById('breath-timer'),
        btnStartBreath: document.getElementById('startBreath'),
        btnPauseBreath: document.getElementById('pauseBreath'),
        btnStopBreath: document.getElementById('stopBreath'),
        
        // Chatbot
        chatForm: document.getElementById('chat-form'),
        chatInput: document.getElementById('chat-input'),
        chatWindow: document.getElementById('chat-window'),
        chatSubmit: document.getElementById('chat-submit')
    };

    /* ==========================================================================
       02. i18n TRANSLATION DICTIONARY
       ========================================================================== */
    const dict = {
        ar: {
            brandName: "KAMC ONCOLOGY",
            navHome: "الرئيسية", navJourney: "رحلة العلاج", navTreatments: "الخدمات العلاجية", 
            navBreathing: "تقنية DIBH والتنفس", navCaregiver: "دليل المرافق", navEducation: "المكتبة",
            login: "تسجيل الدخول", profile: "الملف الشخصي",
            
            // Hero
            heroBadge: "◆ رعاية طبية متقدمة",
            heroTitle: "رعاية <span>استثنائية</span><br>تثق بها",
            heroDesc: "منصة رقمية فاخرة لمساندة مرضى الأورام ومرافقيهم بأحدث المعايير الطبية والتثقيفية المعتمدة.",
            btnStart: "ابدأ رحلتك", btnAI: "تحدث للمساعد الذكي",
            statLabel: "نسبة الرضا عن الرعاية", drName: "د. سارة أحمد", drTitle: "استشاري أورام",
            
            // Cards
            card1Title: "تم تشخيصي حديثاً", card1Desc: "دليلك الشامل لفهم التشخيص والخطوات الأولى نحو التعافي بثقة وطمأنينة.",
            card2Title: "لدي جلسة علاج", card2Desc: "كل ما تحتاج معرفته للاستعداد النفسي والجسدي لجلساتك العلاجية القادمة.",
            card3Title: "أنا مرافق لمريض", card3Desc: "إرشادات متخصصة لمساعدتك في تقديم أفضل دعم نفسي وجسدي لمن تحب.",
            btnExplore: "استكشف ←",
            
            // Stepper
            journeyTitle: "الدليل الإرشادي لرحلة العلاج",
            step1: "التشخيص", step2: "الخطة العلاجية", step3: "الاستعداد", step4: "الجلسات", step5: "المتابعة",
            prev: "السابق", next: "التالي",
            
            // Tabs
            treatmentsTitle: "أنواع العلاج المتوفرة",
            tabRadio: "العلاج الإشعاعي", tabChemo: "العلاج الكيميائي", tabNuclear: "الطب النووي",
            
            // DIBH
            dibhTitle: "تقنية حبس النفس العميق (DIBH)",
            dibhWhat: "ما هي تقنية DIBH؟",
            dibhDesc: "تقنية تُستخدم أثناء العلاج الإشعاعي لمنطقة الصدر. عند أخذ نفس عميق وحبسه، يتمدد الصدر ويبتعد القلب عن منطقة الإشعاع، مما يحميه من أي أضرار جانبية.",
            levelsTitle: "مستويات التدريب الخاصة بك", levelCurrent: "المستوى الحالي: مبتدئ",
            breathWarning: "تمرين تثقيفي للاسترخاء والتدريب. توقف إذا شعرت بالدوار.",
            breathReady: "جاهز؟", start: "بدء التدريب", pause: "إيقاف مؤقت", stop: "إنهاء", resume: "استئناف",
            inhale: "شهيق عميق", hold: "احبس نفسك", exhale: "زفير ببطء",
            
            // Caregiver
            caregiverTitle: "دليل المرافق والمساندة",
            cgQ1: "كيف أدعم المريض نفسياً خلال فترة العلاج؟", cgA1: "الاستماع الفعال والتعاطف هما الأساس. تجنب إعطاء نصائح طبية غير متخصصة، وكن متواجداً لتقديم الدعم المعنوي والمساعدة في المهام اليومية.",
            cgQ2: "ما هو دوري أثناء جلسات العلاج الإشعاعي؟", cgA2: "مساعدة المريض في الوصول للموعد، تدوين ملاحظات الطبيب، وتذكير المريض بتعليمات التدريب مثل تقنية DIBH إذا لزم الأمر.",
            cgQ3: "متى يجب طلب المساعدة الطبية العاجلة؟", cgA3: "إذا ارتفعت درجة حرارة المريض فوق 38 مئوية، أو واجه صعوبة مفاجئة في التنفس، أو نزيف غير مبرر، يجب التوجه للطوارئ فوراً.",
            
            // Video & AI
            eduTitle: "المكتبة التثقيفية المرئية",
            vid1: "رحلة المريض في قسم الأورام", vid2: "التغذية السليمة أثناء فترة العلاج", vid3: "كيفية الاسترخاء وتقليل التوتر",
            aiTitle: "المساعد التثقيفي الذكي", aiDisclaimer: "⚠️ هذا المساعد مصمم لتقديم معلومات تثقيفية عامة فقط ولا يحل محل الاستشارة الطبية.",
            chatPlaceholder: "اكتب سؤالك التثقيفي هنا...", send: "إرسال",
            
            // Footer & Modals
            footerDesc: "منصة رعاية طبية وتثقيفية معتمدة لخدمة مرضى الأورام ومرافقيهم.",
            quickLinks: "روابط سريعة", contactUs: "تواصل معنا",
            loginTitle: "تسجيل الدخول", email: "البريد الإلكتروني", password: "كلمة المرور", noAccount: "ليس لديك حساب؟ إنشاء حساب جديد",
            registerTitle: "إنشاء حساب جديد", fullName: "الاسم الكامل", accountType: "نوع الحساب",
            typePatient: "مريض", typeCaregiver: "مرافق", createAccount: "تسجيل",
            
            // Toasts
            toastWelcome: "مرحباً بك في KAMC Oncology", toastLogout: "تم تسجيل الخروج", toastError: "حدث خطأ ما!"
        },
        en: {
            brandName: "KAMC ONCOLOGY",
            navHome: "Home", navJourney: "Journey", navTreatments: "Services", 
            navBreathing: "DIBH & Breathing", navCaregiver: "Caregiver", navEducation: "Library",
            login: "Login", profile: "Profile",
            
            heroBadge: "◆ Advanced Medical Care",
            heroTitle: "<span>Exceptional</span> Care<br>You Can Trust",
            heroDesc: "A premium digital platform supporting oncology patients and caregivers with approved medical and educational standards.",
            btnStart: "Start Journey", btnAI: "Ask AI",
            statLabel: "Patient Satisfaction", drName: "Dr. Sarah Ahmed", drTitle: "Oncology Consultant",
            
            card1Title: "Newly Diagnosed", card1Desc: "Your comprehensive guide to understanding your diagnosis and first steps with confidence.",
            card2Title: "Upcoming Session", card2Desc: "Everything you need to mentally and physically prepare for your next treatment sessions.",
            card3Title: "I am a Caregiver", card3Desc: "Specialized guidance to help you provide the best mental and physical support for your loved one.",
            btnExplore: "Explore →",
            
            journeyTitle: "Treatment Journey Guide",
            step1: "Diagnosis", step2: "Plan", step3: "Preparation", step4: "Sessions", step5: "Follow-up",
            prev: "Previous", next: "Next",
            
            treatmentsTitle: "Available Treatments",
            tabRadio: "Radiotherapy", tabChemo: "Chemotherapy", tabNuclear: "Nuclear Med",
            
            dibhTitle: "Deep Inspiration Breath Hold (DIBH)",
            dibhWhat: "What is DIBH?",
            dibhDesc: "A technique used during radiation therapy for the chest region. By taking a deep breath and holding it, the chest expands and the heart moves away from the radiation area.",
            levelsTitle: "Your Training Levels", levelCurrent: "Current Level: Beginner",
            breathWarning: "Educational relaxation exercise. Stop if you feel dizzy.",
            breathReady: "Ready?", start: "Start Training", pause: "Pause", stop: "Stop", resume: "Resume",
            inhale: "Deep Inhale", hold: "Hold Breath", exhale: "Slow Exhale",
            
            caregiverTitle: "Caregiver Support Guide",
            cgQ1: "How to mentally support the patient?", cgA1: "Active listening and empathy are key. Avoid unsolicited medical advice and be present for moral support.",
            cgQ2: "What is my role during sessions?", cgA2: "Assist with transport, take notes from the doctor, and remind the patient of DIBH techniques if needed.",
            cgQ3: "When to seek emergency help?", cgA3: "If fever exceeds 38°C, sudden breathing difficulty occurs, or unexplained bleeding.",
            
            eduTitle: "Visual Education Library",
            vid1: "Patient Journey in Oncology", vid2: "Proper Nutrition During Treatment", vid3: "How to Relax and Reduce Stress",
            aiTitle: "Smart Educational AI", aiDisclaimer: "⚠️ This assistant provides general educational info and does not replace medical consultation.",
            chatPlaceholder: "Type your educational question...", send: "Send",
            
            footerDesc: "Approved medical and educational platform serving oncology patients and caregivers.",
            quickLinks: "Quick Links", contactUs: "Contact Us",
            loginTitle: "Login", email: "Email Address", password: "Password", noAccount: "Don't have an account? Register",
            registerTitle: "Create Account", fullName: "Full Name", accountType: "Account Type",
            typePatient: "Patient", typeCaregiver: "Caregiver", createAccount: "Register",
            
            toastWelcome: "Welcome to KAMC Oncology", toastLogout: "Logged Out Successfully", toastError: "An error occurred!"
        }
    };

    /* ==========================================================================
       03. LANGUAGE MANAGEMENT
       ========================================================================== */
    let currentLang = localStorage.getItem('lang') || 'ar';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        if (UI.langToggle) {
            UI.langToggle.textContent = lang === 'ar' ? 'EN' : 'عربي';
        }
        
        // Translate text contents
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dict[lang][key]) {
                // If it's the hero title, use innerHTML for the span
                if(el.id === 'heroTitle') el.innerHTML = dict[lang][key];
                else el.textContent = dict[lang][key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (dict[lang][key]) el.placeholder = dict[lang][key];
        });

        // Update step content if Stepper is initialized
        if(typeof renderStep === 'function') renderStep(false);
    }
    
    if (UI.langToggle) {
        UI.langToggle.addEventListener('click', () => applyLanguage(currentLang === 'ar' ? 'en' : 'ar'));
    }
    applyLanguage(currentLang);

    /* ==========================================================================
       04. NAVIGATION & MOBILE MENU
       ========================================================================== */
    if (UI.mobileBtn && UI.navLinks) {
        UI.mobileBtn.addEventListener('click', () => {
            UI.navLinks.classList.toggle('active');
        });
        // Close mobile menu on link click
        UI.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => UI.navLinks.classList.remove('active'));
        });
    }

    // Scroll to Chat when Hero button clicked
    const scrollAiBtn = document.getElementById('scrollAiBtn');
    if(scrollAiBtn) {
        scrollAiBtn.addEventListener('click', () => {
            document.getElementById('ai-chat').scrollIntoView({ behavior: 'smooth' });
        });
    }
    // Scroll to Journey
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    if(startJourneyBtn) {
        startJourneyBtn.addEventListener('click', () => {
            document.getElementById('journey').scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       05. JOURNEY STEPPER LOGIC
       ========================================================================== */
    let currentStep = 0;
    const stepsData = [
        { icon: "🔬", ar: { t: "التشخيص", d: "مرحلة الفهم والتقييم المبدئي لتحديد الخطة المناسبة بالتشاور مع طبيبك المختص." }, en: { t: "Diagnosis", d: "Initial understanding and evaluation to determine the appropriate plan." } },
        { icon: "📋", ar: { t: "الخطة العلاجية", d: "مناقشة خيارات العلاج، الأعراض الجانبية المحتملة، وتحديد الجدول الزمني." }, en: { t: "Treatment Plan", d: "Discussing options, potential side effects, and timeline." } },
        { icon: "🧘", ar: { t: "الاستعداد", d: "إجراء الفحوصات الطبية النهائية والتحضير النفسي والجسدي قبل الجلسة الأولى." }, en: { t: "Preparation", d: "Final medical tests and mental/physical prep." } },
        { icon: "🏥", ar: { t: "الجلسات", d: "تلقي العلاج في المواعيد المحددة مع اتباع إرشادات الفريق الطبي بدقة." }, en: { t: "Sessions", d: "Receiving treatment on schedule while following medical guidelines." } },
        { icon: "❤️", ar: { t: "المتابعة", d: "مراقبة التقدم بعد انتهاء الجلسات لضمان التعافي وتجنب المضاعفات." }, en: { t: "Follow-up", d: "Monitoring progress after sessions to ensure recovery." } }
    ];

    function renderStep(animate = true) {
        if (!UI.stepTitle) return;
        
        // Update Buttons
        UI.stepButtons.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentStep);
            btn.setAttribute('aria-selected', idx === currentStep);
        });

        // Update Content
        const contentDiv = UI.stepTitle.parentElement;
        if(animate) contentDiv.style.opacity = 0;
        
        setTimeout(() => {
            contentDiv.querySelector('.step-icon').textContent = stepsData[currentStep].icon;
            UI.stepTitle.textContent = stepsData[currentStep][currentLang].t;
            UI.stepDesc.textContent = stepsData[currentStep][currentLang].d;
            if(animate) contentDiv.style.opacity = 1;
        }, animate ? 200 : 0);

        // Update Controls
        if (UI.prevStepBtn) UI.prevStepBtn.disabled = currentStep === 0;
        if (UI.nextStepBtn) UI.nextStepBtn.disabled = currentStep === stepsData.length - 1;
    }

    if (UI.nextStepBtn && UI.prevStepBtn) {
        UI.nextStepBtn.addEventListener('click', () => { if (currentStep < stepsData.length - 1) { currentStep++; renderStep(); }});
        UI.prevStepBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; renderStep(); }});
        UI.stepButtons.forEach((btn, idx) => {
            btn.addEventListener('click', () => { currentStep = idx; renderStep(); });
        });
        renderStep(false);
    }

    /* ==========================================================================
       06. TREATMENT TABS LOGIC
       ========================================================================== */
    const tabData = {
        radio: {
            ar: { t: "العلاج الإشعاعي", d: "استخدام أشعة عالية الطاقة لتدمير الخلايا السرطانية موضعياً بأمان ودقة عالية.", p: ["✓ دقة عالية في استهداف الورم", "✓ حماية الأنسجة السليمة", "✓ جلسات غير مؤلمة تستغرق دقائق"] },
            en: { t: "Radiotherapy", d: "Using high-energy rays to safely and accurately destroy cancer cells locally.", p: ["✓ High precision targeting", "✓ Protects healthy tissues", "✓ Painless sessions taking minutes"] }
        },
        chemo: {
            ar: { t: "العلاج الكيميائي", d: "أدوية قوية تُعطى عبر الوريد أو الفم للقضاء على الخلايا السرطانية سريعة النمو.", p: ["✓ يعالج الأورام المنتشرة", "✓ يُعطى على دورات مجدولة", "✓ يتطلب متابعة دورية للدم"] },
            en: { t: "Chemotherapy", d: "Strong drugs given intravenously or orally to eliminate fast-growing cancer cells.", p: ["✓ Treats spreading tumors", "✓ Given in scheduled cycles", "✓ Requires regular blood monitoring"] }
        },
        nuclear: {
            ar: { t: "الطب النووي", d: "استخدام كميات ضئيلة من النظائر المشعة لتشخيص وتحديد موقع الأورام بدقة متناهية.", p: ["✓ آمن جداً ومصرح به", "✓ يكشف التغيرات قبل الأشعة العادية", "✓ يحدد مدى انتشار المرض"] },
            en: { t: "Nuclear Medicine", d: "Using minute amounts of radioactive isotopes to accurately diagnose and locate tumors.", p: ["✓ Very safe and approved", "✓ Detects changes early", "✓ Determines disease spread"] }
        }
    };

    if (UI.tabButtons.length > 0 && UI.tabContent) {
        UI.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                UI.tabButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const targetKey = e.target.dataset.target;
                const data = tabData[targetKey][currentLang];
                
                UI.tabContent.style.opacity = 0;
                setTimeout(() => {
                    UI.tabContent.innerHTML = `
                        <h3>${data.t}</h3>
                        <p>${data.d}</p>
                        <ul class="treatment-list">
                            ${data.p.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    `;
                    UI.tabContent.style.opacity = 1;
                }, 200);
            });
        });
    }

    /* ==========================================================================
       07. CAREGIVER ACCORDION
       ========================================================================== */
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Close others
            accordions.forEach(other => {
                if(other !== this) {
                    other.nextElementSibling.classList.add('hidden');
                    other.querySelector('.icon').textContent = '+';
                }
            });
            // Toggle current
            const body = this.nextElementSibling;
            const icon = this.querySelector('.icon');
            if (body.classList.contains('hidden')) {
                body.classList.remove('hidden');
                icon.textContent = '−';
            } else {
                body.classList.add('hidden');
                icon.textContent = '+';
            }
        });
    });

    /* ==========================================================================
       08. DIBH BREATHING TOOL & PROGRESS SYSTEM
       ========================================================================== */
    let breathTimerInt, phaseTimeout;
    let bTime = 60, isPaused = false, bPhase = 'ready';
    let sessionsCompleted = parseInt(localStorage.getItem('dibhSessions')) || 0;

    function updateProgressUI() {
        const fill = document.querySelector('.progress-bar-fill');
        const levelText = document.querySelector('.level-text');
        if(!fill) return;
        
        let level = 1;
        if(sessionsCompleted > 15) level = 5;
        else if(sessionsCompleted > 10) level = 4;
        else if(sessionsCompleted > 5) level = 3;
        else if(sessionsCompleted > 2) level = 2;
        
        const progressPercent = Math.min((sessionsCompleted / 20) * 100, 100);
        fill.style.width = `${progressPercent}%`;
        
        const levelsAR = ["مبتدئ", "متدرب", "متقدم", "خبير", "محترف"];
        const levelsEN = ["Beginner", "Trainee", "Advanced", "Expert", "Master"];
        if(levelText) {
            levelText.textContent = currentLang === 'ar' 
                ? `المستوى الحالي: ${levelsAR[level-1]} (المستوى ${level}) - الجلسات: ${sessionsCompleted}`
                : `Current Level: ${levelsEN[level-1]} (Level ${level}) - Sessions: ${sessionsCompleted}`;
        }
    }
    updateProgressUI();

    function startBreathingCycle() {
        if(isPaused) return;
        if (bPhase === 'ready' || bPhase === 'exhale') {
            bPhase = 'inhale';
            UI.breathInst.textContent = dict[currentLang].inhale;
            UI.breathCircle.className = 'breath-circle inhale';
            phaseTimeout = setTimeout(startBreathingCycle, 4000);
        } else if (bPhase === 'inhale') {
            bPhase = 'hold';
            UI.breathInst.textContent = dict[currentLang].hold;
            UI.breathCircle.className = 'breath-circle hold';
            phaseTimeout = setTimeout(startBreathingCycle, 15000); // 15 sec DIBH Hold
        } else if (bPhase === 'hold') {
            bPhase = 'exhale';
            UI.breathInst.textContent = dict[currentLang].exhale;
            UI.breathCircle.className = 'breath-circle exhale';
            phaseTimeout = setTimeout(startBreathingCycle, 6000);
        }
    }

    if (UI.btnStartBreath) {
        UI.btnStartBreath.addEventListener('click', () => {
            UI.btnStartBreath.classList.add('hidden');
            UI.btnPauseBreath.classList.remove('hidden');
            UI.btnStopBreath.classList.remove('hidden');
            bTime = 60; isPaused = false; bPhase = 'ready';
            
            startBreathingCycle();
            
            breathTimerInt = setInterval(() => {
                if (!isPaused) {
                    bTime--;
                    const m = Math.floor(bTime / 60).toString().padStart(2, '0');
                    const s = (bTime % 60).toString().padStart(2, '0');
                    UI.breathTimer.textContent = `${m}:${s}`;
                    if (bTime <= 0) {
                        UI.btnStopBreath.click();
                        // Save Progress on complete session
                        sessionsCompleted++;
                        localStorage.setItem('dibhSessions', sessionsCompleted);
                        updateProgressUI();
                        showToast(currentLang === 'ar' ? "أحسنت! اكتمل التدريب." : "Great! Session completed.");
                    }
                }
            }, 1000);
        });

        UI.btnPauseBreath.addEventListener('click', () => {
            isPaused = !isPaused;
            UI.btnPauseBreath.textContent = isPaused ? dict[currentLang].resume : dict[currentLang].pause;
            if (isPaused) {
                clearTimeout(phaseTimeout);
                UI.breathCircle.style.animationPlayState = 'paused';
            } else {
                startBreathingCycle(); // resume phase
            }
        });

        UI.btnStopBreath.addEventListener('click', () => {
            isPaused = true;
            clearInterval(breathTimerInt);
            clearTimeout(phaseTimeout);
            UI.breathCircle.className = 'breath-circle';
            UI.breathInst.textContent = dict[currentLang].breathReady;
            UI.breathTimer.textContent = "00:00";
            UI.btnStartBreath.classList.remove('hidden');
            UI.btnPauseBreath.classList.add('hidden');
            UI.btnStopBreath.classList.add('hidden');
        });
    }

    /* ==========================================================================
       09. AI CHATBOT SIMULATION (Prep for real API)
       ========================================================================== */
    if (UI.chatForm) {
        UI.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = UI.chatInput.value.trim();
            if (!msg) return;

            // Render User Msg
            const userDiv = document.createElement('div');
            userDiv.className = 'msg user';
            userDiv.textContent = msg;
            UI.chatWindow.appendChild(userDiv);
            UI.chatInput.value = '';
            UI.chatSubmit.disabled = true;
            UI.chatWindow.scrollTop = UI.chatWindow.scrollHeight;

            // Typing Indicator
            const typingId = 'typing-' + Date.now();
            const typingDiv = document.createElement('div');
            typingDiv.className = 'msg ai';
            typingDiv.id = typingId;
            typingDiv.textContent = "...";
            UI.chatWindow.appendChild(typingDiv);

            // Mock AI Response Logic
            setTimeout(() => {
                const aiResponseBox = document.getElementById(typingId);
                let reply = "";
                const lowerMsg = msg.toLowerCase();
                
                if(lowerMsg.includes('ألم') || lowerMsg.includes('pain')) {
                    reply = currentLang === 'ar' ? "التخفيف من الألم أولوية قصوى. يُرجى مراجعة طبيبك المختص لتعديل مسكنات الألم الخاصة بك. لا تتردد في طلب المساعدة الطبية إذا كان الألم لا يُحتمل." : "Pain management is a top priority. Please consult your doctor to adjust your pain medication. Do not hesitate to seek emergency help if it's unbearable.";
                } else if(lowerMsg.includes('موعد') || lowerMsg.includes('appointment')) {
                    reply = currentLang === 'ar' ? "يمكنك الاستعلام عن مواعيدك عبر تطبيق صحتي أو الاتصال برقم المستشفى المباشر. هل ترغب في عرض نصائح الاستعداد للموعد؟" : "You can check your appointments via the Sehaty app or call the hospital directly. Want tips on how to prepare?";
                } else {
                    reply = currentLang === 'ar' ? "شكراً لسؤالك. بصفتي مساعداً تثقيفياً، أنصحك بقراءة دليل 'رحلة العلاج' في المنصة، ومناقشة التفاصيل الطبية الدقيقة مع طبيب الأورام المعالج لك." : "Thank you for asking. As an educational AI, I recommend reading the 'Journey' guide on our platform, and discussing precise medical details with your oncologist.";
                }
                
                aiResponseBox.textContent = reply;
                UI.chatSubmit.disabled = false;
                UI.chatWindow.scrollTop = UI.chatWindow.scrollHeight;
            }, 1500); // Simulate network delay
        });
    }

    /* ==========================================================================
       10. AUTHENTICATION MODALS & TOAST NOTIFICATIONS
       ========================================================================== */
    function showToast(message) {
        if(!UI.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        UI.toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // Modal Control
    function setupModal(modal, openBtnId, closeBtnId) {
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = document.getElementById(closeBtnId);
        if(openBtn && modal) openBtn.addEventListener('click', (e) => { e.preventDefault(); modal.showModal(); });
        if(closeBtn && modal) closeBtn.addEventListener('click', () => modal.close());
        if(modal) modal.addEventListener('click', (e) => {
            const rect = modal.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) modal.close();
        });
    }

    setupModal(UI.authModal, 'authBtnToggle', 'closeAuth');
    setupModal(UI.registerModal, null, 'closeRegister'); // Open triggered differently

    if(UI.openRegister) {
        UI.openRegister.addEventListener('click', (e) => {
            e.preventDefault();
            UI.authModal.close();
            UI.registerModal.showModal();
        });
    }

    // Mock Login/Register Form Submit
    const authForm = document.getElementById('authForm');
    const registerForm = document.getElementById('registerForm');

    if(authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitAuth');
            btn.textContent = "..."; btn.disabled = true;
            
            setTimeout(() => {
                UI.authModal.close();
                showToast(dict[currentLang].toastWelcome);
                UI.authBtnToggle.classList.add('hidden');
                if(UI.profileBtn) UI.profileBtn.classList.remove('hidden');
                btn.textContent = dict[currentLang].login; btn.disabled = false;
            }, 1000);
        });
    }
    
    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            setTimeout(() => {
                UI.registerModal.close();
                showToast(currentLang === 'ar' ? "تم إنشاء الحساب بنجاح!" : "Account Created Successfully!");
                UI.authBtnToggle.classList.add('hidden');
                if(UI.profileBtn) UI.profileBtn.classList.remove('hidden');
            }, 1000);
        });
    }

    // Mock Profile Logout
    if(UI.profileBtn) {
        UI.profileBtn.addEventListener('click', () => {
            if(confirm(currentLang === 'ar' ? "هل تريد تسجيل الخروج؟" : "Are you sure you want to logout?")) {
                UI.profileBtn.classList.add('hidden');
                UI.authBtnToggle.classList.remove('hidden');
                showToast(dict[currentLang].toastLogout);
            }
        });
    }
});
