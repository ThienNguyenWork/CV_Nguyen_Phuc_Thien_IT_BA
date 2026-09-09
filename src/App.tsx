import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Phone, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FileText, 
  Database, 
  Layout, 
  Users, 
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Search,
  PenTool,
  ClipboardList,
  ChevronDown
} from 'lucide-react';
import BlurText from './components/BlurText';
import SpotlightCard from './components/SpotlightCard';
import ClickSpark from './components/ClickSpark';
import OrbitalEcosystem from './components/OrbitalEcosystem';

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

const BentoGrid = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.15 }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.08,
          duration: 0.5
        }
      }
    }}
    className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]"
  >
    {children}
  </motion.div>
);

const BentoItem = ({ 
  children, 
  className = "", 
  title, 
  icon: Icon 
}: { 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  icon?: any;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -5, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="h-full"
  >
    <SpotlightCard className={`flex flex-col justify-between h-full ${className}`}>
      <div className="flex flex-col h-full">
        {Icon && (
          <div className="p-2 w-fit rounded-lg bg-white/5 border border-white/10 mb-4">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
        )}
        {title && <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-2">{title}</h3>}
        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </SpotlightCard>
  </motion.div>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
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
);

const ExperienceTimelineItem: React.FC<{ 
  company: string; 
  role: string; 
  period: string; 
  duration: string; 
  description: string[];
  index: number;
}> = ({ 
  company, 
  role, 
  period, 
  duration, 
  description,
  index
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between mb-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Connector Line for Mobile */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 md:hidden" />
      
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-[45%] pl-12 md:pl-0"
      >
        <SpotlightCard className="p-6 bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all group">
          <div className="flex flex-col mb-4">
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em] mb-2">{period}</span>
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{role}</h3>
            <p className="text-gray-400 font-medium text-sm mt-1">{company} • <span className="text-gray-500 italic">{duration}</span></p>
          </div>
          <ul className="space-y-3">
            {description.map((item, idx) => (
              <li key={idx} className="flex items-start text-gray-400 text-sm leading-relaxed">
                <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                {item}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </motion.div>

      {/* Center Dot */}
      <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#030303] -translate-x-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
      
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

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
          {/* Hero Section */}
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
                <motion.img 
                  src="https://i.postimg.cc/N0Bv75dM/b40719185b5ada04834b1.jpg" 
                  alt="Nguyễn Phúc Thiên" 
                  className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                  whileHover={{ rotate: -2, scale: 1.05 }}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section (About) */}
        <section id="about" className="mb-48 scroll-mt-32 max-w-6xl mx-auto px-8">
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
                {[
                  { url: "https://i.postimg.cc/R04xQNgC/aa6816d15593d4cd8d823.jpg", rotate: -3 },
                  { url: "https://i.postimg.cc/vmbwLc0m/538a33357077f129a8662.jpg", rotate: 3 },
                  { url: "https://i.postimg.cc/qqzThSjg/5135da419603175d4e12.jpg", rotate: -3 }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85, rotate: item.rotate }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img 
                      src={item.url} 
                      alt="Professional Portrait" 
                      className="w-full h-full object-cover transition-all duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Section - Standalone Full Width Layer */}
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

        {/* Experience Section (Work) */}
        <section id="work" className="mb-48 scroll-mt-32 max-w-6xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 block">What I have done so far</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">Work Experience.</h2>
          </motion.div>
          
          <div className="relative max-w-6xl mx-auto px-4">
            {/* Vertical Tree Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-white/10 to-transparent -translate-x-1/2" />
            
            <div className="relative z-10">
              {[
                {
                  company: "Vũ Thảo Technology",
                  role: "Junior Business Analyst",
                  period: "Jul 2026 – Present",
                  duration: "Present",
                  description: [
                    "Assigned and spearheaded business analysis for enterprise projects DOffice and DPM for strategic partner Petrolimex.",
                    "Conducted systematic smoke testing on defects and issues identified internally by the team as well as requests directly from client Petrolimex.",
                    "Analyzed root causes, proposed optimal functional solutions to the client, and coordinated with Project Manager to estimate time, assess resource feasibility, and set delivery timelines.",
                    "Spearheaded the Mobile App & iPad product initiative for the Tasks & Assignments Module: crafted end-to-end UI mockups and aligned with mobile engineers on implementation feasibility.",
                    "Authored comprehensive Mobile Functional Specification documents (SRS / FRD) incorporating mockups, business logic, and validation rules for the Tasks & Assignments Module.",
                    "Handed over specifications to client Petrolimex, captured feedback, iteratively updated change requests and refined UI mockups, successfully achieving official client sign-off before handover to the dev team.",
                    "Operated under direct supervision of the Project Manager (Line Manager); authored Use Cases, logged and tracked bugs/issues, and managed project reporting via Azure DevOps."
                  ]
                },
                {
                  company: "Vietnam AI Software Solutions",
                  role: "Junior Business Analyst",
                  period: "Jul 2025 – Jul 2026",
                  duration: "1 year",
                  description: [
                    "Designed wireframes and UI mockups for school management software modules to bridge the gap between user needs and development requirements.",
                    "Collaborated with Dev team and BA Lead to clarify task requirements, resolve blockers, and ensure timely delivery of product modules.",
                    "Wrote and managed test cases to verify software functionality; coordinated directly with developers to track and close defects.",
                    "Facilitated progress reporting meetings with BA Lead and CEO, presenting module status and incorporating feedback to align product direction.",
                    "Developed user training scripts and conducted end-user training sessions upon product completion, ensuring smooth adoption by school staff.",
                    "Supported Senior BA in gathering and clarifying requirements through meetings with end users and stakeholders.",
                    "Created basic wireframes and UI mockups under the guidance of BA Lead, iterating based on feedback from dev team and stakeholders.",
                    "Drafted initial test cases and assisted in manual testing to verify module functionality before handing over to QA.",
                    "Assisted in preparing user training materials, supporting the onboarding process for school staff end users."
                  ]
                },
                {
                  company: "HR1VIETNAM",
                  role: "Junior Business Development",
                  period: "Oct 2024 – Mar 2025",
                  duration: "6 months",
                  description: [
                    "Conducted market research and identified strategic partnership opportunities with 20+ tech enterprises within the IT recruitment sector.",
                    "Supported the Sales team in crafting high-impact proposals and pitch decks for new clients, directly contributing to the acquisition pipeline.",
                    "Analyzed customer data to provide actionable insights and proposed enhancements for the conversion funnel, optimizing product performance and user journey.",
                    "Executed cold outreach and pre-sales activities reaching 30+ prospects per month within the IT staffing industry.",
                    "Drafted high-converting email templates and sales scripts tailored for targeted customer acquisition campaigns.",
                    "Leveraged CRM systems to manage the sales pipeline and meticulously track deal stages and statuses."
                  ]
                },
                {
                  company: "FPT Software",
                  role: "Information Technology Intern",
                  period: "Apr 2024 – Jun 2024",
                  duration: "3 months",
                  description: [
                    "Collaborated in a group project to build a school management system using .NET, gaining hands-on experience in a structured software development environment.",
                    "Learned project management fundamentals including task breakdown, progress tracking, and team coordination within a real development workflow.",
                    "Practiced wireframing and UI mockup design and presented feature demonstrations to instructors and peers."
                  ]
                },
                {
                  company: "Plogg Vietnam",
                  role: "Information Technology Intern",
                  period: "Feb 2022 – May 2022",
                  duration: "4 months",
                  description: [
                    "Onboarded to VueJS and its ecosystem (libraries, frameworks) as a first professional tech experience, applying new skills directly to assigned frontend tasks.",
                    "Developed frontend features independently using GitHub for version control and leveraged AI tools to improve delivery speed.",
                    "Built foundational understanding of how end-to-end systems are structured and what core functionalities a complete software product requires."
                  ]
                }
              ].map((item, idx) => (
                <ExperienceTimelineItem 
                  key={idx} 
                  company={item.company}
                  role={item.role}
                  period={item.period}
                  duration={item.duration}
                  description={item.description}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills - Bento Style */}
        <section className="mb-48 max-w-6xl mx-auto px-8">
          <SectionHeading title="Technical Skills" subtitle="Stack" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Layout className="w-5 h-5 text-blue-500" /> BA Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Figma", "Azure DevOps", "Lucidchart", "draw.io", "Google AI Studio", "Plantuml", "Stitch", "Lark"].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">{skill}</span>
                ))}
              </div>
            </SpotlightCard>
            
            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-500" /> Data & Analysis
              </h3>
              <div className="flex flex-wrap gap-3">
                {["SQL (basic)", "Microsoft Excel", "Google Sheets"].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">{skill}</span>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Terminal className="w-5 h-5 text-blue-500" /> Methodology
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Agile / Scrum", "Waterfall", "SDLC"].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">{skill}</span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="mb-48 scroll-mt-32 max-w-6xl mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 block">My Professional Journey</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">Resume.</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <SpotlightCard className="p-2 md:p-12 bg-[#0a0a0a] border border-white/5">
                <div className="mb-4 md:hidden text-center">
                  <p className="text-[10px] font-mono text-blue-500 animate-pulse">Scroll horizontally to view full resume</p>
                </div>
                <div className="relative w-full overflow-x-auto rounded-xl bg-white shadow-2xl text-black custom-scrollbar">
                  {/* Coded CV Content */}
                  <div className="p-6 md:p-16 min-w-[800px] md:min-w-0 max-w-4xl mx-auto font-serif leading-relaxed">
                  {/* Header */}
                  <header className="border-b-2 border-blue-600 pb-8 mb-10 flex flex-col md:flex-row items-center gap-8">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600 flex-shrink-0 shadow-xl"
                    >
                      <img 
                        src="https://i.postimg.cc/N0Bv75dM/b40719185b5ada04834b1.jpg" 
                        alt="NGUYỄN PHÚC THIÊN" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    <div className="flex-grow text-center md:text-left">
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">NGUYỄN PHÚC THIÊN</h1>
                      <p className="text-xl md:text-2xl text-blue-600 font-medium uppercase tracking-widest mb-4">Business Analyst</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-600">
                        <motion.div whileHover={{ scale: 1.05, x: 5 }} className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-600" /> phucthien432002@gmail.com
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05, x: 5 }} className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-600" /> 0903 716 806
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05, x: 5 }} className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" /> Ho Chi Minh City
                        </motion.div>
                      </div>
                      <div className="mt-4 flex justify-center md:justify-start gap-4">
                        <motion.a whileHover={{ scale: 1.05, x: 5 }} href="https://www.linkedin.com/in/phucthien432002/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1">
                          <Linkedin className="w-4 h-4" /> LinkedIn
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.05, x: 5 }} href="https://github.com/phucthien432002" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1">
                          <Github className="w-4 h-4" /> GitHub
                        </motion.a>
                      </div>
                    </div>
                  </header>

                  {/* Summary */}
                  <section className="mb-10">
                    <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Professional Summary</h2>
                    <p className="text-gray-700 text-justify text-sm md:text-base">
                      Business Analyst with hands-on experience in enterprise digital transformation (DOffice, DPM for Petrolimex) 
                      and AI software solutions. Proficient in requirements elicitation, drafting comprehensive specifications (BRD/FRD/SRS), 
                      UI/UX wireframing for web and mobile/iPad platforms, smoke testing, and agile tracking using Azure DevOps. 
                      Leveraging a solid IT technical foundation combined with a background in Business Development, 
                      I bring a holistic perspective that bridges the gap between business objectives and product excellence.
                    </p>
                  </section>

                  {/* Competencies */}
                  <section className="mb-10">
                    <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Core Competencies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                      {[
                        "Requirements Gathering & Analysis", "Process Mapping & BPMN 2.0", "Stakeholder Management",
                        "User Story & Use Case Development", "Mobile & iPad Mockups / SRS", "Smoke Testing & Defect Triage",
                        "Azure DevOps & Work Item Tracking", "Wireframing & Prototyping (Figma)", "Agile / Scrum Methodology",
                        "BRD / FRD Documentation", "SQL & Data Analysis", "Presales & Client Engagement"
                      ].map(skill => (
                        <div key={skill} className="flex items-center gap-3 border-b border-gray-100 py-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Experience */}
                  <section className="mb-10">
                    <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-6">Work Experience</h2>
                    
                    <div className="space-y-8">
                      {/* Job 1 */}
                      <div>
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900">Vũ Thảo Technology</h3>
                          <span className="text-sm text-gray-500 font-bold">Jul 2026 – Present</span>
                        </div>
                        <p className="text-blue-600 font-bold mb-3 italic">Junior Business Analyst</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 text-justify">
                          <li>Handed over and spearheaded core business analysis for enterprise projects DOffice and DPM for strategic partner Petrolimex.</li>
                          <li>Conducted systematic smoke testing for defects and client-reported issues; performed root-cause analysis, proposed viable solutions, and aligned with Project Manager on feasibility, resource estimates, and release timelines.</li>
                          <li>Served as lead BA for the Tasks & Assignments Module across Mobile App & iPad platforms: independently designed UI mockups and aligned with mobile engineers on technical feasibility.</li>
                          <li>Authored detailed Mobile Functional Specification documents (SRS / FRD) integrating complete UI mockups, business logic, and validation rules.</li>
                          <li>Conducted requirement walkthroughs with client Petrolimex, captured feedback, iterated mockups, and successfully secured official client sign-off before handover to the dev team for sprint execution.</li>
                          <li>Reported directly to Project Manager (Line Manager); created Use Cases, tracked bugs/issues, and managed project deliverables on Azure DevOps.</li>
                        </ul>
                      </div>

                      {/* Job 2 */}
                      <div>
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900">Vietnam AI Software Solutions</h3>
                          <span className="text-sm text-gray-500 font-bold">Jul 2025 – Jul 2026 (1 year)</span>
                        </div>
                        <p className="text-blue-600 font-bold mb-3 italic">Junior Business Analyst</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 text-justify">
                          <li>Designed wireframes and UI mockups for school management software modules to bridge the gap between user needs and development requirements.</li>
                          <li>Collaborated with Dev team and BA Lead to clarify task requirements, resolve blockers, and ensure timely delivery of product modules.</li>
                          <li>Wrote and managed test cases to verify software functionality; coordinated directly with developers to track and close defects.</li>
                          <li>Facilitated progress reporting meetings with BA Lead and CEO, presenting module status and incorporating feedback to align product direction.</li>
                          <li>Developed user training scripts and conducted end-user training sessions upon product completion, ensuring smooth adoption by school staff.</li>
                        </ul>
                      </div>

                      {/* Job 3 */}
                      <div>
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900">HR1VIETNAM</h3>
                          <span className="text-sm text-gray-500 font-bold">Oct 2024 – Mar 2025</span>
                        </div>
                        <p className="text-blue-600 font-bold mb-3 italic">Junior Business Development</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 text-justify">
                          <li>Conducted market research and identified strategic partnership opportunities with 20+ tech enterprises within the IT recruitment sector.</li>
                          <li>Supported the Sales team in crafting high-impact proposals and pitch decks for new clients, directly contributing to the acquisition pipeline.</li>
                          <li>Analyzed customer data to provide actionable insights and proposed enhancements for the conversion funnel, optimizing product performance and user journey.</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Education */}
                  <section className="mb-10">
                    <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Education</h2>
                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="font-bold text-lg text-gray-900">Bachelor of Information Technology</h3>
                        <span className="text-sm text-gray-500 font-bold">2020 – 2024</span>
                      </div>
                      <p className="text-blue-600 font-bold mb-2">University of Greenwich Vietnam</p>
                      <ul className="mt-2 text-sm text-gray-700 space-y-1">
                        <li><strong>Relevant coursework:</strong> Systems Analysis & Design, Database Management, Software Engineering, Project Management</li>
                        <li><strong>Skills:</strong> Business English (reading/writing proficient), Responsibility & Professionalism</li>
                      </ul>
                    </div>
                  </section>

                  {/* Technical Skills */}
                  <section>
                    <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Technical Skills & Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="font-bold text-blue-600 mb-1">BA Tools</p>
                        <p>Figma, Azure DevOps, Lucidchart, draw.io, Google AI Studio, Plantuml, Stitch, Lark</p>
                      </div>
                      <div>
                        <p className="font-bold text-blue-600 mb-1">Documentation</p>
                        <p>BRD, FRD, User Stories, Use Cases, Process Flow (BPMN), Test Cases</p>
                      </div>
                      <div>
                        <p className="font-bold text-blue-600 mb-1">Data & Analysis</p>
                        <p>SQL (basic), Microsoft Excel, Google Sheets</p>
                      </div>
                      <div>
                        <p className="font-bold text-blue-600 mb-1">Methodology</p>
                        <p>Agile / Scrum, Waterfall, SDLC</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              
              <div className="mt-12 flex justify-center">
                <motion.a
                  href="https://drive.google.com/file/d/1zAsW3SrDmUKUZwW8Zx678nl0KfoarkR3/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                >
                  <FileText className="w-4 h-4" /> Download Resume (PDF)
                </motion.a>
              </div>
            </SpotlightCard>
          </motion.div>
          </div>
        </section>

        {/* Footer (Contact) */}
        <footer id="contact" className="pt-20 border-t border-white/5 scroll-mt-32 max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                T
              </motion.div>
              <p className="text-sm text-gray-500 font-mono">© 2026 NGUYỄN PHÚC THIÊN. ALL RIGHTS RESERVED.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600">Social</span>
                <div className="flex gap-6">
                  <motion.a 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    href="https://www.linkedin.com/in/phucthien432002/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    href="https://github.com/phucthien432002" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600">Contact</span>
                <div className="flex flex-col gap-2">
                  <motion.a 
                    whileHover={{ x: 5 }}
                    href="mailto:phucthien432002@gmail.com" 
                    className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> phucthien432002@gmail.com
                  </motion.a>
                  <motion.a 
                    whileHover={{ x: 5 }}
                    href="tel:+84903716806" 
                    className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> +84 903716806
                  </motion.a>
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
        </motion.div>
      </main>
      </ClickSpark>
    </div>
  );
}
