import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Anvar Karimov',
      company: 'TechCorp',
      position: 'CEO',
      rating: 5,
      text: "TexnoAI jamoasi bizning korporativ veb-saytimizni yaratishda a'lo darajada ishladilar. Zamonaviy dizayn, tezkor ishlash va SEO optimallashtirish - barchasi yuqori sifatda. AI integratsiyasi biznes jarayonlarimizni sezilarli darajada yaxshiladi.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Nilufar Rahimova',
      company: 'StartUp UZ',
      position: 'Founder',
      rating: 5,
      text: "Telegram botimizni yaratishda TexnoAI professional yondashuvni ko'rsatdi. Bot endi 24/7 mijozlarga xizmat ko'rsatadi, buyurtmalarni qabul qiladi va to'lovlarni amalga oshiradi. Natijalar juda ham mamnun qildi.",
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Jasur Alimov',
      company: 'Digital Solutions',
      position: 'Director',
      rating: 5,
      text: 'AI chatbot yechimlari bizning mijozlar xizmatimizni inqilob qildi. Endi mijozlar savollariga onlayn javob oladi, bu esa operatsion xarajatlarimizni 40% ga kamaytirdi. TexnoAI ga katta rahmat!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-dark-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mijozlarimiz <span className="text-brand-primary">fikrlari</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Biz bilan ishlagan mijozlarimizning tajribasi. Ularning muvaffaqiyati - bu bizning muvaffaqiyatimiz.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <blockquote className="text-dark-text text-lg mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                <div>
                  <cite className="text-white font-semibold not-italic">
                    {testimonials[currentIndex].name}
                  </cite>
                  <div className="text-dark-subtext">
                    {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-brand-primary w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
