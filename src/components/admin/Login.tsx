import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../../utils/sessionManager';
import { User } from '../../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const users: { [key: string]: User } = {
    admin: {
      id: '1',
      username: 'admin',
      role: 'admin',
      email: 'admin@texnoai.uz'
    },
    editor: {
      id: '2',
      username: 'editor',
      role: 'editor',
      email: 'editor@texnoai.uz'
    }
  };

  const passwords: { [key: string]: string } = {
    admin: 'admin123',
    editor: 'editor123'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (users[username] && passwords[username] === password) {
        createSession(users[username]);
        navigate('/admin/dashboard');
      } else {
        setError("Login yoki parol noto'g'ri");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 gradient-bg opacity-20"></div>
      
      <div className="glass-card p-8 md:p-12 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-dark-subtext">TexnoAI boshqaruv paneli</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-white font-medium mb-2">
              Login
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors duration-300"
              placeholder="admin yoki editor"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white font-medium mb-2">
              Parol
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors duration-300"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Kirish...' : 'Kirish'}
          </button>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-dark-subtext text-sm text-center mb-2">
              Demo hisoblar:
            </p>
            <div className="space-y-1 text-sm text-dark-subtext">
              <p>👤 Admin: admin / admin123</p>
              <p>👤 Editor: editor / editor123</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full text-brand-primary hover:text-brand-primary/80 transition-colors duration-300"
          >
            Bosh sahifaga qaytish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
