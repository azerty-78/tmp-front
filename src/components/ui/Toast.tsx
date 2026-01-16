import { useEffect } from 'react';
import { themeConfig } from '../../config/theme';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

/**
 * Composant Toast individuel pour les notifications
 */
export const Toast = ({ toast, onClose }: ToastProps) => {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, onClose]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          backgroundColor: themeConfig.colors.success,
          icon: FaCheckCircle,
        };
      case 'error':
        return {
          backgroundColor: themeConfig.colors.error,
          icon: FaExclamationCircle,
        };
      case 'warning':
        return {
          backgroundColor: themeConfig.colors.warning,
          icon: FaExclamationCircle,
        };
      case 'info':
        return {
          backgroundColor: themeConfig.colors.info,
          icon: FaInfoCircle,
        };
      default:
        return {
          backgroundColor: themeConfig.colors.info,
          icon: FaInfoCircle,
        };
    }
  };

  const styles = getToastStyles();
  const Icon = styles.icon;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[300px] max-w-md animate-slide-in"
      style={{ backgroundColor: styles.backgroundColor }}
    >
      <Icon className="flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 hover:opacity-80 transition-opacity"
        aria-label="Fermer"
      >
        <FaTimes />
      </button>
    </div>
  );
};
