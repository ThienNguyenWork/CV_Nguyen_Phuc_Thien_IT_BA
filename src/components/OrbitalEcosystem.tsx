import React from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Cpu, 
  Zap, 
  Globe 
} from 'lucide-react';
import { orbitalSkills as skills, orbitConfigs } from '../data/skillsEcosystemData';

interface OrbitalEcosystemProps {
  isVisible?: boolean;
}

// Memoized SVG Orbit Rings Guide with isolated stacking context
const OrbitRings: React.FC<{ scale: number }> = React.memo(({ scale }) => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ isolation: 'isolate' }}
    >
      <defs>
        <radialGradient id="ringGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </radialGradient>
      </defs>
      {orbitConfigs.map((config, i) => {
        const r = config.radius * scale;
        return (
          <g key={`ring-group-${i}`}>
            <circle
              cx="50%"
              cy="50%"
              r={r}
              fill="none"
              stroke={config.color}
              strokeWidth="1"
              strokeDasharray="1 10"
              opacity={config.opacity}
            />
            <circle
              cx="50%"
              cy="50%"
              r={r}
              fill="none"
              stroke={config.color}
              strokeWidth="0.5"
              opacity={config.opacity * 0.5}
            />
          </g>
        );
      })}
    </svg>
  );
});

OrbitRings.displayName = 'OrbitRings';

// Memoized Central Cyber-Core / System Nexus Sphere
const SystemNexus: React.FC<{ isInView: boolean }> = React.memo(({ isInView }) => {
  return (
    <motion.div 
      initial={{ scale: 0.7, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-50 group"
    >
      {/* Core Energy Layers - Hardware accelerated radial glow */}
      <div 
        className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
          animationPlayState: isInView ? 'running' : 'paused',
        }}
      />
      <div 
        className="absolute -inset-20 rounded-full border border-blue-500/10 pointer-events-none"
        style={{
          animation: 'orbit-spin-cw 30s linear infinite',
          animationPlayState: isInView ? 'running' : 'paused',
        }}
      />
      <div 
        className="absolute -inset-40 rounded-full border border-blue-500/5 pointer-events-none"
        style={{
          animation: 'orbit-spin-ccw 45s linear infinite',
          animationPlayState: isInView ? 'running' : 'paused',
        }}
      />
      
      {/* The Nexus Sphere */}
      <div className="relative w-32 h-32 md:w-80 md:h-80 rounded-full bg-black border border-blue-500/40 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.3)] hover:border-blue-500/70 hover:shadow-[0_0_60px_rgba(37,99,235,0.45)] transition-[border-color,box-shadow] duration-300 cursor-pointer">
        {/* Internal Data Stream Animation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent pause-on-scroll"
              style={{
                left: `${20 * i + 10}%`,
                animation: `nexus-data-stream ${3 + i}s linear infinite`,
                animationPlayState: isInView ? 'running' : 'paused',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-8 select-none">
          <div
            className="relative"
            style={{
              animation: 'nexus-cpu-spin 10s linear infinite',
              animationPlayState: isInView ? 'running' : 'paused',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Pure hardware radial glow replaces CPU blur filter to eliminate 3D software rasterization */}
            <div 
              className="absolute -inset-2 rounded-full pointer-events-none -z-10" 
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 75%)',
              }}
            />
            <Cpu className="w-8 h-8 md:w-24 md:h-24 text-white mb-6" />
          </div>
          
          <h3 className="text-xs md:text-3xl font-black text-white uppercase tracking-[0.5em] mb-2">
            SYSTEM <span className="text-blue-500">NEXUS</span>
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-blue-500/50" />
            <Zap 
              className="w-4 h-4 text-blue-400 animate-pulse" 
              style={{ animationPlayState: isInView ? 'running' : 'paused' }}
            />
            <div className="h-px w-8 bg-blue-500/50" />
          </div>
          <p className="text-[6px] md:text-xs font-mono text-blue-400/60 uppercase tracking-[0.8em]">
            IT Business Analyst
          </p>
        </div>

        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
});

SystemNexus.displayName = 'SystemNexus';

// Memoized Individual Orbiting Skill Module
interface OrbitingSkillModuleProps {
  skill: typeof skills[number];
  index: number;
  scale: number;
  isInView: boolean;
}

const OrbitingSkillModule: React.FC<OrbitingSkillModuleProps> = React.memo(({
  skill,
  index,
  scale,
  isInView
}) => {
  const config = orbitConfigs[skill.orbit];
  const radius = config.radius * scale;
  const orbitDuration = skill.speed;
  const direction = skill.direction;
  const startAngle = skill.startAngle;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        transform: `rotate(${startAngle}deg)`,
        transformOrigin: 'center center',
      }}
    >
      {/* Outer rotating ring driven by GPU compositor thread */}
      <div
        className="w-full h-full relative group/orbit"
        style={{
          animation: `${direction > 0 ? 'orbit-spin-cw' : 'orbit-spin-ccw'} ${orbitDuration}s linear infinite`,
          animationPlayState: isInView ? 'running' : 'paused',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {/* Module anchor point at top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          {/* Inner counter-rotating module to keep card perfectly upright */}
          <div
            style={{
              animation: `${direction > 0 ? 'orbit-spin-ccw' : 'orbit-spin-cw'} ${orbitDuration}s linear infinite`,
              animationPlayState: isInView ? 'running' : 'paused',
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            {/* Counter-rotation static offset */}
            <div style={{ transform: `rotate(${-startAngle}deg)` }}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative group cursor-pointer"
              >
                {/* Hardware-accelerated ambient glow on hover */}
                <div
                  className="absolute -inset-1 rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${skill.color}50 0%, transparent 70%)`,
                  }}
                />

                {/* Holographic Module UI */}
                <div className="relative bg-[#050914] border border-white/10 p-4 md:p-8 rounded-[2rem] flex flex-col items-center gap-4 md:gap-6 min-w-[120px] md:min-w-[300px] transition-[border-color] duration-200 group-hover:border-blue-500/50 shadow-xl overflow-hidden">
                  
                  {/* Module Header */}
                  <div className="w-full flex justify-between items-center mb-2 px-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse pause-on-scroll" 
                        style={{ animationPlayState: isInView ? 'running' : 'paused' }}
                      />
                      <span className="text-[8px] font-mono text-blue-500/70 uppercase tracking-widest">Module_{index + 1}</span>
                    </div>
                    <Globe className="w-3 h-3 text-white/20" />
                  </div>

                  {/* Icon with Energy Ring */}
                  <div className="relative">
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
                      }}
                    />
                    <div className="relative p-3 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-[background-color,border-color,color] duration-200">
                      <skill.icon className="w-5 h-5 md:w-10 md:h-10 text-blue-400 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Module Content */}
                  <div className="text-center">
                    <h4 className="text-[10px] md:text-lg font-black uppercase tracking-[0.2em] text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                      {skill.name}
                    </h4>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />
                    <p className="hidden md:block text-[10px] md:text-xs text-gray-500 font-light leading-relaxed max-w-[220px] opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                      {skill.description}
                    </p>
                  </div>

                  {/* Technical UI Accents */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />
                </div>

                {/* Data Line to Center */}
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 w-px h-[150px] bg-gradient-to-b from-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

OrbitingSkillModule.displayName = 'OrbitingSkillModule';

// Memoized Deep Space Star Dust
const DeepSpaceStarDust: React.FC<{ isInView: boolean }> = React.memo(({ isInView }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse pause-on-scroll"
          style={{
            top: `${(i * 13 + 7) % 100}%`,
            left: `${(i * 17 + 11) % 100}%`,
            opacity: 0.3,
            animationDuration: `${3 + (i % 4)}s`,
            animationPlayState: isInView ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  );
});

DeepSpaceStarDust.displayName = 'DeepSpaceStarDust';

const OrbitalEcosystem: React.FC<OrbitalEcosystemProps> = ({ isVisible }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Track responsive tier scale (0.3 | 0.6 | 1) rather than raw pixels to prevent unnecessary re-renders
  const [scale, setScale] = React.useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    return w < 768 ? 0.3 : w < 1024 ? 0.6 : 1;
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rawRotateX = useTransform(scrollYProgress, [0, 1], [35, 15]);
  const rawRotateZ = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  // Spring smoothing with restDelta prevents per-pixel 3D matrix recalculation on scroll
  const rotateX = useSpring(rawRotateX, { stiffness: 70, damping: 22, restDelta: 0.05 });
  const rotateZ = useSpring(rawRotateZ, { stiffness: 70, damping: 22, restDelta: 0.05 });

  // ResizeObserver with RAF debouncing - updates scale ONLY when breakpoint changes
  React.useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === 'undefined') return;

    let rafId: number | null = null;
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const width = entries[0].contentRect.width;
      const newScale = width < 768 ? 0.3 : width < 1024 ? 0.6 : 1;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScale((prev) => (prev !== newScale ? newScale : prev));
      });
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const localInView = useInView(containerRef, { margin: "150px", once: false });
  const isInView = isVisible !== undefined ? isVisible : localInView;

  // Lightweight scroll-state detection:
  // ONLY attached while Ecosystem is in-view. Completely detached when offscreen so
  // scrolling in Experience / Technical Skills / Resume / Contact executes ZERO ecosystem work.
  React.useEffect(() => {
    if (!isInView) return;

    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    let timer: number | null = null;
    let isScrolling = false;

    const onScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        el.classList.add('is-scrolling');
      }
      if (timer !== null) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(() => {
        isScrolling = false;
        el.classList.remove('is-scrolling');
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer !== null) {
        window.clearTimeout(timer);
      }
      el.classList.remove('is-scrolling');
    };
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full min-h-[600px] md:min-h-[1000px] flex items-center justify-center overflow-visible perspective-[2000px] transition-opacity duration-500 ${
        isInView ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        visibility: isInView ? 'visible' : 'hidden',
        contain: 'layout style',
      }}
    >
      {/* 3D Stage Wrapper - Compositor accelerated without layer over-promotion */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateZ,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Holographic Grid Floor - Constrained GPU-optimized plane (replaces giant 200% alpha mask) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] md:w-[1300px] h-[900px] md:h-[1300px] pointer-events-none"
          style={{
            transform: 'rotateX(82deg) translateZ(-160px)',
            backgroundImage: `
              radial-gradient(circle at center, rgba(59, 130, 246, 0.09) 0%, transparent 68%),
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 60px 60px, 60px 60px',
            borderRadius: '50%',
          }}
        />

        {/* Orbit Rings (Memoized) */}
        <OrbitRings scale={scale} />

        {/* Central System Nexus (Memoized) */}
        <SystemNexus isInView={isInView} />

        {/* Holographic Orbiting Modules (Compositor-driven, Memoized) */}
        {skills.map((skill, index) => (
          <OrbitingSkillModule
            key={skill.name}
            skill={skill}
            index={index}
            scale={scale}
            isInView={isInView}
          />
        ))}

        {/* Deep Space Star Dust (Memoized, paused offscreen) */}
        <DeepSpaceStarDust isInView={isInView} />
      </motion.div>
    </div>
  );
};

export default React.memo(OrbitalEcosystem);
