import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import AIAdvisor from './components/AIAdvisor';
import GeminiDemos from './components/GeminiDemos';
import News from './components/News';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioDetail from './components/PortfolioDetail';
import BlogDetail from './components/BlogDetail';
import AdminPanel from './components/admin/AdminPanel';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        data={{
          title: "TexnoAI - Sun'iy Intellekt Yechimlari",
          description: "Gemini AI texnologiyasi asosida zamonaviy biznes yechimlari. Veb-saytlar, Telegram botlar, AI chatbotlar va boshqa ko'plab xizmatlar.",
          keywords: ['AI', "Sun'iy intellekt", 'Veb-sayt', 'Telegram bot', 'Chatbot', 'TexnoAI', 'Gemini', "O'zbekiston"],
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop'
        }}
      />
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Blog />
      <Testimonials />
      <AIAdvisor />
      <GeminiDemos />
      <News />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:id" element={<><Header /><PortfolioDetail /><Footer /></>} />
        <Route path="/blog/:id" element={<><Header /><BlogDetail /><Footer /></>} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
