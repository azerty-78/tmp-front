import { useFormContext, Controller } from 'react-hook-form';
import { Textarea, TextareaProps } from '../ui/Textarea';

export interface FormTextareaProps extends Omit<TextareaProps, 'name' | 'value' | 'onChange' | 'error'> {
  name: string;
}

/**
 * Composant Textarea intégré avec React Hook Form
 * Affiche automatiquement les erreurs de validation
 */
export function FormTextarea({ name, ...props }: FormTextareaProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}
