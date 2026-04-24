import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProjectsManagerPage from './pages/admin/ProjectsManagerPage';
import CertificatesManagerPage from './pages/admin/CertificatesManagerPage';
import MessagesPage from './pages/admin/MessagesPage';
import SettingsPage from './pages/admin/SettingsPage';

import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-dark-900 text-white relative">
          <div className="noise" />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #262626',
              },
              success: { iconTheme: { primary: '#3B82F6', secondary: '#fff' } },
              error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
            }}
          />

          <Routes>
            {/* Public site */}
            <Route path="/" element={<HomePage />} />

            {/* Admin login */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Protected admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <DashboardPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ProjectsManagerPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/certificates"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <CertificatesManagerPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <MessagesPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SettingsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* 404 fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}
