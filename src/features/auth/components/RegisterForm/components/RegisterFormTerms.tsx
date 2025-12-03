import React from 'react';

// Import single source of truth styles
import styles from '../../AuthModal/AuthModal.module.css';

interface RegisterFormTermsProps {
  acceptedTerms: boolean;
  onAcceptedTermsChange: (accepted: boolean) => void;
  onShowTerms: () => void;
  isLoading: boolean;
}

export const RegisterFormTerms: React.FC<RegisterFormTermsProps> = ({
  acceptedTerms,
  onAcceptedTermsChange,
  onShowTerms,
  isLoading
}) => {
  return (
    <div className={styles.authTermsAgreement}>
      <input
        type="checkbox"
        id="agreeToTerms"
        checked={acceptedTerms}
        onChange={(e) => onAcceptedTermsChange(e.target.checked)}
        disabled={isLoading}
      />
      <span></span>
      <label htmlFor="agreeToTerms">
        I agree to the{' '}
        <button
          type="button"
          className={styles.authLinkButton}
          onClick={onShowTerms}
          disabled={isLoading}
        >
          Terms and Conditions
        </button>
      </label>
    </div>
  );
};
