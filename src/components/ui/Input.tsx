import { InputHTMLAttributes, ReactNode } from 'react';
import { themeConfig } from '../../config/theme';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Composant Input réutilisable avec label, erreur et icônes
 */
export const Input = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...props
}: InputProps) => {
  const hasError = !!error;
  const borderColor = hasError
    ? themeConfig.colors.error
    : themeConfig.colors.primary + '40';

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: themeConfig.text.primary }}
        >
          {label}
          {props.required && <span style={{ color: themeConfig.colors.error }}> *</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          className={`w-full ${leftIcon ? 'pl-10' : 'pl-4'} ${
            rightIcon ? 'pr-10' : 'pr-4'
          } py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${className}`}
          style={{
            borderColor: borderColor,
            focusRingColor: hasError ? themeConfig.colors.error : themeConfig.colors.primary,
          }}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm" style={{ color: themeConfig.colors.error }}>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm" style={{ color: themeConfig.text.secondary }}>
          {helperText}
        </p>
      )}
    </div>
  );
};
