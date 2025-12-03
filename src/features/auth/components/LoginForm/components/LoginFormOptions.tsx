import React from 'react';
import styles from '../LoginForm.module.css';

interface LoginFormOptionsProps {
  rememberMe: boolean;
  onRememberMeChange: (checked: boolean) => void;
  onForgotPassword: () => void;
  isLoading: boolean;
}

export const LoginFormOptions: React.FC<LoginFormOptionsProps> = ({
  rememberMe,
  onRememberMeChange,
  onForgotPassword,
  isLoading
}) => {
  return (
    <div className={styles.loginOptions}>
      <label className={styles.loginRememberMe}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => onRememberMeChange(e.target.checked)}
          disabled={isLoading}
        />
        Remember me
      </label>

      <button
        type="button"
        className={styles.loginLinkButton}
        onClick={onForgotPassword}
        disabled={isLoading}
      >
        Forgot Password?
      </button>
    </div>
  );
};
