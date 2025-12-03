import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../BottomNav/BottomNav';
import AppHeader from '../AppHeader/AppHeader';
import FounderRoutes from '../../../app/routes/FounderRoutes';
import AdminRoutes from '../../../app/routes/AdminRoutes';
import MemberRoutes from '../../../app/routes/MemberRoutes';
import { useViewState } from './hooks/useViewState';
import { useNavigation } from './hooks/useNavigation';
import styles from './FounderLayout.module.css';

export default function FounderLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // View state management
  const {
    currentViewMode,
    founderView,
    adminView,
    memberView,
    setCurrentViewMode,
    setFounderView,
    setAdminView,
    setMemberView,
  } = useViewState();

  // Navigation handlers
  const { handleViewChange, handleViewModeChange } = useNavigation({
    viewState: { currentViewMode, founderView, adminView, memberView },
    setFounderView,
    setAdminView,
    setMemberView,
  });

  // Determine current view for BottomNav
  const currentView = currentViewMode === 'founder' ? founderView :
                     currentViewMode === 'admin' ? adminView : memberView;

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
        onViewModeChange={(mode) => {
          setCurrentViewMode(mode);
          handleViewModeChange(mode);
        }}
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
