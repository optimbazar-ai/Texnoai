const axios = require('axios');

const testPost = async () => {
  try {
    console.log('📤 Test post yuborilmoqda...');
    
    const response = await axios.post('http://localhost:3001/api/post-to-channel', {
      title: 'Test Post - Sun\'iy Intellekt',
      excerpt: 'Bu test post. Telegram bot integratsiyasini sinab ko\'rmoqdamiz.',
      tags: ['AI', 'Test', 'Texnologiya'],
      date: new Date().toISOString(),
      url: 'http://localhost:3003/blog/test',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop'
    });
    
    console.log('✅ Muvaffaqiyatli:', response.data);
  } catch (error) {
    console.error('❌ Xato:', error.response ? error.response.data : error.message);
  }
};

testPost();
