import React from 'react';
import { MdEmail, MdSms } from 'react-icons/md';
import { VerificationMethod } from '../../../types/verification';
import styles from '../VerificationModal.module.css';

interface VerificationMethodSelectionProps {
  onMethodSelect: (method: VerificationMethod) => void;
}

export const VerificationMethodSelection: React.FC<VerificationMethodSelectionProps> = ({
  onMethodSelect,
}) => {
  return (
    <div className={styles.methodSelection}>
      <div className={styles.instruction}>
        <h2>Choose Verification Method</h2>
        <p>How would you like to receive your verification code?</p>
      </div>

      <div className={styles.methodButtons}>
        <button
          className={styles.methodButton}
          onClick={() => onMethodSelect('email')}
        >
          <div className={styles.methodIcon}>
            <MdEmail />
          </div>
          <div className={styles.methodInfo}>
            <h4>Email Verification</h4>
            <p>Send code to your registered email address</p>
          </div>
        </button>

        <button
          className={styles.methodButton}
          onClick={() => onMethodSelect('phone')}
        >
          <div className={styles.methodIcon}>
            <MdSms />
          </div>
          <div className={styles.methodInfo}>
            <h4>SMS Verification</h4>
            <p>Send code to your registered phone number</p>
          </div>
        </button>
      </div>
    </div>
  );
};
