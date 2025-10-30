import { generateBlogPost } from './geminiService';
import { getBlogData, saveBlogData } from '../data/blogData';
import { BlogPost } from '../types';
import { postToTelegramChannel } from './telegramService';

// Har kuni qo'shiladigan mavzular ro'yxati (sohalarga bo'lingan)
const topics = {
  ai_news: [
    "OpenAI GPT-5: Kutilayotgan yangiliklar va imkoniyatlar",
    "Google Gemini 2.0: Yangi funksiyalar va o'zgarishlar",
    "Microsoft Copilot: AI yordamchi yangiliklari",
    "Claude 3.5 Sonnet: Anthropic'dan yangi model",
    "AI yangiliklari 2024: Eng muhim texnologik o'zgarishlar",
    "DeepMind AlphaFold 3: Tibbiyotda AI yangiliklari",
    "Midjourney V6: Rasm generatsiya qilishda yangi era",
    "Sora: OpenAI'dan video generatsiya vositasi"
  ],
  ai_prompts: [
    "ChatGPT uchun eng yaxshi promptlar to'plami",
    "Prompt engineering asoslari va best practices",
    "AI bilan samarali ishlash: 50+ foydali prompt",
    "Biznes uchun ChatGPT promptlari: Marketing va Sales",
    "Kreativ yozuvlar uchun AI promptlar",
    "Dasturlash uchun ChatGPT prompts: Code generation",
    "Tarjima va til o'rganish uchun AI promptlari",
    "Rasmlar yaratish: Midjourney va DALL-E promptlar"
  ],
  ai_trends: [
    "2024-yil AI trendlari: Nimalarga tayyor bo'lish kerak",
    "Multimodal AI: Matn, rasm va ovoz birgalikda",
    "AI Agents: Avtonom AI yordamchilar davri",
    "Edge AI: Qurilmalarda AI ishlatish trendi",
    "AI va etika: Javobgarlik masalalari",
    "Personalized AI: Har bir foydalanuvchi uchun maxsus",
    "AI in Education: Ta'limda sun'iy intellekt",
    "Generative AI: Kontent yaratishda yangi imkoniyatlar"
  ],
  ai_tools: [
    "Top 10 AI vositalari 2024: Har bir vazifa uchun",
    "ChatGPT alternativlari: Qaysi biri sizga mos?",
    "AI yozuv yordamchilari: Jasper, Copy.ai, Writesonic",
    "Dizayn uchun AI vositalari: Canva AI, Adobe Firefly",
    "Video montaj uchun AI: Descript, Runway, Pictory",
    "AI marketing vositalari: Avtomatlashtirish va tahlil",
    "Kod yozish uchun AI: GitHub Copilot, Cursor, Replit",
    "AI chatbotlar: Biznes uchun eng yaxshi yechimlar"
  ],
  business: [
    "Raqamli marketing strategiyalari 2024",
    "Startaplar uchun biznes model kanvasi",
    "E-commerce: Onlayn do'kon yuritish sirlari",
    "CRM tizimlari: Mijozlar bilan ishlash",
    "Biznesni avtomatlashtirish: Vositalar va yondashuvlar",
    "SMM strategiyalari: Ijtimoiy tarmoqlarda marketing",
    "Content Marketing: Samarali kontent yaratish",
    "Email marketing: Ro'yxat yaratish va konversiya"
  ],
  tech_tips: [
    "ChatGPT bilan daromad qilish: 10 ta real usul",
    "AI bilan kreativ kontent yaratish sirlari",
    "Telegram orqali pul topish: Bepul kurs va metodlar",
    "Freelancing 2024: AI vositalar bilan ishlash",
    "Instagram uchun AI-generated content yaratish",
    "YouTube shorts uchun AI video generatsiya",
    "AI bilan podcast yaratish: Asboblar va jarayonlar",
    "Online biznes uchun AI marketing strategiyalari"
  ],
  ai_cases: [
    "Real biznesda AI qo'llanishi: 15+ misol",
    "ChatGPT bilan biznes samaradorligini oshirish",
    "AI yordamida konversiya darajasini oshirish",
    "E-commerce'da AI: Mahsulot tavsiyalari",
    "AI chatbot: Mijozlar bilan ishlashni avtomatlashtirish",
    "Reklama kampaniyalarida AI analytics",
    "AI content generator: SMM uchun qo'llanma",
    "Logistikada AI: Marshrutlarni optimallashtirish"
  ],
  productivity: [
    "AI productivity hacks: Kunlik samaradorlikni oshirish",
    "Notion AI: Hujjatlar bilan ishlashni avtomatlashtirish",
    "Obsidian + AI: Bilimlarni boshqarish tizimi",
    "AI Email Assistant: Pochta bilan tezkor ishlash",
    "Calendar automation: Uchrashuv va vazifalarni rejalashtirish",
    "AI transcription: Audio va videoni matnга",
    "Focus apps: AI bilan chalg'itishsiz ishlash",
    "Personal AI assistant: Kundalik yordamchi"
  ]
};

// Haftaning qaysi kunida qaysi soha (har kuni 1-2 soha)
const dailyTopics = {
  0: ['ai_news', 'ai_prompts'], // Yakshanba - AI yangiliklari
  1: ['ai_trends', 'tech_tips'], // Dushanba - Trendlar va maslahatlar
  2: ['ai_tools', 'productivity'], // Seshanba - Vositalar va samaradorlik
  3: ['ai_cases', 'business'], // Chorshanba - Amaliy misollar
  4: ['ai_prompts', 'tech_tips'], // Payshanba - Promptlar va tips
  5: ['ai_news', 'ai_cases'], // Juma - Yangiliklar va case study
  6: ['ai_trends', 'ai_tools'] // Shanba - Trendlar va vositalar
};

interface SchedulerConfig {
  enabled: boolean;
  dailyPostCount: number;
  startTime: string; // Format: "HH:MM" (24-hour)
  endTime: string; // Format: "HH:MM" (24-hour)
  lastRunDate: string;
  postsCreatedToday: number;
  telegramEnabled: boolean; // Telegram kanalga yuborish
}

const DEFAULT_CONFIG: SchedulerConfig = {
  enabled: true,
  dailyPostCount: 8,
  startTime: "09:00",
  endTime: "21:00",
  lastRunDate: "",
  postsCreatedToday: 0,
  telegramEnabled: true
};

// LocalStorage'dan sozlamalarni olish
const getConfig = (): SchedulerConfig => {
  const saved = localStorage.getItem('autoPostConfig');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Default qiymatlar bilan birlashtirish (yangi maydonlar uchun)
    return { ...DEFAULT_CONFIG, ...parsed };
  }
  return DEFAULT_CONFIG;
};

// Sozlamalarni saqlash
const saveConfig = (config: SchedulerConfig): void => {
  localStorage.setItem('autoPostConfig', JSON.stringify(config));
};

// Ishlatilgan mavzularni olish
const getUsedTopics = (): string[] => {
  const saved = localStorage.getItem('usedTopics');
  return saved ? JSON.parse(saved) : [];
};

// Ishlatilgan mavzularni saqlash
const saveUsedTopic = (topic: string): void => {
  const used = getUsedTopics();
  if (!used.includes(topic)) {
    used.push(topic);
    localStorage.setItem('usedTopics', JSON.stringify(used));
  }
};

// Ishlatilgan mavzularni tozalash (haftalik yoki ular tugaganda)
const clearUsedTopics = (): void => {
  localStorage.removeItem('usedTopics');
  console.log('🔄 Ishlatilgan mavzular tozalandi');
};

// Bugungi kun uchun mavzularni tanlash (takrorlanmaslik uchun)
const getTodayTopics = (count: number): string[] => {
  const today = new Date().getDay();
  const categories = dailyTopics[today as keyof typeof dailyTopics];
  
  const selectedTopics: string[] = [];
  const allTopics: string[] = [];
  
  // Tanlangan kategoriyalardan barcha mavzularni yig'ish
  categories.forEach(category => {
    allTopics.push(...topics[category as keyof typeof topics]);
  });
  
  // Allaqachon ishlatilgan mavzularni filter qilish
  const usedTopics = getUsedTopics();
  const availableTopics = allTopics.filter(topic => !usedTopics.includes(topic));
  
  // Agar barcha mavzular ishlatilgan bo'lsa, tozalash va qayta boshlash
  if (availableTopics.length < count) {
    console.log('♻️ Barcha mavzular ishlatilgan, qayta boshlash...');
    clearUsedTopics();
    return getTodayTopics(count); // Recursive call
  }
  
  // Random tanlash (har doim yangi mavzular)
  const shuffled = availableTopics.sort(() => Math.random() - 0.5);
  selectedTopics.push(...shuffled.slice(0, count));
  
  // Tanlangan mavzularni "ishlatilgan" deb belgilash
  selectedTopics.forEach(topic => saveUsedTopic(topic));
  
  return selectedTopics;
};

// Bir post yaratish
const createSinglePost = async (topic: string): Promise<BlogPost | null> => {
  try {
    console.log(`📝 Post yaratilmoqda: "${topic}"`);
    const post = await generateBlogPost(topic);
    
    // SEO uchun qo'shimcha tag'lar qo'shish
    const enhancedPost: BlogPost = {
      ...post,
      tags: [
        ...(post.tags || []),
        'SEO',
        'TexnoAI',
        "O'zbekiston",
        new Date().getFullYear().toString()
      ]
    };
    
    return enhancedPost;
  } catch (error) {
    console.error(`❌ Post yaratishda xatolik: ${topic}`, error);
    return null;
  }
};

// Bitta post yaratish va hisoblagichni yangilash
const createSinglePostScheduled = async (): Promise<void> => {
  const config = getConfig();
  const topics = getTodayTopics(config.dailyPostCount);
  
  if (config.postsCreatedToday >= topics.length) {
    console.log('✅ Bugungi barcha postlar yaratilgan');
    return;
  }
  
  const topic = topics[config.postsCreatedToday];
  const existingPosts = getBlogData();
  
  console.log(`📝 Post ${config.postsCreatedToday + 1}/${topics.length} yaratilmoqda: "${topic}"`);
  
  const post = await createSinglePost(topic);
  
  if (post) {
    existingPosts.unshift(post);
    saveBlogData(existingPosts);
    
    config.postsCreatedToday++;
    saveConfig(config);
    
    console.log(`✅ Post muvaffaqiyatli yaratildi! (${config.postsCreatedToday}/${topics.length})`);
    
    // Telegram kanalga yuborish
    if (config.telegramEnabled) {
      console.log('📱 Telegram kanalga yuborilmoqda...');
      try {
        const telegramResult = await postToTelegramChannel(post);
        if (telegramResult.success) {
          console.log('✅ Telegram kanalga yuborildi!');
        } else {
          console.warn('⚠️ Telegram yuborishda muammo:', telegramResult.error);
        }
      } catch (error) {
        console.error('❌ Telegram xatosi:', error);
      }
    }
  }
};

// Bir nechta postlarni yaratish (manual test uchun)
const createMultiplePosts = async (count: number): Promise<void> => {
  const topics = getTodayTopics(count);
  const existingPosts = getBlogData();
  
  console.log(`🚀 ${count} ta post yaratish boshlandi...`);
  console.log(`📋 Mavzular:`, topics);
  
  let successCount = 0;
  
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const post = await createSinglePost(topic);
    
    if (post) {
      existingPosts.unshift(post);
      successCount++;
      
      // Har bir post orasida 3 soniya kutish (API rate limit)
      if (i < topics.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
  
  saveBlogData(existingPosts);
  console.log(`✅ ${successCount}/${count} ta post muvaffaqiyatli yaratildi!`);
};

// Vaqtni tekshirish va ishga tushirish
const checkAndRun = async (): Promise<void> => {
  const config = getConfig();
  
  if (!config.enabled) {
    console.log("⏸️ Auto-post scheduler o'chirilgan");
    return;
  }
  
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  // Yangi kun boshlanganmi? Hisoblagichni reset qilish
  if (config.lastRunDate !== today) {
    console.log('🌅 Yangi kun! Hisoblagichni qayta boshlash...');
    config.lastRunDate = today;
    config.postsCreatedToday = 0;
    saveConfig(config);
  }
  
  // Barcha postlar yaratilganmi?
  if (config.postsCreatedToday >= config.dailyPostCount) {
    console.log('✅ Bugungi barcha postlar yaratilgan');
    return;
  }
  
  // Vaqt oralig'ini tekshirish
  const [startHour, startMinute] = config.startTime.split(':').map(Number);
  const [endHour, endMinute] = config.endTime.split(':').map(Number);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const currentMinutes = currentHour * 60 + currentMinute;
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  // Vaqt oralig'idan tashqarida?
  if (currentMinutes < startMinutes || currentMinutes > endMinutes) {
    console.log(`⏰ Vaqt oralig'idan tashqarida. Ish vaqti: ${config.startTime} - ${config.endTime}`);
    return;
  }
  
  // Postlar orasidagi interval (daqiqalarda)
  const totalMinutes = endMinutes - startMinutes;
  const intervalMinutes = Math.floor(totalMinutes / config.dailyPostCount);
  
  // Keyingi post vaqtini hisoblash
  const nextPostMinutes = startMinutes + (config.postsCreatedToday * intervalMinutes);
  
  // Vaqt kelganmi?
  if (currentMinutes >= nextPostMinutes) {
    console.log(`🎯 Post ${config.postsCreatedToday + 1}/${config.dailyPostCount} uchun vaqt keldi!`);
    await createSinglePostScheduled();
  } else {
    const remainingMinutes = nextPostMinutes - currentMinutes;
    console.log(`⏳ Keyingi post ${remainingMinutes} daqiqadan keyin`);
  }
};

// Schedulerni ishga tushirish
export const startAutoPostScheduler = (): void => {
  console.log('🚀 Auto-post scheduler ishga tushdi');
  console.log("⏰ Postlar 09:00 - 21:00 oralig'ida avtomatik yaratiladi");
  
  // Darhol tekshirish
  checkAndRun();
  
  // Har 15 daqiqada tekshirish
  setInterval(checkAndRun, 15 * 60 * 1000);
};

// Manual ishga tushirish (test uchun)
export const manualGeneratePosts = async (count: number = 1): Promise<void> => {
  console.log(`🔧 Manual: ${count} ta post yaratilmoqda...`);
  await createMultiplePosts(count);
};

// Sozlamalarni yangilash
export const updateSchedulerConfig = (newConfig: Partial<SchedulerConfig>): void => {
  const config = getConfig();
  const updated = { ...config, ...newConfig };
  saveConfig(updated);
  console.log('⚙️ Scheduler sozlamalari yangilandi:', updated);
};

// Sozlamalarni olish
export const getSchedulerConfig = (): SchedulerConfig => {
  return getConfig();
};

// Ishlatilgan mavzularni tozalash (export for admin panel)
export const resetUsedTopics = (): void => {
  clearUsedTopics();
};

// Keyingi ishga tushirish vaqtini hisoblash
export const getNextRunTime = (): string => {
  const config = getConfig();
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  // Yangi kun?
  if (config.lastRunDate !== today || config.postsCreatedToday === 0) {
    // Bugun birinchi post
    const [hour, minute] = config.startTime.split(':').map(Number);
    const next = new Date(now);
    next.setHours(hour, minute, 0, 0);
    
    if (next <= now && config.lastRunDate === today) {
      // Boshlanish vaqti o'tgan, keyingi post vaqtini hisoblash
      const [startHour, startMinute] = config.startTime.split(':').map(Number);
      const [endHour, endMinute] = config.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      const totalMinutes = endMinutes - startMinutes;
      const intervalMinutes = Math.floor(totalMinutes / config.dailyPostCount);
      const nextPostMinutes = startMinutes + (config.postsCreatedToday * intervalMinutes);
      
      next.setHours(0, nextPostMinutes, 0, 0);
    }
    
    return next.toLocaleString('uz-UZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Barcha postlar yaratilgan
  if (config.postsCreatedToday >= config.dailyPostCount) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [hour, minute] = config.startTime.split(':').map(Number);
    tomorrow.setHours(hour, minute, 0, 0);
    
    return tomorrow.toLocaleString('uz-UZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Keyingi postni hisoblash
  const [startHour, startMinute] = config.startTime.split(':').map(Number);
  const [endHour, endMinute] = config.endTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  const totalMinutes = endMinutes - startMinutes;
  const intervalMinutes = Math.floor(totalMinutes / config.dailyPostCount);
  const nextPostMinutes = startMinutes + (config.postsCreatedToday * intervalMinutes);
  
  const next = new Date(now);
  next.setHours(0, nextPostMinutes, 0, 0);
  
  return next.toLocaleString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
