# 🎨 Guide de Personnalisation

Ce guide vous explique comment personnaliser rapidement votre template pour l'adapter à votre projet.

## 📋 Table des matières

- [Configuration du Thème](#-configuration-du-thème)
- [Logos et Images](#-logos-et-images)
- [Couleurs](#-couleurs)
- [Structure des Modules](#-structure-des-modules)
- [Ajout de Routes](#-ajout-de-routes)
- [Composants Réutilisables](#-composants-réutilisables)

## 🎨 Configuration du Thème

### Fichier de configuration

Toute la personnalisation visuelle se fait dans **`src/config/theme.ts`**.

### 1. Informations de l'entreprise

```typescript
company: {
  name: 'VOTRE NOM D\'ENTREPRISE',
  logo: '/logo.png',        // Logo principal
  logoSmall: '/logo-small.png', // Logo compact (sidebar)
  favicon: '/favicon.ico',
}
```

**Action :**
1. Placez vos logos dans le dossier `public/`
2. Modifiez les chemins dans `theme.ts`

### 2. Couleurs principales

```typescript
colors: {
  primary: '#3B82F6',    // Couleur principale (boutons, liens)
  secondary: '#8B5CF6',  // Couleur secondaire
  accent: '#10B981',     // Couleur d'accentuation
  success: '#10B981',     // Succès
  warning: '#F59E0B',    // Avertissement
  error: '#EF4444',      // Erreur
  info: '#3B82F6',       // Information
}
```

**Action :** Remplacez les codes couleur par vos couleurs de marque.

### 3. Couleurs de fond

```typescript
backgrounds: {
  default: '#F9FAFB',   // Fond par défaut
  paper: '#FFFFFF',      // Fond des cartes
  sidebar: '#1F2937',   // Fond de la sidebar
  header: '#FFFFFF',    // Fond du header
}
```

### 4. Configuration des modules

Chaque module peut avoir sa propre couleur et icône :

```typescript
modules: {
  user: {
    name: 'Espace Client',
    color: '#3B82F6',
    icon: 'FaUser',  // Nom de l'icône React Icons
  },
  // ... autres modules
}
```

## 🖼️ Logos et Images

### Emplacement des fichiers

Placez tous vos assets dans le dossier `public/` :

```
public/
├── logo.png          # Logo principal (header)
├── logo-small.png    # Logo compact (sidebar)
└── favicon.ico       # Favicon
```

### Taille recommandée

- **logo.png** : 200x60px (ratio 3:1)
- **logo-small.png** : 120x40px
- **favicon.ico** : 32x32px ou 16x16px

## 🎨 Couleurs

### Utilisation dans les composants

Les couleurs du thème sont accessibles via `themeConfig` :

```typescript
import { themeConfig } from '../config/theme';

// Utilisation
<div style={{ backgroundColor: themeConfig.colors.primary }}>
  Contenu
</div>
```

### Personnalisation Tailwind (optionnel)

Si vous voulez utiliser les couleurs du thème dans Tailwind, ajoutez-les dans `tailwind.config.js` :

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        // ... autres couleurs
      },
    },
  },
}
```

## 📁 Structure des Modules

### Organisation

Chaque module a sa propre structure :

```
src/
├── pages/
│   ├── user/          # Module User (public)
│   ├── employe/       # Module Employé
│   ├── admin/         # Module Admin
│   └── root-admin/    # Module Root Admin
├── components/
│   └── layouts/
│       ├── UserLayout.tsx
│       ├── EmployeLayout.tsx
│       ├── AdminLayout.tsx
│       └── RootAdminLayout.tsx
```

### Ajouter une nouvelle page

1. Créez le fichier dans le dossier du module approprié
2. Utilisez le layout correspondant
3. Ajoutez la route dans `App.tsx`

**Exemple :**

```typescript
// src/pages/employe/ContentPage.tsx
import { EmployeLayout } from '../../components/layouts/EmployeLayout';

export const ContentPage = () => {
  return (
    <EmployeLayout>
      <div>Votre contenu ici</div>
    </EmployeLayout>
  );
};
```

## 🛣️ Ajout de Routes

### 1. Route publique (User)

```typescript
<Route path="/nouvelle-page" element={<NouvellePage />} />
```

### 2. Route protégée par rôle

```typescript
<Route
  path="/employe/nouvelle-page"
  element={
    <ProtectedRoute requiredRole={UserRole.EMPLOYE}>
      <NouvellePage />
    </ProtectedRoute>
  }
/>
```

### 3. Route avec plusieurs rôles

```typescript
<Route
  path="/admin/nouvelle-page"
  element={
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.ROOT_ADMIN]}>
      <NouvellePage />
    </ProtectedRoute>
  }
/>
```

## 🧩 Composants Réutilisables

### Emplacement

Créez vos composants réutilisables dans `src/components/` :

```
src/components/
├── layouts/        # Layouts (déjà créés)
├── ui/            # Composants UI réutilisables (à créer)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Modal.tsx
└── common/        # Composants communs (à créer)
```

### Exemple de composant réutilisable

```typescript
// src/components/ui/Button.tsx
import { themeConfig } from '../../config/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  const color = variant === 'primary' 
    ? themeConfig.colors.primary 
    : themeConfig.colors.secondary;

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-white font-medium"
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
};
```

## 🔐 Gestion des Rôles

### Vérifier un rôle

```typescript
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

const { hasRole, hasAnyRole } = useAuth();

if (hasRole(UserRole.ADMIN)) {
  // Code pour admin uniquement
}

if (hasAnyRole([UserRole.ADMIN, UserRole.ROOT_ADMIN])) {
  // Code pour admin ou root admin
}
```

## 📝 Checklist de Personnalisation

- [ ] Modifier le nom de l'entreprise dans `theme.ts`
- [ ] Remplacer les logos dans `public/`
- [ ] Personnaliser les couleurs dans `theme.ts`
- [ ] Adapter les noms des modules si nécessaire
- [ ] Ajouter vos routes dans `App.tsx`
- [ ] Créer vos pages dans les dossiers modules
- [ ] Personnaliser les layouts si nécessaire
- [ ] Créer vos composants réutilisables

## 🚀 Prochaines Étapes

1. **Personnalisez le thème** : Modifiez `src/config/theme.ts`
2. **Ajoutez vos logos** : Placez-les dans `public/`
3. **Créez vos pages** : Dans les dossiers modules appropriés
4. **Ajoutez vos routes** : Dans `App.tsx`
5. **Personnalisez les layouts** : Si nécessaire

---

**Bon développement ! 🎨**
