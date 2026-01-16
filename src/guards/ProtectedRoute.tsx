import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * Composant pour protéger les routes selon les rôles
 * 
 * @example
 * <ProtectedRoute requiredRole={UserRole.ADMIN}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 * 
 * @example
 * <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.ROOT_ADMIN]}>
 *   <AdminPanel />
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({
  children,
  requiredRole,
  requiredRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasRole, hasAnyRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Vérifier le rôle unique
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérifier les rôles multiples
  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
