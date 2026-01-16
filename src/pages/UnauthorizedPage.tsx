import { Link } from 'react-router-dom';
import { themeConfig } from '../../config/theme';
import { FaLock, FaHome } from 'react-icons/fa';

export const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeConfig.backgrounds.default }}>
      <div className="text-center">
        <FaLock className="text-6xl mx-auto mb-4" style={{ color: themeConfig.colors.error }} />
        <h1 className="text-4xl font-bold mb-4" style={{ color: themeConfig.text.primary }}>
          Accès non autorisé
        </h1>
        <p className="text-xl mb-8" style={{ color: themeConfig.text.secondary }}>
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: themeConfig.colors.primary }}
        >
          <FaHome />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};
