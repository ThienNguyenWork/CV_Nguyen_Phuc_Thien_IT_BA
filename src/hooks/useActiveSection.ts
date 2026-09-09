import { useState, useEffect } from 'react';

/**
 * Custom hook that observes section headings or sections using IntersectionObserver
 * to identify which section is currently active, without attaching heavy scroll listeners.
 */
export function useActiveSection(sectionIds: string[], rootMargin = '-20% 0px -60% 0px') {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [sectionIds, rootMargin]);

  return activeSection;
}

export default useActiveSection;
