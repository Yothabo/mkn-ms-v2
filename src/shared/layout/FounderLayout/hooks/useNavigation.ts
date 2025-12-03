import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ViewState, ViewMode } from '../types';
import { 
  getRoleFromPath, 
  getViewFromPath, 
  isValidFounderView, 
  isValidAdminView, 
  isValidMemberView 
} from '../utils/routes';

interface UseNavigationProps {
  viewState: ViewState;
  setFounderView: (view: string) => void;
  setAdminView: (view: string) => void;
  setMemberView: (view: string) => void;
}

export const useNavigation = ({
  viewState,
  setFounderView,
  setAdminView,
  setMemberView,
}: UseNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentViewMode, founderView, adminView, memberView } = viewState;

  // Handle basic redirects based on current view mode
  useEffect(() => {
    const currentPath = location.pathname;
    const currentRole = getRoleFromPath(currentPath);
    let currentView: string;
    
    if (currentViewMode === 'founder') currentView = founderView;
    else if (currentViewMode === 'admin') currentView = adminView;
    else currentView = memberView;

    if (currentViewMode === 'founder' && currentRole !== 'founder') {
      navigate(`/founder/${currentView}`, { replace: true });
    } else if (currentViewMode === 'admin' && currentRole !== 'admin') {
      navigate(`/admin/${currentView}`, { replace: true });
    } else if (currentViewMode === 'member' && currentRole !== 'member') {
      navigate(`/member/${currentView}`, { replace: true });
    }
  }, [location.pathname, currentViewMode, founderView, adminView, memberView, navigate]);

  // Update current view when URL changes to a valid view
  useEffect(() => {
    const viewFromPath = getViewFromPath(location.pathname);

    if (viewFromPath) {
      if (currentViewMode === 'founder' && isValidFounderView(viewFromPath) && viewFromPath !== founderView) {
        setFounderView(viewFromPath);
      } else if (currentViewMode === 'admin' && isValidAdminView(viewFromPath) && viewFromPath !== adminView) {
        setAdminView(viewFromPath);
      } else if (currentViewMode === 'member' && isValidMemberView(viewFromPath) && viewFromPath !== memberView) {
        setMemberView(viewFromPath);
      }
    }
  }, [location.pathname, currentViewMode, founderView, adminView, memberView, setFounderView, setAdminView, setMemberView]);

  const handleViewChange = (view: string) => {
    if (currentViewMode === 'founder') {
      setFounderView(view);
    } else if (currentViewMode === 'admin') {
      setAdminView(view);
    } else {
      setMemberView(view);
    }

    navigate(`/${currentViewMode}/${view}`);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    if (mode === currentViewMode) return;

    let targetView: string;
    if (mode === 'founder') targetView = founderView;
    else if (mode === 'admin') targetView = adminView;
    else targetView = memberView;

    navigate(`/${mode}/${targetView}`);
  };

  return {
    handleViewChange,
    handleViewModeChange,
  };
};
