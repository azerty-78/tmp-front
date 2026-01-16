import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';
import { themeConfig } from '../../config/theme';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaUser, FaInfoCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

interface UserLayoutProps {
  children: ReactNode;
}

/**
 * Layout pour le module User (public)
 */
export const UserLayout = ({ children }: UserLayoutProps) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Accueil', icon: FaHome },
    { path: '/about', label: 'À propos', icon: FaInfoCircle },
    { path: '/user/profile', label: 'Profil', icon: FaUser },
    { path: '/user/components-demo', label: 'Composants', icon: FaInfoCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const header = (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        {themeConfig.company.logo && (
          <img
            src={themeConfig.company.logo}
            alt={themeConfig.company.name}
            className="h-10"
          />
        )}
        <h1 className="text-xl font-bold" style={{ color: themeConfig.text.primary }}>
          {themeConfig.company.name}
        </h1>
      </div>

      <nav className="flex items-center gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
              style={
                isActive
                  ? { backgroundColor: themeConfig.modules.user.color }
                  : undefined
              }
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-white"
            style={{ backgroundColor: themeConfig.colors.error }}
          >
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-white"
            style={{ backgroundColor: themeConfig.colors.primary }}
          >
            <FaSignInAlt />
            <span>Connexion</span>
          </Link>
        )}
      </nav>
    </div>
  );

  return <BaseLayout header={header}>{children}</BaseLayout>;
};
