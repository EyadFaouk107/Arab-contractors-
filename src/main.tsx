import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './js/main.js';
import ThemeToggle from './components/ThemeToggle';
import Search from './components/Search';
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

// Search System Root
const searchRoot = document.createElement('div');
searchRoot.id = 'search-system-root';
document.body.appendChild(searchRoot);

ReactDOM.createRoot(searchRoot).render(
  <React.StrictMode>
    <Search />
  </React.StrictMode>
);
