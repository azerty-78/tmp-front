import { Alert } from './Alert';
import { Button } from './Button';
import { themeConfig } from '../../config/theme';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export interface ErrorDisplayProps {
  /** Message d'erreur à afficher */
  error: string | Error | null | undefined;
  /** Titre de l'erreur */
  title?: string;
  /** Callback pour réessayer */
  onRetry?: () => void;
  /** Texte du bouton de retry */
  retryText?: string;
  /** Afficher les détails techniques */
  showDetails?: boolean;
  /** Variante de l'alerte */
  variant?: 'error' | 'warning';
  /** Classe CSS supplémentaire */
  className?: string;
}

/**
 * Composant pour afficher les erreurs de manière élégante
 * Supporte les erreurs API, les erreurs réseau, et les erreurs génériques
 */
export const ErrorDisplay = ({
  error,
  title = 'Une erreur est survenue',
  onRetry,
  retryText = 'Réessayer',
  showDetails = false,
  variant = 'error',
  className = '',
}: ErrorDisplayProps) => {
  if (!error) return null;

  // Extraire le message d'erreur
  let errorMessage = '';
  let errorDetails = '';

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message || 'Une erreur inattendue s\'est produite';
    errorDetails = error.stack || '';
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = String(error.message);
  } else {
    errorMessage = 'Une erreur inattendue s\'est produite';
  }

  // Messages d'erreur personnalisés pour les erreurs courantes
  const friendlyMessages: Record<string, string> = {
    'Network Error': 'Problème de connexion. Vérifiez votre connexion internet.',
    'timeout': 'La requête a expiré. Veuillez réessayer.',
    '401': 'Vous n\'êtes pas autorisé à effectuer cette action.',
    '403': 'Accès refusé. Vous n\'avez pas les permissions nécessaires.',
    '404': 'La ressource demandée n\'a pas été trouvée.',
    '500': 'Erreur serveur. Veuillez réessayer plus tard.',
    '503': 'Service temporairement indisponible.',
  };

  // Remplacer par un message plus convivial si disponible
  for (const [key, message] of Object.entries(friendlyMessages)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      errorMessage = message;
      break;
    }
  }

  return (
    <div className={className}>
      <Alert variant={variant} title={title} onClose={onRetry ? undefined : undefined}>
        <div className="space-y-3">
          <p style={{ color: themeConfig.text.primary }}>{errorMessage}</p>

          {showDetails && errorDetails && (
            <details className="mt-2">
              <summary
                className="cursor-pointer text-sm font-medium"
                style={{ color: themeConfig.text.secondary }}
              >
                Détails techniques
              </summary>
              <pre
                className="mt-2 p-3 rounded text-xs overflow-auto bg-gray-100"
                style={{ color: themeConfig.text.secondary }}
              >
                {errorDetails}
              </pre>
            </details>
          )}

          {onRetry && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                leftIcon={<FaRedo />}
              >
                {retryText}
              </Button>
            </div>
          )}
        </div>
      </Alert>
    </div>
  );
};
