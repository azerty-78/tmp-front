import { UserLayout } from '../../components/layouts/UserLayout';
import { themeConfig } from '../../config/theme';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaEnvelope, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: themeConfig.text.primary }}>
          Mon Profil
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Informations du profil */}
          <div className="md:col-span-2">
            <div
              className="p-6 rounded-lg shadow-lg mb-6"
              style={{ backgroundColor: themeConfig.backgrounds.paper }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl"
                  style={{ backgroundColor: themeConfig.modules.user.color }}
                >
                  <FaUser />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: themeConfig.text.primary }}>
                    {user?.name || 'Utilisateur'}
                  </h2>
                  <p className="text-sm" style={{ color: themeConfig.text.secondary }}>
                    {user?.role || 'USER'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope style={{ color: themeConfig.colors.primary }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: themeConfig.text.secondary }}>
                      Email
                    </p>
                    <p style={{ color: themeConfig.text.primary }}>{user?.email || 'Non défini'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaUser style={{ color: themeConfig.colors.primary }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: themeConfig.text.secondary }}>
                      Rôle
                    </p>
                    <p style={{ color: themeConfig.text.primary }}>
                      {user?.role === 'USER' && 'Utilisateur'}
                      {user?.role === 'EMPLOYE' && 'Employé'}
                      {user?.role === 'ADMIN' && 'Administrateur'}
                      {user?.role === 'ROOT_ADMIN' && 'Super Administrateur'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: themeConfig.backgrounds.paper }}
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
                Actions
              </h3>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors hover:bg-gray-50"
                  style={{ borderColor: themeConfig.colors.primary, color: themeConfig.colors.primary }}
                >
                  <FaEdit />
                  <span>Modifier mon profil</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors hover:bg-red-50"
                  style={{ borderColor: themeConfig.colors.error, color: themeConfig.colors.error }}
                >
                  <FaSignOutAlt />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div
              className="p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: themeConfig.backgrounds.paper }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
                Navigation
              </h3>
              <div className="space-y-2">
                <Link
                  to="/user/dashboard"
                  className="block px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
                  style={{ color: themeConfig.text.primary }}
                >
                  Tableau de bord
                </Link>
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: themeConfig.modules.user.color + '20',
                    color: themeConfig.modules.user.color,
                  }}
                >
                  Mon profil
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
                  style={{ color: themeConfig.text.primary }}
                >
                  Accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
