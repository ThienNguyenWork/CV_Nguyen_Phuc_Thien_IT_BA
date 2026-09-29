import React from 'react';
import { motion } from 'motion/react';
import { problemToSolutionStages } from '../../data/workflowData';

interface ProblemToSolutionSectionProps {
  isVisible?: boolean;
}

export const ProblemToSolutionSection: React.FC<ProblemToSolutionSectionProps> = React.memo(() => {
  return (
    <section className="mb-32 sm:mb-44 max-w-6xl mx-auto px-6 sm:px-8 relative">
      {/* Editorial Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.25em] mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Analytical Framework
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]"
        >
          FROM PROBLEM<br className="hidden sm:inline" /> TO SOLUTION
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-sm sm:text-base text-gray-400 font-light mt-4 max-w-xl mx-auto leading-relaxed"
        >
          How I turn business needs into clear, practical system solutions.
        </motion.p>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP & TABLET: 3-COLUMN EDITORIAL HORIZONTAL COMPOSITION (>= 768px)    */}
      {/* ========================================================================= */}
      <div className="hidden md:block">
        {/* Subtle Upper Connecting Line with Nodes */}
        <div className="relative mb-8 px-2">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.08] -translate-y-1/2" />
          <div className="grid grid-cols-3 relative">
            {problemToSolutionStages.map((stage, idx) => (
              <div key={stage.number} className="flex items-center justify-between pr-4">
                <div className="flex items-center gap-3 bg-[#030303] px-3 py-1">
                  <span className="w-2 h-2 rounded-full border border-blue-500/50 bg-blue-950/80" />
                  <span className="font-mono text-xs text-gray-500 tracking-wider">
                    {stage.number}
                  </span>
                </div>
                {idx < problemToSolutionStages.length - 1 && (
                  <span className="text-gray-600 text-xs font-mono select-none" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3 Main Stages Columns */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-8 lg:gap-12"
        >
          {problemToSolutionStages.map((stage) => (
            <div
              key={stage.number}
              className="group relative flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                {/* Stage Title */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200">
                  {stage.title}
                </h3>

                {/* Dimension / Perspective */}
                <div className="mt-1">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400/90 font-medium">
                    {stage.dimension}
                  </span>
                </div>

                {/* Supporting Description */}
                <p className="mt-4 text-xs sm:text-sm text-gray-400 font-light leading-relaxed min-h-[44px]">
                  {stage.supportingText}
                </p>

                {/* Thin Subtle Divider */}
                <div className="w-12 h-px bg-white/10 my-5 group-hover:w-full group-hover:bg-blue-500/30 transition-all duration-300" />

                {/* Items List */}
                <ul className="space-y-2.5">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300 font-light group-hover:text-white transition-colors duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500/60 group-hover:bg-blue-400 transition-colors shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Progression Conduit */}
        <div className="mt-14 pt-6 border-t border-white/[0.08]">
          <div className="grid grid-cols-3 items-center text-center">
            {problemToSolutionStages.map((stage, idx) => (
              <div key={stage.number} className="flex items-center justify-center gap-3">
                <span className="text-[11px] lg:text-xs font-mono uppercase tracking-[0.2em] text-gray-500 hover:text-blue-400 transition-colors">
                  {stage.emphasis}
                </span>
                {idx < problemToSolutionStages.length - 1 && (
                  <span className="text-gray-600 text-xs font-mono select-none hidden lg:inline" aria-hidden="true">
                    ───────→
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE: COMPACT HORIZONTAL PROGRESSION SWIPE TRACK (< 768px)               */}
      {/* ========================================================================= */}
      <div className="block md:hidden">
        {/* Swipe Hint & Stage Steps Indicator */}
        <div className="flex items-center justify-between mb-4 px-1 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span>01</span>
            <span>→</span>
            <span>02</span>
            <span>→</span>
            <span>03</span>
          </div>
          <span className="text-[11px] text-blue-400/80">Swipe horizontally →</span>
        </div>

        {/* Horizontal Snap Scroll Track */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-none">
          {problemToSolutionStages.map((stage) => (
            <div
              key={stage.number}
              className="w-[82vw] max-w-[300px] shrink-0 snap-start rounded-2xl bg-neutral-950/60 border border-white/10 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-blue-400 tracking-wider">
                    STAGE {stage.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    {stage.emphasis}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
                  {stage.title}
                </h3>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400/80">
                  {stage.dimension}
                </span>

                <p className="mt-3 text-xs text-gray-400 font-light leading-relaxed">
                  {stage.supportingText}
                </p>

                <div className="h-px bg-white/10 my-4" />

                <ul className="space-y-2">
                  {stage.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-300 font-light">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ProblemToSolutionSection.displayName = 'ProblemToSolutionSection';
export default ProblemToSolutionSection;
