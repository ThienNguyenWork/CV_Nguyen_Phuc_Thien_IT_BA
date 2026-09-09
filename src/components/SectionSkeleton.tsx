import React from 'react';

interface SectionSkeletonProps {
  height?: string;
  className?: string;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = React.memo(({ 
  height = "min-h-[400px]", 
  className = "" 
}) => {
  return (
    <div 
      className={`w-full ${height} max-w-6xl mx-auto px-8 mb-48 flex flex-col justify-center items-center opacity-30 animate-pulse ${className}`}
      aria-hidden="true"
    >
      <div className="w-16 h-3 bg-blue-500/20 rounded-full mb-4" />
      <div className="w-48 h-8 bg-white/10 rounded-xl mb-6" />
      <div className="w-full max-w-2xl h-24 bg-white/5 rounded-2xl border border-white/5" />
    </div>
  );
});

SectionSkeleton.displayName = 'SectionSkeleton';

export default SectionSkeleton;
