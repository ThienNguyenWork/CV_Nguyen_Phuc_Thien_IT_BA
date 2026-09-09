import React from 'react';
import { motion, useScroll } from 'motion/react';

export const ScrollProgress: React.FC = React.memo(() => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
      style={{ scaleX: scrollYProgress, willChange: 'transform' }}
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';
export default ScrollProgress;
