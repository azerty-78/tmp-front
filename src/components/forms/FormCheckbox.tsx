import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '../ui/Checkbox';

export interface FormCheckboxProps extends Omit<CheckboxProps, 'name' | 'checked' | 'onChange' | 'error'> {
  name: string;
}

/**
 * Composant Checkbox intégré avec React Hook Form
 * Affiche automatiquement les erreurs de validation
 */
export function FormCheckbox({ name, ...props }: FormCheckboxProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          checked={field.value || false}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}
