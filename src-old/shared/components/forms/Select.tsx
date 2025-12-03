import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className, ...props }, ref) => {
    return (
      <div className="select-wrapper">
        {label && (
          <label className="select-label">
            {label}
            {props.required && <span className="required-asterisk">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`select-field ${error ? 'select-error' : ''} ${className || ''}`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="select-error-message">{error}</div>}
        {helperText && !error && <div className="select-helper">{helperText}</div>}
        
        <style>{`
          .select-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }

          .select-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-text);
          }

          .required-asterisk {
            color: var(--color-primary);
            margin-left: 0.25rem;
          }

          .select-field {
            padding: 0.75rem 1rem;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            background: var(--color-background);
            color: var(--color-text);
            font-size: 1rem;
            transition: all 0.2s ease;
            width: 100%;
            cursor: pointer;
          }

          .select-field:focus {
            outline: none;
            border-color: var(--color-secondary);
            box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
          }

          .select-field:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .select-field.select-error {
            border-color: var(--color-primary);
          }

          .select-field.select-error:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
          }

          .select-error-message {
            font-size: 0.75rem;
            color: var(--color-primary);
            font-weight: 500;
          }

          .select-helper {
            font-size: 0.75rem;
            color: var(--color-text-light);
          }
        `}</style>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
