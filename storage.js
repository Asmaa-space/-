<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>منصة تقريري | نسخة الجوال الاحترافية</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        /* ==========================================================================
           1. نظام تصميم المكونات الثابت والمتغيرات البصرية (SaaS Design Tokens)
           ========================================================================== */
        :root {
            --bg-base: #090D16; --bg-surface: #1E293B; --bg-surface-hover: #2E3B4E; --bg-input: #0F172A;
            --border-color: rgba(255, 255, 255, 0.08); --border-focus: #6366F1;
            --primary: #6366F1; --primary-hover: #4F46E5; --primary-glow: rgba(99, 102, 241, 0.25);
            --accent: #10B981; --danger: #EF4444; --warning: #F59E0B; --info: #3B82F6;
            --text-main: #F8FAFC; --text-muted: #94A3B8; --text-inverse: #0F172A;
            --font-ar: 'Cairo', system-ui, sans-serif; --font-en: 'Inter', system-ui, sans-serif;
            --radius-sm: 6px; --radius-md: 12px; --radius-lg: 16px; --radius-circle: 50%;
            --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 24px; --space-6: 32px;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05); --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1); --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            --transition-smooth: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="light"] {
            --bg-base: #F8FAFC; --bg-surface: #FFFFFF; --bg-surface-hover: #F1F5F9; --bg-input: #FFFFFF;
            --border-color: #E2E8F0; --text-main: #0F172A; --text-muted: #64748B;
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
        }

        [dir="rtl"] { font-family: var(--font-ar); } [dir="ltr"] { font-family: var(--font-en); }
        
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent; }
        
        body, html {
            background-color: var(--bg-base); color: var(--text-main); font-family: inherit;
            line-height: 1.5; overflow-x: hidden; width: 100%; height: 100%;
            transition: background-color 0.25s ease, color 0.25s ease;
        }

        *:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
        .hidden { display: none !important; }
        .text-gradient { background: linear-gradient(135deg, var(--primary), #8B5CF6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .badge { display: inline-flex; align-items: center; padding: 4px 10px; font-size: 0.8rem; font-weight: 700; border-radius: var(--radius-sm); background-color: rgba(99, 102, 241, 0.1); color: var(--primary); border: 1px solid rgba(99, 102, 241, 0.15); }

        /* ==========================================================================
           2. معالج الإعداد الترحيبي (Onboarding Wizard)
           ========================================================================== */
        .onboarding-screen { position: fixed; inset: 0; background-color: var(--bg-base); z-index: 1500; display: flex; align-items: center; justify-content: center; padding: var(--space-4); overflow-y: auto; }
        .wizard-container { width: 100%; max-width: 700px; background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: var(--space-5); margin: auto; }
        .wizard-header { text-align: center; margin-bottom: var(--space-4); }
        .stepper-axis { display: flex; justify-content: space-between; position: relative; margin-bottom: var(--space-5); }
        .stepper-axis::before { content: ''; position: absolute; top: 15px; left: 0; right: 0; height: 3px; background-color: var(--border-color); z-index: 1; }
        .stepper-progress-bar { position: absolute; top: 15px; right: 0; left: 100%; height: 3px; background-color: var(--primary); z-index: 2; transition: var(--transition-smooth); }
        [dir="ltr"] .stepper-progress-bar { right: 100%; left: 0; }
        .step-node { width: 32px; height: 32px; border-radius: var(--radius-circle); background-color: var(--bg-base); border: 2px solid var(--border-color); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem; z-index: 3; transition: var(--transition-smooth); color: var(--text-muted); }
        .step-node.active { border-color: var(--primary); background-color: var(--primary); color: #fff; box-shadow: 0 0 10px var(--primary-glow); }
        .step-node.completed { border-color: var(--accent); background-color: var(--accent); color: #fff; }
        .wizard-step-panel { display: none; animation: stepFadeIn 0.25s ease forwards; }
        .wizard-step-panel.active { display: block; }
        @keyframes stepFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        .form-group { display: flex; flex-direction: column; gap: var(--space-2); }
        .form-group.full-width { grid-column: span 2; }
        .form-label { font-size: 0.9rem; font-weight: 600; }
        .wizard-actions { display: flex; justify-content: space-between; margin-top: var(--space-5); padding-top: var(--space-4); border-top: 1px solid var(--border-color); gap: var(--space-2); flex-wrap: wrap; }

        /* ==========================================================================
           3. الهيكل المعماري والتنقل (Layout & Navigation)
           ========================================================================== */
        .app-shell { display: grid; grid-template-columns: 270px 1fr; height: 100vh; width: 100%; overflow: hidden; position: relative; }
        
        /* تأثير التعتيم للخلفية في الجوال */
        .mobile-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(2px); z-index: 400; opacity: 0; pointer-events: none; transition: var(--transition-smooth); }
        .mobile-overlay.active { opacity: 1; pointer-events: auto; }

        .sidebar { background-color: var(--bg-surface); border-inline-end: 1px solid var(--border-color); padding: var(--space-4) var(--space-3); display: flex; flex-direction: column; z-index: 500; }
        .sidebar-brand { font-size: 1.5rem; font-weight: 800; display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-5); padding: 0 var(--space-2); }
        .close-sidebar-btn { display: none; background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; }
        
        .sidebar-menu { display: flex; flex-direction: column; gap: var(--space-1); flex: 1; overflow-y: auto; }
        .menu-item { display: flex; align-items: center; gap: var(--space-3); padding: 0 var(--space-3); min-height: 48px; border-radius: var(--radius-md); color: var(--text-muted); font-weight: 600; text-decoration: none; cursor: pointer; transition: var(--transition-smooth); user-select: none; }
        .menu-item:hover, .menu-item.active { background-color: rgba(99, 102, 241, 0.08); color: var(--primary); }
        .menu-item.danger-link { color: var(--danger); margin-top: auto; }
        .menu-item.danger-link:hover { background-color: rgba(239, 68, 68, 0.1); }

        .main-frame { display: flex; flex-direction: column; overflow: hidden; width: 100%; position: relative; }
        .top-bar { height: 70px; background-color: var(--bg-surface); border-bottom: 1px solid var(--border-color); padding: 0 var(--space-5); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        
        .mobile-menu-toggle { display: none; background: transparent; border: 1px solid var(--border-color); color: var(--text-main); font-size: 1.2rem; border-radius: var(--radius-md); width: 44px; height: 44px; align-items: center; justify-content: center; cursor: pointer; }
        
        .breadcrumbs { font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: var(--space-2); }
        .top-bar-actions { display: flex; align-items: center; gap: var(--space-2); }

        /* الأزرار والإدخالات مهيأة للمس (Touch Targets) */
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); padding: 0 var(--space-4); min-height: 44px; border-radius: var(--radius-md); font-weight: 600; font-size: 0.95rem; cursor: pointer; border: 1px solid transparent; transition: var(--transition-smooth); white-space: nowrap; }
        .btn-primary { background-color: var(--primary); color: #fff; box-shadow: 0 4px 12px var(--primary-glow); }
        .btn-primary:hover { background-color: var(--primary-hover); }
        .btn-secondary { background-color: transparent; border-color: var(--border-color); color: var(--text-main); }
        .btn-secondary:hover { background-color: var(--bg-surface-hover); }
        .btn-danger { background-color: rgba(239, 68, 68, 0.08); color: var(--danger); border-color: rgba(239, 68, 68, 0.15); }

        .input-element, .select-element, .textarea-element { width: 100%; min-height: 48px; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-input); color: var(--text-main); font-family: inherit; font-size: 1rem; outline: none; transition: var(--transition-smooth); }
        .textarea-element { min-height: 100px; resize: vertical; }

        .view-content { flex: 1; padding: var(--space-5); overflow-y: auto; overflow-x: hidden; position: relative; width: 100%; }
        .app-view { display: none; animation: viewFadeIn 0.3s ease forwards; }
        .app-view.active { display: block; }
        @keyframes viewFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .ui-card { background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--space-5); box-shadow: var(--shadow-md); overflow: hidden; }

        /* ==========================================================================
           4. الشبكات والمكونات (Dashboard Grids & Components)
           ========================================================================== */
        .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-4); }
        .kpi-card { display: flex; align-items: center; justify-content: space-between; }
        .kpi-val { font-size: 2.2rem; font-weight: 800; color: var(--primary); line-height: 1.2; margin-top: var(--space-1); }

        .timeline-stream { display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4); }
        .timeline-node { display: grid; grid-template-columns: auto 1fr; gap: var(--space-3); position: relative; }
        .timeline-axis { width: 2px; background-color: var(--border-color); position: absolute; top: 32px; bottom: -24px; left: 15px; }
        [dir="ltr"] .timeline-axis { left: auto; right: 15px; }
        .timeline-dot { width: 32px; height: 32px; border-radius: var(--radius-circle); background-color: var(--bg-input); border: 2px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; z-index: 2; }
        .timeline-body { background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: var(--space-4); }

        /* ==========================================================================
           5. محرك التقارير (Reports Engine)
           ========================================================================== */
        .report-controls-panel { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-4); }
        .academic-paper-wrapper { width: 100%; overflow-x: auto; padding-bottom: 20px; }
        .academic-paper-canvas { background-color: #ffffff; color: #1E293B; padding: 40px; box-shadow: var(--shadow-lg); border-radius: var(--radius-sm); min-width: 700px; max-width: 840px; margin: 0 auto; border: 1px solid #CBD5E1; transition: var(--transition-smooth); }
        .report-rich-editor { outline: none; line-height: 1.8; font-size: 1.05rem; min-height: 300px; margin-top: var(--space-4); text-align: justify; }
        .report-meta-table { width: 100%; border-collapse: collapse; margin: var(--space-4) 0; font-size: 0.95rem; }
        .report-meta-table td, .report-meta-table th { border: 1px solid #E2E8F0; padding: 12px; text-align: start; }
        .report-meta-table th { background-color: #F8FAFC; color: #1E293B; }
        .report-signatures-area { display: flex; justify-content: space-between; margin-top: 50px; padding-top: var(--space-4); flex-wrap: wrap; gap: 20px; }
        .signature-line { width: 200px; border-top: 1px solid #94A3B8; text-align: center; padding-top: var(--space-2); font-weight: 600; font-size: 0.9rem; }

        /* ==========================================================================
           6. التصميم المتجاوب العابر لجميع الشاشات والجوال (Mobile Responsiveness)
           ========================================================================== */
        @media (max-width: 1024px) {
            .app-shell { grid-template-columns: 1fr; }
            .mobile-menu-toggle { display: flex; }
            .close-sidebar-btn { display: block; }
            
            /* سلوك القائمة المنسدلة الجانبية (Drawer) */
            .sidebar { position: fixed; top: 0; bottom: 0; right: -320px; width: 280px; transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: -5px 0 25px rgba(0,0,0,0.5); }
            .sidebar.active { right: 0; }
            [dir="ltr"] .sidebar { right: auto; left: -320px; box-shadow: 5px 0 25px rgba(0,0,0,0.5); }
            [dir="ltr"] .sidebar.active { left: 0; }
        }

        @media (max-width: 640px) {
            /* تعديلات الهيكل والأشرطة العلوية */
            .top-bar { height: 60px; padding: 0 var(--space-3); }
            .breadcrumbs { font-size: 0.85rem; }
            .top-bar-actions .btn { padding: 0 var(--space-2); min-width: 40px; }
            #user-avatar { width: 34px !important; height: 34px !important; font-size: 0.8rem; }
            
            .view-content { padding: var(--space-3); }
            
            /* معالجة النماذج والإدخالات */
            .form-grid { grid-template-columns: 1fr; gap: var(--space-3); }
            .wizard-container { padding: var(--space-4) var(--space-3); margin: var(--space-2); border-radius: var(--radius-md); }
            .wizard-actions { flex-direction: column-reverse; }
            .wizard-actions .btn { width: 100%; }
            
            /* إصلاح بطاقات الإحصائيات (تأخذ العرض كاملاً لتكون واضحة) */
            .dashboard-grid { grid-template-columns: 1fr; gap: var(--space-3); margin-bottom: var(--space-3); }
            .ui-card { padding: var(--space-4); border-radius: var(--radius-md); }
            
            .kpi-card { flex-direction: row; align-items: center; justify-content: space-between; }
            .kpi-val { font-size: 1.8rem; margin-top: 0; }
            .kpi-card .text-muted { font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 2px; }
            
            /* إصلاح الرسوم البيانية */
            #chart-dashboard-categories { height: 260px !important; width: 100% !important; }
            
            /* إحكام السجل والمهام */
            .timeline-node { gap: var(--space-2); }
            .timeline-axis { left: 11px; }
            [dir="ltr"] .timeline-axis { right: 11px; }
            .timeline-dot { width: 24px; height: 24px; font-size: 0.6rem; }
            .timeline-body { padding: var(--space-3); }
            
            /* أزرار الإجراءات داخل الصفحات */
            .view-content .btn-primary { width: 100%; justify-content: center; margin-bottom: var(--space-2); }
            #view-journal > div:first-child { flex-direction: column; align-items: flex-start; gap: var(--space-3); }
            #view-journal > div:first-child button { width: 100%; }

            /* التقارير على الجوال */
            .academic-paper-canvas { padding: 20px; min-width: 600px; /* سيتيح التمرير الأفقي بسلاسة داخل الحاوية وليس في الشاشة */ }
            .report-controls-panel .btn { width: 100%; margin-bottom: var(--space-2); }
        }

        /* ==========================================================================
           7. هندسة الطباعة
           ========================================================================== */
        @media print {
            body { background: #ffffff !important; color: #000000 !important; overflow: visible !important; }
            .sidebar, .top-bar, .report-controls-panel, .mobile-overlay, .no-print { display: none !important; }
            .app-shell { grid-template-columns: 1fr !important; }
            .view-content { padding: 0 !important; overflow: visible !important; }
            .academic-paper-wrapper { overflow: visible !important; }
            .academic-paper-canvas { box-shadow: none !important; border: none !important; padding: 0 !important; max-width: 100% !important; min-width: 100% !important; margin: 0 !important; }
        }
    </style>
</head>
<body>

    <div class="mobile-overlay" id="mobile-overlay" onclick="MobileNav.close()"></div>

    <div id="onboarding-layer" class="onboarding-screen hidden">
        <div class="wizard-container" role="dialog">
            <header class="wizard-header">
                <h2 id="wizard-main-title" class="text-gradient">تهيئة ملف التدريب</h2>
            </header>
            <div class="stepper-axis">
                <div class="stepper-progress-bar" id="wizard-progress-bar"></div>
                <div class="step-node active" id="step-node-1">1</div>
                <div class="step-node" id="step-node-2">2</div>
                <div class="step-node" id="step-node-3">3</div>
                <div class="step-node" id="step-node-4">4</div>
            </div>
            <form id="onboarding-core-form" onsubmit="WizardEngine.handleSubmit(event)">
                <div class="wizard-step-panel active" id="wizard-step-1">
                    <div class="form-grid">
                        <div class="form-group full-width"><label class="form-label">الاسم الكامل للمتدرب</label><input type="text" id="wz-name" class="input-element" required></div>
                        <div class="form-group"><label class="form-label">المدينة</label><input type="text" id="wz-city" class="input-element" required value="مكة المكرمة"></div>
                        <div class="form-group"><label class="form-label">الدولة</label><input type="text" id="wz-country" class="input-element" required value="السعودية"></div>
                    </div>
                </div>
                <div class="wizard-step-panel" id="wizard-step-2">
                    <div class="form-grid">
                        <div class="form-group full-width"><label class="form-label">الجامعة</label><input type="text" id="wz-uni" class="input-element" required value="جامعة أم القرى"></div>
                        <div class="form-group"><label class="form-label">الكلية</label><input type="text" id="wz-college" class="input-element" required></div>
                        <div class="form-group"><label class="form-label">التخصص</label><input type="text" id="wz-major" class="input-element" required></div>
                    </div>
                </div>
                <div class="wizard-step-panel" id="wizard-step-3">
                    <div class="form-grid">
                        <div class="form-group"><label class="form-label">جهة التدريب</label><input type="text" id="wz-comp" class="input-element" required value="سلة Salla"></div>
                        <div class="form-group"><label class="form-label">القسم</label><input type="text" id="wz-dept" class="input-element" required></div>
                        <div class="form-group full-width"><label class="form-label">اسم المشرف</label><input type="text" id="wz-super" class="input-element" required></div>
                    </div>
                </div>
                <div class="wizard-step-panel" id="wizard-step-4">
                    <div class="form-grid">
                        <div class="form-group"><label class="form-label">الساعات المطلوبة</label><input type="number" id="wz-hrs-target" class="input-element" required value="600"></div>
                        <div class="form-group"><label class="form-label">تاريخ البدء</label><input type="date" id="wz-start" class="input-element" required></div>
                    </div>
                </div>
                <div class="wizard-actions">
                    <button type="button" class="btn btn-secondary hidden" id="wizard-prev-btn" onclick="WizardEngine.prevStep()">السابق</button>
                    <button type="button" class="btn btn-primary" id="wizard-next-btn" onclick="WizardEngine.nextStep()">التالي</button>
                    <button type="submit" class="btn btn-primary hidden" id="wizard-submit-btn">إنهاء الإعداد</button>
                </div>
            </form>
        </div>
    </div>

    <div class="app-shell" id="main-app-shell">
        <aside class="sidebar" id="app-sidebar" role="navigation">
            <div class="sidebar-brand">
                <span class="text-gradient">✨ تقريري</span>
                <button class="close-sidebar-btn" onclick="MobileNav.close()">×</button>
            </div>
            <nav class="sidebar-menu">
                <div class="menu-item active" data-view="dashboard" onclick="Router.navigate('dashboard')"><span>📊</span><span data-i18n="nav_dashboard">الرئيسية</span></div>
                <div class="menu-item" data-view="journal" onclick="Router.navigate('journal')"><span>✍️</span><span data-i18n="nav_journal">المهام</span></div>
                <div class="menu-item" onclick="Router.navigate('journal'); setTimeout(()=>JournalModule.openForm(), 300); MobileNav.close();"><span>➕</span><span>إضافة إنجاز</span></div>
                <div class="menu-item" data-view="reports" onclick="Router.navigate('reports')"><span>📄</span><span data-i18n="nav_reports">التقارير</span></div>
                <div class="menu-item" data-view="calendar" onclick="Router.navigate('calendar')"><span>📅</span><span data-i18n="nav_calendar">التقويم</span></div>
                <div class="menu-item" data-view="skills" onclick="Router.navigate('skills')"><span>🧠</span><span data-i18n="nav_skills">المهارات والمرفقات</span></div>
                
                <div style="flex:1;"></div> <div class="menu-item" data-view="settings" onclick="Router.navigate('settings')"><span>⚙️</span><span data-i18n="nav_settings">الإعدادات والملف الشخصي</span></div>
                <div class="menu-item danger-link" onclick="SettingsModule.logout()"><span>🚪</span><span>تسجيل الخروج</span></div>
            </nav>
        </aside>

        <div class="main-frame" role="main">
            <header class="top-bar">
                <div class="breadcrumbs">
                    <button class="mobile-menu-toggle" onclick="MobileNav.toggle()">☰</button>
                    <span id="current-breadcrumb" style="margin-inline-start: 8px;">الرئيسية</span>
                </div>
                <div class="top-bar-actions">
                    <button class="btn btn-secondary" onclick="ThemeEngine.toggle()" style="padding: 0 10px;">🌓</button>
                    <div style="width: 38px; height: 38px; border-radius: var(--radius-circle); background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; color: #fff;" id="user-avatar">U</div>
                </div>
            </header>

            <main class="view-content" id="router-view-outlet">
                <div id="view-dashboard" class="app-view">
                    <div class="dashboard-grid">
                        <div class="ui-card kpi-card">
                            <div><span class="text-muted">الساعات المنجزة</span><div class="kpi-val" id="kpi-hours-done">0</div></div>
                            <span style="font-size:2rem;">⏱️</span>
                        </div>
                        <div class="ui-card kpi-card">
                            <div><span class="text-muted">نسبة التقدم</span><div class="kpi-val" id="kpi-progress-percent">0%</div></div>
                            <span style="font-size:2rem;">📈</span>
                        </div>
                        <div class="ui-card kpi-card">
                            <div><span class="text-muted">المهام الموثقة</span><div class="kpi-val" id="kpi-tasks-count">0</div></div>
                            <span style="font-size:2rem;">📝</span>
                        </div>
                    </div>
                    <div class="ui-card">
                        <h3 style="margin-bottom:var(--space-3);">توزيع التصنيفات</h3>
                        <div style="position:relative; height:280px; width:100%;"><canvas id="chart-dashboard-categories"></canvas></div>
                    </div>
                </div>

                <div id="view-journal" class="app-view">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); flex-wrap: wrap;">
                        <h2>سجل المهام الميدانية</h2>
                        <button class="btn btn-primary" onclick="JournalModule.openForm()">+ إضافة إنجاز جديد</button>
                    </div>

                    <div id="journal-form-wrapper" class="ui-card hidden" style="margin-bottom: var(--space-4); border: 1px solid var(--primary);">
                        <form id="journal-core-form" onsubmit="JournalModule.handleSave(event)">
                            <input type="hidden" id="journal-entry-id">
                            <div class="form-grid">
                                <div class="form-group"><label class="form-label">التاريخ</label><input type="date" id="j-field-date" class="input-element" required></div>
                                <div class="form-group"><label class="form-label">الساعات</label><input type="number" id="j-field-hours" class="input-element" step="0.5" required></div>
                                <div class="form-group full-width"><label class="form-label">التصنيف (مثال: تصميم، برمجة)</label><input type="text" id="j-field-cat" class="input-element" required></div>
                                <div class="form-group full-width"><label class="form-label">الوصف الدقيق للمهمة</label><textarea id="j-field-task" class="textarea-element" required></textarea></div>
                            </div>
                            <div style="display:flex; gap:var(--space-2); margin-top: var(--space-4); flex-wrap: wrap;">
                                <button type="submit" class="btn btn-primary" style="flex:1;">حفظ الإنجاز</button>
                                <button type="button" class="btn btn-secondary" onclick="JournalModule.closeForm()" style="flex:1;">إلغاء</button>
                            </div>
                        </form>
                    </div>

                    <div class="ui-card" style="margin-bottom: var(--space-4);">
                        <input type="text" id="search-query-input" class="input-element" placeholder="ابحث في المهام..." oninput="JournalModule.renderTimeline()">
                    </div>

                    <div id="timeline-outlet" class="timeline-stream"></div>
                </div>

                <div id="view-reports" class="app-view">
                    <div class="ui-card no-print" style="margin-bottom: var(--space-4);">
                        <h2 style="margin-bottom: var(--space-3);">محرك التقارير الذكي</h2>
                        <div class="report-controls-panel">
                            <button class="btn btn-secondary" onclick="ReportEngineModule.synthesizeReport()">توليد البيانات 🔄</button>
                            <button class="btn btn-primary" onclick="window.print()">طباعة PDF 🖨️</button>
                        </div>
                    </div>

                    <div class="academic-paper-wrapper">
                        <div id="academic-paper-document" class="academic-paper-canvas">
                            <h2 style="text-align: center; border-bottom: 2px solid #CBD5E1; padding-bottom: 10px; margin-bottom: 30px;">تقرير التدريب التعاوني</h2>
                            <table class="report-meta-table">
                                <tr><th>المتدرب</th><td id="rep-meta-student-name">...</td><th>الجهة</th><td id="rep-meta-company">...</td></tr>
                                <tr><th>الجامعة</th><td id="rep-meta-uni">...</td><th>القسم</th><td id="rep-meta-dept">...</td></tr>
                            </table>
                            <div id="report-live-rich-editor" class="report-rich-editor" contenteditable="true">
                                اضغط على "توليد البيانات" أعلاه لصياغة التقرير تلقائياً...
                            </div>
                            <div class="report-signatures-area">
                                <div class="signature-line">توقيع المتدرب</div>
                                <div class="signature-line">توقيع المشرف المباشر</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="view-calendar" class="app-view">
                    <div class="ui-card text-center"><p class="text-muted" style="padding: 40px;">سيتم عرض التقويم هنا (تحت التطوير).</p></div>
                </div>

                <div id="view-skills" class="app-view">
                    <div class="ui-card text-center"><p class="text-muted" style="padding: 40px;">سيتم تحليل المهارات والمرفقات هنا.</p></div>
                </div>

                <div id="view-settings" class="app-view">
                    <div class="ui-card">
                        <h2 style="margin-bottom: var(--space-3);">الإعدادات والملف الشخصي</h2>
                        <form id="settings-profile-form" onsubmit="SettingsModule.save(event)">
                            <div class="form-grid">
                                <div class="form-group full-width"><label class="form-label">الاسم</label><input type="text" id="st-name" class="input-element" required></div>
                                <div class="form-group full-width"><label class="form-label">جهة التدريب</label><input type="text" id="st-comp" class="input-element" required></div>
                            </div>
                            <button type="submit" class="btn btn-primary" style="margin-top: var(--space-4); width: 100%;">حفظ التعديلات</button>
                        </form>
                    </div>
                </div>

            </main>
        </div>
    </div>

    <script>
        // 1. نظام القائمة الجانبية للجوال (Hamburger Navigation Logic)
        const MobileNav = {
            toggle() {
                const isAct = document.getElementById('app-sidebar').classList.contains('active');
                if(isAct) this.close(); else this.open();
            },
            open() {
                document.getElementById('app-sidebar').classList.add('active');
                document.getElementById('mobile-overlay').classList.add('active');
            },
            close() {
                document.getElementById('app-sidebar').classList.remove('active');
                document.getElementById('mobile-overlay').classList.remove('active');
            }
        };

        // 2. قاعدة البيانات البسيطة (IndexedDB)
        const DBEngine = {
            dbName: "TaqririSaaSDatabase", version: 1, db: null,
            init() { return new Promise((resolve, reject) => { const req = indexedDB.open(this.dbName, this.version); req.onupgradeneeded = e => { const db = e.target.result; if (!db.objectStoreNames.contains("users")) db.createObjectStore("users", { keyPath: "id" }); if (!db.objectStoreNames.contains("journal")) db.createObjectStore("journal", { keyPath: "id" }); }; req.onsuccess = e => { this.db = e.target.result; resolve(this.db); }; req.onerror = e => reject(e.target.error); }); },
            get(store, key) { return new Promise(res => { const tx = this.db.transaction(store, "readonly"); const req = tx.objectStore(store).get(key); req.onsuccess = () => res(req.result); }); },
            set(store, val) { return new Promise(res => { const tx = this.db.transaction(store, "readwrite"); const req = tx.objectStore(store).put(val); req.onsuccess = () => res(req.result); }); },
            getAll(store) { return new Promise(res => { const tx = this.db.transaction(store, "readonly"); const req = tx.objectStore(store).getAll(); req.onsuccess = () => res(req.result); }); },
            delete(store, key) { return new Promise(res => { const tx = this.db.transaction(store, "readwrite"); const req = tx.objectStore(store).delete(key); req.onsuccess = () => res(req.result); }); },
            clearStore(store) { return new Promise(res => { const tx = this.db.transaction(store, "readwrite"); tx.objectStore(store).clear().onsuccess = res; }); }
        };

        // 3. الموجه للتنقل بين الصفحات (Router)
        const Router = {
            routes: ['dashboard', 'journal', 'calendar', 'skills', 'reports', 'settings'],
            titles: { 'dashboard': 'الرئيسية', 'journal': 'المهام', 'reports': 'التقارير', 'calendar': 'التقويم', 'skills': 'المهارات', 'settings': 'الإعدادات' },
            init() { window.addEventListener('hashchange', () => this.handleRouting()); this.handleRouting(); },
            async handleRouting() {
                let hash = window.location.hash.replace('#/', '').trim() || 'dashboard';
                if (!this.routes.includes(hash)) hash = 'dashboard';
                const profile = await DBEngine.get('users', 'current_profile');
                if (!profile) {
                    document.getElementById('onboarding-layer').classList.remove('hidden');
                    document.getElementById('main-app-shell').classList.add('hidden');
                    return;
                }
                document.getElementById('onboarding-layer').classList.add('hidden');
                document.getElementById('main-app-shell').classList.remove('hidden');
                this.renderView(hash, profile);
                MobileNav.close(); // إغلاق القائمة الجانبية بعد اختيار الصفحة في الجوال
            },
            renderView(viewId, profile) {
                document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
                document.getElementById(`view-${viewId}`).classList.add('active');
                document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
                const item = document.querySelector(`.menu-item[data-view="${viewId}"]`);
                if (item) item.classList.add('active');
                document.getElementById('current-breadcrumb').textContent = this.titles[viewId] || viewId;
                
                if (viewId === 'dashboard') DashModule.render(profile);
                if (viewId === 'journal') JournalModule.initView();
                if (viewId === 'reports') ReportEngineModule.initView(profile);
                if (viewId === 'settings') SettingsModule.initView(profile);
            },
            navigate(id) { window.location.hash = `#/${id}`; }
        };

        // 4. معالج الإعداد (Wizard)
        const WizardEngine = {
            currentStep: 1, totalSteps: 4,
            init() { this.updateUI(); },
            updateUI() {
                document.querySelectorAll('.wizard-step-panel').forEach(p => p.classList.remove('active'));
                document.getElementById(`wizard-step-${this.currentStep}`).classList.add('active');
                for (let i = 1; i <= 4; i++) {
                    const n = document.getElementById(`step-node-${i}`);
                    if(i < this.currentStep) n.className = 'step-node completed'; else if(i === this.currentStep) n.className = 'step-node active'; else n.className = 'step-node';
                }
                document.getElementById('wizard-progress-bar').style.left = document.documentElement.dir === 'rtl' ? `${100 - ((this.currentStep-1)/3)*100}%` : '0%';
                document.getElementById('wizard-prev-btn').classList.toggle('hidden', this.currentStep === 1);
                document.getElementById('wizard-next-btn').classList.toggle('hidden', this.currentStep === 4);
                document.getElementById('wizard-submit-btn').classList.toggle('hidden', this.currentStep !== 4);
            },
            nextStep() { if(this.currentStep < 4) { this.currentStep++; this.updateUI(); } },
            prevStep() { if(this.currentStep > 1) { this.currentStep--; this.updateUI(); } },
            async handleSubmit(e) {
                e.preventDefault();
                const p = {
                    id: "current_profile", name: document.getElementById('wz-name').value,
                    uni: document.getElementById('wz-uni').value, company: document.getElementById('wz-comp').value,
                    dept: document.getElementById('wz-dept').value, hoursTarget: parseInt(document.getElementById('wz-hrs-target').value)||600
                };
                await DBEngine.set('users', p); Router.handleRouting();
            }
        };

        // 5. لوحة التحكم (Dashboard)
        const DashModule = {
            chart: null,
            async render(profile) {
                document.getElementById('user-avatar').textContent = profile.name.charAt(0).toUpperCase();
                const entries = await DBEngine.getAll('journal');
                const hours = entries.reduce((a, c) => a + c.hours, 0);
                document.getElementById('kpi-hours-done').textContent = hours;
                document.getElementById('kpi-tasks-count').textContent = entries.length;
                document.getElementById('kpi-progress-percent').textContent = `${Math.min(Math.round((hours/(profile.hoursTarget||1))*100),100)}%`;
                
                const map = {}; entries.forEach(e => map[e.category] = (map[e.category]||0)+e.hours);
                const ctx = document.getElementById('chart-dashboard-categories').getContext('2d');
                if (this.chart) this.chart.destroy();
                this.chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: { labels: Object.keys(map).length ? Object.keys(map) : ['لا يوجد'], datasets: [{ data: Object.values(map).length ? Object.values(map) : [1], backgroundColor: ['#6366F1','#10B981','#F59E0B','#3B82F6'] }] },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: localStorage.getItem('taq_theme')==='light'?'#0F172A':'#F8FAFC' } } } }
                });
            }
        };

        // 6. السجل والمهام (Journal)
        const JournalModule = {
            async initView() { this.closeForm(); await this.renderTimeline(); },
            openForm() { document.getElementById('journal-form-wrapper').classList.remove('hidden'); window.scrollTo({top:0, behavior:'smooth'}); },
            closeForm() { document.getElementById('journal-core-form').reset(); document.getElementById('journal-entry-id').value=''; document.getElementById('journal-form-wrapper').classList.add('hidden'); },
            async handleSave(e) {
                e.preventDefault();
                const entry = {
                    id: document.getElementById('journal-entry-id').value || 'ent_' + Date.now(),
                    date: document.getElementById('j-field-date').value, category: document.getElementById('j-field-cat').value,
                    hours: parseFloat(document.getElementById('j-field-hours').value)||1, task: document.getElementById('j-field-task').value
                };
                await DBEngine.set('journal', entry); this.initView();
            },
            async delete(id) { if(confirm("تأكيد الحذف؟")) { await DBEngine.delete('journal', id); this.renderTimeline(); } },
            async renderTimeline() {
                const q = document.getElementById('search-query-input').value.toLowerCase();
                let entries = await DBEngine.getAll('journal');
                if(q) entries = entries.filter(e => e.task.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
                entries.sort((a,b) => new Date(b.date) - new Date(a.date));

                document.getElementById('timeline-outlet').innerHTML = entries.map(e => `
                    <div class="timeline-node">
                        <div class="timeline-axis"></div><div class="timeline-dot">📝</div>
                        <div class="timeline-body">
                            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
                                <span class="badge">${e.category}</span>
                                <span style="font-weight:700; color:var(--primary); font-size:0.85rem;">${e.date} (${e.hours}س)</span>
                            </div>
                            <p style="font-size:0.95rem;">${e.task}</p>
                            <div style="text-align:end; margin-top:10px;"><button class="btn btn-danger" style="min-height:30px; padding:4px 10px; font-size:0.8rem;" onclick="JournalModule.delete('${e.id}')">حذف</button></div>
                        </div>
                    </div>
                `).join('');
            }
        };

        // 7. محرك التقارير والإعدادات
        const ReportEngineModule = {
            async initView(p) { document.getElementById('rep-meta-student-name').textContent=p.name; document.getElementById('rep-meta-company').textContent=p.company; document.getElementById('rep-meta-uni').textContent=p.uni; document.getElementById('rep-meta-dept').textContent=p.dept; },
            async synthesizeReport() {
                const entries = await DBEngine.getAll('journal');
                let html = `<p>يمثل هذا التقرير مستنداً لتوثيق المهام المنجزة. إجمالي المهام: ${entries.length}.</p><ul>`;
                entries.forEach(e => html+= `<li style="margin-bottom:8px;"><strong>${e.date}:</strong> ${e.task} (${e.hours} ساعات)</li>`);
                html += `</ul>`;
                document.getElementById('report-live-rich-editor').innerHTML = html;
            }
        };

        const SettingsModule = {
            initView(p) { document.getElementById('st-name').value=p.name; document.getElementById('st-comp').value=p.company; },
            async save(e) { e.preventDefault(); const p = await DBEngine.get('users', 'current_profile'); p.name=document.getElementById('st-name').value; p.company=document.getElementById('st-comp').value; await DBEngine.set('users', p); Router.navigate('dashboard'); },
            async logout() { if(confirm("هل أنت متأكد من تسجيل الخروج؟ سيتم مسح بياناتك.")) { await DBEngine.clearStore('users'); await DBEngine.clearStore('journal'); location.reload(); } }
        };

        const ThemeEngine = { toggle() { const c = document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'; document.documentElement.setAttribute('data-theme', c); localStorage.setItem('taq_theme', c); Router.handleRouting(); } };

        document.addEventListener('DOMContentLoaded', async () => { 
            const savedTheme = localStorage.getItem('taq_theme');
            if(savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
            await DBEngine.init(); WizardEngine.init(); Router.init(); 
        });
    </script>
</body>
</html>
