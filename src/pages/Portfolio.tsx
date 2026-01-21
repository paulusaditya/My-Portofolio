import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Hero } from '@/app/components/portfolio/Hero';
import { About } from '@/app/components/portfolio/About';
import { Skills } from '@/app/components/portfolio/Skills';
import { Experience } from '@/app/components/portfolio/Experience';
import { Certificates } from '@/app/components/portfolio/Certificates';
import { Projects } from '@/app/components/portfolio/Projects';
import { Contact } from '@/app/components/portfolio/Contact';
import { Navigation } from '@/app/components/portfolio/Navigation';
import { Footer } from '@/app/components/portfolio/Footer';
import type { Profile, Skill, Experience as ExperienceType, Certificate, Project, Status, SocialLink } from '@/types/database';
import { motion } from 'motion/react';

export function Portfolio() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [
        profileRes,
        skillsRes,
        experiencesRes,
        certificatesRes,
        projectsRes,
        statusRes,
        socialLinksRes
      ] = await Promise.all([
        supabase.from('profiles').select('*').limit(1).single(),
        supabase.from('skills').select('*').order('order_index', { ascending: true }),
        supabase.from('experiences').select('*').order('order_index', { ascending: true }),
        supabase.from('certificates').select('*').order('order_index', { ascending: true }),
        supabase.from('projects').select('*').order('order_index', { ascending: true }),
        supabase.from('status').select('*').limit(1).single(),
        supabase.from('social_links').select('*').order('order_index', { ascending: true })
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (skillsRes.data) setSkills(skillsRes.data);
      if (experiencesRes.data) setExperiences(experiencesRes.data);
      if (certificatesRes.data) setCertificates(certificatesRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (statusRes.data) setStatus(statusRes.data);
      if (socialLinksRes.data) setSocialLinks(socialLinksRes.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Navigation socialLinks={socialLinks} />
      
      <main>
        <Hero profile={profile} status={status} socialLinks={socialLinks} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Certificates certificates={certificates} />
        <Projects projects={projects} />
        <Contact profile={profile} socialLinks={socialLinks} />
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
}
