import { baTools, dataTools, methodologies, documentationSkills } from './technicalSkillsData';
import { experiences } from './experienceData';

export const coreCompetencies = [
  "Requirements Gathering & Analysis", "Process Mapping & BPMN 2.0", "Stakeholder Management",
  "User Story & Use Case Development", "Mobile & iPad Mockups / SRS", "Smoke Testing & Defect Triage",
  "Azure DevOps & Work Item Tracking", "Wireframing & Prototyping (Figma)", "Agile / Scrum Methodology",
  "BRD / FRD Documentation", "SQL & Data Analysis", "Presales & Client Engagement"
] as const;

export const resumeProfile = {
  name: "NGUYỄN PHÚC THIÊN",
  title: "Business Analyst",
  email: "phucthien432002@gmail.com",
  phone: "0903 716 806",
  location: "Ho Chi Minh City",
  linkedin: "https://www.linkedin.com/in/phucthien432002/",
  github: "https://github.com/ThienNguyenWork",
  pdfDownloadUrl: "https://drive.google.com/file/d/1zAsW3SrDmUKUZwW8Zx678nl0KfoarkR3/view?usp=sharing",
  summary: "Business Analyst with hands-on experience in enterprise digital transformation (DOffice, DPM for Petrolimex) and AI software solutions. Proficient in requirements elicitation, drafting comprehensive specifications (BRD/FRD/SRS), UI/UX wireframing for web and mobile/iPad platforms, smoke testing, and agile tracking using Azure DevOps. Leveraging a solid IT technical foundation combined with a background in Business Development, I bring a holistic perspective that bridges the gap between business objectives and product excellence."
} as const;

export const resumeEducation = {
  degree: "Bachelor of Information Technology",
  period: "2020 – 2024",
  institution: "University of Greenwich Vietnam",
  coursework: "Systems Analysis & Design, Database Management, Software Engineering, Project Management",
  skills: "Business English (reading/writing proficient), Responsibility & Professionalism"
} as const;

export const resumeTechnicalSkills = {
  baTools: baTools.join(", "),
  documentation: documentationSkills.join(", "),
  dataTools: dataTools.join(", "),
  methodologies: methodologies.join(", ")
} as const;

export interface ResumeExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export const resumeExperiences: ResumeExperienceItem[] = experiences
  .filter(exp => Boolean(exp.resumeDescription))
  .map(exp => ({
    company: exp.company,
    role: exp.role,
    period: exp.resumePeriod ?? exp.period,
    bullets: exp.resumeDescription!
  }));
