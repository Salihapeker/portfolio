import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { certificatesApi } from '../../api/client';

const emptyCert = { title: { en: '', tr: '' }, issuer: '', year: '', credentialUrl: '', order: 0 };

export default function CertificatesManagerPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { data } = await certificatesApi.getAll();
      setItems(data.data || []);
    } catch {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certificate?')) return;
    try {
      await certificatesApi.delete(id);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Certificates</h1>
          <p className="text-gray-400">Manage your certifications and trainings</p>
        </div>
        <button onClick={() => setEditing({ ...emptyCert })} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((cert) => (
            <div key={cert._id} className="card p-5 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm leading-snug mb-1">{cert.title.en}</h3>
                  <p className="text-xs text-gray-500 truncate">{cert.title.tr}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span>{cert.issuer}</span>
                    <span>•</span>
                    <span className="font-mono text-primary-400/70">{cert.year}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-dark-600">
                <button
                  onClick={() => setEditing(cert)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cert._id)}
                  className="flex items-center justify-center w-9 h-9 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && <CertForm cert={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
    </div>
  );
}

function CertForm({ cert, onClose, onSaved }) {
  const [data, setData] = useState(cert);
  const [saving, setSaving] = useState(false);
  const isNew = !cert._id;

  const handleSave = async () => {
    if (!data.title.en || !data.title.tr || !data.issuer || !data.year) {
      toast.error('Fill all required fields');
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await certificatesApi.create(data);
        toast.success('Certificate added');
      } else {
        await certificatesApi.update(cert._id, data);
        toast.success('Updated');
      }
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-dark-800 border border-dark-600 rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-dark-600">
          <h2 className="text-xl font-display font-semibold">{isNew ? 'New Certificate' : 'Edit Certificate'}</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-dark-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Title (English) *</label>
              <input type="text" value={data.title.en} onChange={(e) => setData({ ...data, title: { ...data.title, en: e.target.value } })} className="input" />
            </div>
            <div>
              <label className="label">Title (Turkish) *</label>
              <input type="text" value={data.title.tr} onChange={(e) => setData({ ...data, title: { ...data.title, tr: e.target.value } })} className="input" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Issuer *</label>
              <input type="text" value={data.issuer} onChange={(e) => setData({ ...data, issuer: e.target.value })} className="input" placeholder="IBM, Turkcell, etc." />
            </div>
            <div>
              <label className="label">Year *</label>
              <input type="text" value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} className="input" placeholder="2024" />
            </div>
          </div>
          <div>
            <label className="label">Credential URL (optional)</label>
            <input type="url" value={data.credentialUrl} onChange={(e) => setData({ ...data, credentialUrl: e.target.value })} className="input" placeholder="https://..." />
          </div>
          <div>
            <label className="label">Display Order</label>
            <input type="number" value={data.order} onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })} className="input w-32" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-dark-600">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (isNew ? 'Create' : 'Save')}
          </button>
        </div>
      </div>
    </div>
  );
}
