import { motion } from 'framer-motion';
import { ExternalLink, PenTool, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();

  return (
    <section id="blog" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary-400 mb-3">// {t.blog.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">{t.blog.title}</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary-500 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-800 to-dark-900" />
          <div className="absolute inset-0 grid-pattern opacity-40" />

          <div className="relative p-10 md:p-16 border border-dark-600 rounded-3xl">
            <div className="grid md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-3 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-dark-800/80 backdrop-blur-sm border border-primary-500/30 rounded-full text-xs font-mono text-primary-400">
                  <PenTool className="w-3 h-3" />
                  Medium
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-semibold leading-tight">
                  {t.blog.description}
                </h3>
                <a
                  href="https://medium.com/@salihapeker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <BookOpen className="w-4 h-4" />
                  {t.blog.visitMedium}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="md:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="absolute top-4 left-4 w-48 h-60 bg-dark-700 border border-dark-600 rounded-2xl rotate-6 opacity-60" />
                  <div className="absolute top-2 left-2 w-48 h-60 bg-dark-700 border border-dark-600 rounded-2xl rotate-3 opacity-80" />
                  <div className="relative w-48 h-60 bg-dark-800 border border-primary-500/30 rounded-2xl p-5 shadow-2xl shadow-primary-500/10">
                    <div className="space-y-3">
                      <div className="h-2 w-16 bg-primary-500/60 rounded" />
                      <div className="h-4 w-full bg-dark-600 rounded" />
                      <div className="h-4 w-4/5 bg-dark-600 rounded" />
                      <div className="h-4 w-3/5 bg-dark-600 rounded" />
                      <div className="pt-4 border-t border-dark-700">
                        <div className="h-2 w-12 bg-dark-500 rounded mb-2" />
                        <div className="h-2 w-20 bg-dark-500 rounded" />
                      </div>
                    </div>
                    <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center">
                      <PenTool className="w-4 h-4 text-primary-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
