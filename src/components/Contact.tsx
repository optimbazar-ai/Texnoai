import React, { useState } from 'react';
import { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send to Telegram bot for admin notification
      const response = await fetch('http://localhost:3001/api/contact-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form submitted:', formData);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Biz bilan <span className="text-brand-primary">bog'laning</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Loyihangiz haqida gapirishga tayormiz. Biz bilan bog'laning va 
            bepul konsultatsiya oling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Xabar yuboring
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors duration-300"
                    placeholder="Ismingizni kiriting"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors duration-300"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Telefon raqam
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors duration-300"
                    placeholder="+998 90 123 45 67"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Xabar
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors duration-300 resize-none"
                    placeholder="Loyihangiz haqida bizga yozing..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Yuborilmoqda...' : 'Xabar yuborish'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                    Xabar muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                    Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Aloqa ma'lumotlari
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Telefon</h4>
                    <p className="text-dark-subtext">+998 97 477 12 29</p>
                    <p className="text-dark-subtext">+998 99 644 84 44</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-dark-subtext">info@texnoai.uz</p>
                    <p className="text-dark-subtext">support@texnoai.uz</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Manzil</h4>
                    <p className="text-dark-subtext">
                      Toshkent shahar,<br />
                      Yunusobod tumani,<br />
                      Amir Temur ko'chasi 123
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Ish vaqti</h4>
                    <p className="text-dark-subtext">
                      Dushanba - Juma: 9:00 - 18:00<br />
                      Shanba: 10:00 - 14:00<br />
                      Yakshanba: Dam olish
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ijtimoiy tarmoqlar
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-dark-bg rounded-full flex items-center justify-center text-dark-subtext hover:text-brand-primary hover:bg-brand-primary/20 transition-all duration-300">
                  <span className="font-bold">f</span>
                </a>
                <a href="#" className="w-12 h-12 bg-dark-bg rounded-full flex items-center justify-center text-dark-subtext hover:text-brand-primary hover:bg-brand-primary/20 transition-all duration-300">
                  <span className="font-bold">𝕏</span>
                </a>
                <a href="#" className="w-12 h-12 bg-dark-bg rounded-full flex items-center justify-center text-dark-subtext hover:text-brand-primary hover:bg-brand-primary/20 transition-all duration-300">
                  <span className="font-bold">in</span>
                </a>
                <a href="#" className="w-12 h-12 bg-dark-bg rounded-full flex items-center justify-center text-dark-subtext hover:text-brand-primary hover:bg-brand-primary/20 transition-all duration-300">
                  <span>📷</span>
                </a>
                <a href="#" className="w-12 h-12 bg-dark-bg rounded-full flex items-center justify-center text-dark-subtext hover:text-brand-primary hover:bg-brand-primary/20 transition-all duration-300">
                  <span>✈️</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
