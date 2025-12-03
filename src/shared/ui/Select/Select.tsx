import { forwardRef } from 'react';
import styles from './Select.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    const selectClasses = [styles.selectField, error && styles.selectError, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.selectWrapper}>
        {label && (
          <label className={styles.selectLabel}>
            {label}
            {props.required && <span className={styles.requiredAsterisk}>*</span>}
          </label>
        )}
        <select ref={ref} className={selectClasses} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className={styles.selectErrorMessage}>{error}</div>}
        {helperText && !error && <div className={styles.selectHelper}>{helperText}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
