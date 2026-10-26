/**
 * KAMC Oncology Digital Companion
 * Refined JS Logic for Production Quality, Accessibility, and Error Prevention.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. TRANSLATION DATA
    // ==========================================
    const translations = {
        ar: {
            "nav.home": "الرئيسية", "nav.journey": "رحلة العلاج", "nav.treatment": "الأنواع", "nav.caregiver": "المرافق", "nav.education": "المكتبة", "nav.login": "بوابة المريض",
            "badge.review": "مُراجع طبياً | أكتوبر 2026",
            "hero.title": "ما الذي تحتاج معرفته اليوم؟", "hero.desc": "منصة رقمية موثوقة مصممة لمساندة مرضى الأورام ومرافقيهم بالمعلومات الطبية المعتمدة، خطوة بخطوة نحو الشفاء.",
            "path.new": "تم تشخيصي حديثاً", "path.session": "لدي جلسة علاج", "path.caregiver": "أنا مرافق لمريض", "path.edu": "التثقيف الصحي",
            "journey.title": "الدليل الإرشادي لرحلة العلاج", "journey.disclaimer": "هذه المراحل إرشادية عامة لتبسيط فهم المسار. خطتك العلاجية الدقيقة وتفاصيلها تناقش مع طبيبك.",
            "journey.prev": "المرحلة السابقة", "journey.next": "المرحلة التالية",
            "treatment.title": "استكشاف أنواع العلاج",
            "treatment.radio": "العلاج الإشعاعي", "treatment.chemo": "العلاج الكيميائي", "treatment.nuclear": "الطب النووي",
            "treatment.radioTitle": "العلاج الإشعاعي", "treatment.radioDesc": "استخدام أشعة موجهة وعالية الطاقة لتدمير الخلايا السرطانية أو إبطاء نموها في منطقة محددة.",
            "treatment.radioL1": "جلسات قصيرة تستغرق دقائق معدودة.", "treatment.radioL2": "الإجراء نفسه لا يسبب ألماً أثناء الجلسة.", "treatment.radioL3": "الهدف: القضاء على الورم موضعياً مع حماية الأنسجة السليمة.",
            "treatment.chemoTitle": "العلاج الكيميائي", "treatment.chemoDesc": "علاج يعتمد على أدوية منهجية تنتقل عبر الدم لقتل الخلايا سريعة النمو في الجسم.",
            "treatment.chemoL1": "يعطى عادة عن طريق الوريد أو في شكل أقراص.", "treatment.chemoL2": "يُقسم إلى دورات تتخللها فترات راحة لتعافي الجسم.", "treatment.chemoL3": "الهدف: السيطرة على انتشار الخلايا وعلاج الأمراض الجهازية.",
            "treatment.nuclearTitle": "الطب النووي", "treatment.nuclearDesc": "استخدام كميات ضئيلة من المواد المشعة (النظائر) للتشخيص الدقيق أو العلاج الموجه.",
            "treatment.nuclearL1": "يستخدم لتصوير وظائف الأعضاء بدقة عالية (مثل فحص PET).", "treatment.nuclearL2": "يُعتبر إجراءً آمناً تماماً تحت الإشراف الطبي المختص.", "treatment.nuclearL3": "يساعد الأطباء في تقييم مدى الاستجابة للعلاج الحالي.",
            "caregiver.title": "دليل المرافق والمساندة",
            "caregiver.q1": "المساندة النفسية والتواصل الفعال", "caregiver.a1": "كن مستمعاً جيداً بدون إصدار أحكام أو تقديم نصائح طبية غير مبنية على رأي الطبيب. ساعد في إدارة المهام اليومية البسيطة لتقليل العبء المعرفي والجسدي عن المريض.",
            "caregiver.q2": "الاستعداد للمواعيد الطبية وجلسات العلاج", "caregiver.a2": "قم بتدوين كافة أسئلة المريض قبل الزيارة. احتفظ بملف منظم يحتوي على أحدث التقارير والأدوية. كن \"الموثّق الهادئ\" أثناء الحديث مع الطبيب لتذكر التعليمات لاحقاً.",
            "caregiver.q3": "متى يجب الاتصال العاجل بالفريق الطبي؟", "caregiver.a3": "يجب التواصل الفوري أو التوجه للطوارئ في حالات: ارتفاع الحرارة فوق 38°C، النزيف غير المبرر، صعوبة شديدة في التنفس، أو ألم حاد ومفاجئ. لا تتردد أبداً في طلب التوجيه.",
            "education.title": "المكتبة التثقيفية المرئية",
            "video.v1": "ما هو العلاج الإشعاعي؟", "video.d1": "شرح مبسط لكيفية عمل الجلسات، التحضير لها، وما يمكن توقعه.",
            "video.v2": "التغذية السليمة أثناء الجلسات", "video.d2": "نصائح غذائية معتمدة للحفاظ على الطاقة والتعامل مع الغثيان المحتمل.",
            "guide.title": "المساعد التثقيفي (KAMC Guide)",
            "guide.welcome": "مرحباً. أنا أداة مساعدة رقمية للبحث في المكتبة التثقيفية للمنصة. <strong>لا يمكنني تشخيص حالتك أو تقديم استشارات طبية خاصة.</strong> كيف يمكنني مساعدتك في الوصول للمعلومات؟",
            "guide.s1": "الاستعداد للجلسة", "guide.s2": "نصائح للمرافق", "guide.input": "اكتب سؤالك هنا (مثال: العلاج الكيميائي)...", "guide.send": "إرسال", "guide.disclaimer": "لأية أعراض أو خطط علاجية، يجب الرجوع حصراً للفريق الطبي المعالج.",
            "footer.title": "KAMC Oncology", "footer.desc": "منصة رقمية مساندة تهدف لتثقيف المرضى والمرافقين وتمكينهم بالمعرفة الموثوقة.",
            "login.title": "بوابة المرضى", "login.desc": "يرجى تسجيل الدخول للوصول لملفك وملخصات زياراتك. (نسخة تجريبية، لا تدخل بياناتك الحقيقية).", "login.submit": "تسجيل الدخول", "login.loading": "جاري التحقق...",
            "toast.lang": "تم تحديث الواجهة", "toast.path": "جاري التوجيه للقسم المخصص...", "toast.login": "تم الدخول بنجاح للنسخة التجريبية",
            "journey.s1.t": "التشخيص ومناقشة الخطة", "journey.s1.d": "مرحلة الفهم والتقييم المبدئي لتحديد الخطة المناسبة بالتشاور مع طبيبك المعالج ومراجعة الفحوصات.",
            "journey.s2.t": "الخطة والعلاج", "journey.s2.d": "مناقشة الخيارات العلاجية المتوفرة وبناء جدول زمني واضح مع الفريق الطبي لضمان أفضل النتائج.",
            "journey.s3.t": "الاستعداد للبدء", "journey.s3.d": "إجراء أي فحوصات تحضيرية نهائية، وتجهيز الجسم والنفسية لبدء أولى جلسات العلاج بثقة.",
            "journey.s4.t": "فترة الجلسات", "journey.s4.d": "تلقي الرعاية العلاجية وفق الجدول. يقوم الفريق بمراقبة حالتك ودعمك للتعامل مع أي آثار مصاحبة.",
            "journey.s5.t": "المتابعة والتعافي", "journey.s5.d": "استكمال الخطة العلاجية والبدء بزيارات المتابعة الدورية لتقييم الاستجابة وضمان استقرار صحتك."
        },
        en: {
            "nav.home": "Home", "nav.journey": "Journey", "nav.treatment": "Treatments", "nav.caregiver": "Caregiver", "nav.education": "Library", "nav.login": "Patient Portal",
            "badge.review": "Medically Reviewed | Oct 2026",
            "hero.title": "What do you need to know today?", "hero.desc": "A reliable digital platform designed to support oncology patients and caregivers with approved medical information, step by step.",
            "path.new": "Newly Diagnosed", "path.session": "Upcoming Session", "path.caregiver": "I'm a Caregiver", "path.edu": "Health Education",
            "journey.title": "Treatment Journey Guide", "journey.disclaimer": "These phases are general guides. Your specific plan is discussed directly with your doctor.",
            "journey.prev": "Previous Phase", "journey.next": "Next Phase",
            "treatment.title": "Explore Treatments",
            "treatment.radio": "Radiotherapy", "treatment.chemo": "Chemotherapy", "treatment.nuclear": "Nuclear Med",
            "treatment.radioTitle": "Radiotherapy", "treatment.radioDesc": "Uses targeted, high-energy rays to destroy cancer cells or slow their growth in a specific area.",
            "treatment.radioL1": "Short sessions lasting a few minutes.", "treatment.radioL2": "The procedure itself is painless.", "treatment.radioL3": "Goal: Eliminate the tumor locally while protecting healthy tissue.",
            "treatment.chemoTitle": "Chemotherapy", "treatment.chemoDesc": "A systemic treatment that uses drugs traveling through the bloodstream to kill fast-growing cells.",
            "treatment.chemoL1": "Usually given intravenously or in pill form.", "treatment.chemoL2": "Divided into cycles with rest periods for recovery.", "treatment.chemoL3": "Goal: Control cell spread and treat systemic diseases.",
            "treatment.nuclearTitle": "Nuclear Medicine", "treatment.nuclearDesc": "Uses small amounts of radioactive materials (isotopes) for precise diagnosis or targeted therapy.",
            "treatment.nuclearL1": "Used for high-resolution imaging of organ functions (e.g., PET scan).", "treatment.nuclearL2": "Considered completely safe under expert medical supervision.", "treatment.nuclearL3": "Helps doctors evaluate response to current treatments.",
            "caregiver.title": "Caregiver Support Guide",
            "caregiver.q1": "Emotional Support & Communication", "caregiver.a1": "Be a good listener without judging. Help with daily tasks to reduce cognitive load.",
            "caregiver.q2": "Preparing for Appointments", "caregiver.a2": "Write down questions in advance, keep medical files organized. Be the calm documenter.",
            "caregiver.q3": "When to call the medical team?", "caregiver.a3": "Call immediately for: Fever over 38°C, unexplained bleeding, severe shortness of breath, or sudden sharp pain.",
            "education.title": "Video Education Library",
            "video.v1": "What is Radiotherapy?", "video.d1": "A simple explanation of how sessions work and what to expect.",
            "video.v2": "Nutrition During Sessions", "video.d2": "Approved nutritional tips to maintain energy and manage nausea.",
            "guide.title": "KAMC Educational Guide",
            "guide.welcome": "Hello. I am a digital tool to search the platform's library. <strong>I cannot diagnose your condition or give specific medical advice.</strong> How can I help you find information?",
            "guide.s1": "Prepare for session", "guide.s2": "Caregiver tips", "guide.input": "Type your question here...", "guide.send": "Send", "guide.disclaimer": "For any symptoms or treatment plans, refer exclusively to your medical team.",
            "footer.title": "KAMC Oncology", "footer.desc": "A support platform to educate and empower patients and caregivers with reliable knowledge.",
            "login.title": "Patient Portal", "login.desc": "Please login to access your file. (Demo version, do not enter real data).", "login.submit": "Login", "login.loading": "Verifying...",
            "toast.lang": "Interface updated", "toast.path": "Redirecting to section...", "toast.login": "Successfully logged into demo portal",
            "journey.s1.t": "Diagnosis & Plan", "journey.s1.d": "Initial understanding phase to determine the right plan with your doctor and review tests.",
            "journey.s2.t": "Treatment Strategy", "journey.s2.d": "Discussing available options and building a clear timeline with the medical team.",
            "journey.s3.t": "Preparation", "journey.s3.d": "Final tests and preparing physically and mentally to start the first sessions with confidence.",
            "journey.s4.t": "Active Sessions", "journey.s4.d": "Receiving care as scheduled. The team monitors your condition and manages side effects.",
            "journey.s5.t": "Follow-up & Recovery", "journey.s5.d": "Completing the plan and starting routine follow-up visits to evaluate response and ensure stability."
        }
    };

    let currentLang = localStorage.getItem('kamcLang') || 'ar';
    
    // ==========================================
    // 2. TOAST SYSTEM (Accessible Alerts)
    // ==========================================
    const toastContainer = document.getElementById('toastContainer');
    function showToast(messageKey) {
        const msg = translations[currentLang][messageKey] || messageKey;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    }

    // ==========================================
    // 3. LANGUAGE MANAGEMENT
    // ==========================================
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('kamcLang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        document.getElementById('langSwitcher').textContent = lang === 'ar' ? 'English' : 'العربية';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.tagName === 'INPUT') el.placeholder = translations[lang][key];
                else el.innerHTML = translations[lang][key]; // innerHTML allows <strong> tags in chat welcome
            }
        });

        // Re-render UI components with new language
        updateJourneyUI();
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) updateTreatmentUI(activeTab.dataset.tab);
    }

    document.getElementById('langSwitcher').addEventListener('click', () => {
        applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
        showToast('toast.lang');
    });

    // ==========================================
    // 4. NAVIGATION & SCROLLING
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    document.querySelectorAll('.scroll-link, .path-card').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href') || link.getAttribute('data-target');
            const targetEl = document.querySelector(targetId);
            
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
                // Move focus for screen readers
                targetEl.setAttribute('tabindex', '-1');
                targetEl.focus({ preventScroll: true });
                if (link.classList.contains('path-card')) showToast('toast.path');
            }
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ==========================================
    // 5. PATIENT JOURNEY TIMELINE
    // ==========================================
    let currentStep = 0;
    const stepBtns = document.querySelectorAll('.timeline-step');
    const btnPrev = document.getElementById('prevStep');
    const btnNext = document.getElementById('nextStep');
    const stepTitle = document.getElementById('stepTitle');
    const stepDesc = document.getElementById('stepDesc');
    const stepPanel = document.getElementById('step-panel');

    function animateContent(element) {
        element.classList.remove('fade-content');
        void element.offsetWidth; // Force reflow
        element.classList.add('fade-content');
    }

    function updateJourneyUI() {
        stepBtns.forEach((btn, index) => {
            const isActive = index === currentStep;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });
        
        animateContent(stepPanel);
        stepTitle.textContent = translations[currentLang][`journey.s${currentStep + 1}.t`];
        stepDesc.textContent = translations[currentLang][`journey.s${currentStep + 1}.d`];
        
        btnPrev.disabled = currentStep === 0;
        btnNext.disabled = currentStep === 4;
    }

    btnPrev.addEventListener('click', () => { if (currentStep > 0) { currentStep--; updateJourneyUI(); } });
    btnNext.addEventListener('click', () => { if (currentStep < 4) { currentStep++; updateJourneyUI(); } });
    
    stepBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => { currentStep = index; updateJourneyUI(); });
    });

    // ==========================================
    // 6. TREATMENT EXPLORER (Critical Fix applied)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const treatmentContent = document.getElementById('treatment-panel');

    function updateTreatmentUI(tabId) {
        tabBtns.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });
        
        animateContent(treatmentContent);
        treatmentContent.innerHTML = `
            <h3>${translations[currentLang][`treatment.${tabId}Title`]}</h3>
            <p class="mb-4">${translations[currentLang][`treatment.${tabId}Desc`]}</p>
            <ul class="feature-list" aria-label="أهم المعلومات">
                <li>${translations[currentLang][`treatment.${tabId}L1`]}</li>
                <li>${translations[currentLang][`treatment.${tabId}L2`]}</li>
                <li>${translations[currentLang][`treatment.${tabId}L3`]}</li>
            </ul>
        `;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => updateTreatmentUI(e.currentTarget.dataset.tab));
    });

    // ==========================================
    // 7. CAREGIVER ACCORDION
    // ==========================================
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close others (optional, but good UX for FAQs)
            document.querySelectorAll('.accordion-trigger').forEach(t => {
                if (t !== trigger) {
                    t.setAttribute('aria-expanded', 'false');
                    t.nextElementSibling.style.maxHeight = null;
                }
            });

            trigger.setAttribute('aria-expanded', !isExpanded);
            const content = trigger.nextElementSibling;
            
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 8. KAMC GUIDE (Rule-based Chat)
    // ==========================================
    const chatInputWrapper = document.getElementById('chatInputWrapper');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');
    const clearChat = document.getElementById('clearChat');

    function appendMessage(htmlContent, senderClass) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${senderClass}`;
        msgDiv.innerHTML = `<div class="msg-bubble">${htmlContent}</div>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processChatQuery(query) {
        const text = query.toLowerCase();
        let reply = currentLang === 'ar' 
            ? "عذراً، لم أتمكن من إيجاد معلومة دقيقة. لمعلومات طبية محددة، يرجى سؤال طبيبك أثناء الزيارة القادمة."
            : "Sorry, I couldn't find exact information. Please ask your doctor during your next visit.";
            
        // Simple keyword matching for educational routing
        if (text.includes("إشعاع") || text.includes("radio")) reply = translations[currentLang]["treatment.radioDesc"];
        if (text.includes("استعد") || text.includes("prep")) reply = translations[currentLang]["caregiver.a2"];
        if (text.includes("مرافق") || text.includes("caregiver")) reply = translations[currentLang]["caregiver.a1"];
        if (text.includes("أكل") || text.includes("غذاء") || text.includes("food")) reply = currentLang === 'ar' ? "التغذية ضرورية للتعافي. راجع فيديو 'التغذية السليمة' في قسم المكتبة المرئية." : "Nutrition is vital. Watch the nutrition video in the Library section.";

        setTimeout(() => appendMessage(`<p>${reply}</p>`, 'assistant'), 600);
    }

    function handleSend() {
        const val = chatInput.value.trim();
        if (!val) {
            // Trigger error state (Shake)
            chatInputWrapper.classList.remove('shake-error');
            void chatInputWrapper.offsetWidth; 
            chatInputWrapper.classList.add('shake-error');
            return;
        }
        chatInputWrapper.classList.remove('shake-error');
        appendMessage(`<p>${val}</p>`, 'user');
        chatInput.value = '';
        processChatQuery(val);
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
    
    document.querySelectorAll('#chatSuggestions .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            appendMessage(`<p>${chip.textContent}</p>`, 'user');
            processChatQuery(chip.textContent);
        });
    });

    clearChat.addEventListener('click', () => {
        const welcome = translations[currentLang]['guide.welcome'];
        chatBody.innerHTML = `<div class="chat-message assistant"><div class="msg-bubble"><p>${welcome}</p></div></div>`;
    });

    // ==========================================
    // 9. MODALS (Dialogs)
    // ==========================================
    const loginModal = document.getElementById('loginModal');
    const videoModal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');

    document.getElementById('loginBtn').addEventListener('click', () => {
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        loginModal.showModal();
    });

    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const vidId = card.dataset.video;
            videoContainer.innerHTML = `
                <div style="text-align: center; font-family: var(--font-sans);">
                    <p style="margin-bottom:1rem; font-weight:bold;">مشغل المحتوى (نموذج)</p>
                    <p style="font-size:0.9rem; color:#aaa;">معرف المقطع: ${vidId}<br>الربط الفعلي يتطلب موافقة وسياسة خصوصية المؤسسة.</p>
                </div>`;
            videoModal.showModal();
        });
    });

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close');
            const modal = document.getElementById(modalId);
            modal.close();
            if(modalId === 'videoModal') videoContainer.innerHTML = '';
        });
    });

    // Mock Login Submit
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitLoginBtn');
        const originalText = btn.textContent;
        btn.textContent = translations[currentLang]['login.loading'];
        btn.disabled = true;
        
        setTimeout(() => {
            loginModal.close();
            showToast('toast.login');
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });

    // ==========================================
    // INIT CALLS
    // ==========================================
    applyLanguage(currentLang);
    updateJourneyUI();
    // Critical Fix: Initialize Treatment tab content on load
    updateTreatmentUI('radio'); 

});
