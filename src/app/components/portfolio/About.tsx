import { motion } from 'motion/react';
import { User, Briefcase, Award, Sparkles, Quote, Target, Rocket, Code, Heart, Coffee } from 'lucide-react';
import type { Profile } from '@/types/database';

interface AboutProps {
  profile: Profile | null;
}

export function About({ profile }: AboutProps) {
  if (!profile) return null;

  const highlights = [
    { icon: Code, label: 'Passionate Coder', color: 'from-blue-500 to-cyan-500' },
    { icon: Rocket, label: 'Fast Learner', color: 'from-purple-500 to-pink-500' },
    { icon: Target, label: 'Goal Oriented', color: 'from-orange-500 to-red-500' },
    { icon: Heart, label: 'Team Player', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
              <div className="relative p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                <User className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Get to know more about my journey, passion, and what drives me
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Info Cards */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Name Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl overflow-hidden group"
                >
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 rounded-full blur-2xl"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Full Name</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{profile.name}</p>
                  </div>
                </motion.div>

                {/* Role Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl overflow-hidden group"
                >
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 rounded-full blur-2xl"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Current Role</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{profile.title}</p>
                  </div>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl overflow-hidden group"
                >
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 opacity-20 rounded-full blur-2xl"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Experience Level</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">Professional</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Center Column - Bio & Quote */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Bio Card */}
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                  {/* Decorative Elements */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [360, 180, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                  />

                  {/* Quote Icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    className="relative inline-flex p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl mb-6"
                  >
                    <Quote className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Bio Text */}
                  <div className="relative">
                    <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                      {profile.bio}
                    </p>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {highlights.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="relative group"
                          >
                            <div className="relative bg-slate-100 dark:bg-slate-700/50 rounded-2xl p-4 text-center shadow-lg group-hover:shadow-xl transition-all overflow-hidden">
                              {/* Gradient Background on Hover */}
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 2, opacity: 0.2 }}
                                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl`}
                              />
                              
                              {/* Icon */}
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className={`relative inline-flex p-3 bg-gradient-to-br ${item.color} rounded-xl shadow-lg mb-2`}
                              >
                                <Icon className="w-5 h-5 text-white" />
                              </motion.div>
                              
                              {/* Label */}
                              <p className="relative text-xs font-bold text-slate-700 dark:text-slate-300">
                                {item.label}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}