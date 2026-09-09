import { useEffect, useRef } from 'react';

interface UseSpotlightOptions {
  color?: string;
  size?: number;
  initialPos?: string;
}

/**
 * Custom hook for requestAnimationFrame-throttled spotlight tracking
 * Mutates DOM styles directly on the ref to prevent React re-renders during mouse movement.
 */
export function useSpotlight({
  color = 'rgba(37, 99, 235, 0.12)',
  size = 800,
}: UseSpotlightOptions = {}) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const posRef = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400, 
    y: typeof window !== 'undefined' ? window.innerHeight * 0.3 : 300 
  });

  useEffect(() => {
    const half = size / 2;
    if (spotlightRef.current) {
      spotlightRef.current.style.width = `${size}px`;
      spotlightRef.current.style.height = `${size}px`;
      spotlightRef.current.style.marginLeft = `-${half}px`;
      spotlightRef.current.style.marginTop = `-${half}px`;
      spotlightRef.current.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
      spotlightRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      spotlightRef.current.style.willChange = 'transform';
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        }
        rafId.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [color, size]);

  return spotlightRef;
}

export default useSpotlight;
