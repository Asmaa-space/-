// --- ضمان تحميل كل العناصر قبل تشغيل الأكواد (حماية من الأعطال) ---
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TRANSLATION DICTIONARY ---
    const translations = {
        ar: {
            "nav.home": "الرئيسية", "nav.journey": "رحلة المريض", "nav.treatment": "العلاج",
            "nav.caregiver": "المرافق", "nav.education": "التثقيف", "nav.breathing": "التنفس",
            "nav.guide": "المساعد", "nav.login": "تسجيل الدخول",
            "hero.title": "رحلتك مع علاج الأورام تبدأ بالمعرفة والدعم",
            "hero.desc": "منصة رقمية تساعد مرضى الأورام والمرافقين على فهم رحلة العلاج والاستعداد لكل خطوة بسهولة وثقة.",
            "hero.ctaPrimary": "ابدأ رحلة المريض", "hero.ctaSecondary": "اسأل KAMC Guide",
            "path.title": "كيف يمكننا مساعدتك؟", "path.patient": "المريض", "path.caregiver": "المرافق", "path.education": "التثقيف",
            "journey.title": "رحلتك العلاجية خطوة بخطوة", "journey.prev": "السابق", "journey.next": "التالي",
            "treatment.title": "اكتشف أنواع العلاج", "treatment.radio": "العلاج الإشعاعي", "treatment.chemo": "العلاج الكيميائي", "treatment.nuclear": "الطب النووي",
            "treatment.radioTitle": "العلاج الإشعاعي", "treatment.radioDesc": "استخدام أشعة عالية الطاقة لتدمير الخلايا السرطانية وتقليص الأورام بدقة عالية.",
            "treatment.radioL1": "جلسات يومية قصيرة", "treatment.radioL2": "بدون ألم أثناء الجلسة", "treatment.radioL3": "قد يسبب إرهاق مؤقت",
            "treatment.chemoTitle": "العلاج الكيميائي", "treatment.chemoDesc": "علاج يعتمد على أدوية قوية لقتل الخلايا سريعة النمو في الجسم.",
            "treatment.chemoL1": "يعطى عادة عن طريق الوريد", "treatment.chemoL2": "يتم على شكل دورات", "treatment.chemoL3": "الآثار الجانبية تختلف حسب الدواء",
            "treatment.nuclearTitle": "الطب النووي", "treatment.nuclearDesc": "استخدام كميات صغيرة من المواد المشعة لتشخيص وعلاج الأمراض.",
            "treatment.nuclearL1": "تصوير دقيق للوظائف الحيوية", "treatment.nuclearL2": "علاج موجه لأورام محددة", "treatment.nuclearL3": "آمن تحت إشراف طبي متخصص",
            "caregiver.title": "لأن الدعم جزء من رحلة العلاج",
            "caregiver.q1": "الدعم النفسي والعملي", "caregiver.a1": "كن مستمعاً جيداً، وقدم المساعدة في المهام اليومية البسيطة لتخفيف العبء.",
            "caregiver.q2": "الاستعداد للمواعيد", "caregiver.a2": "قم بتدوين الأسئلة قبل الزيارة، واحتفظ بسجل للأعراض والأدوية.",
            "caregiver.q3": "العناية الذاتية للمرافق", "caregiver.a3": "لا تنسَ أخذ فترات راحة. صحتك الجسدية والنفسية ضرورية لتتمكن من تقديم الدعم.",
            "education.title": "المعرفة تمنحك ثقة أكبر",
            "video.v1": "فهم العلاج الإشعاعي", "video.v2": "الاستعداد للعلاج الكيميائي", "video.v3": "أهمية الدعم النفسي",
            "breath.title": "محاكي تمارين التنفس", "breath.desc": "تمرين 4-2-6 للمساعدة على الاسترخاء. هذا للتثقيف العام وليس بروتوكول طبي.",
            "breath.ready": "مستعد؟", "breath.inhale": "شهيق", "breath.hold": "احتفاظ", "breath.exhale": "زفير",
            "breath.start": "بدء", "breath.pause": "إيقاف مؤقت", "breath.resume": "متابعة", "breath.stop": "إنهاء",
            "guide.title": "KAMC Guide", "guide.clear": "مسح المحادثة", "guide.welcome": "مرحباً بك. أنا المساعد الرقمي للتثقيف. كيف يمكنني مساعدتك اليوم؟",
            "guide.s1": "ما هو العلاج الإشعاعي؟", "guide.s2": "كيف أستعد للجلسة؟", "guide.input": "اكتب سؤالك هنا...", "guide.send": "إرسال",
            "guide.disclaimer": "هذه الخدمة للتثقيف العام ولا تغني عن استشارة الفريق الطبي.",
            "footer.title": "KAMC Oncology Digital Companion", "footer.desc": "تجربة تثقيفية صحية مبتكرة لدعم المرضى والمرافقين.",
            "footer.disclaimer": "جميع المعلومات المقدمة هنا هي لأغراض تثقيفية وتوضيحية فقط. يُرجى دائماً استشارة طبيبك المعالج للحصول على قرارات طبية مخصصة.",
            "journey.s1.t": "التشخيص", "journey.s1.d": "مرحلة الفهم والتقييم المبدئي لتحديد الخطة المناسبة.",
            "journey.s2.t": "فهم العلاج", "journey.s2.d": "مناقشة الخيارات العلاجية مع الفريق الطبي وفهم الأهداف.",
            "journey.s3.t": "الاستعداد للعلاج", "journey.s3.d": "التحضير الجسدي والنفسي قبل بدء الجلسات.",
            "journey.s4.t": "جلسة العلاج", "journey.s4.d": "تلقي الرعاية في المركز حسب الجدول الزمني المحدد.",
            "journey.s5.t": "المتابعة", "journey.s5.d": "الرعاية المستمرة وتقييم النتائج بعد انتهاء فترة العلاج.",
            "toast.lang": "تم تحديث لغة العرض بنجاح", "toast.path": "يتم توجيهك الآن...", "toast.login": "تم تسجيل الدخول بنجاح!",
            "login.title": "بوابة المرضى", "login.desc": "قم بتسجيل الدخول للوصول لملفك الطبي",
            "login.user": "رقم الملف الطبي", "login.pass": "كلمة المرور", "login.submit": "تسجيل الدخول", "login.cancel": "إلغاء", "login.loading": "جاري التحميل..."
        },
        en: {
            "nav.home": "Home", "nav.journey": "Journey", "nav.treatment": "Treatment",
            "nav.caregiver": "Caregiver", "nav.education": "Education", "nav.breathing": "Breathing",
            "nav.guide": "Guide", "nav.login": "Login",
            "hero.title": "Your Oncology Journey Begins with Knowledge",
            "hero.desc": "A digital platform helping oncology patients and caregivers understand the treatment journey with confidence.",
            "hero.ctaPrimary": "Start Journey", "hero.ctaSecondary": "Ask KAMC Guide",
            "path.title": "How can we help you?", "path.patient": "Patient", "path.caregiver": "Caregiver", "path.education": "Education",
            "journey.title": "Treatment Journey", "journey.prev": "Previous", "journey.next": "Next",
            "treatment.title": "Explore Treatments", "treatment.radio": "Radiotherapy", "treatment.chemo": "Chemotherapy", "treatment.nuclear": "Nuclear",
            "treatment.radioTitle": "Radiotherapy", "treatment.radioDesc": "Using high-energy rays to destroy cancer cells.",
            "treatment.radioL1": "Short daily sessions", "treatment.radioL2": "Painless during session", "treatment.radioL3": "Temporary fatigue",
            "treatment.chemoTitle": "Chemotherapy", "treatment.chemoDesc": "Treatment relying on strong drugs to kill fast-growing cells.",
            "treatment.chemoL1": "Usually given intravenously", "treatment.chemoL2": "Delivered in cycles", "treatment.chemoL3": "Side effects vary",
            "treatment.nuclearTitle": "Nuclear Medicine", "treatment.nuclearDesc": "Using small amounts of radioactive materials.",
            "treatment.nuclearL1": "Precise imaging", "treatment.nuclearL2": "Targeted therapy", "treatment.nuclearL3": "Safe under supervision",
            "caregiver.title": "Because Support is Healing",
            "caregiver.q1": "Emotional Support", "caregiver.a1": "Be a good listener and help with simple daily tasks.",
            "caregiver.q2": "Preparing for Appointments", "caregiver.a2": "Write down questions before the visit.",
            "caregiver.q3": "Caregiver Self-Care", "caregiver.a3": "Don't forget to take breaks. Your health is essential.",
            "education.title": "Knowledge Gives Confidence",
            "video.v1": "Understanding Radiotherapy", "video.v2": "Preparing for Chemotherapy", "video.v3": "Emotional Support",
            "breath.title": "Breathing Simulator", "breath.desc": "4-2-6 exercise to help you relax. For general education.",
            "breath.ready": "Ready?", "breath.inhale": "Inhale", "breath.hold": "Hold", "breath.exhale": "Exhale",
            "breath.start": "Start", "breath.pause": "Pause", "breath.resume": "Resume", "breath.stop": "Stop",
            "guide.title": "KAMC Guide", "guide.clear": "Clear Chat", "guide.welcome": "Hello. How can I assist you today?",
            "guide.s1": "What is Radiotherapy?", "guide.s2": "How do I prepare?", "guide.input": "Type here...", "guide.send": "Send",
            "guide.disclaimer": "This service does not replace medical consultation.",
            "footer.title": "KAMC Oncology Digital Companion", "footer.desc": "Innovative health education.",
            "footer.disclaimer": "All info is for illustrative purposes only. Consult your physician.",
            "journey.s1.t": "Diagnosis", "journey.s1.d": "Understanding and initial evaluation.",
            "journey.s2.t": "Understanding Treatment", "journey.s2.d": "Discussing treatment options with the medical team.",
            "journey.s3.t": "Preparation", "journey.s3.d": "Physical and psychological preparation.",
            "journey.s4.t": "Treatment", "journey.s4.d": "Receiving care at the center.",
            "journey.s5.t": "Follow-up", "journey.s5.d": "Continuous care and evaluation.",
            "toast.lang": "Language updated", "toast.path": "Redirecting...", "toast.login": "Logged in successfully!",
            "login.title": "Patient Portal", "login.desc": "Login to access your medical file",
            "login.user": "Medical ID", "login.pass": "Password", "login.submit": "Login", "login.cancel": "Cancel", "login.loading": "Loading..."
        }
    };

    // --- 2. STATE & LANGUAGE ---
    let currentLang = localStorage.getItem('kamcLang') || 'ar';
    const langSwitcher = document.getElementById('langSwitcher');

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('kamcLang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langSwitcher.textContent = lang === 'ar' ? 'English' : 'العربية';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.tagName === 'INPUT') el.placeholder = translations[lang][key];
                else el.textContent = translations[lang][key];
            }
        });

        updateJourneyUI();
        const activeTabBtn = document.querySelector('.tab-btn.active');
        if (activeTabBtn) updateTreatmentUI(activeTabBtn.dataset.tab);
        if (!isBreathing) updateBreathUI('ready', '--');
    }

    langSwitcher.addEventListener('click', () => {
        applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
        showToast('toast.lang');
    });

    // --- 3. TOAST SYSTEM ---
    const toastContainer = document.getElementById('toastContainer');
    function showToast(messageKey) {
        const msg = translations[currentLang][messageKey] || messageKey;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-leave');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    }

    // --- 4. NAVIGATION & MOBILE MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // Smooth scroll and close menu
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- 5. PATH SELECTION ---
    document.querySelectorAll('.path-card').forEach(card => {
        card.addEventListener('click', () => {
            showToast('toast.path');
            const target = card.getAttribute('data-target');
            setTimeout(() => {
                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            }, 600);
        });
    });

    // --- 6. PATIENT JOURNEY ---
    let currentStep = 0;
    const stepBtns = document.querySelectorAll('.step-btn');
    const btnPrev = document.getElementById('prevStep');
    const btnNext = document.getElementById('nextStep');
    const stepTitle = document.getElementById('stepTitle');
    const stepDesc = document.getElementById('stepDesc');
    const journeyWrapper = document.getElementById('journeyContentWrapper');

    function triggerFade(element) {
        element.classList.remove('fade-content');
        void element.offsetWidth; // trigger reflow
        element.classList.add('fade-content');
    }

    function updateJourneyUI() {
        stepBtns.forEach((btn, index) => btn.classList.toggle('active', index === currentStep));
        triggerFade(journeyWrapper);
        stepTitle.textContent = translations[currentLang][`journey.s${currentStep + 1}.t`];
        stepDesc.textContent = translations[currentLang][`journey.s${currentStep + 1}.d`];
        btnPrev.disabled = currentStep === 0;
        btnNext.disabled = currentStep === 4;
    }

    btnPrev.addEventListener('click', () => { if (currentStep > 0) { currentStep--; updateJourneyUI(); } });
    btnNext.addEventListener('click', () => { if (currentStep < 4) { currentStep++; updateJourneyUI(); } });
    stepBtns.forEach((btn, index) => btn.addEventListener('click', () => { currentStep = index; updateJourneyUI(); }));

    // --- 7. TREATMENT EXPLORER ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const treatmentContent = document.getElementById('treatmentContent');

    function updateTreatmentUI(tabId) {
        tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
        triggerFade(treatmentContent);
        treatmentContent.innerHTML = `
            <h3>${translations[currentLang][`treatment.${tabId}Title`]}</h3>
            <p>${translations[currentLang][`treatment.${tabId}Desc`]}</p>
            <ul class="feature-list">
                <li>${translations[currentLang][`treatment.${tabId}L1`]}</li>
                <li>${translations[currentLang][`treatment.${tabId}L2`]}</li>
                <li>${translations[currentLang][`treatment.${tabId}L3`]}</li>
            </ul>
        `;
    }

    tabBtns.forEach(btn => btn.addEventListener('click', (e) => updateTreatmentUI(e.target.dataset.tab)));

    // --- 8. CAREGIVER ACCORDION ---
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', !expanded);
            const content = trigger.nextElementSibling;
            if (!expanded) {
                content.style.maxHeight = content.scrollHeight + "px";
                trigger.querySelector('.icon-plus').textContent = "-";
            } else {
                content.style.maxHeight = null;
                trigger.querySelector('.icon-plus').textContent = "+";
            }
        });
    });

    // --- 9. BREATHING SIMULATOR ---
    let breathTimer, breathTimeLeft = 0, breathPhase = 'ready', isBreathing = false, isPaused = false;
    const circle = document.getElementById('breathCircle'), instEl = document.getElementById('breathInstruction'), timeEl = document.getElementById('breathTimer');
    const btnStart = document.getElementById('btnBreathStart'), btnPause = document.getElementById('btnBreathPause'), btnStop = document.getElementById('btnBreathStop');

    function updateBreathUI(phase, time) {
        instEl.textContent = phase !== 'ready' ? translations[currentLang][`breath.${phase}`] : translations[currentLang]['breath.ready'];
        timeEl.textContent = time;
        if (phase === 'inhale') { circle.style.transform = 'scale(1)'; circle.style.transitionDuration = '4s'; }
        else if (phase === 'hold') circle.style.transitionDuration = '0s';
        else if (phase === 'exhale') { circle.style.transform = 'scale(0.5)'; circle.style.transitionDuration = '6s'; }
        else if (phase === 'ready') { circle.style.transform = 'scale(0.5)'; circle.style.transitionDuration = '1s'; }
    }

    function runBreathCycle() {
        if (isPaused || !isBreathing) return;
        breathTimeLeft--;
        if (breathTimeLeft <= 0) {
            if (breathPhase === 'inhale') { breathPhase = 'hold'; breathTimeLeft = 2; }
            else if (breathPhase === 'hold') { breathPhase = 'exhale'; breathTimeLeft = 6; }
            else if (breathPhase === 'exhale') { breathPhase = 'inhale'; breathTimeLeft = 4; }
            updateBreathUI(breathPhase, breathTimeLeft);
        } else {
            timeEl.textContent = breathTimeLeft;
        }
    }

    btnStart.addEventListener('click', () => {
        isBreathing = true; isPaused = false; breathPhase = 'inhale'; breathTimeLeft = 4;
        updateBreathUI(breathPhase, breathTimeLeft);
        btnStart.classList.add('hidden'); btnPause.classList.remove('hidden'); btnStop.classList.remove('hidden');
        clearInterval(breathTimer); breathTimer = setInterval(runBreathCycle, 1000);
    });

    btnPause.addEventListener('click', () => {
        isPaused = !isPaused;
        btnPause.textContent = isPaused ? translations[currentLang]['breath.resume'] : translations[currentLang]['breath.pause'];
        if (isPaused) circle.style.transitionDuration = '0s';
        else updateBreathUI(breathPhase, breathTimeLeft);
    });

    btnStop.addEventListener('click', () => {
        isBreathing = false; isPaused = false; clearInterval(breathTimer);
        updateBreathUI('ready', '--');
        btnStart.classList.remove('hidden'); btnPause.classList.add('hidden'); btnStop.classList.add('hidden');
        btnPause.textContent = translations[currentLang]['breath.pause'];
    });

    // --- 10. KAMC GUIDE (CHAT) ---
    const chatInput = document.getElementById('chatInput');
    const chatInputWrapper = document.getElementById('chatInputWrapper');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');
    const clearChat = document.getElementById('clearChat');

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(input) {
        const text = input.toLowerCase();
        let reply = currentLang === 'ar' ? "شكراً لسؤالك. سيقوم الفريق الطبي بالتواصل معك قريباً." : "Thank you. The medical team will contact you soon.";
        
        if (text.includes("إشعاع") || text.includes("radio")) reply = translations[currentLang]["treatment.radioDesc"];
        if (text.includes("استعد") || text.includes("prep")) reply = translations[currentLang]["caregiver.a2"];
        if (text.includes("مرافق") || text.includes("caregiver")) reply = translations[currentLang]["caregiver.a1"];
        
        setTimeout(() => addMessage(reply, 'assistant'), 600);
    }

    function handleChatSend() {
        const val = chatInput.value.trim();
        if (!val) {
            // Error Prevention: Shake Animation
            chatInputWrapper.classList.remove('shake-error');
            void chatInputWrapper.offsetWidth; // trigger reflow
            chatInputWrapper.classList.add('shake-error');
            return;
        }
        chatInputWrapper.classList.remove('shake-error');
        addMessage(val, 'user');
        chatInput.value = '';
        getBotResponse(val);
    }

    chatSend.addEventListener('click', handleChatSend);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChatSend(); });

    document.querySelectorAll('#chatSuggestions .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            addMessage(chip.textContent, 'user');
            getBotResponse(chip.textContent);
        });
    });

    clearChat.addEventListener('click', () => {
        chatBody.innerHTML = `<div class="chat-message assistant"><p>${translations[currentLang]['guide.welcome']}</p></div>`;
    });

    // --- 11. LOGIN MODAL FLOW ---
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const submitLoginBtn = document.getElementById('submitLoginBtn');

    loginBtn.addEventListener('click', () => {
        loginModal.showModal();
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    });

    closeLoginModal.addEventListener('click', () => loginModal.close());

    submitLoginBtn.addEventListener('click', () => {
        const user = document.getElementById('loginUsername').value;
        const pass = document.getElementById('loginPassword').value;
        if(user && pass) {
            submitLoginBtn.textContent = translations[currentLang]['login.loading'];
            setTimeout(() => {
                loginModal.close();
                showToast('toast.login');
                submitLoginBtn.textContent = translations[currentLang]['login.submit'];
            }, 1500);
        }
    });

    // --- 12. VIDEO PLAYER MODAL ---
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const videoIframe = document.getElementById('videoIframe');

    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.getAttribute('data-video');
            videoIframe.src = videoUrl;
            videoModal.showModal();
        });
    });

    closeVideoModal.addEventListener('click', () => {
        videoIframe.src = ""; // Stop video playback
        videoModal.close();
    });

    // إغلاق أي نافذة عند النقر خارجها
    [loginModal, videoModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (modal === videoModal) videoIframe.src = "";
                modal.close();
            }
        });
    });

    // --- INITIALIZATION ---
    applyLanguage(currentLang);
});
