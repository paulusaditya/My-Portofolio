import { Github, Linkedin, Mail, Heart, Instagram } from 'lucide-react';
import type { SocialLink } from '@/types/database';

interface FooterProps {
  socialLinks: SocialLink[];
}

const iconMap: Record<string, any> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Mail: Mail,
  Instagram: Instagram,
};

export function Footer({ socialLinks }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    const Icon = iconMap[platform];
    return Icon || Mail;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.platform);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={link.platform}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#home" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#skills" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Skills
            </a>
            <a href="#experience" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center justify-center space-x-1">
              <span>© {currentYear} Paulus Aditya Portfolio.</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>React</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
