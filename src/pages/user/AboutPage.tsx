import { UserLayout } from '../../components/layouts/UserLayout';
import { Card, Button, Alert } from '../../components/ui';
import { themeConfig } from '../../config/theme';
import { useState } from 'react';
import { ConfirmDialog, AlertDialog } from '../../components/ui';
import { useToast } from '../../contexts/ToastContext';
import { FaInfoCircle, FaRocket, FaCode } from 'react-icons/fa';

export const AboutPage = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { showSuccess, showInfo, showWarning, showError } = useToast();

  const handleTestToast = (type: 'success' | 'info' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        showSuccess('Notification de succès !');
        break;
      case 'info':
        showInfo('Notification d\'information');
        break;
      case 'warning':
        showWarning('Notification d\'avertissement');
        break;
      case 'error':
        showError('Notification d\'erreur');
        break;
    }
  };

  const handleConfirmAction = () => {
    setShowConfirm(false);
    showSuccess('Action confirmée !');
  };

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: themeConfig.text.primary }}>
            À propos de {themeConfig.company.name}
          </h1>
          <p className="text-xl" style={{ color: themeConfig.text.secondary }}>
            Découvrez notre plateforme et ses fonctionnalités
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card
            title="Notre Mission"
            subtitle="Ce que nous faisons"
            hover
          >
            <p style={{ color: themeConfig.text.secondary }}>
              Fournir une plateforme moderne et efficace pour la gestion de vos besoins.
            </p>
          </Card>

          <Card
            title="Technologies"
            subtitle="Stack technique"
            hover
          >
            <div className="flex items-center gap-2 mb-2">
              <FaCode style={{ color: themeConfig.colors.primary }} />
              <span style={{ color: themeConfig.text.secondary }}>
                React, TypeScript, Tailwind CSS
              </span>
            </div>
          </Card>
        </div>

        {/* Exemples de composants UI */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
            Exemples de composants UI
          </h2>

          <Card title="Notifications Toast" padding="md">
            <div className="flex flex-wrap gap-3">
              <Button variant="success" onClick={() => handleTestToast('success')}>
                Toast Succès
              </Button>
              <Button variant="primary" onClick={() => handleTestToast('info')}>
                Toast Info
              </Button>
              <Button variant="warning" onClick={() => handleTestToast('warning')}>
                Toast Warning
              </Button>
              <Button variant="error" onClick={() => handleTestToast('error')}>
                Toast Error
              </Button>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <Card title="Dialogs" padding="md">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setShowAlert(true)}>
                Ouvrir Alert Dialog
              </Button>
              <Button variant="error" onClick={() => setShowConfirm(true)}>
                Ouvrir Confirm Dialog
              </Button>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4" style={{ color: themeConfig.text.primary }}>
            Exemples d'Alertes
          </h3>
          <div className="space-y-4">
            <Alert variant="success" title="Succès">
              Cette opération a été réalisée avec succès.
            </Alert>
            <Alert variant="info" title="Information">
              Ceci est une information importante.
            </Alert>
            <Alert variant="warning" title="Avertissement">
              Attention, cette action est irréversible.
            </Alert>
            <Alert variant="error" title="Erreur">
              Une erreur s'est produite lors de l'opération.
            </Alert>
          </div>
        </div>

        {/* Dialogs */}
        <AlertDialog
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          title="Information"
          message="Ceci est un exemple de dialog d'alerte. Vous pouvez l'utiliser pour afficher des messages importants."
          variant="info"
        />

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
      </div>
    </UserLayout>
  );
};
