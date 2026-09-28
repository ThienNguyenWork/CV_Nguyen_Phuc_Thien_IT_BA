export interface ExperienceItemData {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  isCurrent?: boolean;
  tags: string[];
  description: string[];
  resumePeriod?: string;
  resumeDescription?: string[];
}

export const experiences: ExperienceItemData[] = [
  {
    id: "vu-thao",
    company: "Vũ Thảo Technology",
    role: "Junior Business Analyst",
    period: "Jul 2026 – Present",
    duration: "Present",
    isCurrent: true,
    tags: ["SRS / FRD", "UI/UX Mockups", "Azure DevOps", "Petrolimex Partner", "Smoke Testing"],
    description: [
      "Assigned and spearheaded business analysis for enterprise projects DOffice and DPM for strategic partner Petrolimex.",
      "Conducted systematic smoke testing on defects and issues identified internally by the team as well as requests directly from client Petrolimex.",
      "Analyzed root causes, proposed optimal functional solutions to the client, and coordinated with Project Manager to estimate time, assess resource feasibility, and set delivery timelines.",
      "Spearheaded the Mobile App & iPad product initiative for the Tasks & Assignments Module: crafted end-to-end UI mockups and aligned with mobile engineers on implementation feasibility.",
      "Authored comprehensive Mobile Functional Specification documents (SRS / FRD) incorporating mockups, business logic, and validation rules for the Tasks & Assignments Module.",
      "Handed over specifications to client Petrolimex, captured feedback, iteratively updated change requests and refined UI mockups, successfully achieving official client sign-off before handover to the dev team.",
      "Operated under direct supervision of the Project Manager (Line Manager); authored Use Cases, logged and tracked bugs/issues, and managed project reporting via Azure DevOps."
    ],
    resumeDescription: [
      "Handed over and spearheaded core business analysis for enterprise projects DOffice and DPM for strategic partner Petrolimex.",
      "Conducted systematic smoke testing for defects and client-reported issues; performed root-cause analysis, proposed viable solutions, and aligned with Project Manager on feasibility, resource estimates, and release timelines.",
      "Served as lead BA for the Tasks & Assignments Module across Mobile App & iPad platforms: independently designed UI mockups and aligned with mobile engineers on technical feasibility.",
      "Authored detailed Mobile Functional Specification documents (SRS / FRD) integrating complete UI mockups, business logic, and validation rules.",
      "Conducted requirement walkthroughs with client Petrolimex, captured feedback, iterated mockups, and successfully secured official client sign-off before handover to the dev team for sprint execution.",
      "Reported directly to Project Manager (Line Manager); created Use Cases, tracked bugs/issues, and managed project deliverables on Azure DevOps."
    ]
  },
  {
    id: "vietnam-ai",
    company: "Vietnam AI Software Solutions",
    role: "Junior Business Analyst",
    period: "Jul 2025 – Jul 2026",
    duration: "1 year",
    tags: ["School Management", "Wireframing", "Test Cases", "Client Training", "Dev/QA Sync"],
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
    ],
    resumePeriod: "Jul 2025 – Jul 2026 (1 year)",
    resumeDescription: [
      "Designed wireframes and UI mockups for school management software modules to bridge the gap between user needs and development requirements.",
      "Collaborated with Dev team and BA Lead to clarify task requirements, resolve blockers, and ensure timely delivery of product modules.",
      "Wrote and managed test cases to verify software functionality; coordinated directly with developers to track and close defects.",
      "Facilitated progress reporting meetings with BA Lead and CEO, presenting module status and incorporating feedback to align product direction.",
      "Developed user training scripts and conducted end-user training sessions upon product completion, ensuring smooth adoption by school staff."
    ]
  },
  {
    id: "hr1vietnam",
    company: "HR1VIETNAM",
    role: "Junior Business Development",
    period: "Oct 2024 – Mar 2025",
    duration: "6 months",
    tags: ["IT Staffing", "Market Research", "Pitch Decks", "CRM Pipeline", "Outreach"],
    description: [
      "Conducted market research and identified strategic partnership opportunities with 20+ tech enterprises within the IT recruitment sector.",
      "Supported the Sales team in crafting high-impact proposals and pitch decks for new clients, directly contributing to the acquisition pipeline.",
      "Analyzed customer data to provide actionable insights and proposed enhancements for the conversion funnel, optimizing product performance and user journey.",
      "Executed cold outreach and pre-sales activities reaching 30+ prospects per month within the IT staffing industry.",
      "Drafted high-converting email templates and sales scripts tailored for targeted customer acquisition campaigns.",
      "Leveraged CRM systems to manage the sales pipeline and meticulously track deal stages and statuses."
    ],
    resumeDescription: [
      "Conducted market research and identified strategic partnership opportunities with 20+ tech enterprises within the IT recruitment sector.",
      "Supported the Sales team in crafting high-impact proposals and pitch decks for new clients, directly contributing to the acquisition pipeline.",
      "Analyzed customer data to provide actionable insights and proposed enhancements for the conversion funnel, optimizing product performance and user journey."
    ]
  },
  {
    id: "fpt-software",
    company: "FPT Software",
    role: "Information Technology Intern",
    period: "Apr 2024 – Jun 2024",
    duration: "3 months",
    tags: [".NET Development", "School Management", "UI Mockups", "Agile Workflow"],
    description: [
      "Collaborated in a group project to build a school management system using .NET, gaining hands-on experience in a structured software development environment.",
      "Learned project management fundamentals including task breakdown, progress tracking, and team coordination within a real development workflow.",
      "Practiced wireframing and UI mockup design and presented feature demonstrations to instructors and peers."
    ]
  },
  {
    id: "plogg-vietnam",
    company: "Plogg Vietnam",
    role: "Information Technology Intern",
    period: "Feb 2022 – May 2022",
    duration: "4 months",
    tags: ["Vue.js", "Frontend Dev", "GitHub Version Control", "Software Architecture"],
    description: [
      "Onboarded to VueJS and its ecosystem (libraries, frameworks) as a first professional tech experience, applying new skills directly to assigned frontend tasks.",
      "Developed frontend features independently using GitHub for version control and leveraged AI tools to improve delivery speed.",
      "Built foundational understanding of how end-to-end systems are structured and what core functionalities a complete software product requires."
    ]
  }
];
