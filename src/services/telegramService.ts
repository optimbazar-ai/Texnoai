import { BlogPost, PortfolioItem } from '../types';

const TELEGRAM_API_URL = 'http://localhost:3001/api';

interface TelegramPostResponse {
  success: boolean;
  messageId?: number;
  error?: string;
}

export const postToTelegramChannel = async (post: BlogPost): Promise<TelegramPostResponse> => {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/post-to-channel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        excerpt: post.excerpt,
        tags: post.tags,
        date: post.date,
        url: `${window.location.origin}/blog/${post.id}`,
        imageUrl: post.imageUrl // Rasm URL qo'shildi
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to post to Telegram');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Telegram post error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const checkTelegramBotStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('Telegram bot status check failed:', error);
    return false;
  }
};

export const getTelegramBotInfo = async (): Promise<any> => {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/bot-info`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get bot info:', error);
    return null;
  }
};

export const postPortfolioToTelegram = async (portfolio: PortfolioItem): Promise<TelegramPostResponse> => {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/post-to-channel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `🚀 Yangi Portfolio: ${portfolio.title}`,
        excerpt: portfolio.description,
        tags: portfolio.tags,
        date: new Date().toISOString().split('T')[0],
        url: `${window.location.origin}/portfolio/${portfolio.id}`,
        imageUrl: portfolio.imageUrl
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to post portfolio to Telegram');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Telegram portfolio post error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
