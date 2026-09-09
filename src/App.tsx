import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import BlurText from './components/BlurText';
import ClickSpark from './components/ClickSpark';
import SectionSkeleton from './components/SectionSkeleton';

// Code-split all major below-the-fold sections via React.lazy
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const EcosystemSection = lazy(() => import('./components/sections/EcosystemSection'));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'));
const TechnicalSkillsSection = lazy(() => import('./components/sections/TechnicalSkillsSection'));
const ResumeSection = lazy(() => import('./components/sections/ResumeSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

const Background = React.memo(() => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(37, 99, 235, 0.12), transparent 80%)`;
        }
        rafId.current = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
      {/* Base Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Dynamic Spotlight */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at 50vw 30vh, rgba(37, 99, 235, 0.12), transparent 80%)`
        }}
      />

      {/* Subtle Ambient Blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-float" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full animate-float-delayed" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-blue-400/5 blur-[100px] rounded-full animate-float" />

      {/* Floating Particles - CSS Accelerated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              top: `${(i * 19 + 5) % 100}%`,
              left: `${(i * 23 + 11) % 100}%`,
              opacity: 0.25,
              animationDuration: `${3 + (i % 5)}s`
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
});

const ScrollProgress = React.memo(() => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
      style={{ scaleX: scrollYProgress, willChange: 'transform' }}
    />
  );
});

const MouseFollower = React.memo(() => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 16;
      targetY = e.clientY - 16;
    };

    const updateLoop = () => {
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(updateLoop);
    };
    rafId = requestAnimationFrame(updateLoop);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hover = Boolean(target.closest('button, a, .cursor-pointer'));
      setIsHovering(prev => (prev !== hover ? hover : prev));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={`fixed top-0 left-0 w-8 h-8 border border-blue-500 rounded-full pointer-events-none z-[9999] hidden md:block transition-[background-color,border-color,width,height] duration-200 ${
        isHovering ? "scale-150 bg-blue-500/10" : "scale-100 bg-transparent"
      }`}
      style={{ willChange: 'transform' }}
    />
  );
});

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <ClickSpark
        sparkColor='#3b82f6'
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
      >
        <Background />
        <ScrollProgress />
        <MouseFollower />

        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-white/5 z-50">
          <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm text-white group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all">T</div>
              <span className="font-mono text-xs tracking-widest font-bold uppercase hidden sm:block group-hover:text-blue-400 transition-colors">PHUC THIEN</span>
            </motion.div>
            <div className="flex gap-6 md:gap-8 items-center">
              {['about', 'work', 'resume'].map((item) => (
                <motion.button 
                  key={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item)} 
                  className="relative text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full" />
                </motion.button>
              ))}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')} 
                className="px-4 md:px-5 py-2 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Contact
              </motion.button>
            </div>
          </div>
        </nav>

        <main className="relative z-10 pt-40 pb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Hero Section - Rendered immediately for optimal FCP / LCP */}
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
                        onClick={() => scrollToSection('work')}
                        className="group px-8 py-4 bg-blue-600 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] relative overflow-hidden"
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
                        className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                        whileHover={{ rotate: -2, scale: 1.05 }}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </picture>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Below-the-fold major sections dynamically loaded with React.lazy and Suspense */}
            <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
              <AboutSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[800px]" />}>
              <EcosystemSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[700px]" />}>
              <ExperienceSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
              <TechnicalSkillsSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[900px]" />}>
              <ResumeSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton height="min-h-[250px]" />}>
              <ContactSection />
            </Suspense>
          </motion.div>
        </main>
      </ClickSpark>
    </div>
  );
}
