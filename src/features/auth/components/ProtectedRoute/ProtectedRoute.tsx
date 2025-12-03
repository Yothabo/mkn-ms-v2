import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../../shared/context/AuthContext';

interface ProtectedRouteProps {
  requiredRole: 'founder' | 'admin' | 'member' | 'tech' | 'any';
  children: React.ReactNode;
}

export default function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // For 'any' role, allow all authenticated users
  if (requiredRole === 'any') {
    return <>{children}</>;
  }

  // Check if user has the required role
  const hasRequiredRole = () => {
    if (requiredRole === 'founder') {
      return user?.role === 'founder';
    }
    if (requiredRole === 'admin') {
      return user?.role === 'founder' || user?.role === 'admin';
    }
    if (requiredRole === 'tech') {
      return user?.role === 'founder' || user?.role === 'tech';
    }
    if (requiredRole === 'member') {
      return user?.role === 'founder' || user?.role === 'admin' || user?.role === 'tech' || user?.role === 'member';
    }
    return false;
  };

  if (!hasRequiredRole()) {
    // Redirect to appropriate default route based on actual role
    const redirectPath = 
      user?.role === 'founder' ? '/founder/founder-dashboard' :
      user?.role === 'admin' ? '/admin/dashboard' :
      user?.role === 'tech' ? '/tech/dashboard' : '/member/home';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
