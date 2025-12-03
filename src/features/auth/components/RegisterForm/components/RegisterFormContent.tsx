import React from 'react';
import Button from '../../../../../shared/ui/Button/Button';
import { RegisterFormLayout } from './RegisterFormLayout';
import { RegisterFormTerms } from './RegisterFormTerms';

// Import single source of truth styles
import styles from '../../AuthModal/AuthModal.module.css';

interface RegisterFormContentProps {
  formData: any;
  acceptedTerms: boolean;
  isLoading: boolean;
  error: string;
  onFieldChange: (field: string, value: string) => void;
  onAcceptedTermsChange: (accepted: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
  onShowTerms: () => void;
}

export const RegisterFormContent: React.FC<RegisterFormContentProps> = ({
  formData,
  acceptedTerms,
  isLoading,
  error,
  onFieldChange,
  onAcceptedTermsChange,
  onSubmit,
  onSwitchToLogin,
  onShowTerms
}) => {
  return (
    <div className={styles.authFormContainer}>
      <div className={styles.authFormHeader}>
        <h2>Create Account</h2>
        <p>Join our community and access member features</p>
      </div>

      <form onSubmit={onSubmit} className={styles.authForm}>
        {error && (
          <div className={styles.authErrorMessage}>
            {error}
          </div>
        )}

        <RegisterFormLayout
          formData={formData}
          onFieldChange={onFieldChange}
          isLoading={isLoading}
        />

        <RegisterFormTerms
          acceptedTerms={acceptedTerms}
          onAcceptedTermsChange={onAcceptedTermsChange}
          onShowTerms={onShowTerms}
          isLoading={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !acceptedTerms}
          fullWidth
          className={styles.authSubmitButton}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className={styles.authFormFooter}>
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
    </div>
  );
};
