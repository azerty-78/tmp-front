/**
 * Système centralisé de messages d'erreur
 * Permet de personnaliser et traduire les messages d'erreur
 */

export interface ErrorMessages {
  network: string;
  timeout: string;
  unauthorized: string;
  forbidden: string;
  notFound: string;
  serverError: string;
  serviceUnavailable: string;
  generic: string;
  [key: string]: string;
}

// Messages d'erreur par défaut (français)
export const defaultErrorMessages: ErrorMessages = {
  network: 'Problème de connexion. Vérifiez votre connexion internet.',
  timeout: 'La requête a expiré. Veuillez réessayer.',
  unauthorized: 'Vous n\'êtes pas autorisé à effectuer cette action.',
  forbidden: 'Accès refusé. Vous n\'avez pas les permissions nécessaires.',
  notFound: 'La ressource demandée n\'a pas été trouvée.',
  serverError: 'Erreur serveur. Veuillez réessayer plus tard.',
  serviceUnavailable: 'Service temporairement indisponible.',
  generic: 'Une erreur est survenue. Veuillez réessayer.',
  
  // Erreurs de validation
  required: 'Ce champ est requis',
  email: 'Format d\'email invalide',
  minLength: 'Ce champ doit contenir au moins {min} caractères',
  maxLength: 'Ce champ doit contenir au plus {max} caractères',
  min: 'La valeur minimale est {min}',
  max: 'La valeur maximale est {max}',
  pattern: 'Format invalide',
  
  // Erreurs de formulaire
  passwordMismatch: 'Les mots de passe ne correspondent pas',
  invalidCredentials: 'Email ou mot de passe incorrect',
  
  // Erreurs CRUD
  createError: 'Erreur lors de la création',
  updateError: 'Erreur lors de la modification',
  deleteError: 'Erreur lors de la suppression',
  fetchError: 'Erreur lors du chargement des données',
};

/**
 * Récupère un message d'erreur personnalisé
 */
export function getErrorMessage(
  error: any,
  customMessages?: Partial<ErrorMessages>
): string {
  const messages = { ...defaultErrorMessages, ...customMessages };
  
  // Si c'est une string, retourner directement
  if (typeof error === 'string') {
    return error;
  }
  
  // Si c'est un objet Error avec un message
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // Vérifier les erreurs réseau
    if (message.includes('network') || message.includes('econnaborted')) {
      return messages.network;
    }
    if (message.includes('timeout')) {
      return messages.timeout;
    }
    
    return error.message || messages.generic;
  }
  
  // Si c'est une erreur Axios
  if (error?.response) {
    const status = error.response.status;
    
    switch (status) {
      case 401:
        return messages.unauthorized;
      case 403:
        return messages.forbidden;
      case 404:
        return messages.notFound;
      case 500:
      case 502:
      case 503:
        return messages.serverError;
      case 503:
        return messages.serviceUnavailable;
      default:
        return error.response.data?.message || messages.generic;
    }
  }
  
  // Si c'est un code d'erreur
  if (error?.code) {
    if (error.code === 'ECONNABORTED') {
      return messages.timeout;
    }
    if (error.code === 'ERR_NETWORK') {
      return messages.network;
    }
  }
  
  // Message par défaut
  return messages.generic;
}

/**
 * Formate un message avec des variables
 */
export function formatErrorMessage(
  message: string,
  variables: Record<string, string | number>
): string {
  let formatted = message;
  Object.entries(variables).forEach(([key, value]) => {
    formatted = formatted.replace(`{${key}}`, String(value));
  });
  return formatted;
}
