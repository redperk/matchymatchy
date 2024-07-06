import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);