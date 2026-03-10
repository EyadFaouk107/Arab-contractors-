import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          news: path.resolve(__dirname, 'news.html'),
          sectors: path.resolve(__dirname, 'sectors.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          projectDetail: path.resolve(__dirname, 'project-detail.html'),
          innovation: path.resolve(__dirname, 'innovation.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
  };
});