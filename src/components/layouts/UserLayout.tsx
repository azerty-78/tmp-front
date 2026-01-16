import { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';
import { themeConfig } from '../../config/theme';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle } from 'react-icons/fa';

interface UserLayoutProps {
  children: ReactNode;
}

/**
 * Layout pour le module User (public)
 */
export const UserLayout = ({ children }: UserLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: FaHome },
    { path: '/about', label: 'À propos', icon: FaInfoCircle },
    { path: '/user/profile', label: 'Profil', icon: FaUser },
  ];

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
      </nav>
    </div>
  );

  return <BaseLayout header={header}>{children}</BaseLayout>;
};
