import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import type { Experience as ExperienceType } from '@/types/database';
import { format } from 'date-fns';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  if (experiences.length === 0) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
            >
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-700" />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex items-center ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-xl"
                    >
                      {/* Company & Position */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>

                      {/* Date */}
                      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date || exp.start_date)}
                        </span>
                        {exp.is_current && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-slate-700 dark:text-slate-300 mb-4">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
