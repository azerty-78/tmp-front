import { TextareaHTMLAttributes, ReactNode } from 'react';
import { themeConfig } from '../../config/theme';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
  rows?: number;
}

/**
 * Composant Textarea réutilisable avec label, erreur et icônes
 */
export const Textarea = ({
  label,
  error,
  helperText,
  leftIcon,
  fullWidth = false,
  rows = 4,
  className = '',
  ...props
}: TextareaProps) => {
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
          <div className="absolute left-3 top-3 text-gray-400">
            {leftIcon}
          </div>
        )}

        <textarea
          rows={rows}
          className={`w-full ${leftIcon ? 'pl-10' : 'pl-4'} pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-y ${className}`}
          style={{
            borderColor: borderColor,
            focusRingColor: hasError ? themeConfig.colors.error : themeConfig.colors.primary,
          }}
          {...props}
        />
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
