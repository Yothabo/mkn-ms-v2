import { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import BottomNav from '../BottomNav/BottomNav';
import MemberRoutes from '../../../app/routes/MemberRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { useScrollPersistence } from '../../hooks/useScrollPersistence';
import styles from './MemberLayout.module.css';

type MemberView = 'home' | 'announcements' | 'hymns' | 'duties' | 'profile';

export default function MemberLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Manual persistence for member views
  const [currentView, setCurrentView] = useState<MemberView>(() => {
    try {
      const saved = localStorage.getItem('mkn-member-layout-current-view');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {
      // Silent fail
    }
    return 'home';
  });

  // Save to localStorage when currentView changes
  useEffect(() => {
    localStorage.setItem('mkn-member-layout-current-view', JSON.stringify(currentView));
  }, [currentView]);

  // Use scroll persistence for the main content area
  const { mainRef } = useScrollPersistence('member-layout');

  // Handle URL validation and redirect
  useEffect(() => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const currentRole = pathSegments[0]; // /member
    const currentPage = pathSegments[1]; // the actual page

    const validMemberViews: MemberView[] = ['home', 'announcements', 'hymns', 'duties', 'profile'];
    const isValidRoute = currentRole === 'member' && currentPage && validMemberViews.includes(currentPage as MemberView);

    // If we're on an invalid route or base path, redirect to persisted view
    if (!isValidRoute || currentPath === '/member' || currentPath === '/member/') {
      navigate(`/member/${currentView}`, { replace: true });
      return; // Stop execution after redirect
    }

    // If we're on a valid route, update the current view
    if (isValidRoute && currentPage !== currentView) {
      setCurrentView(currentPage as MemberView);
    }
  }, [location.pathname, currentView, navigate]);

  const handleViewChange = (view: MemberView) => {
    if (view === currentView) return;

    // Update persisted state and navigate
    setCurrentView(view);
    navigate(`/member/${view}`);
  };

  return (
    <div className={styles.memberLayout}>
      <AppHeader userType="member" />
      <main ref={mainRef} className={styles.memberMain}>
        <MemberRoutes />
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={handleViewChange}
        userType="member"
      />
    </div>
  );
}
