/* ============================================================
   ASTRA MINING
   Frontend-only simulation engine
   No backend
   No real money
   No real blockchain
   No real Telegram dependency
   ============================================================ */

"use strict";

/* ============================================================
   OPTIONAL TELEGRAM SUPPORT
   ============================================================ */

const tg = window.Telegram?.WebApp || null;

if (tg) {
  try {
    tg.ready();
    tg.expand();

    if (tg.setHeaderColor) {
      tg.setHeaderColor("#040611");
    }

    if (tg.setBackgroundColor) {
      tg.setBackgroundColor("#040611");
    }
  } catch (error) {
    console.warn("Telegram WebApp initialization failed:", error);
  }
}

/* ============================================================
   CONFIG
   ============================================================ */

const CONFIG = {
  storageKey: "astra-mining-sim-v3",

  simulation: true,

  cycleMs: 24 * 60 * 60 * 1000,

  minUpgradeUsd: 1,
  maxUpgradeUsd: 100,

  powerPerUsd: 10000,

  firstPurchaseBonus: 0.20,

  tokensPer10kPerDay: 171.4,

  tokenPriceUsd: 0.025,

  dailyCheckinReward: 100,

  gameMaxPlaysPerDay: 3,

  gameDurationSeconds: 10,

  gameOrbLifetimeMs: 1000,

  gameSpawnMs: 700,

  gameRewardPerPoint: 0.1,
};

/* ============================================================
   AGENTS
   ============================================================ */

const AGENTS = [
  {
    glyph: "✦",
    label: "NOVA",
    color: "#4f8fff",
    requiredPower: 0,
    descriptionTr: "Temel çekirdek ajanı",
    descriptionEn: "Primary core agent",
  },

  {
    glyph: "◈",
    label: "PULSAR",
    color: "#7b5fff",
    requiredPower: 250000,
    descriptionTr: "İleri seviye görsel ajan",
    descriptionEn: "Advanced visual agent",
  },

  {
    glyph: "◉",
    label: "QUASAR",
    color: "#2dd585",
    requiredPower: 750000,
    descriptionTr: "Elit görsel ajan",
    descriptionEn: "Elite visual agent",
  },

  {
    glyph: "⬡",
    label: "NEBULA",
    color: "#ffb340",
    requiredPower: 1500000,
    descriptionTr: "Nadir sınıf görsel ajan",
    descriptionEn: "Rare class visual agent",
  },
];

/* ============================================================
   RANKS
   ============================================================ */

const RANKS = [
  {
    nameTr: "Gezegen",
    nameEn: "Planet",
    minPower: 0,
  },

  {
    nameTr: "Asteroid",
    nameEn: "Asteroid",
    minPower: 5000,
  },

  {
    nameTr: "Yıldız",
    nameEn: "Star",
    minPower: 20000,
  },

  {
    nameTr: "Sistem",
    nameEn: "System",
    minPower: 50000,
  },

  {
    nameTr: "Galaksi",
    nameEn: "Galaxy",
    minPower: 150000,
  },

  {
    nameTr: "Evren",
    nameEn: "Universe",
    minPower: 500000,
  },
];

/* ============================================================
   TRANSLATIONS
   ============================================================ */

const TR = {
  simulation: "SIM",
  command_center: "COMMAND CENTER",
  online: "ONLINE",
  efficiency: "EFFICIENCY",
  active_core: "ACTIVE CORE",
  mining_cycle: "MINING CYCLE",
  production_running: "Üretim devam ediyor",
  production_complete: "Döngü tamamlandı",
  restart_cycle: "Döngüyü Yenile",

  token: "Token",
  power: "Güç",
  sell: "Token Sat",
  upgrade: "Yükselt",

  ai_agent: "Astra Agent'ınız",
  agent_visual_only: "Görsel çekirdek yükseltmesi",
  chat: "Sohbet",

  ref_quick: "1 arkadaş davet et",
  day_streak: "günlük seri",
  rank_label: "Rank",
  system_status: "SYSTEM STATUS",

  earn_title: "Kazan",
  tab_invite: "Davet",
  tab_bonuses: "Bonuslar",

  your_link: "Referans linkiniz",
  share_btn: "Arkadaş Davet Et",
  simulate_ref: "Demo arkadaş ekle",
  referral_levels: "REFERANS SEVİYELERİ",
  level: "Seviye",

  no_refs: "Bu seviyede henüz referans yok.",
  demo_ref_created: "Demo arkadaş başarıyla eklendi.",
  referral_bonus: "Referans ödülü",

  bonus_head: "Referans başına kazanın",
  level1_comm: "1. seviye harcamalarından",
  level2_comm: "2. seviye harcamalarından",
  level3_comm: "3. seviye harcamalarından",

  registration_reward: "Kayıt ödülü",
  registration_reward_desc: "Her yeni kayıt",
  deposit_reward: "İlk yatırım",
  deposit_reward_desc: "İlk yatırım yapan referans",

  upgrade_title: "Güç Mağazası",
  sim_balance: "Simülasyon bakiyesi",
  choose_usd: "USD tutarı seçin",
  upgrade_preview: "YATIRIM ÖNİZLEMESİ",

  get_power: "Alacağınız güç",
  first_bonus: "İlk yatırım bonusu",
  total_power: "Toplam güç",
  daily_tok: "Günlük token",
  daily_profit: "Verim oranı",

  first_purchase_bonus: "İlk simülasyon yatırımı için",
  buy_power: "Güç Satın Al",
  power_stays: "* Satın alınan güç hesapta kalıcıdır",

  unlock_head: "Yeni agent kilidini aç",
  unlock_note:
    "Agent'lar görsel yükseltmedir ve mining hızını değiştirmez.",

  tasks_title: "Görevler",
  tab_ref: "Referans",
  tab_follow: "Takip Et",
  tab_other: "Diğer",

  follow_channel: "Telegram topluluğunu takip et",
  follow_x: "X / Twitter profilini ziyaret et",
  daily_checkin: "Günlük giriş yap",

  deposit5: "Bakiye yükle: $5",
  reinvest5: "Yeniden yatırım yap: $5",

  claim: "Al",
  simulate: "Simüle Et",
  done: "Tamamlandı",
  locked: "Kilitli",

  mini_game_title: "⚡ Enerji Tıkla!",
  mini_game_sub:
    "10 saniyede çekirdeklere tıkla, token kazan.",
  start_game: "Oyunu Başlat",

  pay_title: "Ödeme",
  reinvest_head: "Yeniden yatırım +5%",
  reinvest_sub: "Simülasyon komisyonu 0%",
  available_usd: "Kullanılabilir USD",
  token_value: "Token değeri",
  networks: "NETWORKS",

  network_bnb: "Ağ: BNB",
  network_trx: "Ağ: TRX",
  network_ton: "Ağ: TON",
  network_usdt: "Ağ: BEP20",

  tx_history: "İşlem geçmişi",
  withdraw: "Çekim Simülasyonu",

  simulation_warning:
    "Bu ekran tamamen simülasyondur. Gerçek blockchain işlemi, ödeme, para transferi veya yatırım yapılmaz.",

  nav_upgrade: "Yükselt",
  nav_earn: "Kazan",
  nav_ai: "AI",
  nav_tasks: "Görevler",
  nav_pay: "Ödeme",

  settings_title: "Ayarlar",
  faq: "FAQ",
  support: "Destek",
  account: "Hesap bilgileri",
  ref_prog: "Referans programı",

  reset_demo: "Demo verilerini sıfırla",
  local_storage_note:
    "Veriler yalnızca bu tarayıcıdaki localStorage üzerinde saklanır.",

  copied: "Link kopyalandı ✓",
  sold: "Token satışı simüle edildi.",
  upgraded: "Güç yükseltmesi simüle edildi.",
  not_enough_token: "Yeterli token yok.",
  not_enough_usd: "Yeterli USD bakiyesi yok.",

  task_done: "Görev tamamlandı!",
  checkin_done: "Günlük giriş yapıldı! +100 Güç 🔥",
  already_checkin: "Bugün zaten giriş yaptınız.",

  game_end: "Oyun bitti!",
  game_limit: "Bugünkü mini oyun hakkınız doldu.",

  cycle_complete: "Mining döngüsü tamamlandı.",
  cycle_restarted: "Yeni mining döngüsü başlatıldı.",

  welcome:
    "Astra Core çevrimiçi. Tüm sistemler simülasyon modunda.",

  no_transactions: "Henüz işlem bulunmuyor.",
  simulation_only: "SADECE SİMÜLASYON",

  faq_title: "Astra Mining FAQ",
  faq_body:
    "<p><strong>Astra Mining nedir?</strong><br>Frontend üzerinde çalışan bir mining/idle-game simülasyonudur.</p>" +
    "<p><strong>Bakiyeler gerçek mi?</strong><br>Hayır. Tüm ekonomi yalnızca tarayıcıdaki demo verileriyle çalışır.</p>" +
    "<p><strong>Veriler nerede tutuluyor?</strong><br>localStorage içinde tutulur.</p>" +
    "<p><strong>Telegram bot gerekli mi?</strong><br>Hayır. Telegram entegrasyonu mevcutsa yalnızca yardımcı özellikler kullanılır.</p>",

  support_title: "Destek",
  support_body:
    "<p>Bu GitHub sürümü tamamen frontend simülasyonudur.</p>" +
    "<p>Gerçek ödeme, cüzdan, blockchain veya kullanıcı hesabı sistemi içermez.</p>",

  account_title: "Hesap Bilgileri",

  referral_title: "Referans Programı",
  referral_body:
    "<p><strong>Seviye 1:</strong> %15</p>" +
    "<p><strong>Seviye 2:</strong> %7</p>" +
    "<p><strong>Seviye 3:</strong> %2</p>" +
    "<p>Yeni kayıt için +200 Güç, ilk yatırım yapan referans için +2500 Güç simüle edilir.</p>",

  history_title: "İşlem Geçmişi",

  sell_title: "Token Satışı",
  sell_body:
    "Simülasyon kuru: <strong>1 Token = $0.025</strong>",

  sell_amount: "Satılacak token",
  cancel: "Vazgeç",
  confirm: "Onayla",

  upgrade_confirm_title: "Güç Yükseltmesini Onayla",
  upgrade_confirm_body:
    "Bu yalnızca demo bakiyeniz üzerinde çalışan bir simülasyondur.",

  withdraw_title: "Çekim Simülasyonu",
  withdraw_body:
    "Bu işlem gerçek para transferi yapmaz. Yalnızca demo işlem kaydı oluşturur.",
  withdraw_amount: "Çekilecek USD",
  withdraw_success: "Demo çekim talebi oluşturuldu.",

  crypto_title: "Ağ Detayları",

  chat_title: "Astra Agent",
  chat_body:
    "NOVA çekirdeği aktif. Agent sohbet modülü şu anda lokal simülasyon olarak çalışıyor.",

  reset_title: "Demo Verilerini Sıfırla",
  reset_body:
    "Tüm token, güç, bakiye, görev, referans ve işlem geçmişi silinecek.",
  reset_success: "Demo verileri sıfırlandı.",

  level_up: "Yeni rank açıldı:",
  agent_unlocked: "Yeni agent kullanılabilir:",
};

const EN = {
  simulation: "SIM",
  command_center: "COMMAND CENTER",
  online: "ONLINE",
  efficiency: "EFFICIENCY",
  active_core: "ACTIVE CORE",
  mining_cycle: "MINING CYCLE",
  production_running: "Production running",
  production_complete: "Cycle complete",
  restart_cycle: "Restart Cycle",

  token: "Token",
  power: "Power",
  sell: "Sell Token",
  upgrade: "Upgrade",

  ai_agent: "Your Astra Agent",
  agent_visual_only: "Visual core upgrade",
  chat: "Chat",

  ref_quick: "Invite 1 friend",
  day_streak: "day streak",
  rank_label: "Rank",
  system_status: "SYSTEM STATUS",

  earn_title: "Earn",
  tab_invite: "Invite",
  tab_bonuses: "Bonuses",

  your_link: "Your referral link",
  share_btn: "Invite a Friend",
  simulate_ref: "Add demo friend",
  referral_levels: "REFERRAL LEVELS",
  level: "Level",

  no_refs: "No referrals on this level yet.",
  demo_ref_created: "Demo friend added.",
  referral_bonus: "Referral reward",

  bonus_head: "Earn per referral",
  level1_comm: "from level 1 spending",
  level2_comm: "from level 2 spending",
  level3_comm: "from level 3 spending",

  registration_reward: "Registration reward",
  registration_reward_desc: "Each new registration",
  deposit_reward: "First deposit",
  deposit_reward_desc: "Referral making first deposit",

  upgrade_title: "Power Shop",
  sim_balance: "Simulation balance",
  choose_usd: "Choose USD amount",
  upgrade_preview: "INVESTMENT PREVIEW",

  get_power: "Power you get",
  first_bonus: "First deposit bonus",
  total_power: "Total power",
  daily_tok: "Daily tokens",
  daily_profit: "Efficiency",

  first_purchase_bonus: "For the first simulation deposit",
  buy_power: "Buy Power",
  power_stays: "* Purchased power stays permanently",

  unlock_head: "Unlock a new agent",
  unlock_note:
    "Agents are visual upgrades and do not affect mining speed.",

  tasks_title: "Tasks",
  tab_ref: "Referral",
  tab_follow: "Follow",
  tab_other: "Other",

  follow_channel: "Follow Telegram community",
  follow_x: "Visit X / Twitter profile",
  daily_checkin: "Daily check-in",

  deposit5: "Load balance: $5",
  reinvest5: "Reinvest: $5",

  claim: "Claim",
  simulate: "Simulate",
  done: "Done",
  locked: "Locked",

  mini_game_title: "⚡ Tap Energy!",
  mini_game_sub:
    "Tap the cores in 10 seconds to earn tokens.",
  start_game: "Start Game",

  pay_title: "Payment",
  reinvest_head: "Reinvest +5%",
  reinvest_sub: "0% simulation fee",
  available_usd: "Available USD",
  token_value: "Token value",
  networks: "NETWORKS",

  network_bnb: "Network: BNB",
  network_trx: "Network: TRX",
  network_ton: "Network: TON",
  network_usdt: "Network: BEP20",

  tx_history: "Transaction history",
  withdraw: "Simulated Withdrawal",

  simulation_warning:
    "This screen is simulation-only. No real blockchain transaction, payment, transfer or investment is performed.",

  nav_upgrade: "Upgrade",
  nav_earn: "Earn",
  nav_ai: "AI",
  nav_tasks: "Tasks",
  nav_pay: "Payment",

  settings_title: "Settings",
  faq: "FAQ",
  support: "Support",
  account: "Account info",
  ref_prog: "Referral program",

  reset_demo: "Reset demo data",
  local_storage_note:
    "Data is stored only in this browser's localStorage.",

  copied: "Link copied ✓",
  sold: "Token sale simulated.",
  upgraded: "Power upgrade simulated.",
  not_enough_token: "Not enough tokens.",
  not_enough_usd: "Not enough USD balance.",

  task_done: "Task completed!",
  checkin_done: "Daily check-in done! +100 Power 🔥",
  already_checkin: "Already checked in today.",

  game_end: "Game over!",
  game_limit: "Your daily mini-game limit has been reached.",

  cycle_complete: "Mining cycle complete.",
  cycle_restarted: "New mining cycle started.",

  welcome:
    "Astra Core online. All systems are running in simulation mode.",

  no_transactions: "No transactions yet.",
  simulation_only: "SIMULATION ONLY",

  faq_title: "Astra Mining FAQ",
  faq_body:
    "<p><strong>What is Astra Mining?</strong><br>It is a frontend-based mining/idle-game simulation.</p>" +
    "<p><strong>Are balances real?</strong><br>No. All economy values are demo data.</p>" +
    "<p><strong>Where is data stored?</strong><br>Inside localStorage.</p>" +
    "<p><strong>Is the Telegram bot required?</strong><br>No. Telegram is only used as an optional enhancement when available.</p>",

  support_title: "Support",
  support_body:
    "<p>This GitHub build is a frontend-only simulation.</p>" +
    "<p>It contains no real payment, wallet, blockchain or account system.</p>",

  account_title: "Account Info",

  referral_title: "Referral Program",
  referral_body:
    "<p><strong>Level 1:</strong> 15%</p>" +
    "<p><strong>Level 2:</strong> 7%</p>" +
    "<p><strong>Level 3:</strong> 2%</p>" +
    "<p>New registration simulates +200 Power and a first deposit simulates +2500 Power.</p>",

  history_title: "Transaction History",

  sell_title: "Sell Tokens",
  sell_body:
    "Simulation rate: <strong>1 Token = $0.025</strong>",

  sell_amount: "Tokens to sell",
  cancel: "Cancel",
  confirm: "Confirm",

  upgrade_confirm_title: "Confirm Power Upgrade",
  upgrade_confirm_body:
    "This action only affects your local simulation balance.",

  withdraw_title: "Simulated Withdrawal",
  withdraw_body:
    "No real transfer will happen. A demo transaction record will only be created.",
  withdraw_amount: "USD to withdraw",
  withdraw_success: "Demo withdrawal request created.",

  crypto_title: "Network Details",

  chat_title: "Astra Agent",
  chat_body:
    "NOVA core active. The agent chat module currently operates as a local simulation.",

  reset_title: "Reset Demo Data",
  reset_body:
    "All tokens, power, balance, tasks, referrals and transaction history will be erased.",
  reset_success: "Demo data reset.",

  level_up: "New rank unlocked:",
  agent_unlocked: "New agent available:",
};

/* ============================================================
   TRANSLATION HELPERS
   ============================================================ */

const getLang = () => state.lang === "en" ? EN : TR;

const t = (key) => {
  const dictionary = getLang();
  return dictionary[key] || key;
};

/* ============================================================
   DEFAULT STATE
   ============================================================ */

function generateGuestId() {
  return (
    "guest_" +
    Math.random()
      .toString(36)
      .slice(2, 10)
  );
}

function buildDefaultState() {
  return {
    version: 3,

    userId: generateGuestId(),

    username: "Gezgin",

    lang: "tr",

    usd: 10,

    token: 0,

    power: 2110,

    totalEarnedToken: 0,

    totalSoldToken: 0,

    totalUpgradeSpend: 0,

    upgradeCount: 0,

    firstUpgradeDone: false,

    miningStartedAt: null,

    miningLastUpdate: null,

    miningActive: true,

    streakCount: 0,

    lastCheckin: null,

    refCount: 0,

    referrals: [],

    completedTasks: [],

    transactions: [],

    agentIndex: 0,

    selectedReferralLevel: 1,

    dailyGameDate: null,

    dailyGamePlays: 0,

    settings: {
      notifications: true,
    },
  };
}

/* ============================================================
   STATE
   ============================================================ */

let state = loadState();

function loadState() {
  const defaults = buildDefaultState();

  try {
    const stored = localStorage.getItem(CONFIG.storageKey);

    if (!stored) {
      return defaults;
    }

    const parsed = JSON.parse(stored);

    const merged = {
      ...defaults,
      ...parsed,

      settings: {
        ...defaults.settings,
        ...(parsed.settings || {}),
      },
    };

    return normalizeState(merged);
  } catch (error) {
    console.warn("State restore failed:", error);

    return defaults;
  }
}

function normalizeState(data) {
  const safeNumber = (value, fallback) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  data.usd = safeNumber(data.usd, 10);
  data.token = safeNumber(data.token, 0);
  data.power = safeNumber(data.power, 2110);

  data.totalEarnedToken = safeNumber(
    data.totalEarnedToken,
    0
  );

  data.totalSoldToken = safeNumber(
    data.totalSoldToken,
    0
  );

  data.totalUpgradeSpend = safeNumber(
    data.totalUpgradeSpend,
    0
  );

  data.upgradeCount = Math.max(
    0,
    Math.floor(
      safeNumber(data.upgradeCount, 0)
    )
  );

  data.firstUpgradeDone = Boolean(
    data.firstUpgradeDone
  );

  data.streakCount = Math.max(
    0,
    Math.floor(
      safeNumber(data.streakCount, 0)
    )
  );

  data.refCount = Math.max(
    0,
    Math.floor(
      safeNumber(data.refCount, 0)
    )
  );

  data.agentIndex = Math.max(
    0,
    Math.floor(
      safeNumber(data.agentIndex, 0)
    )
  );

  data.selectedReferralLevel = [1, 2, 3].includes(
    Number(data.selectedReferralLevel)
  )
    ? Number(data.selectedReferralLevel)
    : 1;

  data.referrals = Array.isArray(data.referrals)
    ? data.referrals
    : [];

  data.completedTasks = Array.isArray(
    data.completedTasks
  )
    ? data.completedTasks
    : [];

  data.transactions = Array.isArray(
    data.transactions
  )
    ? data.transactions
    : [];

  if (!data.settings || typeof data.settings !== "object") {
    data.settings = {
      notifications: true,
    };
  }

  data.settings.notifications =
    data.settings.notifications !== false;

  return data;
}

function saveState() {
  try {
    localStorage.setItem(
      CONFIG.storageKey,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error(
      "LocalStorage save failed:",
      error
    );
  }
}

/* ============================================================
   DOM HELPERS
   ============================================================ */

const $ = (id) =>
  document.getElementById(id);

const $$ = (selector, context = document) =>
  Array.from(
    context.querySelectorAll(selector)
  );

/* ============================================================
   NUMBER / DATE FORMATTERS
   ============================================================ */

function formatUsd(value) {
  const locale =
    state.lang === "tr"
      ? "tr-TR"
      : "en-US";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(
    Math.max(0, Number(value) || 0)
  );
}

function formatToken(value) {
  return Number(value || 0).toLocaleString(
    state.lang === "tr"
      ? "tr-TR"
      : "en-US",
    {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }
  );
}

function formatCompact(value) {
  const n = Number(value) || 0;

  if (n >= 1_000_000_000) {
    return (
      (n / 1_000_000_000).toFixed(1) +
      "B"
    );
  }

  if (n >= 1_000_000) {
    return (
      (n / 1_000_000).toFixed(1) +
      "M"
    );
  }

  if (n >= 1000) {
    return Math.round(n)
      .toLocaleString(
        state.lang === "tr"
          ? "tr-TR"
          : "en-US"
      )
      .replace(/\./g, " ");
  }

  return Math.round(n).toString();
}

function formatDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString(
    state.lang === "tr"
      ? "tr-TR"
      : "en-US",
    {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function todayKey() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

function yesterdayKey() {
  const date = new Date();

  date.setDate(
    date.getDate() - 1
  );

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

/* ============================================================
   RANK
   ============================================================ */

function getRank(power) {
  let current = RANKS[0];

  for (const rank of RANKS) {
    if (power >= rank.minPower) {
      current = rank;
    }
  }

  return current;
}

function getRankName(rank) {
  return state.lang === "tr"
    ? rank.nameTr
    : rank.nameEn;
}

/* ============================================================
   MINING ECONOMY
   ============================================================ */

function getTokensPerDay(power = state.power) {
  return (
    power *
    (CONFIG.tokensPer10kPerDay / 10000)
  );
}

function getTokensPerSecond(power = state.power) {
  return (
    getTokensPerDay(power) /
    86400
  );
}

function getTokenValueUsd() {
  return (
    state.token *
    CONFIG.tokenPriceUsd
  );
}

/**
 * Timestamp-driven mining.
 * No 1-second accumulated drift.
 * Offline time is handled when the app is opened again.
 */
function syncMining() {
  const now = Date.now();

  if (!state.miningStartedAt) {
    state.miningStartedAt = now;
    state.miningLastUpdate = now;
    state.miningActive = true;

    saveState();

    return;
  }

  if (!state.miningActive) {
    return;
  }

  const start = Number(
    state.miningStartedAt
  );

  const cycleEnd =
    start + CONFIG.cycleMs;

  const previous = Number(
    state.miningLastUpdate || start
  );

  const effectiveNow = Math.min(
    now,
    cycleEnd
  );

  const elapsedMs =
    effectiveNow - previous;

  if (elapsedMs > 0) {
    const earned =
      elapsedMs *
      getTokensPerSecond() /
      1000;

    state.token += earned;
    state.totalEarnedToken += earned;
  }

  state.miningLastUpdate =
    effectiveNow;

  if (now >= cycleEnd) {
    state.miningActive = false;
  }
}

/* ============================================================
   MINING CYCLE
   ============================================================ */

function startMiningCycle() {
  const now = Date.now();

  state.miningStartedAt = now;
  state.miningLastUpdate = now;
  state.miningActive = true;

  saveState();

  updateUI();

  showToast(
    t("cycle_restarted")
  );
}

/* ============================================================
   REFERRAL LINK
   ============================================================ */

function getReferralLink() {
  const base =
    window.location.origin +
    window.location.pathname;

  return (
    `${base}?ref=${encodeURIComponent(
      state.userId
    )}`
  );
}

/* ============================================================
   TRANSACTIONS
   ============================================================ */

function addTransaction({
  type,
  amount,
  label,
  meta = "",
}) {
  state.transactions.unshift({
    id:
      "tx_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .slice(2, 7),

    type,

    amount,

    label,

    meta,

    createdAt: Date.now(),
  });

  state.transactions =
    state.transactions.slice(0, 60);
}

/* ============================================================
   TASK DEFINITIONS
   ============================================================ */

function getTaskDefinitions() {
  return [
    {
      id: "ref-1",
      category: "ref",
      icon: "◎",
      titleTr: "1 arkadaş davet et",
      titleEn: "Invite 1 friend",
      reward: 200,
      goal: 1,
    },

    {
      id: "ref-3",
      category: "ref",
      icon: "◎",
      titleTr: "3 arkadaş davet et",
      titleEn: "Invite 3 friends",
      reward: 500,
      goal: 3,
    },

    {
      id: "ref-7",
      category: "ref",
      icon: "◎",
      titleTr: "7 arkadaş davet et",
      titleEn: "Invite 7 friends",
      reward: 1500,
      goal: 7,
    },

    {
      id: "ref-15",
      category: "ref",
      icon: "◎",
      titleTr: "15 arkadaş davet et",
      titleEn: "Invite 15 friends",
      reward: 2500,
      goal: 15,
    },

    {
      id: "ref-30",
      category: "ref",
      icon: "◎",
      titleTr: "30 arkadaş davet et",
      titleEn: "Invite 30 friends",
      reward: 4000,
      goal: 30,
    },

    {
      id: "ref-50",
      category: "ref",
      icon: "◎",
      titleTr: "50 arkadaş davet et",
      titleEn: "Invite 50 friends",
      reward: 6000,
      goal: 50,
    },

    {
      id: "follow-tg",
      category: "follow",
      icon: "✦",
      titleTr: "Telegram topluluğunu takip et",
      titleEn: "Follow Telegram community",
      reward: 300,
      simulation: true,
    },

    {
      id: "follow-x",
      category: "follow",
      icon: "✦",
      titleTr: "X / Twitter profilini ziyaret et",
      titleEn: "Visit X / Twitter profile",
      reward: 300,
      simulation: true,
    },

    {
      id: "daily",
      category: "follow",
      icon: "🔥",
      titleTr: "Günlük giriş yap",
      titleEn: "Daily check-in",
      reward: CONFIG.dailyCheckinReward,
      daily: true,
    },

    {
      id: "deposit5",
      category: "other",
      icon: "◈",
      titleTr: "Bakiye yükle: $5",
      titleEn: "Load balance: $5",
      reward: 10000,
      prerequisite: "deposit",
    },

    {
      id: "reinvest5",
      category: "other",
      icon: "⚡",
      titleTr: "Yeniden yatırım yap: $5",
      titleEn: "Reinvest: $5",
      reward: 10000,
      prerequisite: "reinvest",
    },
  ];
}

/* ============================================================
   TASK STATE
   ============================================================ */

function isTaskCompleted(taskId) {
  return state.completedTasks.includes(
    taskId
  );
}

function isTaskAvailable(task) {
  if (task.category === "ref") {
    return state.refCount >= task.goal;
  }

  if (task.id === "deposit5") {
    return state.totalUpgradeSpend >= 5;
  }

  if (task.id === "reinvest5") {
    return (
      state.upgradeCount >= 2 &&
      state.totalUpgradeSpend >= 5
    );
  }

  if (task.daily) {
    return true;
  }

  return Boolean(task.simulation);
}

/* ============================================================
   TASK CLAIM
   ============================================================ */

function claimTask(taskId) {
  const task =
    getTaskDefinitions().find(
      item => item.id === taskId
    );

  if (!task) return;

  if (isTaskCompleted(taskId)) {
    return;
  }

  if (task.daily) {
    performDailyCheckin();
    return;
  }

  if (!isTaskAvailable(task)) {
    showToast(
      state.lang === "tr"
        ? "Bu görev henüz hazır değil."
        : "This task is not ready yet."
    );

    return;
  }

  state.completedTasks.push(
    taskId
  );

  state.power += task.reward;

  addTransaction({
    type: "reward",
    amount: task.reward,
    label: t("task_done"),
    meta: taskId,
  });

  saveState();
  updateUI();

  showToast(
    `${t("task_done")} +${formatCompact(
      task.reward
    )} ${t("power")}`
  );
}

/* ============================================================
   DAILY CHECK-IN
   ============================================================ */

function performDailyCheckin() {
  const today = todayKey();

  if (state.lastCheckin === today) {
    showToast(
      t("already_checkin")
    );

    return;
  }

  if (
    state.lastCheckin ===
    yesterdayKey()
  ) {
    state.streakCount += 1;
  } else {
    state.streakCount = 1;
  }

  state.lastCheckin = today;

  state.power +=
    CONFIG.dailyCheckinReward;

  addTransaction({
    type: "reward",
    amount: CONFIG.dailyCheckinReward,
    label: t("daily_checkin"),
    meta: `streak:${state.streakCount}`,
  });

  if (!isTaskCompleted("daily")) {
    state.completedTasks.push("daily");
  }

  saveState();
  updateUI();

  showToast(
    t("checkin_done")
  );
}

/* ============================================================
   REFERRAL SIMULATION
   ============================================================ */

const DEMO_NAMES = [
  "NovaPilot",
  "QuantumFox",
  "LunarNode",
  "AstraCore",
  "OrbitX",
  "VoidRunner",
  "Nebula_7",
  "StellarOne",
  "PulseGrid",
  "CosmoByte",
];

function createDemoReferral() {
  const index =
    Math.floor(
      Math.random() *
      DEMO_NAMES.length
    );

  const username =
    DEMO_NAMES[index] +
    "_" +
    Math.floor(
      100 + Math.random() * 900
    );

  const level =
    state.refCount % 3 === 0
      ? 1
      : 2;

  const referral = {
    id:
      "ref_" +
      Date.now(),

    username,

    level,

    joinedAt: Date.now(),
  };

  state.referrals.push(
    referral
  );

  state.refCount += 1;

  state.power += 200;

  addTransaction({
    type: "referral",
    amount: 200,
    label: t("referral_bonus"),
    meta: username,
  });

  saveState();
  updateUI();

  showToast(
    `${t("demo_ref_created")} +200 ${t("power")}`
  );
}

/* ============================================================
   UPGRADE PREVIEW
   ============================================================ */

let upgradeAmt = 3;

function updateUpgradePreview() {
  const cost =
    Math.max(
      CONFIG.minUpgradeUsd,
      Math.min(
        CONFIG.maxUpgradeUsd,
        upgradeAmt
      )
    );

  const basePower =
    cost *
    CONFIG.powerPerUsd;

  const bonus =
    !state.firstUpgradeDone
      ? Math.round(
          basePower *
          CONFIG.firstPurchaseBonus
        )
      : 0;

  const total =
    basePower + bonus;

  const projectedPower =
    state.power + total;

  const dailyTokens =
    getTokensPerDay(
      projectedPower
    );

  if ($("amt-val")) {
    $("amt-val").textContent =
      cost.toString();
  }

  if ($("up-power")) {
    $("up-power").textContent =
      formatCompact(basePower);
  }

  if ($("up-bonus")) {
    $("up-bonus").textContent =
      "+" + formatCompact(bonus);
  }

  if ($("up-total")) {
    $("up-total").textContent =
      formatCompact(total);
  }

  if ($("up-tok")) {
    $("up-tok").textContent =
      `${formatCompact(dailyTokens)} / ${
        state.lang === "tr"
          ? "gün"
          : "day"
      }`;
  }

  if ($("upgrade-wallet")) {
    $("upgrade-wallet").textContent =
      formatUsd(state.usd);
  }

  $$(".preset").forEach(button => {
    button.classList.toggle(
      "active",
      Number(
        button.dataset.amount
      ) === cost
    );
  });
}

/* ============================================================
   BUY POWER
   ============================================================ */

function buyPower() {
  syncMining();

  const cost =
    Math.max(
      CONFIG.minUpgradeUsd,
      Math.min(
        CONFIG.maxUpgradeUsd,
        upgradeAmt
      )
    );

  if (state.usd < cost) {
    showToast(
      t("not_enough_usd")
    );

    return;
  }

  const basePower =
    cost *
    CONFIG.powerPerUsd;

  const bonus =
    !state.firstUpgradeDone
      ? Math.round(
          basePower *
          CONFIG.firstPurchaseBonus
        )
      : 0;

  const totalPower =
    basePower + bonus;

  openModal({
    title: t(
      "upgrade_confirm_title"
    ),

    body:
      `<p>${t(
        "upgrade_confirm_body"
      )}</p>` +

      `<div class="modal-summary">` +
      `<p><span>USD</span><strong>$${formatUsd(cost)}</strong></p>` +
      `<p><span>${t("get_power")}</span><strong class="green">+${formatCompact(basePower)}</strong></p>` +
      `<p><span>${t("first_bonus")}</span><strong class="green">+${formatCompact(bonus)}</strong></p>` +
      `<p><span>${t("total_power")}</span><strong>+${formatCompact(totalPower)}</strong></p>` +
      `</div>`,

    actions: [
      {
        label: t("cancel"),
        className: "secondary",
        onClick: closeModal,
      },

      {
        label: t("confirm"),
        className: "primary",
        onClick: () => {
          closeModal();

          applyPowerPurchase(
            cost,
            totalPower,
            bonus
          );
        },
      },
    ],
  });
}

function applyPowerPurchase(
  cost,
  totalPower,
  bonus
) {
  syncMining();

  state.usd -= cost;

  state.power += totalPower;

  state.totalUpgradeSpend +=
    cost;

  state.upgradeCount += 1;

  if (!state.firstUpgradeDone) {
    state.firstUpgradeDone = true;
  }

  addTransaction({
    type: "upgrade",
    amount: -cost,
    label: t("upgraded"),
    meta:
      `power:+${totalPower}` +
      (bonus > 0
        ? ` bonus:+${bonus}`
        : ""),
  });

  saveState();
  updateUI();

  showToast(
    `${t("upgraded")} +${formatCompact(
      totalPower
    )} ${t("power")}`
  );
}

/* ============================================================
   TOKEN SALE
   ============================================================ */

function sellTokens() {
  syncMining();

  if (state.token <= 0.000001) {
    showToast(
      t("not_enough_token")
    );

    return;
  }

  const maxToken =
    Number(
      state.token.toFixed(4)
    );

  openModal({
    title: t("sell_title"),

    body:
      `<p>${t(
        "sell_body"
      )}</p>` +
      `<label class="eyebrow" for="sell-input">${t(
        "sell_amount"
      )}</label>` +
      `<input
        id="sell-input"
        class="modal-input"
        type="number"
        min="0.0001"
        max="${maxToken}"
        step="0.0001"
        value="${maxToken}"
      >`,

    actions: [
      {
        label: t("cancel"),
        className: "secondary",
        onClick: closeModal,
      },

      {
        label: t("confirm"),
        className: "primary",
        onClick: () => {
          const input =
            $("sell-input");

          const amount =
            Number(
              input?.value || 0
            );

          if (
            !Number.isFinite(amount) ||
            amount <= 0
          ) {
            return;
          }

          if (amount > state.token) {
            showToast(
              t("not_enough_token")
            );

            return;
          }

          const usdValue =
            amount *
            CONFIG.tokenPriceUsd;

          state.token -= amount;

          state.usd += usdValue;

          state.totalSoldToken +=
            amount;

          addTransaction({
            type: "sale",
            amount: usdValue,
            label: t("sold"),
            meta:
              `${amount.toFixed(
                4
              )} TOKEN`,
          });

          saveState();
          closeModal();
          updateUI();

          showToast(
            `${t("sold")} +$${formatUsd(
              usdValue
            )}`
          );
        },
      },
    ],
  });
}

/* ============================================================
   AGENTS
   ============================================================ */

function isAgentUnlocked(index) {
  const agent =
    AGENTS[index];

  if (!agent) {
    return false;
  }

  return (
    state.power >=
    agent.requiredPower
  );
}

function getCurrentAgent() {
  return (
    AGENTS[
      state.agentIndex %
        AGENTS.length
    ] || AGENTS[0]
  );
}

function setAgent(index) {
  const target =
    AGENTS[index];

  if (!target) return;

  if (
    state.power <
    target.requiredPower
  ) {
    showToast(
      `${target.label}: ${t(
        "locked"
      )} — ${formatCompact(
        target.requiredPower
      )} ${t("power")}`
    );

    return;
  }

  state.agentIndex = index;

  saveState();
  updateUI();
}

/* ============================================================
   REFERRAL LIST
   ============================================================ */

function renderReferralList() {
  const container =
    $("ref-list");

  if (!container) return;

  const level =
    state.selectedReferralLevel;

  const referrals =
    state.referrals.filter(
      item => item.level === level
    );

  if (referrals.length === 0) {
    container.innerHTML =
      `<p class="empty-msg">${t(
        "no_refs"
      )}</p>`;

    return;
  }

  container.innerHTML =
    referrals
      .map(item => {
        const initial =
          escapeHtml(
            item.username
              .charAt(0)
              .toUpperCase()
          );

        return `
          <div class="ref-item">
            <div class="ref-avatar">
              ${initial}
            </div>

            <div class="ref-main">
              <strong>
                ${escapeHtml(
                  item.username
                )}
              </strong>

              <span>
                ${formatDate(
                  item.joinedAt
                )}
              </span>
            </div>

            <span class="ref-level">
              L${item.level}
            </span>
          </div>
        `;
      })
      .join("");
}

/* ============================================================
   TASK RENDERING
   ============================================================ */

function renderTasks() {
  const definitions =
    getTaskDefinitions();

  const buckets = {
    ref: [],
    follow: [],
    other: [],
  };

  definitions.forEach(task => {
    buckets[
      task.category
    ].push(task);
  });

  renderTaskBucket(
    "task-ref-list",
    buckets.ref
  );

  renderTaskBucket(
    "task-follow-list",
    buckets.follow
  );

  renderTaskBucket(
    "task-other-list",
    buckets.other
  );

  updateTaskProgress();
}

function renderTaskBucket(
  containerId,
  tasks
) {
  const container =
    $(containerId);

  if (!container) return;

  container.innerHTML =
    tasks
      .map(task => {
        const completed =
          isTaskCompleted(
            task.id
          );

        const available =
          isTaskAvailable(
            task
          );

        const title =
          state.lang === "tr"
            ? task.titleTr
            : task.titleEn;

        let buttonLabel =
          t("simulate");

        let buttonClass = "";

        if (completed) {
          buttonLabel = `✓ ${t(
            "done"
          )}`;

          buttonClass = "complete";
        } else if (
          task.daily
        ) {
          const checked =
            state.lastCheckin ===
            todayKey();

          if (checked) {
            buttonLabel = `✓ ${t(
              "done"
            )}`;

            buttonClass = "complete";
          } else {
            buttonLabel = t(
              "claim"
            );
          }
        } else if (
          task.category ===
          "ref"
        ) {
          buttonLabel = available
            ? t("claim")
            : `${Math.min(
                state.refCount,
                task.goal
              )}/${task.goal}`;
        } else if (
          !available &&
          task.prerequisite
        ) {
          buttonLabel = t(
            "locked"
          );
        }

        return `
          <div
            class="
              task-item
              ${completed ? "done" : ""}
              ${available && !completed ? "available" : ""}
            "
          >

            <div class="task-icon">
              ${task.icon}
            </div>

            <div class="task-main">

              <strong>
                ${escapeHtml(
                  title
                )}
              </strong>

              <span>
                +${formatCompact(
                  task.reward
                )} ${t("power")}
              </span>

            </div>

            <button
              class="
                task-action
                ${buttonClass}
              "
              type="button"
              data-task-id="${task.id}"
              ${completed ? "disabled" : ""}
            >
              ${buttonLabel}
            </button>

          </div>
        `;
      })
      .join("");
}

function updateTaskProgress() {
  const tasks =
    getTaskDefinitions();

  const completed =
    tasks.filter(
      task => {
        if (task.daily) {
          return (
            state.lastCheckin ===
            todayKey()
          );
        }

        return isTaskCompleted(
          task.id
        );
      }
    ).length;

  const percent =
    Math.round(
      (completed /
        tasks.length) *
        100
    );

  if ($("task-progress-value")) {
    $("task-progress-value").textContent =
      `${percent}%`;
  }

  const availableCount =
    tasks.filter(
      task =>
        !isTaskCompleted(
          task.id
        ) &&
        isTaskAvailable(
          task
        )
    ).length;

  const badge =
    $("task-nav-badge");

  if (badge) {
    if (availableCount > 0) {
      badge.classList.remove(
        "hidden"
      );

      badge.textContent =
        availableCount > 9
          ? "9+"
          : String(
              availableCount
            );
    } else {
      badge.classList.add(
        "hidden"
      );
    }
  }
}

/* ============================================================
   MINI GAME
   ============================================================ */

let gameRunning = false;
let gameScore = 0;
let gameCountdownTimer = null;
let gameSpawnTimer = null;

function getGameDailyPlays() {
  if (
    state.dailyGameDate !==
    todayKey()
  ) {
    state.dailyGameDate =
      todayKey();

    state.dailyGamePlays = 0;

    saveState();
  }

  return state.dailyGamePlays;
}

function updateGameCounter() {
  const count =
    getGameDailyPlays();

  if ($("game-daily-count")) {
    $("game-daily-count").textContent =
      `${count}/${
        CONFIG.gameMaxPlaysPerDay
      }`;
  }
}

function spawnOrb() {
  if (!gameRunning) {
    return;
  }

  const area =
    $("game-area");

  if (!area) return;

  const orb =
    document.createElement(
      "button"
    );

  orb.type = "button";

  orb.className =
    "game-orb";

  const x =
    Math.random() * 82 + 9;

  const y =
    Math.random() * 67 + 17;

  orb.style.left =
    `${x}%`;

  orb.style.top =
    `${y}%`;

  orb.setAttribute(
    "aria-label",
    "Energy core"
  );

  orb.addEventListener(
    "pointerdown",
    event => {
      event.preventDefault();

      if (!gameRunning) {
        return;
      }

      gameScore += 10;

      const scoreLabel =
        $("game-score-label");

      if (scoreLabel) {
        scoreLabel.textContent =
          `SCORE ${gameScore}`;
      }

      orb.remove();
    }
  );

  area.appendChild(orb);

  window.setTimeout(() => {
    orb.remove();
  }, CONFIG.gameOrbLifetimeMs);
}

function startMiniGame() {
  if (gameRunning) return;

  if (
    getGameDailyPlays() >=
    CONFIG.gameMaxPlaysPerDay
  ) {
    showToast(
      t("game_limit")
    );

    return;
  }

  gameRunning = true;
  gameScore = 0;

  const area =
    $("game-area");

  const result =
    $("game-result");

  const startButton =
    $("start-game-btn");

  if (!area || !result || !startButton) {
    return;
  }

  area.classList.remove(
    "hidden"
  );

  result.classList.add(
    "hidden"
  );

  startButton.disabled = true;

  area.innerHTML = `
    <span
      class="game-timer-label"
      id="game-timer-label"
    >
      ${CONFIG.gameDurationSeconds}
    </span>

    <span
      class="game-score-label"
      id="game-score-label"
    >
      SCORE 0
    </span>
  `;

  let countdown =
    CONFIG.gameDurationSeconds;

  gameSpawnTimer =
    window.setInterval(
      spawnOrb,
      CONFIG.gameSpawnMs
    );

  spawnOrb();

  gameCountdownTimer =
    window.setInterval(() => {
      countdown -= 1;

      const timer =
        $("game-timer-label");

      if (timer) {
        timer.textContent =
          String(
            Math.max(
              0,
              countdown
            )
          );
      }

      if (countdown <= 0) {
        endMiniGame();
      }
    }, 1000);
}

function endMiniGame() {
  if (!gameRunning) {
    return;
  }

  gameRunning = false;

  if (gameSpawnTimer) {
    clearInterval(
      gameSpawnTimer
    );

    gameSpawnTimer = null;
  }

  if (gameCountdownTimer) {
    clearInterval(
      gameCountdownTimer
    );

    gameCountdownTimer = null;
  }

  const area =
    $("game-area");

  const result =
    $("game-result");

  const startButton =
    $("start-game-btn");

  if (area) {
    area.classList.add(
      "hidden"
    );
  }

  if (startButton) {
    startButton.disabled = false;
  }

  const reward =
    gameScore *
    CONFIG.gameRewardPerPoint;

  state.token += reward;

  state.totalEarnedToken +=
    reward;

  state.dailyGameDate =
    todayKey();

  state.dailyGamePlays += 1;

  addTransaction({
    type: "game",
    amount: reward,
    label: t("game_end"),
    meta: `score:${gameScore}`,
  });

  if (result) {
    result.classList.remove(
      "hidden"
    );

    result.textContent =
      `${t(
        "game_end"
      )} +${reward.toFixed(
        2
      )} Token`;
  }

  saveState();
  updateUI();
}

/* ============================================================
   NAVIGATION
   ============================================================ */

function goScreen(name) {
  const target =
    $(`screen-${name}`);

  if (!target) {
    return;
  }

  $$(".screen").forEach(
    screen => {
      screen.classList.remove(
        "active"
      );
    }
  );

  $$(".nav-btn").forEach(
    button => {
      button.classList.remove(
        "active"
      );
    }
  );

  target.classList.add(
    "active"
  );

  const button =
    document.querySelector(
      `.nav-btn[data-screen="${name}"]`
    );

  if (button) {
    button.classList.add(
      "active"
    );
  }
}

/* ============================================================
   TABS
   ============================================================ */

function setupTabs() {
  $$(".tab").forEach(button => {
    button.addEventListener(
      "click",
      () => {
        const switcher =
          button.closest(
            ".tab-switch"
          );

        if (!switcher) {
          return;
        }

        const screen =
          button.closest(
            ".screen"
          );

        if (!screen) {
          return;
        }

        $$(".tab", switcher).forEach(
          item => {
            item.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        const targetId =
          `tab-${button.dataset.tab}`;

        $$(".tab-pane", screen).forEach(
          pane => {
            pane.classList.toggle(
              "hidden",
              pane.id !== targetId
            );

            pane.classList.toggle(
              "active",
              pane.id === targetId
            );
          }
        );
      }
    );
  });

  $$(".lvl-tab").forEach(button => {
    button.addEventListener(
      "click",
      () => {
        state.selectedReferralLevel =
          Number(
            button.dataset.level
          );

        $$(".lvl-tab").forEach(
          item => {
            item.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        saveState();
        renderReferralList();
      }
    );
  });
}

/* ============================================================
   LANGUAGE
   ============================================================ */

function applyTranslations() {
  $$("[data-t]").forEach(
    element => {
      const key =
        element.dataset.t;

      element.textContent =
        t(key);
    }
  );
}

function setLanguage(lang) {
  if (!["tr", "en"].includes(lang)) {
    return;
  }

  state.lang = lang;

  document.documentElement.lang =
    lang === "tr"
      ? "tr"
      : "en";

  const flag =
    $("lang-flag");

  if (flag) {
    flag.textContent =
      lang === "tr"
        ? "🇹🇷"
        : "🇺🇸";
  }

  $("lang-panel")?.classList.add(
    "hidden"
  );

  saveState();
  updateUI();
}

/* ============================================================
   TOAST
   ============================================================ */

let toastTimer = null;

function showToast(message) {
  const toast =
    $("toast");

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.remove(
    "hidden"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    window.setTimeout(() => {
      toast.classList.add(
        "hidden"
      );
    }, 2500);
}

/* ============================================================
   MODAL
   ============================================================ */

function openModal({
  title,
  body,
  eyebrow = "ASTRA CORE",
  actions = [],
}) {
  const overlay =
    $("modal-overlay");

  const titleElement =
    $("modal-title");

  const eyebrowElement =
    $("modal-eyebrow");

  const bodyElement =
    $("modal-body");

  const actionsElement =
    $("modal-actions");

  if (
    !overlay ||
    !titleElement ||
    !bodyElement ||
    !actionsElement
  ) {
    return;
  }

  titleElement.textContent =
    title;

  if (eyebrowElement) {
    eyebrowElement.textContent =
      eyebrow;
  }

  bodyElement.innerHTML =
    body || "";

  actionsElement.innerHTML = "";

  if (actions.length === 1) {
    actionsElement.classList.add(
      "single"
    );
  } else {
    actionsElement.classList.remove(
      "single"
    );
  }

  actions.forEach(
    action => {
      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        `modal-btn ${
          action.className ||
          "secondary"
        }`;

      button.textContent =
        action.label;

      button.addEventListener(
        "click",
        () => {
          if (
            typeof action.onClick ===
            "function"
          ) {
            action.onClick();
          }
        }
      );

      actionsElement.appendChild(
        button
      );
    }
  );

  overlay.classList.remove(
    "hidden"
  );
}

function closeModal() {
  $("modal-overlay")?.classList.add(
    "hidden"
  );
}

/* ============================================================
   SETTINGS
   ============================================================ */

function openSettings() {
  $("settings-overlay")?.classList.remove(
    "hidden"
  );
}

function closeSettings() {
  $("settings-overlay")?.classList.add(
    "hidden"
  );
}

/* ============================================================
   SETTINGS MODALS
   ============================================================ */

function showFaq() {
  openModal({
    eyebrow: "ASTRA FAQ",
    title: t("faq_title"),
    body: t("faq_body"),
    actions: [
      {
        label: "OK",
        className: "primary",
        onClick: closeModal,
      },
    ],
  });
}

function showSupport() {
  openModal({
    eyebrow: "SUPPORT",
    title: t("support_title"),
    body: t("support_body"),
    actions: [
      {
        label: "OK",
        className: "primary",
        onClick: closeModal,
      },
    ],
  });
}

function showAccount() {
  const rank =
    getRank(state.power);

  openModal({
    eyebrow: "ACCOUNT CORE",
    title: t("account_title"),

    body: `
      <div class="modal-summary">

        <p>
          <span>ID</span>
          <strong class="mono">
            ${escapeHtml(
              state.userId
            )}
          </strong>
        </p>

        <p>
          <span>User</span>
          <strong>
            ${escapeHtml(
              state.username
            )}
          </strong>
        </p>

        <p>
          <span>Power</span>
          <strong>
            ${formatCompact(
              state.power
            )}
          </strong>
        </p>

        <p>
          <span>Rank</span>
          <strong>
            ${escapeHtml(
              getRankName(
                rank
              )
            )}
          </strong>
        </p>

        <p>
          <span>Agent</span>
          <strong>
            ${escapeHtml(
              getCurrentAgent()
                .label
            )}
          </strong>
        </p>

        <p>
          <span>Mode</span>
          <strong class="green">
            ${t(
              "simulation_only"
            )}
          </strong>
        </p>

      </div>
    `,

    actions: [
      {
        label: "OK",
        className: "primary",
        onClick: closeModal,
      },
    ],
  });
}

function showReferralProgram() {
  openModal({
    eyebrow: "REFERRAL CORE",
    title: t(
      "referral_title"
    ),
    body: t(
      "referral_body"
    ),
    actions: [
      {
        label: "OK",
        className: "primary",
        onClick: closeModal,
      },
    ],
  });
}

function showHistory() {
  if (
    state.transactions.length === 0
  ) {
    openModal({
      eyebrow: "LEDGER",
      title: t("history_title"),
      body: `<p>${t(
        "no_transactions"
      )}</p>`,
      actions: [
        {
          label: "OK",
          className: "primary",
          onClick: closeModal,
        },
      ],
    });

    return;
  }

  const rows =
    state.transactions
      .slice(0, 20)
      .map(tx => {
        const positive =
          tx.type === "reward" ||
          tx.type === "referral" ||
          tx.type === "game";

        const sign =
          tx.type === "upgrade"
            ? "-"
            : tx.type === "sale"
              ? "+"
              : positive
                ? "+"
                : "";

        return `
          <div class="history-row">

            <div>
              <strong>
                ${escapeHtml(
                  tx.label
                )}
              </strong>

              <span>
                ${formatDate(
                  tx.createdAt
                )}${tx.meta
                  ? ` · ${escapeHtml(
                      tx.meta
                    )}`
                  : ""}
              </span>
            </div>

            <b
              class="${
                positive || tx.type === "sale"
                  ? "green-text"
                  : "muted"
              }"
            >
              ${
                tx.type === "upgrade"
                  ? `-$${Math.abs(
                      Number(
                        tx.amount
                      )
                    ).toFixed(4)}`
                  : tx.type === "sale"
                    ? `+$${Number(
                        tx.amount
                      ).toFixed(4)}`
                    : `+${formatCompact(
                        tx.amount
                      )}`
              }
            </b>

          </div>
        `;
      })
      .join("");

  openModal({
    eyebrow: "LEDGER",
    title: t(
      "history_title"
    ),

    body: `
      <div class="history-list">
        ${rows}
      </div>
    `,

    actions: [
      {
        label: "OK",
        className: "primary",
        onClick: closeModal,
      },
    ],
  });
}

/* ============================================================
   WITHDRAW
   ============================================================ */

function simulateWithdrawal() {
  syncMining();

  if (state.usd < 1) {
    showToast(
      state.lang === "tr"
        ? "Çekim için minimum $1 gerekir."
        : "Minimum withdrawal is $1."
    );

    return;
  }

  openModal({
    eyebrow: "SIMULATION WALLET",
    title: t(
      "withdraw_title"
    ),

    body:
      `<p>${t(
        "withdraw_body"
      )}</p>` +
      `<label class="eyebrow" for="withdraw-input">${t(
        "withdraw_amount"
      )}</label>` +
      `<input
        id="withdraw-input"
        class="modal-input"
        type="number"
        min="1"
        max="${state.usd.toFixed(4)}"
        step="0.0001"
        value="${Math.min(
          1,
          state.usd
        ).toFixed(4)}"
      >`,

    actions: [
      {
        label: t("cancel"),
        className: "secondary",
        onClick: closeModal,
      },

      {
        label: t("confirm"),
        className: "danger",
        onClick: () => {
          const amount =
            Number(
              $("withdraw-input")
                ?.value || 0
            );

          if (
            !Number.isFinite(
              amount
            ) ||
            amount < 1
          ) {
            return;
          }

          if (
            amount >
            state.usd
          ) {
            showToast(
              t("not_enough_usd")
            );

            return;
          }

          state.usd -= amount;

          addTransaction({
            type: "withdraw",
            amount: -amount,
            label:
              t(
                "withdraw_success"
              ),
            meta:
              "SIM-PENDING",
          });

          saveState();
          closeModal();
          updateUI();

          showToast(
            t(
              "withdraw_success"
            )
          );
        },
      },
    ],
  });
}

/* ============================================================
   CRYPTO MODAL
   ============================================================ */

const CRYPTO_INFO = {
  BNB: {
    network: "BNB",
    address:
      "SIM_BNB_AST_RX7Q_9M4K",
  },

  TRX: {
    network: "TRX",
    address:
      "SIM_TRX_AST_8J2P_7N5L",
  },

  TON: {
    network: "TON",
    address:
      "SIM_TON_AST_4K9X_2Q7M",
  },

  USDT: {
    network: "BEP20",
    address:
      "SIM_USDT_BEP20_9A7K_X2M4",
  },
};

function showCryptoInfo(symbol) {
  const data =
    CRYPTO_INFO[
      symbol
    ];

  if (!data) return;

  openModal({
    eyebrow: "NETWORK",
    title:
      `${symbol} — ${t(
        "crypto_title"
      )}`,

    body: `
      <p>
        <strong>${t(
          "simulation_only"
        )}</strong>
      </p>

      <div class="modal-summary">

        <p>
          <span>Network</span>
          <strong>
            ${escapeHtml(
              data.network
            )}
          </strong>
        </p>

        <p>
          <span>Simulation address</span>
          <strong class="mono">
            ${escapeHtml(
              data.address
            )}
          </strong>
        </p>

      </div>

      <p class="muted">
        ${t(
          "simulation_warning"
        )}
      </p>
    `,

    actions: [
      {
        label: t("cancel"),
        className: "secondary",
        onClick: closeModal,
      },

      {
        label:
          state.lang === "tr"
            ? "Adresi Kopyala"
            : "Copy Address",
        className: "primary",
        onClick: async () => {
          await copyText(
            data.address
          );

          showToast(
            t("copied")
          );

          closeModal();
        },
      },
    ],
  });
}

/* ============================================================
   CHAT
   ============================================================ */

function showAgentChat() {
  const agent =
    getCurrentAgent();

  openModal({
    eyebrow:
      `${agent.label} CORE`,

    title: t(
      "chat_title"
    ),

    body:
      `<p>${t(
        "chat_body"
      )}</p>` +

      `<div class="modal-summary">` +
      `<p><span>Core</span><strong>${escapeHtml(
        agent.label
      )}</strong></p>` +
      `<p><span>Power</span><strong>${formatCompact(
        state.power
      )}</strong></p>` +
      `<p><span>Mining</span><strong class="green">${
        state.miningActive
          ? "ACTIVE"
          : "READY"
      }</strong></p>` +
      `</div>`,

    actions: [
      {
        label: "OK",
        className: "primary",
        onClick: closeModal,
      },
    ],
  });
}

/* ============================================================
   RESET
   ============================================================ */

function resetDemo() {
  openModal({
    eyebrow: "SYSTEM RESET",
    title: t(
      "reset_title"
    ),
    body: `<p>${t(
      "reset_body"
    )}</p>`,

    actions: [
      {
        label: t("cancel"),
        className: "secondary",
        onClick: closeModal,
      },

      {
        label: state.lang === "tr"
          ? "Sıfırla"
          : "Reset",
        className: "danger",
        onClick: () => {
          state =
            buildDefaultState();

          saveState();

          closeModal();
          closeSettings();

          updateUI();

          showToast(
            t("reset_success")
          );
        },
      },
    ],
  });
}

/* ============================================================
   COPY
   ============================================================ */

async function copyText(text) {
  try {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        text
      );

      return true;
    }
  } catch (error) {
    console.warn(
      "Clipboard API failed:",
      error
    );
  }

  try {
    const textarea =
      document.createElement(
        "textarea"
      );

    textarea.value = text;

    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    document.body.appendChild(
      textarea
    );

    textarea.select();

    const success =
      document.execCommand(
        "copy"
      );

    textarea.remove();

    return success;
  } catch {
    return false;
  }
}

/* ============================================================
   SHARE
   ============================================================ */

async function shareReferral() {
  const link =
    getReferralLink();

  const shareTitle =
    state.lang === "tr"
      ? "Astra Mining"
      : "Astra Mining";

  const shareText =
    state.lang === "tr"
      ? "Astra Mining simülasyonuna katıl."
      : "Join the Astra Mining simulation.";

  try {
    if (
      tg &&
      tg.openTelegramLink
    ) {
      const encoded =
        encodeURIComponent(
          `${shareText}\n${link}`
        );

      tg.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(
          link
        )}&text=${encodeURIComponent(
          shareText
        )}`
      );

      return;
    }

    if (
      navigator.share
    ) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: link,
      });

      return;
    }

    const copied =
      await copyText(
        link
      );

    if (copied) {
      showToast(
        t("copied")
      );
    }
  } catch (error) {
    console.warn(
      "Share cancelled/failed:",
      error
    );
  }
}

/* ============================================================
   UI UPDATE
   ============================================================ */

function updateMiningUI() {
  const now =
    Date.now();

  const start =
    Number(
      state.miningStartedAt ||
        now
    );

  const elapsed =
    Math.max(
      0,
      Math.min(
        CONFIG.cycleMs,
        now - start
      )
    );

  const remaining =
    Math.max(
      0,
      CONFIG.cycleMs -
        elapsed
    );

  const progress =
    Math.max(
      0,
      Math.min(
        100,
        (elapsed /
          CONFIG.cycleMs) *
          100
      )
    );

  const hours =
    Math.floor(
      remaining / 3600000
    );

  const minutes =
    Math.floor(
      (remaining % 3600000) /
        60000
    );

  const seconds =
    Math.floor(
      (remaining % 60000) /
        1000
    );

  const timer =
    $("timer-val");

  if (timer) {
    timer.textContent =
      [
        hours,
        minutes,
        seconds,
      ]
        .map(
          value =>
            String(
              value
            ).padStart(2, "0")
        )
        .join(":");
  }

  const progressBar =
    $("mining-progress");

  if (progressBar) {
    progressBar.style.width =
      `${progress}%`;
  }

  const status =
    $("timer-status");

  const caption =
    $("timer-caption");

  const claim =
    $("claim-mining-btn");

  if (state.miningActive) {
    if (status) {
      status.textContent =
        "ACTIVE";
    }

    if (caption) {
      caption.textContent =
        t(
          "production_running"
        );
    }

    if (claim) {
      claim.classList.add(
        "hidden"
      );
    }
  } else {
    if (status) {
      status.textContent =
        "READY";
    }

    if (caption) {
      caption.textContent =
        t(
          "production_complete"
        );
    }

    if (claim) {
      claim.classList.remove(
        "hidden"
      );
    }
  }
}

function updateUI() {
  syncMining();

  /* BALANCE */
  if ($("usd-val")) {
    $("usd-val").textContent =
      formatUsd(state.usd);
  }

  if ($("upgrade-wallet")) {
    $("upgrade-wallet").textContent =
      formatUsd(state.usd);
  }

  if ($("payment-usd")) {
    $("payment-usd").textContent =
      formatUsd(state.usd);
  }

  /* TOKEN */
  if ($("token-val")) {
    $("token-val").textContent =
      formatToken(
        state.token
      );
  }

  if ($("payment-token-value")) {
    $("payment-token-value").textContent =
      formatUsd(
        getTokenValueUsd()
      );
  }

  /* POWER */
  if ($("power-val")) {
    $("power-val").textContent =
      formatCompact(
        state.power
      );
  }

  /* TOKEN/DAY */
  if ($("token-per-day")) {
    $("token-per-day").textContent =
      `+${formatCompact(
        getTokensPerDay()
      )} / ${
        state.lang === "tr"
          ? "gün"
          : "day"
      }`;
  }

  /* QUICK REFERRAL */
  if ($("ref-quick-badge")) {
    $("ref-quick-badge").textContent =
      `${Math.min(
        state.refCount,
        1
      )}/1`;
  }

  /* STREAK */
  if ($("streak-count")) {
    $("streak-count").textContent =
      state.streakCount;
  }

  /* RANK */
  const rank =
    getRank(state.power);

  if ($("rank-name")) {
    $("rank-name").textContent =
      getRankName(rank);
  }

  if ($("power-rank-sub")) {
    $("power-rank-sub").textContent =
      getRankName(rank);
  }

  /* REF LINK */
  if ($("ref-link-text")) {
    $("ref-link-text").textContent =
      getReferralLink()
        .replace(
          /^https?:\/\//,
          ""
        );
  }

  /* AGENT */
  const agent =
    getCurrentAgent();

  const core =
    $("agent-core");

  if (core) {
    core.style.setProperty(
      "--agent-color",
      agent.color
    );
  }

  if ($("agent-glyph")) {
    $("agent-glyph").textContent =
      agent.glyph;
  }

  if ($("agent-rank-label")) {
    $("agent-rank-label").textContent =
      agent.label;
  }

  if ($("hud-core-value")) {
    $("hud-core-value").textContent =
      agent.label;
  }

  if ($("agent-status")) {
    $("agent-status").textContent =
      state.lang === "tr"
        ? "ACTIVE CORE"
        : "ACTIVE CORE";
  }

  if ($("agent-description")) {
    $("agent-description").textContent =
      state.lang === "tr"
        ? agent.descriptionTr
        : agent.descriptionEn;
  }

  if ($("hud-efficiency")) {
    $("hud-efficiency").textContent =
      "1.71%";
  }

  /* LANGUAGE */
  if ($("lang-flag")) {
    $("lang-flag").textContent =
      state.lang === "tr"
        ? "🇹🇷"
        : "🇺🇸";
  }

  document.documentElement.lang =
    state.lang === "tr"
      ? "tr"
      : "en";

  /* MINING */
  updateMiningUI();

  /* UPGRADE */
  updateUpgradePreview();

  /* REFERRALS */
  renderReferralList();

  /* TASKS */
  renderTasks();

  /* GAME */
  updateGameCounter();

  /* AGENTS */
  renderAgentUnlocks();

  /* TRANSLATIONS */
  applyTranslations();
}

/* ============================================================
   AGENT UNLOCK UI
   ============================================================ */

function renderAgentUnlocks() {
  const container =
    $("agent-unlock-grid");

  if (!container) {
    return;
  }

  container.innerHTML =
    AGENTS.map(
      (agent, index) => {
        const unlocked =
          isAgentUnlocked(
            index
          );

        const current =
          index ===
          state.agentIndex;

        const classes = [
          "unlock-node",
          unlocked
            ? "active"
            : "locked",
          current
            ? "current"
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        return `
          <button
            type="button"
            class="${classes}"
            data-agent-index="${index}"
          >

            <span class="node-icon">
              ${unlocked ? agent.glyph : "🔒"}
            </span>

            <strong>
              ${agent.label}
            </strong>

            <span>
              ${
                unlocked
                  ? state.lang === "tr"
                    ? "AÇIK"
                    : "OPEN"
                  : formatCompact(
                      agent.requiredPower
                    )
              }
            </span>

          </button>
        `;
      }
    ).join("");
}

/* ============================================================
   ESCAPE HTML
   ============================================================ */

function escapeHtml(value) {
  return String(
    value ?? ""
  )
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ============================================================
   STAR FIELD
   ============================================================ */

function generateStars() {
  const container =
    $("stars-bg");

  if (!container) {
    return;
  }

  const fragment =
    document.createDocumentFragment();

  const count =
    window.innerWidth < 500
      ? 90
      : 130;

  for (
    let i = 0;
    i < count;
    i++
  ) {
    const star =
      document.createElement(
        "span"
      );

    star.className =
      "star";

    if (
      Math.random() >
      0.84
    ) {
      star.classList.add(
        "large"
      );
    }

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.opacity =
      `${0.2 + Math.random() * 0.8}`;

    star.style.setProperty(
      "--twinkle-duration",
      `${2 + Math.random() * 5}s`
    );

    star.style.animationDelay =
      `${Math.random() * 5}s`;

    fragment.appendChild(
      star
    );
  }

  container.appendChild(
    fragment
  );
}

/* ============================================================
   EVENT SETUP
   ============================================================ */

function setupNavigation() {
  $$(".nav-btn").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          goScreen(
            button.dataset.screen
          );
        }
      );
    }
  );
}

function setupLanguage() {
  $("lang-btn")?.addEventListener(
    "click",
    event => {
      event.stopPropagation();

      $("lang-panel")?.classList.toggle(
        "hidden"
      );
    }
  );

  $$(".lang-opt").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          setLanguage(
            button.dataset.lang
          );
        }
      );
    }
  );

  document.addEventListener(
    "click",
    event => {
      const panel =
        $("lang-panel");

      const button =
        $("lang-btn");

      if (
        panel?.classList.contains(
          "hidden"
        )
      ) {
        return;
      }

      if (
        !panel.contains(
          event.target
        ) &&
        !button.contains(
          event.target
        )
      ) {
        panel.classList.add(
          "hidden"
        );
      }
    }
  );
}

function setupAgentControls() {
  $("agent-next-btn")?.addEventListener(
    "click",
    () => {
      const nextIndex =
        (state.agentIndex + 1) %
        AGENTS.length;

      setAgent(nextIndex);
    }
  );

  $("agent-core")?.addEventListener(
    "click",
    () => {
      const nextIndex =
        (state.agentIndex + 1) %
        AGENTS.length;

      setAgent(nextIndex);
    }
  );

  $("agent-unlock-grid")?.addEventListener(
    "click",
    event => {
      const button =
        event.target.closest(
          "[data-agent-index]"
        );

      if (!button) {
        return;
      }

      setAgent(
        Number(
          button.dataset.agentIndex
        )
      );
    }
  );
}

function setupHomeActions() {
  $("btn-sell")?.addEventListener(
    "click",
    sellTokens
  );

  $("btn-upgrade")?.addEventListener(
    "click",
    () => {
      goScreen("upgrade");
    }
  );

  $("chat-btn")?.addEventListener(
    "click",
    showAgentChat
  );

  $("claim-mining-btn")?.addEventListener(
    "click",
    startMiningCycle
  );
}

function setupReferralActions() {
  $("copy-ref-btn")?.addEventListener(
    "click",
    async () => {
      const success =
        await copyText(
          getReferralLink()
        );

      if (success) {
        showToast(
          t("copied")
        );
      }
    }
  );

  $("share-ref-btn")?.addEventListener(
    "click",
    shareReferral
  );

  $("simulate-ref-btn")?.addEventListener(
    "click",
    createDemoReferral
  );
}

function setupUpgradeActions() {
  $$(".amt-step").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          const delta =
            Number(
              button.dataset.delta
            );

          upgradeAmt = Math.max(
            CONFIG.minUpgradeUsd,
            Math.min(
              CONFIG.maxUpgradeUsd,
              upgradeAmt +
                delta
            )
          );

          updateUpgradePreview();
        }
      );
    }
  );

  $$(".preset").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          upgradeAmt = Math.max(
            CONFIG.minUpgradeUsd,
            Math.min(
              CONFIG.maxUpgradeUsd,
              Number(
                button.dataset.amount
              )
            )
          );

          updateUpgradePreview();
        }
      );
    }
  );

  $("buy-power-btn")?.addEventListener(
    "click",
    buyPower
  );
}

function setupTaskActions() {
  document.addEventListener(
    "click",
    event => {
      const button =
        event.target.closest(
          "[data-task-id]"
        );

      if (!button) {
        return;
      }

      const taskId =
        button.dataset.taskId;

      claimTask(taskId);
    }
  );

  $("daily-btn")?.addEventListener(
    "click",
    performDailyCheckin
  );

  $("start-game-btn")?.addEventListener(
    "click",
    startMiniGame
  );
}

function setupPaymentActions() {
  $$(".crypto-item").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          showCryptoInfo(
            button.dataset.crypto
          );
        }
      );
    }
  );

  $("withdraw-btn")?.addEventListener(
    "click",
    simulateWithdrawal
  );

  $("history-btn")?.addEventListener(
    "click",
    showHistory
  );
}

function setupSettingsActions() {
  $("settings-btn")?.addEventListener(
    "click",
    openSettings
  );

  $("settings-close")?.addEventListener(
    "click",
    closeSettings
  );

  $("settings-overlay")?.addEventListener(
    "click",
    event => {
      if (
        event.target.id ===
        "settings-overlay"
      ) {
        closeSettings();
      }
    }
  );

  $("menu-faq")?.addEventListener(
    "click",
    showFaq
  );

  $("menu-support")?.addEventListener(
    "click",
    showSupport
  );

  $("menu-account")?.addEventListener(
    "click",
    showAccount
  );

  $("menu-ref2")?.addEventListener(
    "click",
    showReferralProgram
  );

  $("menu-history")?.addEventListener(
    "click",
    showHistory
  );

  $("reset-demo-btn")?.addEventListener(
    "click",
    resetDemo
  );
}

function setupModalActions() {
  $("modal-close")?.addEventListener(
    "click",
    closeModal
  );

  $("modal-overlay")?.addEventListener(
    "click",
    event => {
      if (
        event.target.id ===
        "modal-overlay"
      ) {
        closeModal();
      }
    }
  );

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape"
      ) {
        closeModal();
        closeSettings();
      }
    }
  );
}

/* ============================================================
   STARTUP
   ============================================================ */

let lastAutoSave = 0;

function engineTick() {
  syncMining();

  updateMiningUI();

  const now =
    Date.now();

  if (
    now - lastAutoSave >
    30000
  ) {
    saveState();

    lastAutoSave = now;
  }

  /*
   * Only update lightweight dynamic data here.
   * Full UI refresh is not necessary every second.
   */
  if ($("token-val")) {
    $("token-val").textContent =
      formatToken(
        state.token
      );
  }

  if ($("usd-val")) {
    $("usd-val").textContent =
      formatUsd(state.usd);
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    generateStars();

    setupNavigation();
    setupLanguage();
    setupAgentControls();
    setupHomeActions();
    setupReferralActions();
    setupUpgradeActions();
    setupTaskActions();
    setupPaymentActions();
    setupSettingsActions();
    setupModalActions();
    setupTabs();

    updateUI();

    showToast(
      t("welcome")
    );

    window.setInterval(
      engineTick,
      1000
    );
  }
);

/* ============================================================
   VISIBILITY / PAGE LIFECYCLE
   ============================================================ */

document.addEventListener(
  "visibilitychange",
  () => {
    if (
      document.visibilityState ===
      "hidden"
    ) {
      syncMining();

      saveState();
    } else {
      syncMining();

      updateUI();
    }
  }
);

window.addEventListener(
  "beforeunload",
  () => {
    syncMining();

    saveState();
  }
);

/* ============================================================
   SAFETY FOR UNCLEAN GAME EXIT
   ============================================================ */

window.addEventListener(
  "pagehide",
  () => {
    if (gameRunning) {
      gameRunning = false;
    }

    if (gameSpawnTimer) {
      clearInterval(
        gameSpawnTimer
      );
    }

    if (gameCountdownTimer) {
      clearInterval(
        gameCountdownTimer
      );
    }

    syncMining();

    saveState();
  }
);
