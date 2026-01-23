import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, MessageSquare, Sparkles, Heart, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Profile, SocialLink } from '@/types/database';

interface ContactProps {
  profile: Profile | null;
  socialLinks: SocialLink[];
}

const iconMap: Record<string, any> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Mail: Mail,
  Instagram: Instagram,
};

export function Contact({ profile, socialLinks }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSocialIcon = (platform: string) => {
    const Icon = iconMap[platform];
    return Icon || Mail;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent! Thank you for reaching out.', {
      description: "I'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  if (!profile) return null;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 -left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
              <div className="relative p-5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
            >
              Have a project in mind or want to collaborate? Feel free to reach out!
            </motion.p>

            {/* Response Time Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Usually responds within 24 hours
              </span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-hidden">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"
                />
                
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-flex p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-xl mb-4"
                  >
                    <Heart className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Let's Work Together
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    I'm always open to discussing new opportunities, creative ideas, or partnerships. Feel free to reach out through any of these channels.
                  </p>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {profile.email && (
                  <motion.a
                    href={`mailto:${profile.email}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    className="flex items-center space-x-4 p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-md opacity-50"
                      />
                      <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                        <Mail className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Email Address</p>
                      <p className="text-slate-900 dark:text-white font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all">
                        {profile.email}
                      </p>
                    </div>
                    <Send className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </motion.a>
                )}

                {profile.phone && (
                  <motion.a
                    href={`tel:${profile.phone}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    className="flex items-center space-x-4 p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl blur-md opacity-50"
                      />
                      <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Phone Number</p>
                      <p className="text-slate-900 dark:text-white font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all">
                        {profile.phone}
                      </p>
                    </div>
                    <Phone className="w-5 h-5 text-slate-400 group-hover:text-green-600 group-hover:rotate-12 transition-all" />
                  </motion.a>
                )}

                {profile.location && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    className="flex items-center space-x-4 p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-md opacity-50"
                      />
                      <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Location</p>
                      <p className="text-slate-900 dark:text-white font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all">
                        {profile.location}
                      </p>
                    </div>
                    <MapPin className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                  </motion.div>
                )}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent"
                  />
                  
                  <div className="relative">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      <span>Connect with me</span>
                    </h4>
                    <div className="flex flex-wrap gap-3">
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
                            transition={{ delay: 0.6 + idx * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 hover:from-pink-500 hover:to-purple-600 hover:text-white shadow-lg hover:shadow-xl transition-all"
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
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Decorative Elements */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
              />

              <div className="relative">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg"
                  >
                    <Send className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="relative w-full group"
                  >
                    <motion.div
                      animate={isSubmitting ? {} : {
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50"
                    />
                    <div className="relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>

                {/* Bottom Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center space-x-1">
                    <Heart className="w-3 h-3 text-pink-500" />
                    <span>Your message will be sent securely</span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}