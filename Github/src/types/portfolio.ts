export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  clientContext: string;
  problem: string;
  whatWasBuilt: string[];
  tools: string[];
  outcome: string;
  linkText: string;
  linkUrl?: string;
  dataSnippet?: string;
}

export interface StatItem {
  figure: string;
  description: string;
  detail?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; detail?: string }[];
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  dates: string;
  bullets: string[];
}

export interface PortfolioData {
  name: string;
  headline: string;
  bio: string;
  location: string;
  experienceYears: string;
  languages: string[];
  positioning: string;
  email: string;
  socials: {
    linkedin: string;
    upwork: string;
    github: string;
    x: string;
    instagram: string;
  };
  stats: StatItem[];
  departmentsAudited: string[];
  projects: Project[];
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  availability: {
    badge: string;
    headline: string;
    timeframe: string;
    timezone: string;
    preferredEngagements: string[];
    locationLine: string;
  };
  statement: {
    eyebrow: string;
    quote: string;
    supportingText: string;
    signatureLine: string;
  };
}

export type MonolithTheme = 'amber' | 'rosequartz' | 'emerald' | 'obsidian' | 'celestial';

export interface ThemeConfig {
  id: MonolithTheme;
  name: string;
  crystalColor: number;
  innerGlowColor: number;
  lightColor: number;
  rimColor: number;
  accentHex: string;
}
