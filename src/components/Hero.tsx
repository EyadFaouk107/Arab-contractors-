import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="hero-section relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/1Ssl5K30AYE?autoplay=1&mute=1&loop=1&playlist=1Ssl5K30AYE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Arab Contractors Hero Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 z-1 bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      
      {/* Content Container */}
      <div className="container relative z-10 px-6 py-32 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] text-white uppercase border border-white/20 rounded-full bg-white/5 backdrop-blur-md"
          >
            Building Tomorrow Since 1955
          </motion.span>
          
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl font-display leading-[1.1]">
            Engineering <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9E27D] to-[#B8860B]">Excellence</span>
          </h1>
          
          <p className="mb-12 text-lg text-zinc-300 md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A global leader in construction, shaping the future of infrastructure across the Middle East and Africa with innovation and heritage.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <motion.a
              href="#projects"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-3 px-10 py-5 text-sm font-bold text-black transition-all duration-300 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] bg-[length:200%_auto] hover:bg-right rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            >
              EXPLORE PROJECTS
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-10 py-5 text-sm font-bold text-white transition-all duration-300 border border-white/30 rounded-full hover:bg-white/10 backdrop-blur-md"
            >
              <Play className="w-4 h-4 fill-current" />
              WATCH STORY
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
