// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// HTML ドキュメントのルート要素を取得
const rootElement = document.getElementById('root') as HTMLElement;

// React アプリケーションをルート要素にマウント
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
