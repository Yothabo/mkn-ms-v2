import React from 'react';
import styles from '../LoginForm.module.css';

interface LoginFormFieldsProps {
  cardNumber: string;
  password: string;
  rememberMe: boolean;
  onCardNumberChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberMeChange: (checked: boolean) => void;
  isLoading: boolean;
}

export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  cardNumber,
  password,
  rememberMe,
  onCardNumberChange,
  onPasswordChange,
  onRememberMeChange,
  isLoading
}) => {
  return (
    <>
      <div className={styles.loginInputGroup}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          className={styles.loginInput}
          placeholder="Enter your card number"
          value={cardNumber}
          onChange={(e) => onCardNumberChange(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className={styles.loginInputGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={styles.loginInput}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
    </>
  );
};
