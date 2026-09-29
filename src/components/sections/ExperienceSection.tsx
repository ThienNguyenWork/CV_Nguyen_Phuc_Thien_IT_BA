import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight, Briefcase, Calendar, Building2, ChevronRight } from 'lucide-react';
import { experiences } from '../../data/experienceData';

/**
 * Coordinate mapping for the 5 milestones on the desktop SVG career path.
 * The SVG uses a viewBox of 0 0 1000 480.
 * A single continuous Bézier curve flows from upper-left, sweeps across and descends,
 * curving back gently toward the lower section.
 *
 * Path geometry:
 * M 80,180 
 * C 180,80 320,110 440,160 
 * S 620,240 760,200 
 * C 840,170 910,240 880,330 
 * C 850,410 700,430 520,400 
 * C 340,370 200,420 120,400
 *
 * Nodes are placed at corresponding (x, y) along this luminous trajectory:
 * 0: Vu Thao (Current)  -> (120, 165)
 * 1: Vietnam AI (BA)    -> (340, 125)
 * 2: HR1VIETNAM (BD)    -> (580, 205)
 * 3: FPT Software       -> (860, 245)
 * 4: Plogg Vietnam      -> (620, 410)
 */
const DESKTOP_NODES = [
  { x: 120, y: 165, textY: 60, connectorTop: 95, connectorHeight: 62 },
  { x: 340, y: 125, textY: 25, connectorTop: 55, connectorHeight: 62 },
  { x: 580, y: 205, textY: 105, connectorTop: 135, connectorHeight: 62 },
  { x: 860, y: 245, textY: 145, connectorTop: 175, connectorHeight: 62 },
  { x: 620, y: 410, textY: 310, connectorTop: 340, connectorHeight: 62 },
];

export const ExperienceSection: React.FC = React.memo(() => {
  // Architecture requirement: single activeExperienceIndex state, null initially
  const [activeExperienceIndex, setActiveExperienceIndex] = useState<number | null>(null);

  const activeExp = activeExperienceIndex !== null ? experiences[activeExperienceIndex] : null;

  const handleNextExperience = useCallback(() => {
    if (activeExperienceIndex === null) return;
    if (activeExperienceIndex < experiences.length - 1) {
      setActiveExperienceIndex(activeExperienceIndex + 1);
    }
  }, [activeExperienceIndex]);

  const handleGoToSkills = useCallback(() => {
    const skillsEl = document.getElementById('skills');
    if (skillsEl) {
      const navOffset = 80;
      const elementPosition = skillsEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section className="mb-48 max-w-6xl mx-auto px-4 sm:px-8 relative">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 block">
          Career Trajectory & Energy Flow
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
          Work Experience.
        </h2>
        <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-xl mx-auto">
          A continuous luminous path across engineering and product milestones. Select any point to analyze deliverables.
        </p>
      </motion.div>

      {/* =========================================================================
          DESKTOP & TABLET CINEMATIC LUMINOUS SVG TIMELINE (Hidden on mobile)
          ========================================================================= */}
      <div className="hidden lg:block relative w-full mb-12 select-none">
        <div className="relative w-full aspect-[1000/480] max-w-[1000px] mx-auto overflow-visible">
          {/* Background Ambient Glow Gradients on Key Turn Areas */}
          <div 
            className="absolute w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl -top-8 left-16"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)' }} 
          />
          <div 
            className="absolute w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl top-24 right-10"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)' }} 
          />
          <div 
            className="absolute w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl bottom-0 left-1/3"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)' }} 
          />

          {/* SVG Luminous Canvas */}
          <svg 
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradient along the trajectory */}
              <linearGradient id="careerTrajectoryGrad" x1="80" y1="180" x2="620" y2="410" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="30%" stopColor="#3b82f6" />
                <stop offset="65%" stopColor="#6366f1" />
                <stop offset="85%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>

              {/* Aura Glow Filter (restrained & lightweight) */}
              <filter id="pathGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Path Definition: S-curved organic energy trajectory */}
            {/* Layer 1: Wider soft atmospheric glow aura */}
            <motion.path
              d="M 80,180 C 180,80 320,110 440,160 S 620,240 760,200 C 840,170 910,240 880,330 C 850,410 700,430 520,400 C 340,370 200,420 120,400"
              stroke="url(#careerTrajectoryGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeOpacity="0.25"
              fill="none"
              filter="url(#pathGlowFilter)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.25 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {/* Layer 2: Main crisp luminous energy line */}
            <motion.path
              d="M 80,180 C 180,80 320,110 440,160 S 620,240 760,200 C 840,170 910,240 880,330 C 850,410 700,430 520,400 C 340,370 200,420 120,400"
              stroke="url(#careerTrajectoryGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {/* Connectors & Nodes (rendered inside SVG for exact sub-pixel alignment) */}
            {experiences.map((exp, idx) => {
              const node = DESKTOP_NODES[idx];
              const isActive = activeExperienceIndex === idx;

              return (
                <g key={exp.id} className="transition-all duration-300">
                  {/* Subtle vertical connector between text baseline and node */}
                  <line
                    x1={node.x}
                    y1={node.connectorTop}
                    x2={node.x}
                    y2={node.y}
                    stroke={isActive ? '#38bdf8' : '#3b82f6'}
                    strokeWidth={isActive ? '1.5' : '1'}
                    strokeDasharray={isActive ? 'none' : '3 3'}
                    strokeOpacity={isActive ? 0.9 : 0.35}
                    className="transition-all duration-300"
                  />

                  {/* Outer Pulsing Halo on Active */}
                  {isActive && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* Node Outer Glow Disc */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 10 : 7}
                    fill={isActive ? 'rgba(56, 189, 248, 0.35)' : 'rgba(59, 130, 246, 0.15)'}
                    className="transition-all duration-300"
                  />

                  {/* Node Core Orb */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 5.5 : 4}
                    fill={isActive ? '#ffffff' : '#60a5fa'}
                    stroke={isActive ? '#38bdf8' : '#1e3a8a'}
                    strokeWidth={isActive ? '2' : '1.5'}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Floating Milestone Text & Interactive Hitboxes (positioned on top of the SVG) */}
          {experiences.map((exp, idx) => {
            const node = DESKTOP_NODES[idx];
            const isActive = activeExperienceIndex === idx;
            // Position as percentages of 1000 x 480 viewBox
            const leftPct = (node.x / 1000) * 100;
            const topPct = (node.textY / 480) * 100;

            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveExperienceIndex(idx)}
                aria-label={`Milestone ${idx + 1}: ${exp.role} at ${exp.company} (${exp.period})`}
                aria-current={isActive ? 'true' : 'false'}
                className="group absolute -translate-x-1/2 text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-2 transition-all duration-200"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: '210px',
                }}
              >
                {/* Floating Information Label Container */}
                <div className={`transition-all duration-200 rounded-lg px-2 py-1.5 ${
                  isActive 
                    ? 'bg-blue-950/40 backdrop-blur-sm border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.25)]' 
                    : 'bg-black/30 backdrop-blur-xs border border-transparent group-hover:border-white/10 group-hover:bg-white/[0.03]'
                }`}>
                  {/* 1. Period (Small, Monospace) */}
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold transition-colors ${
                      isActive ? 'text-cyan-300 font-bold' : 'text-blue-400/80 group-hover:text-blue-300'
                    }`}>
                      {exp.period}
                    </span>
                    {exp.isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                    )}
                  </div>

                  {/* 2. Job Title (Larger) */}
                  <h3 className={`text-xs md:text-sm font-bold tracking-tight transition-colors line-clamp-1 ${
                    isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {exp.role}
                  </h3>

                  {/* 3. Company (Smaller) */}
                  <div className={`text-[11px] font-mono transition-colors truncate mt-0.5 ${
                    isActive ? 'text-blue-200' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {exp.company}
                  </div>
                </div>

                {/* Sub-node click target extending down to the SVG circle */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full pointer-events-auto"
                  style={{ top: `${node.y - node.textY - 14}px` }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MOBILE & SMALL TABLET ADAPTIVE LUMINOUS FLOW (Vertical / Diagonal)
          ========================================================================= */}
      <div className="lg:hidden relative mb-12 pl-6 pr-2">
        {/* Continuous Vertical Luminous Path Line */}
        <div className="absolute left-10 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />

        <div className="space-y-6 relative">
          {experiences.map((exp, idx) => {
            const isActive = activeExperienceIndex === idx;

            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveExperienceIndex(idx)}
                aria-label={`Milestone ${idx + 1}: ${exp.role} at ${exp.company} (${exp.period})`}
                aria-current={isActive ? 'true' : 'false'}
                className="w-full text-left group flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl"
              >
                {/* Node Orb on the line */}
                <div className="relative mt-2 flex-shrink-0 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-950 border-2 border-cyan-400 shadow-[0_0_16px_rgba(56,189,248,0.8)] scale-110' 
                      : 'bg-black/80 border border-blue-500/40 group-hover:border-blue-400'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isActive ? 'bg-white' : 'bg-blue-400'
                    }`} />
                  </div>
                </div>

                {/* Floating Information Block */}
                <div className={`flex-1 p-4 rounded-xl border transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-950/40 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                    : 'bg-white/[0.02] border-white/5 group-hover:border-white/10 group-hover:bg-white/[0.04]'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                      isActive ? 'text-cyan-300 font-bold' : 'text-blue-400'
                    }`}>
                      {exp.period}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      exp.isCurrent
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : 'border-white/10 text-gray-400 bg-white/5'
                    }`}>
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold transition-colors ${
                    isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
                  }`}>
                    {exp.role}
                  </h3>

                  <div className="text-xs font-mono text-gray-400 mt-0.5">
                    {exp.company}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SHARED EXPERIENCE DETAIL PANEL
          (Rendered below the path. Only one panel exists at any time.)
          ========================================================================= */}
      <div className="max-w-4xl mx-auto min-h-[220px]">
        <AnimatePresence mode="wait">
          {activeExp === null ? (
            /* Empty State */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-center py-12 px-6 rounded-2xl bg-white/[0.015] border border-white/5 backdrop-blur-xs"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3 text-blue-400">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <p className="text-sm font-mono text-gray-400">
                Select a milestone to explore this experience.
              </p>
              <p className="text-xs font-mono text-gray-400/80 mt-1">
                Click any of the 5 glowing nodes along the trajectory above.
              </p>
            </motion.div>
          ) : (
            /* Selected Milestone Detail Card */
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 md:p-8 rounded-2xl bg-[#090b10] border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden"
            >
              {/* Subtle Ambient Corner Glow */}
              <div 
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.7) 0%, transparent 70%)' }} 
              />

              {/* Detail Header: Milestone Sequence, Period, Role, Company */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                      Milestone {activeExperienceIndex! + 1} of {experiences.length}
                    </span>
                    {activeExp.isCurrent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    {activeExp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs md:text-sm font-mono text-gray-300">
                    <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                      <Building2 className="w-3.5 h-3.5" />
                      {activeExp.company}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeExp.period} ({activeExp.duration})
                    </span>
                  </div>
                </div>

                {/* Tags Preview */}
                <div className="flex flex-wrap gap-1.5 sm:max-w-xs justify-start sm:justify-end">
                  {activeExp.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Responsibilities & Deliverables from experienceData.ts */}
              <div className="py-6 relative z-10">
                <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  Key Deliverables & Responsibilities ({activeExp.description.length}):
                </div>
                <ul className="space-y-3">
                  {activeExp.description.map((point, idx) => (
                    <li key={idx} className="flex items-start text-gray-300 text-xs sm:text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action: Next Experience or Continue to Technical Skills */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="text-[11px] font-mono text-gray-400 hidden sm:flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>
                    {activeExperienceIndex! < experiences.length - 1
                      ? `Up next: ${experiences[activeExperienceIndex! + 1].company}`
                      : 'Final milestone in chronology'}
                  </span>
                </div>

                {activeExperienceIndex! < experiences.length - 1 ? (
                  /* Indexes 0–3: NEXT EXPERIENCE (no scroll, strictly state update) */
                  <button
                    type="button"
                    onClick={handleNextExperience}
                    className="inline-flex items-center gap-2 text-xs font-mono font-medium text-cyan-300 hover:text-white px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all duration-200 shadow-sm ml-auto"
                  >
                    <span>NEXT EXPERIENCE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  /* Index 4: CONTINUE TO TECHNICAL SKILLS (smoothly navigates to #skills) */
                  <button
                    type="button"
                    onClick={handleGoToSkills}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 border border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-200 ml-auto"
                  >
                    <span>CONTINUE TO TECHNICAL SKILLS</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';
export default ExperienceSection;
