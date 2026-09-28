import { 
  Search, 
  PenTool, 
  Database, 
  Users, 
  ClipboardList, 
  Terminal,
  type LucideIcon
} from 'lucide-react';

export interface OrbitalSkill {
  name: string;
  icon: LucideIcon;
  description: string;
  orbit: 0 | 1 | 2;
  speed: number;
  direction: 1 | -1;
  startAngle: number;
  color: string;
}

export interface OrbitConfig {
  radius: number;
  opacity: number;
  color: string;
}

export const orbitalSkills: readonly OrbitalSkill[] = [
  // Orbit 0: Inner (Clockwise, 35s)
  { name: "Requirement Gathering", icon: Search, description: "Eliciting stakeholder needs", orbit: 0, speed: 35, direction: 1, startAngle: 0, color: "#3b82f6" },
  { name: "Stakeholder Management", icon: Users, description: "Bridging business & tech", orbit: 0, speed: 35, direction: 1, startAngle: 180, color: "#60a5fa" },
  
  // Orbit 1: Middle (Counter-Clockwise, 50s)
  { name: "Wireframing", icon: PenTool, description: "Visualizing system logic", orbit: 1, speed: 50, direction: -1, startAngle: 90, color: "#2563eb" },
  { name: "Documentation", icon: ClipboardList, description: "BRD, FRD & User Stories", orbit: 1, speed: 50, direction: -1, startAngle: 270, color: "#1d4ed8" },
  
  // Orbit 2: Outer (Clockwise, 65s)
  { name: "Data Analysis", icon: Database, description: "Data-driven insights", orbit: 2, speed: 65, direction: 1, startAngle: 45, color: "#1e40af" },
  { name: "Agile/Scrum", icon: Terminal, description: "Iterative development", orbit: 2, speed: 65, direction: 1, startAngle: 225, color: "#1e3a8a" },
] as const;

export const orbitConfigs: readonly OrbitConfig[] = [
  { radius: 240, opacity: 0.2, color: "#3b82f6" },
  { radius: 420, opacity: 0.15, color: "#2563eb" },
  { radius: 600, opacity: 0.1, color: "#1d4ed8" },
] as const;
