import { Link } from 'react-router-dom';
import { themeConfig } from '@/config/theme';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import { Button } from '@/components/ui';

/**
 * Page 404 - Page non trouvée
 */
export const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: themeConfig.backgrounds.default }}
    >
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <FaExclamationTriangle
            className="text-8xl mx-auto mb-4"
            style={{ color: themeConfig.colors.warning }}
          />
          <h1
            className="text-6xl font-bold mb-2"
            style={{ color: themeConfig.text.primary }}
          >
            404
          </h1>
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: themeConfig.text.primary }}
          >
            Page non trouvée
          </h2>
          <p className="text-lg" style={{ color: themeConfig.text.secondary }}>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button leftIcon={<FaHome />} variant="primary">
              Retour à l'accueil
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            Page précédente
          </Button>
        </div>
      </div>
    </div>
  );
};
