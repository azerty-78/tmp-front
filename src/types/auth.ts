/**
 * Types pour l'authentification et les rôles
 */

export enum UserRole {
  USER = 'USER', // Utilisateur public (avec ou sans login)
  EMPLOYE = 'EMPLOYE', // Employé
  ADMIN = 'ADMIN', // Administrateur
  ROOT_ADMIN = 'ROOT_ADMIN', // Super administrateur
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  permissions?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}
