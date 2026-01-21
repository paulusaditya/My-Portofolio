// Database Types
export interface Profile {
  id?: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar_url?: string;
  resume_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id?: number;
  name: string;
  category: string;
  level: number; // 1-100
  icon?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id?: number;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  technologies?: string[];
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id?: number;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies?: string[];
  featured: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Status {
  id?: number;
  is_available: boolean;
  status_text: string;
  updated_at?: string;
}

export interface SocialLink {
  id?: number;
  platform: string;
  url: string;
  icon?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}
