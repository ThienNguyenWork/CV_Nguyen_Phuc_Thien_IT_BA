import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github 
} from 'lucide-react';
import SpotlightCard from '../SpotlightCard';

const coreCompetencies = [
  "Requirements Gathering & Analysis", "Process Mapping & BPMN 2.0", "Stakeholder Management",
  "User Story & Use Case Development", "Mobile & iPad Mockups / SRS", "Smoke Testing & Defect Triage",
  "Azure DevOps & Work Item Tracking", "Wireframing & Prototyping (Figma)", "Agile / Scrum Methodology",
  "BRD / FRD Documentation", "SQL & Data Analysis", "Presales & Client Engagement"
];

export const ResumeSection: React.FC = React.memo(() => {
  return (
    <section id="resume" className="mb-48 scroll-mt-32 max-w-6xl mx-auto px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 block">My Professional Journey</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">Resume.</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <SpotlightCard className="p-2 md:p-12 bg-[#0a0a0a] border border-white/5">
            <div className="mb-4 md:hidden text-center">
              <p className="text-[10px] font-mono text-blue-500 animate-pulse">Scroll horizontally to view full resume</p>
            </div>
            <div className="relative w-full overflow-x-auto rounded-xl bg-white shadow-2xl text-black custom-scrollbar">
              {/* Coded CV Content */}
              <div className="p-6 md:p-16 min-w-[800px] md:min-w-0 max-w-4xl mx-auto font-serif leading-relaxed">
                {/* Header */}
                <header className="border-b-2 border-blue-600 pb-8 mb-10 flex flex-col md:flex-row items-center gap-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600 flex-shrink-0 shadow-xl"
                  >
                    <picture className="w-full h-full block">
                      <source srcSet="/images/hero-avatar.webp" type="image/webp" />
                      <img 
                        src="/images/hero-avatar.jpg" 
                        alt="NGUYỄN PHÚC THIÊN" 
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </motion.div>
                  <div className="flex-grow text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">NGUYỄN PHÚC THIÊN</h1>
                    <p className="text-xl md:text-2xl text-blue-600 font-medium uppercase tracking-widest mb-4">Business Analyst</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-600">
                      <motion.div whileHover={{ scale: 1.05, x: 5 }} className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" /> phucthien432002@gmail.com
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05, x: 5 }} className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" /> 0903 716 806
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05, x: 5 }} className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" /> Ho Chi Minh City
                      </motion.div>
                    </div>
                    <div className="mt-4 flex justify-center md:justify-start gap-4">
                      <motion.a whileHover={{ scale: 1.05, x: 5 }} href="https://www.linkedin.com/in/phucthien432002/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </motion.a>
                      <motion.a whileHover={{ scale: 1.05, x: 5 }} href="https://github.com/ThienNguyenWork" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1">
                        <Github className="w-4 h-4" /> GitHub
                      </motion.a>
                    </div>
                  </div>
                </header>

                {/* Summary */}
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Professional Summary</h2>
                  <p className="text-gray-700 text-justify text-sm md:text-base">
                    Business Analyst with hands-on experience in enterprise digital transformation (DOffice, DPM for Petrolimex) 
                    and AI software solutions. Proficient in requirements elicitation, drafting comprehensive specifications (BRD/FRD/SRS), 
                    UI/UX wireframing for web and mobile/iPad platforms, smoke testing, and agile tracking using Azure DevOps. 
                    Leveraging a solid IT technical foundation combined with a background in Business Development, 
                    I bring a holistic perspective that bridges the gap between business objectives and product excellence.
                  </p>
                </section>

                {/* Competencies */}
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Core Competencies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                    {coreCompetencies.map(skill => (
                      <div key={skill} className="flex items-center gap-3 border-b border-gray-100 py-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Experience */}
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-6">Work Experience</h2>
                  
                  <div className="space-y-8">
                    {/* Job 1 */}
                    <div>
                      <div className="flex flex-col md:flex-row justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900">Vũ Thảo Technology</h3>
                        <span className="text-sm text-gray-500 font-bold">Jul 2026 – Present</span>
                      </div>
                      <p className="text-blue-600 font-bold mb-3 italic">Junior Business Analyst</p>
                      <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 text-justify">
                        <li>Handed over and spearheaded core business analysis for enterprise projects DOffice and DPM for strategic partner Petrolimex.</li>
                        <li>Conducted systematic smoke testing for defects and client-reported issues; performed root-cause analysis, proposed viable solutions, and aligned with Project Manager on feasibility, resource estimates, and release timelines.</li>
                        <li>Served as lead BA for the Tasks & Assignments Module across Mobile App & iPad platforms: independently designed UI mockups and aligned with mobile engineers on technical feasibility.</li>
                        <li>Authored detailed Mobile Functional Specification documents (SRS / FRD) integrating complete UI mockups, business logic, and validation rules.</li>
                        <li>Conducted requirement walkthroughs with client Petrolimex, captured feedback, iterated mockups, and successfully secured official client sign-off before handover to the dev team for sprint execution.</li>
                        <li>Reported directly to Project Manager (Line Manager); created Use Cases, tracked bugs/issues, and managed project deliverables on Azure DevOps.</li>
                      </ul>
                    </div>

                    {/* Job 2 */}
                    <div>
                      <div className="flex flex-col md:flex-row justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900">Vietnam AI Software Solutions</h3>
                        <span className="text-sm text-gray-500 font-bold">Jul 2025 – Jul 2026 (1 year)</span>
                      </div>
                      <p className="text-blue-600 font-bold mb-3 italic">Junior Business Analyst</p>
                      <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 text-justify">
                        <li>Designed wireframes and UI mockups for school management software modules to bridge the gap between user needs and development requirements.</li>
                        <li>Collaborated with Dev team and BA Lead to clarify task requirements, resolve blockers, and ensure timely delivery of product modules.</li>
                        <li>Wrote and managed test cases to verify software functionality; coordinated directly with developers to track and close defects.</li>
                        <li>Facilitated progress reporting meetings with BA Lead and CEO, presenting module status and incorporating feedback to align product direction.</li>
                        <li>Developed user training scripts and conducted end-user training sessions upon product completion, ensuring smooth adoption by school staff.</li>
                      </ul>
                    </div>

                    {/* Job 3 */}
                    <div>
                      <div className="flex flex-col md:flex-row justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900">HR1VIETNAM</h3>
                        <span className="text-sm text-gray-500 font-bold">Oct 2024 – Mar 2025</span>
                      </div>
                      <p className="text-blue-600 font-bold mb-3 italic">Junior Business Development</p>
                      <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 text-justify">
                        <li>Conducted market research and identified strategic partnership opportunities with 20+ tech enterprises within the IT recruitment sector.</li>
                        <li>Supported the Sales team in crafting high-impact proposals and pitch decks for new clients, directly contributing to the acquisition pipeline.</li>
                        <li>Analyzed customer data to provide actionable insights and proposed enhancements for the conversion funnel, optimizing product performance and user journey.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Education</h2>
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-lg text-gray-900">Bachelor of Information Technology</h3>
                      <span className="text-sm text-gray-500 font-bold">2020 – 2024</span>
                    </div>
                    <p className="text-blue-600 font-bold mb-2">University of Greenwich Vietnam</p>
                    <ul className="mt-2 text-sm text-gray-700 space-y-1">
                      <li><strong>Relevant coursework:</strong> Systems Analysis & Design, Database Management, Software Engineering, Project Management</li>
                      <li><strong>Skills:</strong> Business English (reading/writing proficient), Responsibility & Professionalism</li>
                    </ul>
                  </div>
                </section>

                {/* Technical Skills */}
                <section>
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Technical Skills & Tools</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-blue-600 mb-1">BA Tools</p>
                      <p>Figma, Azure DevOps, Lucidchart, draw.io, Google AI Studio, Plantuml, Stitch, Lark</p>
                    </div>
                    <div>
                      <p className="font-bold text-blue-600 mb-1">Documentation</p>
                      <p>BRD, FRD, User Stories, Use Cases, Process Flow (BPMN), Test Cases</p>
                    </div>
                    <div>
                      <p className="font-bold text-blue-600 mb-1">Data & Analysis</p>
                      <p>SQL (basic), Microsoft Excel, Google Sheets</p>
                    </div>
                    <div>
                      <p className="font-bold text-blue-600 mb-1">Methodology</p>
                      <p>Agile / Scrum, Waterfall, SDLC</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <motion.a
                href="https://drive.google.com/file/d/1zAsW3SrDmUKUZwW8Zx678nl0KfoarkR3/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                <FileText className="w-4 h-4" /> Download Resume (PDF)
              </motion.a>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
});

ResumeSection.displayName = 'ResumeSection';
export default ResumeSection;
