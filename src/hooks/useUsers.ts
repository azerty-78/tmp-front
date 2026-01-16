import { useApiQuery, useApiMutation } from './useApi';
import apiClient from '../lib/api';
import type { User } from '../types/auth';

/**
 * Hook personnalisé pour gérer les utilisateurs
 */
export const useUsers = () => {
  return useApiQuery<User[]>(['users'], '/users');
};

export const useUser = (id: string) => {
  return useApiQuery<User>(['user', id], `/users/${id}`);
};

export const useCreateUser = () => {
  return useApiMutation((userData: Partial<User>) =>
    apiClient.post('/users', userData)
  );
};

export const useUpdateUser = () => {
  return useApiMutation(({ id, ...userData }: Partial<User> & { id: string }) =>
    apiClient.put(`/users/${id}`, userData)
  );
};

export const useDeleteUser = () => {
  return useApiMutation((id: string) => apiClient.delete(`/users/${id}`));
};
