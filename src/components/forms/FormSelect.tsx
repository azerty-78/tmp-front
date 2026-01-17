import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectProps } from '../ui/Select';

export interface FormSelectProps extends Omit<SelectProps, 'name' | 'value' | 'onChange' | 'error'> {
  name: string;
}

/**
 * Composant Select intégré avec React Hook Form
 * Affiche automatiquement les erreurs de validation
 */
export function FormSelect({ name, ...props }: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}
