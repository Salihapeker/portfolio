import { motion } from 'framer-motion';
import { Code, Layout, Server, Database, Wrench, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();

  const skillGroups = [
    { icon: Code, title: t.skills.categories.languages, skills: ['C', 'C#', 'C++', 'Java', 'Python', 'SQL'] },
    { icon: Layout, title: t.skills.categories.frontend, skills: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'TailwindCSS'] },
    { icon: Server, title: t.skills.categories.backend, skills: ['Node.js', 'Express.js', 'Spring Boot', 'FastAPI'] },
    { icon: Database, title: t.skills.categories.database, skills: ['MongoDB', 'SQL'] },
    { icon: Wrench, title: t.skills.categories.tools, skills: ['Git', 'GitHub', 'Vercel', 'Trello', 'RESTful APIs', 'JWT', 'Microservices', 'OOP'] },
    { icon: Cpu, title: t.skills.categories.hardware, skills: ['CAN Bus', 'SPI', 'UART', 'Arduino', 'PCB (Altium)'] },
  ];

  return (
    <section id="skills" className="section-padding relative bg-dark-800/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary-400 mb-3">// {t.skills.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">{t.skills.title}</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary-500 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-6 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-dark-700 border border-dark-600 group-hover:border-primary-500/50 group-hover:bg-primary-500/10 flex items-center justify-center transition-all">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
