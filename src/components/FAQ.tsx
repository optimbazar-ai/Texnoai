import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Xizmatlar narxi qanday belgilanadi?',
      answer: 'Har bir loyiha individual yondashuv bilan baholanadi. Narx loyiha murakkabligi, talablar va bajarilish vaqtiga qarab belgilanadi. Bepul konsultatsiya va narx taklifi uchun biz bilan bog\'laning.'
    },
    {
      id: '2',
      question: 'Loyihani bajarish uchun qancha vaqt ketadi?',
      answer: 'Loyiha muddati uning murakkabligiga bog\'liq. Oddiy veb-sayt 2-4 hafta, Telegram bot 1-3 hafta, murakkab AI yechimlari 1-3 oy davom etishi mumkin. Batafsil ma\'lumotni konsultatsiyada olasiz.'
    },
    {
      id: '3',
      question: 'Qo\'llab-quvvatlash xizmati bormi?',
      answer: 'Ha, barcha loyihalarimiz uchun 24/7 texnik yordam taklif etamiz. Kichik muammolar uchun bepul, katta o\'zgarishlar uchun qo\'shimcha to\'lovlar mavjud. Shuningdek, oylik texnik xizmat paketlari ham bor.'
    },
    {
      id: '4',
      question: 'Qanday texnologiyalardan foydalanasiz?',
      answer: 'Biz zamonaviy texnologiyalar to\'plamidan foydalanamiz: React, Vue.js, Node.js, Python, Google Gemini AI, Telegram API, va boshqalar. Har bir loyiha uchun eng mos texnologiyani tanlaymiz.'
    },
    {
      id: '5',
      question: 'Portfolio loyihalarini ko\'rish mumkinmi?',
      answer: 'Albatta! Bizning portfolio sahifamizda tugatgan loyihalarimiz haqida to\'liq ma\'lumot bor. Shuningdek, demo versiyalarni sinab ko\'rish va mijozlarimiz bilan suhbatlashish imkoniyati mavjud.'
    },
    {
      id: '6',
      question: 'Bepul konsultatsiya bormi?',
      answer: 'Ha, biz barcha potensial mijozlar uchun bepul boshlang\'ich konsultatsiya taklif etamiz. Bu jarayonda loyiha talablari, texnik imkoniyatlar va taxminiy narxlar muhokama qilinadi.'
    }
  ];

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-dark-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ko\'p so\'raladigan <span className="text-brand-primary">savollar</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Mijozlarimizning eng ko\'p beradigan savollari va javoblari. 
            Qo\'shimcha savollaringiz bo\'lsa, biz bilan bog\'laning.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-dark-bg/50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-brand-primary transition-transform duration-300 flex-shrink-0 ${
                      openItem === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {openItem === faq.id && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-700/50 pt-4">
                      <p className="text-dark-subtext leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Yana savollaringiz bormi?
              </h3>
              <p className="text-dark-subtext mb-6">
                Biz javob berishdan mamnun bo\'lamiz. Biz bilan bog\'laning va 
                loyihangiz haqida batafsil ma\'lumot oling.
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
                Savol berish
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
