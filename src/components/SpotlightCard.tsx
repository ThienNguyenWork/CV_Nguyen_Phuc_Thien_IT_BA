import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  spotlightSize = 600,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const updatePosition = () => {
    if (spotRef.current) {
      spotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }
    rafRef.current = null;
  };

  const handleMouseEnter = () => {
    if (divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }
    if (spotRef.current) {
      spotRef.current.style.opacity = "1";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;

    posRef.current.x = e.clientX - rectRef.current.left;
    posRef.current.y = e.clientY - rectRef.current.top;

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (spotRef.current) {
      spotRef.current.style.opacity = "0";
    }
  };

  const halfSize = spotlightSize / 2;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 ${className}`}
      {...props}
    >
      <div
        ref={spotRef}
        className="pointer-events-none absolute rounded-full transition-opacity duration-300 opacity-0"
        style={{
          width: `${spotlightSize}px`,
          height: `${spotlightSize}px`,
          left: 0,
          top: 0,
          marginLeft: `-${halfSize}px`,
          marginTop: `-${halfSize}px`,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 65%)`,
          willChange: "transform, opacity",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default React.memo(SpotlightCard);
