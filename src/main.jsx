// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // <--- The most important line
import './customScrollbar.css';
import QuizContextProvider from './context/QuizContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizContextProvider>
    <App />
    </QuizContextProvider>
  </React.StrictMode>,
);