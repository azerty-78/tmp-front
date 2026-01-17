import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '../lib/api';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '../contexts/ToastContext';

// Hook personnalisé pour les requêtes GET avec gestion automatique des erreurs
export function useApiQuery<TData = unknown, TError = AxiosError>(
  queryKey: string[],
  url: string,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> & {
    showErrorToast?: boolean;
    errorMessage?: string;
  }
) {
  const { showError } = useToast();
  const { showErrorToast = false, errorMessage, ...queryOptions } = options || {};

  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await apiClient.get<TData>(url);
        return response.data;
      } catch (error) {
        if (showErrorToast) {
          const message = errorMessage || (error as AxiosError).formattedMessage || 'Erreur lors du chargement des données';
          showError(message);
        }
        throw error;
      }
    },
    ...queryOptions,
  });
}

// Hook personnalisé pour les mutations avec gestion automatique des erreurs et toasts
export function useApiMutation<TData = unknown, TVariables = unknown, TError = AxiosError>(
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<TData>>,
  options?: UseMutationOptions<TData, TError, TVariables> & {
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
    errorMessage?: string;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  
  const {
    showSuccessToast = true,
    showErrorToast = true,
    successMessage,
    errorMessage,
    invalidateQueries,
    onSuccess,
    onError,
    ...mutationOptions
  } = options || {};

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalider les queries spécifiées
      if (invalidateQueries) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Afficher le toast de succès
      if (showSuccessToast && successMessage) {
        showSuccess(successMessage);
      }
      
      // Appeler le callback personnalisé
      onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Afficher le toast d'erreur
      if (showErrorToast) {
        const message = errorMessage || 
                       (error as AxiosError).formattedMessage || 
                       'Une erreur est survenue';
        showError(message);
      }
      
      // Appeler le callback personnalisé
      onError?.(error, variables, context);
    },
    ...mutationOptions,
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
