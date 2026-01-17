import { SelectHTMLAttributes, ReactNode } from 'react';
import { themeConfig } from '../../config/theme';
import { FaChevronDown } from 'react-icons/fa';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
  placeholder?: string;
}

/**
 * Composant Select réutilisable avec label, erreur et icônes
 */
export const Select = ({
  label,
  options,
  error,
  helperText,
  leftIcon,
  fullWidth = false,
  placeholder,
  className = '',
  ...props
}: SelectProps) => {
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
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {leftIcon}
          </div>
        )}

        <select
          className={`w-full ${leftIcon ? 'pl-10' : 'pl-4'} pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none bg-white ${className}`}
          style={{
            borderColor: borderColor,
            focusRingColor: hasError ? themeConfig.colors.error : themeConfig.colors.primary,
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{ color: themeConfig.text.secondary }}
        >
          <FaChevronDown />
        </div>
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
