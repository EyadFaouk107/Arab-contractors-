import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path'; // Add this

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'about.html'),
          sectors: resolve(__dirname, 'sectors.html'),
          projects: resolve(__dirname, 'projects.html'),
          projectDetail: resolve(__dirname, 'project-detail.html'),
          news: resolve(__dirname, 'news.html'),
          innovation: resolve(__dirname, 'innovation.html'),
          contact: resolve(__dirname, 'contact.html'),
          careers: resolve(__dirname, 'careers.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});