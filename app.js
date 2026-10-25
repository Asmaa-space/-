<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بوابة تثقيف المرضى | KAMC</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- الشريط العلوي الدائم (Top Navigation) -->
    <header class="clinical-header">
        <div class="container nav-container">
            <div class="brand">
                <svg class="medical-icon" viewBox="0 0 24 24" width="28" height="28">
                    <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M13,11.5H16V13.5H13V16.5H11V13.5H8V11.5H11V8.5H13V11.5Z"/>
                </svg>
                <span>KAMC <strong>Oncology</strong></span>
            </div>
            
            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="القائمة">☰</button>

            <nav class="main-nav" id="mainNav">
                <a href="#education" class="nav-link active" data-target="education">التثقيف والمساندة</a>
                <a href="#dibh" class="nav-link" data-target="dibh">تقنية DIBH</a>
                <a href="#practice" class="nav-link" data-target="practice">تدرّب</a>
            </nav>
        </div>
    </header>

    <main class="main-content container">

        <!-- ==========================================
             الصفحة الأولى: التثقيف (Education)
             ========================================== -->
        <section id="education" class="page-section active">
            <div class="section-header">
                <h1 class="section-title">التثقيف والمساندة</h1>
                <p class="section-subtitle">معلومات شاملة لدعم المريض والمرافق خلال رحلة العلاج.</p>
            </div>

            <div class="content-grid">
                <!-- قسم المريض -->
                <div class="clinical-card">
                    <div class="card-icon">🩺</div>
                    <h2 class="card-title">نظرة عامة للمريض</h2>
                    <p class="card-text">أهلاً بك في مسارك التثقيفي. نهدف هنا إلى تزويدك بالمعلومات اللازمة للشعور بالراحة والثقة أثناء جلسات العلاج الإشعاعي.</p>
                    <h3 class="sub-heading mt-3">أسئلة قد تخطر في بالك:</h3>
                    <div class="faq-item">
                        <strong>هل سأكون وحدي أثناء العلاج؟</strong>
                        <p>لا، سيكون فريق العلاج الإشعاعي معك، وسيرشدك متى تأخذين النفس ومتى تحبسينه ومتى تعودين إلى التنفس الطبيعي.</p>
                    </div>
                    <div class="faq-item">
                        <strong>ماذا لو لم أستطع حبس نفسي لمدة كافية؟</strong>
                        <p>لا تقلقي، ليس عليك القيام بذلك بشكل مثالي من البداية. أخبري الفريق وسيساعدك على التدريب وتحديد الطريقة الأنسب لك.</p>
                    </div>
                </div>

                <!-- قسم المرافق -->
                <div class="clinical-card">
                    <div class="card-icon">🤝</div>
                    <h2 class="card-title">دليل المرافق</h2>
                    <p class="card-text">دورك كمرافق مهم جداً في دعم المريضة. وجودك بجانب المريضة يساعدها على الشعور بالاطمئنان.</p>
                    <ul class="clinical-list mt-3">
                        <li><strong>طمئنها:</strong> أخبرها أن الفريق سيشرح لها الخطوات خطوة بخطوة.</li>
                        <li><strong>شجعها دون ضغط:</strong> ذكّرها بأن إتقان التقنية لا يُشترط من المحاولة الأولى.</li>
                        <li><strong>ساعدها على الاستعداد:</strong> وفر لها مكاناً هادئاً ومريحاً للتدرب في المنزل.</li>
                        <li><strong>ملاحظة هامة:</strong> لا يُسمح للمرافق بالدخول إلى غرفة العلاج الإشعاعي أثناء الجلسة للمحافظة على سلامته من الإشعاع. أحباؤكم في أيدي أمينة.</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- ==========================================
             الصفحة الثانية: تقنية DIBH
             ========================================== -->
        <section id="dibh" class="page-section hidden">
            <div class="section-header">
                <h1 class="section-title">تقنية حبس النفس العميق (DIBH)</h1>
                <p class="section-subtitle">تعرف على آلية عمل التقنية وأهميتها في حماية القلب.</p>
            </div>

            <div class="clinical-card full-width mb-4">
                <h2 class="card-title text-primary">ما هو حبس النفس العميق؟</h2>
                <p class="card-text">تقنية حبس النفس العميق هي طريقة نستخدمها أثناء العلاج الإشعاعي، للمساعدة في حماية القلب من الإشعاع.</p>
                
                <h3 class="sub-heading mt-4">كيف تساعد هذه التقنية في حماية القلب؟</h3>
                <p class="card-text">عند أخذ نفس عميق، تمتلئ الرئتان بالهواء بشكل كامل وهذا يساعد على إبعاد القلب عن مسار الإشعاع. وبذلك تقل كمية الإشعاع التي تصل إلى القلب أثناء الجلسة.</p>
            </div>

            <div class="content-grid">
                <div class="clinical-card">
                    <h3 class="sub-heading">كيف أطبقها أثناء العلاج؟</h3>
                    <p class="card-text">خلال <strong>جلسة التخطيط</strong> ما قبل العلاج، سيقوم الفريق باختيار الوضعية المناسبة، وبتعليمك طريقة أخذ نفس عميق وحبسه لفترة قد تصل إلى 20 ثانية.<br><br>
                    أثناء <strong>جلسة العلاج</strong>، يتم تشغيل الإشعاع تلقائياً أثناء حبس النفس حسب تعليمات الفريق. بعد ذلك يطلب منك الفريق أن تتنفسي بشكل طبيعي ويتوقف الإشعاع.</p>
                </div>
                
                <div class="clinical-card">
                    <h3 class="sub-heading">هل هذه التقنية مناسبة للجميع؟</h3>
                    <p class="card-text">قد تُستخدم هذه التقنية لعلاج:</p>
                    <ul class="clinical-list">
                        <li>سرطان الثدي في الجهة اليسرى.</li>
                        <li>سرطان الغدد اللمفاوية في منطقة الصدر.</li>
                        <li>الأورام الموجودة في جهة الصدر أو البطن العلوي.</li>
                    </ul>
                    <p class="card-text mt-3">ملاءمتها تختلف من شخص إلى آخر، لذلك سيحدد الطبيب وفريق العلاج ما إذا كانت مناسبة لحالتك.</p>
                </div>
            </div>
        </section>

        <!-- ==========================================
             الصفحة الثالثة: تدرّب (Practice)
             ========================================== -->
        <section id="practice" class="page-section hidden">
            <div class="section-header">
                <h1 class="section-title">التدرب على التنفس</h1>
                <p class="section-subtitle">أداة تفاعلية لمساعدتك على التدرب في المنزل بأمان وراحة.</p>
            </div>

            <div class="content-grid align-start">
                <!-- خطوات التدريب -->
                <div class="clinical-card">
                    <h2 class="card-title">خطوات التدريب</h2>
                    <p class="card-text mb-3">إذا أوصى فريق العلاج الإشعاعي بالتدرب في المنزل، يمكنك اتباع الخطوات التالية:</p>
                    <ol class="clinical-list numbered">
                        <li>استلقي على ظهرك على السرير، وضعي وسادة تحت رأسك وركبتيك إذا احتجتِ.</li>
                        <li>ضعي ذراعيك فوق رأسك (كما هو الوضع في التخطيط).</li>
                        <li><strong>خذي نفساً عميقاً وببطء من الصدر والرئتين، وليس من البطن.</strong> حاولي توسيع صدرك مع إبقاء ظهرك ملامساً للسرير.</li>
                        <li>احبسي نفسك لبضع ثوان، ثم زيدي المدة تدريجياً حسب قدرتك.</li>
                        <li>أخرجي الهواء ببطء، ثم عودي للتنفس الطبيعي.</li>
                    </ol>
                    <div class="alert-box mt-4">
                        <strong>تذكري:</strong> ليس من الضروري أن تتمكني من حبس نفسك لمدة 20 ثانية من أول محاولة. التدريب يكون تدريجياً. توقفي فوراً إذا شعرتِ بالدوار أو ضيق التنفس.
                    </div>
                </div>

                <!-- الأداة التفاعلية -->
                <div class="clinical-card text-center">
                    <h2 class="card-title mb-4">أداة التنفس التفاعلية</h2>
                    
                    <div class="breathing-tool-container">
                        <div class="breath-circle" id="breathCircle">
                            <span id="breath-inst" class="breath-text">جاهز؟</span>
                            <span id="breath-timer" class="breath-time">00:00</span>
                        </div>
                    </div>
                    
                    <div class="tool-controls mt-5">
                        <button id="startTrainBtn" class="btn-primary-large">ابدأ التدريب</button>
                        <button id="stopTrainBtn" class="btn-outline-danger hidden">إنهاء التدريب</button>
                    </div>

                    <div class="progress-stats mt-4">
                        <span class="text-muted">إجمالي الجلسات المكتملة:</span>
                        <strong id="completedSessions" class="text-primary">0</strong>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <script src="app.js"></script>
</body>
</html>
