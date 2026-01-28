import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Wrench, Database, Layers, Sparkles, Users, MessageSquare, Brain, Heart, Zap, Lightbulb, Award, Star, TrendingUp } from 'lucide-react';
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
  { name: 'Leadership', icon: Users, color: 'from-blue-500 to-cyan-500', level: 90 },
  { name: 'Communication', icon: MessageSquare, color: 'from-purple-500 to-pink-500', level: 95 },
  { name: 'Problem Solving', icon: Brain, color: 'from-orange-500 to-red-500', level: 92 },
  { name: 'Teamwork', icon: Heart, color: 'from-green-500 to-emerald-500', level: 88 },
  { name: 'Adaptability', icon: Zap, color: 'from-yellow-500 to-orange-500', level: 90 },
  { name: 'Creative Thinking', icon: Lightbulb, color: 'from-indigo-500 to-purple-500', level: 85 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" }
  })
};

export function Skills({ skills }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);
  const totalSkills = skills.length;
  const averageLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills);

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="inline-block relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-40" />
              <div className="relative p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              custom={0.1}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              custom={0.2}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
            >
              A comprehensive showcase of technical proficiency and interpersonal capabilities
            </motion.p>

            {/* Stats Bar */}
            <motion.div 
              variants={fadeInUp}
              custom={0.3}
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

          {/* Tab Switcher */}
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
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center space-x-2">
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
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center space-x-2">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                {categories.map((category, idx) => {
                  const Icon = categoryIcons[category] || Layers;
                  const categorySkills = skillsByCategory[category];
                  const gradientColor = categoryColors[category] || 'from-slate-500 to-slate-700';

                  return (
                    <div
                      key={category}
                      className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-shadow overflow-hidden"
                    >
                      {/* Static Background */}
                      <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${gradientColor} opacity-5 rounded-full blur-3xl`} />
                      
                      {/* Category Header */}
                      <div className="relative flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <div className={`p-4 bg-gradient-to-br ${gradientColor} rounded-2xl shadow-xl`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {category}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {categorySkills.length} skills
                            </p>
                          </div>
                        </div>
                        <div className={`px-4 py-2 bg-gradient-to-r ${gradientColor} rounded-xl text-white font-bold text-sm shadow-lg`}>
                          {Math.round(categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length)}% Avg
                        </div>
                      </div>

                      {/* Skills List */}
                      <div className="relative space-y-6">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                                {skill.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className={`text-lg font-black bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
                                  {skill.level}%
                                </span>
                                {skill.level >= 90 && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                )}
                              </div>
                            </div>
                            <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${gradientColor} rounded-full shadow-lg`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {softSkillsData.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all overflow-hidden group"
                      >
                        {/* Static background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />
                        
                        {/* Icon */}
                        <div className={`relative inline-flex p-5 bg-gradient-to-br ${skill.color} rounded-3xl shadow-2xl mb-6`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>

                        {/* Skill Info */}
                        <div className="relative">
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {skill.name}
                          </h4>

                          {/* Progress */}
                          <div className="relative mt-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                Proficiency
                              </span>
                              <span className={`text-xl font-black bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                                {skill.level}%
                              </span>
                            </div>
                            <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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