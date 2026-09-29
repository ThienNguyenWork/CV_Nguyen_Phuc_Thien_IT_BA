import React, { useEffect, useRef } from 'react';
import useSpotlight from '../hooks/useSpotlight';

// Precomputed static particle definitions to avoid array allocation on render
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  top: `${(i * 19 + 5) % 100}%`,
  left: `${(i * 23 + 11) % 100}%`,
  animationDuration: `${3 + (i % 5)}s`
}));

export const Background: React.FC = React.memo(() => {
  const spotlightRef = useSpotlight();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        el.classList.add('bg-paused');
      } else {
        el.classList.remove('bg-paused');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303] isolate"
    >
      {/* Base Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Dynamic Spotlight - Hardware-accelerated GPU layer */}
      <div 
        ref={spotlightRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-opacity duration-300"
      />

      {/* Subtle Ambient Blobs - Fast GPU-composited radial glow fields (zero blur filter cost) */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.14) 0%, rgba(37, 99, 235, 0.05) 45%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full animate-float-delayed pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.12) 0%, rgba(147, 51, 234, 0.04) 45%, transparent 70%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.08) 0%, rgba(96, 165, 250, 0.02) 45%, transparent 70%)',
        }}
      />

      {/* Floating Particles - CSS Accelerated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              top: particle.top,
              left: particle.left,
              opacity: 0.25,
              animationDuration: particle.animationDuration
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
});

Background.displayName = 'Background';
export default Background;
