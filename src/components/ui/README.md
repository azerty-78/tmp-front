# Composants UI Réutilisables

Cette bibliothèque de composants UI est conçue pour être facilement personnalisable via le thème.

## Composants disponibles

### Button
Bouton réutilisable avec variants et tailles.

```typescript
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Cliquer</Button>
<Button variant="error" isLoading={true}>Supprimer</Button>
<Button variant="outline" leftIcon={<FaIcon />}>Avec icône</Button>
```

**Variants** : `primary`, `secondary`, `success`, `warning`, `error`, `outline`
**Tailles** : `sm`, `md`, `lg`

### Card
Carte pour afficher du contenu structuré.

```typescript
import { Card } from '@/components/ui';

<Card title="Titre" subtitle="Sous-titre" footer={<Button>Action</Button>}>
  Contenu de la carte
</Card>
```

### Input
Champ de saisie avec label, erreur et icônes.

```typescript
import { Input } from '@/components/ui';

<Input
  label="Email"
  type="email"
  leftIcon={<FaEnvelope />}
  error="Email invalide"
  helperText="Entrez votre adresse email"
/>
```

### Loading
Indicateur de chargement.

```typescript
import { Loading } from '@/components/ui';

<Loading size="md" text="Chargement..." />
<Loading fullScreen={true} text="Chargement de la page..." />
```

### Alert
Message d'alerte avec variants.

```typescript
import { Alert } from '@/components/ui';

<Alert variant="success" title="Succès">Opération réussie</Alert>
<Alert variant="error" onClose={() => {}}>Une erreur est survenue</Alert>
```

**Variants** : `info`, `success`, `warning`, `error`

### Toast (Notifications)
Système de notifications toast.

```typescript
import { useToast } from '@/contexts/ToastContext';

const { showSuccess, showError, showWarning, showInfo } = useToast();

showSuccess('Opération réussie !');
showError('Une erreur est survenue');
showWarning('Attention !');
showInfo('Information importante');
```

### Dialog
Modal/Dialog réutilisable.

```typescript
import { Dialog } from '@/components/ui';

<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Titre du dialog"
  size="md"
  footer={<Button onClick={handleConfirm}>Confirmer</Button>}
>
  Contenu du dialog
</Dialog>
```

### ConfirmDialog
Dialog de confirmation.

```typescript
import { ConfirmDialog } from '@/components/ui';

<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="Confirmer la suppression"
  message="Êtes-vous sûr de vouloir supprimer cet élément ?"
  variant="danger"
  confirmText="Supprimer"
  cancelText="Annuler"
/>
```

### AlertDialog
Dialog d'alerte.

```typescript
import { AlertDialog } from '@/components/ui';

<AlertDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Information"
  message="Ceci est un message d'information"
  variant="info"
/>
```

## Personnalisation

Tous les composants utilisent `themeConfig` pour les couleurs et styles. Modifiez `src/config/theme.ts` pour personnaliser l'apparence.
