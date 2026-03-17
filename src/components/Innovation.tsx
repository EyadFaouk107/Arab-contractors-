import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const Innovation: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="innovation-section py-24 bg-neutral-light overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          
          {/* Left Side: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold/20 rounded-2xl blur-xl group-hover:bg-gold/30 transition-all duration-500" />
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800" 
                alt="Construction Technology" 
                className="relative w-full h-auto min-h-[400px] object-cover rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800';
                }}
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('innovation_subtitle')}</p>
                    <p className="text-sm font-bold text-primary">{t('innovation_bim')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-gold uppercase bg-gold/10 rounded-md">
              {t('innovation_subtitle')}
            </span>
            <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl lg:text-5xl font-display leading-tight">
              {t('innovation_title')}
            </h2>
            <p className="mb-8 text-lg text-gray-600 leading-relaxed">
              {t('innovation_desc')}
            </p>
            
            <div className="grid grid-1 sm:grid-2 gap-6 mb-10">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="mb-2 text-lg font-bold text-primary">{t('innovation_bim_title')}</h4>
                <p className="text-sm text-gray-500">{t('innovation_bim_desc')}</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="mb-2 text-lg font-bold text-primary">{t('innovation_green_title')}</h4>
                <p className="text-sm text-gray-500">{t('innovation_green_desc')}</p>
              </div>
            </div>
            
            <a 
              href="innovation.html" 
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all group"
            >
              {t('btn_discover_more')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Innovation;
