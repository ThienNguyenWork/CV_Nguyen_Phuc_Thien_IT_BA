import React from 'react';
import { motion } from 'motion/react';
import { Layout, Database, Terminal } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';
import SectionHeading from '../SectionHeading';

const baTools = ["Figma", "Azure DevOps", "Lucidchart", "draw.io", "Google AI Studio", "Plantuml", "Stitch", "Lark"];
const dataTools = ["SQL (basic)", "Microsoft Excel", "Google Sheets"];
const methodologies = ["Agile / Scrum", "Waterfall", "SDLC"];

interface SkillCategoryCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: readonly string[];
}

const SkillCategoryCard: React.FC<SkillCategoryCardProps> = React.memo(({ title, icon: Icon, skills }) => (
  <SpotlightCard className="p-8">
    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
      <Icon className="w-5 h-5 text-blue-500" /> {title}
    </h3>
    <div className="flex flex-wrap gap-3">
      {skills.map(skill => (
        <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
          {skill}
        </span>
      ))}
    </div>
  </SpotlightCard>
));

SkillCategoryCard.displayName = 'SkillCategoryCard';

export const TechnicalSkillsSection: React.FC = React.memo(() => {
  return (
    <section className="mb-48 max-w-6xl mx-auto px-8">
      <SectionHeading title="Technical Skills" subtitle="Stack" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <SkillCategoryCard title="BA Tools" icon={Layout} skills={baTools} />
        <SkillCategoryCard title="Data & Analysis" icon={Database} skills={dataTools} />
        <SkillCategoryCard title="Methodology" icon={Terminal} skills={methodologies} />
      </motion.div>
    </section>
  );
});

TechnicalSkillsSection.displayName = 'TechnicalSkillsSection';

export default TechnicalSkillsSection;
