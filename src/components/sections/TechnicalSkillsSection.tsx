import React from 'react';
import { motion } from 'motion/react';
import { Layout, Database, Terminal } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';
import SectionHeading from '../SectionHeading';

const baTools = ["Figma", "Azure DevOps", "Lucidchart", "draw.io", "Google AI Studio", "Plantuml", "Stitch", "Lark"];
const dataTools = ["SQL (basic)", "Microsoft Excel", "Google Sheets"];
const methodologies = ["Agile / Scrum", "Waterfall", "SDLC"];

export const TechnicalSkillsSection: React.FC = () => {
  return (
    <section className="mb-48 max-w-6xl mx-auto px-8">
      <SectionHeading title="Technical Skills" subtitle="Stack" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <SpotlightCard className="p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Layout className="w-5 h-5 text-blue-500" /> BA Tools
          </h3>
          <div className="flex flex-wrap gap-3">
            {baTools.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">{skill}</span>
            ))}
          </div>
        </SpotlightCard>
        
        <SpotlightCard className="p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-500" /> Data & Analysis
          </h3>
          <div className="flex flex-wrap gap-3">
            {dataTools.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">{skill}</span>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-blue-500" /> Methodology
          </h3>
          <div className="flex flex-wrap gap-3">
            {methodologies.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">{skill}</span>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
};

export default TechnicalSkillsSection;
