import { PortfolioItem } from '../types';

export const initialPortfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'AI Chatbot System',
    description: "Telegram va web platformalar uchun zamonaviy AI chatbot yechimi. Tabiiy tilni qayta ishlash, 24/7 ishlash va ko'plab tillarda qo'llab-quvvatlash.",
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
    tags: ['AI', 'Chatbot', 'Telegram', 'Web'],
    features: [
      'Tabiiy tilni qayta ishlash (NLP)',
      "Multi-platform qo'llab-quvvatlash",
      '24/7 avtomatik javob berish',
      "O'zbek tilida to'liq qo'llab-quvvatlash",
      'Analytics va reporting'
    ],
    demoUrl: '#'
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: "To'liq funksional online magazin platformasi. Mahsulotlarni boshqarish, to'lov tizimlari, buyurtmalarni kuzatish va boshqa ko'plab imkoniyatlar.",
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    tags: ['E-commerce', 'Web', 'Payment', 'Admin'],
    features: [
      'Mahsulot katalogi va filtrlar',
      "Xavfsiz to'lov tizimlari",
      'Buyurtmalarni boshqarish',
      'Mijozlar shaxsiy kabineti',
      'Analytics va hisobotlar'
    ],
    demoUrl: '#'
  },
  {
    id: '3',
    title: 'Corporate Website',
    description: "Professional korporativ veb-sayt. Kompaniya haqida ma'lumot, xizmatlar, jamoa, portfolio va aloqa bo'limlari bilan zamonaviy dizayn.",
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['Corporate', 'Website', 'Business', 'SEO'],
    features: [
      'Zamonaviy responsive dizayn',
      'SEO optimallashtirilgan',
      "Ko'p tilli qo'llab-quvvatlash",
      'Blog va yangiliklar',
      'Admin panel'
    ],
    demoUrl: '#'
  }
];

export const getPortfolioData = (): PortfolioItem[] => {
  const savedData = localStorage.getItem('portfolioData');
  return savedData ? JSON.parse(savedData) : initialPortfolioData;
};

export const savePortfolioData = (data: PortfolioItem[]): void => {
  localStorage.setItem('portfolioData', JSON.stringify(data));
};

export const getPortfolioItem = (id: string): PortfolioItem | undefined => {
  const data = getPortfolioData();
  return data.find(item => item.id === id);
};
