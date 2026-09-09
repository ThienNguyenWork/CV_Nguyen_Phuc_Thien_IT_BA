import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, Mail, Phone } from 'lucide-react';

export const ContactSection: React.FC = React.memo(() => {
  return (
    <footer className="pt-20 border-t border-white/5 max-w-6xl mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div 
            className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-110 hover:rotate-6 transition-transform duration-200 cursor-pointer"
            style={{ willChange: 'transform' }}
          >
            T
          </div>
          <p className="text-sm text-gray-500 font-mono">© 2026 NGUYỄN PHÚC THIÊN. ALL RIGHTS RESERVED.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600">Social</span>
            <div className="flex gap-6">
              <a 
                href="https://www.linkedin.com/in/phucthien432002/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 hover:scale-125 hover:rotate-6 transition-all duration-200 inline-block"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/ThienNguyenWork" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 hover:scale-125 hover:-rotate-6 transition-all duration-200 inline-block"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600">Contact</span>
            <div className="flex flex-col gap-2">
              <a 
                href="mailto:phucthien432002@gmail.com" 
                className="text-sm font-medium hover:text-blue-500 hover:translate-x-1 transition-[transform,color] duration-150 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> phucthien432002@gmail.com
              </a>
              <a 
                href="tel:+84903716806" 
                className="text-sm font-medium hover:text-blue-500 hover:translate-x-1 transition-[transform,color] duration-150 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> +84 903716806
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center"
      >
        <p className="text-[12vw] font-black text-white/5 select-none leading-none">PHUC THIEN</p>
      </motion.div>
    </footer>
  );
});

ContactSection.displayName = 'ContactSection';
export default ContactSection;
