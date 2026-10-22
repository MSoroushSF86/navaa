const CURRENT_KEY = 'navaa_current_user';
const ADMIN_EMAIL = 'admin@navaa.com';

const currentUser = JSON.parse(localStorage.getItem(CURRENT_KEY)) || null;

// فقط ادمین
if (!currentUser || (currentUser.email !== ADMIN_EMAIL && currentUser.role !== 'admin')) {
  alert('⛔ دسترسی نداری!');
  window.location.href = 'gallery.html';
}

// ================== RENDER ==================
const users = JSON.parse(localStorage.getItem('navaa_users')) || [];
const items = JSON.parse(localStorage.getItem('navaa_items')) || [];

// آمار
document.getElementById('statUsers').textContent = users.length;
document.getElementById('statSubs').textContent = users.filter(u => u.hasSubscription).length;
document.getElementById('statItems').textContent = items.length;

// جدول کاربران
const tbody = document.getElementById('usersTableBody');

if (users.length === 0) {
  tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#888;padding:2rem;">هنوز کسی ثبت‌نام نکرده</td></tr>`;
} else {
  users.sort((a, b) => b.joinDate - a.joinDate).forEach((u, i) => {
    const date = new Date(u.joinDate).toLocaleDateString('fa-IR');
    const subBadge = u.hasSubscription
      ? '<span class="badge-yes">✓ فعال</span>'
      : '<span class="badge-no">—</span>';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHtml(u.fullname)}</td>
      <td dir="ltr" style="text-align:right;">${escapeHtml(u.phone)}</td>
      <td dir="ltr" style="text-align:right;">${escapeHtml(u.email)}</td>
      <td dir="ltr" style="text-align:right;">${u.appleId ? escapeHtml(u.appleId) : '—'}</td>
      <td>${subBadge}</td>
      <td>${date}</td>
    `;
    tbody.appendChild(tr);
  });
}

// گالری آثار آپلودشده
const adminItems = document.getElementById('adminItems');
if (items.length === 0) {
  adminItems.innerHTML = '<p style="color:#888;">هنوز اثری آپلود نشده.</p>';
} else {
  items.sort((a, b) => b.time - a.time).forEach(item => {
    const card = document.createElement('div');
    card.className = 'admin-item-card';
    card.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="admin-item-info">
        <strong>${escapeHtml(item.title)}</strong>
        <small>${item.artist ? '👤 ' + escapeHtml(item.artist) : ''}</small>
      </div>
    `;
    adminItems.appendChild(card);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}w