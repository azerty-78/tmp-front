import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '../lib/api';
import { AxiosError, AxiosResponse } from 'axios';

// Hook personnalisé pour les requêtes GET
export function useApiQuery<TData = unknown, TError = AxiosError>(
  queryKey: string[],
  url: string,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<TData>(url);
      return response.data;
    },
    ...options,
  });
}

// Hook personnalisé pour les mutations (POST, PUT, DELETE)
export function useApiMutation<TData = unknown, TVariables = unknown, TError = AxiosError>(
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<TData>>,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
}

// Exemples de hooks spécifiques (à adapter selon vos besoins)
export function useGetUsers() {
  return useApiQuery(['users'], '/users');
}

export function useCreateUser() {
  return useApiMutation((userData: { name: string; email: string }) =>
    apiClient.post('/users', userData)
  );
}
