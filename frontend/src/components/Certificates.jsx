import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { certificatesApi } from '../api/client';

export default function Certificates() {
  const { lang, t } = useLanguage();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificatesApi
      .getAll()
      .then(({ data }) => setCertificates(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="section-padding relative bg-dark-800/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary-400 mb-3">// {t.certificates.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">{t.certificates.title}</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary-500 to-transparent" />
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>{t.certificates.loading}</span>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-20 text-gray-500">{t.certificates.empty}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card p-5 flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <Award className="w-5 h-5 text-primary-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary-400 transition-colors">
                    {cert.title[lang]}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{cert.issuer}</span>
                    <span>•</span>
                    <span className="font-mono text-primary-400/70">{cert.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
