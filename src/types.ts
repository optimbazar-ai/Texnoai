export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  features?: string[];
  demoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  date: string;
  readTime?: string;
  tags?: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor';
  email?: string;
}

export interface Session {
  user: User;
  expiresAt: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Recommendation {
  type: 'portfolio' | 'blog';
  id: string;
  title: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
}
