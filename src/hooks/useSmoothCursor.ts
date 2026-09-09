import { useEffect, useRef, useState } from 'react';

interface UseSmoothCursorOptions {
  lerp?: number;
  offset?: number;
}

/**
 * Custom hook for smooth cursor tracking with linear interpolation (lerp).
 * Keeps high-frequency coordinates inside refs and updates transforms via RAF loop,
 * maintaining 60+ FPS while avoiding re-renders on mousemove.
 */
export function useSmoothCursor({
  lerp = 0.25,
  offset = 16
}: UseSmoothCursorOptions = {}) {
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - offset;
      targetY = e.clientY - offset;
    };

    const updateLoop = () => {
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hover = Boolean(target?.closest('button, a, .cursor-pointer, input, textarea'));
      setIsHovering(prev => (prev !== hover ? hover : prev));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [lerp, offset]);

  return { followerRef, isHovering };
}

export default useSmoothCursor;
