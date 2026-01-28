import { useState } from 'react';
import { motion } from 'motion/react';
import { Folder, ExternalLink, Github, Star, Sparkles, Code, TrendingUp, Zap } from 'lucide-react';
import type { Project } from '@/types/database';

interface ProjectsProps {
  projects: Project[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" }
  })
};

export function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) return null;

  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Static Orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-40" />
              <div className="relative p-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-2xl">
                <Folder className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              custom={0.1}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              custom={0.2}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
            >
              Showcasing my best work and innovative solutions
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              custom={0.3}
              className="inline-flex gap-4 flex-wrap justify-center"
            >
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{projects.length}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Total Projects</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{featuredCount}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Featured</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)] transition-all group"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-xs font-black rounded-full flex items-center space-x-1 shadow-xl">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-56 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 overflow-hidden">
                  {project.image_url ? (
                    <>
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Folder className="w-24 h-24 text-white opacity-60" />
                    </div>
                  )}

                  {/* Quick Action Buttons - Show on hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/95 backdrop-blur-sm text-slate-900 rounded-xl shadow-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/95 backdrop-blur-sm text-slate-900 rounded-xl shadow-xl hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-900 hover:text-white transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center space-x-2 mb-3">
                        <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 dark:border-blue-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-semibold rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-4">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1.5 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold group/link"
                        >
                          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          <span>Demo</span>
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-lg">
                        <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Static Decorative Orb */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            custom={0.5}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-slate-600 dark:text-slate-400 font-semibold">
                More projects coming soon!
              </span>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}