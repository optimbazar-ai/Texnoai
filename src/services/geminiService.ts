import { GoogleGenerativeAI } from '@google/generative-ai';
import { NewsArticle, BlogPost, Recommendation } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('GEMINI_API_KEY topilmadi. AI funksiyalari ishlamaydi.');
}

const ai = new GoogleGenerativeAI(API_KEY);
const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateAIResponse = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text() || 'Javob olinmadi';
  } catch (error) {
    console.error('AI response error:', error);
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
  const prompt = `Generate a blog post about "${topic}" in Uzbek. Include title, excerpt, and full HTML content. The content should have proper headings, paragraphs, and lists. Return as JSON with: title, excerpt, content (HTML string)`;
  
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      const parsed = JSON.parse(text);
      return {
        id: Date.now().toString(),
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=600&h=400&fit=crop`,
        date: new Date().toISOString().split('T')[0],
        readTime: '5 daqiqa',
        tags: ['AI', 'Texnologiya']
      };
    } catch {
      return {
        id: Date.now().toString(),
        title: topic,
        excerpt: `${topic} haqida maqola`,
        content: `<h2>${topic}</h2><p>${topic} haqida to'liq maqola.</p>`,
        imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=600&h=400&fit=crop`,
        date: new Date().toISOString().split('T')[0],
        readTime: '5 daqiqa',
        tags: ['AI', 'Texnologiya']
      };
    }
  } catch (error) {
    console.error('Blog generation error:', error);
    throw new Error('Blog post yaratishda xatolik');
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
