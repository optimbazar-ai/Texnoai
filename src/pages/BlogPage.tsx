import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogData } from '../data/blogData';
import SEO from '../components/SEO';

const BlogPage: React.FC = () => {
  const [blogPosts] = useState<BlogPost[]>(getBlogData());
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Barcha tag'larni olish
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags || [])));

  // Filtrlangan postlar
  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Blog - TexnoAI"
        description="Sun'iy intellekt, veb-dasturlash va texnologiyalar haqida foydali maqolalar. TexnoAI blog sahifasi."
      />
      
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              TexnoAI <span className="text-brand-primary">Blog</span>
            </h1>
            <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
              Sun'iy intellekt, veb-dasturlash va zamonaviy texnologiyalar haqida 
              foydali va qiziqarli maqolalar.
            </p>
          </div>

          {/* Search va Filter */}
          <div className="mb-12">
            <div className="glass-card p-6">
              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Maqola qidirish..."
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
                  Barchasi ({blogPosts.length})
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

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/20"
                >
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-dark-subtext mb-3">
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-dark-subtext mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-brand-secondary/20 text-brand-secondary rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 transition-colors duration-300"
                    >
                      Batafsil o'qish
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-dark-subtext">
                Hech qanday maqola topilmadi.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
