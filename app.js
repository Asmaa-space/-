// --- 1. TRANSLATION DICTIONARY ---
const translations = {
    ar: {
        "nav.home": "الرئيسية",
        "nav.journey": "رحلة المريض",
        "nav.treatment": "العلاج",
        "nav.caregiver": "المرافق",
        "nav.education": "التثقيف",
        "nav.breathing": "التنفس",
        "nav.guide": "المساعد",
        "nav.login": "دخول تجريبي",
        "hero.title": "رحلتك مع علاج الأورام تبدأ بالمعرفة والدعم",
        "hero.desc": "منصة رقمية تساعد مرضى الأورام والمرافقين على فهم رحلة العلاج والاستعداد لكل خطوة بسهولة وثقة.",
        "hero.ctaPrimary": "ابدأ رحلة المريض",
        "hero.ctaSecondary": "اسأل KAMC Guide",
        "path.title": "كيف يمكننا مساعدتك؟",
        "path.patient": "المريض",
        "path.caregiver": "المرافق",
        "path.education": "التثقيف",
        "journey.title": "رحلتك العلاجية خطوة بخطوة",
        "journey.prev": "السابق",
        "journey.next": "التالي",
        "treatment.title": "اكتشف أنواع العلاج",
        "treatment.radio": "العلاج الإشعاعي",
        "treatment.chemo": "العلاج الكيميائي",
        "treatment.nuclear": "الطب النووي",
        "treatment.radioTitle": "العلاج الإشعاعي",
        "treatment.radioDesc": "استخدام أشعة عالية الطاقة لتدمير الخلايا السرطانية وتقليص الأورام بدقة عالية.",
        "treatment.radioL1": "جلسات يومية قصيرة",
        "treatment.radioL2": "بدون ألم أثناء الجلسة",
        "treatment.radioL3": "قد يسبب إرهاق مؤقت",
        "treatment.chemoTitle": "العلاج الكيميائي",
        "treatment.chemoDesc": "علاج يعتمد على أدوية قوية لقتل الخلايا سريعة النمو في الجسم.",
        "treatment.chemoL1": "يعطى عادة عن طريق الوريد",
        "treatment.chemoL2": "يتم على شكل دورات",
        "treatment.chemoL3": "الآثار الجانبية تختلف حسب الدواء",
        "treatment.nuclearTitle": "الطب النووي",
        "treatment.nuclearDesc": "استخدام كميات صغيرة من المواد المشعة لتشخيص وعلاج الأمراض.",
        "treatment.nuclearL1": "تصوير دقيق للوظائف الحيوية",
        "treatment.nuclearL2": "علاج موجه لأورام محددة",
        "treatment.nuclearL3": "آمن تحت إشراف طبي متخصص",
        "caregiver.title": "لأن الدعم جزء من رحلة العلاج",
        "caregiver.q1": "الدعم النفسي والعملي",
        "caregiver.a1": "كن مستمعاً جيداً، وقدم المساعدة في المهام اليومية البسيطة لتخفيف العبء.",
        "caregiver.q2": "الاستعداد للمواعيد",
        "caregiver.a2": "قم بتدوين الأسئلة قبل الزيارة، واحتفظ بسجل للأعراض والأدوية.",
        "caregiver.q3": "العناية الذاتية للمرافق",
        "caregiver.a3": "لا تنسَ أخذ فترات راحة. صحتك الجسدية والنفسية ضرورية لتتمكن من تقديم الدعم.",
        "education.title": "المعرفة تمنحك ثقة أكبر",
        "video.v1": "فهم العلاج الإشعاعي",
        "video.v2": "الاستعداد للعلاج الكيميائي",
        "video.v3": "أهمية الدعم النفسي",
        "breath.title": "محاكي تمارين التنفس",
        "breath.desc": "تمرين 4-2-6 للمساعدة على الاسترخاء. هذا للتثقيف العام وليس بروتوكول طبي.",
        "breath.ready": "مستعد؟",
        "breath.inhale": "شهيق",
        "breath.hold": "احتفاظ",
        "breath.exhale": "زفير",
        "breath.start": "بدء",
        "breath.pause": "إيقاف مؤقت",
        "breath.resume": "متابعة",
        "breath.stop": "إنهاء",
        "guide.title": "KAMC Guide",
        "guide.clear": "مسح المحادثة",
        "guide.welcome": "مرحباً بك. أنا المساعد الرقمي للتثقيف. كيف يمكنني مساعدتك اليوم؟",
        "guide.s1": "ما هو العلاج الإشعاعي؟",
        "guide.s2": "كيف أستعد للجلسة؟",
        "guide.input": "اكتب سؤالك هنا...",
        "guide.send": "إرسال",
        "guide.disclaimer": "هذه الخدمة للتثقيف العام ولا تغني عن استشارة الفريق الطبي.",
        "footer.title": "KAMC Oncology Digital Companion",
        "footer.desc": "تجربة تثقيفية صحية مبتكرة لدعم المرضى والمرافقين.",
        "footer.disclaimer": "جميع المعلومات المقدمة هنا هي لأغراض تثقيفية وتوضيحية فقط. يُرجى دائماً استشارة طبيبك المعالج للحصول على قرارات طبية مخصصة.",
        "footer.demo": "نسخة تجريبية (Demo)",
        "modal.demoTitle": "إشعار النسخة التجريبية",
        "modal.demoText": "هذه الخاصية غير مفعلة في هذه النسخة التجريبية. لا يتم طلب أو تخزين أي بيانات حقيقية.",
        "modal.close": "إغلاق",
        "journey.s1.t": "التشخيص",
        "journey.s1.d": "مرحلة الفهم والتقييم المبدئي لتحديد الخطة المناسبة.",
        "journey.s2.t": "فهم العلاج",
        "journey.s2.d": "مناقشة الخيارات العلاجية مع الفريق الطبي وفهم الأهداف.",
        "journey.s3.t": "الاستعداد للعلاج",
        "journey.s3.d": "التحضير الجسدي والنفسي قبل بدء الجلسات.",
        "journey.s4.t": "جلسة العلاج",
        "journey.s4.d": "تلقي الرعاية في المركز حسب الجدول الزمني المحدد.",
        "journey.s5.t": "المتابعة",
        "journey.s5.d": "الرعاية المستمرة وتقييم النتائج بعد انتهاء فترة العلاج.",
        "toast.lang": "تم تحديث لغة العرض بنجاح",
        "toast.path": "تم تحديد المسار، نجهز لك المعلومات..."
    },
    en: {
        "nav.home": "Home",
        "nav.journey": "Journey",
        "nav.treatment": "Treatment",
        "nav.caregiver": "Caregiver",
        "nav.education": "Education",
        "nav.breathing": "Breathing",
        "nav.guide": "Guide",
        "nav.login": "Demo Login",
        "hero.title": "Your Oncology Journey Begins with Knowledge and Support",
        "hero.desc": "A digital platform helping oncology patients and caregivers understand the treatment journey and prepare for every step with confidence.",
        "hero.ctaPrimary": "Start Patient Journey",
        "hero.ctaSecondary": "Ask KAMC Guide",
        "path.title": "How can we help you?",
        "path.patient": "Patient",
        "path.caregiver": "Caregiver",
        "path.education": "Education",
        "journey.title": "Your Treatment Journey Step by Step",
        "journey.prev": "Previous",
        "journey.next": "Next",
        "treatment.title": "Explore Treatments",
        "treatment.radio": "Radiotherapy",
        "treatment.chemo": "Chemotherapy",
        "treatment.nuclear": "Nuclear Medicine",
        "treatment.radioTitle": "Radiotherapy",
        "treatment.radioDesc": "Using high-energy rays to destroy cancer cells and shrink tumors with high precision.",
        "treatment.radioL1": "Short daily sessions",
        "treatment.radioL2": "Painless during the session",
        "treatment.radioL3": "May cause temporary fatigue",
        "treatment.chemoTitle": "Chemotherapy",
        "treatment.chemoDesc": "Treatment relying on strong drugs to kill fast-growing cells in the body.",
        "treatment.chemoL1": "Usually given intravenously",
        "treatment.chemoL2": "Delivered in cycles",
        "treatment.chemoL3": "Side effects vary by medication",
        "treatment.nuclearTitle": "Nuclear Medicine",
        "treatment.nuclearDesc": "Using small amounts of radioactive materials to diagnose and treat diseases.",
        "treatment.nuclearL1": "Precise imaging of vital functions",
        "treatment.nuclearL2": "Targeted therapy for specific tumors",
        "treatment.nuclearL3": "Safe under specialized medical supervision",
        "caregiver.title": "Because Support is Part of Healing",
        "caregiver.q1": "Emotional & Practical Support",
        "caregiver.a1": "Be a good listener and help with simple daily tasks to ease the burden.",
        "caregiver.q2": "Preparing for Appointments",
        "caregiver.a2": "Write down questions before the visit and keep a log of symptoms and medications.",
        "caregiver.q3": "Caregiver Self-Care",
        "caregiver.a3": "Don't forget to take breaks. Your physical and mental health is essential to provide support.",
        "education.title": "Knowledge Gives You Confidence",
        "video.v1": "Understanding Radiotherapy",
        "video.v2": "Preparing for Chemotherapy",
        "video.v3": "Importance of Emotional Support",
        "breath.title": "Breathing Practice Simulator",
        "breath.desc": "4-2-6 exercise to help you relax. This is for general education, not a medical protocol.",
        "breath.ready": "Ready?",
        "breath.inhale": "Inhale",
        "breath.hold": "Hold",
        "breath.exhale": "Exhale",
        "breath.start": "Start",
        "breath.pause": "Pause",
        "breath.resume": "Resume",
        "breath.stop": "Stop",
        "guide.title": "KAMC Guide",
        "guide.clear": "Clear Chat",
        "guide.welcome": "Hello. I am the Digital Education Guide. How can I assist you today?",
        "guide.s1": "What is Radiotherapy?",
        "guide.s2": "How do I prepare?",
        "guide.input": "Type your question here...",
        "guide.send": "Send",
        "guide.disclaimer": "This service is for general education and does not replace medical consultation.",
        "footer.title": "KAMC Oncology Digital Companion",
        "footer.desc": "An innovative health education experience supporting patients and caregivers.",
        "footer.disclaimer": "All information provided here is for educational and illustrative purposes only. Always consult your treating physician for personalized medical decisions.",
        "footer.demo": "Trial Version (Demo)",
        "modal.demoTitle": "Demo Version Notice",
        "modal.demoText": "This feature is not active in this demo version. No real data is requested or stored.",
        "modal.close": "Close",
        "journey.s1.t": "Diagnosis",
        "journey.s1.d": "The phase of understanding and initial evaluation to determine the appropriate plan.",
        "journey.s2.t": "Understanding Treatment",
        "journey.s2.d": "Discussing treatment options with the medical team and understanding goals.",
        "journey.s3.t": "Preparing for Treatment",
        "journey.s3.d": "Physical and psychological preparation before starting sessions.",
        "journey.s4.t": "Treatment Session",
        "journey.s4.d": "Receiving care at the center according to the scheduled timeline.",
        "journey.s5.t": "Follow-up",
        "journey.s5.d": "Continuous care and evaluation of results after the treatment period ends.",
        "toast.lang": "Language updated successfully",
        "toast.path": "Path selected, preparing information..."
    }
};

// --- 2. STATE MANAGEMENT & LANGUAGE ---
let currentLang = localStorage.getItem('kamcLang') || 'ar';

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('kamcLang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.getElementById('langSwitcher').textContent = lang === 'ar' ? 'English' : 'العربية';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Re-render dynamic content
    updateJourneyUI();
    updateTreatmentUI(document.querySelector('.tab-btn.active').dataset.tab);
    if (!isBreathing) updateBreathUI('ready', '--');
}

// --- 3. RESPONSIVE NAVIGATION ---
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
});

// Close nav on click outside or link click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// --- 4. PATIENT JOURNEY ---
let currentStep = 0;
const stepBtns = document.querySelectorAll('.step-btn');
const btnPrev = document.getElementById('prevStep');
const btnNext = document.getElementById('nextStep');
const stepTitle = document.getElementById('stepTitle');
const stepDesc = document.getElementById('stepDesc');

function updateJourneyUI() {
    stepBtns.forEach((btn, index) => {
        btn.classList.toggle('active', index === currentStep);
    });
    
    stepTitle.textContent = translations[currentLang][`journey.s${currentStep + 1}.t`];
    stepDesc.textContent = translations[currentLang][`journey.s${currentStep + 1}.d`];

    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === 4;
}

btnPrev.addEventListener('click', () => { if(currentStep > 0) { currentStep--; updateJourneyUI(); }});
btnNext.addEventListener('click', () => { if(currentStep < 4) { currentStep++; updateJourneyUI(); }});
stepBtns.forEach((btn, index) => btn.addEventListener('click', () => { currentStep = index; updateJourneyUI(); }));

// --- 5. TREATMENT EXPLORER ---
const tabBtns = document.querySelectorAll('.tab-btn');
const treatmentContent = document.getElementById('treatmentContent');

function updateTreatmentUI(tabId) {
    tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    
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

tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => updateTreatmentUI(e.target.dataset.tab));
});

// --- 6. CAREGIVER ACCORDION ---
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

// --- 7. BREATHING SIMULATOR ---
let breathTimer;
let breathTimeLeft = 0;
let breathPhase = 'ready'; // ready, inhale, hold, exhale
let isBreathing = false;
let isPaused = false;

const circle = document.getElementById('breathCircle');
const instEl = document.getElementById('breathInstruction');
const timeEl = document.getElementById('breathTimer');
const btnStart = document.getElementById('btnBreathStart');
const btnPause = document.getElementById('btnBreathPause');
const btnStop = document.getElementById('btnBreathStop');

function updateBreathUI(phase, time) {
    if(phase !== 'ready') instEl.textContent = translations[currentLang][`breath.${phase}`];
    else instEl.textContent = translations[currentLang]['breath.ready'];
    timeEl.textContent = time;

    if(phase === 'inhale') { circle.style.transform = 'scale(1)'; circle.style.transitionDuration = '4s'; }
    if(phase === 'hold') { circle.style.transitionDuration = '0s'; }
    if(phase === 'exhale') { circle.style.transform = 'scale(0.5)'; circle.style.transitionDuration = '6s'; }
    if(phase === 'ready') { circle.style.transform = 'scale(0.5)'; circle.style.transitionDuration = '1s'; }
}

function runBreathCycle() {
    if(isPaused || !isBreathing) return;
    breathTimeLeft--;

    if(breathTimeLeft <= 0) {
        if(breathPhase === 'inhale') { breathPhase = 'hold'; breathTimeLeft = 2; }
        else if(breathPhase === 'hold') { breathPhase = 'exhale'; breathTimeLeft = 6; }
        else if(breathPhase === 'exhale') { breathPhase = 'inhale'; breathTimeLeft = 4; }
        updateBreathUI(breathPhase, breathTimeLeft);
    } else {
        timeEl.textContent = breathTimeLeft;
    }
}

btnStart.addEventListener('click', () => {
    isBreathing = true;
    isPaused = false;
    breathPhase = 'inhale';
    breathTimeLeft = 4;
    updateBreathUI(breathPhase, breathTimeLeft);
    
    btnStart.classList.add('hidden');
    btnPause.classList.remove('hidden');
    btnStop.classList.remove('hidden');
    
    clearInterval(breathTimer);
    breathTimer = setInterval(runBreathCycle, 1000);
});

btnPause.addEventListener('click', () => {
    isPaused = !isPaused;
    btnPause.textContent = isPaused ? translations[currentLang]['breath.resume'] : translations[currentLang]['breath.pause'];
    if(isPaused) { circle.style.transitionDuration = '0s'; } 
    else { updateBreathUI(breathPhase, breathTimeLeft); }
});

btnStop.addEventListener('click', () => {
    isBreathing = false;
    isPaused = false;
    clearInterval(breathTimer);
    updateBreathUI('ready', '--');
    btnStart.classList.remove('hidden');
    btnPause.classList.add('hidden');
    btnStop.classList.add('hidden');
    btnPause.textContent = translations[currentLang]['breath.pause'];
});

// --- 8. KAMC GUIDE (CHAT) ---
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.getElementById('chatBody');
const clearChat = document.getElementById('clearChat');
const chatChips = document.querySelectorAll('#chatSuggestions .chip');

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    const p = document.createElement('p');
    p.textContent = text;
    msgDiv.appendChild(p);
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
    const text = input.toLowerCase();
    const responses = {
        ar: {
            "إشعاعي": "العلاج الإشعاعي يستخدم أشعة دقيقة للقضاء على الخلايا المريضة. هل ترغب في قراءة المزيد في قسم العلاج؟",
            "استعد": "للاستعداد جيداً، احرص على ارتداء ملابس مريحة، تدوين أسئلتك للطبيب، والحصول على قسط كاف من الراحة.",
            "مرافق": "قسم المرافق يحتوي على نصائح مخصصة للدعم النفسي والعملي. يمكنك الوصول إليه من القائمة العلوية.",
            "افتراضي": "شكراً لسؤالك. هذه النسخة التجريبية محدودة الردود، لكن يمكنك استكشاف الأقسام التعليمية أعلاه."
        },
        en: {
            "radiotherapy": "Radiotherapy uses precise rays to target diseased cells. Would you like to read more in the Treatment section?",
            "prepare": "To prepare well, wear comfortable clothes, write down your questions, and get plenty of rest.",
            "caregiver": "The Caregiver section contains tips for emotional and practical support. You can access it from the menu.",
            "default": "Thank you for asking. This demo has limited responses, but please explore the educational sections above."
        }
    };
    
    let reply = responses[currentLang]["default"];
    if(text.includes("إشعاع") || text.includes("radio")) reply = responses[currentLang]["إشعاعي"] || responses["en"]["radiotherapy"];
    if(text.includes("استعد") || text.includes("prep")) reply = responses[currentLang]["استعد"] || responses["en"]["prepare"];
    if(text.includes("مرافق") || text.includes("caregiver")) reply = responses[currentLang]["مرافق"] || responses["en"]["caregiver"];
    
    setTimeout(() => addMessage(reply, 'assistant'), 600);
}

chatSend.addEventListener('click', () => {
    const val = chatInput.value.trim();
    if(!val) return;
    addMessage(val, 'user');
    chatInput.value = '';
    getBotResponse(val);
});

chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') chatSend.click();
});

chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
        addMessage(chip.textContent, 'user');
        getBotResponse(chip.textContent);
    });
});

clearChat.addEventListener('click', () => {
    chatBody.innerHTML = `<div class="chat-message assistant"><p>${translations[currentLang]['guide.welcome']}</p></div>`;
});

// --- 9. MODALS (Demo & Video) ---
const dialog = document.getElementById('demoModal');
const btnCloseModal = document.getElementById('closeModal');

document.getElementById('loginBtn').addEventListener('click', () => dialog.showModal());
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => dialog.showModal());
    card.addEventListener('keypress', (e) => { if(e.key === 'Enter') dialog.showModal(); });
});

btnCloseModal.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
    if(e.target === dialog) dialog.close();
});

// --- 10. HEURISTIC FEEDBACK (TOAST SYSTEM) ---
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

// Update Events to use Toasts
document.getElementById('langSwitcher').addEventListener('click', () => {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    showToast('toast.lang');
});

document.querySelectorAll('.path-card').forEach(card => {
    card.addEventListener('click', () => {
        showToast('toast.path');
        setTimeout(() => {
            document.getElementById('journey').scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });
});

// --- 11. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    updateJourneyUI();
});
