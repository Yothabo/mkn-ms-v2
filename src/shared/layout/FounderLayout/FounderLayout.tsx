import { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import BottomNav from '../BottomNav/BottomNav';
import AdminRoutes from '../../../app/routes/AdminRoutes';
import MemberRoutes from '../../../app/routes/MemberRoutes';
import FounderRoutes from '../../../app/routes/FounderRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import styles from './FounderLayout.module.css';

type FounderView = 'founder-dashboard' | 'system-settings' | 'user-management' | 'analytics';
type AdminView = 'dashboard' | 'members' | 'attendance' | 'duties' | 'analytics';
type MemberView = 'home' | 'announcements' | 'hymns' | 'duties' | 'profile';

export default function FounderLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Manual persistence for current view mode
  const [currentViewMode, setCurrentViewMode] = useState<'founder' | 'admin' | 'member'>(() => {
    try {
      const saved = localStorage.getItem('mkn-founder-view-mode');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {}
    return 'founder';
  });

  // Manual persistence for founder views
  const [founderView, setFounderView] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('mkn-founder-current-view');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {}
    return 'founder-dashboard';
  });

  // Manual persistence for admin views
  const [adminView, setAdminView] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('mkn-founder-admin-current-view');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {}
    return 'dashboard';
  });

  // Manual persistence for member views
  const [memberView, setMemberView] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('mkn-founder-member-current-view');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {}
    return 'home';
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('mkn-founder-view-mode', JSON.stringify(currentViewMode));
  }, [currentViewMode]);

  useEffect(() => {
    localStorage.setItem('mkn-founder-current-view', JSON.stringify(founderView));
  }, [founderView]);

  useEffect(() => {
    localStorage.setItem('mkn-founder-admin-current-view', JSON.stringify(adminView));
  }, [adminView]);

  useEffect(() => {
    localStorage.setItem('mkn-founder-member-current-view', JSON.stringify(memberView));
  }, [memberView]);

  // Determine current view based on mode
  const currentView = currentViewMode === 'founder' ? founderView :
                     currentViewMode === 'admin' ? adminView : memberView;

  // SIMPLE PATTERN: Only handle basic redirects, let React Router do the rest
  useEffect(() => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const currentRole = pathSegments[0]; // /founder, /admin, /member

    // Only redirect if we're on a completely wrong route
    if (currentViewMode === 'founder' && currentRole !== 'founder') {
      navigate(`/founder/${currentView}`, { replace: true });
    } else if (currentViewMode === 'admin' && currentRole !== 'admin') {
      navigate(`/admin/${currentView}`, { replace: true });
    } else if (currentViewMode === 'member' && currentRole !== 'member') {
      navigate(`/member/${currentView}`, { replace: true });
    }
    // If we're on the correct route, let React Router handle the page rendering
  }, [location.pathname, currentViewMode, currentView, navigate]);

  // Update current view when URL changes to a valid view
  useEffect(() => {
    const path = location.pathname.split('/').pop() || '';

    if (path) {
      if (currentViewMode === 'founder') {
        const validFounderViews: FounderView[] = ['founder-dashboard', 'system-settings', 'user-management', 'analytics'];
        if (validFounderViews.includes(path as FounderView) && path !== founderView) {
          setFounderView(path);
        }
      } else if (currentViewMode === 'admin') {
        const validAdminViews: AdminView[] = ['dashboard', 'members', 'attendance', 'duties', 'analytics'];
        if (validAdminViews.includes(path as AdminView) && path !== adminView) {
          setAdminView(path);
        }
      } else {
        const validMemberViews: MemberView[] = ['home', 'announcements', 'hymns', 'duties', 'profile'];
        if (validMemberViews.includes(path as MemberView) && path !== memberView) {
          setMemberView(path);
        }
      }
    }
  }, [location.pathname, currentViewMode, founderView, adminView, memberView]);

  const handleViewChange = (view: string) => {
    // Update the appropriate view state
    if (currentViewMode === 'founder') {
      setFounderView(view);
    } else if (currentViewMode === 'admin') {
      setAdminView(view);
    } else {
      setMemberView(view);
    }

    // Navigate immediately
    if (currentViewMode === 'founder') {
      navigate(`/founder/${view}`);
    } else if (currentViewMode === 'admin') {
      navigate(`/admin/${view}`);
    } else {
      navigate(`/member/${view}`);
    }
  };

  const handleViewModeChange = (mode: 'founder' | 'admin' | 'member') => {
    if (mode === currentViewMode) return;

    // Switch mode first
    setCurrentViewMode(mode);

    // Then navigate to the saved view for that mode
    const targetView = mode === 'founder' ? founderView :
                      mode === 'admin' ? adminView : memberView;

    if (mode === 'founder') {
      navigate(`/founder/${targetView}`);
    } else if (mode === 'admin') {
      navigate(`/admin/${targetView}`);
    } else {
      navigate(`/member/${targetView}`);
    }
  };

  // Render the appropriate routes based on current mode
  const renderRoutes = () => {
    if (currentViewMode === 'founder') {
      return <FounderRoutes />;
    } else if (currentViewMode === 'admin') {
      return <AdminRoutes />;
    } else {
      return <MemberRoutes />;
    }
  };

  return (
    <div className={styles.founderLayout}>
      <AppHeader
        userType="founder"
        currentViewMode={currentViewMode}
        onViewModeChange={handleViewModeChange}
      />

      <main className={styles.founderMain}>
        {renderRoutes()}
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={handleViewChange}
        userType={currentViewMode}
      />
    </div>
  );
}
