import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Certificate } from '@/types/database';
import { motion, AnimatePresence } from 'motion/react';

export function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: '',
    issuer: '',
    issue_date: '',
    credential_id: '',
    credential_url: '',
    image_url: '',
    order_index: 0,
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      toast.error('Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await supabase.from('certificates').update(formData).eq('id', editing.id);
        toast.success('Certificate updated!');
      } else {
        await supabase.from('certificates').insert([formData]);
        toast.success('Certificate added!');
      }
      resetForm();
      fetchCertificates();
    } catch (error) {
      toast.error('Failed to save certificate');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this certificate?')) return;
    try {
      await supabase.from('certificates').delete().eq('id', id);
      toast.success('Certificate deleted!');
      fetchCertificates();
    } catch (error) {
      toast.error('Failed to delete certificate');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', issuer: '', issue_date: '', credential_id: '', credential_url: '', image_url: '', order_index: 0 });
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certificates ({certificates.length})</h2>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" /><span>Add Certificate</span>
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={resetForm}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full p-6 my-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{editing ? 'Edit' : 'Add'} Certificate</h3>
                <button onClick={resetForm}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Issuer *</label>
                  <input type="text" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Issue Date *</label>
                  <input type="date" value={formData.issue_date} onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Credential ID</label>
                  <input type="text" value={formData.credential_id} onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Credential URL</label>
                  <input type="url" value={formData.credential_url} onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Image URL</label>
                  <input type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={resetForm} className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"><Save className="w-4 h-4" /><span>{editing ? 'Update' : 'Add'}</span></button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{cert.title}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">{cert.issuer}</p>
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <button onClick={() => { setEditing(cert); setFormData(cert); setShowForm(true); }} className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(cert.id!)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
