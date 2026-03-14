import React from 'react';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  return (
    <section className="hero-section relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      {/* Content Container */}
      <div className="container relative z-10 px-6 py-32 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-widest text-gold uppercase border border-gold/30 rounded-full bg-gold/10">
            Since 1955 — Building the Future
          </span>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl font-display">
            Engineering Tomorrow's <br className="hidden md:block" /> 
            <span className="text-gold">Infrastructure</span> Today
          </h1>
          
          <p className="mb-10 text-lg text-gray-200 md:text-xl max-w-2xl mx-auto">
            One of the largest international construction companies, delivering excellence across the Middle East and Africa with seven decades of heritage.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-base font-bold text-white transition-all bg-gold rounded-lg shadow-lg hover:bg-gold-dark"
            >
              Our Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-base font-bold text-white transition-all border-2 border-white/30 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
