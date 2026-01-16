import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { UserRole } from './types/auth';

// Pages User (public)
import { HomePage } from './pages/user/HomePage';
import { LoginPage } from './pages/user/LoginPage';
import { UserDashboardPage } from './pages/user/DashboardPage';
import { ProfilePage } from './pages/user/ProfilePage';
import { AboutPage } from './pages/user/AboutPage';

// Pages Employé
import { EmployeDashboardPage } from './pages/employe/DashboardPage';

// Pages Admin
import { AdminDashboardPage } from './pages/admin/DashboardPage';

// Pages Root Admin
import { RootAdminDashboardPage } from './pages/root-admin/DashboardPage';

// Pages communes
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Composants UI
import { ToastContainer } from './components/ui/ToastContainer';
import { useToast } from './contexts/ToastContext';

import './App.css';

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Routes User (authentification optionnelle) */}
        <Route path="/user/dashboard" element={<UserDashboardPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />

        {/* Routes Employé */}
        <Route
          path="/employe/dashboard"
          element={
            <ProtectedRoute requiredRole={UserRole.EMPLOYE}>
              <EmployeDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Routes Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Routes Root Admin */}
        <Route
          path="/root-admin/dashboard"
          element={
            <ProtectedRoute requiredRole={UserRole.ROOT_ADMIN}>
              <RootAdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Page non autorisée */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Page 404 */}
        <Route path="/404" element={<NotFoundPage />} />

        {/* Redirection par défaut pour les routes inconnues */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Container pour les notifications Toast */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </BrowserRouter>
  );
}

export default App;
