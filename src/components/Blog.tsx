import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogData } from '../data/blogData';

const Blog: React.FC = () => {
  const [blogPosts] = useState<BlogPost[]>(getBlogData());
  const [showAll, setShowAll] = useState(false);

  // Asosiy sahifada faqat 6 ta ko'rsatish
  const INITIAL_DISPLAY_COUNT = 6;
  const displayedPosts = showAll ? blogPosts : blogPosts.slice(0, INITIAL_DISPLAY_COUNT);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bizning <span className="text-brand-primary">blog</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Sun'iy intellekt, veb-dasturlash va texnologiyalar haqida foydali maqolalar. 
            Bilimlarni yangilab, o'zishingizga yordam beramiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
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

        <div className="text-center mt-12">
          {blogPosts.length > INITIAL_DISPLAY_COUNT && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="btn-secondary mr-4"
            >
              Ko'proq ko'rish ({blogPosts.length - INITIAL_DISPLAY_COUNT}+ maqola)
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
            to="/blog"
            className="btn-primary"
          >
            Barcha maqolalar
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
