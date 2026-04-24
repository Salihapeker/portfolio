import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#certificates', label: t.nav.certificates },
    { href: '#blog', label: t.nav.blog },
    { href: '#contact', label: t.nav.contact },
  ];

  const scrollTo = (href) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-dark-600' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center font-display font-bold text-white shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
              SP
            </div>
            <span className="hidden sm:block font-display font-semibold text-lg">Saliha Peker</span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-dark-700"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-2 text-sm font-mono bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-primary-500/50 rounded-full transition-all"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-primary-400" />
              <span className="font-semibold">{lang.toUpperCase()}</span>
            </button>

            <a
              href="/cv.pdf"
              download="Saliha_Peker_CV.pdf"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 rounded-full transition-all hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>{t.nav.downloadCV}</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-dark-700 rounded-full"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-1">
                {links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href="/cv.pdf"
                  download="Saliha_Peker_CV.pdf"
                  className="mt-2 mx-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 rounded-full transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.nav.downloadCV}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
