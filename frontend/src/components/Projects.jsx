import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Image as ImageIcon, ChevronRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectsApi } from '../api/client';

export default function Projects() {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data } = await projectsApi.getAll();
      setProjects(data.data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary-400 mb-3">// {t.projects.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">{t.projects.title}</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary-500 to-transparent" />
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>{t.projects.loading}</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-500">{t.projects.empty}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => {
              const mainImage = project.images?.[0]?.url;
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={project.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <div className="absolute inset-0 grid-pattern opacity-30" />
                        <ImageIcon className="w-10 h-10 text-dark-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-dark-900/80 backdrop-blur-sm border border-primary-500/30 rounded-full text-xs font-mono text-primary-400">
                      {project.role[lang]}
                    </div>
                    {project.images?.length > 0 && (
                      <div className="absolute top-4 right-4 px-2.5 py-1 bg-dark-900/80 backdrop-blur-sm border border-dark-600 rounded-full text-xs font-mono text-gray-300 flex items-center gap-1.5">
                        <ImageIcon className="w-3 h-3" />
                        {project.images.length}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title[lang]}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="tag text-[10px]">{tech}</span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="tag text-[10px]">+{project.tech.length - 4}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-400 font-mono group-hover:gap-3 transition-all">
                      <span>{t.projects.viewDetails}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} lang={lang} t={t} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, lang, t, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = project.images || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-dark-600 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-dark-900/90 backdrop-blur-sm border border-dark-600 hover:border-primary-500 hover:bg-dark-700 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 mb-3 bg-primary-500/10 border border-primary-500/30 rounded-full text-xs font-mono text-primary-400">
              {t.projects.role}: {project.role[lang]}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">{project.title[lang]}</h2>
            <p className="text-gray-300 leading-relaxed">{project.description[lang]}</p>
          </div>

          {images.length > 0 && (
            <div className="mb-8">
              <div className="relative mb-3 aspect-video bg-dark-900 rounded-xl overflow-hidden border border-dark-600">
                <img src={images[activeImage].url} alt="" className="w-full h-full object-contain" />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={img._id || idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === idx ? 'border-primary-500 ring-2 ring-primary-500/30' : 'border-dark-600 hover:border-dark-500'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-sm font-mono text-primary-400 uppercase tracking-wider mb-4">{t.projects.highlights}</h3>
            <ul className="space-y-2">
              {project.highlights[lang].map((h, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-mono text-primary-400 uppercase tracking-wider mb-4">{t.projects.technologies}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (<span key={tech} className="tag">{tech}</span>))}
            </div>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex gap-3 pt-4 border-t border-dark-600">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <ExternalLink className="w-4 h-4" /> {t.projects.liveDemo}
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Github className="w-4 h-4" /> {t.projects.viewCode}
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
