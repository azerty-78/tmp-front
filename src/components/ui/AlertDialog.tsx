import { Dialog } from './Dialog';
import { Button } from './Button';
import { Alert } from './Alert';
import { themeConfig } from '../../config/theme';

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  buttonText?: string;
}

/**
 * Composant AlertDialog pour afficher des alertes
 */
export const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  variant = 'info',
  buttonText = 'OK',
}: AlertDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <Button variant="primary" onClick={onClose}>
          {buttonText}
        </Button>
      }
    >
      <Alert variant={variant}>{message}</Alert>
    </Dialog>
  );
};
