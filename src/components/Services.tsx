import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      icon: '🌐',
      title: 'Veb-sayt yaratish',
      description: 'Zamonaviy, responsive veb-saytlar. SEO optimallashtirish, tezkor yuklanish, mobil moslashuvchanlik.',
      features: ['Corporate websites', 'E-commerce', 'Landing pages', 'Web applications']
    },
    {
      icon: '📱',
      title: 'Telegram bot',
      description: "Aqlli Telegram botlar. Avtomatik javoblar, to'lovlar, CRM integratsiyasi, 24/7 ishlash.",
      features: ['Chatbots', 'E-commerce bots', 'Support bots', 'Notification bots']
    },
    {
      icon: '🤖',
      title: 'AI Chatbot',
      description: "Sun'iy intellekt asosida chatbotlar. Tabiiy tilni qayta ishlash, o'rganish, multi-platform.",
      features: ['NLP integration', 'Multi-language', 'Learning capabilities', 'API integration']
    },
    {
      icon: '🎨',
      title: 'Image generation',
      description: 'AI yordamida rasmlar yaratish. Logolar, bannerlar, mahsulot rasmlari, kontent uchun imges.',
      features: ['Custom images', 'Logo design', 'Product photos', 'Content creation']
    },
    {
      icon: '📝',
      title: 'Text analysis',
      description: 'Matnlarni tahlil qilish. Sentiment analysis, keyword extraction, summarization, classification.',
      features: ['Sentiment analysis', 'Text summarization', 'Keyword extraction', 'Content classification']
    },
    {
      icon: '⚙️',
      title: 'Automation',
      description: 'Biznes jarayonlarini avtomatlashtirish. Workflow optimization, data processing, reporting.',
      features: ['Workflow automation', 'Data processing', 'Report generation', 'Process optimization']
    },
    {
      icon: '📲',
      title: 'Mobile apps',
      description: 'iOS va Android ilovalar. Native va cross-platform yechimlar, UI/UX dizayn.',
      features: ['iOS apps', 'Android apps', 'Cross-platform', 'UI/UX design']
    },
    {
      icon: '🔗',
      title: 'AI integration',
      description: 'Mavjud tizimlarga AI integratsiyasi. Machine learning, predictive analytics, data insights.',
      features: ['ML integration', 'Predictive analytics', 'Data insights', 'Custom AI solutions']
    },
    {
      icon: '💼',
      title: 'Consulting',
      description: 'Texnologik konsultatsiya. Digital transformation, AI strategy, tech stack selection.',
      features: ['Digital transformation', 'AI strategy', 'Tech consulting', 'Project planning']
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bizning <span className="text-brand-primary">xizmatlar</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Sun'iy intellekt va zamonaviy texnologiyalar asosida to'liq sikl yechimlar. 
            G'oyadan amalga qadar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/20"
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-dark-subtext mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-dark-subtext">
                    <svg className="w-4 h-4 text-brand-secondary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Maxsus yechim <span className="text-brand-primary">kerakmi?</span>
            </h3>
            <p className="text-dark-subtext mb-6">
              Biz har xil turdagi loyihalar bilan ishlaymiz. Kichik startapdan tortib 
              yirik korporatsiyalargacha bo'lgan barcha mijozlar uchun individual yondashuv.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary"
            >
              Bepul konsultatsiya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
