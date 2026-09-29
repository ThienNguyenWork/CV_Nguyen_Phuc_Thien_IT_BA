import { useEffect, useRef } from 'react';

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
    let rafId: number | null = null;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let targetScale = 1;
    let currentScale = 1;
    let isHovering = false;
    let lastTarget: EventTarget | null = null;
    let currentInteractiveEl: Element | null = null;

    const updateLoop = () => {
      const diffX = targetX - currentX;
      const diffY = targetY - currentY;
      const diffScale = targetScale - currentScale;

      const isPositionSettled = Math.abs(diffX) < 0.1 && Math.abs(diffY) < 0.1;
      const isScaleSettled = Math.abs(diffScale) < 0.005;

      if (isPositionSettled && isScaleSettled) {
        currentX = targetX;
        currentY = targetY;
        currentScale = targetScale;
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
        }
        rafId = null;
        return; // Sleep loop when settled
      }

      currentX += diffX * lerp;
      currentY += diffY * lerp;
      currentScale += diffScale * 0.2;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateLoop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - offset;
      targetY = e.clientY - offset;
      startLoop();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || target === lastTarget) return;
      lastTarget = target;

      let hover = false;
      if (currentInteractiveEl && currentInteractiveEl.contains(target)) {
        hover = true;
      } else {
        const interactive = target.closest('button, a, .cursor-pointer, input, textarea, [role="button"]');
        currentInteractiveEl = interactive;
        hover = Boolean(interactive);
      }

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
        startLoop();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, [lerp, offset]);

  return { followerRef };
}

export default useSmoothCursor;
