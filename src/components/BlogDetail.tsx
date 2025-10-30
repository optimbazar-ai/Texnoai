import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogPost, getBlogData } from '../data/blogData';
import SEO from './SEO';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (id) {
      const blogPost = getBlogPost(id);
      if (blogPost) {
        setPost(blogPost);
        
        // Get related posts (excluding current post)
        const allPosts = getBlogData();
        const related = allPosts
          .filter((p) => p.id !== id)
          .slice(0, 3);
        setRelatedPosts(related);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = post?.title || '';
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (!post) {
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
          title: `${post.title} - TexnoAI Blog`,
          description: post.excerpt,
          keywords: ['blog', 'texnoai', ...(post.tags || [])],
          image: post.imageUrl,
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

          <article className="glass-card overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 text-dark-subtext mb-6">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readTime && (
                  <>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-brand-secondary/20 text-brand-secondary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose prose-invert prose-lg max-w-none mb-12">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <p className="text-xl text-dark-subtext leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-700 pt-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">Ulashing</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => shareOnSocial('facebook')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => shareOnSocial('twitter')}
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </button>
                  <button
                    onClick={() => shareOnSocial('linkedin')}
                    className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    O'xshash <span className="text-brand-primary">maqolalar</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <div
                        key={relatedPost.id}
                        onClick={() => navigate(`/blog/${relatedPost.id}`)}
                        className="bg-dark-bg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      >
                        <img
                          src={relatedPost.imageUrl}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="text-white font-semibold mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-dark-subtext text-sm">
                            {formatDate(relatedPost.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
