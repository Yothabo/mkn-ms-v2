import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';
import Landing from '../pages/public/Landing';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import MemberLayout from '../shared/components/layout/MemberLayout';
import AdminLayout from '../shared/components/layout/AdminLayout';

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  console.log('AppRoutes rendering', { user: user?.name, isAdmin: user?.isAdmin, isAuthenticated });

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // For authenticated users
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes - Only accessible to admin users */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* Member Routes - Accessible to both members AND admins */}
        <Route
          path="/member/*"
          element={
            <ProtectedRoute requiredRole="any">
              {user?.isAdmin ? <AdminLayout /> : <MemberLayout />}
            </ProtectedRoute>
          }
        />

        {/* Default redirect based on role */}
        <Route
          path="/"
          element={<Navigate to={user?.isAdmin ? '/admin/dashboard' : '/member/home'} replace />}
        />
        
        {/* Catch all - redirect to appropriate default */}
        <Route
          path="*"
          element={<Navigate to={user?.isAdmin ? '/admin/dashboard' : '/member/home'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
