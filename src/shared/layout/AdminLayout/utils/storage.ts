const STORAGE_KEYS = {
  VIEW_MODE: 'mkn-admin-view-mode',
  ADMIN_VIEW: 'mkn-admin-current-view',
  MEMBER_VIEW: 'mkn-member-current-view',
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

export const loadViewMode = (): 'admin' | 'member' => 
  loadFromStorage(STORAGE_KEYS.VIEW_MODE, 'admin');

export const loadAdminView = (): string => 
  loadFromStorage(STORAGE_KEYS.ADMIN_VIEW, 'dashboard');

export const loadMemberView = (): string => 
  loadFromStorage(STORAGE_KEYS.MEMBER_VIEW, 'home');

export const saveViewMode = (mode: 'admin' | 'member') => 
  saveToStorage(STORAGE_KEYS.VIEW_MODE, mode);

export const saveAdminView = (view: string) => 
  saveToStorage(STORAGE_KEYS.ADMIN_VIEW, view);

export const saveMemberView = (view: string) => 
  saveToStorage(STORAGE_KEYS.MEMBER_VIEW, view);
