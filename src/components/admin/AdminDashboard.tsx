import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, clearSession, isAuthenticated } from '../../utils/sessionManager';
import { getPortfolioData } from '../../data/portfolioData';
import { getBlogData } from '../../data/blogData';
import AutoPostSettings from './AutoPostSettings';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin');
      return;
    }

    setPortfolioCount(getPortfolioData().length);
    setBlogCount(getBlogData().length);
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate('/admin');
  };

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: 'Portfolio loyihalari',
      value: portfolioCount,
      icon: '📁',
      color: 'bg-brand-primary/20 text-brand-primary'
    },
    {
      title: 'Blog maqolalari',
      value: blogCount,
      icon: '📝',
      color: 'bg-brand-secondary/20 text-brand-secondary'
    },
    {
      title: 'Admin foydalanuvchilar',
      value: 2,
      icon: '👥',
      color: 'bg-purple-500/20 text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="glass-card p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg">{user.username}</h3>
                <p className="text-dark-subtext text-sm capitalize">{user.role}</p>
              </div>

              <nav className="space-y-2">
                <button className="w-full px-4 py-3 bg-brand-primary text-white rounded-lg text-left font-medium">
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin/portfolio')}
                  className="w-full px-4 py-3 text-dark-subtext hover:text-white hover:bg-dark-bg rounded-lg text-left transition-colors duration-300"
                >
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
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-dark-subtext">
                Xush kelibsiz, {user.username}! Bu yerda tizim statistikasi ko'rsatilgan.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-subtext mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-lg ${stat.color} flex items-center justify-center text-3xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Tezkor amallar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/admin/portfolio')}
                  className="p-6 bg-dark-bg hover:bg-dark-bg/70 rounded-lg text-left transition-colors duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg">Portfolio boshqarish</h3>
                    <svg className="w-6 h-6 text-brand-primary group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-dark-subtext">
                    Portfolio loyihalarini qo'shish, tahrirlash va o'chirish
                  </p>
                </button>

                <button
                  onClick={() => navigate('/admin/blog')}
                  className="p-6 bg-dark-bg hover:bg-dark-bg/70 rounded-lg text-left transition-colors duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg">Blog boshqarish</h3>
                    <svg className="w-6 h-6 text-brand-secondary group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-dark-subtext">
                    Blog maqolalarini qo'shish, tahrirlash va o'chirish
                  </p>
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="p-6 bg-dark-bg hover:bg-dark-bg/70 rounded-lg text-left transition-colors duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg">Saytni ko'rish</h3>
                    <svg className="w-6 h-6 text-purple-500 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <p className="text-dark-subtext">
                    Bosh sahifaga o'tish va saytni ko'rish
                  </p>
                </button>

                <button
                  className="p-6 bg-dark-bg hover:bg-dark-bg/70 rounded-lg text-left transition-colors duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg">Sozlamalar</h3>
                    <svg className="w-6 h-6 text-gray-500 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-dark-subtext">
                    Tizim sozlamalari (Tez orada)
                  </p>
                </button>
              </div>
            </div>

            {/* Auto Post Settings */}
            <div className="mt-8">
              <AutoPostSettings />
            </div>

            {/* System Info */}
            <div className="glass-card p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Tizim ma'lumotlari
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark-subtext">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span>Versiya:</span>
                  <span className="text-white font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span>Sessiya muddati:</span>
                  <span className="text-white font-medium">8 soat</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span>Ro'l:</span>
                  <span className="text-white font-medium capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span>Email:</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
