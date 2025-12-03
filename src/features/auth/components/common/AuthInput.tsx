import React from 'react';

// Import single source of truth styles
import styles from '../AuthModal/AuthModal.module.css';

interface AuthInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  label?: string;
  id: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder,
  type = 'text',
  label,
  id,
}) => {
  return (
    <div className={styles.authInputGroup}>
      {label && (
        <label htmlFor={id} className={styles.authInputLabel}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={styles.authInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};
