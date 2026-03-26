export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  features: string[];
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  display_order: number;
  created_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  problem: string | null;
  solution: string | null;
  results: string | null;
  image_url: string | null;
  technologies: string[];
  project_url: string | null;
  created_at: string;
  published: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string | null;
  category: string;
  image_url: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_position: string;
  client_company: string;
  content: string;
  rating: number;
  image_url: string | null;
  created_at: string;
  published: boolean;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service_interest?: string;
  status?: string;
  created_at?: string;
}
