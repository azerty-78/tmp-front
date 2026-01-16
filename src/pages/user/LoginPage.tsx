import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { themeConfig } from '../../config/theme';
import { UserRole } from '../../types/auth';
import { getDefaultRoute } from '../../utils/roleUtils';
import { FaEnvelope, FaLock, FaUser, FaBriefcase, FaShieldAlt, FaCog } from 'react-icons/fa';
import { Input, Button, Alert } from '../../components/ui';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Vérifier qu'un rôle est sélectionné
    if (!selectedRole) {
      setError('Veuillez sélectionner un rôle');
      showError('Veuillez sélectionner un rôle pour continuer');
      return;
    }

    setIsLoading(true);

    try {
      // Mode test : connexion avec n'importe quelles valeurs
      await login({ email, password, role: selectedRole });
      
      showSuccess(`Connexion réussie en tant que ${selectedRole}`);
      
      // Rediriger vers la route par défaut du rôle
      const defaultRoute = getDefaultRoute(selectedRole);
      navigate(defaultRoute, { replace: true });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erreur de connexion';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      value: UserRole.USER,
      label: 'Utilisateur',
      icon: FaUser,
      color: themeConfig.modules.user.color,
    },
    {
      value: UserRole.EMPLOYE,
      label: 'Employé',
      icon: FaBriefcase,
      color: themeConfig.modules.employe.color,
    },
    {
      value: UserRole.ADMIN,
      label: 'Administrateur',
      icon: FaShieldAlt,
      color: themeConfig.modules.admin.color,
    },
    {
      value: UserRole.ROOT_ADMIN,
      label: 'Super Admin',
      icon: FaCog,
      color: themeConfig.modules.rootAdmin.color,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeConfig.backgrounds.default }}>
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl" style={{ backgroundColor: themeConfig.backgrounds.paper }}>
        <div className="text-center mb-8">
          {themeConfig.company.logo && (
            <img
              src={themeConfig.company.logo}
              alt={themeConfig.company.name}
              className="h-16 mx-auto mb-4"
            />
          )}
          <h2 className="text-2xl font-bold" style={{ color: themeConfig.text.primary }}>
            Connexion
          </h2>
          <p style={{ color: themeConfig.text.secondary }}>Accédez à votre compte</p>
        </div>

        {error && (
          <Alert variant="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<FaEnvelope />}
            fullWidth
            helperText="Entrez votre adresse email"
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="N'importe quelle valeur (mode test)"
            leftIcon={<FaLock />}
            fullWidth
            helperText="En mode test, n'importe quelle valeur fonctionne"
          />

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: themeConfig.text.primary }}>
              Sélectionnez un rôle (Mode Test)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      isSelected ? 'ring-2 ring-offset-2' : 'border-gray-200'
                    }`}
                    style={{
                      borderColor: isSelected ? role.color : undefined,
                      backgroundColor: isSelected ? role.color + '10' : themeConfig.backgrounds.paper,
                      ringColor: isSelected ? role.color : undefined,
                    }}
                  >
                    <Icon
                      className={`text-lg ${isSelected ? 'text-white' : ''}`}
                      style={isSelected ? { color: role.color } : undefined}
                    />
                    <span
                      className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}
                      style={isSelected ? { color: role.color } : undefined}
                    >
                      {role.label}
                    </span>
                    {isSelected && (
                      <div
                        className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: role.color }}
                      >
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <strong>Mode Test :</strong> Entrez n'importe quelles valeurs et sélectionnez un rôle pour tester les différentes interfaces.
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={!selectedRole}
            leftIcon={!isLoading && <FaEnvelope />}
          >
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};
