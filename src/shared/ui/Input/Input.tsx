import { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const inputClasses = [styles.inputField, error && styles.inputError, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label className={styles.inputLabel}>
            {label}
            {props.required && <span className={styles.requiredAsterisk}>*</span>}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <div className={styles.inputErrorMessage}>{error}</div>}
        {helperText && !error && <div className={styles.inputHelper}>{helperText}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
