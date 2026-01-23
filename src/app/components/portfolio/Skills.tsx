import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Wrench, Database, Layers, Sparkles, Users, MessageSquare, Target, Lightbulb, Heart, Brain, Zap, TrendingUp, Award, Star } from 'lucide-react';
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

const categoryColors: Record<string, string> = {
  Frontend: 'from-blue-500 via-cyan-500 to-teal-500',
  Backend: 'from-purple-500 via-pink-500 to-rose-500',
  Tools: 'from-orange-500 via-amber-500 to-yellow-500',
  Other: 'from-green-500 via-emerald-500 to-lime-500',
};

const softSkillsData = [
  { name: 'Leadership', icon: Users, color: 'from-blue-500 to-cyan-500', level: 90, description: 'Lead teams to success' },
  { name: 'Communication', icon: MessageSquare, color: 'from-purple-500 to-pink-500', level: 95, description: 'Clear & effective messaging' },
  { name: 'Problem Solving', icon: Brain, color: 'from-orange-500 to-red-500', level: 92, description: 'Creative solutions' },
  { name: 'Teamwork', icon: Heart, color: 'from-green-500 to-emerald-500', level: 88, description: 'Collaborative spirit' },
  { name: 'Adaptability', icon: Zap, color: 'from-yellow-500 to-orange-500', level: 90, description: 'Quick to adjust' },
  { name: 'Creative Thinking', icon: Lightbulb, color: 'from-indigo-500 to-purple-500', level: 85, description: 'Innovative approach' },
];

export function Skills({ skills }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);

  // Calculate total skills and average level
  const totalSkills = skills.length;
  const averageLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills);

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header with Stats */}
          <div className="text-center mb-16">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
              <div className="relative p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
            >
              A comprehensive showcase of technical proficiency and interpersonal capabilities
            </motion.p>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex flex-wrap gap-4 justify-center"
            >
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalSkills}+</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Total Skills</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{averageLevel}%</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Avg Proficiency</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{categories.length}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Categories</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tab Switcher with Enhanced Design */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('technical')}
                className={`relative px-10 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === 'technical'
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeTab === 'technical' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Code2 className="w-5 h-5" />
                  <span>Technical Skills</span>
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('soft')}
                className={`relative px-10 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === 'soft'
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeTab === 'soft' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl shadow-xl"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                {categories.map((category, idx) => {
                  const Icon = categoryIcons[category] || Layers;
                  const categorySkills = skillsByCategory[category];
                  const gradientColor = categoryColors[category] || 'from-slate-500 to-slate-700';

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      transition={{ delay: idx * 0.15, type: "spring" }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all overflow-hidden group"
                    >
                      {/* Animated Background Gradient */}
                      <motion.div 
                        animate={{
                          scale: [1, 1.5, 1],
                          rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${gradientColor} opacity-10 rounded-full blur-3xl`}
                      />
                      
                      {/* Category Header */}
                      <div className="relative flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`p-4 bg-gradient-to-br ${gradientColor} rounded-2xl shadow-xl`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {category}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {categorySkills.length} skills
                            </p>
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.15 + 0.3, type: "spring" }}
                          className={`px-4 py-2 bg-gradient-to-r ${gradientColor} rounded-xl text-white font-bold text-sm shadow-lg`}
                        >
                          {Math.round(categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length)}% Avg
                        </motion.div>
                      </div>

                      {/* Skills Grid */}
                      <div className="relative space-y-6">
                        {categorySkills.map((skill, skillIdx) => (
                          <motion.div 
                            key={skill.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 + skillIdx * 0.08 }}
                            onHoverStart={() => setHoveredSkill(skill.id)}
                            onHoverEnd={() => setHoveredSkill(null)}
                            className="group/skill"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-base font-bold text-slate-700 dark:text-slate-300 group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors">
                                {skill.name}
                              </span>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.15 + skillIdx * 0.08 + 0.2, type: "spring" }}
                                className="flex items-center space-x-2"
                              >
                                <motion.span 
                                  animate={hoveredSkill === skill.id ? { scale: [1, 1.2, 1] } : {}}
                                  transition={{ duration: 0.3 }}
                                  className={`text-lg font-black bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}
                                >
                                  {skill.level}%
                                </motion.span>
                                {skill.level >= 90 && (
                                  <motion.div
                                    initial={{ rotate: -45, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ delay: idx * 0.15 + skillIdx * 0.08 + 0.3, type: "spring" }}
                                  >
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  </motion.div>
                                )}
                              </motion.div>
                            </div>
                            <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: idx * 0.15 + skillIdx * 0.08, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${gradientColor} rounded-full relative shadow-lg`}
                              >
                                <motion.div 
                                  animate={{ x: ['-100%', '100%'] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                />
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {softSkillsData.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.7, rotateY: -90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: idx * 0.12, type: "spring" }}
                        whileHover={{ scale: 1.08, y: -10, rotateY: 5 }}
                        className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all overflow-hidden group cursor-pointer"
                      >
                        {/* Gradient Background on Hover */}
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 2, opacity: 0.15 }}
                          transition={{ duration: 0.5 }}
                          className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-3xl`}
                        />
                        
                        {/* Icon with Floating Animation */}
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                          className={`relative inline-flex p-5 bg-gradient-to-br ${skill.color} rounded-3xl shadow-2xl mb-6`}
                        >
                          <Icon className="w-10 h-10 text-white" />
                          <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
                        </motion.div>

                        {/* Skill Info */}
                        <div className="relative">
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {skill.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            {skill.description}
                          </p>

                          {/* Circular Progress */}
                          <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                Proficiency
                              </span>
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.12 + 0.5, type: "spring" }}
                                className={`text-xl font-black bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                              >
                                {skill.level}%
                              </motion.span>
                            </div>
                            <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1.5, delay: idx * 0.12 + 0.3, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                              >
                                <motion.div 
                                  animate={{ x: ['-100%', '100%'] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                />
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        {/* Corner Accent */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${skill.color} opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
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