# 📚 Guide d'Utilisation des Composants UI

Ce guide explique comment utiliser tous les composants UI réutilisables créés.

## 🎨 Composants de Base

### Button

```typescript
import { Button } from '@/components/ui';
import { FaSave } from 'react-icons/fa';

// Variants disponibles
<Button variant="primary">Bouton principal</Button>
<Button variant="secondary">Bouton secondaire</Button>
<Button variant="success">Succès</Button>
<Button variant="warning">Avertissement</Button>
<Button variant="error">Erreur</Button>
<Button variant="outline">Outline</Button>

// Avec icônes
<Button leftIcon={<FaSave />}>Sauvegarder</Button>
<Button rightIcon={<FaSave />}>Sauvegarder</Button>

// Tailles
<Button size="sm">Petit</Button>
<Button size="md">Moyen</Button>
<Button size="lg">Grand</Button>

// États
<Button isLoading={true}>Chargement...</Button>
<Button disabled>Désactivé</Button>
<Button fullWidth>Plein largeur</Button>
```

### Card

```typescript
import { Card } from '@/components/ui';

<Card title="Titre" subtitle="Sous-titre">
  Contenu de la carte
</Card>

<Card
  title="Titre"
  footer={<Button>Sauvegarder</Button>}
  hover
  padding="lg"
>
  Contenu avec footer et effet hover
</Card>
```

### Input

```typescript
import { Input } from '@/components/ui';
import { FaEnvelope } from 'react-icons/fa';

<Input
  label="Email"
  type="email"
  placeholder="exemple@email.com"
  leftIcon={<FaEnvelope />}
  required
/>

<Input
  label="Mot de passe"
  type="password"
  error="Le mot de passe est requis"
  helperText="Minimum 8 caractères"
  fullWidth
/>
```

### Loading

```typescript
import { Loading } from '@/components/ui';

// Spinner simple
<Loading />

// Avec texte
<Loading text="Chargement des données..." />

// Tailles
<Loading size="sm" />
<Loading size="md" />
<Loading size="lg" />

// Plein écran
<Loading fullScreen={true} text="Chargement de la page..." />
```

### Alert

```typescript
import { Alert } from '@/components/ui';

<Alert variant="success" title="Succès">
  Opération réussie !
</Alert>

<Alert variant="error" onClose={() => {}}>
  Une erreur est survenue
</Alert>

<Alert variant="warning" title="Attention">
  Cette action est irréversible
</Alert>

<Alert variant="info">
  Information importante
</Alert>
```

---

## 🔔 Système de Notifications (Toast)

### Utilisation basique

```typescript
import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleAction = () => {
    // Après une action réussie
    showSuccess('Opération réussie !');
    
    // En cas d'erreur
    showError('Une erreur est survenue');
    
    // Pour un avertissement
    showWarning('Attention à cette action');
    
    // Pour une information
    showInfo('Nouvelle information disponible');
  };

  return <button onClick={handleAction}>Action</button>;
}
```

### Personnalisation de la durée

```typescript
const { showToast } = useToast();

// Toast qui reste 10 secondes
showToast('Message important', 'info', 10000);

// Toast qui ne disparaît pas automatiquement
showToast('Message permanent', 'error', 0);
```

---

## 💬 Boîtes de Dialogue

### Dialog (Modal générique)

```typescript
import { Dialog } from '@/components/ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ouvrir Dialog</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Titre du Dialog"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirmer
            </Button>
          </>
        }
      >
        <p>Contenu du dialog</p>
      </Dialog>
    </>
  );
}
```

### ConfirmDialog (Confirmation)

```typescript
import { ConfirmDialog } from '@/components/ui';
import { useState } from 'react';

function DeleteButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    // Action de suppression
    deleteItem();
    setIsOpen(false);
    showSuccess('Élément supprimé');
  };

  return (
    <>
      <Button variant="error" onClick={() => setIsOpen(true)}>
        Supprimer
      </Button>
      
      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
        variant="danger"
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </>
  );
}
```

### AlertDialog (Alerte)

```typescript
import { AlertDialog } from '@/components/ui';
import { useState } from 'react';

function InfoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Afficher Info</Button>
      
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Information"
        message="Ceci est un message d'information important."
        variant="info"
        buttonText="Compris"
      />
    </>
  );
}
```

---

## 🔄 Hooks pour la Gestion d'État

### useUsers

```typescript
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks';

function UsersList() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <Loading />;
  if (error) return <Alert variant="error">Erreur de chargement</Alert>;

  return (
    <div>
      {users?.map(user => (
        <Card key={user.id}>
          {user.name}
        </Card>
      ))}
    </div>
  );
}
```

### useEmployees

```typescript
import { useEmployees } from '@/hooks';

function EmployeesList() {
  const { data: employees, isLoading } = useEmployees();
  
  // Utilisation similaire à useUsers
}
```

### useAdmins

```typescript
import { useAdmins } from '@/hooks';

function AdminsList() {
  const { data: admins, isLoading } = useAdmins();
  
  // Utilisation similaire à useUsers
}
```

---

## 📄 Page 404

La page 404 est automatiquement affichée pour les routes inconnues. Vous pouvez aussi y rediriger manuellement :

```typescript
import { Navigate } from 'react-router-dom';

<Route path="*" element={<NotFoundPage />} />
```

---

## 🎯 Exemples d'Intégration

### Formulaire avec validation et notifications

```typescript
import { useState } from 'react';
import { Input, Button, Alert } from '@/components/ui';
import { useToast } from '@/contexts/ToastContext';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email requis');
      showError('Veuillez remplir tous les champs');
      return;
    }

    try {
      // Envoyer le formulaire
      await submitForm({ email });
      showSuccess('Formulaire envoyé avec succès !');
      setEmail('');
    } catch (err) {
      showError('Erreur lors de l\'envoi');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        required
      />
      <Button type="submit">Envoyer</Button>
    </form>
  );
}
```

### Liste avec actions et confirmations

```typescript
import { useState } from 'react';
import { Card, Button, ConfirmDialog } from '@/components/ui';
import { useUsers, useDeleteUser } from '@/hooks';
import { useToast } from '@/contexts/ToastContext';

function UsersList() {
  const { data: users } = useUsers();
  const deleteUser = useDeleteUser();
  const { showSuccess } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteUser.mutateAsync(deleteId);
      showSuccess('Utilisateur supprimé');
      setDeleteId(null);
    } catch (error) {
      showError('Erreur lors de la suppression');
    }
  };

  return (
    <>
      {users?.map(user => (
        <Card key={user.id} title={user.name}>
          <Button
            variant="error"
            onClick={() => setDeleteId(user.id)}
          >
            Supprimer
          </Button>
        </Card>
      ))}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
        variant="danger"
      />
    </>
  );
}
```

---

## 🎨 Personnalisation

Tous les composants utilisent `themeConfig` pour les couleurs. Modifiez `src/config/theme.ts` pour personnaliser l'apparence globale.

---

**Tous les composants sont prêts à l'emploi et entièrement typés avec TypeScript ! 🚀**
