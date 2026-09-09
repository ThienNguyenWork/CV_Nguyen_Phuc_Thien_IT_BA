import React from 'react';
import useSpotlight from '../hooks/useSpotlight';

export const Background: React.FC = React.memo(() => {
  const spotlightRef = useSpotlight();

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

Background.displayName = 'Background';
export default Background;
