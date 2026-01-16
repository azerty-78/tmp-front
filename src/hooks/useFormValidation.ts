import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Hook personnalisé pour faciliter l'utilisation de React Hook Form avec Zod
 * 
 * @param schema - Schéma Zod pour la validation
 * @param defaultValues - Valeurs par défaut du formulaire
 * @returns Retourne les méthodes et états de React Hook Form
 */
export function useFormValidation<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: Partial<T>
): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as T,
    mode: 'onBlur', // Valider au blur pour une meilleure UX
  });
}
