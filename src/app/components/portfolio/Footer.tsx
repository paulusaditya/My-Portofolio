import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Heart, Instagram, ArrowUp, Code, Coffee, Sparkles } from 'lucide-react';
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#home', label: 'Home', icon: Sparkles },
    { href: '#about', label: 'About', icon: Heart },
    { href: '#skills', label: 'Skills', icon: Code },
    { href: '#experience', label: 'Experience', icon: Coffee },
    { href: '#projects', label: 'Projects', icon: Code },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg"
              />
              <div className="relative px-8 py-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center space-x-2">
                <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform" />
                <span className="text-white font-bold">Back to Top</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-4"
            >
              <Code className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Paulus Aditya Wicaksono
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Full Stack Developer & Creative Technologist
            </p>
          </motion.div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-12"
            >
              <div className="inline-flex bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex space-x-2">
                  {socialLinks.map((link, idx) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 + idx * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 hover:from-blue-500 hover:to-purple-600 hover:text-white shadow-lg hover:shadow-xl transition-all"
                        aria-label={link.platform}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                        {link.label}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.nav>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-8"
          />

          {/* Copyright & Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Copyright */}
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center justify-center space-x-2">
                <span>© {currentYear}</span>
                <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Paulus Aditya Wicaksono
                </span>
                <span>· All rights reserved</span>
              </p>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
        className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      />
    </footer>
  );
}