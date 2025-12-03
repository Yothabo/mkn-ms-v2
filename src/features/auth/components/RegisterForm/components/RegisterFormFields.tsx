import React from 'react';
import { AuthInput } from '../../common/AuthInput';

// Import only the existing modular styles from AuthModal
import modalStyles from '../../AuthModal/AuthModal.module.css';

// Use only the existing styles
const styles = {
  ...modalStyles
};

interface RegisterFormFieldsProps {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  formData,
  onFieldChange,
  isLoading
}) => {
  return (
    <div className={styles.authFormFields}>
      <div className={styles.authFormRow}>
        <AuthInput
          id="firstName"
          type="text"
          label="First Name"
          value={formData.firstName}
          onChange={(value) => onFieldChange('firstName', value)}
          disabled={isLoading}
          placeholder="Enter your first name"
          required
        />

        <AuthInput
          id="lastName"
          type="text"
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => onFieldChange('lastName', value)}
          disabled={isLoading}
          placeholder="Enter your last name"
          required
        />
      </div>

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
          id="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={(value) => onFieldChange('password', value)}
          disabled={isLoading}
          placeholder="Create a password"
          required
        />

        <AuthInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(value) => onFieldChange('confirmPassword', value)}
          disabled={isLoading}
          placeholder="Confirm your password"
          required
        />
      </div>
    </div>
  );
};
