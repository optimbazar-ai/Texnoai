import { generateBlogPost } from './geminiService';
import { getBlogData, saveBlogData } from '../data/blogData';
import { BlogPost } from '../types';

// Har kuni qo'shiladigan mavzular ro'yxati (sohalarga bo'lingan)
const topics = {
  ai_tech: [
    "Sun'iy intellekt va mashinali o'rganish asoslari",
    "ChatGPT va GPT-4: Yangiliklar va imkoniyatlar",
    "AI biznes jarayonlarida: Qo'llanish misollari",
    "Neural tarmoqlar va chuqur o'rganish",
    "Computer Vision: Tasvirlarni tahlil qilish",
    "Natural Language Processing (NLP) asoslari",
    "AI va Big Data: Ma'lumotlarni qayta ishlash",
    "Machine Learning algoritmlari: Tasnif va regressiya"
  ],
  web_dev: [
    "React 19: Yangi xususiyatlar va yaxshilanishlar",
    "TypeScript bilan zamonaviy veb-dasturlash",
    "Responsive dizayn: Mobile-first yondashuv",
    "Web performance optimizatsiya usullari",
    "Progressive Web Apps (PWA) yaratish",
    "API dizayni va RESTful best practices",
    "Frontend Security: XSS va CSRF himoyasi",
    "Veb-sayt SEO optimizatsiya strategiyalari"
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
  telegram: [
    "Telegram botlar: Biznes uchun foydalanish",
    "Telegram Marketing: Kanal va guruhlar strategiyasi",
    "Telegram bot yaratish: Step-by-step qo'llanma",
    "Telegram Mini Apps: Yangi imkoniyatlar",
    "Telegram to'lov tizimlari integratsiyasi",
    "Telegram avtomatlashtirish: Bot va API",
    "Telegram biznes hisobi: Imkoniyatlar va sozlamalar",
    "Telegram statistika va tahlil vositalari"
  ],
  automation: [
    "Biznes jarayonlarini avtomatlashtirish yo'llari",
    "No-code/Low-code platformalar: Zapier, Make, n8n",
    "Workflow automation: Asosiy tamoyillar",
    "RPA (Robotic Process Automation) texnologiyasi",
    "Marketing automation: Vositalar va strategiyalar",
    "Avtomatik hisobotlar yaratish tizimlari",
    "AI-powered automation: Kelajak shu yerda",
    "DevOps va CI/CD: Deployment avtomatlashtiruvi"
  ],
  uzbekistan: [
    "O'zbekistonda IT biznes: Imkoniyatlar va qiyinchiliklar",
    "Toshkentdagi texnoparklarlar va startup ekotizimi",
    "O'zbekiston raqamli iqtisodiyot: Istiqbollar",
    "Mahalliy IT kompaniyalar: Muvaffaqiyat tarixi",
    "Freelancing O'zbekistonda: Qanday boshlash",
    "IT ta'lim O'zbekistonda: Universitetlar va kurslar",
    "E-government: O'zbekistonda raqamli xizmatlar",
    "IT sohasida ish topish: O'zbek bozori"
  ]
};

// Haftaning qaysi kunida qaysi soha (har kuni 1-2 soha)
const dailyTopics = {
  0: ['ai_tech', 'web_dev'], // Yakshanba
  1: ['business', 'telegram'], // Dushanba
  2: ['automation', 'uzbekistan'], // Seshanba
  3: ['ai_tech', 'business'], // Chorshanba
  4: ['web_dev', 'automation'], // Payshanba
  5: ['telegram', 'uzbekistan'], // Juma
  6: ['ai_tech', 'web_dev'] // Shanba
};

interface SchedulerConfig {
  enabled: boolean;
  dailyPostCount: number;
  startTime: string; // Format: "HH:MM" (24-hour)
  endTime: string; // Format: "HH:MM" (24-hour)
  lastRunDate: string;
  postsCreatedToday: number;
}

const DEFAULT_CONFIG: SchedulerConfig = {
  enabled: true,
  dailyPostCount: 8,
  startTime: "09:00",
  endTime: "21:00",
  lastRunDate: "",
  postsCreatedToday: 0
};

// LocalStorage'dan sozlamalarni olish
const getConfig = (): SchedulerConfig => {
  const saved = localStorage.getItem('autoPostConfig');
  return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
};

// Sozlamalarni saqlash
const saveConfig = (config: SchedulerConfig): void => {
  localStorage.setItem('autoPostConfig', JSON.stringify(config));
};

// Bugungi kun uchun mavzularni tanlash
const getTodayTopics = (count: number): string[] => {
  const today = new Date().getDay();
  const categories = dailyTopics[today as keyof typeof dailyTopics];
  
  const selectedTopics: string[] = [];
  const allTopics: string[] = [];
  
  // Tanlangan kategoriyalardan barcha mavzularni yig'ish
  categories.forEach(category => {
    allTopics.push(...topics[category as keyof typeof topics]);
  });
  
  // Random tanlash
  const shuffled = allTopics.sort(() => Math.random() - 0.5);
  selectedTopics.push(...shuffled.slice(0, count));
  
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
        ...post.tags,
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
