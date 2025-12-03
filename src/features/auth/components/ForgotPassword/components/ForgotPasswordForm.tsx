import React from 'react';
import Button from '../../../../../shared/ui/Button/Button';
import { AuthInput } from '../../common/AuthInput';

// Import single source of truth styles
import styles from '../../AuthModal/AuthModal.module.css';

interface ForgotPasswordFormProps {
  formData: {
    cardReceiptNumber: string;
    newPassword: string;
    confirmPassword: string;
  };
  isLoading: boolean;
  error: string;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  formData,
  isLoading,
  error,
  onFieldChange,
  onSubmit,
  onSwitchToLogin
}) => {
  return (
    <div className={styles.authFormContainer}>
      <div className={styles.authFormHeader}>
        <h2>Recover Account</h2>
        <p>Verify your identity and set a new password</p>
      </div>

      <form onSubmit={onSubmit} className={styles.authForm}>
        {error && (
          <div className={styles.authErrorMessage}>
            {error}
          </div>
        )}

        <AuthInput
          id="cardReceiptNumber"
          type="text"
          label="Card / Receipt Number"
          value={formData.cardReceiptNumber}
          onChange={(value) => onFieldChange('cardReceiptNumber', value)}
          disabled={isLoading}
          placeholder="Enter your card or receipt number"
          required
        />

        <div className={styles.authFormRow}>
          <AuthInput
            id="newPassword"
            type="password"
            label="New Password"
            value={formData.newPassword}
            onChange={(value) => onFieldChange('newPassword', value)}
            disabled={isLoading}
            placeholder="Enter your new password"
            required
          />

          <AuthInput
            id="confirmPassword"
            type="password"
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(value) => onFieldChange('confirmPassword', value)}
            disabled={isLoading}
            placeholder="Confirm your new password"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          fullWidth
          className={styles.authSubmitButton}
        >
          {isLoading ? 'Processing...' : 'Reset Password'}
        </Button>
      </form>

      <div className={styles.authFormFooter}>
        <p className={styles.authSwitchText}>
          Remember your password?{' '}
          <button
            type="button"
            className={styles.authLinkButton}
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Back to Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
