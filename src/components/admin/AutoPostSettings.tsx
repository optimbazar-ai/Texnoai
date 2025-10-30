import React, { useState, useEffect } from 'react';
import {
  getSchedulerConfig,
  updateSchedulerConfig,
  manualGeneratePosts,
  getNextRunTime
} from '../../services/autoPostScheduler';

const AutoPostSettings: React.FC = () => {
  const [config, setConfig] = useState(getSchedulerConfig());
  const [isGenerating, setIsGenerating] = useState(false);
  const [nextRun, setNextRun] = useState(getNextRunTime());
  const [testCount, setTestCount] = useState(1);

  useEffect(() => {
    // Har daqiqada keyingi vaqtni yangilash
    const interval = setInterval(() => {
      setNextRun(getNextRunTime());
    }, 60000);

    return () => clearInterval(interval);
  }, [config.startTime, config.endTime]);

  const handleToggle = () => {
    const newEnabled = !config.enabled;
    updateSchedulerConfig({ enabled: newEnabled });
    setConfig({ ...config, enabled: newEnabled });
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    updateSchedulerConfig({ startTime: newTime });
    setConfig({ ...config, startTime: newTime });
    setNextRun(getNextRunTime());
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    updateSchedulerConfig({ endTime: newTime });
    setConfig({ ...config, endTime: newTime });
    setNextRun(getNextRunTime());
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value) || 8;
    updateSchedulerConfig({ dailyPostCount: newCount });
    setConfig({ ...config, dailyPostCount: newCount });
  };

  const handleManualGenerate = async () => {
    if (testCount < 1 || testCount > 10) {
      alert('1 dan 10 gacha son kiriting');
      return;
    }

    setIsGenerating(true);
    try {
      await manualGeneratePosts(testCount);
      alert(`✅ ${testCount} ta post muvaffaqiyatli yaratildi!`);
      window.location.reload(); // Blog ro'yxatini yangilash
    } catch (error) {
      alert('❌ Postlar yaratishda xatolik yuz berdi');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Avtomatik Post Yaratish
      </h2>

      {/* Status */}
      <div className="mb-6 p-4 bg-dark-bg rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-dark-text font-medium">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            config.enabled 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {config.enabled ? '✅ Faol' : '⏸️ To\'xtatilgan'}
          </span>
        </div>
        <div className="text-sm text-dark-subtext space-y-1">
          <p>📅 Oxirgi kun: {config.lastRunDate || 'Hali ishlamagan'}</p>
          <p>📊 Bugun yaratilgan: {config.postsCreatedToday || 0}/{config.dailyPostCount}</p>
          <p>⏰ Ish vaqti: {config.startTime} - {config.endTime}</p>
          <p className="text-brand-primary">⏭️ Keyingi post: {nextRun}</p>
        </div>
      </div>

      {/* Sozlamalar */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-dark-text font-medium mb-2">
            Yoqish/O'chirish
          </label>
          <button
            onClick={handleToggle}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              config.enabled
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {config.enabled ? 'O\'chirish' : 'Yoqish'}
          </button>
        </div>

        <div>
          <label className="block text-dark-text font-medium mb-2">
            Kunlik postlar soni: {config.dailyPostCount}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={config.dailyPostCount}
            onChange={handleCountChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-dark-subtext mt-1">
            <span>1</span>
            <span>10</span>
            <span>20</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-dark-text font-medium mb-2">
              Boshlanish vaqti
            </label>
            <input
              type="time"
              value={config.startTime}
              onChange={handleStartTimeChange}
              className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg text-white focus:border-brand-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-dark-text font-medium mb-2">
              Tugash vaqti
            </label>
            <input
              type="time"
              value={config.endTime}
              onChange={handleEndTimeChange}
              className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg text-white focus:border-brand-primary focus:outline-none"
            />
          </div>
        </div>
        <p className="text-xs text-dark-subtext">
          ⏰ Postlar bu vaqt oralig'ida teng taqsimlanadi. Masalan: 8 ta post 09:00-21:00 = har 1.5 soatda 1 ta post
        </p>
      </div>

      {/* Manual test */}
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Test rejimi (Manual)
        </h3>
        <div className="flex gap-3">
          <input
            type="number"
            min="1"
            max="10"
            value={testCount}
            onChange={(e) => setTestCount(parseInt(e.target.value) || 1)}
            className="w-24 px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg text-white focus:border-brand-primary focus:outline-none"
          />
          <button
            onClick={handleManualGenerate}
            disabled={isGenerating}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              isGenerating
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-brand-primary hover:bg-brand-primary/90'
            } text-white`}
          >
            {isGenerating ? '⏳ Yaratilmoqda...' : '🚀 Hozir yaratish'}
          </button>
        </div>
        <p className="text-xs text-dark-subtext mt-2">
          ⚠️ Bu funksiya darhol berilgan sondagi postlar yaratadi. Har bir post uchun ~3-5 soniya ketadi.
        </p>
      </div>

      {/* Ma'lumot */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h4 className="text-blue-400 font-semibold mb-2">📚 Qanday ishlaydi?</h4>
        <ul className="text-sm text-dark-text space-y-1">
          <li>• Postlar har kuni <strong>{config.startTime} - {config.endTime}</strong> oralig'ida taqsimlanadi</li>
          <li>• <strong>Avtomatik interval:</strong> {config.dailyPostCount} ta post = har {Math.floor((21-9)*60/config.dailyPostCount)} daqiqada</li>
          <li>• Turli sohalardagi mavzular: AI, Web Dev, Biznes, Telegram, Avtomatlashtirish, O'zbekiston</li>
          <li>• Har bir post Gemini AI tomonidan to'liq yaratiladi</li>
          <li>• SEO optimizatsiya: kalit so'zlar, tags, meta ma'lumotlar</li>
          <li>• LocalStorage'da saqlanadi va har 15 daqiqada tekshiriladi</li>
        </ul>
      </div>
    </div>
  );
};

export default AutoPostSettings;
