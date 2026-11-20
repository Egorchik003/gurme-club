// components.js

import { auth, db } from "./app.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export function renderSidebar(activeTab) {
  const sidebarHtml = `
  <aside class="sidebar">
    <nav class="tabs-nav">
      <button class="tab-btn ${activeTab === 'home' ? 'active' : ''}" onclick="location.href='home'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        Главная
      </button>
      <button class="tab-btn ${activeTab === 'posts' ? 'active' : ''}" onclick="location.href='feed'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        Посты
      </button>
      <button class="tab-btn ${activeTab === 'messages' ? 'active' : ''}" onclick="location.href='feed?tab=messages'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        Сообщения
      </button>
      <button class="tab-btn ${activeTab === 'notifications' ? 'active' : ''}" onclick="location.href='feed?tab=notifications'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        Уведомления
      </button>
      <button class="tab-btn ${activeTab === 'directory' ? 'active' : ''}" onclick="location.href='feed?tab=directory'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="11" x2="16" y2="11"></line></svg>
        Справочник
      </button>
      <button class="tab-btn ${activeTab === 'announcements' ? 'active' : ''}" onclick="location.href='feed?tab=announcements'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
        Объявления
      </button>
    </nav>
  </aside>
  `;
  document.body.insertAdjacentHTML('afterbegin', sidebarHtml);
}

export function renderHeader() {
  const headerHtml = `
  <div class="top-header">
    <div class="header-left">
      <div class="brand-small" style="cursor: pointer;" onclick="location.href='home'">ГУРМЭКЛАБ</div>
      <div class="profile-link" onclick="location.href='feed?tab=profile'" title="Мой профиль">
        <div class="user-info" id="user-info">Загрузка...</div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--gold-main);">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    </div>
    <div class="header-right" style="display: flex; gap: 15px; align-items: center;">
          <!-- НОВАЯ КНОПКА СОЗДАНИЯ ПОСТА (скрыта по умолчанию) -->
      <button id="create-post-btn" class="icon-btn" onclick="location.href='create'" title="Создать пост" style="display: none; background: transparent; border: 1px solid var(--navy-light); border-radius: 8px; padding: 8px; color: var(--gold-main);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
      <button class="icon-btn" onclick="location.href='feed?tab=messages'" title="Сообщения" style="background: transparent; border: 1px solid var(--navy-light); border-radius: 8px; padding: 8px; color: var(--text-main);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>
      <button class="logout-icon-btn" onclick="window.logout()" title="Выйти">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHtml);
  if (!window.logout) {
    window.logout = () => signOut(auth);
  }

  onAuthStateChanged(auth, async (user) => {
    const userInfoEl = document.getElementById('user-info');
    if (!userInfoEl) return;

    if (!user) {
      userInfoEl.textContent = 'Гость';
      return;
    }

    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data() || { name: user.email, role: "user" };
      const isAdmin = data.role === "admin";
      const numberHtml = data.number ? ` <span class="post-number">№${data.number}</span>` : '';

      userInfoEl.innerHTML = `${data.name || user.email}${numberHtml}` +
        (isAdmin ? ' <span class="badge admin">ADMIN</span>' : ' <span class="badge user">USER</span>');

      if (isAdmin) {
        const createPostBtn = document.getElementById('create-post-btn');
        if (createPostBtn) createPostBtn.style.display = 'flex';
      }
    } catch (e) {
      userInfoEl.textContent = user.email || 'Профиль';
    }
  });
}
export function renderFooter() {
  const footerHtml = `
  <footer style="margin-left: 260px; padding: 30px 40px; background: transparent; display: flex; justify-content: center; align-items: center; font-size: 13px; color: var(--text-muted); margin-top: auto;">
    <div style="text-align: center; display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; align-items: center;">
      <span>© ${new Date().getFullYear()} ГурмэКлаб. Все права защищены.</span>
      <span style="opacity: 0.5;">|</span>
      <a href="privacy" style="color: var(--text-muted); text-decoration: none; transition: 0.2s;" onmouseover="this.style.color='var(--gold-main)'" onmouseout="this.style.color='var(--text-muted)'">Политика конфиденциальности</a>
      <a href="terms" style="color: var(--text-muted); text-decoration: none; transition: 0.2s;" onmouseover="this.style.color='var(--gold-main)'" onmouseout="this.style.color='var(--text-muted)'">Пользовательское соглашение</a>
      <a href="#" onclick="showToast('Страница в разработке', 'info'); return false;" style="color: var(--text-muted); text-decoration: none; transition: 0.2s;" onmouseover="this.style.color='var(--gold-main)'" onmouseout="this.style.color='var(--text-muted)'">Контакты</a>
    </div>
  </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHtml);
}