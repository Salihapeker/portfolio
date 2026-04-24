import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Send, Check, AlertCircle, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { contactApi } from '../api/client';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await contactApi.send(formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus((s) => ({ ...s, success: false })), 5000);
    } catch (err) {
      const message = err.response?.data?.message || t.contact.error;
      setStatus({ loading: false, success: false, error: message });
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'salihapeker3@gmail.com', href: 'mailto:salihapeker3@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+90 551 062 79 65', href: 'tel:+905510627965' },
    { icon: Github, label: 'GitHub', value: '@Salihapeker', href: 'https://github.com/Salihapeker' },
    { icon: FileText, label: 'Medium', value: '@salihapeker', href: 'https://medium.com/@salihapeker' },
  ];

  return (
    <section id="contact" className="section-padding relative bg-dark-800/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary-400 mb-3">// {t.contact.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">{t.contact.title}</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary-500 to-transparent" />
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">{t.contact.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-3"
          >
            {contacts.map((contact, i) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={i}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card p-5 flex items-center gap-4 group hover:-translate-y-0.5 transition-transform"
                >
                  <div className="w-11 h-11 rounded-xl bg-dark-700 border border-dark-600 group-hover:border-primary-500/50 group-hover:bg-primary-500/10 flex items-center justify-center transition-all flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono text-gray-500 mb-0.5">{contact.label}</div>
                    <div className="text-sm font-medium truncate group-hover:text-primary-400 transition-colors">
                      {contact.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 card p-8 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="label">{t.contact.name}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
              </div>
              <div>
                <label className="label">{t.contact.email}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input" />
              </div>
            </div>
            <div>
              <label className="label">{t.contact.subject}</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="input" />
            </div>
            <div>
              <label className="label">{t.contact.message}</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="input resize-none" placeholder="..." />
            </div>

            {status.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
              >
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{t.contact.success}</span>
              </motion.div>
            )}
            {status.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{status.error}</span>
              </motion.div>
            )}

            <button type="submit" disabled={status.loading} className="btn-primary w-full justify-center">
              {status.loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.contact.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.contact.send}
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
