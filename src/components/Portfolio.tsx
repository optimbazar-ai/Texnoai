import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PortfolioItem } from '../types';
import { getPortfolioData } from '../data/portfolioData';

const Portfolio: React.FC = () => {
  const [portfolioItems] = useState<PortfolioItem[]>(getPortfolioData());
  const [showAll, setShowAll] = useState(false);

  // Asosiy sahifada faqat 6 ta ko'rsatish
  const INITIAL_DISPLAY_COUNT = 6;
  const displayedItems = showAll ? portfolioItems : portfolioItems.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section id="portfolio" className="py-20 bg-dark-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bizning <span className="text-brand-primary">portfolio</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Biz bajarayotgan loyihalarimiz. Har bir loyiha - bu bizning mahoratimiz 
            va tajribamizning namunasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/20"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-dark-subtext mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/portfolio/${item.id}`}
                  className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 transition-colors duration-300"
                >
                  Batafsil
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {portfolioItems.length > INITIAL_DISPLAY_COUNT && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="btn-secondary mr-4"
            >
              Ko'proq ko'rish ({portfolioItems.length - INITIAL_DISPLAY_COUNT}+ loyiha)
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="btn-secondary mr-4"
            >
              Kamroq ko'rish
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
          <Link
            to="/portfolio"
            className="btn-primary"
          >
            Barcha loyihalar
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
