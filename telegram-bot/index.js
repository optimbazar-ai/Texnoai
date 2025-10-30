const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Telegram Bot Setup
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID; // @texnoai_channel yoki -100xxxxxxxxxx

console.log('🤖 TexnoAI Telegram Bot ishga tushdi!');

// Bot Commands
const commands = {
  start: `🎉 *Xush kelibsiz!*

TexnoAI - zamonaviy IT yechimlari!

💡 *Xizmatlarimiz:*
• Veb-sayt yaratish
• Telegram bot yaratish
• AI Chatbot
• Dizayn xizmatlari
• SEO va Marketing

📝 Buyruqlar:
/narx - Narxlar
/xizmatlar - Xizmatlar ro'yxati
/portfolio - Bizning ishlar
/aloqa - Bog'lanish

Savollaringiz bo'lsa, yozing! 👇`,

  narx: `💰 *Xizmatlar narxlari*

🌐 *Veb-sayt yaratish:*
• Oddiy sayt: 100$ dan
• Korporativ: 300$ dan
• E-commerce: 500$ dan

🤖 *Telegram Bot:*
• Oddiy bot: 50$ dan
• E-commerce bot: 300$ dan
• Support bot: 100$ dan

💬 *AI Chatbot:*
• Oddiy chatbot: 100$ dan
• AI integratsiya: +150$

🎨 *Dizayn:*
• Logo: 30$ dan
• Brending: 50$ dan

📞 *Batafsil ma'lumot uchun:*
☎️ +998 97 477 12 29
📧 info@texnoai.uz`,

  xizmatlar: `🎯 *Bizning xizmatlar*

🌐 *Veb-dasturlash:*
✅ Corporate websites
✅ E-commerce platforms
✅ Landing pages
✅ Web applications
✅ PWA (Progressive Web Apps)

🤖 *Bot va AI:*
✅ Telegram botlar
✅ AI Chatbot
✅ Voice assistants
✅ Automation tools

🎨 *Dizayn:*
✅ UI/UX dizayn
✅ Logo va brending
✅ Grafik dizayn
✅ 3D vizualizatsiya

📈 *Marketing:*
✅ SEO optimizatsiya
✅ SMM (Social Media)
✅ Content marketing
✅ Email marketing

🔧 *Qo'shimcha:*
✅ 24/7 Texnik yordam
✅ Hosting va domen
✅ Maintenance
✅ Training

📞 *Buyurtma berish:*
☎️ +998 97 477 12 29
📧 info@texnoai.uz
🌐 texnoai.uz`,

  portfolio: `📊 *Portfolio*

✨ *Bizning ishlarimiz:*

🏢 *50+ Muvaffaqiyatli loyiha*
👥 *30+ Xursand mijozlar*
⭐ *98% Mamnunlik darajasi*

🔗 *Portfolio ko'rish:*
🌐 texnoai.uz/portfolio

💼 *So'nggi loyihalar:*
• E-commerce platform (React + Node.js)
• Telegram bot (Payment integration)
• AI Chatbot (Gemini AI)
• Corporate website (Next.js)
• Mobile app (React Native)

📸 *Screenshot'lar va batafsil:*
🌐 texnoai.uz

📞 *Loyiha boshlash:*
☎️ +998 97 477 12 29`,

  aloqa: `📞 *Biz bilan bog'lanish*

☎️ *Telefon:*
+998 97 477 12 29
+998 99 644 84 44 

📧 *Email:*
info@texnoai.uz
support@texnoai.uz

💬 *Telegram:*
@texnoai_uz
@texnoai_support

🌐 *Website:*
texnoai.uz

📍 *Manzil:*
Toshkent, O'zbekiston
Olmazor tumani 

⏰ *Ish vaqti:*
Dushanba - Juma: 9:00 - 18:00
Shanba: 9:00 - 14:00
Yakshanba: Dam olish

💡 *Online konsultatsiya:*
Saytdagi chatbot orqali 24/7`
};

// Bot Message Handler
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase() || '';

  console.log(`📩 Yangi xabar: ${msg.from?.first_name} - ${msg.text}`);

  // Commands
  if (text === '/start') {
    await bot.sendMessage(chatId, commands.start, { parse_mode: 'Markdown' });
  } else if (text === '/narx' || text.includes('narx')) {
    await bot.sendMessage(chatId, commands.narx, { parse_mode: 'Markdown' });
  } else if (text === '/xizmatlar' || text.includes('xizmat')) {
    await bot.sendMessage(chatId, commands.xizmatlar, { parse_mode: 'Markdown' });
  } else if (text === '/portfolio') {
    await bot.sendMessage(chatId, commands.portfolio, { parse_mode: 'Markdown' });
  } else if (text === '/aloqa' || text.includes('aloqa') || text.includes('telefon')) {
    await bot.sendMessage(chatId, commands.aloqa, { parse_mode: 'Markdown' });
  } else if (text.includes('salom') || text.includes('hello')) {
    await bot.sendMessage(chatId, "Assalomu alaykum! 👋\n\n/start - Boshlanish\n/yordam - Yordam");
  } else if (text === '/yordam' || text === '/help') {
    await bot.sendMessage(chatId, `📚 *Yordam*

Buyruqlar:
/start - Boshlanish
/narx - Narxlar
/xizmatlar - Xizmatlar
/portfolio - Portfolio
/aloqa - Bog'lanish

Savol yoki takliflaringiz bo'lsa, to'g'ridan-to'g'ri yozing!`, { parse_mode: 'Markdown' });
  } else {
    // Generic response
    await bot.sendMessage(chatId, 
      `Savolingiz uchun rahmat! 😊\n\nBuyruqlar:\n/narx - Narxlar\n/xizmatlar - Xizmatlar\n/aloqa - Bog'lanish\n\nYoki to'g'ridan-to'g'ri savol bering!`
    );
  }
});

// Helper function to clean text for Telegram
const cleanTextForTelegram = (text) => {
  if (!text) return '';
  // Remove HTML tags
  let cleaned = text.replace(/<[^>]*>/g, '');
  // Replace smart quotes with regular quotes
  cleaned = cleaned.replace(/['']/g, "'");
  cleaned = cleaned.replace(/[""]/g, '"');
  // Remove any other problematic characters
  cleaned = cleaned.replace(/[^\x00-\x7F]/g, (char) => {
    // Keep only safe Unicode characters
    const safe = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяўқғҳАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯЎҚҒҲ ";
    return safe.includes(char) ? char : '';
  });
  return cleaned.trim();
};

// API endpoint to post to channel
app.post('/api/post-to-channel', async (req, res) => {
  try {
    const { title, excerpt, tags, date, url, imageUrl } = req.body;

    if (!CHANNEL_ID) {
      return res.status(400).json({ error: 'TELEGRAM_CHANNEL_ID is not configured' });
    }

    // Format caption with cleaned text
    const cleanTitle = cleanTextForTelegram(title);
    const cleanExcerpt = cleanTextForTelegram(excerpt);
    const cleanTags = tags.map(tag => cleanTextForTelegram(tag));
    
    const caption = `
📝 ${cleanTitle}

${cleanExcerpt}

🏷️ #${cleanTags.join(' #')}
📅 ${new Date(date).toLocaleDateString('uz-UZ')}

🔗 Batafsil:
${url}

@texnoaikanal
    `.trim();

    // Send photo with caption to channel
    const result = await bot.sendPhoto(CHANNEL_ID, imageUrl, {
      caption: caption,
      parse_mode: undefined
    });

    console.log('✅ Kanalga post (rasm bilan) yuborildi:', title);

    res.json({ 
      success: true, 
      message: 'Post successfully sent to channel',
      messageId: result.message_id
    });

  } catch (error) {
    console.error('❌ Kanalga yuborishda xato:', error);
    res.status(500).json({ 
      error: 'Failed to send post to channel',
      details: error.message 
    });
  }
});

// API endpoint for contact form notifications
app.post('/api/contact-notification', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Admin telegram ID (env yoki hardcode)
    const ADMIN_CHAT_ID = process.env.ADMIN_TELEGRAM_ID || ''; // Admin'ning telegram user ID

    if (!ADMIN_CHAT_ID) {
      console.warn('⚠️ ADMIN_TELEGRAM_ID sozlanmagan!');
      // Fallback: faqat console'ga yozish
      console.log('📩 Yangi kontakt:', { name, email, phone, message });
      return res.json({ success: true, message: 'Message received (no admin notification)' });
    }

    const notificationText = `
🔔 *Yangi kontakt xabar!*

👤 *Ism:* ${cleanTextForTelegram(name)}
📧 *Email:* ${email}
📱 *Telefon:* ${phone}

💬 *Xabar:*
${cleanTextForTelegram(message)}

⏰ ${new Date().toLocaleString('uz-UZ')}
    `.trim();

    // Admin'ga xabar yuborish
    await bot.sendMessage(ADMIN_CHAT_ID, notificationText, { 
      parse_mode: 'Markdown' 
    });

    console.log('✅ Admin ga xabar yuborildi:', name);

    res.json({ 
      success: true, 
      message: 'Contact notification sent to admin'
    });

  } catch (error) {
    console.error('❌ Contact notification xatosi:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: error.message 
    });
  }
});

// API endpoint to send custom message
app.post('/api/send-message', async (req, res) => {
  try {
    const { chatId, text, parseMode = 'Markdown' } = req.body;

    const result = await bot.sendMessage(chatId, text, { 
      parse_mode: parseMode 
    });

    res.json({ 
      success: true, 
      messageId: result.message_id 
    });

  } catch (error) {
    console.error('❌ Xabar yuborishda xato:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    bot: 'running',
    timestamp: new Date().toISOString()
  });
});

// Get bot info
app.get('/api/bot-info', async (req, res) => {
  try {
    const me = await bot.getMe();
    res.json({ 
      success: true, 
      bot: me 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get bot info',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`📡 Bot API: http://localhost:${PORT}/api`);
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('❌ Polling xato:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
});
