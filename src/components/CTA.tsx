import React from 'react';

const CTA: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loyihangizni <span className="text-brand-primary">boshlaymizmi?</span>
            </h2>
            
            <p className="text-xl text-dark-subtext mb-8 max-w-2xl mx-auto">
              Biznesingizni raqamli davrga olib chiqish vaqti keldi. 
              TexnoAI jamoasi sizning g'oyalaringizni hayotga tatbiq etishga tayyor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-lg px-8 py-4"
              >
                Bepul konsultatsiya
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="btn-secondary text-lg px-8 py-4"
              >
                Portfolio ko'rish
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Telefon</h3>
                <p className="text-dark-subtext">+998 90 123 45 67</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-dark-subtext">info@texnoai.uz</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Manzil</h3>
                <p className="text-dark-subtext">Toshkent, O'zbekiston</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
