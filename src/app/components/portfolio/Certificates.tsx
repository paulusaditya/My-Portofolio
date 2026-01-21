import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, Calendar, ChevronDown } from 'lucide-react';
import type { Certificate } from '@/types/database';
import { format } from 'date-fns';

interface CertificatesProps {
  certificates: Certificate[];
}

export function Certificates({ certificates }: CertificatesProps) {
  const [showAll, setShowAll] = useState(false);
  
  if (certificates.length === 0) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  // Sort certificates by issue_date (newest first)
  const sortedCertificates = [...certificates].sort((a, b) => 
    new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()
  );

  // Show only 8 certificates initially
  const displayedCertificates = showAll ? sortedCertificates : sortedCertificates.slice(0, 8);
  const hasMore = sortedCertificates.length > 8;

  return (
    <section id="certificates" className="py-20 bg-slate-50 dark:bg-slate-800/50">
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
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Certificates & Awards
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
              Professional certifications and recognitions showcasing continuous learning and expertise
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {displayedCertificates.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
                >
                  {/* Certificate Image */}
                  <div className="relative h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                    {cert.image_url ? (
                      <img
                        src={cert.image_url}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Award className="w-16 h-16 text-white opacity-60" />
                      </div>
                    )}
                    
                    {/* Overlay on hover */}
                    {cert.credential_url && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}


                  </div>

                  {/* Certificate Info */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 min-h-[3rem]">
                      {cert.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-sm">
                      {cert.issuer}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(cert.issue_date)}</span>
                    </div>

                    {cert.credential_id && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          ID: {cert.credential_id}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More Section */}
          {hasMore && (
            <motion.div 
              className="relative mt-16 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Decorative lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
              
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                
                {/* Main button */}
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))'
                    }}
                  />
                  
                  <div className="relative px-10 py-5 flex items-center space-x-4">
                    {/* Icon with animation */}
                    <motion.div
                      animate={{ 
                        rotate: showAll ? 180 : 0,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 0.4 },
                        scale: { duration: 0.3, repeat: Infinity, repeatDelay: 2 }
                      }}
                      className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
                    >
                      <ChevronDown className="w-5 h-5 text-white" />
                    </motion.div>
                    
                    {/* Text content */}
                    <div className="text-left">
                      <div className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {showAll ? 'Tutup Sertifikat' : 'Jelajahi Lebih Banyak'}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {showAll 
                          ? 'Kembali ke tampilan ringkas' 
                          : `${sortedCertificates.length - 8} sertifikat lainnya menunggu`
                        }
                      </div>
                    </div>
                    
                    {/* Sparkle effect */}
                    <motion.div
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full blur-sm"
                    />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}