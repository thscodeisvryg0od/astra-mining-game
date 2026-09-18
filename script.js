const gameState = {
    usdBalance: 0.0012,
    tokenCount: 49.5766,
    powerAmount: 2110,
    referralCount: 0,
    referralTarget: 1,
    miningSecondsLeft: 24685,
    currentLanguage: 'tr' // Varsayılan dil
};

// Dil Sözlüğü Paketleri
const translations = {
    tr: {
        token: "Token",
        power: "Güç",
        sell_btn: "TOKEN SAT",
        upgrade_btn: "AGENT'I YÜKSELT",
        ai_title: "AI Agent'ınız",
        chat_btn: "Sohbet",
        ref_title: "1 arkadaşınızı davet edin",
        ref_reward: "+200 Güç",
        nav_upgrade: "Yükselt",
        nav_earn: "Kazan",
        nav_ai: "AI",
        nav_tasks: "Görevler",
        nav_pay: "Ödeme",
        alert_sell: "Token başarıyla satıldı!",
        alert_upgrade: "Agent başarıyla yükseltildi!"
    },
    en: {
        token: "Token",
        power: "Power",
        sell_btn: "SELL TOKEN",
        upgrade_btn: "UPGRADE AGENT",
        ai_title: "Your AI Agent",
        chat_btn: "Chat",
        ref_title: "Invite 1 friend",
        ref_reward: "+200 Power",
        nav_upgrade: "Upgrade",
        nav_earn: "Earn",
        nav_ai: "AI",
        nav_tasks: "Tasks",
        nav_pay: "Payment",
        alert_sell: "Token successfully sold!",
        alert_upgrade: "Agent successfully upgraded!"
    }
};

const usdBalanceEl = document.getElementById('usd-balance');
const tokenCountEl = document.getElementById('token-count');
const powerAmountEl = document.getElementById('power-amount');
const timerDisplayEl = document.getElementById('mining-timer');
const refCountStatusEl = document.getElementById('ref-count-status');

// DİL DEĞİŞTİRME MOTORU
function changeLanguage(lang) {
    gameState.currentLanguage = lang;
    document.getElementById('current-flag').textContent = lang === 'tr' ? '🇹🇷' : '🇺🇸';
    
    // data-lang niteliğine sahip tüm elemanları bul ve sözlüğe göre değiştir
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

function updateUI() {
    usdBalanceEl.textContent = gameState.usdBalance.toFixed(4);
    tokenCountEl.textContent = gameState.tokenCount.toFixed(4);
    powerAmountEl.textContent = gameState.powerAmount.toLocaleString('tr-TR').replace(/\./g, ' ');
    refCountStatusEl.textContent = `${gameState.referralCount}/${gameState.referralTarget}`;
}

// DİL MENÜSÜ ETKİLEŞİMİ
const langSelector = document.getElementById('lang-selector');
const langDropdown = document.getElementById('lang-dropdown');

langSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
});

document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const selectedLang = option.getAttribute('data-lang-opt');
        changeLanguage(selectedLang);
        langDropdown.classList.remove('show');
    });
});

// Menü dışına tıklanınca dil panelini kapat
document.addEventListener('click', () => {
    langDropdown.classList.remove('show');
});

function startMiningTimer() {
    setInterval(() => {
        if (gameState.miningSecondsLeft <= 0) {
            gameState.miningSecondsLeft = 25200; 
        } else {
            gameState.miningSecondsLeft--;
        }
        const hours = Math.floor(gameState.miningSecondsLeft / 3600);
        const minutes = Math.floor((gameState.miningSecondsLeft % 3600) / 60);
        const seconds = gameState.miningSecondsLeft % 60;
        timerDisplayEl.textContent = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');

        gameState.tokenCount += 0.0001;
        gameState.usdBalance += 0.00000002;
        updateUI();
    }, 1000);
}

// DİĞER BUTON AKSİYONLARI
document.getElementById('btn-sell-token').addEventListener('click', () => {
    if (gameState.tokenCount > 0) {
        const earnedUsd = gameState.tokenCount * 0.00002;
        gameState.usdBalance += earnedUsd;
        alert(translations[gameState.currentLanguage].alert_sell);
        gameState.tokenCount = 0;
        updateUI();
    }
});

document.getElementById('btn-upgrade-agent').addEventListener('click', () => {
    gameState.powerAmount += 150;
    gameState.tokenCount += 5.0;
    alert(translations[gameState.currentLanguage].alert_upgrade);
    updateUI();
});

window.addEventListener('DOMContentLoaded', () => {
    updateUI();
    startMiningTimer();
});
