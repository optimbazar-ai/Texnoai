# TexnoAI Telegram Bot

Avtomatik post yuborish va mijozlar bilan suhbat uchun Telegram bot.

## 🚀 O'rnatish

### 1. Dependencies o'rnatish

```bash
cd telegram-bot
npm install
```

### 2. Bot yaratish (BotFather)

1. Telegram'da [@BotFather](https://t.me/BotFather) ni oching
2. `/newbot` buyrug'ini yuboring
3. Bot nomini kiriting (masalan: "TexnoAI Assistant")
4. Bot username kiriting (masalan: "texnoai_bot")
5. Bot token olasiz (masalan: `7123456789:AAH...`)

### 3. Kanal yaratish

1. Telegram'da yangi kanal yarating
2. Bot'ni kanalga admin qiling (Post yuborish huquqi bilan)
3. Kanal username oling (masalan: `@texnoai_channel`)
   - Yoki kanal ID (masalan: `-1001234567890`)

### 4. Environment sozlash

`.env` fayl yarating:

```bash
cp .env.example .env
```

`.env` faylida to'ldiring:

```env
TELEGRAM_BOT_TOKEN=7123456789:AAH...your_token_here
TELEGRAM_CHANNEL_ID=@texnoai_channel
PORT=3001
```

### 5. Bot'ni ishga tushirish

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## 📱 Bot Buyruqlari

- `/start` - Botni boshlash
- `/narx` - Narxlar ro'yxati
- `/xizmatlar` - Xizmatlar haqida
- `/portfolio` - Portfolio ko'rish
- `/aloqa` - Bog'lanish ma'lumotlari
- `/yordam` - Yordam

## 🔗 API Endpoints

### POST /api/post-to-channel

Blog postni Telegram kanalga yuborish:

```json
{
  "title": "Post sarlavhasi",
  "excerpt": "Qisqa tavsif",
  "tags": ["AI", "Tech"],
  "date": "2024-01-01",
  "url": "https://texnoai.uz/blog/123"
}
```

### POST /api/send-message

Maxsus xabar yuborish:

```json
{
  "chatId": "123456789",
  "text": "Salom!",
  "parseMode": "Markdown"
}
```

### GET /api/health

Bot statusini tekshirish

### GET /api/bot-info

Bot ma'lumotlarini olish

## 🔧 Frontend integratsiya

Frontend'dan Telegram bot API'ga so'rovlar yuboriladi:

```typescript
// src/services/telegramService.ts
const TELEGRAM_API_URL = 'http://localhost:3001/api';
```

## 🌐 Production Deploy

### 1. Webhook sozlash (optional)

Polling o'rniga webhook ishlatish:

```javascript
// index.js
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  webHook: {
    port: process.env.PORT
  }
});

bot.setWebHook(`${process.env.WEBHOOK_URL}/webhook`);
```

### 2. Server deploy (masalan, Railway yoki Render)

```bash
# Environment variables
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHANNEL_ID=@your_channel
PORT=3001
WEBHOOK_URL=https://your-domain.com
```

## 📊 Monitoring

Bot konsolda loglar ko'rsatadi:

- ✅ Muvaffaqiyatli xabarlar
- ❌ Xatolar
- 📩 Kiruvchi xabarlar
- 📤 Yuborilgan postlar

## 🔐 Xavfsizlik

- Bot token'ni hech qachon repository'ga commit qilmang
- `.env` faylini `.gitignore`ga qo'shing
- API endpoint'larni himoyalang (optional: API key)

## ❓ Troubleshooting

### Bot javob bermayapti
- Bot token to'g'ri kiritilganini tekshiring
- Bot polling yoki webhook ishlab turganini tekshiring

### Kanalga post yuborilmayapti
- Bot kanalda admin ekanligini tekshiring
- Kanal ID to'g'ri kiritilganini tekshiring

### CORS xatosi
- Backend'da CORS sozlamalarini tekshiring
- Frontend API URL to'g'ri ekanligini tekshiring

## 📝 License

MIT
