import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { NavbarSearch } from './NavbarSearch';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isScrolled ? 'bg-nav-bg backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container flex items-center justify-between mx-auto px-6">
        <a href="/" className="logo flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">AC</div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-primary leading-tight">ARAB CONTRACTORS</p>
            <p className="text-xs font-bold text-gold leading-tight">المقاولون العرب</p>
          </div>
        </a>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            <li><a href="/" className="text-sm font-bold hover:text-gold transition-colors">Home</a></li>
            <li><a href="/about" className="text-sm font-bold hover:text-gold transition-colors">About</a></li>
            <li><a href="/projects" className="text-sm font-bold hover:text-gold transition-colors">Projects</a></li>
            <li><a href="/sectors" className="text-sm font-bold hover:text-gold transition-colors">Sectors</a></li>
            <li><a href="/news" className="text-sm font-bold hover:text-gold transition-colors">News</a></li>
            <li><a href="/contact" className="text-sm font-bold hover:text-gold transition-colors">Contact</a></li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center">
            <ThemeToggle />
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1 sm:mx-2"></div>
            <NavbarSearch />
          </div>
          <button 
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white dark:bg-gray-900 z-[2000] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="p-6 flex justify-between items-center border-bottom">
          <span className="font-bold text-primary">MENU</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <ul className="p-6 flex flex-col gap-6">
          <li className="flex items-center justify-between">
            <span className="text-xl font-bold">Search</span>
            <NavbarSearch />
          </li>
          <li><a href="/" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
          <li><a href="/about" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
          <li><a href="/projects" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>Projects</a></li>
          <li><a href="/sectors" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>Sectors</a></li>
          <li><a href="/news" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>News</a></li>
          <li><a href="/contact" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
