import { motion } from 'motion/react';
import { User, Briefcase, Award } from 'lucide-react';
import type { Profile } from '@/types/database';

interface AboutProps {
  profile: Profile | null;
}

export function About({ profile }: AboutProps) {
  if (!profile) return null;

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
            >
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 md:p-10 shadow-xl"
          >
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {profile.bio}
            </p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Name</h3>
                <p className="text-base font-bold text-slate-900 dark:text-white">{profile.name}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
                  <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Role</h3>
                <p className="text-base font-bold text-slate-900 dark:text-white">{profile.title}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
                  <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Experience</h3>
                <p className="text-base font-bold text-slate-900 dark:text-white">Professional</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
