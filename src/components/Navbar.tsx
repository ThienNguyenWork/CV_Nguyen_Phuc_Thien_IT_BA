import React from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  onNavigate: (id: string) => void;
  onScrollToTop: () => void;
  activeSection?: string;
}

const navItems = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'work' },
  { id: 'resume', label: 'resume' },
] as const;

export const Navbar: React.FC<NavbarProps> = React.memo(({
  onNavigate,
  onScrollToTop,
  activeSection = ''
}) => {
  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-white/5 z-50">
      <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onScrollToTop}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm text-white group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-[box-shadow] duration-200">
            T
          </div>
          <span className="font-mono text-xs tracking-widest font-bold uppercase hidden sm:block group-hover:text-blue-400 transition-colors duration-200">
            PHUC THIEN
          </span>
        </motion.div>

        <div className="flex gap-6 md:gap-8 items-center">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <motion.button 
                key={id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(id)} 
                className={`relative text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-200 group ${
                  isActive ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
                <span 
                  className={`absolute -bottom-1 left-0 h-px bg-blue-500 transition-[width] duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </motion.button>
            );
          })}
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('contact')} 
            className="px-4 md:px-5 py-2 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-[background-color,color,box-shadow] duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Contact
          </motion.button>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
