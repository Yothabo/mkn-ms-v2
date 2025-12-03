import React from 'react';
import { RegisterFormTerms } from '../RegisterFormTerms';
import Button from '../../../../../../shared/ui/Button/Button';
import styles from '../../RegisterForm.module.css';

interface RegisterFormFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    cardReceiptNumber: string;
    password: string;
    confirmPassword: string;
  };
  isLoading: boolean;
  onFieldChange: (field: string, value: string) => void;
  acceptedTerms: boolean;
  onAcceptedTermsChange: (accepted: boolean) => void;
  onShowTerms: () => void;
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  formData,
  isLoading,
  onFieldChange,
  acceptedTerms,
  onAcceptedTermsChange,
  onShowTerms
}) => {
  return (
    <>
      <div className={styles.authInputGroup}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          className={styles.authInput}
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => onFieldChange('firstName', e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className={styles.authInputGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          className={styles.authInput}
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => onFieldChange('lastName', e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className={styles.authInputGroup}>
        <label htmlFor="cardReceiptNumber">Card / Receipt Number</label>
        <input
          id="cardReceiptNumber"
          type="text"
          className={styles.authInput}
          placeholder="Enter your card or receipt number"
          value={formData.cardReceiptNumber}
          onChange={(e) => onFieldChange('cardReceiptNumber', e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className={styles.authInputGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={styles.authInput}
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => onFieldChange('password', e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className={styles.authInputGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className={styles.authInput}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <RegisterFormTerms
        acceptedTerms={acceptedTerms}
        onAcceptedTermsChange={onAcceptedTermsChange}
        onShowTerms={onShowTerms}
        isLoading={isLoading}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        fullWidth
        className={styles.submitButton}
      >
        {isLoading ? 'Verifying...' : 'Verify Membership'}
      </Button>
    </>
  );
};
