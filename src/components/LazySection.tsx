import React, { Suspense } from 'react';
import SectionSkeleton from './SectionSkeleton';

interface LazySectionProps {
  id: string;
  minHeight?: string;
  hasEntered: boolean;
  registerRef: (node: HTMLElement | null) => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * LazySection wrapper controlled by the centralized IntersectionObserver hook.
 * Holds exact layout dimensions via SectionSkeleton while offscreen, preventing CLS,
 * and mounts the code-split lazy component as soon as it nears the viewport.
 */
export const LazySection: React.FC<LazySectionProps> = React.memo(({
  id,
  minHeight = 'min-h-[500px]',
  hasEntered,
  registerRef,
  className = '',
  children
}) => {
  return (
    <div
      id={id}
      ref={registerRef}
      className={`scroll-mt-32 w-full ${className}`}
    >
      {hasEntered ? (
        <Suspense fallback={<SectionSkeleton height={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        <SectionSkeleton height={minHeight} />
      )}
    </div>
  );
});

LazySection.displayName = 'LazySection';
export default LazySection;
