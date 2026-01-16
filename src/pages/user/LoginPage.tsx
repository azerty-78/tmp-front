import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { themeConfig } from '../../config/theme';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

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
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: themeConfig.colors.primary + '40',
                  focusRingColor: themeConfig.colors.primary,
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
            style={{ backgroundColor: themeConfig.colors.primary }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};
