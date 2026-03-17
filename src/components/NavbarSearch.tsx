import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ArrowRight, FileText, Loader2, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import searchData from '../data/searchIndex.json';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SearchResult {
  id: string;
  page: string;
  title: string;
  content: string;
  url: string;
  type?: 'dom' | 'index';
}

export const NavbarSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 1) {
        performSearch(query);
      } else {
        setResults([]);
        setActiveIndex(-1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const performSearch = (q: string) => {
    setIsSearching(true);
    const lowerQuery = q.toLowerCase();
    
    const indexResults = searchData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.content.toLowerCase().includes(lowerQuery) ||
      item.page.toLowerCase().includes(lowerQuery)
    ).map(item => ({ ...item, type: 'index' as const }));

    const domResults: SearchResult[] = [];
    const headings = document.querySelectorAll('h1, h2, h3, p');
    headings.forEach((el, idx) => {
      const text = el.textContent || '';
      if (text.toLowerCase().includes(lowerQuery) && text.length < 500) {
        if (!indexResults.some(r => r.title === text || r.content === text)) {
          domResults.push({
            id: `dom-${idx}`,
            page: 'Current Page',
            title: el.tagName + ': ' + text.substring(0, 30) + '...',
            content: text,
            url: '#' + (el.id || ''),
            type: 'dom'
          });
        }
      }
    });

    const combined = [...indexResults, ...domResults.slice(0, 5)];
    setResults(combined);
    setIsSearching(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        handleSelect(results[activeIndex]);
      } else if (results.length > 0) {
        handleSelect(results[0]);
      }
    }
  };

  const handleSelect = (result: SearchResult) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    
    if (result.url.startsWith('#')) {
      const id = result.url.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = result.url;
    }
  };

  const highlightMatch = (text: string, q: string) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === q.toLowerCase() ? (
            <mark key={i} className="bg-gold/30 text-gold rounded-sm px-0.5 font-semibold">
              {part}
            </mark>
          ) : part
        )}
      </span>
    );
  };

  return (
    <>
      {/* Search Toggle Icon - Matches ThemeToggle style */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full transition-colors flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-primary dark:text-gold"
        aria-label="Open Search"
        title="Search (Ctrl+K)"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-20 px-4 sm:pt-32">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Search Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
            >
              {/* Search Input Header */}
              <div className="flex items-center p-4 border-b border-zinc-200 dark:border-zinc-800">
                <SearchIcon className="w-5 h-5 text-zinc-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for projects, news, sectors..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-500 font-medium">
                    <Command className="w-3 h-3" /> K
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              {/* Results Area */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {isSearching ? (
                  <div className="flex items-center justify-center py-12 text-zinc-500">
                    <Loader2 className="w-6 h-6 animate-spin mr-3 text-gold" />
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((result, idx) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={cn(
                          "w-full flex items-start p-4 rounded-xl transition-colors text-left group",
                          activeIndex === idx ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        )}
                      >
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg mr-4 group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                          <FileText className="w-5 h-5 text-gold" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-gold uppercase tracking-wider">
                              {result.page}
                            </span>
                            <ArrowRight className={cn(
                              "w-4 h-4 text-zinc-300 dark:text-zinc-600 transition-all",
                              activeIndex === idx ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                            )} />
                          </div>
                          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                            {highlightMatch(result.title, query)}
                          </h4>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {highlightMatch(result.content, query)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query.trim().length > 1 ? (
                  <div className="p-12 text-center">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      No results found for "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-zinc-400 text-sm">
                    Start typing to search across the website...
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
                <div className="flex gap-4">
                  <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm mx-1">ESC</kbd> to close</span>
                  <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm mx-1">↵</kbd> to select</span>
                </div>
                <div className="font-medium text-gold">Arab Contractors</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
