import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';
import { themeConfig } from '../../config/theme';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaShieldAlt,
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout pour le module Admin
 */
export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: FaHome },
    { path: '/admin/employees', label: 'Gestion des employés', icon: FaUsers },
    { path: '/admin/settings', label: 'Paramètres', icon: FaCog },
  ];

  const sidebar = (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        {themeConfig.company.logoSmall && (
          <img
            src={themeConfig.company.logoSmall}
            alt={themeConfig.company.name}
            className="h-8 mx-auto"
          />
        )}
        <p className="text-white text-sm text-center mt-2 flex items-center justify-center gap-2">
          <FaShieldAlt />
          {themeConfig.modules.admin.name}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              style={
                isActive
                  ? { backgroundColor: themeConfig.modules.admin.color }
                  : undefined
              }
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <FaUser className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{user?.name}</p>
            <p className="text-gray-400 text-xs">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );

  const header = (
    <div className="flex items-center justify-between px-6 py-4">
      <h2 className="text-lg font-semibold" style={{ color: themeConfig.text.primary }}>
        {themeConfig.modules.admin.name}
      </h2>
    </div>
  );

  return (
    <BaseLayout sidebar={sidebar} header={header} showSidebar={true}>
      {children}
    </BaseLayout>
  );
};
