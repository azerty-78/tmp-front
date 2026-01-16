import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { themeConfig } from '../../config/theme';
import { UserRole } from '../../types/auth';
import { getDefaultRoute } from '../../utils/roleUtils';
import { FaEnvelope, FaLock, FaUser, FaBriefcase, FaShieldAlt, FaCog } from 'react-icons/fa';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Vérifier qu'un rôle est sélectionné
    if (!selectedRole) {
      setError('Veuillez sélectionner un rôle');
      return;
    }

    setIsLoading(true);

    try {
      // Mode test : connexion avec n'importe quelles valeurs
      await login({ email, password, role: selectedRole });
      
      // Rediriger vers la route par défaut du rôle
      const defaultRoute = getDefaultRoute(selectedRole);
      navigate(defaultRoute, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
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
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeConfig.text.primary }}>
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: themeConfig.colors.primary + '40',
                  focusRingColor: themeConfig.colors.primary,
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeConfig.text.primary }}>
              Mot de passe
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="N'importe quelle valeur (mode test)"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: themeConfig.colors.primary + '40',
                  focusRingColor: themeConfig.colors.primary,
                }}
              />
            </div>
          </div>

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

          <button
            type="submit"
            disabled={isLoading || !selectedRole}
            className="w-full py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: themeConfig.colors.primary }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};
