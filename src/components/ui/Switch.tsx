import { InputHTMLAttributes, ReactNode } from 'react';
import { themeConfig } from '../../config/theme';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | ReactNode;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/**
 * Composant Switch réutilisable avec label et erreur
 */
export const Switch = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}: SwitchProps) => {
  const hasError = !!error;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            className="sr-only"
            {...props}
          />
          <div
            className={`w-11 h-6 rounded-full transition-all duration-200 ${
              props.checked ? '' : 'bg-gray-300'
            } ${hasError ? 'ring-2 ring-red-500' : ''}`}
            style={{
              backgroundColor: props.checked ? themeConfig.colors.primary : undefined,
            }}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                props.checked ? 'translate-x-5' : 'translate-x-0.5'
              }`}
              style={{ marginTop: '2px' }}
            />
          </div>
        </div>
        <div className="flex-1">
          {label && (
            <span
              className="text-sm font-medium"
              style={{ color: themeConfig.text.primary }}
            >
              {label}
              {props.required && <span style={{ color: themeConfig.colors.error }}> *</span>}
            </span>
          )}
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
      </label>
    </div>
  );
};
