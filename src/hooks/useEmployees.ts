import { useApiQuery, useApiMutation } from './useApi';
import apiClient from '../lib/api';
import type { User } from '../types/auth';

/**
 * Hook personnalisé pour gérer les employés
 */
export const useEmployees = () => {
  return useApiQuery<User[]>(['employees'], '/employees');
};

export const useEmployee = (id: string) => {
  return useApiQuery<User>(['employee', id], `/employees/${id}`);
};

export const useCreateEmployee = () => {
  return useApiMutation((employeeData: Partial<User>) =>
    apiClient.post('/employees', employeeData)
  );
};

export const useUpdateEmployee = () => {
  return useApiMutation(({ id, ...employeeData }: Partial<User> & { id: string }) =>
    apiClient.put(`/employees/${id}`, employeeData)
  );
};

export const useDeleteEmployee = () => {
  return useApiMutation((id: string) => apiClient.delete(`/employees/${id}`));
};
