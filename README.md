# 🚀 Template Frontend React + TypeScript + Vite

Template de démarrage rapide pour projets React modernes avec toutes les dépendances essentielles préconfigurées.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du projet](#-structure-du-projet)
- [Utilisation](#-utilisation)
- [Scripts disponibles](#-scripts-disponibles)
- [Docker](#-docker)

## ✨ Fonctionnalités

- ⚛️ **React 19** - Dernière version de React
- 🔷 **TypeScript** - Typage statique pour une meilleure maintenabilité
- ⚡ **Vite** - Build tool ultra-rapide
- 🎨 **Tailwind CSS** - Framework CSS utility-first
- 🧭 **React Router** - Navigation et routage
- 🔄 **TanStack Query** - Gestion des données serveur (cache, synchronisation)
- 🌐 **Axios** - Client HTTP pour les appels API
- 🎯 **React Icons** - Bibliothèque d'icônes complète
- 🛡️ **Error Boundary** - Gestion des erreurs React
- 🐳 **Docker** - Configuration Docker prête à l'emploi
- ✅ **ESLint** - Linting du code
- 🧪 **Vitest** - Framework de tests

### 🎯 Architecture Modulaire

- **4 Modules d'authentification** :
  - 👤 Module User (public, avec ou sans login)
  - 👔 Module Employé (gestion du contenu)
  - 🛡️ Module Admin (gestion des employés)
  - ⚙️ Module Root Admin (maintenance et super admin)

- **Système de thème centralisé** : Personnalisation facile (couleurs, logos, etc.)
- **Routes protégées** : Gestion des accès par rôle
- **Layouts modulaires** : Un layout par module, facilement personnalisable

## 🛠️ Stack Technique

### Dépendances principales

- `react` ^19.2.0
- `react-dom` ^19.2.0
- `react-router-dom` ^7.12.0
- `@tanstack/react-query` ^5.90.18
- `axios` ^1.13.2
- `react-icons` ^5.5.0
- `@headlessui/react` ^2.2.9
- `@heroicons/react` ^2.2.0

### Outils de développement

- `vite` ^7.2.4
- `typescript` ~5.9.3
- `tailwindcss` ^3.4.19
- `eslint` ^9.39.1
- `vitest` ^3.2.4

## 🚀 Installation

1. **Cloner ou copier ce template**

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :
   ```env
   # Configuration de l'API
   VITE_API_BASE_URL=http://localhost:3000/api
   
   # Configuration de l'application
   VITE_APP_NAME=KOBE CORPORATION
   VITE_APP_VERSION=1.0.0
   VITE_APP_ENV=development
   ```
   
   > 💡 **Note** : Toutes les variables doivent commencer par `VITE_` pour être accessibles dans le code frontend.

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

L'application sera accessible sur **http://localhost:5190**

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# URL de base de l'API backend
VITE_API_BASE_URL=http://localhost:3000/api

# Nom de l'application (optionnel)
VITE_APP_NAME=Mon Application

# Autres variables selon vos besoins
# VITE_API_KEY=votre_cle_api
```

> ⚠️ **Important** : Toutes les variables d'environnement doivent commencer par `VITE_` pour être accessibles dans le code frontend.

### Port du serveur

Le port par défaut est **5190**. Vous pouvez le modifier dans `vite.config.ts` :

```typescript
server: {
  port: 5190,
  host: true,
}
```

## 📁 Structure du projet

```
tmp-front/
├── public/                 # Fichiers statiques publics (logos, etc.)
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Composants réutilisables
│   │   ├── layouts/       # Layouts pour chaque module
│   │   │   ├── BaseLayout.tsx
│   │   │   ├── UserLayout.tsx
│   │   │   ├── EmployeLayout.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   └── RootAdminLayout.tsx
│   │   └── ErrorBoundary.tsx
│   ├── config/            # Configuration centralisée
│   │   ├── theme.ts       # Configuration du thème (COULEURS, LOGOS)
│   │   └── routes.ts      # Configuration des routes
│   ├── contexts/          # Contextes React
│   │   └── AuthContext.tsx # Gestion de l'authentification
│   ├── guards/            # Protection des routes
│   │   └── ProtectedRoute.tsx
│   ├── hooks/             # Hooks personnalisés
│   │   └── useApi.ts      # Hooks pour les appels API
│   ├── lib/               # Utilitaires et configurations
│   │   ├── api.ts         # Configuration Axios
│   │   └── queryClient.ts # Configuration TanStack Query
│   ├── pages/             # Pages organisées par module
│   │   ├── user/          # Module User (public)
│   │   ├── employe/       # Module Employé
│   │   ├── admin/         # Module Admin
│   │   └── root-admin/    # Module Root Admin
│   ├── types/             # Types TypeScript
│   │   └── auth.ts        # Types pour l'authentification
│   ├── utils/             # Utilitaires
│   │   └── roleUtils.ts   # Utilitaires pour les rôles
│   ├── App.tsx            # Composant racine avec routes
│   ├── main.tsx           # Point d'entrée
│   └── index.css          # Styles globaux + Tailwind
├── setup-front/           # Configuration Docker
│   ├── Dockerfile
│   └── compose.yaml
├── .env                   # Variables d'environnement (à créer)
├── .env.example           # Exemple de variables d'environnement
├── PERSONNALISATION.md    # Guide de personnalisation
├── vite.config.ts         # Configuration Vite
├── tailwind.config.js     # Configuration Tailwind
├── tsconfig.json          # Configuration TypeScript
└── package.json
```

## 💻 Utilisation

### Routes

Les routes sont configurées dans `src/App.tsx` :

```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### Appels API

#### Avec TanStack Query (recommandé)

```typescript
import { useApiQuery, useApiMutation } from './hooks/useApi';

// Requête GET
function MyComponent() {
  const { data, isLoading, error } = useApiQuery(['users'], '/users');
  
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}

// Mutation POST
function CreateUser() {
  const mutation = useApiMutation((userData) => 
    apiClient.post('/users', userData)
  );
  
  const handleSubmit = () => {
    mutation.mutate({ name: 'John', email: 'john@example.com' });
  };
  
  return <button onClick={handleSubmit}>Créer</button>;
}
```

#### Directement avec Axios

```typescript
import apiClient from './lib/api';

// GET
const response = await apiClient.get('/users');

// POST
const response = await apiClient.post('/users', { name: 'John' });
```

### Authentification

Le client Axios est préconfiguré pour gérer l'authentification automatiquement :

- Le token est récupéré depuis `localStorage.getItem('token')`
- Il est ajouté automatiquement dans le header `Authorization: Bearer <token>`
- En cas d'erreur 401, redirection automatique vers `/login`

Pour stocker un token après connexion :

```typescript
localStorage.setItem('token', 'votre_token_ici');
```

### Icônes

Utilisez React Icons :

```typescript
import { FaHome, FaUser } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';

<FaHome />
<FaUser />
<MdSettings />
<HiOutlineMail />
```

Consultez [react-icons](https://react-icons.github.io/react-icons/) pour toutes les icônes disponibles.

### Styles avec Tailwind

Tailwind CSS est configuré et prêt à l'emploi :

```typescript
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Contenu stylisé
</div>
```

## 📜 Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement (port 5190)

# Build
npm run build        # Compile le projet pour la production

# Linting
npm run lint         # Vérifie le code avec ESLint

# Preview
npm run preview      # Prévisualise le build de production
```

## 🐳 Docker

### Build et lancement avec Docker

```bash
cd setup-front
docker-compose up --build
```

L'application sera accessible sur **http://localhost:5190**

### Configuration Docker

- **Port** : 5190
- **Base image** : Node.js 22 Alpine
- **Environnement** : Production par défaut

## 🔧 Personnalisation

### Changer le nom du projet

1. Modifier `name` dans `package.json`
2. Modifier le titre dans `index.html`
3. Mettre à jour les variables d'environnement si nécessaire

### Ajouter de nouvelles dépendances

```bash
npm install <nom-du-package>
```

### Ajouter de nouvelles routes

Éditez `src/App.tsx` et ajoutez vos routes :

```typescript
<Route path="/nouvelle-page" element={<NouvellePage />} />
```

## 📚 Ressources

- [Documentation React](https://react.dev)
- [Documentation Vite](https://vite.dev)
- [Documentation Tailwind CSS](https://tailwindcss.com)
- [Documentation React Router](https://reactrouter.com)
- [Documentation TanStack Query](https://tanstack.com/query)
- [Documentation Axios](https://axios-http.com)

## 📝 Notes

- Ce template utilise React 19, assurez-vous que toutes vos dépendances sont compatibles
- Le port 5190 est configuré pour correspondre à la configuration Docker
- Les variables d'environnement doivent commencer par `VITE_` pour être accessibles
- Un Error Boundary est configuré pour capturer les erreurs React

## 🎯 Prochaines étapes

1. ✅ Configurer les variables d'environnement dans `.env`
2. ✅ Personnaliser les pages dans `src/pages/`
3. ✅ Ajouter vos routes dans `src/App.tsx`
4. ✅ Créer vos composants dans `src/components/`
5. ✅ Configurer votre API backend
6. ✅ Personnaliser les styles Tailwind si nécessaire

---

**Bon développement ! 🚀**
