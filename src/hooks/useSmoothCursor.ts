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

  useEffect(() => {
    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let targetScale = 1;
    let currentScale = 1;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - offset;
      targetY = e.clientY - offset;
    };

    const updateLoop = () => {
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;
      currentScale += (targetScale - currentScale) * 0.2;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hover = Boolean(target?.closest('button, a, .cursor-pointer, input, textarea, [role="button"]'));
      if (hover !== isHovering) {
        isHovering = hover;
        targetScale = hover ? 1.5 : 1.0;
        if (followerRef.current) {
          if (hover) {
            followerRef.current.classList.add('bg-blue-500/10');
            followerRef.current.classList.remove('bg-transparent');
          } else {
            followerRef.current.classList.remove('bg-blue-500/10');
            followerRef.current.classList.add('bg-transparent');
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [lerp, offset]);

  return { followerRef };
}

export default useSmoothCursor;
