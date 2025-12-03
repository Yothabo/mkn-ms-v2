const STORAGE_KEYS = {
  VIEW_MODE: 'mkn-founder-view-mode',
  FOUNDER_VIEW: 'mkn-founder-current-view',
  ADMIN_VIEW: 'mkn-founder-admin-current-view',
  MEMBER_VIEW: 'mkn-founder-member-current-view',
} as const;

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved && saved !== 'undefined' && saved !== 'null') {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn(`Failed to load from storage key "${key}":`, error);
  }
  return defaultValue;
};

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save to storage key "${key}":`, error);
  }
};

export const loadViewMode = (): 'founder' | 'admin' | 'member' => 
  loadFromStorage(STORAGE_KEYS.VIEW_MODE, 'founder');

export const loadFounderView = (): string => 
  loadFromStorage(STORAGE_KEYS.FOUNDER_VIEW, 'founder-dashboard');

export const loadAdminView = (): string => 
  loadFromStorage(STORAGE_KEYS.ADMIN_VIEW, 'dashboard');

export const loadMemberView = (): string => 
  loadFromStorage(STORAGE_KEYS.MEMBER_VIEW, 'home');

export const saveViewMode = (mode: 'founder' | 'admin' | 'member') => 
  saveToStorage(STORAGE_KEYS.VIEW_MODE, mode);

export const saveFounderView = (view: string) => 
  saveToStorage(STORAGE_KEYS.FOUNDER_VIEW, view);

export const saveAdminView = (view: string) => 
  saveToStorage(STORAGE_KEYS.ADMIN_VIEW, view);

export const saveMemberView = (view: string) => 
  saveToStorage(STORAGE_KEYS.MEMBER_VIEW, view);
