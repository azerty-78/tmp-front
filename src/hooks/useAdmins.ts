import { useApiQuery, useApiMutation } from './useApi';
import apiClient from '../lib/api';
import type { User } from '../types/auth';

/**
 * Hook personnalisé pour gérer les administrateurs
 */
export const useAdmins = () => {
  return useApiQuery<User[]>(['admins'], '/admins');
};

export const useAdmin = (id: string) => {
  return useApiQuery<User>(['admin', id], `/admins/${id}`);
};

export const useCreateAdmin = () => {
  return useApiMutation((adminData: Partial<User>) =>
    apiClient.post('/admins', adminData)
  );
};

export const useUpdateAdmin = () => {
  return useApiMutation(({ id, ...adminData }: Partial<User> & { id: string }) =>
    apiClient.put(`/admins/${id}`, adminData)
  );
};

export const useDeleteAdmin = () => {
  return useApiMutation((id: string) => apiClient.delete(`/admins/${id}`));
};
