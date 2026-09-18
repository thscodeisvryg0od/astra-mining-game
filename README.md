# Astra Mining Bot

Telegram Mini App olarak çalışan, uzay temalı mining/earning botu.

## Dosyalar
- `index.html` — Ana yapı, tüm ekranlar
- `style.css` — Galaksi teması (Space Grotesk fontu)
- `script.js` — Tüm mantık, LocalStorage, mini oyun, Telegram SDK

## GitHub Pages'a Yükleme

1. Mevcut repo'ya (`thscodeisvryg0od.github.io/astra-*`) bu 3 dosyayı push et
2. Ayarlar → Pages → `main` branch seç → Save
3. Site URL'ini kopyala (örn. `https://thscodeisvryg0od.github.io/astra-miner/`)

## BotFather Ayarı

BotFather'da sırayla:
```
/setmenubutton → @AstraMinerBot → seç
"Menu button text" için: ⚡ Astra Mining
"Menu button URL" için: https://GITHUB_PAGES_URL/
```

Veya Mini App için:
```
/newapp → @AstraMinerBot
Title: Astra Mining
URL: https://GITHUB_PAGES_URL/
```

## Özellikler
- ✦ Galaksi / uzay teması (AiLab'den tamamen farklı)
- 💾 LocalStorage ile kalıcı veri (sayfa kapansa token kaybolmaz)
- 🔥 Günlük streak + XP / Rank sistemi (Gezegen → Evren)
- ⚡ Mini tıklama oyunu (token kazanma)
- 🌐 TR/EN dil desteği
- 📎 Referans linki (?ref=userId) ile takip
- 📱 Telegram WebApp SDK entegrasyonu
- 🤖 4 farklı agent (güç ile açılır)
- Tüm sekmeler çalışır: AI · Kazan · Yükselt · Görevler · Ödeme
