import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../shared/context/AuthContext';
import Button from '../../../../shared/ui/Button/Button';
import { AuthInput } from '../common/AuthInput';

// Import single source of truth styles
import styles from '../AuthModal/AuthModal.module.css';

// DEBUG: Log the styles to see what's happening
console.log('=== LOGINFORM STYLES ===', styles);

import localStyles from './LoginForm.module.css';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  onForgotPassword
}) => {
  const { login, isLoading } = useAuth();
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('=== STYLES ON MOUNT ===', styles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(cardNumber, password, rememberMe);
      if (success) {
        console.log('LoginForm - SUCCESS! AuthContext should trigger redirect');
      } else {
        setError('Invalid card number or password');
      }
    } catch (err) {
      console.error('LoginForm - ERROR:', err);
      setError('Invalid card number or password');
    }
  };

  return (
    <div className={localStyles.loginFormWrapper}>
      <div className={styles.authFormContainer}>
        <div className={styles.authFormHeader}>
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && (
            <div className={styles.authErrorMessage}>
              {error}
            </div>
          )}

          <AuthInput
            id="cardNumber"
            type="text"
            label="Card Number"
            value={cardNumber}
            onChange={setCardNumber}
            disabled={isLoading}
            placeholder="Enter your card number"
            required
          />

          <AuthInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
            disabled={isLoading}
            placeholder="Enter your password"
            required
          />

          <div className={styles.authOptions}>
            <label className={styles.authRememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span></span>
              Remember me
            </label>

            <button
              type="button"
              className={styles.authLinkButton}
              onClick={onForgotPassword}
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            fullWidth
            className={styles.authSubmitButton}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className={styles.authFormFooter}>
          <p className={styles.authSwitchText}>
            Don't have an account?{' '}
            <button
              type="button"
              className={styles.authLinkButton}
              onClick={onSwitchToRegister}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
