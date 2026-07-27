# nenchan

Discord botu + Vercel'de barındırılan embedded admin paneli. Bot komutları, sunucu yönetimi, DM gönderme, mesaj silme, ban/kick/timeout ve hepsi tek bir serverless function'da.

## Özellikler

### Bot Komutları
- `/ping` — pong
- `/chat <prompt>` — Google Gemini AI ile sohbet
- `/banner [user]` — Kullanıcı banner'ı gösterir
- `/profile [user]` — Kullanıcı profili (avatar, banner, accent color)
- `/userinfo [user]` — Kullanıcı bilgileri

### Admin Paneli (web)
`https://nenchan.vercel.app/api` adresinden erişilir. Discord OAuth2 ile giriş yapılır.

- **Dashboard** — Sunucu istatistikleri, rol listesi
- **Members** — Üye listesi, arama/filtreleme, rol rozetleri, ban/kick/timeout butonları
- **Sanctions** — Aktif timeout ve ban listesi, kaldırma butonları
- **Messages** — Kanal seçme, mesaj geçmişi (sadece bot mesajları), dosya ekleme, silme
- **Whispers** — DM gönderme/alma (kullanıcı ID ile)

## Teknoloji

| Katman | Teknoloji |
|--------|-----------|
| Runtime | Vercel Serverless (Node.js) |
| Bot Framework | [Discraft](https://github.com/The-Best-Codes/discraft-js) |
| Dil | TypeScript |
| AI | Google Gemini |
| Auth | HMAC-SHA256 signed token + HttpOnly cookie |
| API | Discord REST API v10 |

## Kurulum

### 1. Discord Developer Portal

1. [discord.com/developers/applications](https://discord.com/developers/applications) adresine git
2. Yeni uygulama oluştur
3. **Bot** sekmesinden token al
4. **General Information** sekmesinden App ID ve Public Key al
5. **OAuth2** sekmesinden Client Secret al
6. OAuth2 > URL Generator'dan `applications.commands` scope ile davet linki oluştur
7. Interactions Endpoint URL kısmına `https://nenchan.vercel.app/api` yaz

### 2. Ortam Değişkenleri

`.env` dosyasını oluştur:

```env
DISCORD_PUBLIC_KEY='...'
DISCORD_APP_ID='...'
DISCORD_TOKEN='...'
DISCORD_CLIENT_SECRET='...'
DISCORD_OWNER_ID='...'          # Sadece senin Discord user ID'n
GUILD_ID='...'                  # Botun olacağı sunucu ID'si
GOOGLE_AI_API_KEY='...'
GOOGLE_AI_MODEL='gemini-2.0-flash'
```

### 3. Vercel'e Deploy

```bash
npm install
npm run build
vercel deploy --prod
```

Vercel dashboard'undan da environment variable'ları ayarla.

### 4. Git Push = Auto Deploy

Repo `luavoxis/nenchan-bot` GitHub'a bağlı. `main` branch'ine push atınca Vercel otomatik deploy eder.

## Proje Yapısı

```
nenchan/
├── index.ts              # Ana handler: Discord interactions + admin panel HTML/JS
├── commands/
│   ├── chat.ts           # /chat — Gemini AI sohbet
│   ├── ping.ts           # /ping
│   ├── banner.ts         # /banner
│   ├── profile.ts        # /profile
│   └── userinfo.ts       # /userinfo
├── public/icons/         # Dashboard ikonları
├── api/index.js          # Build çıktısı (esbuild, deploy edilen dosya)
├── vercel.json           # Route rewrite + security headers
├── package.json
└── .env.example
```

## Güvenlik

- Auth token: `HMAC-SHA256(userId, DISCORD_CLIENT_SECRET)` ile imzalanmış
- Cookie: `HttpOnly`, `Secure`, `SameSite=Strict`
- Tüm user/channel ID'leri snowflake regex ile doğrulanıyor
- Stack trace client'a döndürülmüyor
- CSP, X-Frame-Options, HSTS, nosniff header'ları aktif
- Request body 1MB ile sınırlı
