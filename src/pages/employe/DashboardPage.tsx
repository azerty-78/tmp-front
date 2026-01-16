import { EmployeLayout } from '../../components/layouts/EmployeLayout';
import { themeConfig } from '../../config/theme';
import { FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';

export const EmployeDashboardPage = () => {
  return (
    <EmployeLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6" style={{ color: themeConfig.text.primary }}>
          Tableau de bord Employé
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
            <div className="flex items-center gap-3 mb-2">
              <FaFileAlt style={{ color: themeConfig.modules.employe.color }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Contenus
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.modules.employe.color }}>
              12
            </p>
          </div>

          <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
            <div className="flex items-center gap-3 mb-2">
              <FaEdit style={{ color: themeConfig.colors.warning }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                En attente
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.colors.warning }}>
              3
            </p>
          </div>

          <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
            <div className="flex items-center gap-3 mb-2">
              <FaTrash style={{ color: themeConfig.colors.error }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Archivés
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.colors.error }}>
              5
            </p>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
            Gestion du contenu
          </h2>
          <p style={{ color: themeConfig.text.secondary }}>
            Gérez et modifiez le contenu de la plateforme depuis cet espace.
          </p>
        </div>
      </div>
    </EmployeLayout>
  );
};
