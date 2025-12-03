export type AdminView = 'dashboard' | 'members' | 'attendance' | 'duties' | 'analytics';
export type MemberView = 'home' | 'announcements' | 'hymns' | 'duties' | 'profile';
export type ViewMode = 'admin' | 'member';

export interface ViewState {
  currentViewMode: ViewMode;
  adminView: string;
  memberView: string;
}

export interface NavigationHandlers {
  handleViewChange: (view: string) => void;
  handleViewModeChange: (mode: ViewMode) => void;
}

export interface AdminLayoutProps {
  user: any; // Replace with proper User type from AuthContext
  location: any; // Replace with Location type from react-router-dom
  navigate: (path: string, options?: { replace: boolean }) => void;
}
