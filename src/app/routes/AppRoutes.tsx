import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import Landing from '../../pages/public/Landing';
import ProtectedRoute from '../../features/auth/components/ProtectedRoute/ProtectedRoute';
import MemberLayout from '../../shared/layout/MemberLayout/MemberLayout';
import AdminLayout from '../../shared/layout/AdminLayout/AdminLayout';
import FounderLayout from '../../shared/layout/FounderLayout/FounderLayout';
import TechLayout from '../../shared/layout/TechLayout/TechLayout';

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

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
        {/* Founder Routes */}
        <Route
          path="/founder/*"
          element={
            <ProtectedRoute requiredRole="founder">
              <FounderLayout />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              {user?.role === 'founder' ? <FounderLayout /> : <AdminLayout />}
            </ProtectedRoute>
          }
        />

        {/* Tech Routes */}
        <Route
          path="/tech/*"
          element={
            <ProtectedRoute requiredRole="tech">
              <TechLayout />
            </ProtectedRoute>
          }
        />

        {/* Member Routes - FIXED: Use appropriate layout based on user role */}
        <Route
          path="/member/*"
          element={
            <ProtectedRoute requiredRole="any">
              {user?.role === 'founder' ? <FounderLayout /> :
               user?.role === 'admin' ? <AdminLayout /> :
               user?.role === 'tech' ? <TechLayout /> : <MemberLayout />}
            </ProtectedRoute>
          }
        />

        {/* Default redirect based on role - ONLY for root path */}
        <Route
          path="/"
          element={
            <Navigate to={
              user?.role === 'founder' ? '/founder/founder-dashboard' :
              user?.role === 'admin' ? '/admin/dashboard' :
              user?.role === 'tech' ? '/tech/dashboard' : '/member/home'
            } replace />
          }
        />

        {/* Remove global catch-all to prevent conflicts */}
      </Routes>
    </BrowserRouter>
  );
}
