import { RootAdminLayout } from '../../components/layouts/RootAdminLayout';
import { themeConfig } from '../../config/theme';
import { FaCog, FaShieldAlt, FaDatabase } from 'react-icons/fa';

export const RootAdminDashboardPage = () => {
  return (
    <RootAdminLayout>
      <div>
        <div className="mb-6 p-4 rounded-lg border-2 border-red-200 bg-red-50">
          <h1 className="text-3xl font-bold mb-2" style={{ color: themeConfig.modules.rootAdmin.color }}>
            ⚠️ Mode Maintenance - Super Administrateur
          </h1>
          <p style={{ color: themeConfig.text.secondary }}>
            Vous avez accès à toutes les fonctionnalités de maintenance de la plateforme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg shadow border-2" style={{ 
            backgroundColor: themeConfig.backgrounds.paper,
            borderColor: themeConfig.modules.rootAdmin.color + '40'
          }}>
            <div className="flex items-center gap-3 mb-2">
              <FaShieldAlt style={{ color: themeConfig.modules.rootAdmin.color }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Administrateurs
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.modules.rootAdmin.color }}>
              5
            </p>
          </div>

          <div className="p-6 rounded-lg shadow border-2" style={{ 
            backgroundColor: themeConfig.backgrounds.paper,
            borderColor: themeConfig.modules.rootAdmin.color + '40'
          }}>
            <div className="flex items-center gap-3 mb-2">
              <FaCog style={{ color: themeConfig.modules.rootAdmin.color }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Paramètres
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.modules.rootAdmin.color }}>
              12
            </p>
          </div>

          <div className="p-6 rounded-lg shadow border-2" style={{ 
            backgroundColor: themeConfig.backgrounds.paper,
            borderColor: themeConfig.modules.rootAdmin.color + '40'
          }}>
            <div className="flex items-center gap-3 mb-2">
              <FaDatabase style={{ color: themeConfig.modules.rootAdmin.color }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Système
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.modules.rootAdmin.color }}>
              OK
            </p>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow border-2" style={{ 
          backgroundColor: themeConfig.backgrounds.paper,
          borderColor: themeConfig.modules.rootAdmin.color + '40'
        }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
            Maintenance système
          </h2>
          <p style={{ color: themeConfig.text.secondary }}>
            Gérez les administrateurs, configurez les paramètres système et effectuez les opérations de maintenance.
          </p>
        </div>
      </div>
    </RootAdminLayout>
  );
};
