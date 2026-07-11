/**
 * Taqriri SaaS Core Architecture
 * Built with Vanilla JS - Production Ready
 */

const Storage = {
    get(key) {
        try { return JSON.parse(localStorage.getItem(key)); } 
        catch (e) { console.error('Storage Error:', e); return null; }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } 
        catch (e) { console.error('Storage Error:', e); UI.toast('❌ خطأ في مساحة التخزين'); }
    },
    remove(key) { localStorage.removeItem(key); }
};

const UI = {
    toast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '💡';
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    setLoading(btnId, isLoading) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        if (isLoading) {
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = 'جاري المعالجة... ⏳';
            btn.disabled = true;
        } else {
            btn.innerHTML = btn.dataset.originalText;
            btn.disabled = false;
        }
    }
};

const App = {
    currentUser: null,
    entries: [],
    activeChartInstances: {},
    entryToDelete: null,

    init() {
        this.initTheme();
        this.checkAuth();
        this.setupModalListeners();
    },

    // --- Theme Management ---
    initTheme() {
        const saved = Storage.get('taq_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        document.getElementById('theme-toggle').textContent = saved === 'dark' ? '☀️' : '🌙';
    },
    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        Storage.set('taq_theme', next);
        document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
        this.renderCharts(); // Re-render charts for color contrast
    },

    // --- Auth & Navigation ---
    checkAuth() {
        this.currentUser = Storage.get('taq_user');
        if (this.currentUser) {
            document.getElementById('view-auth').classList.remove('active');
            document.getElementById('app-layout').style.display = 'grid';
            document.getElementById('display-name').textContent = this.currentUser.name;
            document.getElementById('doc-name').textContent = this.currentUser.name;
            this.loadData();
            this.navigate('dashboard');
        } else {
            document.getElementById('app-layout').style.display = 'none';
            document.getElementById('view-auth').classList.add('active');
        }
    },
    handleAuth(e) {
        e.preventDefault();
        const name = document.getElementById('user-name-input').value.trim();
        const email = document.getElementById('user-email-input').value.trim();
        if (name && email) {
            Storage.set('taq_user', { name, email });
            UI.toast('تم تسجيل الدخول بنجاح', 'success');
            this.checkAuth();
        }
    },
    handleLogout() {
        Storage.remove('taq_user');
        window.location.reload();
    },
    navigate(viewName, e = null) {
        if (e) e.preventDefault();
        
        // Update UI Tabs
        document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        document.getElementById(`view-${viewName}`).classList.add('active');
        const activeNav = document.querySelector(`.nav-item[data-target="${viewName}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Trigger context specific renders
        if (viewName === 'drafts') this.renderDrafts();
        if (viewName === 'report') this.renderReport();
        if (viewName === 'stats') this.renderCharts();
    },

    // --- Data Management (CRUD) ---
    loadData() {
        this.entries = Storage.get(`taq_entries_${this.currentUser.email}`) || [];
        this.updateQuickStats();
    },
    saveEntry(e) {
        e.preventDefault();
        UI.setLoading('submit-entry-btn', true);

        setTimeout(() => {
            const idInput = document.getElementById('entry-id').value;
            const category = document.getElementById('category').value;
            const hours = parseInt(document.getElementById('hours').value) || 0;
            const accomplish = document.getElementById('accomplish').value.trim();
            const learn = document.getElementById('learn').value.trim();

            if (idInput) {
                // Update existing
                const index = this.entries.findIndex(entry => entry.id === idInput);
                if (index > -1) {
                    this.entries[index] = { ...this.entries[index], category, hours, accomplish, learn };
                    UI.toast('تم تحديث الإنجاز بنجاح', 'success');
                }
            } else {
                // Create new
                const newEntry = {
                    id: 'entry_' + Date.now(),
                    date: new Date().toLocaleDateString('ar-SA'),
                    category, hours, accomplish, learn
                };
                this.entries.unshift(newEntry);
                UI.toast('تم حفظ الإنجاز الجديد', 'success');
            }

            Storage.set(`taq_entries_${this.currentUser.email}`, this.entries);
            this.resetForm();
            this.updateQuickStats();
            
            // Clear AI summary to force regeneration based on new data
            Storage.remove(`taq_ai_summary_${this.currentUser.email}`);
            document.getElementById('ai-output').innerHTML = 'تم تحديث البيانات. يرجى توليد صياغة جديدة.';
            
            UI.setLoading('submit-entry-btn', false);
        }, 400); // Simulate processing time
    },
    resetForm() {
        document.getElementById('journal-form').reset();
        document.getElementById('entry-id').value = '';
        document.getElementById('submit-entry-btn').textContent = 'حفظ الإنجاز ⚡';
        document.getElementById('cancel-edit-btn').classList.add('hidden');
    },
    editEntry(id) {
        const entry = this.entries.find(e => e.id === id);
        if (!entry) return;

        this.navigate('dashboard'); // Redirect to form
        document.getElementById('entry-id').value = entry.id;
        document.getElementById('category').value = entry.category;
        document.getElementById('hours').value = entry.hours;
        document.getElementById('accomplish').value = entry.accomplish;
        document.getElementById('learn').value = entry.learn;

        document.getElementById('submit-entry-btn').textContent = 'تحديث البيانات 🔄';
        document.getElementById('cancel-edit-btn').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // --- Deletion Flow with Modal ---
    setupModalListeners() {
        const modal = document.getElementById('confirm-modal');
        document.getElementById('confirm-delete-btn').addEventListener('click', () => {
            if (this.entryToDelete) {
                this.entries = this.entries.filter(e => e.id !== this.entryToDelete);
                Storage.set(`taq_entries_${this.currentUser.email}`, this.entries);
                UI.toast('تم حذف الإنجاز بشكل نهائي', 'success');
                this.updateQuickStats();
                this.renderDrafts();
                this.closeModal();
            }
        });
    },
    confirmDelete(id) {
        this.entryToDelete = id;
        document.getElementById('confirm-modal').showModal();
    },
    closeModal() {
        this.entryToDelete = null;
        document.getElementById('confirm-modal').close();
    },

    // --- Views Rendering ---
    updateQuickStats() {
        document.getElementById('quick-total-tasks').textContent = this.entries.length;
        const totalHours = this.entries.reduce((acc, curr) => acc + curr.hours, 0);
        document.getElementById('quick-total-hours').textContent = totalHours;
    },
    
    renderDrafts() {
        const container = document.getElementById('drafts-list');
        if (this.entries.length === 0) {
            container.innerHTML = `<div class="ui-card empty-state-box" style="grid-column: 1 / -1; padding: 4rem;">لا توجد إنجازات مسجلة بعد. ابدئي بالتدوين من لوحة التحكم!</div>`;
            return;
        }

        container.innerHTML = this.entries.map(e => `
            <div class="ui-card entry-card">
                <div>
                    <div class="entry-header">
                        <span class="entry-cat">${e.category}</span>
                        <span class="text-muted">${e.date} (${e.hours} ساعات)</span>
                    </div>
                    <p class="mb-2"><strong>الإنجاز:</strong> ${e.accomplish}</p>
                    ${e.learn ? `<p class="text-muted" style="font-size:0.9rem;"><strong>التعلم:</strong> ${e.learn}</p>` : ''}
                </div>
                <div class="entry-actions">
                    <button class="btn-sm btn-secondary" onclick="App.editEntry('${e.id}')">✏️ تعديل</button>
                    <button class="btn-sm btn-danger" onclick="App.confirmDelete('${e.id}')">🗑️ حذف</button>
                </div>
            </div>
        `).join('');
    },

    // --- AI Smart Summary ---
    generateAISummary() {
        const aiBox = document.getElementById('ai-output');
        if (this.entries.length === 0) {
            UI.toast('يرجى إضافة تدوينات أولاً', 'error');
            return;
        }

        aiBox.innerHTML = '<span class="text-muted">جاري تحليل المعطيات وصياغة التقرير الإحترافي... 🤖</span>';
        
        setTimeout(() => {
            const categories = [...new Set(this.entries.map(e => e.category))];
            const accList = this.entries.map(e => e.accomplish).slice(0, 3).join('؛ و ');
            
            const summary = `خلال هذه الفترة، أتمت المتدربة ${this.entries.length} مهام رئيسية، بتركيز أساسي على مجالات (${categories.join('، ')}). 
            
من أبرز الإنجازات التشغيلية: ${accList}. 

يعكس هذا الأداء قدرة تحليلية وتطبيقية عالية لمعايير تجربة المستخدم والتقنيات الحديثة، مع التزام تام بالمدة الزمنية.`;
            
            Storage.set(`taq_ai_summary_${this.currentUser.email}`, summary);
            this.typeText(aiBox, summary);
            UI.toast('تم توليد التلخيص بنجاح', 'success');
        }, 1200);
    },
    
    typeText(element, text) {
        element.innerHTML = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                i++;
            } else { clearInterval(interval); }
        }, 15);
    },

    // --- Report Generator ---
    renderReport() {
        document.getElementById('doc-date').textContent = new Date().toLocaleDateString('ar-SA');
        
        const savedSummary = Storage.get(`taq_ai_summary_${this.currentUser.email}`);
        document.getElementById('doc-ai-summary').innerHTML = savedSummary ? savedSummary.replace(/\n/g, '<br>') : '<span class="text-muted">لم يتم توليد التلخيص الذكي لهذا التقرير بعد.</span>';

        const tbody = document.getElementById('doc-table-body');
        if (this.entries.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">لا توجد بيانات</td></tr>';
            return;
        }

        tbody.innerHTML = this.entries.map(e => `
            <tr>
                <td>${e.date}</td>
                <td><strong>${e.category}</strong></td>
                <td>${e.hours}</td>
                <td>
                    ${e.accomplish}
                    ${e.learn ? `<br><small class="text-muted">المكتسبات: ${e.learn}</small>` : ''}
                </td>
            </tr>
        `).join('');
    },

    // --- Chart.js Integration ---
    renderCharts() {
        if (this.entries.length === 0) return; // Need data to render meaningful charts

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#94A3B8' : '#64748B';
        const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

        // 1. Category Distribution (Doughnut)
        const categories = [...new Set(this.entries.map(e => e.category))];
        const categoryData = categories.map(cat => this.entries.filter(e => e.category === cat).reduce((acc, curr) => acc + curr.hours, 0));

        this.createChart('categoryChart', 'doughnut', {
            labels: categories,
            datasets: [{
                data: categoryData,
                backgroundColor: ['#4F46E5', '#8B5CF6', '#EC4899', '#10B981'],
                borderWidth: 0
            }]
        }, { plugins: { legend: { labels: { color: textColor } } } });

        // 2. Hours Over Time (Line)
        const recentEntries = [...this.entries].reverse().slice(-7); // Last 7 entries
        const dates = recentEntries.map(e => e.date);
        const hours = recentEntries.map(e => e.hours);

        this.createChart('hoursChart', 'line', {
            labels: dates,
            datasets: [{
                label: 'ساعات العمل اليومية',
                data: hours,
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
            }]
        }, {
            scales: {
                x: { grid: { color: gridColor }, ticks: { color: textColor } },
                y: { grid: { color: gridColor }, ticks: { color: textColor, stepSize: 2 } }
            },
            plugins: { legend: { labels: { color: textColor } } }
        });
    },

    createChart(canvasId, type, data, additionalOptions = {}) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        if (this.activeChartInstances[canvasId]) {
            this.activeChartInstances[canvasId].destroy();
        }

        this.activeChartInstances[canvasId] = new Chart(ctx, {
            type: type,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                ...additionalOptions
            }
        });
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => App.init());