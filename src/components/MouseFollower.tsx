import React from 'react';
import useSmoothCursor from '../hooks/useSmoothCursor';

export const MouseFollower: React.FC = React.memo(() => {
  const { followerRef, isHovering } = useSmoothCursor();

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

MouseFollower.displayName = 'MouseFollower';
export default MouseFollower;
