# 🚀 Astra Mining

Astra Mining, uzay ve bilim-kurgu teması üzerine tasarlanmış, mobil odaklı bir **mining / idle-game simülasyon arayüzüdür**.

Uygulama, Telegram Mini App kullanımına uygun olacak şekilde tasarlanmıştır ancak mevcut GitHub sürümü **tamamen frontend tabanlıdır**. Gerçek ödeme, blockchain işlemi, yatırım veya merkezi sunucu bağlantısı içermez.

> **⚠️ Simulation Only:** Bu proje eğitim, prototipleme ve arayüz gösterimi amacıyla hazırlanmış bir simülasyondur. Gösterilen bakiyeler, tokenler, güç değerleri ve ödeme işlemleri gerçek değildir.

---

## ✦ Features

### 🌌 Cosmic Dashboard

* Uzay temalı karanlık arayüz
* Dinamik yıldız alanı
* Nebula ve holografik HUD efektleri
* Agent çekirdeği ve orbital animasyonlar
* Responsive mobile-first tasarım
* Desktop ve Telegram WebApp kullanımına uygun yapı

### ⚡ Mining Simulation

* 24 saatlik mining cycle
* Timestamp tabanlı üretim sistemi
* Sayfa kapatıldığında kaybolmayan simülasyon ilerlemesi
* Power seviyesine göre token üretimi
* Cycle tamamlandığında yeni mining döngüsü başlatabilme

### ◈ Economy System

Simülasyon içinde üç temel değer bulunur:

| Değer     | Açıklama                               |
| --------- | -------------------------------------- |
| **Power** | Mining kapasitesini temsil eder        |
| **Token** | Mining sonucunda üretilen sanal varlık |
| **USD**   | Simülasyon bakiyesi                    |

Ayrıca:

* Token satış simülasyonu
* Power upgrade sistemi
* İlk yatırım bonusu
* Günlük token üretimi
* Rank ilerlemesi
* Transaction history

bulunur.

### 🤖 Agent System

Oyuncu Power seviyesini artırdıkça farklı Astra agent'larının kilidini açabilir.

```text
NOVA
  ↓
PULSAR
  ↓
QUASAR
  ↓
NEBULA
```

Agent'lar görsel yükseltmelerdir ve mining üretim hızını değiştirmez.

### 🏆 Rank System

Power miktarına bağlı olarak rank seviyesi yükselir:

```text
Gezegen
   ↓
Asteroid
   ↓
Yıldız
   ↓
Sistem
   ↓
Galaksi
   ↓
Evren
```

### 🎯 Task System

Görev sistemi farklı kategorilerden oluşur:

* Referans görevleri
* Sosyal görev simülasyonları
* Günlük giriş
* Bakiye yükleme görevleri
* Yeniden yatırım görevleri
* Ödül takibi

Tamamlanan görevler Power ödülü verir.

### 🔥 Daily Streak

Günlük giriş sistemi:

* Günlük claim
* Streak takibi
* Ardışık günlerde seri artırma
* Power ödülü
* LocalStorage ile kalıcı kayıt

Dün giriş yapılmışsa streak devam eder; daha uzun süre ara verilirse seri yeniden başlar.

### ⚡ Mini Game

Astra Mining içerisinde 10 saniyelik küçük bir reaction game bulunur.

Oyuncu:

1. Oyunu başlatır
2. Ekranda beliren energy core'lara tıklar
3. Skor toplar
4. Skoruna göre Token ödülü kazanır

Günlük oyun sayısı sınırlandırılmıştır.

### 👥 Referral Simulation

Referans sistemi üç seviyeli olarak tasarlanmıştır:

```text
Level 1 → %15
Level 2 → %7
Level 3 → %2
```

Ayrıca demo geliştirme amacıyla sanal referral kullanıcıları oluşturulabilir.

Referans sistemi:

* Referral count
* Referral list
* Level filtreleme
* Referral rewards
* Referral tasks
* Demo referral generation

özelliklerini içerir.

### 🌐 Internationalization

Şu anda iki dil desteklenir:

* 🇹🇷 Türkçe
* 🇺🇸 English

Metinlerin büyük bölümü merkezi translation dictionary üzerinden yönetilir ve yeni diller eklenebilir.

### 💾 Local Persistence

Uygulama backend kullanmadan kullanıcı verilerini tarayıcıdaki:

```text
localStorage
```

üzerinde saklar.

Kaydedilen bilgiler arasında:

* USD balance
* Token
* Power
* Rank progression
* Mining cycle
* Streak
* Referrals
* Completed tasks
* Agent selection
* Transactions
* Mini-game usage

bulunur.

Bu nedenle sayfa yenilense veya kapatılıp tekrar açılsa bile demo ilerlemesi korunur.

---

# 🧩 Application Structure

Proje şu temel dosyalardan oluşur:

```text
astra-mining/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Uygulamanın ana HTML yapısını içerir.

Başlıca bölümler:

```text
Top Bar
Home / AI
Earn
Upgrade
Tasks
Payment
Settings
Modal System
Bottom Navigation
```

### `style.css`

Tüm görsel tasarım burada bulunur.

İçerdiği başlıca sistemler:

* Cosmic background
* Responsive layout
* Glassmorphism cards
* Agent animations
* Mining HUD
* Navigation
* Modal system
* Task components
* Payment components
* Mobile optimization

### `script.js`

Uygulamanın çalışma motorudur.

Başlıca modüller:

```text
State Management
Mining Engine
Economy
Tasks
Referrals
Rank System
Agent System
Mini Game
Transactions
Localization
Modals
Settings
Persistence
```

---

# 🧠 Architecture

Astra Mining mevcut sürümde tamamen client-side çalışır.

```text
                    ┌────────────────────┐
                    │    Astra Mining    │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │   Application UI   │
                    └─────────┬──────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
       ┌─────▼─────┐    ┌────▼────┐     ┌─────▼─────┐
       │   Mining  │    │ Economy │     │   Tasks   │
       │   Engine  │    │  Engine │     │   Engine  │
       └─────┬─────┘    └────┬────┘     └─────┬─────┘
             │               │                │
             └───────────────┼────────────────┘
                             │
                    ┌────────▼────────┐
                    │    App State    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   localStorage  │
                    └─────────────────┘
```

Bu mimari özellikle prototip geliştirme ve UI testleri için basit tutulmuştur.

---

# 📱 Telegram Mini App Compatibility

Astra Mining, Telegram WebApp SDK ile uyumlu çalışacak şekilde hazırlanmıştır.

Uygulama Telegram dışında normal bir web sayfası olarak da açılabilir.

Telegram WebApp mevcut olduğunda uygulama:

* `Telegram.WebApp.ready()`
* `Telegram.WebApp.expand()`
* Telegram tema renkleri

gibi temel WebApp özelliklerinden yararlanabilir.

Telegram SDK bulunmuyorsa uygulama çalışmaya devam eder.

> Mevcut GitHub sürümünde Telegram botu veya backend zorunlu değildir.

---

# 🌐 GitHub Pages Deployment

GitHub Pages üzerinde yayınlamak için:

### 1. Repository oluştur

Örneğin:

```text
astra-mining
```

### 2. Dosyaları repository'ye ekle

```text
index.html
style.css
script.js
README.md
```

### 3. GitHub Pages'i etkinleştir

Repository içerisinde:

```text
Settings
→ Pages
→ Build and deployment
→ Deploy from a branch
→ main
→ /root
→ Save
```

### 4. Site URL'ini aç

GitHub Pages URL'si genellikle şu formatta olur:

```text
https://USERNAME.github.io/REPOSITORY/
```

Örnek:

```text
https://example.github.io/astra-mining/
```

---

# 🤖 Telegram Setup

Bu proje Telegram olmadan da çalışır.

Telegram Mini App olarak kullanmak istersen uygulamayı BotFather üzerinden bir Web App URL'sine bağlayabilirsin.

Örneğin:

```text
https://example.github.io/astra-mining/
```

Telegram yapılandırması kullanılan bot hesabına göre BotFather üzerinden yapılabilir.

> Not: Mevcut proje gerçek kullanıcı hesabı, gerçek referral doğrulaması, gerçek ödeme veya server-side authentication sağlamaz.

---

# 🔐 Data & Security

Bu repository'deki uygulama **demo / simulation** amacıyla hazırlanmıştır.

Veriler:

```text
Browser
└── localStorage
```

üzerinde tutulur.

Bu nedenle:

* LocalStorage verileri kullanıcı tarafından değiştirilebilir.
* Token ve Power değerleri güvenilir finansal veri değildir.
* Transaction kayıtları yalnızca simülasyondur.
* Referral sistemi doğrulanmış kullanıcı sistemi değildir.
* Payment ekranı gerçek ödeme gerçekleştirmez.
* Blockchain bağlantısı bulunmaz.

Gerçek bir production uygulamasında aşağıdaki sistemlerin backend üzerinde uygulanması gerekir:

```text
Telegram Authentication
Server-side State
Database
Transaction Ledger
Rate Limiting
Referral Validation
Task Verification
Payment Provider
Blockchain Integration
Fraud Prevention
Server-side Economy
```

---

# 🎮 Simulation Economy

Mevcut demo ekonomisi yaklaşık olarak şu mantıkla çalışır:

```text
Power
  ↓
Mining Production
  ↓
Token
  ↓
Token Value
  ↓
USD Simulation Balance
```

Power satın alma işlemi ise:

```text
USD
  ↓
Power
  ↓
Higher Token Production
```

şeklinde çalışır.

İlk simülasyon yükseltmesinde bonus Power uygulanır.

---

# ⚙️ Local Demo Controls

Uygulama içerisindeki **Settings** panelinden:

* FAQ
* Support
* Account information
* Referral program
* Transaction history
* Demo data reset

ekranlarına ulaşılabilir.

`Demo verilerini sıfırla` seçeneği uygulamayı başlangıç durumuna geri döndürür.

---

# 🛠️ Development

Astra Mining herhangi bir build sistemi gerektirmez.

Temel yapı:

```text
HTML
CSS
JavaScript
```

olduğu için projeyi doğrudan tarayıcıda açabilirsin.

Lokal kullanım için:

```text
index.html
```

dosyasını açman yeterlidir.

Daha gelişmiş geliştirme sırasında VS Code gibi bir editör ve basit bir local HTTP server kullanılması önerilir.

---

# 📌 Roadmap

Planned improvements:

* [ ] More agent classes
* [ ] XP progression system
* [ ] Advanced mission system
* [ ] More mini games
* [ ] Daily reward calendar
* [ ] Achievement system
* [ ] Animated rank progression
* [ ] More languages
* [ ] Improved accessibility
* [ ] Theme customization
* [ ] Sound effects
* [ ] Advanced mobile animations
* [ ] Optional backend architecture
* [ ] Server-side authentication
* [ ] Database persistence

Gerçek backend entegrasyonu eklenecek olursa mevcut frontend yapısı korunarak API tabanlı bir mimariye geçirilebilir.

---

# 📜 License

Bu repository'nin lisans koşulları için proje içerisindeki lisans dosyasını kontrol edin.

Lisans dosyası bulunmuyorsa, kodun yeniden kullanımı veya dağıtımı için repository sahibinin izni gerekebilir.

---

# ⚠️ Disclaimer

Astra Mining bir **software simulation / UI prototype** projesidir.

Bu repository:

* gerçek yatırım platformu değildir,
* finansal hizmet sağlamaz,
* gerçek kripto para üretmez,
* gerçek mining gerçekleştirmez,
* blockchain üzerinde işlem yapmaz,
* kullanıcı fonlarını tutmaz,
* gerçek para transferi yapmaz.

Uygulamadaki USD, Token, Power, rewards ve transaction kayıtlarının tamamı demo amaçlıdır.

---

## ✦ Project

**Astra Mining**

> Explore. Mine. Upgrade. Ascend.

Built as a cosmic frontend simulation for experimentation, UI development and Telegram Mini App prototyping.
