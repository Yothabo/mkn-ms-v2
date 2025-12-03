import React from 'react';
import styles from '../../RegisterForm.module.css';

interface RegisterFormFooterProps {
  isLoading: boolean;
  onSwitchToLogin: () => void;
}

export const RegisterFormFooter: React.FC<RegisterFormFooterProps> = ({
  isLoading,
  onSwitchToLogin
}) => {
  return (
    <div className={styles.authFooter}>
      <p className={styles.authSwitchText}>
        Already have an account?{' '}
        <button
          type="button"
          className={styles.authLinkButton}
          onClick={onSwitchToLogin}
          disabled={isLoading}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};
