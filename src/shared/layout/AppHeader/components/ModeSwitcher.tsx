import React from 'react';
import { ViewMode } from '../AppHeader.helpers';
import { renderIcon } from '../AppHeader.utils';
import styles from './ModeSwitcher.module.css';

interface ModeSwitcherProps {
  availableModes: Array<{ mode: ViewMode; label: string; iconName: string }>;
  currentViewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  availableModes,
  currentViewMode = 'member',
  onViewModeChange
}) => {
  return (
    <div className={styles.leftSection}>
      {availableModes.map(({ mode, label, iconName }) => (
        <button
          key={mode}
          onClick={() => onViewModeChange?.(mode)}
          className={`${styles.modeButton} ${currentViewMode === mode ? styles.active : ''}`}
          aria-label={`Switch to ${label} view`}
          title={`Switch to ${label} view`}
        >
          <span className={styles.modeIcon}>
            {renderIcon(iconName, 24)}
          </span>
          <span className={styles.modeLabel}>{label}</span>
        </button>
      ))}
    </div>
  );
};
