import React, { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // Additional props for AuthModal compatibility
  showCloseButton?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  variant?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  showBackButton = false,
  onBack,
  variant
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleCloseButton = () => {
    onClose();
  };

  const handleBackButton = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      onKeyDown={handleEscapeKey}
      role="dialog"
      aria-modal="true"
    >
      <div className={`${styles.modalContent} ${styles[size]}`}>
        {(title || showBackButton || showCloseButton) && (
          <div className={styles.modalHeader}>
            {showBackButton && (
              <button
                className={styles.backButton}
                onClick={handleBackButton}
                aria-label="Go back"
              >
                ←
              </button>
            )}
            {title && (
              <h2 className={styles.modalTitle}>{title}</h2>
            )}
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={handleCloseButton}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className={styles.modalBody}>
          <div className={styles.modalContentWrapper}>
            <div className={styles.modalScrollContent}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
