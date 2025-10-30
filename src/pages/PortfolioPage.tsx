import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PortfolioItem } from '../types';
import { getPortfolioData } from '../data/portfolioData';
import SEO from '../components/SEO';

const PortfolioPage: React.FC = () => {
  const [portfolioItems] = useState<PortfolioItem[]>(getPortfolioData());
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Barcha tag'larni olish
  const allTags = Array.from(new Set(portfolioItems.flatMap(item => item.tags)));

  // Filtrlangan portfolio
  const filteredItems = portfolioItems.filter(item => {
    const matchesTag = !selectedTag || item.tags.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Portfolio - TexnoAI"
        description="TexnoAI tomonidan bajarilgan loyihalar. Veb-saytlar, dasturlar va AI yechimlari."
      />
      
      <div className="min-h-screen pt-24 pb-20 bg-dark-card/50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Bizning <span className="text-brand-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
              Biz yaratgan loyihalar va echimlar. Har bir ish - bu bizning 
              tajribamiz va professionalligimizning natijasi.
            </p>
          </div>

          {/* Search va Filter */}
          <div className="mb-12">
            <div className="glass-card p-6">
              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Loyiha qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Tags Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !selectedTag
                      ? 'bg-brand-primary text-white'
                      : 'bg-dark-bg text-dark-subtext hover:bg-dark-card'
                  }`}
                >
                  Barchasi ({portfolioItems.length})
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-brand-primary text-white'
                        : 'bg-dark-bg text-dark-subtext hover:bg-dark-card'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
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
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-dark-subtext">
                Hech qanday loyiha topilmadi.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
