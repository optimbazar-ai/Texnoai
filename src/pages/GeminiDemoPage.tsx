import React, { useState } from 'react';
import { generateAIResponse } from '../services/geminiService';
import SEO from '../components/SEO';

type DemoType = 'chat' | 'image' | 'summary' | 'translate' | 'code' | 'json';

const GeminiDemoPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoType>('chat');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const demos = [
    { id: 'chat' as DemoType, icon: '💬', title: 'AI Chat', desc: 'Chat with Gemini AI' },
    { id: 'image' as DemoType, icon: '🎨', title: 'Image Generation', desc: 'Create image prompts' },
    { id: 'summary' as DemoType, icon: '📄', title: 'Text Summarization', desc: 'Summarize long texts' },
    { id: 'translate' as DemoType, icon: '🌍', title: 'Translation', desc: 'Translate between languages' },
    { id: 'code' as DemoType, icon: '💻', title: 'Code Generator', desc: 'Generate code snippets' },
    { id: 'json' as DemoType, icon: '📊', title: 'JSON Generator', desc: 'Create JSON structures' },
  ];

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setOutput('');

    try {
      let prompt = '';
      
      switch (activeDemo) {
        case 'chat':
          prompt = input;
          break;
        case 'image':
          prompt = `Generate a detailed image description and Midjourney/DALL-E prompt for: ${input}`;
          break;
        case 'summary':
          prompt = `Please summarize the following text concisely:\n\n${input}`;
          break;
        case 'translate':
          prompt = `Translate the following text to Uzbek and Russian:\n\n${input}`;
          break;
        case 'code':
          prompt = `Generate clean, production-ready code for: ${input}\n\nInclude comments and best practices.`;
          break;
        case 'json':
          prompt = `Generate a valid JSON structure for: ${input}\n\nMake it properly formatted and include sample data.`;
          break;
      }

      const response = await generateAIResponse(prompt);
      setOutput(response);
    } catch (error) {
      setOutput('❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
      console.error('Demo error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (activeDemo) {
      case 'chat':
        return 'Savolingizni yozing...';
      case 'image':
        return 'Rasm tavsifini kiriting (masalan: "futuristic city at sunset")';
      case 'summary':
        return 'Xulosa chiqarish uchun matnni kiriting...';
      case 'translate':
        return 'Tarjima qilish uchun matnni kiriting...';
      case 'code':
        return 'Kod tavsifini kiriting (masalan: "React login form with validation")';
      case 'json':
        return 'JSON strukturasi uchun tavsif (masalan: "user profile with nested data")';
      default:
        return 'Matn kiriting...';
    }
  };

  return (
    <>
      <SEO 
        title="Gemini AI Demo - TexnoAI"
        description="Google Gemini AI ning qudratini o'z ko'zingiz bilan sinab ko'ring. 6 xil interaktiv demo."
        keywords={['Gemini AI', 'AI Demo', 'ChatGPT', 'AI Tools', 'Google AI']}
      />

      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Gemini AI Demo
              </span>
            </h1>
            <p className="text-dark-subtext text-lg max-w-3xl mx-auto">
              Google Gemini AI ning qudratini o'z ko'zingiz bilan sinab ko'ring. 6 xil interaktiv demo.
            </p>
          </div>

          {/* Demo Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => {
                  setActiveDemo(demo.id);
                  setInput('');
                  setOutput('');
                }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  activeDemo === demo.id
                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg scale-105'
                    : 'glass-card hover:scale-105'
                }`}
              >
                <div className="text-3xl mb-2">{demo.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{demo.title}</h3>
                <p className="text-xs opacity-80">{demo.desc}</p>
              </button>
            ))}
          </div>

          {/* Demo Area */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {demos.find(d => d.id === activeDemo)?.title}
              </h2>
              <p className="text-dark-subtext">
                AI xizmati kezida mavjud emas. API key tekshiring.
              </p>
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Input:</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholder()}
                rows={6}
                className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="w-full mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Yuborilmoqda...
                </span>
              ) : (
                'Yuborish'
              )}
            </button>

            {/* Output */}
            {output && (
              <div>
                <label className="block text-sm font-medium mb-2">Output:</label>
                <div className="bg-dark-bg border border-gray-700 rounded-lg p-6 min-h-[200px]">
                  <pre className="whitespace-pre-wrap text-sm text-dark-text font-mono">
                    {output}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold mb-2">Tez va Kuchli</h3>
              <p className="text-sm text-dark-subtext">
                Google Gemini AI eng zamonaviy til modellaridan biri
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">Aniq Javoblar</h3>
              <p className="text-sm text-dark-subtext">
                Har qanday savolga aniq va tushunarli javob beradi
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-bold mb-2">Ko'p Vazifali</h3>
              <p className="text-sm text-dark-subtext">
                Matn, kod, tarjima va boshqa ko'plab vazifalarni bajaradi
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeminiDemoPage;
