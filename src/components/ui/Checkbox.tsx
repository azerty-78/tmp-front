import { InputHTMLAttributes, ReactNode } from 'react';
import { themeConfig } from '../../config/theme';
import { FaCheck } from 'react-icons/fa';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | ReactNode;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/**
 * Composant Checkbox réutilisable avec label et erreur
 */
export const Checkbox = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}: CheckboxProps) => {
  const hasError = !!error;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            className="sr-only"
            {...props}
          />
          <div
            className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
              props.checked ? '' : 'bg-white'
            } ${hasError ? 'border-red-500' : 'border-gray-300'}`}
            style={{
              backgroundColor: props.checked ? themeConfig.colors.primary : undefined,
              borderColor: hasError
                ? themeConfig.colors.error
                : props.checked
                ? themeConfig.colors.primary
                : undefined,
            }}
          >
            {props.checked && (
              <FaCheck className="text-white text-xs" />
            )}
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
