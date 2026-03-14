import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ArrowRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import searchData from '../data/searchIndex.json';

interface SearchResult {
  id: string;
  page: string;
  title: string;
  content: string;
  url: string;
}

const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'en');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenSearch = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const handleLangChange = (e: any) => {
      setLang(e.detail.lang);
    };

    const searchTriggers = document.querySelectorAll('.search-trigger');
    searchTriggers.forEach(trigger => {
      trigger.addEventListener('click', handleOpenSearch);
    });

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('languageChanged', handleLangChange);

    return () => {
      searchTriggers.forEach(trigger => {
        trigger.removeEventListener('click', handleOpenSearch);
      });
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('languageChanged', handleLangChange);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = searchData.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.page.toLowerCase().includes(q) ||
          (item as any).title_ar?.includes(q) ||
          (item as any).content_ar?.includes(q) ||
          (item as any).page_ar?.includes(q)
        );
      });
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleResultClick = (url: string) => {
    handleClose();
    window.location.href = url;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0].url);
    }
  };

  const isRtl = lang === 'ar';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-[2000] flex items-start justify-center pt-20 px-4 sm:pt-32 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              <SearchIcon className={`w-5 h-5 text-zinc-400 ${isRtl ? 'ml-3' : 'mr-3'}`} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isRtl ? "ابحث عن المشاريع، الأخبار، القطاعات..." : "Search for projects, news, sectors..."}
                className="flex-1 bg-transparent border-none outline-none text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400"
              />
              <div className="flex items-center gap-2">
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors px-2"
                  >
                    {isRtl ? 'مسح' : 'Clear'}
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim().length === 0 ? (
                <div className="p-4">
                  <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 px-2">
                    {isRtl ? 'روابط سريعة' : 'Quick Links'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { title: isRtl ? 'مشاريعنا' : 'Our Projects', url: 'projects.html', icon: '🏗️' },
                      { title: isRtl ? 'آخر الأخبار' : 'Latest News', url: 'news.html', icon: '📰' },
                      { title: isRtl ? 'عن الشركة' : 'About Us', url: 'about.html', icon: '🏢' },
                      { title: isRtl ? 'اتصل بنا' : 'Contact Support', url: 'contact.html', icon: '📞' }
                    ].map((link) => (
                      <button
                        key={link.url}
                        onClick={() => handleResultClick(link.url)}
                        className="flex items-center p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-left"
                      >
                        <span className={`text-xl ${isRtl ? 'ml-3' : 'mr-3'}`}>{link.icon}</span>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{link.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full flex items-start p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-left group"
                    >
                      <div className={`p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg ${isRtl ? 'ml-4' : 'mr-4'} group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors`}>
                        <FileText className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-gold uppercase tracking-wider">
                            {isRtl ? (result as any).page_ar || result.page : result.page}
                          </span>
                          <ArrowRight className={`w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-gold transition-colors ${isRtl ? 'rotate-180' : ''}`} />
                        </div>
                        <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                          {isRtl ? (result as any).title_ar || result.title : result.title}
                        </h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                          {isRtl ? (result as any).content_ar || result.content : result.content}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {isRtl ? `لا توجد نتائج لـ "${query}"` : `No results found for "${query}"`}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
              <div className="flex gap-4">
                <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm mx-1">ESC</kbd> {isRtl ? 'للإغلاق' : 'to close'}</span>
                <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm mx-1">↵</kbd> {isRtl ? 'للاختيار' : 'to select'}</span>
              </div>
              <div className="font-medium text-gold">{isRtl ? 'بحث المقاولون العرب' : 'Arab Contractors Search'}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Search;
