/**
 * Configuration centralisée des routes de l'application
 * Facilite la maintenance et la personnalisation
 */

import { UserRole } from '../types/auth';

export interface RouteConfig {
  path: string;
  module: 'user' | 'employe' | 'admin' | 'rootAdmin';
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  public?: boolean; // Route accessible sans authentification
}

export const routes: RouteConfig[] = [
  // Routes publiques (Module User)
  {
    path: '/',
    module: 'user',
    public: true,
  },
  {
    path: '/login',
    module: 'user',
    public: true,
  },
  {
    path: '/register',
    module: 'user',
    public: true,
  },
  {
    path: '/about',
    module: 'user',
    public: true,
  },

  // Routes User (avec authentification optionnelle)
  {
    path: '/user/dashboard',
    module: 'user',
  },
  {
    path: '/user/profile',
    module: 'user',
  },

  // Routes Employé
  {
    path: '/employe/dashboard',
    module: 'employe',
    requiredRole: UserRole.EMPLOYE,
  },
  {
    path: '/employe/content',
    module: 'employe',
    requiredRole: UserRole.EMPLOYE,
  },

  // Routes Admin
  {
    path: '/admin/dashboard',
    module: 'admin',
    requiredRole: UserRole.ADMIN,
  },
  {
    path: '/admin/employees',
    module: 'admin',
    requiredRole: UserRole.ADMIN,
  },
  {
    path: '/admin/settings',
    module: 'admin',
    requiredRole: UserRole.ADMIN,
  },

  // Routes Root Admin
  {
    path: '/root-admin/dashboard',
    module: 'rootAdmin',
    requiredRole: UserRole.ROOT_ADMIN,
  },
  {
    path: '/root-admin/admins',
    module: 'rootAdmin',
    requiredRole: UserRole.ROOT_ADMIN,
  },
  {
    path: '/root-admin/maintenance',
    module: 'rootAdmin',
    requiredRole: UserRole.ROOT_ADMIN,
  },
];

// Routes par module pour faciliter l'accès
export const userRoutes = routes.filter((r) => r.module === 'user');
export const employeRoutes = routes.filter((r) => r.module === 'employe');
export const adminRoutes = routes.filter((r) => r.module === 'admin');
export const rootAdminRoutes = routes.filter((r) => r.module === 'rootAdmin');
