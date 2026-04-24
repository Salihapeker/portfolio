import { motion } from 'framer-motion';
import { GraduationCap, Code2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About({ stats }) {
  const { t } = useLanguage();

  const items = [
    { number: `${stats?.projects || 5}+`, label: t.about.stats.projects, icon: Code2 },
    { number: `${stats?.certificates || 10}+`, label: t.about.stats.certifications, icon: Sparkles },
    { number: '15+', label: t.about.stats.technologies, icon: GraduationCap },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary-400 mb-3">// {t.about.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">{t.about.title}</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary-500 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">{t.about.paragraph1}</p>
            <p className="text-lg text-gray-300 leading-relaxed">{t.about.paragraph2}</p>
            <p className="text-lg text-gray-300 leading-relaxed">{t.about.paragraph3}</p>

            <div className="card p-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">Erciyes University</h3>
                  <p className="text-gray-400 text-sm">B.Sc. in Computer Engineering (30% English)</p>
                  <p className="text-primary-400 text-sm font-mono mt-1">2022 — 2027</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {items.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card p-6 flex items-center justify-between group"
                >
                  <div>
                    <div className="text-4xl font-display font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-dark-700 border border-dark-600 group-hover:border-primary-500/50 flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                </motion.div>
              );
            })}

            <div className="card p-6">
              <h4 className="font-mono text-xs text-primary-400 mb-4 uppercase tracking-wider">Languages</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>English</span>
                    <span className="text-primary-400 font-mono">C1</span>
                  </div>
                  <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Turkish</span>
                    <span className="text-primary-400 font-mono">Native</span>
                  </div>
                  <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
