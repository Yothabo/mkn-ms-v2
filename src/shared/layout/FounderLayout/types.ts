export type FounderView = 'founder-dashboard' | 'system-settings' | 'user-management' | 'analytics';
export type AdminView = 'dashboard' | 'members' | 'attendance' | 'duties' | 'analytics';
export type MemberView = 'home' | 'announcements' | 'hymns' | 'duties' | 'profile';
export type ViewMode = 'founder' | 'admin' | 'member';

export interface ViewState {
  currentViewMode: ViewMode;
  founderView: string;
  adminView: string;
  memberView: string;
}

export interface NavigationHandlers {
  handleViewChange: (view: string) => void;
  handleViewModeChange: (mode: ViewMode) => void;
}
