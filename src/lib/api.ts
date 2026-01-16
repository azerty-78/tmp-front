import axios from 'axios';

// Configuration de base pour Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Gestion des erreurs globales
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si non authentifié
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Retry automatique pour les erreurs réseau ou 5xx (sauf 401, 403, 404)
    if (
      !originalRequest._retry &&
      (error.code === 'ECONNABORTED' || // Timeout
        error.code === 'ERR_NETWORK' || // Erreur réseau
        (error.response?.status >= 500 && error.response?.status < 600))
    ) {
      originalRequest._retry = true;
      
      // Attendre avant de réessayer (backoff exponentiel)
      const retryDelay = Math.min(1000 * Math.pow(2, originalRequest._retryCount || 0), 10000);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      // Réessayer la requête (max 3 tentatives)
      if (originalRequest._retryCount <= 3) {
        return apiClient(originalRequest);
      }
    }

    // Formater l'erreur pour un meilleur feedback
    const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Une erreur est survenue';
    
    error.formattedMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export default apiClient;
