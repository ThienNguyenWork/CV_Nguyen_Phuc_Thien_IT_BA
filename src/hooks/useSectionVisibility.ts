import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseSectionVisibilityOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export interface UseSectionVisibilityReturn {
  visibilityMap: Record<string, boolean>;
  hasEnteredMap: Record<string, boolean>;
  isNearViewport: (id: string) => boolean;
  hasEnteredViewport: (id: string) => boolean;
  registerSection: (id: string) => (node: HTMLElement | null) => void;
}

/**
 * Centralized IntersectionObserver hook to manage the visibility state of all sections.
 * Uses a single, shared IntersectionObserver instance to monitor all registered section elements,
 * ensuring sections only load, mount, and execute animations when near the viewport.
 */
export function useSectionVisibility(
  sectionIds: readonly string[],
  options: UseSectionVisibilityOptions = {}
): UseSectionVisibilityReturn {
  const {
    rootMargin = '300px 0px',
    threshold = 0
  } = options;

  // Initialize visibility state maps
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sectionIds.forEach(id => {
      initial[id] = false;
    });
    return initial;
  });

  const [hasEnteredMap, setHasEnteredMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sectionIds.forEach(id => {
      initial[id] = false;
    });
    return initial;
  });

  // Keep track of observed DOM nodes by section id
  const nodesRef = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup the single centralized IntersectionObserver instance
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for environments lacking IntersectionObserver: show all sections
      const allTrue: Record<string, boolean> = {};
      sectionIds.forEach(id => {
        allTrue[id] = true;
      });
      setVisibilityMap(allTrue);
      setHasEnteredMap(allTrue);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target.getAttribute('data-section-id') || entry.target.id;
          if (!targetId) return;

          const isIntersecting = entry.isIntersecting;

          setVisibilityMap((prev) => {
            if (prev[targetId] === isIntersecting) return prev;
            return { ...prev, [targetId]: isIntersecting };
          });

          if (isIntersecting) {
            setHasEnteredMap((prev) => {
              if (prev[targetId]) return prev;
              return { ...prev, [targetId]: true };
            });
          }
        });
      },
      {
        root: null,
        rootMargin,
        threshold
      }
    );

    observerRef.current = observer;

    // Observe all currently registered elements
    nodesRef.current.forEach((node) => {
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [rootMargin, threshold, sectionIds]);

  // Stable ref registration callback for sections
  const registerSection = useCallback((id: string) => {
    return (node: HTMLElement | null) => {
      const prevNode = nodesRef.current.get(id);

      if (prevNode && prevNode !== node && observerRef.current) {
        observerRef.current.unobserve(prevNode);
      }

      if (node) {
        node.setAttribute('data-section-id', id);
        nodesRef.current.set(id, node);
        if (observerRef.current) {
          observerRef.current.observe(node);
        }
      } else {
        nodesRef.current.delete(id);
      }
    };
  }, []);

  const isNearViewport = useCallback(
    (id: string) => Boolean(visibilityMap[id]),
    [visibilityMap]
  );

  const hasEnteredViewport = useCallback(
    (id: string) => Boolean(hasEnteredMap[id]),
    [hasEnteredMap]
  );

  return {
    visibilityMap,
    hasEnteredMap,
    isNearViewport,
    hasEnteredViewport,
    registerSection
  };
}

export default useSectionVisibility;
