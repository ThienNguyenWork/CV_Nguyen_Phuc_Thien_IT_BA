import React from 'react';
import { motion } from 'motion/react';

const portraits = [
  { webp: "/images/about-1.webp", jpg: "/images/about-1.jpg", rotate: -3 },
  { webp: "/images/about-2.webp", jpg: "/images/about-2.jpg", rotate: 3 },
  { webp: "/images/about-3.webp", jpg: "/images/about-3.jpg", rotate: -3 }
];

export const AboutSection: React.FC = React.memo(() => {
  return (
    <section className="mb-48 max-w-6xl mx-auto px-8">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-4 mb-8"
        >
          <div className="w-2 h-12 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          <div>
            <h2 className="text-4xl md:text-8xl font-black tracking-tight leading-none mb-2">ABOUT <span className="text-blue-600">ME</span></h2>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.5em]">The human behind the requirements</p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
              As an <span className="text-white font-medium">IT Business Analyst</span>, I thrive at the intersection of business strategy and software engineering. My mission is to translate complex business needs into clear, actionable technical specifications.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">
              With a background in <span className="text-blue-400">Information Technology</span> and experience in <span className="text-white font-medium">Business Development</span>, I bring a unique perspective to every project—ensuring that the solutions we build aren't just technically sound, but also drive real business value.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-2">Analysis</h4>
                <p className="text-sm text-gray-400 font-light">BRD, FRD, User Stories, BPMN</p>
              </div>
              <div>
                <h4 className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-2">Design</h4>
                <p className="text-sm text-gray-400 font-light">Wireframing, UI/UX Logic, Prototyping</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
            {portraits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85, rotate: item.rotate }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <picture className="w-full h-full block">
                  <source srcSet={item.webp} type="image/webp" />
                  <img 
                    src={item.jpg} 
                    alt="Professional Portrait" 
                    width={192}
                    height={256}
                    className="w-full h-full object-cover transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
export default AboutSection;
