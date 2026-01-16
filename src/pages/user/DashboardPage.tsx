import { UserLayout } from '../../components/layouts/UserLayout';
import { themeConfig } from '../../config/theme';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export const UserDashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: themeConfig.text.primary }}>
            Bienvenue, {user?.name || 'Utilisateur'} !
          </h1>
          <p style={{ color: themeConfig.text.secondary }}>
            Vous êtes connecté en tant qu'utilisateur
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: themeConfig.backgrounds.paper }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaUser style={{ color: themeConfig.modules.user.color }} />
              <h3 className="text-xl font-semibold" style={{ color: themeConfig.text.primary }}>
                Mon Profil
              </h3>
            </div>
            <p style={{ color: themeConfig.text.secondary }} className="mb-4">
              Email: {user?.email}
            </p>
            <Link
              to="/user/profile"
              className="inline-block px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: themeConfig.modules.user.color }}
            >
              Voir mon profil
            </Link>
          </div>

          <div
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: themeConfig.backgrounds.paper }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
              Actions rapides
            </h3>
            <div className="space-y-2">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: themeConfig.colors.error, color: themeConfig.colors.error }}
              >
                <FaSignOutAlt />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
