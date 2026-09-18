// ==========================================
// 1. OYUN DURUMU VE VERİ YÖNETİMİ
// ==========================================
const gameState = {
    usdBalance: 0.0012,
    tokenCount: 49.5766,
    powerAmount: 2110,
    referralCount: 0,
    referralTarget: 1,
    // Toplam 7 saatlik (25200 saniye) madencilik süresi başlangıcı
    miningSecondsLeft: 24685 
};

// HTML Elemanlarını Seçme
const usdBalanceEl = document.getElementById('usd-balance');
const tokenCountEl = document.getElementById('token-count');
const powerAmountEl = document.getElementById('power-amount');
const timerDisplayEl = document.getElementById('mining-timer');
const refCountStatusEl = document.getElementById('ref-count-status');

// Ekrandaki Değerleri Güncelleyen Fonksiyon
function updateUI() {
    usdBalanceEl.textContent = gameState.usdBalance.toFixed(4);
    tokenCountEl.textContent = gameState.tokenCount.toFixed(4);
    powerAmountEl.textContent = gameState.powerAmount.toLocaleString('tr-TR').replace(/\./g, ' ');
    refCountStatusEl.textContent = `${gameState.referralCount}/${gameState.referralTarget}`;
}

// ==========================================
// 2. CANLI GERİ SAYIM VE PASİF KAZANÇ MOTORU
// ==========================================
function startMiningTimer() {
    const timerInterval = setInterval(() => {
        if (gameState.miningSecondsLeft <= 0) {
            // Süre bittiğinde sayacı sıfırla ve yeniden başlat (Simülasyon)
            gameState.miningSecondsLeft = 25200; 
        } else {
            gameState.miningSecondsLeft--;
        }

        // Saniyeyi Saat:Dakika:Saniye formatına çevirme
        const hours = Math.floor(gameState.miningSecondsLeft / 3600);
        const minutes = Math.floor((gameState.miningSecondsLeft % 3600) / 60);
        const seconds = gameState.miningSecondsLeft % 60;

        // Sayıları iki basamaklı gösterme (Örn: 06:05:09)
        const formattedTime = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');

        timerDisplayEl.textContent = formattedTime;

        // Pasif Kazanç: Her saniye çok küçük bir miktar USD ve Token ekle
        gameState.tokenCount += 0.0001;
        gameState.usdBalance += 0.00000002;
        updateUI();

    }, 1000);
}
// ==========================================
// 3. BUTON AKSİYONLARI VE ETKİLEŞİMLER
// ==========================================
document.getElementById('btn-sell-token').addEventListener('click', () => {
    if (gameState.tokenCount > 0) {
        // Tokenları satıp USD bakiyesine ekleme simülasyonu
        const earnedUsd = gameState.tokenCount * 0.00002;
        gameState.usdBalance += earnedUsd;
        alert(`${gameState.tokenCount.toFixed(4)} Token başarıyla satıldı! \nKazanılan: $${earnedUsd.toFixed(4)}`);
        gameState.tokenCount = 0;
        updateUI();
    } else {
        alert("Satılacak tokenınız bulunmuyor. Madenciliğin dolmasını bekleyin!");
    }
});

document.getElementById('btn-upgrade-agent').addEventListener('click', () => {
    // Gücü ve Agent seviyesini artırma aksiyonu
    gameState.powerAmount += 150;
    gameState.tokenCount += 5.0; // Yükseltme ödülü token
    alert("Agent başarıyla yükseltildi! \n+150 Güç ve +5 Token kazanıldı.");
    updateUI();
});

// Arkadaş Davet Etme Alanına Tıklama
document.querySelector('.referral-box').addEventListener('click', () => {
    if (gameState.referralCount < gameState.referralTarget) {
        gameState.referralCount++;
        gameState.powerAmount += 200; // Ekrandaki +200 Güç ödülü
        alert("Arkadaşınız davet edildi! +200 Güç hesabınıza tanımlandı.");
        updateUI();
    } else {
        alert("Bu görevi zaten tamamladınız!");
    }
});

// AI Sohbet Butonu Aksiyonu
document.querySelector('.chat-sohbet-btn').addEventListener('click', () => {
    alert("Astra AI Agent ile sohbet modülü yakında aktif olacak!");
});

// ==========================================
// 4. ALT MENÜ NAVİGASYON YÖNETİMİ
// ==========================================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Aktif sınıfını diğer tüm menü elemanlarından kaldır
        navItems.forEach(nav => nav.classList.remove('active'));
        // Tıklanan menü elemanını aktif yap
        item.classList.add('active');
        
        const targetSection = item.getAttribute('data-target');
        console.log(`Şu an açılan sekme: ${targetSection}`);
        // İleride buraya diğer sayfaların gizleme/gösterme kodları eklenebilir
    });
});

// Uygulama İlk Açıldığında Çalışacak Tetikleyiciler
window.addEventListener('DOMContentLoaded', () => {
    updateUI();
    startMiningTimer();
});
