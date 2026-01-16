import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';
import { themeConfig } from '../../config/theme';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaHome,
  FaUsersCog,
  FaTools,
  FaSignOutAlt,
  FaUser,
  FaCog,
} from 'react-icons/fa';

interface RootAdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout pour le module Root Admin (Super Admin)
 */
export const RootAdminLayout = ({ children }: RootAdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/root-admin/dashboard', label: 'Tableau de bord', icon: FaHome },
    { path: '/root-admin/admins', label: 'Gestion des admins', icon: FaUsersCog },
    { path: '/root-admin/maintenance', label: 'Maintenance', icon: FaTools },
  ];

  const sidebar = (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-red-600">
        {themeConfig.company.logoSmall && (
          <img
            src={themeConfig.company.logoSmall}
            alt={themeConfig.company.name}
            className="h-8 mx-auto"
          />
        )}
        <p className="text-white text-sm text-center mt-2 flex items-center justify-center gap-2">
          <FaCog className="text-red-400" />
          {themeConfig.modules.rootAdmin.name}
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
                  ? { backgroundColor: themeConfig.modules.rootAdmin.color }
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
      <div className="p-4 border-t border-red-600">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
            <FaUser className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{user?.name}</p>
            <p className="text-gray-400 text-xs">{user?.email}</p>
            <p className="text-red-400 text-xs font-bold">ROOT ADMIN</p>
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
        {themeConfig.modules.rootAdmin.name}
      </h2>
      <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
        MODE MAINTENANCE
      </div>
    </div>
  );

  return (
    <BaseLayout sidebar={sidebar} header={header} showSidebar={true}>
      {children}
    </BaseLayout>
  );
};
