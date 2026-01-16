# Structure du projet

## Organisation des dossiers

```
src/
├── api/              # Services API (à créer selon vos besoins)
├── components/       # Composants réutilisables (à créer)
├── hooks/           # Hooks personnalisés
│   └── useApi.ts    # Hooks pour les appels API avec TanStack Query
├── lib/             # Utilitaires et configurations
│   ├── api.ts       # Configuration Axios
│   └── queryClient.ts # Configuration TanStack Query
├── pages/           # Pages de l'application
│   ├── Home.tsx     # Page d'accueil
│   └── About.tsx    # Page à propos
├── App.tsx          # Composant principal avec routes
└── main.tsx         # Point d'entrée avec providers
```

## Utilisation

### Routes
Les routes sont configurées dans `App.tsx` avec React Router :
- `/` - Page d'accueil
- `/about` - Page à propos

### Appels API

#### Avec le hook personnalisé
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

// PUT
const response = await apiClient.put('/users/1', { name: 'Jane' });

// DELETE
const response = await apiClient.delete('/users/1');
```

### Icônes
Utilisez React Icons :
```typescript
import { FaHome, FaUser } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

<FaHome />
<FaUser />
<MdSettings />
```

### Variables d'environnement
Créez un fichier `.env` à la racine :
```
VITE_API_BASE_URL=http://localhost:3000/api
```
