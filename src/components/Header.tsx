import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Bosh sahifa', href: '#hero' },
    { name: 'Biz haqimizda', href: '#about' },
    { name: 'Xizmatlar', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Demolar', href: '#demos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Aloqa', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/95 backdrop-blur-md border-b border-gray-700/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-white">TexnoAI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className="text-dark-subtext hover:text-brand-primary transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-1 bg-dark-card/95 backdrop-blur-md rounded-lg p-4 border border-gray-700/50">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className="block w-full text-left py-3 px-4 text-dark-text hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
