import { GoogleGenerativeAI } from '@google/generative-ai';
import { NewsArticle, BlogPost, Recommendation } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('GEMINI_API_KEY topilmadi. AI funksiyalari ishlamaydi.');
}

const ai = new GoogleGenerativeAI(API_KEY);
// Try different model names - gemini-1.5-pro is the latest stable version
const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });

export const generateAIResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    console.error('Gemini API key mavjud emas!');
    return 'AI xizmati hozirda mavjud emas. API key tekshiring.';
  }
  
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    if (!text) {
      throw new Error('Bo\'sh javob qaytdi');
    }
    return text;
  } catch (error: any) {
    console.error('AI response error:', error);
    console.error('Error details:', error.message);
    
    // Agar model topilmasa, sodda fallback javob qaytarish
    if (error.message?.includes('not found') || error.message?.includes('not supported')) {
      console.warn('Gemini model mavjud emas. Fallback javob ishlatilmoqda.');
      return 'AI xizmati hozirda mavjud emas. Model konfiguratsiyasini tekshiring.';
    }
    
    return "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
  }
};

export const generateImagePrompt = async (description: string): Promise<string> => {
  const prompt = `Create a detailed image generation prompt for: "${description}". Make it professional and detailed for AI image generation.`;
  return generateAIResponse(prompt);
};

export const summarizeText = async (text: string): Promise<string> => {
  const prompt = `Quyidagi matnni qisqartiring va asosiy g'oyalarni ajratib oling. Javobni o'zbek tilida bering:\n\n${text}`;
  return generateAIResponse(prompt);
};

export const translateText = async (text: string, targetLang: string): Promise<string> => {
  const prompt = `Translate the following text to ${targetLang}. Only provide the translation:\n\n${text}`;
  return generateAIResponse(prompt);
};

export const generateCode = async (task: string, language: string): Promise<string> => {
  const prompt = `Generate ${language} code for the following task. Provide clean, commented code:\n\n${task}`;
  return generateAIResponse(prompt);
};

export const generateJSON = async (description: string): Promise<string> => {
  const prompt = `Generate a valid JSON structure for: "${description}". Only provide the JSON, no explanations.`;
  return generateAIResponse(prompt);
};

export const generateNewsArticles = async (): Promise<NewsArticle[]> => {
  try {
    const prompt = 'Generate 3 recent AI and tech news articles with title, summary, source, and date. Return as JSON array with objects containing: id, title, summary, source, url, publishedAt';
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return [
        {
          id: '1',
          title: "AI texnologiyalari biznesni o'zgartirmoqda",
          summary: "Sun'iy intellekt korporativ sektorda inqilob qilmoqda",
          source: 'Tech News',
          url: '#',
          publishedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Yangi AI modellari taqdim etildi',
          summary: "Google va Microsoft yangi AI modellarini e'lon qildi",
          source: 'AI Daily',
          url: '#',
          publishedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Telegram botlarining yangi imkoniyatlari',
          summary: 'Telegram botlar endi AI bilan integratsiyalashishi mumkin',
          source: 'Dev Weekly',
          url: '#',
          publishedAt: new Date().toISOString()
        }
      ];
    }
  } catch (error) {
    console.error('News generation error:', error);
    return [];
  }
};

export const generateBlogPost = async (topic: string): Promise<BlogPost> => {
  const prompt = `O'zbek tilida "${topic}" mavzusida professional, batafsil blog maqola yozing.

TALABLAR:
1. Kamida 800-1000 so'z bo'lishi kerak
2. SEO-optimallashtirilgan bo'lishi kerak
3. O'quvchi uchun foydali va qiziqarli bo'lishi kerak
4. Professional va rasmiy uslubda yozilgan bo'lishi kerak

STRUKTURA:
- Kirish qismi (2-3 paragraf) - mavzuni tanishtirish
- Asosiy qism (5-7 bo'lim, har biri 2-3 paragraf)
  * Har bir bo'limda <h3> sarlavha
  * Misollar va konkret ma'lumotlar
  * Numbered yoki bulleted ro'yxatlar
- Xulosa qismi (2 paragraf) - asosiy fikrlarni jamlash

HTML FORMAT:
- <h2> asosiy sarlavhalar uchun
- <h3> kichik bo'limlar uchun  
- <p> paragraflar uchun
- <ul><li> yoki <ol><li> ro'yxatlar uchun
- <strong> muhim so'zlar uchun
- <em> ta'kidlash uchun

JSON formatda qaytaring:
{
  "title": "Qiziqarli va SEO-friendly sarlavha (60-70 belgi)",
  "excerpt": "Diqqatni tortadigan 150-200 belgili tavsif",
  "content": "To'liq HTML kontent (800+ so'z)"
}`;
  
  // Turli Unsplash rasm ID'lari (texnologiya mavzusida)
  const techImageIds = [
    '1677442136019-21780ecad995', // AI
    '1485827404512-c593b05f77c8', // Technology
    '1488590528505-98d2b5aba04b', // Laptop
    '1518770660439-4636190af475', // Code
    '1519389950473-47ba0277781c', // Technology
    '1451187580459-43b8c2f1c0d8', // Digital
    '1498050108023-c5ddc98e0d6d', // Computer
    '1484417894907-623942c8d8f9', // Innovation
    '1486312338219-ce68d2c6f44d', // Business
    '1504639725590-34d0984388bd'  // Tech workspace
  ];
  
  // Random rasm tanlash
  const randomImageId = techImageIds[Math.floor(Math.random() * techImageIds.length)];
  
  // Fallback post yaratish funksiyasi - batafsil va SEO-optimallashtirilgan
  const createFallbackPost = (): BlogPost => {
    return {
      id: Date.now().toString(),
      title: `${topic}: Zamonaviy Yondashuv va Amaliy Qo'llanmalar`,
      excerpt: `${topic} mavzusida chuqur tahlil. Zamonaviy texnologiyalar, xalqaro tajribalar va O'zbekistonda qo'llash imkoniyatlari haqida batafsil ma'lumot.`,
      content: `
        <h2>${topic} - Zamonaviy Ko'rinish</h2>
        
        <p>Bugungi kunda <strong>${topic}</strong> sohasi tez sur'atlar bilan rivojlanmoqda. Raqamli transformatsiya davrida bu texnologiyalar biznesni yuritish va ijtimoiy hayotni yaxshilashda muhim rol o'ynamoqda.</p>
        
        <p>Ushbu maqolada biz ${topic} ning asosiy jihatlarini, afzalliklarini va O'zbekiston sharoitida qo'llash imkoniyatlarini batafsil ko'rib chiqamiz.</p>

        <h3>1. Nima uchun ${topic} muhim?</h3>
        <p>Zamonaviy biznes muhitida raqobatbardoshlikni saqlash uchun innovatsion yechimlardan foydalanish zarur. ${topic} quyidagi imkoniyatlarni taqdim etadi:</p>
        <ul>
          <li><strong>Samaradorlikni oshirish:</strong> Jarayonlarni avtomatlashtirish va tezlashtirish</li>
          <li><strong>Xarajatlarni kamaytirish:</strong> Resurslardan optimal foydalanish</li>
          <li><strong>Sifatni yaxshilash:</strong> Xatoliklarni kamaytirish va natijalarni yaxshilash</li>
          <li><strong>Ma'lumotlarga asoslangan qarorlar:</strong> Analytics va sun'iy intellekt yordamida</li>
        </ul>

        <h3>2. Asosiy Komponentlar va Xususiyatlar</h3>
        <p>${topic} tizimining asosiy qismlari quyidagilardan iborat:</p>
        <ol>
          <li><strong>Texnologik infrastruktura</strong> - zamonaviy server va cloud yechimlar</li>
          <li><strong>Dasturiy ta'minot</strong> - moslashuvchan va kengaytiriladigan arxitektura</li>
          <li><strong>Ma'lumotlar bazasi</strong> - xavfsiz va tez ishlaydigan saqlash tizimlari</li>
          <li><strong>Foydalanuvchi interfeysi</strong> - qulay va intuitiv dizayn</li>
        </ol>

        <h3>3. Xalqaro Tajribalar</h3>
        <p>Dunyo bo'ylab yetakchi kompaniyalar ${topic} dan foydalanib yuqori natijalarga erishmoqdalar. Masalan:</p>
        <ul>
          <li>Silicon Valley startaplari 40% samaradorlikni oshirdilar</li>
          <li>Yevropaning yirik korxonalari xarajatlarni 30% kamaytirishga erishdilar</li>
          <li>Osiyo mamlakatlarida yangi biznes imkoniyatlari yaratilmoqda</li>
        </ul>

        <h3>4. O'zbekistonda Qo'llash Imkoniyatlari</h3>
        <p>O'zbekiston raqamli iqtisodiyotni rivojlantirish yo'lida katta qadamlar qo'ymoqda. ${topic} bizning mamlakatimiz uchun quyidagi imkoniyatlarni ochadi:</p>
        <ul>
          <li>Mahalliy bizneslarni modernizatsiya qilish</li>
          <li>Xalqaro bozorlarga chiqish uchun raqobatbardosh bo'lish</li>
          <li>Ish o'rinlarini yaratish va kadrlar tayyorlash</li>
          <li>Innovatsion ekosistemani rivojlantirish</li>
        </ul>

        <h3>5. Amaliy Maslahatlar</h3>
        <p>${topic} bilan ishlashni boshlash uchun quyidagi qadamlarni amalga oshiring:</p>
        <ol>
          <li>Maqsad va vazifalarni aniq belgilang</li>
          <li>Zarur resurslar va byudjetni hisoblang</li>
          <li>Professional jamoani to'plang yoki o'rganing</li>
          <li>Bosqichma-bosqich amalga oshirish rejasini tuzing</li>
          <li>Natijalarni doimiy monitoring qiling va tahlil qiling</li>
        </ol>

        <h3>6. Kelajak Istiqbollari</h3>
        <p>Texnologiyalar rivojlanishi bilan ${topic} yanada ko'proq imkoniyatlar ochadi. Yaqin kelajakda biz quyidagilarni kutishimiz mumkin:</p>
        <ul>
          <li><em>Sun'iy intellekt</em> integratsiyasi va avtomatlashtirish darajasining oshishi</li>
          <li><em>Cloud texnologiyalar</em>ning keng tarqalishi va arzonlashuvi</li>
          <li><em>IoT qurilmalar</em> bilan integratsiya va real-time analytics</li>
          <li><em>Blockchain</em> va xavfsizlik tizimlarining takomillashuvi</li>
        </ul>

        <h3>Xulosa</h3>
        <p><strong>${topic}</strong> - bu nafaqat texnologiya, balki biznes va jamiyatni o'zgartirish vositasi. To'g'ri yondashish va professionallik bilan bu sohada yuqori natijalarga erishish mumkin.</p>
        
        <p>TexnoAI jamoasi sifatida biz O'zbekiston korxonalari va tadbirkorlarga ${topic} ni amalga oshirishda yordam beramiz. Bizning tajribamiz va bilimlarimiz sizning muvaffaqiyatingiz uchun!</p>

        <p><em>Qo'shimcha ma'lumot va konsultatsiya uchun biz bilan bog'laning.</em></p>
      `,
      imageUrl: `https://images.unsplash.com/photo-${randomImageId}?w=800&h=500&fit=crop`,
      date: new Date().toISOString().split('T')[0],
      readTime: '8 daqiqa',
      tags: ['AI', 'Texnologiya', 'Innovatsiya', 'O\'zbekiston', 'Biznes', 'SEO']
    };
  };
  
  // Agar API key yo'q bo'lsa, darhol fallback qaytarish
  if (!API_KEY) {
    console.warn('API key yo\'q. Fallback post yaratilmoqda.');
    return createFallbackPost();
  }
  
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      const parsed = JSON.parse(text);
      // AI post uchun ham random rasm
      const aiImageId = techImageIds[Math.floor(Math.random() * techImageIds.length)];
      
      // So'z sonini hisoblash va o'qish vaqtini aniqlash
      const wordCount = parsed.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readTimeMinutes = Math.max(5, Math.ceil(wordCount / 200)); // 200 so'z/daqiqa
      
      return {
        id: Date.now().toString(),
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        imageUrl: `https://images.unsplash.com/photo-${aiImageId}?w=800&h=500&fit=crop`,
        date: new Date().toISOString().split('T')[0],
        readTime: `${readTimeMinutes} daqiqa`,
        tags: ['AI', 'Texnologiya', 'TexnoAI']
      };
    } catch {
      // JSON parse xatosi - fallback
      return createFallbackPost();
    }
  } catch (error) {
    console.error('Blog generation error:', error);
    console.warn('Gemini API xatosi. Fallback post yaratilmoqda.');
    // Xatolik bo'lsa ham, fallback post qaytarish (throw qilmaslik)
    return createFallbackPost();
  }
};

export const getRecommendations = async (
  userInput: string,
  portfolioItems: any[],
  blogPosts: any[]
): Promise<Recommendation[]> => {
  const prompt = `Based on user interest: "${userInput}", recommend relevant portfolio items and blog posts. Return as JSON array with objects containing: type ("portfolio" or "blog"), id, title, reason`;
  
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return [];
    }
  } catch (error) {
    console.error('Recommendations error:', error);
    return [];
  }
};
