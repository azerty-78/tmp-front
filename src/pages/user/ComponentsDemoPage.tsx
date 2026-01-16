import { useState } from 'react';
import { UserLayout } from '../../components/layouts/UserLayout';
import {
  Button,
  Card,
  Input,
  Loading,
  Alert,
  Dialog,
  ConfirmDialog,
  AlertDialog,
  ErrorDisplay,
} from '../../components/ui';
import { useToast } from '../../contexts/ToastContext';
import { themeConfig } from '../../config/theme';
import {
  FaSave,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaEnvelope,
  FaLock,
} from 'react-icons/fa';

/**
 * Page de démonstration pour tester tous les composants UI
 */
export const ComponentsDemoPage = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  const handleTestLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleTestFullScreenLoading = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0 && value.length < 3) {
      setInputError('Minimum 3 caractères requis');
    } else {
      setInputError('');
    }
  };

  const handleConfirmAction = () => {
    setShowConfirm(false);
    showSuccess('Action confirmée avec succès !');
  };

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: themeConfig.text.primary }}>
            Démonstration des Composants UI
          </h1>
          <p className="text-xl" style={{ color: themeConfig.text.secondary }}>
            Testez tous les composants réutilisables créés
          </p>
        </div>

        {/* Loading Demo */}
        {loadingDemo && <Loading fullScreen={true} text="Chargement en cours..." />}

        {/* Section Buttons */}
        <Card title="Boutons (Button)" className="mb-8">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: themeConfig.text.primary }}>
                Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="error">Error</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: themeConfig.text.primary }}>
                Tailles
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Petit</Button>
                <Button size="md">Moyen</Button>
                <Button size="lg">Grand</Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: themeConfig.text.primary }}>
                Avec Icônes
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<FaSave />}>Sauvegarder</Button>
                <Button rightIcon={<FaEdit />} variant="secondary">
                  Modifier
                </Button>
                <Button leftIcon={<FaTrash />} variant="error">
                  Supprimer
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: themeConfig.text.primary }}>
                États
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button isLoading={isLoading} onClick={handleTestLoading}>
                  {isLoading ? 'Chargement...' : 'Tester Loading'}
                </Button>
                <Button disabled>Désactivé</Button>
                <Button fullWidth variant="primary">
                  Plein largeur
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Section Inputs */}
        <Card title="Champs de saisie (Input)" className="mb-8">
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="exemple@email.com"
              leftIcon={<FaEnvelope />}
              helperText="Entrez votre adresse email"
              fullWidth
            />

            <Input
              label="Mot de passe"
              type="password"
              placeholder="Votre mot de passe"
              leftIcon={<FaLock />}
              helperText="Minimum 8 caractères"
              fullWidth
            />

            <Input
              label="Champ avec erreur"
              value={inputValue}
              onChange={handleInputChange}
              error={inputError}
              placeholder="Tapez quelque chose..."
              helperText="Testez la validation"
              fullWidth
            />
          </div>
        </Card>

        {/* Section Alerts */}
        <Card title="Alertes (Alert)" className="mb-8">
          <div className="space-y-4">
            <Alert variant="success" title="Succès">
              Cette opération a été réalisée avec succès.
            </Alert>
            <Alert variant="info" title="Information">
              Ceci est une information importante pour l'utilisateur.
            </Alert>
            <Alert variant="warning" title="Avertissement">
              Attention, cette action peut avoir des conséquences.
            </Alert>
            <Alert variant="error" title="Erreur" onClose={() => {}}>
              Une erreur s'est produite lors de l'opération.
            </Alert>
          </div>
        </Card>

        {/* Section ErrorDisplay */}
        <Card title="Affichage d'erreurs (ErrorDisplay)" className="mb-8">
          <div className="space-y-4">
            <p style={{ color: themeConfig.text.secondary }}>
              Composant pour afficher les erreurs de manière élégante avec possibilité de retry
            </p>
            <div className="space-y-4">
              <ErrorDisplay
                error="Erreur réseau détectée"
                title="Erreur de connexion"
                onRetry={() => showInfo('Tentative de reconnexion...')}
                retryText="Réessayer"
              />
              <ErrorDisplay
                error={new Error('Erreur serveur 500')}
                title="Erreur serveur"
                showDetails={true}
                onRetry={() => showWarning('Nouvelle tentative...')}
              />
              <ErrorDisplay
                error="Erreur simple sans retry"
                variant="warning"
              />
            </div>
          </div>
        </Card>

        {/* Section Loading */}
        <Card title="Indicateurs de chargement (Loading)" className="mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3" style={{ color: themeConfig.text.primary }}>
                Tailles
              </h3>
              <div className="flex items-center gap-6">
                <Loading size="sm" />
                <Loading size="md" />
                <Loading size="lg" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3" style={{ color: themeConfig.text.primary }}>
                Avec texte
              </h3>
              <Loading text="Chargement des données..." />
            </div>

            <div>
              <h3 className="font-semibold mb-3" style={{ color: themeConfig.text.primary }}>
                Plein écran
              </h3>
              <Button onClick={handleTestFullScreenLoading} variant="primary">
                Tester Loading Plein Écran
              </Button>
            </div>
          </div>
        </Card>

        {/* Section Toast/Notifications */}
        <Card title="Notifications Toast" className="mb-8">
          <div className="space-y-4">
            <p style={{ color: themeConfig.text.secondary }}>
              Cliquez sur les boutons ci-dessous pour voir les notifications toast en action
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="success" onClick={() => showSuccess('Opération réussie !')}>
                Toast Succès
              </Button>
              <Button variant="primary" onClick={() => showInfo('Information importante')}>
                Toast Info
              </Button>
              <Button variant="warning" onClick={() => showWarning('Attention requise')}>
                Toast Warning
              </Button>
              <Button variant="error" onClick={() => showError('Une erreur est survenue')}>
                Toast Error
              </Button>
            </div>
          </div>
        </Card>

        {/* Section Dialogs */}
        <Card title="Boîtes de dialogue (Dialog)" className="mb-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setShowDialog(true)}>
                Ouvrir Dialog
              </Button>
              <Button variant="error" onClick={() => setShowConfirm(true)}>
                Ouvrir Confirm Dialog
              </Button>
              <Button variant="warning" onClick={() => setShowAlert(true)}>
                Ouvrir Alert Dialog
              </Button>
            </div>
          </div>
        </Card>

        {/* Section Cards */}
        <Card title="Cartes (Card)" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Carte Simple" padding="md">
              <p style={{ color: themeConfig.text.secondary }}>
                Contenu de la carte avec padding moyen
              </p>
            </Card>

            <Card
              title="Carte avec Hover"
              subtitle="Passez la souris"
              hover
              padding="md"
            >
              <p style={{ color: themeConfig.text.secondary }}>
                Cette carte a un effet hover
              </p>
            </Card>

            <Card
              title="Carte avec Footer"
              padding="md"
              footer={
                <Button size="sm" variant="primary">
                  Action
                </Button>
              }
            >
              <p style={{ color: themeConfig.text.secondary }}>
                Carte avec un footer personnalisé
              </p>
            </Card>
          </div>
        </Card>

        {/* Dialogs */}
        <Dialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          title="Dialog de démonstration"
          size="md"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowDialog(false);
                  showSuccess('Action confirmée dans le dialog !');
                }}
              >
                Confirmer
              </Button>
            </>
          }
        >
          <p style={{ color: themeConfig.text.primary }}>
            Ceci est un exemple de dialog générique. Vous pouvez y mettre n'importe quel contenu.
          </p>
        </Dialog>

        <ConfirmDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmAction}
          title="Confirmer l'action"
          message="Êtes-vous sûr de vouloir effectuer cette action ? Cette opération est irréversible."
          variant="danger"
          confirmText="Confirmer"
          cancelText="Annuler"
        />

        <AlertDialog
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          title="Information"
          message="Ceci est un exemple de dialog d'alerte. Utilisez-le pour afficher des messages importants à l'utilisateur."
          variant="info"
          buttonText="Compris"
        />
      </div>
    </UserLayout>
  );
};
