import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { SocialLink } from '@/types/database';
import { motion, AnimatePresence } from 'motion/react';

export function SocialLinksManager() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState<Partial<SocialLink>>({
    platform: '',
    url: '',
    icon: '',
    order_index: 0,
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase.from('social_links').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      toast.error('Failed to fetch social links');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await supabase.from('social_links').update(formData).eq('id', editing.id);
        toast.success('Link updated!');
      } else {
        await supabase.from('social_links').insert([formData]);
        toast.success('Link added!');
      }
      resetForm();
      fetchLinks();
    } catch (error) {
      toast.error('Failed to save link');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this link?')) return;
    try {
      await supabase.from('social_links').delete().eq('id', id);
      toast.success('Link deleted!');
      fetchLinks();
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const resetForm = () => {
    setFormData({ platform: '', url: '', icon: '', order_index: 0 });
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Social Links ({links.length})</h2>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" /><span>Add Link</span>
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={resetForm}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{editing ? 'Edit' : 'Add'} Social Link</h3>
                <button onClick={resetForm}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Platform *</label>
                  <input type="text" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="GitHub, LinkedIn, Twitter" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL *</label>
                  <input type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Order Index</label>
                  <input type="number" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
        {links.map((link) => (
          <div key={link.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{link.platform}</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm mb-3 truncate">{link.url}</p>
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <button onClick={() => { setEditing(link); setFormData(link); setShowForm(true); }} className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(link.id!)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
