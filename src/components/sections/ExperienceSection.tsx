import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Briefcase, Sparkles, CheckCircle2, ChevronRight, ArrowDown } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';
import { experiences, type ExperienceItemData } from '../../data/experienceData';

const ExperienceTimelineItem: React.FC<{ 
  item: ExperienceItemData;
  index: number;
  totalCount: number;
  isExpanded: boolean;
  onToggle: (id: string, index: number) => void;
  innerRef: (el: HTMLDivElement | null) => void;
}> = React.memo(({ 
  item,
  index,
  totalCount,
  isExpanded,
  onToggle,
  innerRef
}) => {
  const isEven = index % 2 === 0;
  const isLast = index === totalCount - 1;
  const scrollsToSkills = isLast; // Only the experience immediately adjacent to Stack Technical Skills scrolls to Skills
  
  return (
    <div 
      ref={innerRef}
      id={`experience-${item.id}`}
      className={`relative flex flex-col md:flex-row items-start justify-between mb-12 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Connector Line for Mobile */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 md:hidden" />
      
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full md:w-[46%] pl-12 md:pl-0"
      >
        <SpotlightCard className={`p-6 bg-[#0a0a0a] border transition-colors duration-200 group rounded-xl ${
          isExpanded ? 'border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.08)]' : 'border-white/5 hover:border-blue-500/30'
        }`}>
          {/* Header click area */}
          <div 
            onClick={() => onToggle(item.id, index)}
            className="cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle(item.id, index);
              }
            }}
          >
            {/* Top Badge & Duration */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em] font-semibold">
                  {item.period}
                </span>
                {item.isCurrent && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-gray-500 px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                {item.duration}
              </span>
            </div>

            {/* Role & Company */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors duration-200">
                  {item.role}
                </h3>
                <p className="text-gray-300 font-medium text-sm mt-1 flex items-center gap-1.5">
                  <span className="text-gray-400">{item.company}</span>
                </p>
              </div>

              {/* Toggle indicator button on header */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(item.id, index);
                }}
                className={`flex-shrink-0 p-2 rounded-lg border transition-all duration-200 ${
                  isExpanded 
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 group-hover:border-blue-500/30'
                }`}
                title={isExpanded ? "Collapse details" : "View details"}
                aria-label={isExpanded ? "Collapse experience details" : "Expand experience details"}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Skill / Focus Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {item.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-400 border border-white/[0.06] group-hover:border-white/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Collapsed Preview Snippet */}
            {!isExpanded && (
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-start gap-2 text-gray-400 text-xs leading-relaxed line-clamp-2">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{item.description[0]}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    View Details ({item.description.length} points)
                  </span>
                  <span className="text-[11px] underline underline-offset-4 opacity-80 group-hover:opacity-100 flex items-center gap-0.5">
                    Expand <ChevronDown className="w-3 h-3 inline" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Expanded Content with Smooth Animation */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    Key Deliverables & Responsibilities ({item.description.length}):
                  </div>
                  <ul className="space-y-3">
                    {item.description.map((point, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Collapse Button at Bottom of Card */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-gray-400 hidden sm:inline-flex items-center gap-1.5">
                      <ArrowDown className="w-3 h-3 text-blue-400" />
                      {scrollsToSkills 
                        ? "Collapsing scrolls to Technical Skills" 
                        : "Collapsing scrolls to next milestone"}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggle(item.id, index)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-200 hover:text-white px-3.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all duration-200 shadow-sm"
                      title={scrollsToSkills ? "Collapse details and scroll to Technical Skills" : "Collapse details and scroll to next milestone"}
                    >
                      <span>{scrollsToSkills ? "Collapse & Go to Skills" : "Collapse & Next"}</span>
                      <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SpotlightCard>
      </motion.div>

      {/* Center Dot (Anchored at top-8 level so it stays aligned with card header) */}
      <div className={`absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full border-4 border-[#030303] -translate-x-1/2 z-20 transition-all duration-300 ${
        isExpanded 
          ? 'bg-blue-500 scale-110 shadow-[0_0_16px_rgba(59,130,246,0.8)]' 
          : 'bg-blue-600/80 shadow-[0_0_10px_rgba(37,99,235,0.4)]'
      }`} />
      
      <div className="hidden md:block w-[46%]" />
    </div>
  );
});

ExperienceTimelineItem.displayName = 'ExperienceTimelineItem';

export const ExperienceSection: React.FC = React.memo(() => {
  // Start with the first (current) job open, others collapsed for clean concise layout
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(["vu-thao"]));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Stable callback refs for each milestone item to preserve React.memo
  const itemRefCallbacks = useRef<((el: HTMLDivElement | null) => void)[]>([]);
  if (itemRefCallbacks.current.length !== experiences.length) {
    itemRefCallbacks.current = experiences.map((_, idx) => (el: HTMLDivElement | null) => {
      itemRefs.current[idx] = el;
    });
  }

  const scrollToSkillsSection = useCallback(() => {
    // Wait for the collapse animation to complete, then scroll smoothly to the Technical Skills (Stack) section
    setTimeout(() => {
      const skillsEl = document.getElementById('skills');
      if (skillsEl) {
        const navOffset = 80;
        const elementPosition = skillsEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 260);
  }, []);

  const scrollToNextMilestone = useCallback((nextIndex: number) => {
    // Wait for the collapse animation to complete before scrolling smoothly to the next milestone
    setTimeout(() => {
      const nextEl = itemRefs.current[nextIndex];
      if (nextEl) {
        const navOffset = 90; // Fixed navbar height (80px) + clearance
        const elementPosition = nextEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 260);
  }, []);

  const handleToggle = useCallback((id: string, index: number) => {
    setExpandedIds(prev => {
      const isCurrentlyExpanded = prev.has(id);
      const next = new Set(prev);
      if (isCurrentlyExpanded) {
        next.delete(id);
        // Only the experience immediately next to Stack (Technical Skills) (last milestone) scrolls down to Skills
        if (index === experiences.length - 1) {
          scrollToSkillsSection();
        } else if (index + 1 < experiences.length) {
          // All other experiences (including the currently active one) scroll to the next milestone
          scrollToNextMilestone(index + 1);
        }
      } else {
        next.add(id);
      }
      return next;
    });
  }, [scrollToSkillsSection, scrollToNextMilestone]);

  const handleExpandAll = useCallback(() => {
    setExpandedIds(new Set(experiences.map(e => e.id)));
  }, []);

  const handleCollapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  const allExpanded = expandedIds.size === experiences.length;

  return (
    <section className="mb-48 max-w-6xl mx-auto px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 block">
          What I have done so far
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
          Work Experience.
        </h2>
        
        {/* Controls bar: Quick expand/collapse & counter */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm">
          <span className="text-xs font-mono text-gray-400 px-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>{experiences.length} Milestones</span>
          </span>
          <div className="w-px h-3.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={allExpanded ? handleCollapseAll : handleExpandAll}
              className="text-xs font-mono px-3 py-1 rounded-full text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600/30 border border-blue-500/20 transition-all duration-200"
            >
              {allExpanded ? "Collapse All" : "Expand All"}
            </button>
            {expandedIds.size > 0 && !allExpanded && (
              <button
                type="button"
                onClick={handleCollapseAll}
                className="text-xs font-mono px-2.5 py-1 rounded-full text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200"
              >
                Collapse
              </button>
            )}
          </div>
        </div>
      </motion.div>
      
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Vertical Tree Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-white/10 to-transparent -translate-x-1/2" />
        
        <div className="relative z-10">
          {experiences.map((item, idx) => (
            <ExperienceTimelineItem 
              key={item.id} 
              item={item}
              index={idx}
              totalCount={experiences.length}
              isExpanded={expandedIds.has(item.id)}
              onToggle={handleToggle}
              innerRef={itemRefCallbacks.current[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';
export default ExperienceSection;
