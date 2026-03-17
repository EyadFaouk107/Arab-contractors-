import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './js/main.js';
import ThemeToggle from './components/ThemeToggle';
import { NavbarSearch } from './components/NavbarSearch';
import Hero3D from './components/Hero3D';
import FloatingParticles from './components/FloatingParticles';
import Innovation3D from './components/Innovation3D';
import { ThemeProvider } from './context/ThemeContext';
import ProjectsPage from './pages/ProjectsPage';

const toggleRoot = document.getElementById('theme-toggle-root');
// Projects Root
const projectsRoot = document.getElementById('projects-root');
if (projectsRoot) {
  ReactDOM.createRoot(projectsRoot).render(
    <React.StrictMode>
      <ThemeProvider>
        <ProjectsPage />
      </ThemeProvider>
    </React.StrictMode>
  );
}
if (toggleRoot) {
  ReactDOM.createRoot(toggleRoot).render(
    <React.StrictMode>
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Search Root
const searchRoot = document.getElementById('search-root');
if (searchRoot) {
  ReactDOM.createRoot(searchRoot).render(
    <React.StrictMode>
      <ThemeProvider>
        <NavbarSearch />
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Search Root Mobile
const searchRootMobile = document.getElementById('search-root-mobile');
if (searchRootMobile) {
  ReactDOM.createRoot(searchRootMobile).render(
    <React.StrictMode>
      <ThemeProvider>
        <NavbarSearch />
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Hero 3D Root
const hero3dRoot = document.getElementById('hero-3d-root');
if (hero3dRoot) {
  ReactDOM.createRoot(hero3dRoot).render(
    <React.StrictMode>
      <Hero3D />
    </React.StrictMode>
  );
}

// Innovation 3D Root
const innovation3dRoot = document.getElementById('innovation-3d-root');
if (innovation3dRoot) {
  ReactDOM.createRoot(innovation3dRoot).render(
    <React.StrictMode>
      <Innovation3D />
    </React.StrictMode>
  );
}

// Particles Root
const particlesRoot = document.getElementById('particles-root');
if (particlesRoot) {
  ReactDOM.createRoot(particlesRoot).render(
    <React.StrictMode>
      <FloatingParticles />
    </React.StrictMode>
  );
}
