import React from 'react';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { IoCheckmarkCircle } from 'react-icons/io5';
import styles from './AuthModal.module.css';

interface SuccessStateProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  showCloseButton: boolean;
  showBackButton: boolean;
  onBack: () => void;
  size: string;
  variant: string;
  type: 'register' | 'forgot-password';
  onContinue: () => void;
}

export const RegisterSuccessState: React.FC<SuccessStateProps> = ({
  isOpen,
  onClose,
  title,
  showCloseButton,
  showBackButton,
  onBack,
  size,
  variant,
  onContinue
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    showCloseButton={showCloseButton}
    showBackButton={showBackButton}
    onBack={onBack}
    size={size}
    variant={variant}
  >
    <div className={styles.authModalContent}>
      <div className={styles.authFormContainer}>
        <div className={styles.successState}>
          <div className={styles.successIconLarge}>
            <IoCheckmarkCircle />
          </div>
          <h2 className={styles.successTitle}>Registration Successful!</h2>
          <p className={styles.successText}>
            Welcome to MKN! Your account has been created and you are now signed in.
          </p>
          <div className={styles.successActions}>
            <button
              onClick={onContinue}
              className={styles.continueButton}
              style={{
                background: 'var(--color-secondary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'background-color var(--transition-normal)',
                fontFamily: 'inherit',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--color-secondary-hover)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--color-secondary)';
              }}
            >
              Continue to App
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export const ForgotPasswordSuccessState: React.FC<SuccessStateProps> = ({
  isOpen,
  onClose,
  title,
  showCloseButton,
  showBackButton,
  onBack,
  size,
  variant,
  onContinue
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    showCloseButton={showCloseButton}
    showBackButton={showBackButton}
    onBack={onBack}
    size={size}
    variant={variant}
  >
    <div className={styles.authModalContent}>
      <div className={styles.authFormContainer}>
        <div className={styles.successState}>
          <div className={styles.successIconLarge}>
            <IoCheckmarkCircle />
          </div>
          <h2 className={styles.successTitle}>Password Changed Successfully!</h2>
          <p className={styles.successText}>
            Please keep your new password safe and secure.
          </p>
          <div className={styles.successActions}>
            <button
              onClick={onContinue}
              className={styles.continueButton}
              style={{
                background: 'var(--color-secondary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'background-color var(--transition-normal)',
                fontFamily: 'inherit',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--color-secondary-hover)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--color-secondary)';
              }}
            >
              Continue to App
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);
