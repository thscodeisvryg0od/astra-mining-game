/* ═══════════════════════════════════════
   ASTRA MINING BOT — script.js
   ═══════════════════════════════════════ */

// ── Telegram WebApp SDK ──────────────────
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }
const tgUser = tg?.initDataUnsafe?.user;

// ── Referans parametresi URL'den al ──────
const urlParams = new URLSearchParams(window.location.search);
const refFrom = urlParams.get('ref') || null;

// ── LocalStorage yardımcıları ────────────
const LS_KEY = 'astra_v2';
function loadState() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
}
function saveState() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }

// ── Varsayılan durum ─────────────────────
const saved = loadState();
const state = Object.assign({
  usd:          0.0000,
  token:        0.0000,
  power:        2110,
  lang:         'tr',
  miningLeft:   24 * 3600,
  refCount:     0,
  refList:      [],         // [{ id, name, joined }]
  completedTasks: [],       // task id listesi
  streakCount:  0,
  lastCheckin:  null,       // ISO date string
  xpTotal:      0,
  userId:       tgUser?.id || ('guest_' + Math.random().toString(36).slice(2, 8)),
  username:     tgUser?.username || tgUser?.first_name || 'Gezgin',
  agentIndex:   0,
}, saved);

// Referanstan geldiyse kaydet
if (refFrom && !state.refFrom) { state.refFrom = refFrom; saveState(); }

// ── Agent tipleri ────────────────────────
const AGENTS = [
  { glyph: '✦', label: 'NOVA',    color: '#4f8fff' },
  { glyph: '◈', label: 'PULSAR', color: '#7b5fff' },
  { glyph: '◉', label: 'QUASAR', color: '#2dd585' },
  { glyph: '⬡', label: 'NEBULA', color: '#ffb340' },
];

// ── Rank sistemi ─────────────────────────
const RANKS = [
  { name: 'Gezegen',   minPower: 0 },
  { name: 'Asteroid',  minPower: 5000 },
  { name: 'Yıldız',   minPower: 20000 },
  { name: 'Sistem',   minPower: 50000 },
  { name: 'Galaksi',  minPower: 150000 },
  { name: 'Evren',    minPower: 500000 },
];
function getRank(power) {
  let r = RANKS[0];
  for (const rank of RANKS) { if (power >= rank.minPower) r = rank; }
  return r;
}

// ── Çeviri ───────────────────────────────
const TR = {
  token:'Token', power:'Güç', sell:'Token Sat', upgrade:'Yükselt',
  ai_agent:'Astra Agent\'ınız', chat:'Sohbet', ref_quick:'1 arkadaş davet et',
  streak_label:'günlük seri', rank_label:'Rank:',
  earn_title:'Kazan', tab_invite:'Davet', tab_bonuses:'Bonuslar',
  your_link:'Referans linkiniz:', share_btn:'Arkadaş Davet Et',
  no_refs:'Henüz referansınız yok.',
  bonus_head:'Referans başına kazanın:',
  level1_comm:'1. seviye harcamalarından',
  level2_comm:'2. seviye harcamalarından',
  level3_comm:'3. seviye harcamalarından',
  bonus_first_dep:'+2500 Güç — davet ettiğiniz kişi ilk yatırımını yaptığında',
  bonus_each:'+200 Güç — her yeni kayıt için',
  upgrade_title:'Güç Mağazası', choose_usd:'USD tutarı seçin:',
  get_power:'Alacağınız güç:', first_bonus:'İlk yatırım bonusu:',
  daily_tok:'Günlük token:', daily_profit:'Günlük kâr:',
  power_stays:'* Satın alınan güç hesapta sonsuza kalır',
  buy_power:'Güç Satın Al',
  unlock_head:'Yeni agent kilidini açmak için güç artır',
  need_power:'Gerekli güç:', unlock_btn:'Kilidi Aç',
  unlock_note:'Agent\'lar görsel yükseltmedir, kazanç hızını etkilemez.',
  tasks_title:'Görevler', tab_ref:'Referans', tab_follow:'Takip Et', tab_other:'Diğer',
  follow_channel:'Telegram kanalını takip et', follow_x:'X / Twitter\'da takip et',
  daily_checkin:'Günlük giriş yap',
  task_dep5:'Bakiye yükle: 5$', task_reinv5:'Yeniden yatırım yap: 5$',
  mini_game_title:'⚡ Enerji Tıkla!',
  mini_game_sub:'10 saniyede çekirdeklere tıkla, token kazan.',
  start_game:'Oyunu Başlat',
  pay_title:'Ödeme',
  reinvest_head:'Yeniden yatırım +%5', reinvest_sub:'%0 Komisyon',
  pay_note:'Çekim yapmak için destek ekibiyle iletişime geçin.',
  nav_upgrade:'Yükselt', nav_earn:'Kazan', nav_ai:'AI', nav_tasks:'Görevler', nav_pay:'Ödeme',
  settings_title:'Ayarlar', support:'Destek', account:'Hesap bilgileri',
  ref_prog:'Referans programı', tx_history:'İşlem geçmişi',
  copied:'Link kopyalandı ✓', sold:'Token satıldı!', upgraded:'Yükseltildi!',
  not_enough:'Yeterli token yok.', power_bought:'Güç satın alındı!',
  task_done:'Görev tamamlandı!', checkin_done:'Günlük giriş yapıldı! +100 Güç 🔥',
  already_checkin:'Bugün zaten giriş yaptınız.',
  game_end:'Oyun bitti! +',
};
const EN = {
  token:'Token', power:'Power', sell:'Sell Token', upgrade:'Upgrade',
  ai_agent:'Your Astra Agent', chat:'Chat', ref_quick:'Invite 1 friend',
  streak_label:'day streak', rank_label:'Rank:',
  earn_title:'Earn', tab_invite:'Invite', tab_bonuses:'Bonuses',
  your_link:'Your referral link:', share_btn:'Invite a Friend',
  no_refs:'No referrals yet.',
  bonus_head:'Earn per referral:',
  level1_comm:'from level 1 spending',
  level2_comm:'from level 2 spending',
  level3_comm:'from level 3 spending',
  bonus_first_dep:'+2500 Power — when your referral makes first deposit',
  bonus_each:'+200 Power — for each new registration',
  upgrade_title:'Power Shop', choose_usd:'Choose USD amount:',
  get_power:'Power you get:', first_bonus:'First deposit bonus:',
  daily_tok:'Daily tokens:', daily_profit:'Daily profit:',
  power_stays:'* Purchased power stays in account permanently',
  buy_power:'Buy Power',
  unlock_head:'Increase Agent Power to unlock new agent',
  need_power:'Required power:', unlock_btn:'Unlock',
  unlock_note:'Agents are visual upgrades and do not affect earning speed.',
  tasks_title:'Tasks', tab_ref:'Referral', tab_follow:'Follow', tab_other:'Other',
  follow_channel:'Follow Telegram channel', follow_x:'Follow on X / Twitter',
  daily_checkin:'Daily check-in',
  task_dep5:'Load balance: $5', task_reinv5:'Reinvest: $5',
  mini_game_title:'⚡ Tap Energy!',
  mini_game_sub:'Tap the cores in 10 seconds to earn tokens.',
  start_game:'Start Game',
  pay_title:'Payment',
  reinvest_head:'Reinvest +5%', reinvest_sub:'0% Commission',
  pay_note:'Contact support to make a withdrawal.',
  nav_upgrade:'Upgrade', nav_earn:'Earn', nav_ai:'AI', nav_tasks:'Tasks', nav_pay:'Payment',
  settings_title:'Settings', support:'Support', account:'Account info',
  ref_prog:'Referral program', tx_history:'Transaction history',
  copied:'Link copied ✓', sold:'Tokens sold!', upgraded:'Upgraded!',
  not_enough:'Not enough tokens.', power_bought:'Power purchased!',
  task_done:'Task completed!', checkin_done:'Daily check-in done! +100 Power 🔥',
  already_checkin:'Already checked in today.',
  game_end:'Game over! +',
};
const T = () => state.lang === 'tr' ? TR : EN;
const t = (key) => T()[key] || key;

// ── DOM kısayolları ──────────────────────
const $ = (id) => document.getElementById(id);
const $q = (sel, ctx = document) => ctx.querySelector(sel);
const $qa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Referans linki ────────────────────────
function getRefLink() {
  const base = window.location.origin + window.location.pathname;
  return `${base}?ref=${state.userId}`;
}

// ── UI güncelleme ────────────────────────
function updateUI() {
  // Üst bakiye
  $('usd-val').textContent = state.usd.toFixed(4);
  // Token / Güç
  $('token-val').textContent = state.token.toFixed(4);
  $('power-val').textContent = formatNum(state.power);
  // Referans quick badge
  $('ref-quick-badge').textContent = `${state.refCount}/1`;
  // Rank + streak
  $('streak-count').textContent = state.streakCount;
  const rank = getRank(state.power);
  $('rank-name').textContent = rank.name;
  // Referans linki
  const lnk = getRefLink();
  const lnkEl = $('ref-link-text');
  if (lnkEl) lnkEl.textContent = lnk.replace('https://', '');
  // Agent görünümü
  const ag = AGENTS[state.agentIndex % AGENTS.length];
  $('agent-core').querySelector('.agent-glyph').textContent = ag.glyph;
  $('agent-core').querySelector('.agent-rank').textContent = ag.label;
  $('agent-core').style.borderColor = ag.color + '60';
  // Görev rozetleri
  updateTaskBadges();
  // Upgrade önizleme
  updateUpgradePreview();
  // Dil flag
  $('lang-flag').textContent = state.lang === 'tr' ? '🇹🇷' : '🇺🇸';
  // Çeviriler
  applyTranslations();
  // Dil flag için agent rank label
  $('agent-rank-label') && ($('agent-rank-label').textContent = ag.label);
}

function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return Math.round(n).toLocaleString('tr-TR').replace(/\./g, ' ');
  return String(Math.round(n));
}

function applyTranslations() {
  $qa('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const val = t(key);
    if (val) el.textContent = val;
  });
}

// ── Mining sayacı ────────────────────────
let timerInterval = null;
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (state.miningLeft <= 0) { state.miningLeft = 24 * 3600; }
    state.miningLeft--;
    // Token kazanımı: güç başına 0.00005 / sn
    const earn = (state.power / 10000) * 0.00005;
    state.token += earn;
    state.usd   += earn * 0.00002;
    // Sayacı göster
    const h = Math.floor(state.miningLeft / 3600);
    const m = Math.floor((state.miningLeft % 3600) / 60);
    const s = state.miningLeft % 60;
    $('timer-val').textContent = [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
    // Her 30 sn bir kaydet
    if (state.miningLeft % 30 === 0) {
      saveState();
      updateUI();
    }
  }, 1000);
}

// ── Upgrade önizleme ──────────────────────
let upgradeAmt = 3;
function updateUpgradePreview() {
  const power = upgradeAmt * 10000;
  const bonus = Math.round(power * 0.2);
  const tokDay = Math.round(power * 0.01714);
  const el1 = $('up-power');
  const el2 = $('up-bonus');
  const el3 = $('up-tok');
  const amtEl = $('amt-val');
  if (el1) el1.textContent = formatNum(power);
  if (el2) el2.textContent = '+' + formatNum(bonus);
  if (el3) el3.textContent = tokDay + ' / ' + (state.lang === 'tr' ? 'gün' : 'day');
  if (amtEl) amtEl.textContent = upgradeAmt;
}

// ── Görev rozetleri ───────────────────────
function updateTaskBadges() {
  const rc = state.refCount;
  const goals = [1, 3, 7, 15, 30, 50];
  goals.forEach(g => {
    const el = $(`task-ref${g}`);
    if (!el) return;
    el.textContent = `${Math.min(rc, g)}/${g}`;
    if (rc >= g) { el.classList.add('done-badge'); el.textContent = '✓'; }
    else { el.classList.remove('done-badge'); }
  });
  // Tamamlanan follow görevleri
  state.completedTasks.forEach(tid => {
    const item = $q(`[data-task="${tid}"]`);
    if (!item) return;
    item.classList.add('done');
    const btn = item.querySelector('.task-go-btn');
    if (btn) { btn.textContent = '✓'; btn.classList.add('done-go'); }
  });
  // Günlük giriş
  const dailyBtn = $('daily-btn');
  if (dailyBtn) {
    const today = new Date().toDateString();
    if (state.lastCheckin === today) {
      dailyBtn.textContent = '✓'; dailyBtn.classList.add('done-go');
    } else {
      dailyBtn.textContent = t('daily_checkin') === 'Daily check-in' ? 'Claim' : 'Al';
      dailyBtn.classList.remove('done-go');
    }
  }
}

// ── Toast ─────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const el = $('toast');
  el.textContent = msg; el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
}

// ── Ekran geçişi ──────────────────────────
function goScreen(name) {
  $qa('.screen').forEach(s => s.classList.remove('active'));
  $qa('.nav-btn').forEach(b => b.classList.remove('active'));
  const sc = $(`screen-${name}`);
  const btn = $q(`[data-screen="${name}"]`);
  if (sc) sc.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ── Tab geçişi ────────────────────────────
function setupTabs(containerSel, panePrefix) {
  $qa('.tab', $q(containerSel)).forEach(tab => {
    tab.addEventListener('click', () => {
      $qa('.tab', $q(containerSel)).forEach(t2 => t2.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      $qa('.tab-pane', $q(containerSel).parentElement).forEach(p => {
        p.id === `tab-${target}` ? p.classList.remove('hidden') : p.classList.add('hidden');
      });
    });
  });
}

// ─────────────────────────────────────────
// ── MINI OYUN ────────────────────────────
// ─────────────────────────────────────────
let gameRunning = false;
let gameOrbScore = 0;
let gameTimerEl = null;

function startMiniGame() {
  if (gameRunning) return;
  gameRunning = true; gameOrbScore = 0;
  const area = $('game-area');
  const result = $('game-result');
  const startBtn = $('start-game-btn');
  area.classList.remove('hidden');
  result.classList.add('hidden');
  startBtn.disabled = true;
  area.innerHTML = '';

  // Sayaç label
  gameTimerEl = document.createElement('span');
  gameTimerEl.className = 'game-timer-label';
  gameTimerEl.textContent = '10';
  area.appendChild(gameTimerEl);

  // Topları doğru zamanlı spawnla
  let elapsed = 0;
  const spawnInterval = setInterval(() => {
    spawnOrb(area);
  }, 800);

  let countdown = 10;
  const countInterval = setInterval(() => {
    countdown--;
    if (gameTimerEl) gameTimerEl.textContent = String(countdown);
    if (countdown <= 0) {
      clearInterval(countInterval);
      clearInterval(spawnInterval);
      endGame(area, result, startBtn);
    }
  }, 1000);
}

function spawnOrb(area) {
  const orb = document.createElement('div');
  orb.className = 'game-orb';
  const maxX = area.clientWidth  - 16;
  const maxY = area.clientHeight - 16;
  const x = 16 + Math.random() * (maxX - 32);
  const y = 16 + Math.random() * (maxY - 32);
  orb.style.left = x + 'px';
  orb.style.top  = y + 'px';
  orb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (!gameRunning) return;
    gameOrbScore++;
    orb.remove();
    // Tıklama efekti
    const burst = document.createElement('div');
    burst.style.cssText = `position:absolute;width:32px;height:32px;border-radius:50%;background:rgba(79,143,255,0.4);left:${x-16}px;top:${y-16}px;transform:scale(1);transition:transform 0.2s,opacity 0.2s;pointer-events:none;`;
    area.appendChild(burst);
    setTimeout(() => { burst.style.transform = 'scale(2.5)'; burst.style.opacity = '0'; }, 10);
    setTimeout(() => burst.remove(), 250);
  });
  area.appendChild(orb);
  // 1.5 sn sonra kendiliğinden yok ol
  setTimeout(() => { if (orb.parentNode) orb.remove(); }, 1500);
}

function endGame(area, result, startBtn) {
  gameRunning = false;
  // Tüm topları temizle
  $qa('.game-orb', area).forEach(o => o.remove());
  // Ödül: her tıklamaya 0.05 token
  const earned = +(gameOrbScore * 0.05).toFixed(4);
  state.token += earned;
  state.usd   += earned * 0.00002;
  saveState(); updateUI();
  result.classList.remove('hidden');
  result.textContent = t('game_end') + earned + ' token';
  startBtn.disabled = false;
}

// ─────────────────────────────────────────
// ── OLAY DİNLEYİCİLERİ ──────────────────
// ─────────────────────────────────────────
function setupEvents() {

  // Alt menü
  $qa('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => goScreen(btn.dataset.screen));
  });

  // Dil butonu
  $('lang-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    $('lang-panel').classList.toggle('hidden');
  });
  $qa('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      state.lang = opt.dataset.lang;
      $('lang-panel').classList.add('hidden');
      saveState(); updateUI();
    });
  });
  document.addEventListener('click', () => $('lang-panel').classList.add('hidden'));

  // Ayarlar
  $('settings-btn').addEventListener('click', () => $('settings-overlay').classList.remove('hidden'));
  $('settings-close').addEventListener('click', () => $('settings-overlay').classList.add('hidden'));
  $('settings-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) $('settings-overlay').classList.add('hidden');
  });
  // Ayarlar menü öğeleri
  $('menu-ref2').addEventListener('click', () => { $('settings-overlay').classList.add('hidden'); goScreen('earn'); });

  // Token sat
  $('btn-sell').addEventListener('click', () => {
    if (state.token < 0.001) { showToast(t('not_enough')); return; }
    const earned = state.token * 0.00002;
    state.usd += earned; state.token = 0;
    saveState(); updateUI(); showToast(t('sold'));
  });

  // Agent yükselt
  $('btn-upgrade').addEventListener('click', () => {
    goScreen('upgrade');
    $q('[data-screen="upgrade"]').classList.add('active');
    $qa('.nav-btn').forEach(b => b.classList.remove('active'));
    $q('[data-screen="upgrade"]').classList.add('active');
  });

  // Agent next
  $('agent-next-btn').addEventListener('click', () => {
    const next = AGENTS[(state.agentIndex + 1) % AGENTS.length];
    const requiredPower = (state.agentIndex + 1) * 250000;
    if (state.power < requiredPower) {
      showToast(`${t('need_power')} ${formatNum(requiredPower)}`);
      return;
    }
    state.agentIndex = (state.agentIndex + 1) % AGENTS.length;
    saveState(); updateUI();
  });

  // AI sohbet
  $('chat-btn').addEventListener('click', () => {
    if (tg) { tg.openTelegramLink('https://t.me/AstraMinerBot'); }
    else { window.open('https://t.me/AstraMinerBot', '_blank'); }
  });

  // Ref kopyala
  $('copy-ref-btn').addEventListener('click', () => {
    const lnk = getRefLink();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lnk).then(() => showToast(t('copied')));
    } else {
      const ta = document.createElement('textarea');
      ta.value = lnk; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      showToast(t('copied'));
    }
  });

  // Ref paylaş
  $('share-ref-btn').addEventListener('click', () => {
    const lnk = getRefLink();
    const msg = `Astra Mining'e katıl! ${lnk}`;
    if (tg) { tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(lnk)}&text=${encodeURIComponent(msg)}`); }
    else { window.open(`https://t.me/share/url?url=${encodeURIComponent(lnk)}`, '_blank'); }
  });

  // Güç miktarı
  $qa('.amt-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.dataset.delta);
      upgradeAmt = Math.max(1, Math.min(999, upgradeAmt + delta));
      updateUpgradePreview();
    });
  });

  // Güç satın al
  $('buy-power-btn').addEventListener('click', () => {
    // Gerçek projede burada ödeme ekranına yönlendirilir.
    // Demo: doğrudan güç ekle
    const power = upgradeAmt * 10000;
    const bonus = Math.round(power * 0.2);
    state.power += power + bonus;
    saveState(); updateUI();
    showToast(t('power_bought'));
    goScreen('ai');
  });

  // Agent kilit açma
  $('unlock-agent-btn').addEventListener('click', () => {
    const required = 250000;
    if (state.power >= required) {
      state.agentIndex = Math.min(state.agentIndex + 1, AGENTS.length - 1);
      saveState(); updateUI(); showToast('Agent açıldı! ✦');
    } else {
      showToast(`${t('need_power')} ${formatNum(required)}`);
    }
  });

  // Takip görevleri
  $qa('.task-go-btn').forEach(btn => {
    const item = btn.closest('.task-item');
    if (!item) return;
    const taskId = item.dataset.task;
    const url    = btn.dataset.url;
    const reward = parseInt(item.dataset.reward || '0');

    btn.addEventListener('click', () => {
      if (state.completedTasks.includes(taskId)) return;
      if (url) {
        if (tg) { tg.openTelegramLink(url); }
        else { window.open(url, '_blank'); }
        // 2 sn sonra tamamlandı say
        setTimeout(() => {
          state.completedTasks.push(taskId);
          state.power += reward;
          saveState(); updateUI();
          showToast(t('task_done') + ' +' + formatNum(reward) + ' Güç');
        }, 2000);
      }
    });
  });

  // Günlük giriş
  $('daily-btn')?.addEventListener('click', () => {
    const today = new Date().toDateString();
    if (state.lastCheckin === today) { showToast(t('already_checkin')); return; }
    // Streak hesabı
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    state.streakCount = (state.lastCheckin === yesterday) ? state.streakCount + 1 : 1;
    state.lastCheckin = today;
    state.power += 100;
    state.xpTotal += 50;
    saveState(); updateUI();
    showToast(t('checkin_done'));
  });

  // Mini oyun başlat
  $('start-game-btn')?.addEventListener('click', startMiniGame);

  // Earn sekmeleri
  $qa('#screen-earn .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $qa('#screen-earn .tab').forEach(t2 => t2.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      $qa('#screen-earn .tab-pane').forEach(p => {
        p.id === `tab-${target}` ? p.classList.remove('hidden') : p.classList.add('hidden');
      });
    });
  });

  // Tasks sekmeleri
  $qa('#screen-tasks .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $qa('#screen-tasks .tab').forEach(t2 => t2.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      $qa('#screen-tasks .tab-pane').forEach(p => {
        p.id === `tab-${target}` ? p.classList.remove('hidden') : p.classList.add('hidden');
      });
    });
  });

  // Seviye tab (referans listesi)
  $qa('.lvl-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $qa('.lvl-tab').forEach(t2 => t2.classList.remove('active'));
      tab.classList.add('active');
      renderRefList(parseInt(tab.dataset.level));
    });
  });
}

// ── Referans listesini göster ─────────────
function renderRefList(level) {
  const el = $('ref-list');
  if (!el) return;
  const filtered = state.refList.filter(r => r.level === level);
  if (filtered.length === 0) {
    el.innerHTML = `<p class="empty-msg">${t('no_refs')}</p>`;
    return;
  }
  el.innerHTML = filtered.map(r =>
    `<div class="task-item"><div class="task-left"><span class="task-icon">◎</span><span>${r.name}</span></div><span class="chip-badge">0 USD</span></div>`
  ).join('');
}

// ─────────────────────────────────────────
// ── BAŞLATMA ─────────────────────────────
// ─────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setupEvents();
  updateUI();
  startTimer();
  renderRefList(1);
  // Ref'ten geldiyse sahte referans sayısı dışarıdan yönetilir (backend olmadan simülasyon)
});

// Sekme kapanırken kaydet
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveState();
});
window.addEventListener('pagehide', saveState);
