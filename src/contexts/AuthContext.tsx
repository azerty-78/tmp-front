import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState, LoginCredentials } from '@/types/auth';
import apiClient from '@/lib/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          // Vérifier si le token est toujours valide
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Optionnel : faire une requête pour vérifier le token
          // const response = await apiClient.get('/auth/me');
          
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token invalide, nettoyer
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // Mode test : si un rôle est spécifié, on crée un utilisateur de test
      if (credentials.role) {
        const testUser: User = {
          id: 'test-' + Date.now(),
          email: credentials.email || 'test@example.com',
          name: credentials.email?.split('@')[0] || 'Utilisateur Test',
          role: credentials.role,
          permissions: [],
        };

        const testToken = 'test-token-' + Date.now();

        localStorage.setItem('token', testToken);
        localStorage.setItem('user', JSON.stringify(testUser));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${testToken}`;

        setAuthState({
          user: testUser,
          token: testToken,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }

      // Mode production : appel API réel
      const response = await apiClient.post('/auth/login', credentials);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const hasRole = (role: UserRole): boolean => {
    return authState.user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!authState.user) return false;
    return roles.includes(authState.user.role);
  };

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    return authState.user.permissions?.includes(permission) ?? false;
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    hasRole,
    hasAnyRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
