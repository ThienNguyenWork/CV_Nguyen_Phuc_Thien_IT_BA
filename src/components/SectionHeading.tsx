import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = React.memo(({ title, subtitle }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-4"
    >
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-px bg-blue-500" 
      />
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-500">{subtitle || "Section"}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold tracking-tight text-white group"
    >
      <span className="relative inline-block">
        {title}
        <motion.span 
          className="absolute -inset-x-4 -inset-y-2 bg-blue-500/0 group-hover:bg-blue-500/5 blur-xl rounded-full transition-colors duration-500"
        />
      </span>
    </motion.h2>
  </div>
));

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
