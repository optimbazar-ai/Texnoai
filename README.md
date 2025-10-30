# TexnoAI - Sun'iy Intellekt Yechimlari

![TexnoAI](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop)

## 📋 Loyiha haqida / About

**O'zbek:**
TexnoAI - Google Gemini AI texnologiyasi asosida qurilgan professional biznes veb-sayti. Loyiha zamonaviy veb-dasturlash texnologiyalari va sun'iy intellekt imkoniyatlarini birlashtiradi.

**English:**
TexnoAI is a professional business website built on Google Gemini AI technology. The project combines modern web development technologies with artificial intelligence capabilities.

## ✨ Asosiy Xususiyatlar / Key Features

### Frontend
- ✅ React 19.0.0 + TypeScript
- ✅ Vite 6.4.1 (Build Tool)
- ✅ Tailwind CSS (Styling)
- ✅ React Router DOM 7.9.4 (Routing)
- ✅ Responsive Design (Mobile-First)
- ✅ Dark Theme
- ✅ Smooth Animations

### AI Integration
- 🤖 Google Gemini AI (@google/genai 1.27.0)
- 💬 Live Chat / AI Chatbot (FAQ + Gemini AI)
- 🎨 Image Generation Prompt
- 📝 Text Summarization
- 🌍 Multi-language Translation
- 💻 Code Generator
- 📊 JSON Generator
- 📱 Telegram Bot Integration
- 📡 Auto-posting to Telegram Channel

### Features
- 📁 Dynamic Portfolio Management
- 📝 Blog System with AI-powered Content Generation
- 🤖 Auto-post Scheduler (8 posts/day, 09:00-21:00)
- 📱 Telegram Bot with Commands
- 📡 Auto-posting to Telegram Channel
- 💬 Live Chat with AI Assistant
- 🔐 Admin Panel with Role-based Access
- 👥 User Authentication & Session Management (8 hours)
- 📸 Image Upload (Base64)
- 🔍 SEO Optimized
- 💾 LocalStorage Data Persistence
- 📰 AI-powered News Aggregation
- ⭐ Testimonials
- ❓ FAQ Accordion
- 📞 Contact Form

## 🚀 O'rnatish / Installation

### Talablar / Requirements
- Node.js 18+ 
- npm yoki yarn

### Qadamlar / Steps

1. **Repository ni klonlash / Clone the repository:**
```bash
git clone <repository-url>
cd texnoai
```

2. **Bog'liqliklarni o'rnatish / Install dependencies:**
```bash
npm install
```

3. **Environment o'zgaruvchilarini sozlash / Setup environment variables:**
```bash
cp .env.example .env.local
```

4. **.env.local faylini tahrirlang va Gemini API kalitini qo'shing:**
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

5. **Development serverni ishga tushirish / Start development server:**
```bash
npm run dev
```

Sayt http://localhost:3000 da ochiladi.

6. **Production build yaratish / Build for production:**
```bash
npm run build
```

7. **Production build ni ko'rish / Preview production build:**
```bash
npm run preview
```

## 🔑 Gemini AI API Key

Google AI Studio dan API key olish:
1. https://makersuite.google.com/app/apikey ga kiring
2. API key yarating
3. `.env.local` fayliga qo'shing

## 🎨 Loyiha Tuzilmasi / Project Structure

```
texnoai/
├── src/
│   ├── components/           # React komponentlar
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Blog.tsx
│   │   ├── Testimonials.tsx
│   │   ├── AIAdvisor.tsx
│   │   ├── GeminiDemos.tsx
│   │   ├── News.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── LiveChat.tsx      # ⭐ Live Chat AI Bot
│   │   ├── SEO.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── PortfolioDetail.tsx
│   │   ├── BlogDetail.tsx
│   │   └── admin/            # Admin panel komponentlari
│   │       ├── AdminPanel.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── Login.tsx
│   │       ├── PortfolioManager.tsx
│   │       ├── BlogManager.tsx
│   │       ├── ImageUpload.tsx
│   │       └── AutoPostSettings.tsx  # ⭐ Auto-post sozlamalari
│   ├── data/                 # Ma'lumotlar
│   │   ├── portfolioData.ts
│   │   └── blogData.ts
│   ├── services/             # Xizmatlar
│   │   ├── geminiService.ts
│   │   ├── telegramService.ts    # ⭐ Telegram integratsiya
│   │   └── autoPostScheduler.ts  # ⭐ Avtomatik post scheduler
│   ├── utils/                # Yordamchi funksiyalar
│   │   └── sessionManager.ts
│   ├── types.ts              # TypeScript turlari
│   ├── App.tsx               # Asosiy komponent
│   ├── main.tsx              # Kirish nuqtasi
│   └── index.css             # Global stillar
├── telegram-bot/             # ⭐ Telegram Bot Backend
│   ├── index.js              # Bot server
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── public/                   # Statik fayllar
│   └── clear-storage.html    # LocalStorage tozalash
├── .env.example              # Environment namunasi
├── .env.local                # Environment o'zgaruvchilari (git ignore)
├── index.html                # HTML shablon
├── package.json              # Bog'liqliklar
├── tsconfig.json             # TypeScript konfiguratsiyasi
├── vite.config.ts            # Vite konfiguratsiyasi
├── tailwind.config.js        # Tailwind konfiguratsiyasi
├── postcss.config.js         # PostCSS konfiguratsiyasi
└── README.md                 # Dokumentatsiya
```

## 🔐 Admin Panel

### Kirish ma'lumotlari / Login Credentials

**Admin:**
- Login: `admin`
- Parol: `admin123`
- Huquqlar: To'liq kirish

**Editor:**
- Login: `editor`
- Parol: `editor123`
- Huquqlar: Portfolio va Blog tahrirlash

### Admin Panelga kirish / Access Admin Panel
```
http://localhost:3000/admin
```

### Imkoniyatlar / Features
- 📊 Dashboard - Statistika
- 📁 Portfolio CRUD operatsiyalari
- 📝 Blog CRUD operatsiyalari
- 🤖 AI yordamida blog yaratish
- 📸 Rasm yuklash (Base64)
- 🔒 Session boshqaruvi (8 soat)
- 👥 Rol asosida kirish

## 💬 Live Chat / AI Chatbot

### Xususiyatlar / Features
- ✅ Floating chat button
- ✅ Real-time AI responses (Gemini AI)
- ✅ FAQ auto-responses (15+ topics)
- ✅ Chat history (LocalStorage)
- ✅ Typing indicator
- ✅ Quick reply buttons
- ✅ Unread message counter

### FAQ Mavzular / FAQ Topics
- 💰 Narxlar (Pricing)
- ⏰ Muddat (Timeline)
- 🔧 Texnologiyalar (Technologies)
- 📊 Portfolio
- 📞 Kontakt (Contact)
- 🎯 Xizmatlar (Services)

### Qanday ishlaydi / How it works
1. Foydalanuvchi savol beradi
2. Sistema FAQ'ni tekshiradi
3. FAQ'da javob bo'lsa → darhol ko'rsatadi
4. FAQ'da yo'q bo'lsa → Gemini AI ga so'raydi
5. Chat history avtomatik saqlanadi

## 📱 Telegram Bot

### Setup / O'rnatish

1. **Bot yaratish (BotFather):**
```bash
# Telegram'da @BotFather ga yuboring:
/newbot
# Bot nomi: TexnoAI Assistant
# Username: texnoai_bot
```

2. **Bot'ni o'rnatish:**
```bash
cd telegram-bot
npm install
cp .env.example .env
# .env faylida token va kanal ID kiriting
npm start
```

### Environment Variables
```env
TELEGRAM_BOT_TOKEN=7123456789:AAH...your_token
TELEGRAM_CHANNEL_ID=@texnoai_channel
PORT=3001
```

### Bot Buyruqlari / Commands
- `/start` - Botni boshlash
- `/narx` - Narxlar ro'yxati
- `/xizmatlar` - Xizmatlar haqida
- `/portfolio` - Portfolio ko'rish
- `/aloqa` - Bog'lanish ma'lumotlari
- `/yordam` - Yordam

### Auto-posting to Channel

Har bir yangi blog post avtomatik Telegram kanalingizga yuboriladi:

1. **Admin Panel** → Dashboard → Auto-post sozlamalari
2. "📱 Telegram kanalga yuborish" checkbox'ini yoqing
3. Telegram bot backend'ni ishga tushiring:
```bash
cd telegram-bot
npm start
```
4. Postlar avtomatik kanalga yuboriladi!

### API Endpoints

**POST** `/api/post-to-channel` - Kanalga post yuborish
```json
{
  "title": "Post sarlavhasi",
  "excerpt": "Qisqa tavsif",
  "tags": ["AI", "Tech"],
  "date": "2024-01-01",
  "url": "https://texnoai.uz/blog/123"
}
```

**GET** `/api/health` - Bot status
**GET** `/api/bot-info` - Bot ma'lumotlari

## 🎨 Dizayn va Tema / Design & Theme

### Ranglar / Colors
```javascript
{
  'brand-primary': '#4f46e5',      // Indigo
  'brand-secondary': '#10b981',    // Green
  'dark-bg': '#0f172a',            // Slate 900
  'dark-card': '#1e293b',          // Slate 800
  'dark-text': '#e2e8f0',          // Slate 200
  'dark-subtext': '#94a3b8',       // Slate 400
}
```

### Dizayn Xususiyatlari / Design Features
- Modern, minimalist
- Dark theme
- Glassmorphism effects
- Gradient accents
- Smooth animations
- Mobile-first responsive

## 🤖 AI Demolar / AI Demos

1. **AI Chat** - Gemini bilan suhbat
2. **Image Generation** - Rasm uchun prompt yaratish
3. **Text Summarization** - Matnni qisqartirish
4. **Translation** - Ko'p tilli tarjima
5. **Code Generator** - Kod yaratish
6. **JSON Generator** - JSON strukturalar yaratish

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Xavfsizlik / Security

- Session Management (8 soat)
- Role-based Access Control
- XSS Protection
- Input Validation
- Secure Image Upload

## 📊 Data Management

- LocalStorage data persistence
- CRUD operations
- Data validation
- Backup & restore capability

## 🌐 SEO Optimization

- Dynamic meta tags
- Open Graph support
- Twitter Cards
- Semantic HTML
- Clean URLs

## 📝 TypeScript

Loyiha TypeScript Strict Mode da yozilgan:
- Type safety
- Interface definitions
- No implicit any
- Null checks

## 🎯 Performance

- Code splitting
- Lazy loading
- Image optimization
- CSS optimization
- Bundle size optimization

## 🚀 Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod
```

### Docker
```bash
docker build -t texnoai .
docker run -p 3000:3000 texnoai
```

## 🛠️ Tech Stack

### Core
- React 19.0.0
- TypeScript 5.6.2
- Vite 6.4.1

### Styling
- Tailwind CSS 3.4.17
- PostCSS
- Autoprefixer

### AI & Tools
- Google Gemini AI 1.27.0
- Highlight.js 11.11.1
- React Router DOM 7.9.4

## 📖 Scripts

```json
{
  "dev": "vite",              // Development server
  "build": "tsc && vite build", // Production build
  "preview": "vite preview"   // Preview production build
}
```

## 🐛 Debugging

Development rejimida:
```bash
npm run dev
```

Browser console dan xatolarni ko'ring.

## 🤝 Contributing

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. Commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

## 📄 License

MIT License

## 👥 Authors

**TexnoAI Team**
- Website: https://texnoai.uz
- Email: info@texnoai.uz
- Phone: +998 90 123 45 67

## 🙏 Acknowledgments

- Google Gemini AI
- React Team
- Vite Team
- Tailwind CSS Team
- Community

## 📞 Support

Yordam kerakmi?
- 📧 Email: support@texnoai.uz
- 📱 Telegram: @texnoai
- 🌐 Website: https://texnoai.uz

---

© 2024 TexnoAI. Barcha huquqlar himoyalangan.
