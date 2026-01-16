import { UserRole } from '../types/auth';

/**
 * Utilitaires pour la gestion des rôles
 */

/**
 * Vérifie si un rôle a accès à un module
 */
export const canAccessModule = (userRole: UserRole, module: 'user' | 'employe' | 'admin' | 'rootAdmin'): boolean => {
  switch (module) {
    case 'user':
      return true; // Tout le monde peut accéder au module user
    case 'employe':
      return [UserRole.EMPLOYE, UserRole.ADMIN, UserRole.ROOT_ADMIN].includes(userRole);
    case 'admin':
      return [UserRole.ADMIN, UserRole.ROOT_ADMIN].includes(userRole);
    case 'rootAdmin':
      return userRole === UserRole.ROOT_ADMIN;
    default:
      return false;
  }
};

/**
 * Retourne le chemin de redirection par défaut selon le rôle
 */
export const getDefaultRoute = (role: UserRole): string => {
  switch (role) {
    case UserRole.USER:
      return '/user/dashboard';
    case UserRole.EMPLOYE:
      return '/employe/dashboard';
    case UserRole.ADMIN:
      return '/admin/dashboard';
    case UserRole.ROOT_ADMIN:
      return '/root-admin/dashboard';
    default:
      return '/';
  }
};

/**
 * Retourne le nom du module selon le rôle
 */
export const getModuleName = (role: UserRole): string => {
  switch (role) {
    case UserRole.USER:
      return 'user';
    case UserRole.EMPLOYE:
      return 'employe';
    case UserRole.ADMIN:
      return 'admin';
    case UserRole.ROOT_ADMIN:
      return 'rootAdmin';
    default:
      return 'user';
  }
};
