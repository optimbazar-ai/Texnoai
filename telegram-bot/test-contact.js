const axios = require('axios');

const testContactForm = async () => {
  try {
    console.log('📤 Contact form test...');
    
    const response = await axios.post('http://localhost:3001/api/contact-notification', {
      name: 'Ali Valiyev',
      email: 'ali@example.com',
      phone: '+998 90 123 45 67',
      message: 'Assalomu alaykum! Men veb-sayt qildirishni xohlayman. Narxlarni bilsam bo\'ladi.'
    });
    
    console.log('✅ Muvaffaqiyatli:', response.data);
  } catch (error) {
    console.error('❌ Xato:', error.response ? error.response.data : error.message);
  }
};

testContactForm();
