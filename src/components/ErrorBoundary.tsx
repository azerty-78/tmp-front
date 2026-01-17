import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorDisplay } from './ui/ErrorDisplay';
import { Button } from './ui/Button';
import { themeConfig } from '../config/theme';
import { FaRedo, FaHome } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Enregistrer l'erreur dans l'état pour affichage
    this.setState({ errorInfo });
    
    // Appeler le callback personnalisé
    this.props.onError?.(error, errorInfo);
    
    // Ici, vous pourriez envoyer l'erreur à un service de reporting (Sentry, etc.)
    // reportErrorToService(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{ backgroundColor: themeConfig.backgrounds.default }}
        >
          <div className="max-w-2xl w-full">
            <ErrorDisplay
              error={this.state.error}
              title="Une erreur s'est produite"
              showDetails={this.props.showDetails}
            />
            
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button
                variant="primary"
                onClick={this.handleReset}
                leftIcon={<FaRedo />}
              >
                Réessayer
              </Button>
              <Button
                variant="outline"
                onClick={this.handleReload}
              >
                Recharger la page
              </Button>
              <Button
                variant="outline"
                onClick={this.handleGoHome}
                leftIcon={<FaHome />}
              >
                Retour à l'accueil
              </Button>
            </div>

            {this.props.showDetails && this.state.errorInfo && (
              <details className="mt-4">
                <summary
                  className="cursor-pointer text-sm font-medium mb-2"
                  style={{ color: themeConfig.text.secondary }}
                >
                  Détails techniques
                </summary>
                <pre
                  className="p-4 rounded text-xs overflow-auto bg-gray-100"
                  style={{ color: themeConfig.text.secondary }}
                >
                  {this.state.error?.stack}
                  {'\n\n'}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
