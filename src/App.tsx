import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { UserRole } from './types/auth';

// Pages User (public)
import { HomePage } from './pages/user/HomePage';
import { LoginPage } from './pages/user/LoginPage';
import { UserDashboardPage } from './pages/user/DashboardPage';
import { ProfilePage } from './pages/user/ProfilePage';

// Pages Employé
import { EmployeDashboardPage } from './pages/employe/DashboardPage';

// Pages Admin
import { AdminDashboardPage } from './pages/admin/DashboardPage';

// Pages Root Admin
import { RootAdminDashboardPage } from './pages/root-admin/DashboardPage';

// Pages communes
import { UnauthorizedPage } from './pages/UnauthorizedPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

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

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
