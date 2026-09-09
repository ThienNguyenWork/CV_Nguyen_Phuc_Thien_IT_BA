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
  initialPos = '50vw 30vh'
}: UseSpotlightOptions = {}) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Set initial background gradient
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(${size}px circle at ${initialPos}, ${color}, transparent 80%)`;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(${size}px circle at ${e.clientX}px ${e.clientY}px, ${color}, transparent 80%)`;
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
  }, [color, size, initialPos]);

  return spotlightRef;
}

export default useSpotlight;
