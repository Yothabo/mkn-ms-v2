import { useAuth } from '../../context/AuthContext';
import { Logout, AdminPanelSettings, Person, LightMode, DarkMode } from '@mui/icons-material';
import { useState, useEffect } from 'react';

interface AppHeaderProps {
  userType?: 'member' | 'admin';
  currentViewMode?: 'admin' | 'member';
  onViewModeChange?: (mode: 'admin' | 'member') => void;
}

export default function AppHeader({
  userType = 'member',
  currentViewMode = 'member',
  onViewModeChange
}: AppHeaderProps) {
  const { user, logout } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('mkn-theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkTheme(isDark);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('mkn-theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  const handleViewModeToggle = () => {
    if (userType === 'admin' && onViewModeChange) {
      const newMode = currentViewMode === 'admin' ? 'member' : 'admin';
      onViewModeChange(newMode);
    }
  };

  return (
    <header className="sticky-header-container">
      <div className="header-content">
        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDarkTheme ? <LightMode /> : <DarkMode />}
          </button>

          {userType === 'admin' && (
            <button
              onClick={handleViewModeToggle}
              className={`view-mode-toggle-btn ${currentViewMode === 'member' ? 'active' : ''}`}
              aria-label={currentViewMode === 'admin' ? "Switch to member view" : "Switch to admin view"}
            >
              {currentViewMode === 'admin' ? <Person /> : <AdminPanelSettings />}
            </button>
          )}

          <button
            onClick={handleLogout}
            className="logout-btn"
            aria-label="Sign out"
          >
            <Logout />
          </button>
        </div>
      </div>

      <style>{`
        .sticky-header-container {
          position: sticky !important;
          top: 0 !important;
          z-index: 1000 !important;
          background: var(--color-surface) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          border-bottom: 1px solid var(--color-border) !important;
          padding: 1rem !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        .header-content {
          display: flex !important;
          justify-content: flex-end !important;
          align-items: center !important;
          max-width: 1200px !important;
          margin: 0 auto !important;
          width: 100% !important;
        }

        .header-actions {
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }

        .theme-toggle-btn, .view-mode-toggle-btn, .logout-btn {
          background: transparent !important;
          border: 1px solid var(--color-border) !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem !important;
          cursor: pointer !important;
          color: var(--color-text-light) !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .theme-toggle-btn:hover, .view-mode-toggle-btn:hover, .logout-btn:hover {
          background: var(--color-secondary) !important;
          color: white !important;
          border-color: var(--color-secondary) !important;
          transform: translateY(-1px) !important;
        }

        .view-mode-toggle-btn.active {
          background: var(--color-secondary) !important;
          color: white !important;
          border-color: var(--color-secondary) !important;
        }

        .theme-toggle-btn:active, .view-mode-toggle-btn:active, .logout-btn:active {
          transform: translateY(0) !important;
        }

        @media (max-width: 640px) {
          .sticky-header-container {
            padding: 0.75rem !important;
          }

          .header-actions {
            gap: 0.375rem !important;
          }

          .theme-toggle-btn, .view-mode-toggle-btn, .logout-btn {
            padding: 0.375rem !important;
          }
        }
      `}</style>
    </header>
  );
}
