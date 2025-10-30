# 📱 Telegram Bot - Tezkor Sozlash

## 🎯 Nimalar kerak?

- [ ] Telegram akkaunt
- [ ] Node.js 18+
- [ ] TexnoAI frontend ishlab turishi kerak
- [ ] Gemini API key

## 📋 5 Daqiqada Sozlash

### 1️⃣ Bot Yaratish (2 daqiqa)

1. Telegram'da [@BotFather](https://t.me/BotFather) ni oching
2. Quyidagi buyruqlarni yuboring:

```
/newbot
TexnoAI Assistant
texnoai_bot
```

3. **Bot Token** ni oling (masalan: `7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`)

### 2️⃣ Kanal Yaratish (1 daqiqa)

1. Telegram'da yangi **kanal** yarating
2. Kanal nomi: `TexnoAI Channel`
3. Username: `@texnoai_channel` (yoki boshqa)
4. Bot'ni kanalga **admin** qiling:
   - Kanal → Edit → Administrators → Add Administrator
   - Bot'ni toping va admin qiling
   - **"Post messages"** huquqini yoqing

### 3️⃣ Bot Backend O'rnatish (2 daqiqa)

```bash
# 1. Telegram bot papkasiga o'ting
cd telegram-bot

# 2. Dependencies o'rnatish
npm install

# 3. .env fayl yaratish
cp .env.example .env

# 4. .env faylini tahrirlash
notepad .env  # yoki code .env
```

**.env** faylida:
```env
TELEGRAM_BOT_TOKEN=7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
TELEGRAM_CHANNEL_ID=@texnoai_channel
PORT=3001
```

```bash
# 5. Bot'ni ishga tushirish
npm start
```

**Natija:**
```
🤖 TexnoAI Telegram Bot ishga tushdi!
🚀 Server ishga tushdi: http://localhost:3001
```

### 4️⃣ Frontend Sozlash (10 soniya)

1. Admin Panel'ga kiring: http://localhost:3003/admin
2. Dashboard → **Auto-post sozlamalari**
3. ☑️ **"Telegram kanalga yuborish"** ni yoqing

## ✅ Test Qiling!

### Bot Test:

1. Telegram'da bot'ni oching: `@texnoai_bot`
2. `/start` yuboring
3. `/narx` yuboring
4. "Salom" yuboring

### Kanal Test:

1. Admin Panel → Blog → Yangi qo'shish
2. Post yarating
3. Telegram kanalingizni tekshiring - post avtomatik yuborilgan bo'lishi kerak!

## 🚨 Muammolar?

### Bot javob bermayapti
```bash
# Bot statusini tekshiring:
curl http://localhost:3001/api/health

# Terminal'dagi loglarni o'qing
```

### Kanalga yuborilmayapti
- ✅ Bot kanalda admin ekanligini tekshiring
- ✅ "Post messages" huquqi yoqilganligini tekshiring
- ✅ Kanal ID to'g'ri kiritilganligini tekshiring
- ✅ Bot backend ishlab turganligini tekshiring

### Frontend'dan bot'ga ulanmayapti
```bash
# Bot backend ishlab turganligini tekshiring:
curl http://localhost:3001/api/health

# Javob: {"status":"ok","bot":"running"}
```

## 🎯 Qanday Ishlaydi?

```
┌─────────────┐
│   Frontend  │ (React App)
│   :3003     │
└──────┬──────┘
       │ API Request
       │
┌──────▼──────┐
│ Telegram    │ (Node.js)
│ Bot Backend │
│   :3001     │
└──────┬──────┘
       │ Telegram API
       │
┌──────▼──────┐
│  Telegram   │
│   Channel   │
│  @texnoai   │
└─────────────┘
```

## 📊 Avtomatik Postlar

Har kuni **09:00 - 21:00** oralig'ida:
- ✅ 8 ta yangi blog post yaratiladi
- ✅ Har biri avtomatik Telegram kanalingizga yuboriladi
- ✅ SEO optimallashtirilgan
- ✅ Tag'lar va link bilan

## 🎨 Xabar Formati

```
📝 *Sun'iy intellekt va biznes*

AI texnologiyalari biznes jarayonlarini
qanday o'zgartirmoqda va kelajakda
qanday imkoniyatlar ochiladi...

🏷️ #AI #Biznes #Texnologiya
📅 30.10.2024

🔗 *Batafsil o'qish:*
https://texnoai.uz/blog/123

@texnoai_channel
```

## 🔐 Xavfsizlik

- ❌ Bot token'ni **hech qachon** commit qilmang
- ✅ `.env` faylini `.gitignore`ga qo'shing
- ✅ Production'da environment variables ishla ting

## 🚀 Production Deploy

### Option 1: Railway.app
```bash
railway login
railway init
railway up
```

### Option 2: Render.com
```bash
# render.yaml yarating
git push
```

### Webhook sozlash (Production uchun):
```javascript
// Polling o'rniga webhook
bot.setWebHook('https://your-domain.com/webhook');
```

## 📚 Qo'shimcha

Batafsil: [telegram-bot/README.md](./telegram-bot/README.md)

---

✅ **Tayyor!** Bot ishlayapti va kanal integratsiyasi faol! 🎉
