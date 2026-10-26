document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. DATA 
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
    // 2. HASH-BASED ROUTING & NAVIGATION LOGIC
    // ==========================================
    const routes = {
        '#home': { id: 'screen-home', title: 'الرئيسية', flow: null },
        
        // مسار المريض
        '#patient-education': { id: 'screen-patient-journey', title: 'نظرة عامة على التثقيف', flow: 'patient', index: 0 },
        '#patient-treatment': { id: 'screen-patient-treatment', title: 'المحتوى التثقيفي', flow: 'patient', index: 1 },
        '#patient-dibh': { id: 'screen-patient-breathing', title: 'تدرّب (DIBH)', flow: 'patient', index: 2 },
        '#patient-completion': { id: 'screen-completion', title: 'المراجعة والإكمال', flow: 'patient', index: 3 },
        
        // مسار المرافق
        '#comp-overview': { id: 'screen-comp-overview', title: 'نظرة عامة', flow: 'companion', index: 0 },
        '#comp-guide': { id: 'screen-comp-guide', title: 'المحتوى التثقيفي', flow: 'companion', index: 1 },
        '#comp-chatbot': { id: 'screen-comp-chatbot', title: 'الأدوات المساعدة', flow: 'companion', index: 2 },
        '#comp-completion': { id: 'screen-completion', title: 'المراجعة والإكمال', flow: 'companion', index: 3 }
    };

    const patientSequence = ['#patient-education', '#patient-treatment', '#patient-dibh', '#patient-completion'];
    const compSequence = ['#comp-overview', '#comp-guide', '#comp-chatbot', '#comp-completion'];

    const screens = document.querySelectorAll('.screen');
    const header = document.getElementById('appHeader');
    const bottomNav = document.getElementById('bottomNav');
    const topNav = document.getElementById('topNav');
    const topNavLinks = document.querySelectorAll('.nav-link');
    
    function handleRouteChange() {
        const hash = window.location.hash || '#home';
        const route = routes[hash];
        
        if (!route) {
            window.location.hash = '#home';
            return;
        }

        // تفريغ الشاشات وعرض المطلوبة
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(route.id).classList.add('active');

        // حالة الصفحة الرئيسية
        if (hash === '#home') {
            header.classList.add('hidden');
            bottomNav.classList.add('hidden');
            if(typeof resetBreathing === 'function') resetBreathing();
            return;
        }

        // عرض العناصر للمسارات الداخلية
        header.classList.remove('hidden');
        bottomNav.classList.remove('hidden');
        
        const sequence = route.flow === 'patient' ? patientSequence : compSequence;
        const totalNum = sequence.length;
        const currentNum = route.index + 1;

        // إخفاء/إظهار الروابط العلوية حسب المسار
        topNav.style.display = route.flow === 'patient' ? 'flex' : 'none';
        
        document.getElementById('headerUserType').textContent = (route.flow === 'patient') ? 'المريض' : 'المرافق';
        document.getElementById('headerStepName').textContent = route.title;
        document.getElementById('headerProgressText').textContent = `الصفحة ${currentNum} من ${totalNum}`;
        document.getElementById('headerProgressBar').style.width = `${(currentNum / totalNum) * 100}%`;

        // تحديث حالة أزرار التالي/السابق بناءً على المصفوفة
        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');
        
        btnPrev.style.visibility = (route.index === 0) ? 'hidden' : 'visible';
        btnPrev.onclick = () => { window.location.hash = sequence[route.index - 1]; };
        
        if (route.index === totalNum - 1) {
            btnNext.classList.add('hidden');
        } else {
            btnNext.classList.remove('hidden');
            btnNext.onclick = () => { window.location.hash = sequence[route.index + 1]; };
        }

        // تمييز الرابط النشط في الشريط العلوي
        topNavLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.style.fontWeight = 'bold';
                link.style.color = 'var(--rose)';
                link.style.backgroundColor = 'var(--bg-soft)';
            } else {
                link.style.fontWeight = '500';
                link.style.color = 'var(--teal)';
                link.style.backgroundColor = 'transparent';
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ربط أحداث التوجيه (Routing)
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('load', handleRouteChange);

    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.hash = card.dataset.role === 'patient' ? '#patient-education' : '#comp-overview';
        });
    });

    document.getElementById('btnGoHome').addEventListener('click', () => window.location.hash = '#home');
    document.getElementById('btnRestart').addEventListener('click', () => window.location.hash = '#home');


    // ==========================================
    // 3. ORIGINAL FUNCTIONALITY INTEGRATION
    // ==========================================

    // A. Patient Journey Stepper
    let jStep = 0;
    const jBtns = document.querySelectorAll('.step-btn');
    const jContent = document.getElementById('journeyContent');
    const jProgress = document.getElementById('stepperProgress');

    function updateJourney() {
        jBtns.forEach((btn, idx) => btn.classList.toggle('active', idx === jStep));
        jContent.innerHTML = `<h3>المرحلة ${jStep + 1}: ${data.journey[jStep].t}</h3>${data.journey[jStep].html}`;
        jProgress.style.width = `${(jStep / (jBtns.length - 1)) * 100}%`;
    }
    jBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => { jStep = idx; updateJourney(); });
    });
    updateJourney();

    // B. Treatment Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tPanel = document.getElementById('treatment-panel');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            tPanel.innerHTML = data.treatment[e.target.dataset.tab];
        });
    });
    tPanel.innerHTML = data.treatment['radio']; // Init

    // C. Breathing Tool (مع إصلاح التداخل)
    const breathCircle = document.getElementById('breathCircle');
    const breathPhase = document.getElementById('breathPhase');
    const breathTime = document.getElementById('breathTime');
    const btnBStart = document.getElementById('btnBreathStart');
    const btnBPause = document.getElementById('btnBreathPause');
    const btnBStop = document.getElementById('btnBreathStop');
    const selectDuration = document.getElementById('breathDuration');
    const breathSetup = document.getElementById('breathSetup');

    let bTimer, bInterval, bSecLeft = 0, bPaused = false, bActive = false, pSec = 0, pStr = 'ready';
    const pDurs = { inhale: 4, hold: 2, exhale: 6 };

    function fTime(s) {
        return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
    }

    // جعل هذه الدالة متاحة خارجياً للتصفير عند العودة للرئيسية
    window.resetBreathing = function() {
        clearInterval(bTimer); 
        clearInterval(bInterval);
        bActive = false; bPaused = false;
        breathCircle.className = 'breath-circle';
        breathPhase.textContent = 'جاهز؟';
        breathTime.textContent = '00:00';
        btnBStart.classList.remove('hidden');
        btnBPause.classList.add('hidden'); btnBStop.classList.add('hidden');
        breathSetup.style.display = 'block';
        btnBPause.textContent = 'إيقاف مؤقت';
    };

    function execPhase() {
        if (!bActive || bPaused) return;
        if (pStr === 'ready' || pStr === 'exhale') {
            pStr = 'inhale'; pSec = pDurs.inhale; breathPhase.textContent = 'شــهـيــق ...';
        } else if (pStr === 'inhale') {
            pStr = 'hold'; pSec = pDurs.hold; breathPhase.textContent = 'احتفظ بالهواء';
        } else if (pStr === 'hold') {
            pStr = 'exhale'; pSec = pDurs.exhale; breathPhase.textContent = 'زفــيــــر ...';
        }
        breathCircle.className = `breath-circle ${pStr}`;
        clearInterval(bInterval);
        bInterval = setInterval(execPhase, pSec * 1000);
    }

    btnBStart.addEventListener('click', () => {
        // تفريغ المؤقتات القديمة فوراً لمنع التداخل السريع
        clearInterval(bTimer); 
        clearInterval(bInterval);

        bSecLeft = parseInt(selectDuration.value);
        breathTime.textContent = fTime(bSecLeft);
        bActive = true; bPaused = false; pStr = 'ready';
        
        btnBStart.classList.add('hidden');
        btnBPause.classList.remove('hidden'); 
        btnBStop.classList.remove('hidden');
        breathSetup.style.display = 'none';
        
        execPhase();
        bTimer = setInterval(() => {
            if(bPaused) return;
            bSecLeft--; breathTime.textContent = fTime(bSecLeft);
            if(bSecLeft <= 0) { resetBreathing(); breathPhase.textContent = 'أحسنت! انتهى التمرين.'; }
        }, 1000);
    });

    btnBPause.addEventListener('click', () => {
        bPaused = !bPaused;
        btnBPause.textContent = bPaused ? 'استئناف' : 'إيقاف مؤقت';
        if(bPaused) breathCircle.style.animationPlayState = 'paused';
        else { breathCircle.style.animationPlayState = 'running'; breathCircle.className = `breath-circle ${pStr}`; }
    });
    
    btnBStop.addEventListener('click', resetBreathing);

    // D. Accordion Caregiver
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExp = trigger.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.accordion-trigger').forEach(t => {
                t.setAttribute('aria-expanded', 'false');
                t.nextElementSibling.style.maxHeight = null;
            });
            if (!isExp) {
                trigger.setAttribute('aria-expanded', 'true');
                const content = trigger.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // E. Chatbot Logic (مع إصلاح الإدخال الفارغ)
    const cInput = document.getElementById('chatInput');
    const cSend = document.getElementById('chatSend');
    const cBody = document.getElementById('chatBody');
    
    function addMsg(txt, isUser) {
        const div = document.createElement('div');
        div.className = `message ${isUser ? 'user' : 'assistant'}`;
        div.innerHTML = `<div class="bubble"><p>${txt}</p></div>`;
        cBody.appendChild(div);
        cBody.scrollTop = cBody.scrollHeight;
    }

    function doChat() {
        const txt = cInput.value.trim();
        // التحقق من صحة المدخلات (تجاهل الإرسال الفارغ)
        if(!txt) return;
        
        addMsg(txt, true);
        cInput.value = '';
        
        setTimeout(() => {
            let rep = "بصفتي مساعداً تثقيفياً، لا يمكنني تقديم نصائح طبية محددة. يرجى تدوين هذا السؤال ومناقشته مع الفريق الطبي.";
            if(txt.includes('استعد') || txt.includes('تحضير')) rep = "تأكد من إحضار هويتك الطبية، وارتداء ملابس مريحة.";
            if(txt.includes('غثيان')) rep = "يُنصح بتناول وجبات صغيرة متكررة، وتجنب الروائح القوية.";
            addMsg(rep, false);
        }, 800);
    }
    
    cSend.addEventListener('click', doChat);
    cInput.addEventListener('keypress', e => { if(e.key === 'Enter') doChat(); });
    document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => { 
        cInput.value = c.textContent; 
        doChat(); 
    }));
    document.getElementById('clearChat').addEventListener('click', () => {
        cBody.innerHTML = `<div class="message assistant"><div class="bubble"><p>مرحباً بك. أنا مساعدك الرقمي. <strong>أنا أداة آلية ولا يمكنني تقديم استشارة طبية.</strong> كيف يمكنني مساعدتك اليوم؟</p></div></div>`;
    });
});
