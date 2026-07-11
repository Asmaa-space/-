// js/storage.js
const Storage = {
    // إدارة الجلسة
    saveSession(userData) {
        localStorage.setItem('taqriri_session', JSON.stringify(userData));
    },
    getSession() {
        return JSON.parse(localStorage.getItem('taqriri_session'));
    },
    clearSession() {
        localStorage.removeItem('taqriri_session');
    },

    // إدارة التدوينات
    saveEntry(entry) {
        const session = this.getSession();
        if (!session) return;
        
        const key = `entries_${session.email}`;
        const entries = JSON.parse(localStorage.getItem(key)) || [];
        
        entry.id = Date.now();
        entry.date = new Date().toLocaleDateString('ar-SA');
        
        entries.unshift(entry);
        localStorage.setItem(key, JSON.stringify(entries));
    },
    getEntries() {
        const session = this.getSession();
        if (!session) return [];
        return JSON.parse(localStorage.getItem(`entries_${session.email}`)) || [];
    }
};