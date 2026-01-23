import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, Calendar, ChevronDown, Sparkles, TrendingUp, Shield, Star } from 'lucide-react';
import type { Certificate } from '@/types/database';
import { format } from 'date-fns';

interface CertificatesProps {
  certificates: Certificate[];
}

export function Certificates({ certificates }: CertificatesProps) {
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
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

  // Calculate recent certificates (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const recentCount = sortedCertificates.filter(cert => 
    new Date(cert.issue_date) >= sixMonthsAgo
  ).length;

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
              <div className="relative p-5 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl shadow-2xl">
                <Award className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Certificates & Awards
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
            >
              Professional certifications and recognitions showcasing continuous learning and expertise
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex gap-4 flex-wrap justify-center"
            >
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{certificates.length}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Total Certs</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{recentCount}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Recent (6mo)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {displayedCertificates.map((cert, idx) => {
                const isRecent = new Date(cert.issue_date) >= sixMonthsAgo;
                
                return (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    transition={{ delay: idx * 0.05, duration: 0.4, type: "spring" }}
                    whileHover={{ y: -12, scale: 1.03 }}
                    onHoverStart={() => setHoveredIndex(idx)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all group"
                  >
                    {/* Recent Badge */}
                    {isRecent && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: idx * 0.05 + 0.2, type: "spring" }}
                        className="absolute top-4 right-4 z-20"
                      >
                        <div className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>New</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Certificate Image */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 overflow-hidden">
                      {cert.image_url ? (
                        <>
                          <img
                            src={cert.image_url}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.div
                            animate={{ 
                              rotate: hoveredIndex === idx ? 360 : 0,
                              scale: hoveredIndex === idx ? 1.2 : 1
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <Award className="w-20 h-20 text-white opacity-60" />
                          </motion.div>
                        </div>
                      )}
                      
                      {/* View Button Overlay */}
                      {cert.credential_url && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center backdrop-blur-sm"
                        >
                          <motion.a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center space-x-2 shadow-2xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>View</span>
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </motion.div>
                      )}

                      {/* Corner Shine Effect */}
                      <motion.div
                        animate={{
                          opacity: hoveredIndex === idx ? [0, 0.5, 0] : 0,
                          x: hoveredIndex === idx ? ['-100%', '100%'] : '-100%',
                        }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />
                    </div>

                    {/* Certificate Info */}
                    <div className="p-6">
                      {/* Issuer Badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 dark:border-blue-500/20 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-lg">
                          <Star className="w-3 h-3 mr-1" />
                          {cert.issuer}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all">
                        {cert.title}
                      </h3>
                      
                      {/* Date */}
                      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">{formatDate(cert.issue_date)}</span>
                      </div>

                      {/* Credential ID */}
                      {cert.credential_id && (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            <span className="font-semibold">ID:</span> {cert.credential_id.length > 20 ? cert.credential_id.substring(0, 20) + '...' : cert.credential_id}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                      animate={{
                        scale: hoveredIndex === idx ? [1, 1.5, 1] : 1,
                        rotate: hoveredIndex === idx ? [0, 180, 360] : 0,
                      }}
                      transition={{ duration: 1 }}
                      className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Enhanced Show More Section */}
          {hasMore && (
            <motion.div 
              className="relative mt-20 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Decorative lines with gradient */}
              <div className="absolute top-1/2 left-0 right-0 h-px">
                <div className="h-full bg-gradient-to-r from-transparent via-purple-500/30 dark:via-purple-500/50 to-transparent" />
              </div>
              
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                {/* Outer Glow */}
                <motion.div 
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-2xl"
                />
                
                {/* Main Button Container */}
                <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all overflow-hidden border-2 border-transparent group-hover:border-purple-500/50">
                  {/* Animated Background Gradient */}
                  <motion.div 
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.1), transparent)'
                    }}
                  />
                  
                  <div className="relative px-12 py-6 flex items-center space-x-6">
                    {/* Animated Icon */}
                    <motion.div
                      animate={{ 
                        rotate: showAll ? 180 : 0,
                      }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="relative"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl blur-lg opacity-50"
                      />
                      <div className="relative p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-xl">
                        <ChevronDown className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                    
                    {/* Text Content */}
                    <div className="text-left">
                      <div className="text-xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                        {showAll ? 'Tutup Sertifikat' : 'Jelajahi Lebih Banyak'}
                      </div>
                      <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {showAll 
                          ? 'Kembali ke tampilan ringkas' 
                          : `${sortedCertificates.length - 8} sertifikat lainnya menunggu`
                        }
                      </div>
                    </div>
                    
                    {/* Badge */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-bold rounded-xl shadow-lg"
                    >
                      +{sortedCertificates.length - 8}
                    </motion.div>

                    {/* Multiple Sparkle Effects */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.5, 0.5],
                          x: [0, (i - 1) * 10],
                          y: [0, -20]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                        className={`absolute ${
                          i === 0 ? '-top-2 -right-2' :
                          i === 1 ? '-top-3 right-20' :
                          '-top-1 right-10'
                        } w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-sm`}
                      />
                    ))}
                  </div>
                </div>
              </motion.button>

              {/* Fun Counter Animation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Menampilkan <span className="font-bold text-purple-600 dark:text-purple-400">{displayedCertificates.length}</span> dari <span className="font-bold text-blue-600 dark:text-blue-400">{sortedCertificates.length}</span> sertifikat
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}