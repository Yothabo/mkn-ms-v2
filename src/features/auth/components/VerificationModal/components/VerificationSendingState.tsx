import React from 'react';
import styles from '../VerificationModal.module.css';

export const VerificationSendingState: React.FC = () => {
  return (
    <div className={styles.sendingState}>
      <div className={styles.loadingSpinnerLarge}></div>
      <p className={styles.sendingText}>Sending verification code...</p>
    </div>
  );
};
