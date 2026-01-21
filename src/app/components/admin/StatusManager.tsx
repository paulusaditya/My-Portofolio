import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader } from 'lucide-react';
import { toast } from 'sonner';
import type { Status } from '@/types/database';
import { motion } from 'motion/react';

export function StatusManager() {
  const [status, setStatus] = useState<Status>({
    is_available: true,
    status_text: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const { data, error } = await supabase.from('status').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setStatus(data);
    } catch (error) {
      console.error('Error fetching status:', error);
      toast.error('Failed to fetch status');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existingStatus } = await supabase.from('status').select('id').limit(1).single();

      if (existingStatus) {
        await supabase.from('status').update({ ...status, updated_at: new Date().toISOString() }).eq('id', existingStatus.id);
      } else {
        await supabase.from('status').insert([status]);
      }

      toast.success('Status updated successfully!');
      fetchStatus();
    } catch (error) {
      console.error('Error saving status:', error);
      toast.error('Failed to save status');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Availability Status</h2>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="is_available"
              checked={status.is_available}
              onChange={(e) => setStatus({ ...status, is_available: e.target.checked })}
              className="w-5 h-5 text-green-600 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-green-500"
            />
            <label htmlFor="is_available" className="text-lg font-medium text-slate-700 dark:text-slate-300">
              I am available for new opportunities
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Status Message *
            </label>
            <input
              type="text"
              value={status.status_text}
              onChange={(e) => setStatus({ ...status, status_text: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Available for new opportunities"
              required
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Preview:</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${status.is_available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-slate-900 dark:text-white">{status.status_text || 'No status message'}</span>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
