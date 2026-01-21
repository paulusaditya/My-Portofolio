# Database Schema for Portfolio CMS

## Required Supabase Tables

Execute these SQL statements in your Supabase SQL Editor:

```sql
-- Profile Table
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  avatar_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  icon VARCHAR(255),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience Table
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  technologies TEXT[], -- Array of technologies
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certificates Table
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  credential_id VARCHAR(255),
  credential_url TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technologies
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Status Table
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  is_available BOOLEAN DEFAULT TRUE,
  status_text VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social Links Table
  CREATE TABLE social_links (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    icon VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

-- Create indexes for better performance
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_experiences_is_current ON experiences(is_current);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_skills_order ON skills(order_index);
CREATE INDEX idx_experiences_order ON experiences(order_index);
CREATE INDEX idx_certificates_order ON certificates(order_index);
CREATE INDEX idx_projects_order ON projects(order_index);
CREATE INDEX idx_social_links_order ON social_links(order_index);

-- Insert default data
INSERT INTO profiles (name, title, bio, email, phone, location)
VALUES (
  'John Doe',
  'Frontend Developer',
  'Passionate frontend developer with expertise in React, TypeScript, and modern web technologies.',
  'john.doe@example.com',
  '+1 (555) 123-4567',
  'San Francisco, CA'
);

INSERT INTO status (is_available, status_text)
VALUES (true, 'Available for new opportunities');

-- Sample skills
INSERT INTO skills (name, category, level, order_index) VALUES
('React', 'Frontend', 95, 1),
('TypeScript', 'Frontend', 90, 2),
('JavaScript', 'Frontend', 95, 3),
('Tailwind CSS', 'Frontend', 85, 4),
('Node.js', 'Backend', 80, 5),
('PostgreSQL', 'Backend', 75, 6);

-- Sample social links
INSERT INTO social_links (platform, url, order_index) VALUES
('GitHub', 'https://github.com', 1),
('LinkedIn', 'https://linkedin.com', 2),
('Twitter', 'https://twitter.com', 3);
```

## Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE status ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on experiences"
  ON experiences FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on certificates"
  ON certificates FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on status"
  ON status FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on social_links"
  ON social_links FOR SELECT
  USING (true);

-- Create policies for admin write access (using anon key, so allow all for demo)
-- In production, you should implement proper authentication
CREATE POLICY "Allow insert on profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on profiles"
  ON profiles FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete on profiles"
  ON profiles FOR DELETE
  USING (true);

CREATE POLICY "Allow insert on skills"
  ON skills FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on skills"
  ON skills FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete on skills"
  ON skills FOR DELETE
  USING (true);

CREATE POLICY "Allow insert on experiences"
  ON experiences FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on experiences"
  ON experiences FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete on experiences"
  ON experiences FOR DELETE
  USING (true);

CREATE POLICY "Allow insert on certificates"
  ON certificates FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on certificates"
  ON certificates FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete on certificates"
  ON certificates FOR DELETE
  USING (true);

CREATE POLICY "Allow insert on projects"
  ON projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on projects"
  ON projects FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete on projects"
  ON projects FOR DELETE
  USING (true);

CREATE POLICY "Allow insert on status"
  ON status FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on status"
  ON status FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete on status"
  ON status FOR DELETE
  USING (true);

CREATE POLICY "Allow insert on social_links"
  ON social_links FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on social_links"
  ON social_links FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete on social_links"
  ON social_links FOR DELETE
  USING (true);
```
