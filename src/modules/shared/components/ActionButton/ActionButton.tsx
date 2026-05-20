import React from 'react';
import styles from './ActionButton.module.css';

interface ActionButtonProps {
  onClick?: () => void;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  label,
  icon,
  disabled = false,
  className = ''
}) => {
  const defaultIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.buttonIcon}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.actionButton} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
    >
      <span className={styles.buttonLabel}>{label}</span>
      {icon || defaultIcon}
    </button>
  );
};

export default ActionButton;
