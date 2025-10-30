import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, clearSession } from '../../utils/sessionManager';
import { BlogPost } from '../../types';
import { getBlogData, saveBlogData } from '../../data/blogData';
import { generateBlogPost } from '../../services/geminiService';
import ImageUpload from './ImageUpload';

const BlogManager: React.FC = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: '',
    readTime: '5 daqiqa'
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin');
      return;
    }
    loadBlog();
  }, [navigate]);

  const loadBlog = () => {
    setBlogPosts(getBlogData());
  };

  const handleLogout = () => {
    clearSession();
    navigate('/admin');
  };

  const handleAdd = () => {
    setIsEditing(true);
    setCurrentPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      tags: '',
      readTime: '5 daqiqa'
    });
  };

  const handleEdit = (post: BlogPost) => {
    setIsEditing(true);
    setCurrentPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || '',
      imageUrl: post.imageUrl,
      tags: post.tags?.join(', ') || '',
      readTime: post.readTime || '5 daqiqa'
    });
  };

  const handleDelete = (id: string) => {
    const updated = blogPosts.filter(post => post.id !== id);
    setBlogPosts(updated);
    saveBlogData(updated);
    setShowDeleteConfirm(null);
  };

  const handleGenerateWithAI = async () => {
    if (!formData.title) {
      alert('Iltimos, blog mavzusini kiriting');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedPost = await generateBlogPost(formData.title);
      setFormData({
        ...formData,
        title: generatedPost.title || formData.title,
        excerpt: generatedPost.excerpt || formData.excerpt,
        content: generatedPost.content || formData.content,
        imageUrl: generatedPost.imageUrl || formData.imageUrl
      });
    } catch (error) {
      alert("Blog yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const post: BlogPost = {
      id: currentPost?.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      date: currentPost?.date || new Date().toISOString().split('T')[0],
      readTime: formData.readTime,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    let updated: BlogPost[];
    if (currentPost) {
      updated = blogPosts.map(p => p.id === currentPost.id ? post : p);
    } else {
      updated = [post, ...blogPosts];
    }

    setBlogPosts(updated);
    saveBlogData(updated);
    setIsEditing(false);
    setCurrentPost(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPost(null);
  };

  const user = getCurrentUser();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="glass-card p-6 sticky top-24">
              {user && (
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">{user.username}</h3>
                  <p className="text-dark-subtext text-sm capitalize">{user.role}</p>
                </div>
              )}

              <nav className="space-y-2">
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="w-full px-4 py-3 text-dark-subtext hover:text-white hover:bg-dark-bg rounded-lg text-left transition-colors duration-300"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin/portfolio')}
                  className="w-full px-4 py-3 text-dark-subtext hover:text-white hover:bg-dark-bg rounded-lg text-left transition-colors duration-300"
                >
                  Portfolio
                </button>
                <button className="w-full px-4 py-3 bg-brand-primary text-white rounded-lg text-left font-medium">
                  Blog
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-4 py-3 text-dark-subtext hover:text-white hover:bg-dark-bg rounded-lg text-left transition-colors duration-300"
                >
                  Bosh sahifa
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-medium transition-colors duration-300"
                >
                  Chiqish
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Blog boshqarish
                </h1>
                <p className="text-dark-subtext">
                  Blog maqolalarini qo'shish, tahrirlash va o'chirish
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={handleAdd}
                  className="btn-primary flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Yangi qo'shish
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {currentPost ? 'Blog tahrirlas' : 'Yangi blog qo\'shish'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Sarlavha *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="flex-1 px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                        placeholder="Blog sarlavhasi"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateWithAI}
                        disabled={isGenerating}
                        className="px-6 py-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50"
                      >
                        {isGenerating ? 'Yaratilmoqda...' : 'AI yaratsin'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Qisqacha mazmun *
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary resize-none"
                      placeholder="Blog qisqacha matni"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      To'liq matn (HTML qo'llab-quvvatlanadi)
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary resize-none font-mono text-sm"
                      placeholder="<h2>Sarlavha</h2><p>Matn...</p>"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Rasm
                    </label>
                    <ImageUpload
                      onImageSelect={(base64) => setFormData({ ...formData, imageUrl: base64 })}
                      currentImage={formData.imageUrl}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Teglar (vergul bilan ajratilgan)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                        placeholder="AI, Texnologiya, Web"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        O'qish vaqti
                      </label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                        placeholder="5 daqiqa"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary">
                      Saqlash
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-300"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="glass-card p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center text-sm text-dark-subtext mb-2">
                          <time>{post.date}</time>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-dark-subtext mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 4).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-brand-secondary/20 text-brand-secondary rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg transition-colors duration-300"
                          >
                            Tahrirlash
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(post.id)}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-300"
                          >
                            O'chirish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">
              O'chirishni tasdiqlang
            </h3>
            <p className="text-dark-subtext mb-6">
              Haqiqatan ham bu blog maqolasini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                O'chirish
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
