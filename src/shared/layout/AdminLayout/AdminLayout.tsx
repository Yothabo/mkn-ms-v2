import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../BottomNav/BottomNav';
import AppHeader from '../AppHeader/AppHeader';
import AdminRoutes from '../../../app/routes/AdminRoutes';
import MemberRoutes from '../../../app/routes/MemberRoutes';
import { useScrollPersistence } from '../../../shared/hooks/useScrollPersistence';
import { useViewState } from './hooks/useViewState';
import { useNavigation } from './hooks/useNavigation';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // View state management
  const {
    currentViewMode,
    adminView,
    memberView,
    setCurrentViewMode,
    setAdminView,
    setMemberView,
  } = useViewState();

  // Navigation handlers
  const { handleViewChange, handleViewModeChange } = useNavigation({
    viewState: { currentViewMode, adminView, memberView },
    setAdminView,
    setMemberView,
  });

  // Scroll persistence
  const { mainRef } = useScrollPersistence(`layout-${currentViewMode}`);

  // Determine current view for BottomNav
  const currentView = currentViewMode === 'admin' ? adminView : memberView;

  return (
    <div className={styles.adminLayout}>
      <AppHeader
        userType="admin"
        currentViewMode={currentViewMode}
        onViewModeChange={(mode) => {
          setCurrentViewMode(mode);
          handleViewModeChange(mode);
        }}
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
