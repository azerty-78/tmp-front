import { ButtonHTMLAttributes, ReactNode } from 'react';
import { themeConfig } from '../../config/theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * Composant Button réutilisable avec variants et tailles
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: themeConfig.colors.primary,
          color: '#FFFFFF',
        };
      case 'secondary':
        return {
          backgroundColor: themeConfig.colors.secondary,
          color: '#FFFFFF',
        };
      case 'success':
        return {
          backgroundColor: themeConfig.colors.success,
          color: '#FFFFFF',
        };
      case 'warning':
        return {
          backgroundColor: themeConfig.colors.warning,
          color: '#FFFFFF',
        };
      case 'error':
        return {
          backgroundColor: themeConfig.colors.error,
          color: '#FFFFFF',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: themeConfig.colors.primary,
          border: `2px solid ${themeConfig.colors.primary}`,
        };
      default:
        return {
          backgroundColor: themeConfig.colors.primary,
          color: '#FFFFFF',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      className={`${baseStyles} ${getSizeStyles()} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={getVariantStyles()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
