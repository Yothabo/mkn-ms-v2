import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ViewState, ViewMode } from '../types';
import { getRoleFromPath, getViewFromPath, isValidAdminView, isValidMemberView } from '../utils/routes';

interface UseNavigationProps {
  viewState: ViewState;
  setAdminView: (view: string) => void;
  setMemberView: (view: string) => void;
}

export const useNavigation = ({
  viewState,
  setAdminView,
  setMemberView,
}: UseNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentViewMode, adminView, memberView } = viewState;

  // Handle basic redirects based on current view mode
  useEffect(() => {
    const currentPath = location.pathname;
    const currentRole = getRoleFromPath(currentPath);
    const currentView = currentViewMode === 'admin' ? adminView : memberView;

    if (currentViewMode === 'admin' && currentRole !== 'admin') {
      navigate(`/admin/${currentView}`, { replace: true });
    } else if (currentViewMode === 'member' && currentRole !== 'member') {
      navigate(`/member/${currentView}`, { replace: true });
    }
  }, [location.pathname, currentViewMode, adminView, memberView, navigate]);

  // Update current view when URL changes to a valid view
  useEffect(() => {
    const viewFromPath = getViewFromPath(location.pathname);

    if (viewFromPath) {
      if (currentViewMode === 'admin' && isValidAdminView(viewFromPath) && viewFromPath !== adminView) {
        setAdminView(viewFromPath);
      } else if (currentViewMode === 'member' && isValidMemberView(viewFromPath) && viewFromPath !== memberView) {
        setMemberView(viewFromPath);
      }
    }
  }, [location.pathname, currentViewMode, adminView, memberView, setAdminView, setMemberView]);

  const handleViewChange = (view: string) => {
    if (currentViewMode === 'admin') {
      setAdminView(view);
    } else {
      setMemberView(view);
    }

    navigate(`/${currentViewMode}/${view}`);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    if (mode === currentViewMode) return;

    const targetView = mode === 'admin' ? adminView : memberView;
    navigate(`/${mode}/${targetView}`);
  };

  return {
    handleViewChange,
    handleViewModeChange,
  };
};
