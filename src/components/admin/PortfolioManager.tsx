import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, hasRole, getCurrentUser, clearSession } from '../../utils/sessionManager';
import { PortfolioItem } from '../../types';
import { getPortfolioData, savePortfolioData } from '../../data/portfolioData';
import { postPortfolioToTelegram } from '../../services/telegramService';
import ImageUpload from './ImageUpload';

const PortfolioManager: React.FC = () => {
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: '',
    features: '',
    demoUrl: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin');
      return;
    }
    loadPortfolio();
  }, [navigate]);

  const loadPortfolio = () => {
    setPortfolioItems(getPortfolioData());
  };

  const handleLogout = () => {
    clearSession();
    navigate('/admin');
  };

  const handleAdd = () => {
    setIsEditing(true);
    setCurrentItem(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      tags: '',
      features: '',
      demoUrl: ''
    });
  };

  const handleEdit = (item: PortfolioItem) => {
    setIsEditing(true);
    setCurrentItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      tags: item.tags.join(', '),
      features: item.features?.join('\n') || '',
      demoUrl: item.demoUrl || ''
    });
  };

  const handleDelete = (id: string) => {
    const updated = portfolioItems.filter(item => item.id !== id);
    setPortfolioItems(updated);
    savePortfolioData(updated);
    setShowDeleteConfirm(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const item: PortfolioItem = {
      id: currentItem?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      features: formData.features.split('\n').map(f => f.trim()).filter(f => f),
      demoUrl: formData.demoUrl || '#'
    };

    let updated: PortfolioItem[];
    const isNewItem = !currentItem;
    
    if (currentItem) {
      updated = portfolioItems.map(i => i.id === currentItem.id ? item : i);
    } else {
      updated = [...portfolioItems, item];
    }

    setPortfolioItems(updated);
    savePortfolioData(updated);
    
    // Yangi portfolio Telegram'ga yuborish
    if (isNewItem) {
      console.log('📱 Telegram kanalga portfolio yuborilmoqda...');
      try {
        const result = await postPortfolioToTelegram(item);
        if (result.success) {
          console.log('✅ Portfolio Telegram kanalga yuborildi!');
        } else {
          console.warn('⚠️ Portfolio Telegram kanalga yuborilmadi:', result.error);
        }
      } catch (error) {
        console.error('❌ Telegram yuborishda xato:', error);
      }
    }
    
    setIsEditing(false);
    setCurrentItem(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentItem(null);
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
                <button className="w-full px-4 py-3 bg-brand-primary text-white rounded-lg text-left font-medium">
                  Portfolio
                </button>
                <button
                  onClick={() => navigate('/admin/blog')}
                  className="w-full px-4 py-3 text-dark-subtext hover:text-white hover:bg-dark-bg rounded-lg text-left transition-colors duration-300"
                >
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
                  Portfolio boshqarish
                </h1>
                <p className="text-dark-subtext">
                  Portfolio loyihalarini qo'shish, tahrirlash va o'chirish
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
                  {currentItem ? 'Portfolio tahrirlas' : 'Yangi portfolio qo\'shish'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Nomi *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                      placeholder="Portfolio nomi"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Tavsif *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary resize-none"
                      placeholder="Portfolio tavsifi"
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

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Teglar (vergul bilan ajratilgan)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                      placeholder="AI, Chatbot, Telegram"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Imkoniyatlar (har bir imkoniyatni yangi qatordan kiriting)
                    </label>
                    <textarea
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary resize-none"
                      placeholder="Imkoniyat 1&#10;Imkoniyat 2&#10;Imkoniyat 3"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Demo URL
                    </label>
                    <input
                      type="text"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                      placeholder="https://demo.example.com"
                    />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="glass-card overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-dark-subtext mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-brand-primary/20 text-brand-primary rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg transition-colors duration-300"
                        >
                          Tahrirlash
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-300"
                        >
                          O'chirish
                        </button>
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
              Haqiqatan ham bu portfolio elementini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
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

export default PortfolioManager;
