import { ReactNode } from 'react';
import { themeConfig } from '../../config/theme';

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Composant Card réutilisable pour afficher du contenu dans une carte
 */
export const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  onClick,
  hover = false,
  padding = 'md',
}: CardProps) => {
  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const baseStyles = `rounded-lg shadow-lg ${getPaddingStyles()} ${
    hover ? 'transition-all duration-200 hover:shadow-xl cursor-pointer' : ''
  } ${onClick ? 'cursor-pointer' : ''}`;

  return (
    <div
      className={`${baseStyles} ${className}`}
      style={{ backgroundColor: themeConfig.backgrounds.paper }}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-xl font-semibold mb-1" style={{ color: themeConfig.text.primary }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm" style={{ color: themeConfig.text.secondary }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: themeConfig.text.disabled + '30' }}>
          {footer}
        </div>
      )}
    </div>
  );
};
