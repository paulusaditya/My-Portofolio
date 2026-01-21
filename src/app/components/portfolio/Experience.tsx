import { motion } from 'motion/react';
import { Briefcase, Calendar, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Experience as ExperienceType } from '@/types/database';
import { format } from 'date-fns';
import { useState } from 'react';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  const [selectedImages, setSelectedImages] = useState<{ images: string[]; currentIndex: number } | null>(null);

  if (experiences.length === 0) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  const openGallery = (images: string[], startIndex: number = 0) => {
    setSelectedImages({ images, currentIndex: startIndex });
  };

  const closeGallery = () => {
    setSelectedImages(null);
  };

  const nextImage = () => {
    if (!selectedImages) return;
    setSelectedImages({
      ...selectedImages,
      currentIndex: (selectedImages.currentIndex + 1) % selectedImages.images.length,
    });
  };

  const prevImage = () => {
    if (!selectedImages) return;
    setSelectedImages({
      ...selectedImages,
      currentIndex: selectedImages.currentIndex === 0 
        ? selectedImages.images.length - 1 
        : selectedImages.currentIndex - 1,
    });
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
          <div className="max-w-6xl mx-auto relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-700" />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, idx) => {
                const certUrls = exp.certificates?.map(c => c.url) || [];
                
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative grid md:grid-cols-2 gap-6 items-start ${
                      idx % 2 === 0 ? '' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`${idx % 2 === 0 ? '' : 'md:order-2'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-xl h-full"
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

                    {/* Certificates Gallery Card */}
                    <div className={`${idx % 2 === 0 ? '' : 'md:order-1'}`}>
                      {certUrls.length > 0 ? (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 shadow-xl h-full"
                        >
                          {certUrls.length === 1 ? (
                            // Single Certificate
                            <div 
                              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                              onClick={() => openGallery(certUrls, 0)}
                            >
                              <img
                                src={certUrls[0]}
                                alt={exp.certificates?.[0]?.alt || `Certificate for ${exp.position}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <div className="flex items-center space-x-2 text-white">
                                  <Award className="w-5 h-5" />
                                  <span className="text-sm font-medium">View Certificate</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Multiple Certificates Grid
                            <div className="grid grid-cols-2 gap-2">
                              {certUrls.slice(0, 4).map((url, certIdx) => (
                                <div
                                  key={certIdx}
                                  className={`relative rounded-lg overflow-hidden group cursor-pointer ${
                                    certUrls.length === 2 ? 'aspect-[4/3]' : 
                                    certIdx === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
                                  }`}
                                  onClick={() => openGallery(certUrls, certIdx)}
                                >
                                  <img
                                    src={url}
                                    alt={exp.certificates?.[certIdx]?.alt || `Certificate ${certIdx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                  {certIdx === 3 && certUrls.length > 4 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                      <span className="text-white text-2xl font-bold">
                                        +{certUrls.length - 4}
                                      </span>
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                                    <Award className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Certificate Count */}
                          {certUrls.length > 1 && (
                            <div className="mt-3 text-center">
                              <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1">
                                <Award className="w-3 h-3" />
                                {certUrls.length} certificate{certUrls.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        // No Certificate Placeholder
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 shadow-xl h-full flex items-center justify-center">
                          <div className="text-center text-slate-400 dark:text-slate-600">
                            <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No certificate available</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 z-10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      {selectedImages && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 flex items-center gap-2"
            >
              <span className="text-sm font-medium">Close</span>
              <X className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute -top-12 left-0 text-white text-sm">
              {selectedImages.currentIndex + 1} / {selectedImages.images.length}
            </div>

            {/* Main Image */}
            <div className="relative">
              <img
                src={selectedImages.images[selectedImages.currentIndex]}
                alt={`Certificate ${selectedImages.currentIndex + 1}`}
                className="w-full h-auto rounded-lg shadow-2xl"
              />

              {/* Navigation Arrows */}
              {selectedImages.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {selectedImages.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {selectedImages.images.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImages({ ...selectedImages, currentIndex: idx })}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedImages.currentIndex
                        ? 'border-blue-500 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}