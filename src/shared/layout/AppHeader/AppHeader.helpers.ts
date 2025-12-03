export type ViewMode = 'founder' | 'admin' | 'member';

export interface ViewModeConfig {
  mode: ViewMode;
  label: string;
  iconName: 'shield' | 'cog' | 'user';
}

export const getAvailableModes = (userType: 'member' | 'admin' | 'founder'): ViewModeConfig[] => {
  if (userType === 'founder') {
    return [
      { mode: 'founder', label: 'Founder', iconName: 'shield' },
      { mode: 'admin', label: 'Admin', iconName: 'cog' },
      { mode: 'member', label: 'Member', iconName: 'user' }
    ];
  } else if (userType === 'admin') {
    return [
      { mode: 'admin', label: 'Admin', iconName: 'cog' },
      { mode: 'member', label: 'Member', iconName: 'user' }
    ];
  } else {
    return [];
  }
};
