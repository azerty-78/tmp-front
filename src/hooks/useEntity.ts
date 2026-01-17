import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../lib/api';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '../contexts/ToastContext';

export interface UseEntityOptions<TData, TVariables> {
  entityName: string;
  baseUrl: string;
  queryKey: string[];
  queryOptions?: Omit<UseQueryOptions<TData[], AxiosError>, 'queryKey' | 'queryFn'>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: AxiosError, variables: TVariables) => void;
  successMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
  errorMessages?: {
    create?: string;
    update?: string;
    delete?: string;
    fetch?: string;
  };
}

/**
 * Hook générique pour automatiser les opérations CRUD avec cache et gestion d'erreurs
 * 
 * @example
 * const { data, isLoading, create, update, remove } = useEntity<User, CreateUserDto>({
 *   entityName: 'utilisateur',
 *   baseUrl: '/users',
 *   queryKey: ['users'],
 * });
 */
export function useEntity<TData = any, TCreate = Partial<TData>, TUpdate = Partial<TData>>(
  options: UseEntityOptions<TData, TCreate | TUpdate>
) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const {
    entityName,
    baseUrl,
    queryKey,
    queryOptions,
    onSuccess,
    onError,
    successMessages,
    errorMessages,
  } = options;

  // Query pour récupérer la liste
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<TData[], AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<TData[]>(baseUrl);
      return response.data;
    },
    ...queryOptions,
  });

  // Mutation pour créer
  const createMutation = useMutation<AxiosResponse<TData>, AxiosError, TCreate>({
    mutationFn: async (variables) => {
      return await apiClient.post<TData>(baseUrl, variables);
    },
    onSuccess: (response, variables) => {
      // Invalider le cache pour forcer le refetch
      queryClient.invalidateQueries({ queryKey });
      
      const message = successMessages?.create || `${entityName} créé(e) avec succès`;
      showSuccess(message);
      
      onSuccess?.(response.data, variables);
    },
    onError: (error, variables) => {
      const message = errorMessages?.create || `Erreur lors de la création de ${entityName}`;
      showError(message);
      
      onError?.(error, variables);
    },
  });

  // Mutation pour mettre à jour
  const updateMutation = useMutation<AxiosResponse<TData>, AxiosError, { id: string | number; data: TUpdate }>({
    mutationFn: async ({ id, data }) => {
      return await apiClient.put<TData>(`${baseUrl}/${id}`, data);
    },
    onSuccess: (response, variables) => {
      // Mettre à jour le cache directement
      queryClient.setQueryData<TData[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((item: any) =>
          item.id === variables.id ? { ...item, ...response.data } : item
        );
      });
      
      // Invalider aussi pour être sûr
      queryClient.invalidateQueries({ queryKey });
      
      const message = successMessages?.update || `${entityName} modifié(e) avec succès`;
      showSuccess(message);
      
      onSuccess?.(response.data, variables);
    },
    onError: (error, variables) => {
      const message = errorMessages?.update || `Erreur lors de la modification de ${entityName}`;
      showError(message);
      
      onError?.(error, variables);
    },
  });

  // Mutation pour supprimer
  const deleteMutation = useMutation<AxiosResponse<void>, AxiosError, string | number>({
    mutationFn: async (id) => {
      return await apiClient.delete(`${baseUrl}/${id}`);
    },
    onSuccess: (_, id) => {
      // Retirer de la cache directement
      queryClient.setQueryData<TData[]>(queryKey, (old) => {
        if (!old) return old;
        return old.filter((item: any) => item.id !== id);
      });
      
      // Invalider aussi pour être sûr
      queryClient.invalidateQueries({ queryKey });
      
      const message = successMessages?.delete || `${entityName} supprimé(e) avec succès`;
      showSuccess(message);
    },
    onError: (error, id) => {
      const message = errorMessages?.delete || `Erreur lors de la suppression de ${entityName}`;
      showError(message);
      
      onError?.(error, id as any);
    },
  });

  // Hook pour récupérer un élément par ID
  const useItem = (id: string | number | null) => {
    return useQuery<TData, AxiosError>({
      queryKey: [...queryKey, id],
      queryFn: async () => {
        const response = await apiClient.get<TData>(`${baseUrl}/${id}`);
        return response.data;
      },
      enabled: !!id,
      ...queryOptions,
    });
  };

  return {
    // Data
    data: data || [],
    isLoading,
    isError,
    error,
    refetch,
    
    // Mutations
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    
    update: updateMutation.mutate,
    updateAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    
    remove: deleteMutation.mutate,
    removeAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    
    // Hook pour un item
    useItem,
  };
}
