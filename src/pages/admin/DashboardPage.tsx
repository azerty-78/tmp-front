import { AdminLayout } from '../../components/layouts/AdminLayout';
import { themeConfig } from '../../config/theme';
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';

export const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6" style={{ color: themeConfig.text.primary }}>
          Tableau de bord Administrateur
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
            <div className="flex items-center gap-3 mb-2">
              <FaUsers style={{ color: themeConfig.modules.admin.color }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Total Employés
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.modules.admin.color }}>
              45
            </p>
          </div>

          <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
            <div className="flex items-center gap-3 mb-2">
              <FaUserCheck style={{ color: themeConfig.colors.success }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Actifs
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.colors.success }}>
              42
            </p>
          </div>

          <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
            <div className="flex items-center gap-3 mb-2">
              <FaUserTimes style={{ color: themeConfig.colors.error }} />
              <h3 className="font-semibold" style={{ color: themeConfig.text.primary }}>
                Inactifs
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: themeConfig.colors.error }}>
              3
            </p>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
            Gestion des employés
          </h2>
          <p style={{ color: themeConfig.text.secondary }}>
            Gérez les comptes employés, leurs permissions et leurs accès à la plateforme.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};
