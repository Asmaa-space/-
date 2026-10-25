document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Set current date in Hero
    const dateEl = document.getElementById('currentDate');
    if(dateEl) {
        const d = new Date();
        const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        dateEl.textContent = `تراجع طبياً | ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    // 2. Journey Stepper Logic
    let currentStep = 0;
    const stepsData = [
        { title: "التشخيص", desc: "مرحلة الفهم والتقييم المبدئي لتحديد الخطة المناسبة بالتشاور مع طبيبك." },
        { title: "الخطة العلاجية", desc: "مناقشة خيارات العلاج، الأعراض الجانبية المحتملة، وتحديد الجدول الزمني." },
        { title: "الاستعداد", desc: "إجراء الفحوصات الطبية النهائية والتحضير النفسي والجسدي قبل الجلسة الأولى." },
        { title: "الجلسات", desc: "تلقي العلاج في المواعيد المحددة مع اتباع إرشادات الفريق الطبي بدقة." },
        { title: "المتابعة", desc: "مراقبة التقدم بعد انتهاء الجلسات لضمان التعافي وتجنب المضاعفات." }
    ];

    const circles = document.querySelectorAll('.circle');
    const stepTitle = document.getElementById('step-title');
    const stepDesc = document.getElementById('step-desc');
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');

    function updateStepper() {
        if(!stepTitle) return;
        circles.forEach((circle, idx) => {
            circle.classList.toggle('active', idx === currentStep);
        });
        stepTitle.textContent = stepsData[currentStep].title;
        stepDesc.textContent = stepsData[currentStep].desc;
        
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === stepsData.length - 1;
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { if(currentStep < 4) { currentStep++; updateStepper(); } });
        prevBtn.addEventListener('click', () => { if(currentStep > 0) { currentStep--; updateStepper(); } });
        circles.forEach((circle, idx) => {
            circle.addEventListener('click', () => { currentStep = idx; updateStepper(); });
        });
    }

    // 3. Treatments Tabs Logic
    const tabBtns = document.querySelectorAll('.treatment-tabs .tab-btn');
    const tabTitle = document.getElementById('tab-title');
    const tabDesc = document.getElementById('tab-desc');
    const treatmentData = {
        radio: { t: "العلاج الإشعاعي", d: "استخدام أشعة عالية الطاقة لتدمير الخلايا السرطانية موضعياً بأمان ودقة عالية باستخدام أحدث الأجهزة. إجراء سريع وغير مؤلم." },
        chemo: { t: "العلاج الكيميائي", d: "أدوية قوية تُعطى عبر الوريد أو الفم للقضاء على الخلايا السرطانية سريعة النمو في مختلف أنحاء الجسم." },
        nuclear: { t: "الطب النووي", d: "استخدام كميات ضئيلة ومحسوبة من النظائر المشعة لتشخيص وتحديد موقع الأورام بدقة متناهية قبل وأثناء العلاج." }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const data = treatmentData[e.target.dataset.target];
            tabTitle.textContent = data.t;
            tabDesc.textContent = data.d;
        });
    });

    // 4. DIBH Internal Tabs
    window.switchDibhTab = function(targetId) {
        document.querySelectorAll('.dibh-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.dibh-panel').forEach(p => p.classList.add('hidden'));
        
        const btn = document.querySelector(`.dibh-tab[data-dibh="${targetId}"]`);
        const panel = document.getElementById(`dibh-${targetId}`);
        
        if(btn && panel) {
            btn.classList.add('active');
            panel.classList.remove('hidden');
        }
    }

    document.querySelectorAll('.dibh-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchDibhTab(e.target.dataset.dibh);
        });
    });

    // 5. DIBH Breathing App Logic
    let breathTimerInt, phaseTimeout;
    let bTime = 0, bPhase = 'ready';
    let completedSessions = parseInt(localStorage.getItem('dibhSessionsLevel2')) || 2; // Default starting at level 2 for demo

    const UI = {
        circle: document.getElementById('breathCircle'),
        inst: document.getElementById('breath-instruction'),
        timer: document.getElementById('breath-timer'),
        startBtn: document.getElementById('startBreath'),
        stopBtn: document.getElementById('stopBreath'),
        sessionsCount: document.getElementById('totalSessions')
    };

    function startBreathingCycle() {
        if (bPhase === 'ready' || bPhase === 'exhale') {
            bPhase = 'inhale';
            UI.inst.textContent = "شهيق عميق (من الصدر)";
            UI.circle.className = 'breath-circle-clean inhale';
            phaseTimeout = setTimeout(startBreathingCycle, 4000);
        } else if (bPhase === 'inhale') {
            bPhase = 'hold';
            UI.inst.textContent = "احبسي نفسك";
            UI.circle.className = 'breath-circle-clean hold';
            phaseTimeout = setTimeout(startBreathingCycle, 15000); // 15 seconds hold target
        } else if (bPhase === 'hold') {
            bPhase = 'exhale';
            UI.inst.textContent = "زفير ببطء";
            UI.circle.className = 'breath-circle-clean exhale';
            phaseTimeout = setTimeout(startBreathingCycle, 6000);
        }
    }

    if(UI.startBtn) {
        UI.startBtn.addEventListener('click', () => {
            UI.startBtn.classList.add('hidden');
            UI.stopBtn.classList.remove('hidden');
            bTime = 0; bPhase = 'ready';
            
            startBreathingCycle();
            
            breathTimerInt = setInterval(() => {
                bTime++;
                const m = Math.floor(bTime / 60).toString().padStart(2, '0');
                const s = (bTime % 60).toString().padStart(2, '0');
                UI.timer.textContent = `${m}:${s}`;
                
                // End session automatically after 60 seconds of training
                if(bTime >= 60) {
                    UI.stopBtn.click();
                    completedSessions++;
                    localStorage.setItem('dibhSessionsLevel2', completedSessions);
                    if(UI.sessionsCount) UI.sessionsCount.textContent = completedSessions;
                    alert("ممتاز! أتممتِ جلسة تدريب. تذكري الراحة وعدم إجهاد نفسك.");
                }
            }, 1000);
        });

        UI.stopBtn.addEventListener('click', () => {
            clearInterval(breathTimerInt);
            clearTimeout(phaseTimeout);
            UI.circle.className = 'breath-circle-clean';
            UI.inst.textContent = "جاهز؟";
            UI.timer.textContent = "00:00";
            UI.startBtn.classList.remove('hidden');
            UI.stopBtn.classList.add('hidden');
        });
    }

    // 6. Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const body = this.nextElementSibling;
            const span = this.querySelector('span');
            if (body.classList.contains('hidden')) {
                body.classList.remove('hidden');
                span.textContent = '▲';
            } else {
                body.classList.add('hidden');
                span.textContent = '▼';
            }
        });
    });

    // 7. Chatbot Simulation
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = chatInput.value.trim();
            if (!msg) return;

            // User Message
            chatWindow.innerHTML += `<div class="msg user">${msg}</div>`;
            chatInput.value = '';
            chatWindow.scrollTop = chatWindow.scrollHeight;

            // AI Typing
            const typingId = 'typing-' + Date.now();
            chatWindow.innerHTML += `<div class="msg ai" id="${typingId}">جاري كتابة الرد...</div>`;
            chatWindow.scrollTop = chatWindow.scrollHeight;

            // AI Response (Mock)
            setTimeout(() => {
                const typingEl = document.getElementById(typingId);
                if(typingEl) {
                    if(msg.includes('ألم')) {
                        typingEl.textContent = "لإدارة الألم، يرجى الالتزام بالأدوية الموصوفة ومراجعة طبيبك فوراً إذا زادت الحدة. يمكنك حجز موعد عبر بوابة المريض.";
                    } else if (msg.includes('موعد') || msg.includes('جلسة')) {
                        typingEl.textContent = "استعداداً لجلستك القادمة: احرصي على ارتداء ملابس قطنية مريحة، وأخذ قسط كافٍ من النوم، وتجنب الوجبات الثقيلة قبل الموعد بساعتين.";
                    } else {
                        typingEl.textContent = "بصفتي مساعداً تثقيفياً، أنصحك بمراجعة قسم 'الدليل الإرشادي' في الموقع، وتدوين أسئلتك لمناقشتها مع طبيبك المختص في أقرب زيارة.";
                    }
                }
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 1200);
        });
    }
});
