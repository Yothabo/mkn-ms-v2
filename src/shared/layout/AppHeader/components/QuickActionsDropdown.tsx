import React from 'react';
import { HiLogout, HiSun, HiMoon } from 'react-icons/hi';
import styles from './QuickActionsDropdown.module.css';

interface QuickActionsDropdownProps {
  user: any;
  isDarkTheme: boolean;
  onThemeToggle: () => void;
  onLogout: () => void;
}

export const QuickActionsDropdown: React.FC<QuickActionsDropdownProps> = ({
  user,
  isDarkTheme,
  onThemeToggle,
  onLogout
}) => {
  return (
    <div className={styles.quickPanelDropdown}>
      <div className={styles.quickPanelHeader}>
        <span className={styles.userName}>{user?.name || 'User'}</span>
        <span className={styles.userEmail}>{user?.email || 'user@example.com'}</span>
      </div>
      
      <div className={styles.quickPanelDivider}></div>
      
      <button
        onClick={onThemeToggle}
        className={styles.quickPanelItem}
        aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
      >
        <div className={styles.quickPanelIcons}>
          <HiMoon className={`${styles.quickPanelIcon} ${styles.moonIcon} ${isDarkTheme ? styles.themeIconHidden : styles.themeIconVisible}`} />
          <HiSun className={`${styles.quickPanelIcon} ${styles.sunIcon} ${isDarkTheme ? styles.themeIconVisible : styles.themeIconHidden}`} />
        </div>
        <span className={styles.quickPanelLabel}>
          {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>

      <button
        onClick={onLogout}
        className={styles.quickPanelItem}
        aria-label="Sign out"
      >
        <HiLogout className={styles.quickPanelIcon} />
        <span className={styles.quickPanelLabel}>Sign Out</span>
      </button>
    </div>
  );
};
