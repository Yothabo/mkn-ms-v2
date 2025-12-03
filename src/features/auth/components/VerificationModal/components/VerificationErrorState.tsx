import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import Button from '../../../../../shared/ui/Button/Button';
import styles from '../VerificationModal.module.css';

interface VerificationErrorStateProps {
  error: string;
  onClose: () => void;
  hideHeader?: boolean;
  isCardLocked?: boolean;
}

export const VerificationErrorState: React.FC<VerificationErrorStateProps> = ({
  error,
  onClose,
  hideHeader = false,
  isCardLocked = false
}) => {
  const handleClose = () => {
    // Clean close - no alerts blocking execution
    onClose();
  };

  return (
    <div className={styles.errorState}>
      <div className={styles.errorIconLarge}>
        <IoCloseCircle />
      </div>
      <h2 className={styles.errorTitle}>Verification Failed</h2>
      <p className={styles.errorText}>
        {error || 'We could not verify your account. Please try again or contact support.'}
      </p>
      <div className={styles.errorActions}>
        <Button
          onClick={handleClose}
          variant="primary"
          fullWidth
          className={styles.retryButton}
        >
          Close
        </Button>
      </div>
    </div>
  );
};
