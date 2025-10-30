# Gemini API Setup Guide

## 📝 Gemini API Key Olish

### 1. Google AI Studio'ga kiring
```
https://makersuite.google.com/app/apikey
```

### 2. Google akkauntingiz bilan login qiling

### 3. "Create API Key" tugmasini bosing

### 4. API Key'ni nusxa oling

---

## 🔧 .env Faylni Sozlash

### 1. `.env` faylini oching
```bash
texnoai/.env
```

### 2. API Key'ni qo'ying
```env
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**MUHIM:** 
- `your_gemini_api_key_here` o'rniga o'zingizning API key'ingizni qo'ying
- API key'ni hech kimga ko'rsatmang
- .env fayli .gitignore'da, shuning uchun git'ga tushmayd

---

## 🐳 Docker bilan ishlatish

### 1. .env faylni sozlang (yuqoridagidek)

### 2. Docker rebuild qiling
```bash
docker-compose down
docker-compose up --build -d
```

### 3. Tekshiring
```
http://localhost/demolar
```

---

## 🧪 Local Development (Docker'siz)

### 1. .env faylni sozlang

### 2. Development server'ni ishga tushiring
```bash
npm run dev
```

### 3. Browser'da oching
```
http://localhost:3003/demolar
```

---

## ⚠️ Xavfsizlik

### ❌ BU XATO:
```env
# Git'ga push qilmaslik!
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXX
```

### ✅ TO'G'RI:
1. .env faylni .gitignore'ga qo'shing ✅ (allaqachon qo'shilgan)
2. API key'ni environment variable'da saqlang
3. Production'da server environment variable ishlatting
4. Free tier quota'ni kuzatib turing

---

## 📊 Gemini API Free Tier

### Limitlar:
- **15 RPM** (Requests Per Minute)
- **1 Million Tokens Per Month**
- **32,000 Tokens Per Request**

### Agar limit tugasa:
1. API key'ni yangilang
2. Yoki Gemini Pro'ga upgrade qiling
3. Yoki rate limiting qo'shing frontend'ga

---

## 🔍 Troubleshooting

### API ishlamayapti?

#### 1. API Key tekshiring:
```bash
# .env faylni oching
cat .env
```

#### 2. Docker'ni restart qiling:
```bash
docker-compose restart
```

#### 3. Browser cache'ni tozalang:
```
Ctrl + Shift + R
```

#### 4. Console'ni tekshiring:
```
F12 > Console
```

### Xatoliklar:

#### "API key not found"
- .env fayl mavjudmi?
- VITE_ prefix mavjudmi?
- Docker rebuild qildinmi?

#### "Rate limit exceeded"
- Free tier limiti tugagan
- Biroz kutib ko'ring (1 daqiqa)

#### "Invalid API key"
- API key noto'g'ri
- Yangi API key oling

---

## 🌐 Environment Variables

### Frontend (.env):
```env
VITE_GEMINI_API_KEY=your_key_here
NODE_ENV=development
```

### Backend (telegram-bot/.env):
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@your_channel
ADMIN_TELEGRAM_ID=your_telegram_id
PORT=3001
```

---

## 📞 Yordam

**Muammo yechilmasa:**
- Telegram: @texnoaikanal
- Email: info@texnoai.uz

---

**Last Updated:** 2025-10-30
