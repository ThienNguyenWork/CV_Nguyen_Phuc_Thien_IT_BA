import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Search, 
  PenTool, 
  Database, 
  Users, 
  ClipboardList, 
  Terminal,
  Code,
  Cpu,
  Zap,
  Globe
} from 'lucide-react';

const skills = [
  // Orbit 0: Inner (Clockwise)
  { name: "Requirement Gathering", icon: Search, description: "Eliciting stakeholder needs", orbit: 0, speed: 35, direction: 1, startAngle: 0, color: "#3b82f6" },
  { name: "Stakeholder Management", icon: Users, description: "Bridging business & tech", orbit: 0, speed: 35, direction: 1, startAngle: 180, color: "#60a5fa" },
  
  // Orbit 1: Middle (Counter-Clockwise)
  { name: "Wireframing", icon: PenTool, description: "Visualizing system logic", orbit: 1, speed: 50, direction: -1, startAngle: 90, color: "#2563eb" },
  { name: "Documentation", icon: ClipboardList, description: "BRD, FRD & User Stories", orbit: 1, speed: 50, direction: -1, startAngle: 270, color: "#1d4ed8" },
  
  // Orbit 2: Outer (Clockwise)
  { name: "Data Analysis", icon: Database, description: "Data-driven insights", orbit: 2, speed: 65, direction: 1, startAngle: 45, color: "#1e40af" },
  { name: "Agile/Scrum", icon: Terminal, description: "Iterative development", orbit: 2, speed: 65, direction: 1, startAngle: 225, color: "#1e3a8a" },
];

const OrbitalEcosystem = () => {
  const [dimensions, setDimensions] = React.useState({ width: 1200, height: 800 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [35, 15]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const orbitConfigs = [
    { radius: 240, opacity: 0.2, color: "#3b82f6" },
    { radius: 420, opacity: 0.15, color: "#2563eb" },
    { radius: 600, opacity: 0.1, color: "#1d4ed8" },
  ];

  const getRadius = (baseRadius: number) => {
    const scale = dimensions.width < 768 ? 0.3 : dimensions.width < 1024 ? 0.6 : 1;
    return baseRadius * scale;
  };

  const isInView = useInView(containerRef, { margin: "100px", once: false });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full min-h-[600px] md:min-h-[1000px] flex items-center justify-center overflow-visible perspective-[2000px] transition-all duration-700 ${
        isInView ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-12 pointer-events-none"
      }`}
    >
      {/* 3D Stage Wrapper - Only active when in viewport */}
      {isInView && (
        <motion.div 
          style={{ rotateX, rotateZ }}
          className="relative w-full h-full flex items-center justify-center transform-style-3d"
        >
        {/* Holographic Grid Floor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] rotate-x-90 translate-z-[-200px]" />

        {/* Orbital Rings - Enhanced SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <radialGradient id="ringGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
            </radialGradient>
          </defs>
          {orbitConfigs.map((config, i) => (
            <g key={`ring-group-${i}`}>
              <circle
                cx="50%"
                cy="50%"
                r={getRadius(config.radius)}
                fill="none"
                stroke={config.color}
                strokeWidth="1"
                strokeDasharray="1 10"
                opacity={config.opacity}
              />
              <circle
                cx="50%"
                cy="50%"
                r={getRadius(config.radius)}
                fill="none"
                stroke={config.color}
                strokeWidth="0.5"
                opacity={config.opacity * 0.5}
              />
            </g>
          ))}
        </svg>

        {/* Central Cyber-Core */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="relative z-50 group"
        >
          {/* Core Energy Layers */}
          <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-[80px] animate-pulse" />
          <div className="absolute -inset-20 rounded-full border border-blue-500/10 animate-[spin_30s_linear_infinite]" />
          <div className="absolute -inset-40 rounded-full border border-blue-500/5 animate-[spin_45s_linear_infinite_reverse]" />
          
          {/* The Nexus Sphere */}
          <div className="relative w-32 h-32 md:w-80 md:h-80 rounded-full bg-black border border-blue-500/40 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.3)]">
            {/* Internal Data Stream Animation */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    top: ['-100%', '200%'],
                    left: [`${20 * i}%`, `${20 * i}%`]
                  }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-8">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-8 h-8 md:w-24 md:h-24 text-white mb-6 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
              </motion.div>
              
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

        {/* Holographic Orbiting Modules */}
        {skills.map((skill, index) => {
          const config = orbitConfigs[skill.orbit];
          const radius = getRadius(config.radius);
          const orbitDuration = skill.speed;
          const direction = skill.direction;
          const startAngle = skill.startAngle;
          
          return (
            <motion.div
              key={index}
              className="absolute z-40"
              initial={{ rotate: startAngle }}
              animate={{
                rotate: [startAngle, startAngle + 360 * direction],
              }}
              transition={{
                duration: orbitDuration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: radius * 2,
                height: radius * 2,
                willChange: 'transform',
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ rotate: -startAngle }}
                animate={{
                  rotate: [-startAngle, -startAngle - 360 * direction],
                }}
                transition={{
                  duration: orbitDuration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1, 
                    translateZ: 100,
                    boxShadow: `0 0 40px ${skill.color}40`
                  }}
                  className="relative group cursor-pointer"
                >
                  {/* Holographic Module UI */}
                  <div className="bg-[#050914]/90 border border-white/10 p-4 md:p-8 rounded-[2rem] flex flex-col items-center gap-4 md:gap-6 min-w-[120px] md:min-w-[300px] transition-all duration-500 group-hover:border-blue-500/50 shadow-2xl overflow-hidden">
                    
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
                      <div className="relative p-3 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
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
              </motion.div>
            </motion.div>
          );
        })}

        {/* Deep Space Star Dust - Lightweight CSS */}
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

      </motion.div>
      )}
    </div>
  );
};

export default React.memo(OrbitalEcosystem);
