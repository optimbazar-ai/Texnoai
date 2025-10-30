import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { generateNewsArticles } from '../services/geminiService';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

  const canFetch = () => {
    if (!lastFetchTime) return true;
    const oneHour = 60 * 60 * 1000;
    return Date.now() - lastFetchTime > oneHour;
  };

  const fetchNews = async () => {
    if (!canFetch()) {
      alert('Yangiliklar har soatda bir marta yangilanadi. Iltimos, keyinroq urinib ko\'ring.');
      return;
    }

    setIsLoading(true);
    try {
      const articles = await generateNewsArticles();
      setNews(articles);
      const fetchTime = Date.now();
      setLastFetchTime(fetchTime);
      localStorage.setItem('news_cache', JSON.stringify({ articles, fetchTime }));
    } catch (error) {
      console.error('News fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem('news_cache');
    if (cached) {
      try {
        const { articles, fetchTime } = JSON.parse(cached);
        setNews(articles);
        setLastFetchTime(fetchTime);
      } catch (error) {
        console.error('Cache parse error:', error);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Bir soat avval';
    if (diffInHours < 24) return `${diffInHours} soat avval`;
    return date.toLocaleDateString('uz-UZ');
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bugungi <span className="text-brand-primary">yangiliklar</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            AI va texnologiyalar bo'yicha so'nggi yangiliklar. Google Search va AI orqali yangilangan.
          </p>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={fetchNews}
            disabled={isLoading || !canFetch()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Yuklanmoqda...' : 'Bugungi yangiliklar'}
          </button>
          {lastFetchTime && (
            <p className="text-dark-subtext mt-2 text-sm">
              Oxirgi yangilanish: {new Date(lastFetchTime).toLocaleTimeString('uz-UZ')}
            </p>
          )}
        </div>

        {news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {news.map((article) => (
              <article key={article.id} className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-sm">
                    {article.source}
                  </span>
                  <time className="text-dark-subtext text-sm">
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-dark-subtext mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 transition-colors duration-300"
                >
                  Batafsil o'qish
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        )}

        {news.length === 0 && !isLoading && (
          <div className="glass-card p-12 text-center max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-dark-subtext mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-dark-subtext text-lg">
              Yangiliklar hali yuklanmagan. "Bugungi yangiliklar" tugmasini bosing.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
