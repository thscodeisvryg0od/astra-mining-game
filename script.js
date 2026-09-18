/* ═══════════════════════════════════════
   ASTRA MINING BOT — script.js
   ═══════════════════════════════════════ */

// ── Sunucu Bağlantı Ayarları (Kendi PythonAnywhere kullanıcı adınızla değiştirin) ──
const BACKEND_URL = "https://firaty33.pythonanywhere.com";

// ── Telegram WebApp SDK ──────────────────
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }
const tgUser = tg?.initDataUnsafe?.user;

// ── Referans parametresi URL'den al ──────
const urlParams = new URLSearchParams(window.location.search);
const refFrom = urlParams.get('ref') || null;

// ── Yedek LocalStorage Yardımcıları ──────
const LS_KEY = 'astra_v2';
function loadLocalBackup() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
}
function saveLocalBackup() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }

// ── Varsayılan Durum Yapısı ──────────────
const backupData = loadLocalBackup();
const state = Object.assign({
  usd:          0.0000,
  token:        0.0000,
  power:        2110,
  lang:         'tr',
  miningLeft:   24 * 3600,
  refCount:     0,
  refList:      [],
  completedTasks: [],
  streakCount:  0,
  lastCheckin:  null,
  xpTotal:      0,
  userId:       tgUser?.id ? tgUser.id.toString() : ('guest_' + Math.random().toString(36).slice(2, 8)),
  username:     tgUser?.username || tgUser?.first_name || 'Gezgin',
  agentIndex:   0,
}, backupData);

if (refFrom && !state.refFrom) { state.refFrom = refFrom; saveLocalBackup(); }

// ── SUNUCUDAN VERİLERİ ÇEKME ──
async function loadFromServer() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/get_user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegram_id: state.userId })
    });
    const result = await response.json();
    if (result.status === "success" && result.data) {
      state.usd = result.data.usd_balance;
      state.token = result.data.token_count;
      state.power = result.data.power_amount;
      state.refCount = result.data.referral_count;
      state.lang = result.data.language || 'tr';
      updateUI();
    }
  } catch (error) {
    console.error("Sunucu yükleme hatası:", error);
  }
}

// ── SUNUCUYA VERİ KAYDETME ──
async function saveToServer() {
  saveLocalBackup();
  try {
    await fetch(`${BACKEND_URL}/api/save_user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: state.userId,
        usd_balance: state.usd,
        token_count: state.token,
        power_amount: state.power,
        referral_count: state.refCount,
        language: state.lang
      })
    });
  } catch (error) {
    console.error("Sunucu kaydetme hatası:", error);
  }
}

// ── AGENT & RANK TANIMLARI ────────────────────────
const AGENTS = [
  { glyph: '✦', label: 'NOVA',    color: '#4f8fff' },
  { glyph: '◈', label: 'PULSAR', color: '#7b5fff' },
  { glyph: '◉', label: 'QUASAR', color: '#2dd585' },
  { glyph: '⬡', label: 'NEBULA', color: '#ffb340' },
];

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

// ── ÇEVİRİ SÖZLÜKLERİ ─────────────────────
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
  unlock_note:'Agent\'lar görsel yükseltmedir, kazanç hızı etkilenmez.',
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

const $ = (id) => document.getElementById(id);
const $q = (sel, ctx = document) => ctx.querySelector(sel);
const $qa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function getRefLink() {
  const base = window.location.origin + window.location.pathname;
  return `${base}?ref=${state.userId}`;
}

function updateUI() {
  if($('usd-val'))$('usd-val').textContent = state.usd.toFixed(4);
  if($('token-val'))$('token-val').textContent = state.token.toFixed(4);
  if($('power-val'))$('power-val').textContent = formatNum(state.power);
  if($('ref-quick-badge'))$('ref-quick-badge').textContent = `${state.refCount}/1`;
  if($('streak-count'))$('streak-count').textContent = state.streakCount;
  
  const rank = getRank(state.power);
  if($('rank-name'))$('rank-name').textContent = rank.name;
  
  const lnk = getRefLink();
  const lnkEl = $('ref-link-text');
  if (lnkEl) lnkEl.textContent = lnk.replace('https://', '');
  
  const ag = AGENTS[state.agentIndex % AGENTS.length];
  const core = $('agent-core');
  if(core) {
    if(core.querySelector('.agent-glyph')) core.querySelector('.agent-glyph').textContent = ag.glyph;
    if(core.querySelector('.agent-rank')) core.querySelector('.agent-rank').textContent = ag.label;
    core.style.borderColor = ag.color + '60';
  }
  
  updateTaskBadges();
  updateUpgradePreview();
  if($('lang-flag'))$('lang-flag').textContent = state.lang === 'tr' ? '🇹🇷' : '🇺🇸';
  applyTranslations();
  if($('agent-rank-label'))$('agent-rank-label').textContent = ag.label;
}

function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return Math.round(n).toLocaleString('tr-TR').replace(/\./g, ' ');
  return String(Math.round(n));
}

function applyTranslations() {
  $qa('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    el.textContent = t(key);
  });
}

// ── MINING ZAMANLAYICISI ─────
let timerInterval = null;
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (state.miningLeft <= 0) { state.miningLeft = 24 * 3600; }
    state.miningLeft--;
    
    const earn = (state.power / 10000) * 0.00005;
    state.token += earn;
    state.usd   += earn * 0.00002;
    
    const h = Math.floor(state.miningLeft / 3600);
    const m = Math.floor((state.miningLeft % 3600) / 60);
    const s = state.miningLeft % 60;
    if($('timer-val')) {$('timer-val').textContent = [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
    }
    
    if (state.miningLeft % 30 === 0) {
      saveToServer();
      updateUI();
    }
  }, 1000);
}

let upgradeAmt = 3;
function updateUpgradePreview() {
  const power = upgradeAmt * 10000;
  const bonus = Math.round(power * 0.2);
  const tokDay = Math.round(power * 0.01714);
  if ($('up-power'))$('up-power').textContent = formatNum(power);
  if ($('up-bonus'))$('up-bonus').textContent = '+' + formatNum(bonus);
  if ($('up-tok'))$('up-tok').textContent = tokDay + ' / ' + (state.lang === 'tr' ? 'gün' : 'day');
  if ($('amt-val'))$('amt-val').textContent = upgradeAmt;
}

function updateTaskBadges() {
  const rc = state.refCount;
  const goals = [1, 3, 7, 15, 30, 50]; // Hata giderildi
  goals.forEach(g => {
    const el = $(`task-ref${g}`);
    if (!el) return;
    el.textContent = `${Math.min(rc, g)}/${g}`;
    if (rc >= g) { el.classList.add('done-badge'); el.textContent = '✓'; }
    else { el.classList.remove('done-badge'); }
  });
  
  state.completedTasks.forEach(tid => {
    const item = $q(`[data-task="${tid}"]`);
    if (!item) return;
    item.classList.add('done');
    const btn = item.querySelector('.task-go-btn');
    if (btn) { btn.textContent = '✓'; btn.classList.add('done-go'); }
  });
  
  const dailyBtn = $('daily-btn');
  if (dailyBtn) {
    const today = new Date().toDateString();
    if (state.lastCheckin === today) {
      dailyBtn.textContent = '✓'; dailyBtn.classList.add('done-go');
    } else {
      dailyBtn.textContent = state.lang === 'tr' ? 'Al' : 'Claim';
      dailyBtn.classList.remove('done-go');
    }
  }
}

let toastTimer = null;
function showToast(msg) {
  const el = $('toast');
  if(!el) return;
  el.textContent = msg; el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
}

function goScreen(name) {
  $qa('.screen').forEach(s => s.classList.remove('active'));$qa('.nav-btn').forEach(b => b.classList.remove('active'));
  const sc = $(`screen-${name}`);
  const btn = $q(`[data-screen="${name}"]`);
  if (sc) sc.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ── MİNİ OYUN MOTORU ──
let gameRunning = false;
let gameOrbScore = 0;

function spawnOrb(area) {
  if (!gameRunning) return;
  const orb = document.createElement('div');
  orb.className = 'game-orb';
  const x = Math.random() * 80 + 10;
  const y = Math.random() * 70 + 15;
  orb.style.left = `${x}%`;
  orb.style.top = `${y}%`;

  orb.addEventListener('click', () => {
    gameOrbScore += 10;
    orb.remove();
  });

  area.appendChild(orb);
  setTimeout(() => { if (orb.parentNode) orb.remove(); }, 1200);
}

function startMiniGame() {
  if (gameRunning) return;
  gameRunning = true; 
  gameOrbScore = 0;
  const area = $('game-area');
  const result = $('game-result');
  const startBtn = $('start-game-btn');
  
  area.classList.remove('hidden');
  result.classList.add('hidden');
  startBtn.disabled = true;
  area.innerHTML = '';

  const timerEl = document.createElement('span');
  timerEl.className = 'game-timer-label';
  timerEl.textContent = '10';
  area.appendChild(timerEl);

  const spawnInterval = setInterval(() => { spawnOrb(area); }, 800);

  let countdown = 10;
  const cdInterval = setInterval(() => {
    countdown--;
    timerEl.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(cdInterval);
      clearInterval(spawnInterval);
      gameRunning = false;
      area.classList.add('hidden');
      result.classList.remove('hidden');
      startBtn.disabled = false;
      
      const reward = (gameOrbScore * 0.1);
      state.token += reward;
      result.textContent = `${t('game_end')} ${reward.toFixed(2)} Token!`;
      saveToServer();
      updateUI();
    }
  }, 1000);
}

// ── ETKİNLİK DİNLENİCİLERİ ───────────────────────
function setupEvents() {
  $qa('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => goScreen(btn.getAttribute('data-screen')));
  });

  $('lang-btn')?.addEventListener('click', () => $('lang-panel')?.classList.toggle('hidden'));$qa('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      state.lang = opt.getAttribute('data-lang');
      $('lang-panel')?.classList.add('hidden');
      saveToServer();
      updateUI();
    });
  });

  $('agent-next-btn')?.addEventListener('click', () => {
    state.agentIndex = (state.agentIndex + 1) % AGENTS.length;
    updateUI();
  });

  $('daily-btn')?.addEventListener('click', () => {
    const today = new Date().toDateString();
    if (state.lastCheckin === today) {
      showToast(t('already_checkin'));
      return;
    }
    state.lastCheckin = today;
    state.power += 100;
    state.streakCount += 1;
    saveToServer();
    updateUI();
    showToast(t('checkin_done'));
  });

  $('start-game-btn')?.addEventListener('click', startMiniGame);
}

// ── BAŞLATMA MOTORU ───────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  setupEvents();
  updateUI();
  await loadFromServer();
  startTimer();
});

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveToServer();
});
