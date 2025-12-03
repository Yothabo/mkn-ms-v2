import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import BottomNav from './BottomNav';
import AdminRoutes from '../../../routes/AdminRoutes';
import MemberRoutes from '../../../routes/MemberRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import { usePersistedState } from '../../hooks/usePersistedState';

type AdminView = 'dashboard' | 'members' | 'attendance' | 'duties' | 'analytics';
type MemberView = 'home' | 'announcements' | 'hymns' | 'duties' | 'profile';

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentViewMode, setCurrentViewMode] = usePersistedState<'admin' | 'member'>('admin-view-mode', 'admin');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/').pop() || '';
    if (currentViewMode === 'admin') {
      setCurrentView((path as AdminView) || 'dashboard');
    } else {
      setCurrentView((path as MemberView) || 'home');
    }
  }, [location.pathname, currentViewMode]);

  const handleViewChange = (view: string) => {
    if (view === currentView || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentView(view);
    
    if (currentViewMode === 'admin') {
      navigate(`/admin/${view}`);
    } else {
      navigate(`/member/${view}`);
    }

    setTimeout(() => setIsTransitioning(false), 150);
  };

  const handleViewModeChange = (mode: 'admin' | 'member') => {
    if (mode === currentViewMode || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentViewMode(mode);
    const defaultView = mode === 'admin' ? 'dashboard' : 'home';
    setCurrentView(defaultView);

    if (mode === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/member/home');
    }

    setTimeout(() => setIsTransitioning(false), 150);
  };

  return (
    <div className="admin-layout">
      <AppHeader
        userType="admin"
        currentViewMode={currentViewMode}
        onViewModeChange={handleViewModeChange}
      />

      <main className={`admin-main ${isTransitioning ? 'transitioning' : ''}`}>
        {currentViewMode === 'admin' ? <AdminRoutes /> : <MemberRoutes />}
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={handleViewChange}
        userType={currentViewMode}
      />

      <style>{`
        .admin-layout {
          min-height: 100vh;
          background: var(--color-background);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .admin-main {
          flex: 1;
          padding: 0 0 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          opacity: 1;
          transition: opacity 0.1s ease;
        }

        .admin-main.transitioning {
          opacity: 0.7;
        }

        .admin-main::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 640px) {
          .admin-main {
            padding: 0 0 1rem 0;
          }
        }
      `}</style>
    </div>
  );
}
