// ui.js — красивые уведомления, модальные окна и цветочный фон

// ===== КОНТЕЙНЕР ДЛЯ УВЕДОМЛЕНИЙ =====
function getToastContainer() {
  let c = document.querySelector('.toast-container');
  if (!c) {
    c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  return c;
}

// ===== УВЕДОМЛЕНИЯ =====
export function showToast(message, type = 'info', duration = 3000) {
  const container = getToastContainer();
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== МОДАЛЬНОЕ ОКНО ПОДТВЕРЖДЕНИЯ =====
export function showConfirm(title, message, confirmText = 'Удалить') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box">
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="modal-actions">
          <button class="secondary" id="modal-cancel">Отмена</button>
          <button class="danger" id="modal-ok">${confirmText}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Принудительный рефлоу для анимации
    requestAnimationFrame(() => overlay.classList.add('active'));

    const close = (result) => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
      resolve(result);
    };

    overlay.querySelector('#modal-cancel').onclick = () => close(false);
    overlay.querySelector('#modal-ok').onclick = () => close(true);
  });
}

// ===== ЦВЕТОЧНЫЙ ФОН =====
export function initFlowers() {
  // Проверяем, есть ли уже контейнер, чтобы не создавать дубликаты
  let container = document.getElementById('flower-bg-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'flower-bg-container';
    // Добавляем стили прямо в JS (или они уже есть в CSS)
    container.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: -1; overflow: hidden; opacity: 0.3;
    `;
    document.body.appendChild(container);
  }

  // Функция создания одного цветка
  const createFlower = () => {
    const flower = document.createElement('div');
    
    // Случайный выбор эмодзи-цветка
    const emojis = ['🌸', '🌺', '🌼', '🌻', '🌹'];
    flower.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Случайный размер (от 15 до 30 пикселей)
    const size = Math.random() * 15 + 15;
    
    // Случайная позиция по горизонтали
    const left = Math.random() * 100;
    
    // Случайная длительность падения (от 10 до 20 секунд)
    const duration = Math.random() * 10 + 10;
    
    // Случайная задержка перед началом
    const delay = Math.random() * 10;

    flower.style.cssText = `
      position: absolute;
      left: ${left}vw;
      top: -50px;
      font-size: ${size}px;
      animation: fall ${duration}s linear ${delay}s infinite;
      opacity: ${Math.random() * 0.5 + 0.3};
      filter: blur(1px);
    `;

    container.appendChild(flower);
  };

  // Создаем 30 цветков
  for (let i = 0; i < 30; i++) {
    createFlower();
  }
  
}
// ===== МОДАЛЬНОЕ ОКНО ВСТАВКИ ССЫЛКИ =====
export function showLinkModal(defaultText = '') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box" style="text-align: left;">
        <h3 style="text-align: center;">Вставить ссылку</h3>
        <label style="display:block; font-size:13px; color:var(--text-muted); margin-bottom:6px;">Текст ссылки</label>
        <input type="text" id="link-modal-text" placeholder="Например: Нажмите здесь" value="${defaultText.replace(/"/g, '&quot;')}">
        <label style="display:block; font-size:13px; color:var(--text-muted); margin-bottom:6px;">URL (ссылка)</label>
        <input type="text" id="link-modal-url" placeholder="https://example.com">
        <div class="modal-actions" style="margin-top: 10px;">
          <button type="button" class="secondary" id="link-modal-cancel">Отмена</button>
          <button type="button" id="link-modal-ok">Вставить</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    const textInput = overlay.querySelector('#link-modal-text');
    const urlInput = overlay.querySelector('#link-modal-url');
    (defaultText ? urlInput : textInput).focus();

    const close = (result) => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 250);
      resolve(result);
    };

    overlay.querySelector('#link-modal-cancel').onclick = () => close(null);
    overlay.querySelector('#link-modal-ok').onclick = () => {
      let url = urlInput.value.trim();
      const text = textInput.value.trim();
      if (!url) {
        urlInput.focus();
        return;
      }
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      close({ text: text || url, url });
    };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(null);
    });
  });
}