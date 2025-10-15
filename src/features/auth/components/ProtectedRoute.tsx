import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AuthContext';

interface ProtectedRouteProps {
  requiredRole: 'admin' | 'member' | 'any';
  children: React.ReactNode;
}

export default function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  console.log('ProtectedRoute rendering', {
    user: user?.name,
    role: user?.isAdmin ? 'admin' : 'member',
    isAuthenticated,
    requiredRole,
  });

  if (!isAuthenticated) {
    console.log('Redirecting to /: Not authenticated');
    return <Navigate to="/" replace />;
  }

  // For 'any' role, allow both admin and member users
  if (requiredRole === 'any') {
    return <>{children}</>;
  }

  // Check if user has the required role
  const hasRequiredRole = requiredRole === 'admin' ? user?.isAdmin : !user?.isAdmin;

  if (!hasRequiredRole) {
    console.log('Redirecting to default route: Role mismatch', {
      requiredRole,
      userRole: user?.isAdmin ? 'admin' : 'member'
    });
    
    // Redirect to appropriate default route based on actual role
    const redirectPath = user?.isAdmin ? '/admin/dashboard' : '/member/home';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
