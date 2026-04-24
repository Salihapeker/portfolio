import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Upload, X, Loader2, Image as ImageIcon, ExternalLink, Github } from 'lucide-react';
import toast from 'react-hot-toast';
import { projectsApi } from '../../api/client';

const emptyProject = {
  title: { en: '', tr: '' },
  role: { en: '', tr: '' },
  description: { en: '', tr: '' },
  highlights: { en: [''], tr: [''] },
  tech: [],
  liveUrl: '',
  githubUrl: '',
  order: 0,
};

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {...} = editing
  const [imageManagerProject, setImageManagerProject] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { data } = await projectsApi.getAll();
      setProjects(data.data || []);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project and all its images? This cannot be undone.')) return;
    try {
      await projectsApi.delete(id);
      toast.success('Project deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button onClick={() => setEditing({ ...emptyProject })} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="card p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-lg bg-dark-700 border border-dark-600 flex-shrink-0 overflow-hidden">
                  {project.images?.[0] ? (
                    <img src={project.images[0].url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-dark-500" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold mb-1 truncate">{project.title.en}</h3>
                  <p className="text-xs text-gray-500 mb-2 font-mono">{project.role.en}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-dark-700 rounded text-primary-400">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 text-gray-500">+{project.tech.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-dark-600">
                <button
                  onClick={() => setEditing(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => setImageManagerProject(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-lg transition-colors"
                >
                  <ImageIcon className="w-3 h-3" /> Images ({project.images?.length || 0})
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex items-center justify-center w-9 h-9 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ProjectForm
          project={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}

      {imageManagerProject && (
        <ImageManager
          project={imageManagerProject}
          onClose={() => {
            setImageManagerProject(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function ProjectForm({ project, onClose, onSaved }) {
  const [data, setData] = useState({
    ...project,
    highlights: {
      en: project.highlights?.en?.length ? project.highlights.en : [''],
      tr: project.highlights?.tr?.length ? project.highlights.tr : [''],
    },
  });
  const [techInput, setTechInput] = useState(project.tech?.join(', ') || '');
  const [saving, setSaving] = useState(false);
  const isNew = !project._id;

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        tech: techInput.split(',').map((t) => t.trim()).filter(Boolean),
        highlights: {
          en: data.highlights.en.filter((h) => h.trim()),
          tr: data.highlights.tr.filter((h) => h.trim()),
        },
      };

      if (isNew) {
        await projectsApi.create(payload);
        toast.success('Project created');
      } else {
        await projectsApi.update(project._id, payload);
        toast.success('Project updated');
      }
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateHighlight = (lang, idx, value) => {
    const arr = [...data.highlights[lang]];
    arr[idx] = value;
    setData({ ...data, highlights: { ...data.highlights, [lang]: arr } });
  };

  const addHighlight = (lang) => {
    setData({ ...data, highlights: { ...data.highlights, [lang]: [...data.highlights[lang], ''] } });
  };

  const removeHighlight = (lang, idx) => {
    const arr = data.highlights[lang].filter((_, i) => i !== idx);
    setData({ ...data, highlights: { ...data.highlights, [lang]: arr.length ? arr : [''] } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-10 bg-dark-800 border border-dark-600 rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-dark-600 bg-dark-800 rounded-t-2xl z-10">
          <h2 className="text-xl font-display font-semibold">{isNew ? 'New Project' : 'Edit Project'}</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-dark-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Title (English)</label>
              <input type="text" value={data.title.en} onChange={(e) => setData({ ...data, title: { ...data.title, en: e.target.value } })} className="input" />
            </div>
            <div>
              <label className="label">Title (Turkish)</label>
              <input type="text" value={data.title.tr} onChange={(e) => setData({ ...data, title: { ...data.title, tr: e.target.value } })} className="input" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Role (English)</label>
              <input type="text" value={data.role.en} onChange={(e) => setData({ ...data, role: { ...data.role, en: e.target.value } })} className="input" placeholder="Full-Stack Developer" />
            </div>
            <div>
              <label className="label">Role (Turkish)</label>
              <input type="text" value={data.role.tr} onChange={(e) => setData({ ...data, role: { ...data.role, tr: e.target.value } })} className="input" placeholder="Full-Stack Developer" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Description (English)</label>
              <textarea value={data.description.en} onChange={(e) => setData({ ...data, description: { ...data.description, en: e.target.value } })} rows={4} className="input resize-none" />
            </div>
            <div>
              <label className="label">Description (Turkish)</label>
              <textarea value={data.description.tr} onChange={(e) => setData({ ...data, description: { ...data.description, tr: e.target.value } })} rows={4} className="input resize-none" />
            </div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-2 gap-4">
            {['en', 'tr'].map((lang) => (
              <div key={lang}>
                <label className="label">Highlights ({lang.toUpperCase()})</label>
                <div className="space-y-2">
                  {data.highlights[lang].map((h, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input type="text" value={h} onChange={(e) => updateHighlight(lang, idx, e.target.value)} className="input flex-1" />
                      <button type="button" onClick={() => removeHighlight(lang, idx)} className="w-10 h-12 flex items-center justify-center bg-dark-700 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addHighlight(lang)} className="w-full py-2 border border-dashed border-dark-500 hover:border-primary-500 hover:bg-primary-500/5 rounded-xl text-sm text-gray-400 hover:text-primary-400 transition-all">
                    + Add highlight
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="label">Technologies (comma-separated)</label>
            <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} className="input" placeholder="React, Node.js, MongoDB, JWT" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Live URL (optional)</label>
              <input type="url" value={data.liveUrl} onChange={(e) => setData({ ...data, liveUrl: e.target.value })} className="input" placeholder="https://..." />
            </div>
            <div>
              <label className="label">GitHub URL (optional)</label>
              <input type="url" value={data.githubUrl} onChange={(e) => setData({ ...data, githubUrl: e.target.value })} className="input" placeholder="https://github.com/..." />
            </div>
          </div>

          <div>
            <label className="label">Display Order (lower = first)</label>
            <input type="number" value={data.order} onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })} className="input w-32" />
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center gap-3 p-6 border-t border-dark-600 bg-dark-800 rounded-b-2xl">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (isNew ? 'Create Project' : 'Save Changes')}
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageManager({ project, onClose }) {
  const [localProject, setLocalProject] = useState(project);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const { data } = await projectsApi.uploadImages(project._id, files);
      setLocalProject(data.data);
      toast.success(`${files.length} image(s) uploaded`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (imageId) => {
    if (!confirm('Delete this image?')) return;
    try {
      const { data } = await projectsApi.deleteImage(project._id, imageId);
      setLocalProject(data.data);
      toast.success('Image deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-10 bg-dark-800 border border-dark-600 rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-dark-600">
          <div>
            <h2 className="text-xl font-display font-semibold">Manage Images</h2>
            <p className="text-sm text-gray-500 mt-1">{localProject.title.en}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-dark-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <label className="block mb-6">
            <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} className="hidden" />
            <div className={`flex items-center justify-center gap-3 px-6 py-8 border-2 border-dashed ${uploading ? 'border-primary-500 bg-primary-500/10' : 'border-dark-500 hover:border-primary-500 hover:bg-primary-500/5'} rounded-xl cursor-pointer transition-all`}>
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                  <span className="text-sm">Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-primary-400" />
                  <span className="text-sm font-medium">Click to upload images</span>
                  <span className="text-xs font-mono text-gray-500">(max 5MB each, JPG/PNG/WebP)</span>
                </>
              )}
            </div>
          </label>

          {localProject.images?.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No images yet. Upload some above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {localProject.images.map((img) => (
                <div key={img._id} className="relative group aspect-square rounded-xl overflow-hidden border border-dark-600">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => handleDelete(img._id)} className="btn-danger">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
