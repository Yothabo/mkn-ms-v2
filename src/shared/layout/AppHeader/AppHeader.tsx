import React from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import { useTheme } from '../../../shared/context/ThemeContext';
import { useAppHeaderActions } from './AppHeader.actions';
import { getAvailableModes, ViewMode } from './AppHeader.helpers';
import { ModeSwitcher } from './components/ModeSwitcher';
import { QuickActionsPanel } from './components/QuickActionsPanel';
import styles from './AppHeader.module.css';

interface AppHeaderProps {
  userType?: 'member' | 'admin' | 'founder';
  currentViewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export default function AppHeader({
  userType = 'member',
  currentViewMode = 'member',
  onViewModeChange
}: AppHeaderProps) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { handleLogout } = useAppHeaderActions(logout);

  const availableModes = getAvailableModes(userType);

  return (
    <header className={styles.stickyHeaderContainer}>
      <div className={styles.headerContent}>
        {/* Logo on the left */}
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <img 
              src="/src/assets/MKN.png" 
              alt="MKN Logo" 
              className={styles.logo}
            />
          </div>
        </div>

        {/* Mode switcher and quick actions on the right */}
        <div className={styles.rightSection}>
          <ModeSwitcher
            availableModes={availableModes}
            currentViewMode={currentViewMode}
            onViewModeChange={onViewModeChange}
          />

          <QuickActionsPanel
            user={user}
            isDarkTheme={theme === 'dark'}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
