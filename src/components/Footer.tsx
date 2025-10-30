import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: 'f', url: '#' },
    { name: 'Twitter', icon: '𝕏', url: '#' },
    { name: 'LinkedIn', icon: 'in', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Telegram', icon: '✈️', url: '#' }
  ];

  const navLinks = [
    { name: 'Bosh sahifa', href: '#hero' },
    { name: 'Biz haqimizda', href: '#about' },
    { name: 'Xizmatlar', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Demolar', href: '#demos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Aloqa', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-card border-t border-gray-700/50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-white">TexnoAI</span>
            </div>
            <p className="text-dark-subtext mb-4 max-w-md">
              Biz sun'iy intellekt asosidagi zamonaviy yechimlar yaratamiz. 
              Biznesingizni raqamli davrga olib chiqamiz va innovatsion texnologiyalar 
              orqali o'sishga yordam beramiz.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-dark-bg rounded-full flex items-center justify-center text-dark-subtext hover:text-brand-primary transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="text-dark-subtext hover:text-brand-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Aloqa</h3>
            <div className="space-y-2">
              <p className="text-dark-subtext">
                <span className="block font-medium text-white">Telefon:</span>
                +998 90 123 45 67
              </p>
              <p className="text-dark-subtext">
                <span className="block font-medium text-white">Email:</span>
                info@texnoai.uz
              </p>
              <p className="text-dark-subtext">
                <span className="block font-medium text-white">Manzil:</span>
                Toshkent, O'zbekiston
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
          <p className="text-dark-subtext">
            © {currentYear} TexnoAI. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
