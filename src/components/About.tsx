import React from 'react';

const About: React.FC = () => {
  const stats = [
    { number: '50+', label: 'Loyihalar' },
    { number: '30+', label: 'Mijozlar' },
    { number: '98%', label: 'Muvaffaqiyat' }
  ];

  const features = [
    {
      icon: '👥',
      title: 'Tajriba',
      description: "Professional jamoa ko'p yillik tajribaga ega. Zamonaviy texnologiyalar va eng yaxshi amaliyotlardan foydalanamiz."
    },
    {
      icon: '🚀',
      title: 'Innovatsiya',
      description: "Eng so'nggi texnologiyalardan foydalanamiz. AI va avtomatlashtirish sohasida doimiy rivojlanamiz."
    },
    {
      icon: '🛡️',
      title: "Qo'llab-quvvatlash",
      description: "24/7 texnik yordam. Loyihalarimiz uchun to'liq mas'uliyatni o'z zimmamizga olamiz."
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-dark-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4">
            Biz <span className="text-brand-primary">haqimizda</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-dark-subtext max-w-3xl mx-auto px-4 leading-relaxed">
            TexnoAI - sun'iy intellekt asosidagi yechimlar yaratishga ixtisoslashgan 
            texnologiya kompaniyasi. Biz biznesingizni raqamli davrga olib chiqamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 sm:p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-dark-subtext leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Nega <span className="text-brand-primary">TexnoAI</span>?
              </h3>
              <p className="text-dark-subtext mb-6">
                Biz har bir mijoz bilan individual yondashamiz. Sizning biznes maqsadlaringizni 
                tushunib, eng mos yechimlarni taklif etamiz. Zamonaviy AI texnologiyalari, 
                xavfsizlik va ishonchlilik - bu bizning asosiy tamoyillarmiz.
              </p>
              <ul className="space-y-3 text-dark-subtext">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Zamonaviy texnologiyalar
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional jamoa
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  O'zbek tilida to'liq qo'llab-quvvatlash
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 texnik yordam
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-dark-subtext">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
