import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Code, Briefcase, Award, Folder, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardOverview() {
  const [stats, setStats] = useState({
    skills: 0,
    experiences: 0,
    certificates: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [skillsRes, experiencesRes, certificatesRes, projectsRes] = await Promise.all([
        supabase.from('skills').select('id', { count: 'exact', head: true }),
        supabase.from('experiences').select('id', { count: 'exact', head: true }),
        supabase.from('certificates').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        skills: skillsRes.count || 0,
        experiences: experiencesRes.count || 0,
        certificates: certificatesRes.count || 0,
        projects: projectsRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Skills',
      value: stats.skills,
      icon: Code,
      color: 'blue',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Experiences',
      value: stats.experiences,
      icon: Briefcase,
      color: 'purple',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Certificates',
      value: stats.certificates,
      icon: Award,
      color: 'green',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Projects',
      value: stats.projects,
      icon: Folder,
      color: 'orange',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Administrator!</h1>
        <p className="text-blue-100">Manage your portfolio content from this dashboard.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Quick Tips
        </h2>
        <ul className="space-y-3 text-slate-600 dark:text-slate-400">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use the sidebar to navigate between different sections</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Keep your profile information up to date for better visibility</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Mark important projects as "Featured" to highlight them</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Update your availability status to let visitors know you're open to opportunities</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
