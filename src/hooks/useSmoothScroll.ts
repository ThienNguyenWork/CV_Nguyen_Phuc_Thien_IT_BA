import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections and page top
 * with automatic header offset adjustment.
 */
export function useSmoothScroll(headerOffset = 80) {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, [headerOffset]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return { scrollToSection, scrollToTop };
}

export default useSmoothScroll;
