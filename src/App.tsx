import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
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
import BlogPage from './pages/BlogPage';
import PortfolioPage from './pages/PortfolioPage';
import GeminiDemoPage from './pages/GeminiDemoPage';
import AdminPanel from './components/admin/AdminPanel';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import LiveChat from './components/LiveChat';

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
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<><Header /><BlogPage /><Footer /></>} />
          <Route path="/blog/:id" element={<><Header /><BlogDetail /><Footer /></>} />
          <Route path="/portfolio" element={<><Header /><PortfolioPage /><Footer /></>} />
          <Route path="/portfolio/:id" element={<><Header /><PortfolioDetail /><Footer /></>} />
          <Route path="/demolar" element={<><Header /><GeminiDemoPage /><Footer /></>} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
        <LiveChat />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
