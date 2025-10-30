import React, { useState } from 'react';
import { getRecommendations } from '../services/geminiService';
import { getPortfolioData } from '../data/portfolioData';
import { getBlogData } from '../data/blogData';
import { Recommendation } from '../types';

const AIAdvisor: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRecommendations = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    try {
      const portfolioItems = getPortfolioData();
      const blogPosts = getBlogData();
      const recs = await getRecommendations(userInput, portfolioItems, blogPosts);
      setRecommendations(recs);
    } catch (error) {
      console.error('Recommendations error:', error);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGetRecommendations();
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI <span className="text-brand-primary">Maslahatchi</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Sizning qiziqishlaringizga asosan AI sizga mos portfolio loyihalari va maqolalarni tavsiya qiladi.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8">
            <div className="mb-6">
              <label htmlFor="advisor-input" className="block text-white font-semibold mb-3">
                Siz qanday yechim izlayapsiz?
              </label>
              <textarea
                id="advisor-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Masalan: E-commerce veb-sayt yaratish, Telegram bot, AI chatbot..."
                className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors duration-300 resize-none"
                rows={4}
              />
            </div>

            <button
              onClick={handleGetRecommendations}
              disabled={isLoading || !userInput.trim()}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Tavsiyalar olinmoqda...' : 'Tavsiyalar olish'}
            </button>
          </div>

          {recommendations.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">
                Siz uchun tavsiyalar:
              </h3>
              {recommendations.map((rec, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rec.type === 'portfolio' 
                            ? 'bg-brand-primary/20 text-brand-primary' 
                            : 'bg-brand-secondary/20 text-brand-secondary'
                        }`}>
                          {rec.type === 'portfolio' ? 'Portfolio' : 'Blog'}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {rec.title}
                      </h4>
                      <p className="text-dark-subtext">
                        {rec.reason}
                      </p>
                    </div>
                    <button
                      className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                        rec.type === 'portfolio'
                          ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                          : 'bg-brand-secondary text-white hover:bg-brand-secondary/90'
                      }`}
                    >
                      Ko'rish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {recommendations.length === 0 && !isLoading && userInput.trim() && (
            <div className="mt-8 glass-card p-6 text-center">
              <p className="text-dark-subtext">
                Hozircha tavsiyalar topilmadi. Iltimos, boshqa so'rov bilan urinib ko'ring.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
