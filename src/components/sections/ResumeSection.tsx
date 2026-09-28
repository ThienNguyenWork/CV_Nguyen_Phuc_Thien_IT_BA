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
import { 
  coreCompetencies, 
  resumeProfile, 
  resumeEducation, 
  resumeTechnicalSkills, 
  resumeExperiences 
} from '../../data/resumeData';

export const ResumeSection: React.FC = React.memo(() => {
  return (
    <section className="mb-48 max-w-6xl mx-auto px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 block">My Professional Journey</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">Resume.</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <SpotlightCard className="p-2 md:p-12 bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-[border-color] duration-300">
            <div className="mb-4 md:hidden text-center">
              <p className="text-[10px] font-mono text-blue-500 animate-pulse">Scroll horizontally to view full resume</p>
            </div>
            <div className="relative w-full overflow-x-auto rounded-xl bg-white shadow-2xl text-black custom-scrollbar">
              {/* Coded CV Content */}
              <div className="p-6 md:p-16 min-w-[800px] md:min-w-0 max-w-4xl mx-auto font-serif leading-relaxed">
                {/* Header */}
                <header className="border-b-2 border-blue-600 pb-8 mb-10 flex flex-col md:flex-row items-center gap-8">
                  <div 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600 flex-shrink-0 shadow-xl hover:scale-105 transition-transform duration-300"
                    style={{ willChange: 'transform' }}
                  >
                    <picture className="w-full h-full block">
                      <source srcSet="/images/hero-avatar.webp" type="image/webp" />
                      <img 
                        src="/images/hero-avatar.jpg" 
                        alt={resumeProfile.name} 
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">{resumeProfile.name}</h1>
                    <p className="text-xl md:text-2xl text-blue-600 font-medium uppercase tracking-widest mb-4">{resumeProfile.title}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-150 cursor-pointer">
                        <Mail className="w-4 h-4 text-blue-600" /> {resumeProfile.email}
                      </div>
                      <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-150 cursor-pointer">
                        <Phone className="w-4 h-4 text-blue-600" /> {resumeProfile.phone}
                      </div>
                      <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-150 cursor-pointer">
                        <MapPin className="w-4 h-4 text-blue-600" /> {resumeProfile.location}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center md:justify-start gap-4">
                      <a href={resumeProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:translate-x-1 transition-transform duration-150">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                      <a href={resumeProfile.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:translate-x-1 transition-transform duration-150">
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    </div>
                  </div>
                </header>

                {/* Summary */}
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Professional Summary</h2>
                  <p className="text-gray-700 text-justify text-sm md:text-base">
                    {resumeProfile.summary}
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
                    {resumeExperiences.map((job, idx) => (
                      <div key={idx}>
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{job.company}</h3>
                          <span className="text-sm text-gray-500 font-bold">{job.period}</span>
                        </div>
                        <p className="text-blue-600 font-bold mb-3 italic">{job.role}</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 text-justify">
                          {job.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section className="mb-10">
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Education</h2>
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-lg text-gray-900">{resumeEducation.degree}</h3>
                      <span className="text-sm text-gray-500 font-bold">{resumeEducation.period}</span>
                    </div>
                    <p className="text-blue-600 font-bold mb-2">{resumeEducation.institution}</p>
                    <ul className="mt-2 text-sm text-gray-700 space-y-1">
                      <li><strong>Relevant coursework:</strong> {resumeEducation.coursework}</li>
                      <li><strong>Skills:</strong> {resumeEducation.skills}</li>
                    </ul>
                  </div>
                </section>

                {/* Technical Skills */}
                <section>
                  <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">Technical Skills & Tools</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-blue-600 mb-1">BA Tools</p>
                      <p>{resumeTechnicalSkills.baTools}</p>
                    </div>
                    <div>
                      <p className="font-bold text-blue-600 mb-1">Documentation</p>
                      <p>{resumeTechnicalSkills.documentation}</p>
                    </div>
                    <div>
                      <p className="font-bold text-blue-600 mb-1">Data & Analysis</p>
                      <p>{resumeTechnicalSkills.dataTools}</p>
                    </div>
                    <div>
                      <p className="font-bold text-blue-600 mb-1">Methodology</p>
                      <p>{resumeTechnicalSkills.methodologies}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <motion.a
                href={resumeProfile.pdfDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-[background-color,color,box-shadow] duration-200 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
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
