import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/50 border border-primary-500/30 rounded-full backdrop-blur-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-gray-300 font-mono">
                {t.hero.availableFor}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <p className="text-lg text-gray-400 font-mono">
                // {t.hero.greeting}
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                <span className="gradient-text">Saliha</span>
                <br />
                <span className="text-white">
                  Peker<span className="text-primary-500">.</span>
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-primary-500" />
                <p className="text-xl text-primary-400 font-mono">
                  {t.hero.role}
                </p>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 font-display font-light leading-snug max-w-2xl">
                {t.hero.tagline}
              </p>
              <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
                {t.hero.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="btn-primary"
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-secondary"
              >
                <Mail className="w-4 h-4" />
                {t.hero.cta2}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-4"
            >
              <a
                href="https://github.com/Salihapeker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-dark-500 hover:border-primary-500 hover:bg-dark-700 transition-all hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://medium.com/@salihapeker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-dark-500 hover:border-primary-500 hover:bg-dark-700 transition-all hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4" />
              </a>
              <a
                href="mailto:salihapeker3@gmail.com"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-dark-500 hover:border-primary-500 hover:bg-dark-700 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <HeroImage />

              <div
                className="absolute -bottom-6 -left-6 bg-dark-800/90 backdrop-blur-xl border border-dark-600 rounded-xl p-4 shadow-2xl animate-float z-30"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <code className="text-xs font-mono text-primary-400">
                  <span className="text-gray-500">const</span> dev ={" "}
                  <span className="text-yellow-300">'Saliha'</span>;
                </code>
              </div>

              <div
                className="absolute -top-4 -right-4 bg-dark-800/90 backdrop-blur-xl border border-primary-500/30 rounded-full px-4 py-2 shadow-xl animate-float z-30"
                style={{ animationDelay: "3s" }}
              >
                <span className="text-xs font-mono text-primary-400">
                  React · Node.js
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroImage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900 border border-dark-600 group">
      {/* Fallback "S" — sadece fotoğraf yoksa veya hata varsa görünür */}
      {(!imageLoaded || imageError) && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="text-[12rem] font-display font-bold text-dark-600 select-none">
            S
          </div>
        </div>
      )}

      {/* Profil fotoğrafı */}
      {!imageError && (
        <img
          src="/profile.jpg"
          alt="Saliha Peker"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Gradient overlay — en üstte, ama fotoğrafı hafif karartır */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent pointer-events-none z-20" />

      {/* Köşe süsleri */}
      <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-primary-500/50 rounded-tr-2xl z-20 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-primary-500/50 rounded-bl-2xl z-20 pointer-events-none" />
    </div>
  );
}
