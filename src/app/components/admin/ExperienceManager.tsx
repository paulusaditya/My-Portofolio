import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, X, Save, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { Experience, Certificate } from '@/types/database';
import { motion, AnimatePresence } from 'motion/react';

export function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
    technologies: [],
    order_index: 0,
    certificates: [],
  });
  const [newCertUrl, setNewCertUrl] = useState('');
  const [newCertAlt, setNewCertAlt] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  const addCertificate = () => {
    if (!newCertUrl.trim()) {
      toast.error('Please enter a certificate URL');
      return;
    }

    const newCert: Certificate = {
      url: newCertUrl.trim(),
      alt: newCertAlt.trim() || undefined,
    };

    setFormData({
      ...formData,
      certificates: [...(formData.certificates || []), newCert],
    });

    setNewCertUrl('');
    setNewCertAlt('');
    toast.success('Certificate added!');
  };

  const removeCertificate = (index: number) => {
    setFormData({
      ...formData,
      certificates: formData.certificates?.filter((_, i) => i !== index) || [],
    });
    toast.success('Certificate removed!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingExp) {
        const { error } = await supabase
          .from('experiences')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingExp.id);

        if (error) throw error;
        toast.success('Experience updated successfully!');
      } else {
        const { error } = await supabase
          .from('experiences')
          .insert([formData]);

        if (error) throw error;
        toast.success('Experience added successfully!');
      }

      resetForm();
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData(exp);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Experience deleted successfully!');
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience');
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      description: '',
      start_date: '',
      end_date: '',
      is_current: false,
      technologies: [],
      order_index: 0,
      certificates: [],
    });
    setNewCertUrl('');
    setNewCertAlt('');
    setEditingExp(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Experience ({experiences.length})
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingExp ? 'Edit Experience' : 'Add New Experience'}
                </h3>
                <button onClick={resetForm} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company *</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Position *</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Start Date *</label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.end_date || ''}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      disabled={formData.is_current}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_current"
                    checked={formData.is_current}
                    onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_date: '' })}
                    className="w-4 h-4 text-blue-600 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_current" className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Currently working here
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies?.join(', ') || ''}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                {/* Multiple Certificates Section */}
                <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      <ImageIcon className="w-4 h-4 inline mr-1" />
                      Certificates ({formData.certificates?.length || 0})
                    </label>
                  </div>

                  {/* Add Certificate Form */}
                  <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-4 space-y-3">
                    <div>
                      <input
                        type="url"
                        value={newCertUrl}
                        onChange={(e) => setNewCertUrl(e.target.value)}
                        placeholder="https://example.com/certificate.jpg"
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addCertificate();
                          }
                        }}
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Paste URL from Imgur, Google Drive, or any image hosting
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCertAlt}
                        onChange={(e) => setNewCertAlt(e.target.value)}
                        placeholder="Alt text (optional)"
                        className="flex-1 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button
                        type="button"
                        onClick={addCertificate}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Certificate List */}
                  {formData.certificates && formData.certificates.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {formData.certificates.map((cert, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={cert.url}
                            alt={cert.alt || `Certificate ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23ddd" width="200" height="150"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="12" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeCertificate(idx)}
                            className="absolute top-1 right-1 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {cert.alt && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate">
                              {cert.alt}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingExp ? 'Update' : 'Add'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.position}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{exp.company}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{exp.description}</p>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {exp.certificates && exp.certificates.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <ImageIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {exp.certificates.length} certificate{exp.certificates.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
              
              {exp.certificates && exp.certificates.length > 0 && (
                <div className="flex gap-2 flex-shrink-0">
                  {exp.certificates.slice(0, 2).map((cert, idx) => (
                    <div key={idx} className="w-20 h-16 rounded-lg overflow-hidden">
                      <img
                        src={cert.url}
                        alt={cert.alt || 'Certificate'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {exp.certificates.length > 2 && (
                    <div className="w-20 h-16 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        +{exp.certificates.length - 2}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex space-x-2 ml-4 flex-shrink-0">
                <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(exp.id!)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}