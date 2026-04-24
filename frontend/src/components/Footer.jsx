import { Heart, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-600 py-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 font-mono">
            © {year} Saliha Peker. {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{t.footer.madeWith}</span>
              <Code className="w-4 h-4 text-primary-400" />
              <span>{t.footer.and}</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </div>
            <Link
              to="/admin"
              className="text-xs text-gray-600 hover:text-primary-400 font-mono transition-colors"
            >
              admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
