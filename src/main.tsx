import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './js/main.js';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';

const toggleRoot = document.getElementById('theme-toggle-root');
if (toggleRoot) {
  ReactDOM.createRoot(toggleRoot).render(
    <React.StrictMode>
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    </React.StrictMode>
  );
}
