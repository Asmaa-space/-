/**
 * KAMC Oncology - Core Interaction Logic
 * Features: Journey Stepper, Tabs, Breathing Tool (Timer & Animation), Chatbot UI.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. DATA & TRANSLATIONS
    // ==========================================
    const data = {
        journey: [
            { t: "التشخيص", html: `<div class="journey-details-grid"><div class="detail-box"><h4>ما الذي يحدث؟</h4><p>يتم تقييم الفحوصات والأشعة لتحديد نوع الورم ومرحلته بدقة عالية.</p></div><div class="detail-box"><h4>كيف أستعد؟</h4><p>قم بتجهيز ملفك الطبي السابق، واكتب مخاوفك لمناقشتها بوضوح.</p></div></div>` },
            { t: "الخطة", html: `<div class="journey-details-grid"><div class="detail-box"><h4>ما الذي يحدث؟</h4><p>يجتمع الفريق الطبي متعدد التخصصات (Tumor Board) لوضع الخطة الأنسب.</p></div><div class="detail-box"><h4>أسئلة للطبيب:</h4><p>ما هي الخيارات المتاحة؟ وما هو الهدف من هذا العلاج (شفائي أم ملطف)؟</p></div></div>` },
            { t: "الاستعداد", html: `<div class="journey-details-grid"><div class="detail-box"><h4>ما الذي يحدث؟</h4><p>إجراء الفحوصات التحضيرية (مثل فحص القلب قبل الكيماوي، أو التخطيط الإشعاعي).</p></div><div class="detail-box"><h4>نصيحة للمرافق:</h4><p>تأكد من معرفة الأدوية المسموحة والممنوعة قبل بدء الجلسة الأولى.</p></div></div>` },
            { t: "الجلسات", html: `<div class="journey-details-grid"><div class="detail-box"><h4>ما الذي يحدث؟</h4><p>تلقي العلاج المجدول. يقوم التمريض والفريق بمراقبة حالتك الحيوية.</p></div><div class="detail-box"><h4>ما يجب توقعه:</h4><p>قد تظهر بعض الأعراض الجانبية المتوقعة. لا تتردد في إخبار الممرض بأي إزعاج.</p></div></div>` },
            { t: "المتابعة", html: `<div class="journey-details-grid"><div class="detail-box"><h4>ما الذي يحدث؟</h4><p>زيارات دورية لتقييم الاستجابة للعلاج وضمان استقرار الحالة الصحية.</p></div><div class="detail-box"><h4>التعافي:</h4><p>العودة التدريجية لنمط الحياة مع الالتزام بتوجيهات التغذية والنشاط البدني.</p></div></div>` }
        ],
        treatment: {
            radio: `<h3>العلاج الإشعاعي</h3><p>استخدام أشعة عالية الطاقة لتدمير الخلايا السرطانية موضعياً.</p><ul class="bullet-list"><li><strong>الإجراء:</strong> الجلسة تستغرق دقائق ولا تسبب ألماً أثناء إجرائها.</li><li><strong>التحضير:</strong> يتطلب جلسة تخطيط (محاكاة) مسبقة لتحديد المنطقة بدقة.</li><li><strong>الأعراض:</strong> قد يسبب احمراراً في الجلد أو إرهاقاً عاماً يزول تدريجياً.</li></ul>`,
            chemo: `<h3>العلاج الكيميائي</h3><p>أدوية جهازية تنتقل عبر الدم للقضاء على الخلايا سريعة النمو.</p><ul class="bullet-list"><li><strong>الإجراء:</strong> يُعطى غالباً عبر الوريد أو كأقراص، ويُقسم إلى "دورات" بينها فترات راحة.</li><li><strong>التحضير:</strong> يُنصح بشرب كميات وفيرة من الماء وتناول وجبة خفيفة.</li><li><strong>الأعراض:</strong> تختلف حسب الدواء، وقد تشمل الغثيان وتساقط الشعر مؤقتاً.</li></ul>`,
            nuclear: `<h3>الطب النووي</h3><p>استخدام مواد مشعة آمنة للتشخيص الدقيق أو العلاج الموجه.</p><ul class="bullet-list"><li><strong>الإجراء:</strong> تصوير دقيق لوظائف الأعضاء لتحديد مدى انتشار المرض (مثل فحص البوزيترون PET).</li><li><strong>التحضير:</strong> يتطلب الصيام لعدة ساعات وتجنب التمارين الشاقة قبل الفحص.</li><li><strong>الأمان:</strong> المواد المستخدمة تتحلل بسرعة وتخرج من الجسم بأمان.</li></ul>`
        }
    };

    // ==========================================
    // 2. NAVIGATION & SMOOTH SCROLL
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
            const target = document.querySelector(targetId);
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
                target.setAttribute('tabindex', '-1');
                target.focus({preventScroll: true});
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ==========================================
    // 3. JOURNEY STEPPER
    // ==========================================
    let currentStep = 0;
    const stepBtns = document.querySelectorAll('.step-btn');
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    const journeyContent = document.getElementById('journeyContent');
    const progressBar = document.getElementById('stepperProgress');

    function updateStepper() {
        stepBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentStep);
            btn.setAttribute('aria-selected', idx === currentStep);
        });
        
        // Update Content with animation reflow
        journeyContent.classList.remove('fadeIn');
        void journeyContent.offsetWidth; // trigger reflow
        journeyContent.innerHTML = `<h3>المرحلة ${currentStep + 1}: ${data.journey[currentStep].t}</h3>${data.journey[currentStep].html}`;
        journeyContent.classList.add('fadeIn');

        // Update Progress Bar (RTL logic: 100% / 4 gaps)
        progressBar.style.width = `${(currentStep / (stepBtns.length - 1)) * 100}%`;

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === stepBtns.length - 1;
    }

    prevBtn.addEventListener('click', () => { if(currentStep > 0) { currentStep--; updateStepper(); }});
    nextBtn.addEventListener('click', () => { if(currentStep < 4) { currentStep++; updateStepper(); }});
    stepBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => { currentStep = idx; updateStepper(); });
    });
    updateStepper(); // Init

    // ==========================================
    // 4. TREATMENT TABS
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const treatmentPanel = document.getElementById('treatment-panel');

    function updateTreatment(tabId) {
        tabBtns.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });
        treatmentPanel.innerHTML = data.treatment[tabId];
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => updateTreatment(e.target.dataset.tab));
    });
    updateTreatment('radio'); // Init Default

    // ==========================================
    // 5. BREATHING EXERCISE (RESTORED FUNCTIONALITY)
    // ==========================================
    const breathCircle = document.getElementById('breathCircle');
    const breathPhase = document.getElementById('breathPhase');
    const breathTime = document.getElementById('breathTime');
    const btnBStart = document.getElementById('btnBreathStart');
    const btnBPause = document.getElementById('btnBreathPause');
    const btnBStop = document.getElementById('btnBreathStop');
    const selectDuration = document.getElementById('breathDuration');
    const breathSetup = document.getElementById('breathSetup');

    let breathTimer;
    let breathInterval;
    let secondsLeft = 0;
    let isPaused = false;
    let isBreathing = false;
    let phaseSeconds = 0;
    let currentPhaseStr = 'ready'; // ready, inhale, hold, exhale

    // Timing (Seconds): 4 Inhale, 2 Hold, 6 Exhale
    const phaseDurations = { inhale: 4, hold: 2, exhale: 6 };

    function formatTime(s) {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    }

    function resetBreathing() {
        clearInterval(breathTimer);
        clearInterval(breathInterval);
        isBreathing = false;
        isPaused = false;
        breathCircle.className = 'breath-circle'; // Remove animation classes
        breathPhase.textContent = 'جاهز؟';
        breathTime.textContent = '00:00';
        
        btnBStart.classList.remove('hidden');
        btnBPause.classList.add('hidden');
        btnBStop.classList.add('hidden');
        breathSetup.style.display = 'block';
        btnBPause.textContent = 'إيقاف مؤقت';
    }

    function executePhase() {
        if (!isBreathing || isPaused) return;

        if (currentPhaseStr === 'ready' || currentPhaseStr === 'exhale') {
            currentPhaseStr = 'inhale';
            phaseSeconds = phaseDurations.inhale;
            breathPhase.textContent = 'شــهـيــق ...';
            breathCircle.className = 'breath-circle inhale';
        } 
        else if (currentPhaseStr === 'inhale') {
            currentPhaseStr = 'hold';
            phaseSeconds = phaseDurations.hold;
            breathPhase.textContent = 'احتفظ بالهواء';
            breathCircle.className = 'breath-circle hold';
        }
        else if (currentPhaseStr === 'hold') {
            currentPhaseStr = 'exhale';
            phaseSeconds = phaseDurations.exhale;
            breathPhase.textContent = 'زفــيــــر ...';
            breathCircle.className = 'breath-circle exhale';
        }

        // Set interval for next phase
        clearInterval(breathInterval);
        breathInterval = setInterval(executePhase, phaseSeconds * 1000);
    }

    function tickTimer() {
        if(isPaused) return;
        secondsLeft--;
        breathTime.textContent = formatTime(secondsLeft);
        if(secondsLeft <= 0) {
            resetBreathing();
            breathPhase.textContent = 'أحسنت! انتهى التمرين.';
        }
    }

    btnBStart.addEventListener('click', () => {
        secondsLeft = parseInt(selectDuration.value);
        breathTime.textContent = formatTime(secondsLeft);
        isBreathing = true;
        isPaused = false;
        currentPhaseStr = 'ready';
        
        btnBStart.classList.add('hidden');
        btnBPause.classList.remove('hidden');
        btnBStop.classList.remove('hidden');
        breathSetup.style.display = 'none';

        executePhase(); // Start visual cycle
        breathTimer = setInterval(tickTimer, 1000); // Start overall clock
    });

    btnBPause.addEventListener('click', () => {
        isPaused = !isPaused;
        btnBPause.textContent = isPaused ? 'استئناف' : 'إيقاف مؤقت';
        if(isPaused) {
            breathCircle.style.animationPlayState = 'paused';
            breathCircle.style.transitionDuration = '0s'; // Freeze scale
        } else {
            // Re-trigger current phase
            const phaseMap = { inhale: 'inhale', hold: 'hold', exhale: 'exhale' };
            breathCircle.className = `breath-circle ${phaseMap[currentPhaseStr]}`;
        }
    });

    btnBStop.addEventListener('click', resetBreathing);

    // ==========================================
    // 6. CAREGIVER ACCORDION
    // ==========================================
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close all
            document.querySelectorAll('.accordion-trigger').forEach(t => {
                t.setAttribute('aria-expanded', 'false');
                t.nextElementSibling.style.maxHeight = null;
            });

            // Open clicked
            if (!isExpanded) {
                trigger.setAttribute('aria-expanded', 'true');
                const content = trigger.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // 7. EDUCATIONAL CHATBOT (UI Logic)
    // ==========================================
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');
    const clearChat = document.getElementById('clearChat');

    function appendMessage(text, isUser) {
        const msg = document.createElement('div');
        msg.className = `message ${isUser ? 'user' : 'assistant'}`;
        msg.innerHTML = `<div class="bubble"><p>${text}</p></div>`;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleChat() {
        const txt = chatInput.value.trim();
        if(!txt) return;
        
        appendMessage(txt, true);
        chatInput.value = '';

        // Fake processing delay
        setTimeout(() => {
            // Simple rule-based replies
            let reply = "بصفتي مساعداً تثقيفياً، لا يمكنني تقديم نصائح طبية محددة. يرجى تدوين هذا السؤال ومناقشته مع فريقك الطبي في الزيارة القادمة.";
            if(txt.includes('استعد') || txt.includes('تحضير')) reply = "للاستعداد، تأكد من إحضار هويتك الطبية، وارتداء ملابس مريحة، ولا تتردد في إحضار مرافق لدعمك.";
            if(txt.includes('غثيان') || txt.includes('أكل')) reply = "الغثيان عرض شائع. يُنصح بتناول وجبات صغيرة متكررة، وتجنب الروائح القوية. راجع قسم (المكتبة المرئية) لفيديو التغذية.";
            
            appendMessage(reply, false);
        }, 800);
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleChat(); });
    
    document.querySelectorAll('#chatSuggestions .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.textContent;
            handleChat();
        });
    });

    clearChat.addEventListener('click', () => {
        chatBody.innerHTML = `<div class="message assistant"><div class="bubble"><p>مرحباً بك. أنا مساعدك الرقمي للبحث في المكتبة التثقيفية. <strong>يرجى العلم أنني أداة آلية ولا يمكنني تقديم تشخيص أو استشارة طبية.</strong> كيف يمكنني مساعدتك بمعلومات عامة اليوم؟</p></div></div>`;
    });

    // ==========================================
    // 8. MODALS & TOASTS
    // ==========================================
    const videoModal = document.getElementById('videoModal');
    
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            videoModal.showModal();
        });
        card.addEventListener('keydown', (e) => { if(e.key === 'Enter') videoModal.showModal(); });
    });

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById(btn.dataset.close).close();
        });
    });

    // Close on backdrop click
    videoModal.addEventListener('click', (e) => {
        if(e.target === videoModal) videoModal.close();
    });

    function showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    document.getElementById('loginBtn').addEventListener('click', () => {
        showToast("هذه الميزة غير مفعلة في النسخة التثقيفية الحالية.");
    });
});
