import React from 'react';
import { motion } from 'motion/react';
import OrbitalEcosystem from '../OrbitalEcosystem';

export const EcosystemSection: React.FC = () => {
  return (
    <section className="mb-48 py-60 bg-[#020202] relative overflow-hidden w-full [content-visibility:auto] [contain-intrinsic-size:1000px]">
      {/* Advanced Cosmic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />
        
        {/* Moving Nebulae - Optimized with lower blur and opacity */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-blue-600/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-purple-600/10 blur-[100px] rounded-full"
        />
      </div>
      
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      
      {/* Technical UI Overlays */}
      <div className="absolute top-20 left-20 pointer-events-none hidden xl:block">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-blue-500/50 uppercase tracking-[0.4em]">System_Status: Operational</span>
          </div>
          <div className="w-48 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
          <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Core_Nexus_v4.0.1</span>
        </div>
      </div>

      <div className="absolute bottom-20 right-20 pointer-events-none hidden xl:block text-right">
        <div className="flex flex-col gap-2 items-end">
          <span className="text-[10px] font-mono text-blue-500/50 uppercase tracking-[0.4em]">Neural_Network_Active</span>
          <div className="w-48 h-px bg-gradient-to-l from-blue-500/20 to-transparent" />
          <div className="flex gap-4">
            <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Lat: 10.8231° N</span>
            <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Long: 106.6297° E</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-40 px-4"
        >
          <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter text-white mb-12 leading-none">
            SKILLS <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-900 drop-shadow-[0_0_50px_rgba(37,99,235,0.4)]">ECOSYSTEM</span>
          </h2>
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center justify-center gap-8">
              <div className="h-px w-32 bg-gradient-to-r from-transparent to-blue-500" />
              <p className="text-blue-400/80 font-mono uppercase tracking-[1.2em] text-[10px] md:text-base font-bold">
                The Architecture of Intelligence
              </p>
              <div className="h-px w-32 bg-gradient-to-l from-transparent to-blue-500" />
            </div>
            <p className="max-w-3xl mx-auto text-gray-500 text-sm md:text-lg font-light leading-relaxed px-4">
              A multi-dimensional neural network of competencies orbiting a high-performance system nexus. 
              Engineered for strategic scalability and seamless business-to-tech integration.
            </p>
          </div>
        </motion.div>
        
        <div className="relative w-full overflow-visible">
          <OrbitalEcosystem />
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
