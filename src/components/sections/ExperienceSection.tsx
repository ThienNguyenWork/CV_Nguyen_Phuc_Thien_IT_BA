import React from 'react';
import { motion } from 'motion/react';
import SpotlightCard from '../SpotlightCard';

interface ExperienceItemData {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string[];
}

const experiences: ExperienceItemData[] = [
  {
    company: "Vũ Thảo Technology",
    role: "Junior Business Analyst",
    period: "Jul 2026 – Present",
    duration: "Present",
    description: [
      "Assigned and spearheaded business analysis for enterprise projects DOffice and DPM for strategic partner Petrolimex.",
      "Conducted systematic smoke testing on defects and issues identified internally by the team as well as requests directly from client Petrolimex.",
      "Analyzed root causes, proposed optimal functional solutions to the client, and coordinated with Project Manager to estimate time, assess resource feasibility, and set delivery timelines.",
      "Spearheaded the Mobile App & iPad product initiative for the Tasks & Assignments Module: crafted end-to-end UI mockups and aligned with mobile engineers on implementation feasibility.",
      "Authored comprehensive Mobile Functional Specification documents (SRS / FRD) incorporating mockups, business logic, and validation rules for the Tasks & Assignments Module.",
      "Handed over specifications to client Petrolimex, captured feedback, iteratively updated change requests and refined UI mockups, successfully achieving official client sign-off before handover to the dev team.",
      "Operated under direct supervision of the Project Manager (Line Manager); authored Use Cases, logged and tracked bugs/issues, and managed project reporting via Azure DevOps."
    ]
  },
  {
    company: "Vietnam AI Software Solutions",
    role: "Junior Business Analyst",
    period: "Jul 2025 – Jul 2026",
    duration: "1 year",
    description: [
      "Designed wireframes and UI mockups for school management software modules to bridge the gap between user needs and development requirements.",
      "Collaborated with Dev team and BA Lead to clarify task requirements, resolve blockers, and ensure timely delivery of product modules.",
      "Wrote and managed test cases to verify software functionality; coordinated directly with developers to track and close defects.",
      "Facilitated progress reporting meetings with BA Lead and CEO, presenting module status and incorporating feedback to align product direction.",
      "Developed user training scripts and conducted end-user training sessions upon product completion, ensuring smooth adoption by school staff.",
      "Supported Senior BA in gathering and clarifying requirements through meetings with end users and stakeholders.",
      "Created basic wireframes and UI mockups under the guidance of BA Lead, iterating based on feedback from dev team and stakeholders.",
      "Drafted initial test cases and assisted in manual testing to verify module functionality before handing over to QA.",
      "Assisted in preparing user training materials, supporting the onboarding process for school staff end users."
    ]
  },
  {
    company: "HR1VIETNAM",
    role: "Junior Business Development",
    period: "Oct 2024 – Mar 2025",
    duration: "6 months",
    description: [
      "Conducted market research and identified strategic partnership opportunities with 20+ tech enterprises within the IT recruitment sector.",
      "Supported the Sales team in crafting high-impact proposals and pitch decks for new clients, directly contributing to the acquisition pipeline.",
      "Analyzed customer data to provide actionable insights and proposed enhancements for the conversion funnel, optimizing product performance and user journey.",
      "Executed cold outreach and pre-sales activities reaching 30+ prospects per month within the IT staffing industry.",
      "Drafted high-converting email templates and sales scripts tailored for targeted customer acquisition campaigns.",
      "Leveraged CRM systems to manage the sales pipeline and meticulously track deal stages and statuses."
    ]
  },
  {
    company: "FPT Software",
    role: "Information Technology Intern",
    period: "Apr 2024 – Jun 2024",
    duration: "3 months",
    description: [
      "Collaborated in a group project to build a school management system using .NET, gaining hands-on experience in a structured software development environment.",
      "Learned project management fundamentals including task breakdown, progress tracking, and team coordination within a real development workflow.",
      "Practiced wireframing and UI mockup design and presented feature demonstrations to instructors and peers."
    ]
  },
  {
    company: "Plogg Vietnam",
    role: "Information Technology Intern",
    period: "Feb 2022 – May 2022",
    duration: "4 months",
    description: [
      "Onboarded to VueJS and its ecosystem (libraries, frameworks) as a first professional tech experience, applying new skills directly to assigned frontend tasks.",
      "Developed frontend features independently using GitHub for version control and leveraged AI tools to improve delivery speed.",
      "Built foundational understanding of how end-to-end systems are structured and what core functionalities a complete software product requires."
    ]
  }
];

const ExperienceTimelineItem: React.FC<{ 
  company: string; 
  role: string; 
  period: string; 
  duration: string; 
  description: string[];
  index: number;
}> = React.memo(({ 
  company, 
  role, 
  period, 
  duration, 
  description,
  index
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between mb-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Connector Line for Mobile */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 md:hidden" />
      
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-[45%] pl-12 md:pl-0"
      >
        <SpotlightCard className="p-6 bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-[border-color] duration-200 group">
          <div className="flex flex-col mb-4">
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em] mb-2">{period}</span>
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors duration-200">{role}</h3>
            <p className="text-gray-400 font-medium text-sm mt-1">{company} • <span className="text-gray-500 italic">{duration}</span></p>
          </div>
          <ul className="space-y-3">
            {description.map((item, idx) => (
              <li key={idx} className="flex items-start text-gray-400 text-sm leading-relaxed">
                <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                {item}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </motion.div>

      {/* Center Dot */}
      <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#030303] -translate-x-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
      
      <div className="hidden md:block w-[45%]" />
    </div>
  );
});

ExperienceTimelineItem.displayName = 'ExperienceTimelineItem';

export const ExperienceSection: React.FC = React.memo(() => {
  return (
    <section className="mb-48 max-w-6xl mx-auto px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 block">What I have done so far</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">Work Experience.</h2>
      </motion.div>
      
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Vertical Tree Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-white/10 to-transparent -translate-x-1/2" />
        
        <div className="relative z-10">
          {experiences.map((item, idx) => (
            <ExperienceTimelineItem 
              key={idx} 
              company={item.company}
              role={item.role}
              period={item.period}
              duration={item.duration}
              description={item.description}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';
export default ExperienceSection;
