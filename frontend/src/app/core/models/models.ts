export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  sortOrder: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  sortOrder: number;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
