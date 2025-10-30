import React, { useState, useEffect, useRef } from 'react';
import { generateAIResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQ_RESPONSES: { [key: string]: string } = {
  // Narxlar
  'narx': "Xizmatlarimiz narxi loyiha murakkabligiga qarab o'zgaradi:\n\n💼 Oddiy veb-sayt: 500$ dan\n🛍️ E-commerce: 1500$ dan\n🤖 Telegram bot: 300$ dan\n💬 AI Chatbot: 800$ dan\n\nAniq narx uchun loyihangiz haqida to'liqroq ma'lumot bering!",
  
  'price': "Xizmatlarimiz narxi loyiha murakkabligiga qarab o'zgaradi:\n\n💼 Oddiy veb-sayt: 500$ dan\n🛍️ E-commerce: 1500$ dan\n🤖 Telegram bot: 300$ dan\n💬 AI Chatbot: 800$ dan\n\nAniq narx uchun loyihangiz haqida to'liqroq ma'lumot bering!",
  
  // Vaqt
  'muddat': "Loyihani bajarish muddati:\n\n⚡ Oddiy sayt: 1-2 hafta\n🏢 Korporativ sayt: 2-4 hafta\n🛒 E-commerce: 4-8 hafta\n🤖 Telegram bot: 1-2 hafta\n\nAniq muddat loyiha talablariga bog'liq!",
  
  'vaqt': "Loyihani bajarish muddati:\n\n⚡ Oddiy sayt: 1-2 hafta\n🏢 Korporativ sayt: 2-4 hafta\n🛒 E-commerce: 4-8 hafta\n🤖 Telegram bot: 1-2 hafta\n\nAniq muddat loyiha talablariga bog'liq!",
  
  // Texnologiyalar
  'texnologiya': "Biz zamonaviy texnologiyalardan foydalanamiz:\n\n⚛️ Frontend: React, Next.js, Vue.js\n🎨 Styling: Tailwind CSS, Material UI\n🔧 Backend: Node.js, Python, PHP\n🗄️ Database: MongoDB, PostgreSQL, MySQL\n🤖 AI: Google Gemini, OpenAI, Claude\n\nLoyihangizga mos texnologiyani tanlaymiz!",
  
  // Portfolio
  'portfolio': "Bizning loyihalarimiz:\n\n✅ 50+ muvaffaqiyatli loyiha\n✅ 30+ xursand mijozlar\n✅ 98% mamnunlik darajasi\n\nPortfolioni ko'rish uchun sahifadagi Portfolio bo'limiga o'ting yoki /portfolio buyrug'ini yuboring!",
  
  'loyiha': "Bizning loyihalarimiz:\n\n✅ 50+ muvaffaqiyatli loyiha\n✅ 30+ xursand mijozlar\n✅ 98% mamnunlik darajasi\n\nPortfolioni ko'rish uchun sahifadagi Portfolio bo'limiga o'ting!",
  
  // Kontakt
  'aloqa': "Biz bilan bog'lanish:\n\n📧 Email: info@texnoai.uz\n📱 Telegram: @texnoaikanal\n📞 Tel: +998 97 477 12 29\n\nYoki pastdagi formani to'ldiring, biz sizga qo'ng'iroq qilamiz!",
  
  'telefon': "Biz bilan bog'lanish:\n\n📧 Email: info@texnoai.uz\n📱 Telegram: @texnoaikanal\n📞 Tel: +998 97 477 12 29\n📞 Tel: +998 99 644 84 44",
  
  // Xizmatlar
  'xizmat': "Bizning xizmatlarimiz:\n\n🌐 Veb-sayt yaratish\n📱 Telegram bot\n🤖 AI Chatbot\n🎨 Dizayn xizmatlari\n🔧 Technical support\n📈 SEO va marketing\n\nQaysi xizmat sizni qiziqtiradi?",
  
  // Qo'llab-quvvatlash
  'support': "24/7 texnik yordam:\n\n✅ Tez javob berish\n✅ Muammolarni hal qilish\n✅ Bepul konsultatsiya\n✅ Uzluksiz monitoring\n\nSizning muvaffaqiyatingiz bizning maqsadimiz!",
  
  // Telegram bot
  'telegram': "Telegram bot xizmatlari:\n\n💬 Oddiy chatbot: 300$\n🛍️ E-commerce bot: 800$\n🎫 Support bot: 500$\n💳 Payment integration: +200$\n\nBot sizning biznesingizni 24/7 avtomatlashtirishga yordam beradi!",
  
  // Salom
  'salom': "Assalomu alaykum! 👋\n\nTexnoAI chatbot xizmatida! Men sizga qanday yordam bera olaman?\n\n💡 Maslahatlar:\n- Narxlar haqida so'rang\n- Xizmatlarimiz haqida biling\n- Portfolio ko'ring\n- Loyiha boshlang",
  
  'hello': "Hello! 👋\n\nWelcome to TexnoAI! How can I help you today?",
  
  // Yordam
  'yordam': "Men sizga quyidagilar bo'yicha yordam bera olaman:\n\n💰 Narxlar va to'lovlar\n⏰ Bajarish muddatlari\n🔧 Texnologiyalar\n📊 Portfolio va loyihalar\n📞 Aloqa ma'lumotlari\n🎯 Xizmatlar ro'yxati\n\nSavolingizni yozing yoki mavzuni tanlang!",
  
  'help': "Men sizga quyidagilar bo'yicha yordam bera olaman:\n\n💰 Narxlar va to'lovlar\n⏰ Bajarish muddatlari\n🔧 Texnologiyalar\n📊 Portfolio va loyihalar\n📞 Aloqa ma'lumotlari\n🎯 Xizmatlar ro'yxati\n\nSavolingizni yozing!"
};

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })));
    } else {
      // Welcome message
      addBotMessage("Assalomu alaykum! 👋\n\nTexnoAI AI-chatbot xizmatida. Men sizga qanday yordam bera olaman?\n\n💡 Masalan:\n- Narxlar haqida so'rang\n- Xizmatlar haqida\n- Portfolio ko'ring");
    }
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update unread count
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'bot') {
        setUnreadCount(prev => prev + 1);
      }
    } else {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const checkFAQ = (text: string): string | null => {
    const lowerText = text.toLowerCase().trim();
    
    // Exact match
    if (FAQ_RESPONSES[lowerText]) {
      return FAQ_RESPONSES[lowerText];
    }
    
    // Partial match
    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerText.includes(key)) {
        return response;
      }
    }
    
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    addUserMessage(userText);

    // Check FAQ first
    const faqResponse = checkFAQ(userText);
    
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (faqResponse) {
      // Use FAQ response
      addBotMessage(faqResponse);
      setIsTyping(false);
    } else {
      // Use Gemini AI
      try {
        const prompt = `Siz TexnoAI kompaniyasining AI yordamchisisiz. Kompaniya veb-saytlar, Telegram botlar, AI chatbotlar va boshqa IT xizmatlarini taqdim etadi. 

Mijoz savoli: "${userText}"

Javob qisqa, professional va do'stona bo'lsin. O'zbek tilida javob bering. Agar savol xizmatlar, narxlar yoki texnik ma'lumotlar haqida bo'lsa, aniq javob bering.`;

        const aiResponse = await generateAIResponse(prompt);
        addBotMessage(aiResponse);
      } catch (error) {
        addBotMessage("Kechirasiz, hozir texnik muammo bor. Iltimos, keyinroq urinib ko'ring yoki bizga to'g'ridan-to'g'ri murojaat qiling: info@texnoai.uz");
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    addBotMessage("Chat tozalandi! 🧹\n\nQanday yordam bera olaman?");
  };

  const quickReplies = [
    { text: '💰 Narxlar', value: 'narx' },
    { text: '⏰ Muddat', value: 'muddat' },
    { text: '📱 Aloqa', value: 'aloqa' },
    { text: '🎯 Xizmatlar', value: 'xizmat' }
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Onlayn yordam
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl transition-all duration-300 flex flex-col border border-gray-700 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">TexnoAI Assistant</h3>
              <p className="text-white/80 text-xs">Onlayn</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="text-white/80 hover:text-white transition-colors"
              title="Chatni tozalash"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-brand-primary text-white'
                    : 'bg-gradient-to-r from-gray-600 to-gray-500 text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap font-medium">{message.text}</p>
                <p className="text-xs opacity-80 mt-1">
                  {message.timestamp.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white rounded-2xl px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputText(reply.value);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-brand-primary hover:to-brand-secondary text-white text-sm font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-gray-900 rounded-b-2xl border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Xabar yozing..."
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-brand-primary transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
