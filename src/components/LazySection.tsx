import React, { Suspense, useState, useEffect, useRef } from 'react';
import SectionSkeleton from './SectionSkeleton';

interface LazySectionProps {
  id: string;
  minHeight?: string;
  className?: string;
  rootMargin?: string;
  children?: React.ReactNode;
  renderContent?: (isVisible: boolean) => React.ReactNode;
}

/**
 * Self-contained LazySection component with localized IntersectionObserver.
 * Holds exact layout dimensions via SectionSkeleton while offscreen to prevent CLS,
 * and mounts the code-split lazy component as soon as it nears the viewport.
 * 
 * CRITICAL PERFORMANCE DESIGN:
 * Isolating visibility state inside this component completely prevents App root
 * re-renders during scrolling, keeping all sibling sections untouched.
 */
export const LazySection: React.FC<LazySectionProps> = React.memo(({
  id,
  minHeight = 'min-h-[500px]',
  className = '',
  rootMargin = '350px 0px',
  children,
  renderContent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const intersecting = entry.isIntersecting;
        setIsVisible(intersecting);
        if (intersecting) {
          setHasEntered(true);
        }
      },
      { rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`scroll-mt-32 w-full ${className}`}
    >
      {hasEntered ? (
        <Suspense fallback={<SectionSkeleton height={minHeight} />}>
          {typeof renderContent === 'function' ? renderContent(isVisible) : children}
        </Suspense>
      ) : (
        <SectionSkeleton height={minHeight} />
      )}
    </div>
  );
});

LazySection.displayName = 'LazySection';
export default LazySection;
