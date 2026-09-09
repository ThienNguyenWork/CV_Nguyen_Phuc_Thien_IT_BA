import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;
  };

  const handleMouseEnter = () => {
    if (spotRef.current) spotRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

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
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0"
        style={{ willChange: "opacity" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default React.memo(SpotlightCard);
