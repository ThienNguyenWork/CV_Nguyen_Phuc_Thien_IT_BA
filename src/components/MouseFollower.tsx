import React from 'react';
import useSmoothCursor from '../hooks/useSmoothCursor';

export const MouseFollower: React.FC = React.memo(() => {
  const { followerRef } = useSmoothCursor();

  return (
    <div
      ref={followerRef}
      className="fixed top-0 left-0 w-8 h-8 border border-blue-500 rounded-full pointer-events-none z-[9999] hidden md:block bg-transparent transition-[background-color,border-color] duration-150"
      style={{ willChange: 'transform' }}
    />
  );
});

MouseFollower.displayName = 'MouseFollower';
export default MouseFollower;
