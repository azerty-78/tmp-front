import { z } from 'zod';

/**
 * Schémas de validation Zod pour les formulaires
 */

// Validation email
export const emailSchema = z
  .string()
  .min(1, 'L\'email est requis')
  .email('Format d\'email invalide');

// Validation mot de passe
export const passwordSchema = z
  .string()
  .min(1, 'Le mot de passe est requis')
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères');

// Schéma de connexion
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(['USER', 'EMPLOYE', 'ADMIN', 'ROOT_ADMIN']).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schéma d'inscription
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'La confirmation est requise'),
  name: z.string().min(1, 'Le nom est requis').min(2, 'Le nom doit contenir au moins 2 caractères'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Schéma de profil utilisateur
export const profileSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: emailSchema,
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
