import React, { useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import {
  generateAIResponse,
  generateImagePrompt,
  summarizeText,
  translateText,
  generateCode,
  generateJSON
} from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiDemos: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<number>(0);

  // Chat Demo State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Image Generation State
  const [imageDescription, setImageDescription] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Text Summarization State
  const [textToSummarize, setTextToSummarize] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  // Translation State
  const [textToTranslate, setTextToTranslate] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translation, setTranslation] = useState('');
  const [isTranslationLoading, setIsTranslationLoading] = useState(false);

  // Code Generation State
  const [codeTask, setCodeTask] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isCodeLoading, setIsCodeLoading] = useState(false);

  // JSON Generation State
  const [jsonDescription, setJsonDescription] = useState('');
  const [generatedJSON, setGeneratedJSON] = useState('');
  const [isJSONLoading, setIsJSONLoading] = useState(false);

  // Chat Demo Functions
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: Date.now()
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await generateAIResponse(chatInput);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Image Generation Functions
  const handleGenerateImage = async () => {
    if (!imageDescription.trim()) return;

    setIsImageLoading(true);
    try {
      const prompt = await generateImagePrompt(imageDescription);
      setImagePrompt(prompt);
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setIsImageLoading(false);
    }
  };

  // Text Summarization Functions
  const handleSummarize = async () => {
    if (!textToSummarize.trim()) return;

    setIsSummaryLoading(true);
    try {
      const result = await summarizeText(textToSummarize);
      setSummary(result);
    } catch (error) {
      console.error('Summarization error:', error);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  // Translation Functions
  const handleTranslate = async () => {
    if (!textToTranslate.trim()) return;

    setIsTranslationLoading(true);
    try {
      const result = await translateText(textToTranslate, targetLanguage);
      setTranslation(result);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslationLoading(false);
    }
  };

  // Code Generation Functions
  const handleGenerateCode = async () => {
    if (!codeTask.trim()) return;

    setIsCodeLoading(true);
    try {
      const code = await generateCode(codeTask, codeLanguage);
      setGeneratedCode(code);
      setTimeout(() => {
        const codeBlock = document.querySelector('.generated-code');
        if (codeBlock) {
          hljs.highlightElement(codeBlock as HTMLElement);
        }
      }, 100);
    } catch (error) {
      console.error('Code generation error:', error);
    } finally {
      setIsCodeLoading(false);
    }
  };

  // JSON Generation Functions
  const handleGenerateJSON = async () => {
    if (!jsonDescription.trim()) return;

    setIsJSONLoading(true);
    try {
      const json = await generateJSON(jsonDescription);
      setGeneratedJSON(json);
    } catch (error) {
      console.error('JSON generation error:', error);
    } finally {
      setIsJSONLoading(false);
    }
  };

  const demos = [
    {
      id: 0,
      title: 'AI Chat',
      icon: '💬',
      description: 'Gemini AI bilan suhbatlashing'
    },
    {
      id: 1,
      title: 'Image Generation',
      icon: '🎨',
      description: 'Rasm uchun prompt yarating'
    },
    {
      id: 2,
      title: 'Text Summarization',
      icon: '📝',
      description: 'Matnni qisqartiring'
    },
    {
      id: 3,
      title: 'Translation',
      icon: '🌍',
      description: 'Matnni tarjima qiling'
    },
    {
      id: 4,
      title: 'Code Generator',
      icon: '💻',
      description: 'Kod yarating'
    },
    {
      id: 5,
      title: 'JSON Generator',
      icon: '📊',
      description: 'JSON yarating'
    }
  ];

  return (
    <section id="demos" className="py-20 bg-dark-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gemini AI <span className="text-brand-primary">demolar</span>
          </h2>
          <p className="text-xl text-dark-subtext max-w-3xl mx-auto">
            Google Gemini AI ning qudratini o'z ko'zingiz bilan sinab ko'ring. 
            6 xil interaktiv demo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                activeDemo === demo.id
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/50'
                  : 'glass-card hover:scale-105'
              }`}
            >
              <div className="text-3xl mb-2">{demo.icon}</div>
              <div className="text-sm font-semibold">{demo.title}</div>
            </button>
          ))}
        </div>

        <div className="glass-card p-8">
          {/* Chat Demo */}
          {activeDemo === 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">AI Chat Demo</h3>
              <div className="space-y-4">
                <div className="bg-dark-bg rounded-lg p-4 h-96 overflow-y-auto space-y-4">
                  {chatMessages.length === 0 && (
                    <p className="text-dark-subtext text-center">Suhbatni boshlang...</p>
                  )}
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === 'user'
                            ? 'bg-brand-primary text-white'
                            : 'bg-dark-card text-dark-text'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-dark-card text-dark-text rounded-lg p-4">
                        Yozmoqda...
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Xabar yozing..."
                    className="flex-1 px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isChatLoading}
                    className="btn-primary"
                  >
                    Yuborish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Image Generation Demo */}
          {activeDemo === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Image Generation Demo</h3>
              <div className="space-y-4">
                <textarea
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  placeholder="Qanday rasm kerak? Masalan: 'Zamonaviy office da ishlovchi dasturchi'"
                  className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary resize-none"
                  rows={4}
                />
                <button
                  onClick={handleGenerateImage}
                  disabled={isImageLoading}
                  className="btn-primary"
                >
                  {isImageLoading ? 'Yaratilmoqda...' : 'Prompt yaratish'}
                </button>
                {imagePrompt && (
                  <div className="bg-dark-bg rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Generated Prompt:</h4>
                    <p className="text-dark-text">{imagePrompt}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Summarization Demo */}
          {activeDemo === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Text Summarization Demo</h3>
              <div className="space-y-4">
                <textarea
                  value={textToSummarize}
                  onChange={(e) => setTextToSummarize(e.target.value)}
                  placeholder="Qisqartirmoqchi bo'lgan matnni kiriting..."
                  className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary resize-none"
                  rows={8}
                />
                <button
                  onClick={handleSummarize}
                  disabled={isSummaryLoading}
                  className="btn-primary"
                >
                  {isSummaryLoading ? 'Qisqartirilmoqda...' : 'Qisqartirish'}
                </button>
                {summary && (
                  <div className="bg-dark-bg rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Qisqacha mazmun:</h4>
                    <p className="text-dark-text">{summary}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(summary)}
                      className="mt-4 px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-brand-secondary/90"
                    >
                      Nusxalash
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Translation Demo */}
          {activeDemo === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Translation Demo</h3>
              <div className="space-y-4">
                <textarea
                  value={textToTranslate}
                  onChange={(e) => setTextToTranslate(e.target.value)}
                  placeholder="Tarjima qilmoqchi bo'lgan matnni kiriting..."
                  className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary resize-none"
                  rows={6}
                />
                <div>
                  <label className="block text-white font-medium mb-2">Tilni tanlang:</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                    <option value="uz">O'zbek</option>
                    <option value="tr">Türkçe</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
                <button
                  onClick={handleTranslate}
                  disabled={isTranslationLoading}
                  className="btn-primary"
                >
                  {isTranslationLoading ? 'Tarjima qilinmoqda...' : 'Tarjima qilish'}
                </button>
                {translation && (
                  <div className="bg-dark-bg rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Tarjima:</h4>
                    <p className="text-dark-text">{translation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Code Generation Demo */}
          {activeDemo === 4 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Code Generator Demo</h3>
              <div className="space-y-4">
                <textarea
                  value={codeTask}
                  onChange={(e) => setCodeTask(e.target.value)}
                  placeholder="Qanday kod kerak? Masalan: 'Array ni sort qilish funksiyasi'"
                  className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary resize-none"
                  rows={4}
                />
                <div>
                  <label className="block text-white font-medium mb-2">Dasturlash tili:</label>
                  <select
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="typescript">TypeScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
                <button
                  onClick={handleGenerateCode}
                  disabled={isCodeLoading}
                  className="btn-primary"
                >
                  {isCodeLoading ? 'Kod yaratilmoqda...' : 'Kod yaratish'}
                </button>
                {generatedCode && (
                  <div className="bg-dark-bg rounded-lg p-4 overflow-x-auto">
                    <pre>
                      <code className={`generated-code language-${codeLanguage}`}>
                        {generatedCode}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* JSON Generation Demo */}
          {activeDemo === 5 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">JSON Generator Demo</h3>
              <div className="space-y-4">
                <textarea
                  value={jsonDescription}
                  onChange={(e) => setJsonDescription(e.target.value)}
                  placeholder="Qanday JSON kerak? Masalan: 'User profili: ism, email, yosh'"
                  className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary resize-none"
                  rows={4}
                />
                <button
                  onClick={handleGenerateJSON}
                  disabled={isJSONLoading}
                  className="btn-primary"
                >
                  {isJSONLoading ? 'JSON yaratilmoqda...' : 'JSON yaratish'}
                </button>
                {generatedJSON && (
                  <div className="bg-dark-bg rounded-lg p-4 overflow-x-auto">
                    <pre className="text-dark-text">
                      <code>{generatedJSON}</code>
                    </pre>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedJSON)}
                      className="mt-4 px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-brand-secondary/90"
                    >
                      Nusxalash
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GeminiDemos;
