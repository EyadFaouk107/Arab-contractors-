import tailwindcss from '@tailwindcss/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

// عشان __dirname مش بتشتغل تلقائي في الـ ESM (type: module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // 1. ترتيب الـ Plugins مهم لـ Tailwind v4
    plugins: [
      tailwindcss(),
      react(), 
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    // 2. تعريف المتغيرات بشكل يضمن وصولها للـ Client side
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.YOUTUBE_API_KEY': JSON.stringify(env.YOUTUBE_API_KEY),
    },
    resolve: {
      alias: {
        // الـ @ يفضل يشير لفولدر الـ src لو موجود، أو الجذر
        '@': path.resolve(__dirname, './'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          news: path.resolve(__dirname, 'news.html'),
          sectors: path.resolve(__dirname, 'sectors.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          'project-detail': path.resolve(__dirname, 'project-detail.html'),
          innovation: path.resolve(__dirname, 'innovation.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
  };
});
