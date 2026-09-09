import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import BlurText from '../BlurText';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(({ onNavigate }) => {
  return (
    <section className="mb-48 max-w-6xl mx-auto px-8">
      <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start text-center lg:text-left">
        <div className="flex-1 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Available for new opportunities
          </motion.div>
          
          <BlurText
            text="NGUYỄN PHÚC THIÊN"
            delay={25}
            animateBy="letters"
            direction="top"
            className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl text-gray-400 font-light mb-10 max-w-2xl leading-relaxed">
              A <span className="text-white font-medium">Junior IT Business Analyst</span> specializing in bridging the gap between <span className="text-blue-500">business vision</span> and <span className="text-white font-medium">technical reality</span> through structured requirements and data-driven solutions.
            </h2>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('work')}
                className="group px-8 py-4 bg-blue-600 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-[background-color,box-shadow] duration-200 shadow-[0_0_20px_rgba(37,99,235,0.3)] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View Experience <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              <div className="flex items-center gap-6 px-4">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Location</span>
                  <span className="text-sm font-medium">Ho Chi Minh City, VN</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Experience</span>
                  <span className="text-sm font-medium">1+ Year</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 mt-20"
          >
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] animate-pulse">Scroll to explore</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-blue-600 to-transparent"
            />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="relative w-64 h-64 md:w-80 md:h-80 order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 opacity-20 blur-2xl" />
          <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group cursor-none">
            <picture className="w-full h-full block">
              <source srcSet="/images/hero-avatar.webp" type="image/webp" />
              <motion.img 
                src="/images/hero-avatar.jpg" 
                alt="Nguyễn Phúc Thiên" 
                width={320}
                height={320}
                className="w-full h-full object-cover scale-105"
                whileHover={{ rotate: -2, scale: 1.08 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
