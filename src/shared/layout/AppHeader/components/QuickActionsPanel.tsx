import React, { useState, useRef, useEffect } from 'react';
import { HiViewGrid } from 'react-icons/hi';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { QuickActionsDropdown } from './QuickActionsDropdown';
import styles from './QuickActionsPanel.module.css';

interface QuickActionsPanelProps {
  user: any;
  isDarkTheme: boolean;
  onLogout: () => void;
}

export const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  user,
  isDarkTheme,
  onLogout
}) => {
  const { toggleTheme } = useTheme();
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState(false);
  const quickPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickPanelRef.current && !quickPanelRef.current.contains(event.target as Node)) {
        setIsQuickPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleQuickPanel = () => {
    setIsQuickPanelOpen(!isQuickPanelOpen);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setIsQuickPanelOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsQuickPanelOpen(false);
  };

  return (
    <div className={styles.quickPanelContainer} ref={quickPanelRef}>
      <button
        onClick={toggleQuickPanel}
        className={styles.quickPanelToggle}
        aria-label="Quick actions"
        aria-expanded={isQuickPanelOpen}
      >
        <HiViewGrid className={styles.gridIcon} />
      </button>

      {isQuickPanelOpen && (
        <QuickActionsDropdown
          user={user}
          isDarkTheme={isDarkTheme}
          onThemeToggle={handleThemeToggle}
          onLogout={handleLogoutClick}
        />
      )}
    </div>
  );
};
