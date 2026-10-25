document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    // Handle Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('show');
        });
    }

    // Handle Direct Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active classes
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.add('hidden'));

            // Add active class to clicked link and corresponding section
            const targetId = link.getAttribute('data-target');
            link.classList.add('active');
            document.getElementById(targetId).classList.remove('hidden');

            // Close mobile menu if open
            if (mainNav.classList.contains('show')) {
                mainNav.classList.remove('show');
            }

            // Scroll to top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Stop breathing tool if navigating away
            if (targetId !== 'practice' && document.getElementById('stopTrainBtn')) {
                document.getElementById('stopTrainBtn').click();
            }
        });
    });

    // 2. DIBH Breathing Tool Logic
    let breathTimerInt, phaseTimeout;
    let bPhase = 'ready', bTime = 0;
    
    const breathUI = {
        circle: document.getElementById('breathCircle'),
        inst: document.getElementById('breath-inst'),
        timer: document.getElementById('breath-timer'),
        btnStart: document.getElementById('startTrainBtn'),
        btnStop: document.getElementById('stopTrainBtn'),
        stats: document.getElementById('completedSessions')
    };

    // Load saved sessions from local storage
    let sessionsCount = parseInt(localStorage.getItem('dibhSessionsCount')) || 0;
    if(breathUI.stats) breathUI.stats.textContent = sessionsCount;

    function startBreathingCycle() {
        if (bPhase === 'ready' || bPhase === 'exhale') {
            bPhase = 'inhale';
            breathUI.inst.textContent = "شهيق عميق";
            breathUI.circle.className = 'breath-circle inhale';
            phaseTimeout = setTimeout(startBreathingCycle, 4000);
            
        } else if (bPhase === 'inhale') {
            bPhase = 'hold';
            breathUI.inst.textContent = "احبسي نفسك";
            breathUI.circle.className = 'breath-circle hold';
            phaseTimeout = setTimeout(startBreathingCycle, 15000); // 15s hold
            
        } else if (bPhase === 'hold') {
            bPhase = 'exhale';
            breathUI.inst.textContent = "زفير ببطء";
            breathUI.circle.className = 'breath-circle exhale';
            phaseTimeout = setTimeout(startBreathingCycle, 6000);
        }
    }

    if(breathUI.btnStart && breathUI.btnStop) {
        breathUI.btnStart.addEventListener('click', () => {
            breathUI.btnStart.classList.add('hidden');
            breathUI.btnStop.classList.remove('hidden');
            bPhase = 'ready'; bTime = 0;
            
            startBreathingCycle();
            
            breathTimerInt = setInterval(() => {
                bTime++;
                const m = Math.floor(bTime / 60).toString().padStart(2, '0');
                const s = (bTime % 60).toString().padStart(2, '0');
                breathUI.timer.textContent = `${m}:${s}`;
                
                // End session after 60 seconds of successful practice
                if(bTime >= 60) {
                    breathUI.btnStop.click();
                    sessionsCount++;
                    localStorage.setItem('dibhSessionsCount', sessionsCount);
                    breathUI.stats.textContent = sessionsCount;
                    alert("ممتاز! أتممتِ جلسة تدريب. خذي قسطاً من الراحة الآن.");
                }
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
