import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Search, 
  PenTool, 
  Database, 
  Users, 
  ClipboardList, 
  Terminal, 
  Cpu, 
  Zap, 
  Globe 
} from 'lucide-react';

const skills = [
  // Orbit 0: Inner (Clockwise, 35s)
  { name: "Requirement Gathering", icon: Search, description: "Eliciting stakeholder needs", orbit: 0, speed: 35, direction: 1, startAngle: 0, color: "#3b82f6" },
  { name: "Stakeholder Management", icon: Users, description: "Bridging business & tech", orbit: 0, speed: 35, direction: 1, startAngle: 180, color: "#60a5fa" },
  
  // Orbit 1: Middle (Counter-Clockwise, 50s)
  { name: "Wireframing", icon: PenTool, description: "Visualizing system logic", orbit: 1, speed: 50, direction: -1, startAngle: 90, color: "#2563eb" },
  { name: "Documentation", icon: ClipboardList, description: "BRD, FRD & User Stories", orbit: 1, speed: 50, direction: -1, startAngle: 270, color: "#1d4ed8" },
  
  // Orbit 2: Outer (Clockwise, 65s)
  { name: "Data Analysis", icon: Database, description: "Data-driven insights", orbit: 2, speed: 65, direction: 1, startAngle: 45, color: "#1e40af" },
  { name: "Agile/Scrum", icon: Terminal, description: "Iterative development", orbit: 2, speed: 65, direction: 1, startAngle: 225, color: "#1e3a8a" },
] as const;

const orbitConfigs = [
  { radius: 240, opacity: 0.2, color: "#3b82f6" },
  { radius: 420, opacity: 0.15, color: "#2563eb" },
  { radius: 600, opacity: 0.1, color: "#1d4ed8" },
] as const;

interface OrbitalEcosystemProps {
  isVisible?: boolean;
}

// Memoized SVG Orbit Rings Guide
const OrbitRings: React.FC<{ scale: number }> = React.memo(({ scale }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
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
          willChange: 'opacity',
        }}
      />
      <div 
        className="absolute -inset-20 rounded-full border border-blue-500/10 pointer-events-none"
        style={{
          animation: 'orbit-spin-cw 30s linear infinite',
          animationPlayState: isInView ? 'running' : 'paused',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute -inset-40 rounded-full border border-blue-500/5 pointer-events-none"
        style={{
          animation: 'orbit-spin-ccw 45s linear infinite',
          animationPlayState: isInView ? 'running' : 'paused',
          willChange: 'transform',
        }}
      />
      
      {/* The Nexus Sphere */}
      <div className="relative w-32 h-32 md:w-80 md:h-80 rounded-full bg-black border border-blue-500/40 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.3)]">
        {/* Internal Data Stream Animation - Hardware GPU Composited translateY */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
              style={{
                left: `${20 * i + 10}%`,
                animation: `nexus-data-stream ${3 + i}s linear infinite`,
                animationPlayState: isInView ? 'running' : 'paused',
                willChange: 'transform',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-8 select-none">
          <div
            style={{
              animation: 'nexus-cpu-spin 10s linear infinite',
              animationPlayState: isInView ? 'running' : 'paused',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            <Cpu className="w-8 h-8 md:w-24 md:h-24 text-white mb-6 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
          </div>
          
          <h3 className="text-xs md:text-3xl font-black text-white uppercase tracking-[0.5em] mb-2">
            SYSTEM <span className="text-blue-500">NEXUS</span>
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-blue-500/50" />
            <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
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
                whileHover={{ 
                  scale: 1.08, 
                  translateZ: 80,
                  boxShadow: `0 0 30px ${skill.color}40`
                }}
                transition={{ duration: 0.2 }}
                className="relative group cursor-pointer"
              >
                {/* Holographic Module UI */}
                <div className="bg-[#050914]/90 border border-white/10 p-4 md:p-8 rounded-[2rem] flex flex-col items-center gap-4 md:gap-6 min-w-[120px] md:min-w-[300px] transition-all duration-300 group-hover:border-blue-500/50 shadow-xl overflow-hidden backdrop-blur-sm">
                  
                  {/* Module Header */}
                  <div className="w-full flex justify-between items-center mb-2 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[8px] font-mono text-blue-500/70 uppercase tracking-widest">Module_{index + 1}</span>
                    </div>
                    <Globe className="w-3 h-3 text-white/20" />
                  </div>

                  {/* Icon with Energy Ring */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                    <div className="relative p-3 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <skill.icon className="w-5 h-5 md:w-10 md:h-10 text-blue-400 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Module Content */}
                  <div className="text-center">
                    <h4 className="text-[10px] md:text-lg font-black uppercase tracking-[0.2em] text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h4>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />
                    <p className="hidden md:block text-[10px] md:text-xs text-gray-500 font-light leading-relaxed max-w-[220px] opacity-60 group-hover:opacity-100 transition-opacity">
                      {skill.description}
                    </p>
                  </div>

                  {/* Technical UI Accents */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />
                </div>

                {/* Data Line to Center */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-[150px] bg-gradient-to-b from-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
const DeepSpaceStarDust: React.FC = React.memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
          style={{
            top: `${(i * 13 + 7) % 100}%`,
            left: `${(i * 17 + 11) % 100}%`,
            opacity: 0.3,
            animationDuration: `${3 + (i % 4)}s`,
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

  const rotateX = useTransform(scrollYProgress, [0, 1], [35, 15]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-5, 5]);

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
      {/* 3D Stage Wrapper - hardware accelerated with will-change */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateZ,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Holographic Grid Floor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] rotate-x-90 translate-z-[-200px] pointer-events-none" />

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

        {/* Deep Space Star Dust (Memoized) */}
        <DeepSpaceStarDust />
      </motion.div>
    </div>
  );
};

export default React.memo(OrbitalEcosystem);
