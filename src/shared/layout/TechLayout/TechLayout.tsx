import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import BottomNav from '../BottomNav/BottomNav';
import TechRoutes from '../../../app/routes/TechRoutes';
import styles from './TechLayout.module.css';

type TechView = 'dashboard' | 'recovery' | 'health' | 'audit' | 'maintenance';

const TechLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Manual persistence for tech views
  const [currentView, setCurrentView] = useState<TechView>(() => {
    try {
      const saved = localStorage.getItem('mkn-tech-current-view');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (error) {
      // Silent fail
    }
    return 'dashboard';
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('mkn-tech-current-view', JSON.stringify(currentView));
  }, [currentView]);

  // Handle URL validation and redirect
  useEffect(() => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const currentRole = pathSegments[0]; // /tech
    const currentPage = pathSegments[1]; // the actual page

    // Check if current URL matches tech route and has valid page
    const validTechViews: TechView[] = ['dashboard', 'recovery', 'health', 'audit', 'maintenance'];
    const isValidRoute = currentRole === 'tech' && currentPage && validTechViews.includes(currentPage as TechView);

    // If we're on an invalid route or base path, redirect to persisted view
    if (!isValidRoute || currentPath === '/tech' || currentPath === '/tech/') {
      navigate(`/tech/${currentView}`, { replace: true });
    }
  }, [location.pathname, currentView, navigate]);

  // Update current view when URL changes to a valid view
  useEffect(() => {
    const path = location.pathname.split('/').pop() || '';

    if (path) {
      const validTechViews: TechView[] = ['dashboard', 'recovery', 'health', 'audit', 'maintenance'];
      if (validTechViews.includes(path as TechView) && path !== currentView) {
        setCurrentView(path as TechView);
      }
    }
  }, [location.pathname, currentView]);

  const handleViewChange = (view: TechView) => {
    if (view === currentView) return;

    // Update persisted state and navigate
    setCurrentView(view);
    navigate(`/tech/${view}`);
  };

  return (
    <div className={styles.techLayout}>
      <AppHeader userType="tech" />
      <main className={styles.techMain}>
        <div className={styles.techContent}>
          <TechRoutes />
        </div>
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={handleViewChange}
        userType="tech"
      />
    </div>
  );
};

export default TechLayout;
