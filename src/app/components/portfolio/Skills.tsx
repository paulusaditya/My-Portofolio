import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Wrench, Database, Layers, Sparkles, Users, MessageSquare, Target, Lightbulb, Heart, Brain, Zap } from 'lucide-react';
import type { Skill } from '@/types/database';

interface SkillsProps {
  skills: Skill[];
}

const categoryIcons: Record<string, any> = {
  Frontend: Code2,
  Backend: Database,
  Tools: Wrench,
  Other: Layers,
};

const softSkillsData = [
  { name: 'Leadership', icon: Users, color: 'from-blue-500 to-cyan-500', level: 90 },
  { name: 'Communication', icon: MessageSquare, color: 'from-purple-500 to-pink-500', level: 95 },
  { name: 'Problem Solving', icon: Brain, color: 'from-orange-500 to-red-500', level: 92 },
  { name: 'Teamwork', icon: Heart, color: 'from-green-500 to-emerald-500', level: 88 },
  { name: 'Adaptability', icon: Zap, color: 'from-yellow-500 to-orange-500', level: 90 },
  { name: 'Creative Thinking', icon: Lightbulb, color: 'from-indigo-500 to-purple-500', level: 85 },
];

export function Skills({ skills }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Skills & Expertise
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
              A comprehensive showcase of technical proficiency and interpersonal capabilities
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-slate-200 dark:bg-slate-700 rounded-2xl p-1.5 shadow-inner">
              <button
                onClick={() => setActiveTab('technical')}
                className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'technical'
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeTab === 'technical' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span>Technical Skills</span>
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('soft')}
                className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'soft'
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeTab === 'soft' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Soft Skills</span>
                </span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeTab === 'technical' ? (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
              >
                {categories.map((category, idx) => {
                  const Icon = categoryIcons[category] || Layers;
                  const categorySkills = skillsByCategory[category];

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
                    >
                      {/* Decorative background */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                      
                      {/* Category Header */}
                      <div className="relative flex items-center space-x-3 mb-6">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {category}
                        </h3>
                      </div>

                      {/* Skills List */}
                      <div className="relative space-y-5">
                        {categorySkills.map((skill, skillIdx) => (
                          <motion.div 
                            key={skill.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {skill.name}
                              </span>
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.1 + skillIdx * 0.05 + 0.2, type: "spring" }}
                                className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                              >
                                {skill.level}%
                              </motion.span>
                            </div>
                            <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.1 + skillIdx * 0.05, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full relative"
                              >
                                <div className="absolute inset-0 bg-white/30 animate-pulse" />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {softSkillsData.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: idx * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="relative bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                      >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className={`inline-flex p-4 bg-gradient-to-br ${skill.color} rounded-2xl shadow-lg mb-4`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Skill Name */}
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                          {skill.name}
                        </h4>

                        {/* Progress Circle */}
                        <div className="relative">
                          <svg className="w-full h-3" viewBox="0 0 100 8">
                            <rect
                              x="0"
                              y="2"
                              width="100"
                              height="4"
                              rx="2"
                              className="fill-slate-200 dark:fill-slate-700"
                            />
                            <motion.rect
                              x="0"
                              y="2"
                              width="0"
                              height="4"
                              rx="2"
                              className={`fill-current`}
                              style={{
                                fill: `url(#gradient-${idx})`
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: skill.level }}
                              transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                            />
                            <defs>
                              <linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" className={skill.color.includes('blue') ? 'text-blue-500' : skill.color.includes('purple') ? 'text-purple-500' : skill.color.includes('orange') ? 'text-orange-500' : skill.color.includes('green') ? 'text-green-500' : skill.color.includes('yellow') ? 'text-yellow-500' : 'text-indigo-500'} stopColor="currentColor" />
                                <stop offset="100%" className={skill.color.includes('cyan') ? 'text-cyan-500' : skill.color.includes('pink') ? 'text-pink-500' : skill.color.includes('red') ? 'text-red-500' : skill.color.includes('emerald') ? 'text-emerald-500' : skill.color.includes('orange') ? 'text-orange-500' : 'text-purple-500'} stopColor="currentColor" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 + 0.5 }}
                            className="text-right text-sm font-bold bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-white bg-clip-text text-transparent mt-2"
                          >
                            {skill.level}%
                          </motion.p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}