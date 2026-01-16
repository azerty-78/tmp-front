import { QueryClient } from '@tanstack/react-query';

// Fonction de retry intelligente
const retryFunction = (failureCount: number, error: any) => {
  // Ne pas réessayer pour les erreurs 4xx (sauf 408, 429)
  if (error?.response?.status) {
    const status = error.response.status;
    if (status >= 400 && status < 500 && ![408, 429].includes(status)) {
      return false;
    }
  }
  
  // Maximum 3 tentatives pour les erreurs réseau ou serveur
  return failureCount < 3;
};

// Configuration de TanStack Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: retryFunction,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponentiel
    },
    mutations: {
      retry: retryFunction,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
