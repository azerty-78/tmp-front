import { UserLayout } from '../../components/layouts/UserLayout';
import { themeConfig } from '../../config/theme';

export const HomePage = () => {
  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: themeConfig.text.primary }}>
            Bienvenue sur {themeConfig.company.name}
          </h1>
          <p className="text-xl" style={{ color: themeConfig.text.secondary }}>
            Votre plateforme de gestion complète
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: themeConfig.backgrounds.paper }}
          >
            <h3 className="text-xl font-semibold mb-2" style={{ color: themeConfig.text.primary }}>
              Accès Public
            </h3>
            <p style={{ color: themeConfig.text.secondary }}>
              Explorez nos services et fonctionnalités disponibles pour tous.
            </p>
          </div>

          <div
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: themeConfig.backgrounds.paper }}
          >
            <h3 className="text-xl font-semibold mb-2" style={{ color: themeConfig.text.primary }}>
              Espace Client
            </h3>
            <p style={{ color: themeConfig.text.secondary }}>
              Connectez-vous pour accéder à votre espace personnel.
            </p>
          </div>

          <div
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: themeConfig.backgrounds.paper }}
          >
            <h3 className="text-xl font-semibold mb-2" style={{ color: themeConfig.text.primary }}>
              Support
            </h3>
            <p style={{ color: themeConfig.text.secondary }}>
              Besoin d'aide ? Notre équipe est là pour vous accompagner.
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
