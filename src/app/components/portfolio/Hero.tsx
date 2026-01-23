import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Download, MapPin, Phone, Instagram, ArrowRight, Sparkles } from 'lucide-react';
import type { Profile, Status, SocialLink } from '@/types/database';

interface HeroProps {
  profile: Profile | null;
  status: Status | null;
  socialLinks: SocialLink[];
}

const iconMap: Record<string, any> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Mail: Mail,
  Instagram: Instagram,
};

export function Hero({ profile, status, socialLinks }: HeroProps) {
  if (!profile) return null;

  const getSocialIcon = (platform: string) => {
    const Icon = iconMap[platform];
    return Icon || Mail;
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20">
      {/* Enhanced Animated Background with Gradient Orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
        />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-200/30 dark:bg-grid-slate-800/20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cbd5e1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Status Badge */}
              {status && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-2.5 h-2.5 rounded-full ${status.is_available ? 'bg-green-500' : 'bg-red-500'}`} 
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{status.status_text}</span>
                  {status.is_available && <Sparkles className="w-4 h-4 text-yellow-500" />}
                </motion.div>
              )}

              {/* Name with Gradient */}
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                  {profile.name}
                </span>
              </motion.h1>

              {/* Title with Typing Effect Style */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <div className="inline-flex items-center space-x-2 text-xl md:text-2xl lg:text-3xl font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">I'm a</span>
                  <span className="text-blue-600 dark:text-blue-400 relative">
                    {profile.title}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="inline-block w-0.5 h-8 bg-blue-600 dark:bg-blue-400 ml-1"
                    />
                  </span>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
              >
                {profile.bio}
              </motion.p>

              {/* Contact Info Pills */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
              >
                {profile.location && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium">{profile.location}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                    <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium">{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                    <span className="text-sm font-medium">{profile.phone}</span>
                  </div>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                {profile.resume_url && (
                  <motion.a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-slate-200 dark:border-slate-700 flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Resume</span>
                  </motion.a>
                )}
              </motion.div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-3 justify-center lg:justify-start"
                >
                  {socialLinks.map((link, index) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:text-white shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600"
                        aria-label={link.platform}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Right Side - Avatar with Advanced Design */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Animated Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 blur-2xl" />
                </motion.div>

                {/* Avatar Container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  {/* Rotating Border */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1"
                  >
                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-900" />
                  </motion.div>

                  {/* Avatar Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute inset-3 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
                  >
                    {profile.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-8xl font-bold text-white">
                          {profile.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-xl"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-xl"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-7 h-12 border-2 border-slate-400 dark:border-slate-600 rounded-full p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
        >
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mx-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}