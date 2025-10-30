import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { startAutoPostScheduler } from './services/autoPostScheduler';

// Avtomatik post scheduler'ni ishga tushirish
startAutoPostScheduler();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
