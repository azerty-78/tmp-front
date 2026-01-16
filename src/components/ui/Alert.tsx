import { ReactNode } from 'react';
import { themeConfig } from '../../config/theme';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

export interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
  className?: string;
}

/**
 * Composant Alert réutilisable pour afficher des messages d'alerte
 */
export const Alert = ({
  children,
  variant = 'info',
  title,
  onClose,
  className = '',
}: AlertProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return {
          backgroundColor: themeConfig.colors.info + '15',
          borderColor: themeConfig.colors.info,
          textColor: themeConfig.colors.info,
          icon: FaInfoCircle,
        };
      case 'success':
        return {
          backgroundColor: themeConfig.colors.success + '15',
          borderColor: themeConfig.colors.success,
          textColor: themeConfig.colors.success,
          icon: FaCheckCircle,
        };
      case 'warning':
        return {
          backgroundColor: themeConfig.colors.warning + '15',
          borderColor: themeConfig.colors.warning,
          textColor: themeConfig.colors.warning,
          icon: FaExclamationTriangle,
        };
      case 'error':
        return {
          backgroundColor: themeConfig.colors.error + '15',
          borderColor: themeConfig.colors.error,
          textColor: themeConfig.colors.error,
          icon: FaTimesCircle,
        };
      default:
        return {
          backgroundColor: themeConfig.colors.info + '15',
          borderColor: themeConfig.colors.info,
          textColor: themeConfig.colors.info,
          icon: FaInfoCircle,
        };
    }
  };

  const styles = getVariantStyles();
  const Icon = styles.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        borderLeftColor: styles.borderColor,
      }}
    >
      <Icon className="mt-0.5 flex-shrink-0" style={{ color: styles.textColor }} />
      <div className="flex-1">
        {title && (
          <h4 className="font-semibold mb-1" style={{ color: styles.textColor }}>
            {title}
          </h4>
        )}
        <div style={{ color: themeConfig.text.primary }}>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          <FaTimesCircle />
        </button>
      )}
    </div>
  );
};
