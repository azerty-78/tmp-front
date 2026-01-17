import { useFormContext, Controller } from 'react-hook-form';
import { Input, InputProps } from '../ui/Input';

export interface FormInputProps extends Omit<InputProps, 'name' | 'value' | 'onChange' | 'error'> {
  name: string;
}

/**
 * Composant Input intégré avec React Hook Form
 * Affiche automatiquement les erreurs de validation
 */
export function FormInput({ name, ...props }: FormInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}
