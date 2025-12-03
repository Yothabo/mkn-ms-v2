import { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import BottomNav from '../BottomNav/BottomNav';
import AdminRoutes from '../../../app/routes/AdminRoutes';
import MemberRoutes from '../../../app/routes/MemberRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { useScrollPersistence } from '../../../shared/hooks/useScrollPersistence';
import styles from './AdminLayout.module.css';

type AdminView = 'dashboard' | 'members' | 'attendance' | 'duties' | 'analytics';
type MemberView = 'home' | 'announcements' | 'hymns' | 'duties' | 'profile';

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Manual persistence for current view mode
  const [currentViewMode, setCurrentViewMode] = useState<'admin' | 'member'>(() => {
    try {
      const saved = localStorage.getItem('mkn-admin-view-mode');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {}
    return 'admin';
  });

  // Manual persistence for admin views
  const [adminView, setAdminView] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('mkn-admin-current-view');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {}
    return 'dashboard';
  });

  // Manual persistence for member views
  const [memberView, setMemberView] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('mkn-member-current-view');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {}
    return 'home';
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('mkn-admin-view-mode', JSON.stringify(currentViewMode));
  }, [currentViewMode]);

  useEffect(() => {
    localStorage.setItem('mkn-admin-current-view', JSON.stringify(adminView));
  }, [adminView]);

  useEffect(() => {
    localStorage.setItem('mkn-member-current-view', JSON.stringify(memberView));
  }, [memberView]);

  // Use scroll persistence for the main content area
  const { mainRef } = useScrollPersistence(`layout-${currentViewMode}`);

  // Determine current view based on mode
  const currentView = currentViewMode === 'admin' ? adminView : memberView;

  // SIMPLE PATTERN: Only handle basic redirects
  useEffect(() => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const currentRole = pathSegments[0]; // /admin, /member

    // Only redirect if we're on a completely wrong route
    if (currentViewMode === 'admin' && currentRole !== 'admin') {
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
      if (currentViewMode === 'admin') {
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
  }, [location.pathname, currentViewMode, adminView, memberView]);

  const handleViewChange = (view: string) => {
    // Update the appropriate view state
    if (currentViewMode === 'admin') {
      setAdminView(view);
    } else {
      setMemberView(view);
    }

    // Navigate immediately
    if (currentViewMode === 'admin') {
      navigate(`/admin/${view}`);
    } else {
      navigate(`/member/${view}`);
    }
  };

  const handleViewModeChange = (mode: 'admin' | 'member') => {
    if (mode === currentViewMode) return;

    // Switch mode first
    setCurrentViewMode(mode);

    // Then navigate to the saved view for that mode
    const targetView = mode === 'admin' ? adminView : memberView;

    if (mode === 'admin') {
      navigate(`/admin/${targetView}`);
    } else {
      navigate(`/member/${targetView}`);
    }
  };

  return (
    <div className={styles.adminLayout}>
      <AppHeader
        userType="admin"
        currentViewMode={currentViewMode}
        onViewModeChange={handleViewModeChange}
      />

      <main ref={mainRef} className={styles.adminMain}>
        {currentViewMode === 'admin' ? <AdminRoutes /> : <MemberRoutes />}
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={handleViewChange}
        userType={currentViewMode}
      />
    </div>
  );
}
