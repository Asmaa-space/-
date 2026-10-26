/**
 * KAMC Oncology Digital Companion - Main Application Logic
 * Refactored for Production: Modular, Accessible, Error-Prevented, Performance Optimized.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. STATE & TRANSLATION DICTIONARY
    // ==========================================
    const translations = {
        ar: {
            "nav.home": "الرئيسية", "nav.journey": "رحلة المريض", "nav.treatment": "العلاج", "nav.caregiver": "المرافق", "nav.education": "التثقيف", "nav.login": "بوابة المريض (تجريبي)",
            "badge.review": "مُراجع طبياً | أكتوبر 2026",
            "hero.title": "ما الذي تحتاج معرفته اليوم؟", "hero.desc": "نحن هنا لدعمك ومرافقيك بالمعلومات الموثوقة خطوة بخطوة.",
            "path.new": "تم تشخيصي حديثاً", "path.session": "لدي جلسة علاج", "path.caregiver": "أنا مرافق لمريض", "path.guide": "التحدث للمساعد",
            "journey.title": "الدليل الإرشادي لرحلة العلاج", "journey.disclaimer": "هذه المراحل إرشادية عامة، وخطة علاجك الدقيقة يحددها فريقك الطبي.",
            "journey.prev": "الخطوة السابقة", "journey.next": "الخطوة التالية",
            "treatment.title": "استكشاف أنواع العلاج", "treatment.radio": "العلاج الإشعاعي", "treatment.chemo": "العلاج الكيميائي", "treatment.nuclear": "الطب النووي",
            "treatment.radioTitle": "العلاج الإشعاعي", "treatment.radioDesc": "استخدام أشعة موجهة وعالية الطاقة لتدمير الخلايا السرطانية أو إبطاء نموها في منطقة محددة.",
            "treatment.radioL1": "جلسات قصيرة تستغرق دقائق", "treatment.radioL2": "الإجراء نفسه لا يسبب ألماً", "treatment.radioL3": "الهدف: القضاء على الورم موضعياً",
            "treatment.chemoTitle": "العلاج الكيميائي", "treatment.chemoDesc": "أدوية منهجية تنتقل عبر الجسم لقتل الخلايا سريعة النمو.",
            "treatment.chemoL1": "يعطى عادة عن طريق الوريد أو الفم", "treatment.chemoL2": "يُقسم إلى دورات تتخللها فترات راحة", "treatment.chemoL3": "الهدف: السيطرة على انتشار الخلايا",
            "treatment.nuclearTitle": "الطب النووي", "treatment.nuclearDesc": "استخدام كميات ضئيلة من النظائر المشعة للتشخيص الدقيق أو العلاج الموجه.",
            "treatment.nuclearL1": "يستخدم لتصوير وظائف الأعضاء بدقة", "treatment.nuclearL2": "آمن تماماً تحت الإشراف الطبي", "treatment.nuclearL3": "يساعد في تقييم الاستجابة للعلاج",
            "caregiver.title": "دليل المرافق والمساندة",
            "caregiver.q1": "المساندة النفسية والتواصل الفعال", "caregiver.a1": "كن مستمعاً جيداً بدون إصدار أحكام. المريض غالباً يحتاج لمن يسمعه أكثر من حاجته للنصائح. ساعد في المهام اليومية لتقليل العبء المعرفي.",
            "caregiver.q2": "الاستعداد للمواعيد الطبية", "caregiver.a2": "قم بتدوين الأسئلة مسبقاً، واحتفظ بملف منظم يحتوي على تقارير الأشعة وتاريخ الأدوية. كن الموثّق الهادئ أثناء جلوس المريض مع الطبيب.",
            "caregiver.q3": "متى يجب الاتصال بالفريق الطبي؟", "caregiver.a3": "في حالات ارتفاع الحرارة المفاجئ، أو النزيف، أو صعوبة التنفس الشديدة. لا تتردد في طلب التوجيه الطبي المباشر.",
            "education.title": "المكتبة التثقيفية المرئية",
            "video.v1": "فهم العلاج الإشعاعي الدقيق", "video.d1": "شرح مبسط لكيفية عمل الجلسات الإشعاعية.",
            "video.v2": "التغذية أثناء رحلة العلاج", "video.d2": "نصائح غذائية معتمدة للحفاظ على الطاقة.",
            "guide.title": "المساعد التثقيفي", "guide.status": "ردود آلية سريعة", "guide.clear": "مسح",
            "guide.welcome": "مرحباً. أنا المساعد الرقمي المُبرمج لتقديم إجابات سريعة من مكتبة التثقيف. لا أستطيع تشخيص حالتك. كيف يمكنني إرشادك اليوم؟",
            "guide.s1": "كيف أستعد لأول جلسة؟", "guide.s2": "نصائح للمرافقين", "guide.input": "اكتب سؤالك (مثال: الاستعداد للعلاج)...", "guide.send": "إرسال",
            "guide.disclaimer": "تنبيه أمني وطبي: هذا المساعد للتثقيف العام فقط. يرجى عدم إدخال أي أرقام هوية أو معلومات طبية حساسة. لأي قرار طبي، راجع طبيبك.",
            "breath.title": "أداة الاسترخاء (تمرين التنفس)", "breath.desc": "تمرين عام للمساعدة على خفض التوتر. توقف فوراً إذا شعرت بدوار أو عدم ارتياح.",
            "breath.ready": "جاهز؟", "breath.inhale": "شهيق", "breath.hold": "احتفاظ", "breath.exhale": "زفير", "breath.start": "بدء التمرين", "breath.pause": "إيقاف مؤقت", "breath.stop": "إنهاء",
            "footer.title": "KAMC Oncology Digital Companion", "footer.desc": "منصة التثقيف والمساندة المخصصة لمرضى الأورام ومرافقيهم.",
            "footer.privacy": "سياسة الخصوصية (نموذج)", "footer.terms": "شروط الاستخدام", "footer.disclaimer": "المعلومات المقدمة هي للتثقيف العام ولا تعتبر بأي حال بديلاً عن الاستشارة الطبية المتخصصة، أو التشخيص، أو العلاج.",
            "login.title": "بوابة المرضى (نموذج عرض)", "login.desc": "هذه نافذة تجريبية لأغراض عرض واجهة المستخدم. يرجى عدم إدخال بيانات حقيقية.",
            "login.user": "رقم الملف الطبي", "login.pass": "كلمة المرور", "login.submit": "دخول وهمي", "login.loading": "جاري التحقق...",
            "toast.lang": "تم تحديث اللغة", "toast.path": "يتم توجيهك الآن...", "toast.login": "تم تسجيل الدخول بنجاح للمنصة التجريبية",
            "journey.s1.t": "التشخيص ومناقشة الخطة", "journey.s1.d": "مرحلة الفهم والتقييم المبدئي لتحديد الخطة المناسبة بالتشاور مع طبيبك المعالج.",
            "journey.s2.t": "الاستعداد للعلاج", "journey.s2.d": "إجراء الفحوصات الطبية اللازمة، وتجهيز الجسم والنفسية لبدء الجلسات.",
            "journey.s3.t": "فترة الجلسات", "journey.s3.d": "تلقي العلاج الموصوف وفق الجدول الزمني المحدد من قبل المركز.",
            "journey.s4.t": "التعامل مع الأعراض", "journey.s4.d": "مراقبة وإدارة أي آثار جانبية محتملة بالتواصل المستمر مع فريق الرعاية.",
            "journey.s5.t": "المتابعة الدورية", "journey.s5.d": "استكمال الخطة والبدء بزيارات المتابعة لضمان استقرار الحالة الصحية."
        },
        en: {
            "nav.home": "Home", "nav.journey": "Journey", "nav.treatment": "Treatment", "nav.caregiver": "Caregiver", "nav.education": "Education", "nav.login": "Patient Portal (Demo)",
            "badge.review": "Medically Reviewed | Oct 2026",
            "hero.title": "What do you need to know today?", "hero.desc": "We are here to support you and your caregivers with reliable information, step by step.",
            "path.new": "Newly Diagnosed", "path.session": "Upcoming Session", "path.caregiver": "I'm a Caregiver", "path.guide": "Talk to Guide",
            "journey.title": "Treatment Journey Guide", "journey.disclaimer": "These are general phases. Your specific plan is determined by your medical team.",
            "journey.prev": "Previous", "journey.next": "Next",
            "treatment.title": "Explore Treatments", "treatment.radio": "Radiotherapy", "treatment.chemo": "Chemotherapy", "treatment.nuclear": "Nuclear Med",
            "treatment.radioTitle": "Radiotherapy", "treatment.radioDesc": "Using targeted, high-energy rays to destroy cancer cells or slow their growth.",
            "treatment.radioL1": "Short sessions lasting minutes", "treatment.radioL2": "The procedure itself is painless", "treatment.radioL3": "Goal: Localized tumor control",
            "treatment.chemoTitle": "Chemotherapy", "treatment.chemoDesc": "Systemic drugs that travel through the body to kill fast-growing cells.",
            "treatment.chemoL1": "Usually given IV or orally", "treatment.chemoL2": "Delivered in cycles with rest periods", "treatment.chemoL3": "Goal: Control cell spread",
            "treatment.nuclearTitle": "Nuclear Medicine", "treatment.nuclearDesc": "Using small amounts of radioisotopes for precise diagnosis or targeted therapy.",
            "treatment.nuclearL1": "Precise imaging of organ functions", "treatment.nuclearL2": "Safe under medical supervision", "treatment.nuclearL3": "Helps evaluate treatment response",
            "caregiver.title": "Caregiver Support Guide",
            "caregiver.q1": "Emotional Support & Communication", "caregiver.a1": "Be a good listener without judging. Help with daily tasks to reduce cognitive load.",
            "caregiver.q2": "Preparing for Appointments", "caregiver.a2": "Write down questions in advance, keep medical files organized. Be the calm documenter.",
            "caregiver.q3": "When to call the medical team?", "caregiver.a3": "In cases of sudden fever, bleeding, or severe shortness of breath. Do not hesitate to seek guidance.",
            "education.title": "Video Education Library",
            "video.v1": "Understanding Radiotherapy", "video.d1": "A simple explanation of how radiation sessions work.",
            "video.v2": "Nutrition During Treatment", "video.d2": "Approved nutritional tips to maintain energy.",
            "guide.title": "Educational Guide", "guide.status": "Automated Responses", "guide.clear": "Clear",
            "guide.welcome": "Hello. I am a digital guide programmed to provide quick answers from the library. I cannot diagnose your condition. How can I help?",
            "guide.s1": "How to prepare for my first session?", "guide.s2": "Tips for caregivers", "guide.input": "Type your question...", "guide.send": "Send",
            "guide.disclaimer": "Security & Medical Alert: This guide is for general education only. Do not enter IDs or sensitive medical info. Consult your doctor for medical decisions.",
            "breath.title": "Relaxation Tool (Breathing)", "breath.desc": "General exercise to help reduce stress. Stop immediately if you feel dizzy or uncomfortable.",
            "breath.ready": "Ready?", "breath.inhale": "Inhale", "breath.hold": "Hold", "breath.exhale": "Exhale", "breath.start": "Start Exercise", "breath.pause": "Pause", "breath.stop": "Stop",
            "footer.title": "KAMC Oncology Digital Companion", "footer.desc": "Education and support platform dedicated to oncology patients and caregivers.",
            "footer.privacy": "Privacy Policy (Demo)", "footer.terms": "Terms of Use", "footer.disclaimer": "Information provided is for general education and is never a substitute for professional medical advice, diagnosis, or treatment.",
            "login.title": "Patient Portal (Demo)", "login.desc": "This is a demo window for UI display purposes. Please do not enter real data.",
            "login.user": "Medical ID", "login.pass": "Password", "login.submit": "Mock Login", "login.loading": "Verifying...",
            "toast.lang": "Language updated", "toast.path": "Redirecting...", "toast.login": "Successfully logged into the demo platform",
            "journey.s1.t": "Diagnosis & Plan Discussion", "journey.s1.d": "Initial understanding and evaluation phase to determine the plan with your doctor.",
            "journey.s2.t": "Preparing for Treatment", "journey.s2.d": "Performing necessary medical tests and preparing physically and mentally.",
            "journey.s3.t": "Treatment Sessions", "journey.s3.d": "Receiving prescribed care according to the center's schedule.",
            "journey.s4.t": "Managing Symptoms", "journey.s4.d": "Monitoring and managing potential side effects with the care team.",
            "journey.s5.t": "Routine Follow-up", "journey.s5.d": "Completing the plan and starting follow-up visits to ensure stability."
        }
    };

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

    // ==========================================
    // 2. ACCESSIBILITY & TOAST SYSTEM
    // ==========================================
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

    // ==========================================
    // 3. NAVIGATION & ROUTING
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // Smooth scroll and focus management
    document.querySelectorAll('.scroll-link, .path-card').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href') || link.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Accessibility: Move focus to the section
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                if (link.classList.contains('path-card')) showToast('toast.path');
            }
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ==========================================
    // 4. PATIENT JOURNEY COMPONENT
    // ==========================================
    let currentStep = 0;
    const stepBtns = document.querySelectorAll('.step-btn');
    const btnPrev = document.getElementById('prevStep');
    const btnNext = document.getElementById('nextStep');
    const stepTitle = document.getElementById('stepTitle');
    const stepDesc = document.getElementById('stepDesc');
    const journeyPanel = document.getElementById('step-panel');

    function triggerFade(element) {
        element.classList.remove('fade-content');
        void element.offsetWidth; // trigger reflow
        element.classList.add('fade-content');
    }

    function updateJourneyUI() {
        stepBtns.forEach((btn, index) => {
            const isSelected = index === currentStep;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-selected', isSelected);
        });
        triggerFade(journeyPanel);
        stepTitle.textContent = translations[currentLang][`journey.s${currentStep + 1}.t`];
        stepDesc.textContent = translations[currentLang][`journey.s${currentStep + 1}.d`];
        btnPrev.disabled = currentStep === 0;
        btnNext.disabled = currentStep === 4;
    }

    btnPrev.addEventListener('click', () => { if (currentStep > 0) { currentStep--; updateJourneyUI(); } });
    btnNext.addEventListener('click', () => { if (currentStep < 4) { currentStep++; updateJourneyUI(); } });
    
    // Keyboard navigation for Tabs (WCAG)
    stepBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => { currentStep = index; updateJourneyUI(); });
        btn.addEventListener('keydown', (e) => {
            let newIndex = currentStep;
            if (e.key === 'ArrowRight') newIndex = currentLang === 'ar' ? currentStep - 1 : currentStep + 1;
            else if (e.key === 'ArrowLeft') newIndex = currentLang === 'ar' ? currentStep + 1 : currentStep - 1;
            
            if (newIndex >= 0 && newIndex <= 4 && newIndex !== currentStep) {
                stepBtns[newIndex].focus();
                currentStep = newIndex;
                updateJourneyUI();
            }
        });
    });

    // ==========================================
    // 5. TREATMENT EXPLORER
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const treatmentContent = document.getElementById('treatment-panel');

    function updateTreatmentUI(tabId) {
        tabBtns.forEach(btn => {
            const isSelected = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-selected', isSelected);
        });
        triggerFade(treatmentContent);
        treatmentContent.innerHTML = `
            <h3>${translations[currentLang][`treatment.${tabId}Title`]}</h3>
            <p>${translations[currentLang][`treatment.${tabId}Desc`]}</p>
            <ul class="feature-list" aria-label="أهم النقاط">
                <li>${translations[currentLang][`treatment.${tabId}L1`]}</li>
                <li>${translations[currentLang][`treatment.${tabId}L2`]}</li>
                <li>${translations[currentLang][`treatment.${tabId}L3`]}</li>
            </ul>
        `;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => updateTreatmentUI(e.target.dataset.tab));
        // Keyboard arrow navigation for vertical tabs
        btn.addEventListener('keydown', (e) => {
            const index = Array.from(tabBtns).indexOf(btn);
            let nextIndex = index;
            if (e.key === 'ArrowDown') nextIndex = (index + 1) % tabBtns.length;
            if (e.key === 'ArrowUp') nextIndex = (index - 1 + tabBtns.length) % tabBtns.length;
            
            if (nextIndex !== index) {
                tabBtns[nextIndex].focus();
                updateTreatmentUI(tabBtns[nextIndex].dataset.tab);
            }
        });
    });

    // ==========================================
    // 6. CAREGIVER ACCORDION
    // ==========================================
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', !expanded);
            const content = trigger.nextElementSibling;
            if (!expanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 7. BREATHING SIMULATOR
    // ==========================================
    let breathTimer, breathTimeLeft = 0, breathPhase = 'ready', isBreathing = false, isPaused = false;
    const circle = document.getElementById('breathCircle'), instEl = document.getElementById('breathInstruction'), timeEl = document.getElementById('breathTimer');
    const btnStart = document.getElementById('btnBreathStart'), btnPause = document.getElementById('btnBreathPause'), btnStop = document.getElementById('btnBreathStop');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function updateBreathUI(phase, time) {
        instEl.textContent = phase !== 'ready' ? translations[currentLang][`breath.${phase}`] : translations[currentLang]['breath.ready'];
        timeEl.textContent = time;
        
        if (!prefersReducedMotion) {
            if (phase === 'inhale') { circle.style.transform = 'scale(1)'; circle.style.transitionDuration = '4s'; }
            else if (phase === 'hold') circle.style.transitionDuration = '0s';
            else if (phase === 'exhale') { circle.style.transform = 'scale(0.5)'; circle.style.transitionDuration = '6s'; }
            else if (phase === 'ready') { circle.style.transform = 'scale(0.5)'; circle.style.transitionDuration = '1s'; }
        }
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
        
        // Announce start to screen readers via aria-live on the section
        instEl.setAttribute('aria-live', 'assertive');
    });

    btnPause.addEventListener('click', () => {
        isPaused = !isPaused;
        btnPause.textContent = isPaused ? translations[currentLang]['breath.resume'] : translations[currentLang]['breath.pause'];
        if (isPaused && !prefersReducedMotion) circle.style.transitionDuration = '0s';
        else updateBreathUI(breathPhase, breathTimeLeft);
    });

    btnStop.addEventListener('click', () => {
        isBreathing = false; isPaused = false; clearInterval(breathTimer);
        updateBreathUI('ready', '--');
        btnStart.classList.remove('hidden'); btnPause.classList.add('hidden'); btnStop.classList.add('hidden');
        btnPause.textContent = translations[currentLang]['breath.pause'];
        instEl.removeAttribute('aria-live');
    });

    // ==========================================
    // 8. KAMC GUIDE (RULE-BASED CHAT)
    // ==========================================
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
        let reply = currentLang === 'ar' 
            ? "عفواً، بصفتي مساعد تثقيفي آلي، لا يمكنني تقديم نصائح طبية مخصصة لحالتك. يرجى توجيه هذا السؤال لفريقك الطبي لتوجيهك بشكل صحيح." 
            : "Sorry, as an automated educational guide, I cannot provide personalized medical advice. Please ask your medical team.";
        
        // Very basic hardcoded rule-matching
        if (text.includes("إشعاع") || text.includes("radio")) reply = translations[currentLang]["treatment.radioDesc"];
        if (text.includes("استعد") || text.includes("prep")) reply = translations[currentLang]["caregiver.a2"];
        if (text.includes("مرافق") || text.includes("caregiver")) reply = translations[currentLang]["caregiver.a1"];
        if (text.includes("أكل") || text.includes("طعام") || text.includes("food")) reply = currentLang === 'ar' ? "التغذية مهمة جداً. يمكنك مشاهدة الفيديو التثقيفي الخاص بالتغذية في قسم المكتبة المرئية." : "Nutrition is vital. Watch the nutrition video in the Education section.";
        
        // Typing simulation
        setTimeout(() => addMessage(reply, 'assistant'), 800);
    }

    function handleChatSend() {
        const val = chatInput.value.trim();
        if (!val) {
            chatInputWrapper.classList.remove('shake-error');
            void chatInputWrapper.offsetWidth; // Reflow
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

    // ==========================================
    // 9. NATIVE DIALOG MODALS MANAGEMENT
    // ==========================================
    const loginModal = document.getElementById('loginModal');
    const videoModal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    
    // Open Dialogs
    document.getElementById('loginBtn').addEventListener('click', () => {
        loginModal.showModal();
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    });

    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video');
            // Since this is a demo, we simulate video load without actual external requests unless provided
            videoContainer.innerHTML = `
                <div class="video-placeholder">
                    <p style="color:white; text-align:center;">
                        <strong>نموذج تشغيل فيديو</strong><br>
                        معرف الفيديو: ${videoId}<br>
                        (الفيديو الفعلي يتطلب روابط المؤسسة المعتمدة)
                    </p>
                </div>
            `;
            videoModal.showModal();
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Close Dialogs (Clicking close buttons or outside)
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close');
            document.getElementById(modalId).close();
            if(modalId === 'videoModal') videoContainer.innerHTML = '';
        });
    });

    [loginModal, videoModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Close if clicked on the backdrop
            if (e.target === modal) {
                modal.close();
                if (modal === videoModal) videoContainer.innerHTML = '';
            }
        });
    });

    // Login Form Submit (Mock)
    document.getElementById('loginForm').addEventListener('submit', () => {
        const btn = document.getElementById('submitLoginBtn');
        const origText = btn.textContent;
        btn.textContent = translations[currentLang]['login.loading'];
        btn.disabled = true;
        
        setTimeout(() => {
            loginModal.close();
            showToast('toast.login');
            btn.textContent = origText;
            btn.disabled = false;
        }, 1200);
    });

    // --- INITIALIZATION ---
    applyLanguage(currentLang);
});
