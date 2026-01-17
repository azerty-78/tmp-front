import { ReactNode, FormHTMLAttributes } from 'react';
import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';
import { themeConfig } from '../../config/theme';

export interface FormProps<T extends FieldValues> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: ReactNode;
  className?: string;
}

/**
 * Composant Form wrapper qui intègre React Hook Form avec validation automatique
 * 
 * @example
 * const form = useForm<LoginFormData>({
 *   resolver: zodResolver(loginSchema),
 * });
 * 
 * <Form form={form} onSubmit={handleSubmit}>
 *   <FormInput form={form} name="email" label="Email" />
 *   <FormInput form={form} name="password" type="password" label="Mot de passe" />
 *   <Button type="submit">Se connecter</Button>
 * </Form>
 */
export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className = '',
  ...props
}: FormProps<T>) {
  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className={className}
        style={{ color: themeConfig.text.primary }}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}
