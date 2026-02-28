import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, Award, ChevronLeft, ChevronRight, X, Building2, Sparkles, TrendingUp, Image } from 'lucide-react';
import type { Experience as ExperienceType } from '@/types/database';
import { format } from 'date-fns';
import { useState } from 'react';

interface ExperienceProps {
  experiences: ExperienceType[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" }
  })
};

export function Experience({ experiences }: ExperienceProps) {
  const [selectedImages, setSelectedImages] = useState<{ images: string[]; currentIndex: number } | null>(null);
  const [carouselIndexes, setCarouselIndexes] = useState<{ [key: string]: number }>({});

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.start_date).getTime();
    const dateB = new Date(b.start_date).getTime();
    return dateB - dateA; // Descending order (newest first)
  });

  if (sortedExperiences.length === 0) return null;

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

  const nextCarouselImage = (expId: string, maxLength: number) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [expId]: ((prev[expId] || 0) + 1) % maxLength
    }));
  };

  const prevCarouselImage = (expId: string, maxLength: number) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [expId]: (prev[expId] || 0) === 0 ? maxLength - 1 : (prev[expId] || 0) - 1
    }));
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Simplified Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Static Orbs - No Animation */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
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
                <Briefcase className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              custom={0.1}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              custom={0.2}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
            >
              My professional journey and key accomplishments
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              custom={0.3}
              className="inline-flex gap-4 flex-wrap justify-center"
            >
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{sortedExperiences.length}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Positions</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Image className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {sortedExperiences.reduce((sum, exp) => sum + (exp.certificates?.length || 0), 0)}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Images</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="max-w-7xl mx-auto relative">
            {/* Static Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20 rounded-full" />

            {/* Experience Items */}
            <div className="space-y-12">
              {sortedExperiences.map((exp, idx) => {
                const imageUrls = exp.certificates?.map(c => c.url) || [];
                const isLeft = idx % 2 === 0;
                const currentCarouselIndex = carouselIndexes[exp.id] || 0;
                
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="relative"
                  >
                    <div className={`grid lg:grid-cols-2 gap-8 items-start ${isLeft ? '' : 'lg:grid-flow-dense'}`}>
                      
                      {/* Content Card */}
                      <div className={`${isLeft ? '' : 'lg:col-start-2'} relative`}>
                        <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-shadow overflow-hidden group">
                          {/* Static Decorative Gradient */}
                          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

                          {/* Current Badge */}
                          {exp.is_current && (
                            <div className="absolute top-6 right-6">
                              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span>Current</span>
                              </div>
                            </div>
                          )}

                          {/* Company Icon & Info */}
                          <div className="relative flex items-start space-x-4 mb-6">
                            <div className="flex-shrink-0 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                              <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {exp.position}
                              </h3>
                              <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                {exp.company}
                              </p>
                            </div>
                          </div>

                          {/* Date Badge */}
                          <div className="relative inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl mb-6 text-sm">
                            <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date || exp.start_date)}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="relative text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                            {exp.description}
                          </p>

                          {/* Technologies */}
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="relative">
                              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-2">
                                <Sparkles className="w-4 h-4" />
                                <span>Technologies Used</span>
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-purple-500/20 text-blue-700 dark:text-blue-400 text-sm font-semibold rounded-xl"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Image Gallery Carousel Card */}
                      <div className={`${isLeft ? '' : 'lg:col-start-1'} relative`}>
                        {imageUrls.length > 0 ? (
                          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-shadow overflow-hidden h-full">
                            {/* Counter Badge */}
                            <div className="absolute top-6 right-6 z-10">
                              <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg flex items-center space-x-2">
                                <Image className="w-4 h-4" />
                                <span>{currentCarouselIndex + 1} / {imageUrls.length}</span>
                              </div>
                            </div>

                            {/* Carousel Container */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                              {/* Current Image */}
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={currentCarouselIndex}
                                  initial={{ opacity: 0, x: 50 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -50 }}
                                  transition={{ duration: 0.3 }}
                                  className="w-full h-full cursor-pointer"
                                  onClick={() => openGallery(imageUrls, currentCarouselIndex)}
                                >
                                  <img
                                    src={imageUrls[currentCarouselIndex]}
                                    alt={exp.certificates?.[currentCarouselIndex]?.alt || `Image ${currentCarouselIndex + 1} for ${exp.position}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </motion.div>
                              </AnimatePresence>

                              {/* Overlay on Hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                  <Image className="w-12 h-12 text-white mx-auto mb-2" />
                                  <span className="text-white font-bold text-lg">View Gallery</span>
                                </div>
                              </div>

                              {/* Navigation Arrows */}
                              {imageUrls.length > 1 && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      prevCarouselImage(exp.id, imageUrls.length);
                                    }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full transition-all shadow-xl z-10 opacity-0 group-hover:opacity-100"
                                  >
                                    <ChevronLeft className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      nextCarouselImage(exp.id, imageUrls.length);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full transition-all shadow-xl z-10 opacity-0 group-hover:opacity-100"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Dot Indicators */}
                            {imageUrls.length > 1 && (
                              <div className="flex justify-center gap-2 mt-4">
                                {imageUrls.map((_, dotIdx) => (
                                  <button
                                    key={dotIdx}
                                    onClick={() => setCarouselIndexes(prev => ({ ...prev, [exp.id]: dotIdx }))}
                                    className={`transition-all rounded-full ${
                                      dotIdx === currentCarouselIndex
                                        ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-600'
                                        : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          // No Image Placeholder
                          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl h-full flex items-center justify-center overflow-hidden">
                            <div className="text-center">
                              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center">
                                <Image className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                              </div>
                              <p className="text-slate-400 dark:text-slate-600 font-medium">No images available</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Dot - Static version */}
                    <div className="hidden lg:flex absolute left-1/2 top-12 transform -translate-x-1/2 z-20">
                      <div className="relative">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-50" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {selectedImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold">
                  {selectedImages.currentIndex + 1} / {selectedImages.images.length}
                </div>
                <button
                  onClick={closeGallery}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all flex items-center space-x-2"
                >
                  <span className="text-sm font-medium">Close</span>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image */}
              <motion.div
                key={selectedImages.currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src={selectedImages.images[selectedImages.currentIndex]}
                  alt={`Image ${selectedImages.currentIndex + 1}`}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                {/* Navigation Arrows */}
                {selectedImages.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-2xl transition-all shadow-xl"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-2xl transition-all shadow-xl"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </motion.div>

              {/* Thumbnails */}
              {selectedImages.images.length > 1 && (
                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                  {selectedImages.images.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImages({ ...selectedImages, currentIndex: idx })}
                      className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === selectedImages.currentIndex
                          ? 'border-blue-500 shadow-lg shadow-blue-500/50 scale-105'
                          : 'border-white/20 opacity-60 hover:opacity-100'
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}