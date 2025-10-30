import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PortfolioItem } from '../types';
import { getPortfolioItem } from '../data/portfolioData';
import SEO from './SEO';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (id) {
      const portfolioItem = getPortfolioItem(id);
      if (portfolioItem) {
        setItem(portfolioItem);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        data={{
          title: `${item.title} - TexnoAI Portfolio`,
          description: item.description,
          keywords: ['portfolio', 'texnoai', ...item.tags],
          image: item.imageUrl,
          url: window.location.href
        }}
      />
      
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-brand-primary hover:text-brand-primary/80 transition-colors duration-300 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Orqaga qaytish
          </button>

          <div className="glass-card overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {item.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-8">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-xl text-dark-subtext leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.features && item.features.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Asosiy <span className="text-brand-primary">imkoniyatlar</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-dark-bg rounded-lg"
                      >
                        <svg
                          className="w-6 h-6 text-brand-secondary mr-3 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-dark-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.demoUrl && item.demoUrl !== '#' && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Demo ko'rish
                  </h2>
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center"
                  >
                    Demo ni ochish
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              <div className="border-t border-gray-700 pt-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Qiziqtirdimi?
                </h2>
                <p className="text-dark-subtext mb-6">
                  Sizning loyihangiz uchun ham shunday yechim yaratishimiz mumkin. 
                  Biz bilan bog'laning va bepul konsultatsiya oling.
                </p>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="btn-primary"
                >
                  Bog'lanish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioDetail;
