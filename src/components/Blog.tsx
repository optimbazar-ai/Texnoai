import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogData } from '../data/blogData';

const Blog: React.FC = () => {
  const [blogPosts] = useState<BlogPost[]>(getBlogData());

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
          {blogPosts.map((post) => (
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
          <Link
            to="/#admin"
            className="btn-secondary"
          >
            Barcha maqolalarni ko'rish
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
