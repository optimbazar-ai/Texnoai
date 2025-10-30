import React from 'react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-20 md:pt-0">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-float leading-tight">
            <span className="text-brand-primary">TexnoAI</span> - 
            <br className="hidden sm:block" />
            <span className="block mt-2">Sun'iy Intellekt</span>
            <span className="block">Yechimlari</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-dark-subtext mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Gemini AI texnologiyasi asosida zamonaviy biznes yechimlari. 
            Veb-saytlar, Telegram botlar, AI chatbotlar va boshqa ko'plab xizmatlar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Boshlaymiz
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Portfolio
            </button>
          </div>
          
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
            <div className="glass-card p-6 text-center animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Web Development</h3>
              <p className="text-dark-subtext text-sm">Zamonaviy veb-saytlar va web ilovalar</p>
            </div>
            
            <div className="glass-card p-6 text-center animate-float" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">AI Chatbots</h3>
              <p className="text-dark-subtext text-sm">Aqlli chatbotlar va virtual yordamchilar</p>
            </div>
            
            <div className="glass-card p-6 text-center animate-float" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Automation</h3>
              <p className="text-dark-subtext text-sm">Biznes jarayonlarini avtomatlashtirish</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
