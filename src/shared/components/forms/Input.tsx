import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label className="input-label">
            {label}
            {props.required && <span className="required-asterisk">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`input-field ${error ? 'input-error' : ''} ${className || ''}`}
          {...props}
        />
        {error && <div className="input-error-message">{error}</div>}
        {helperText && !error && <div className="input-helper">{helperText}</div>}
        
        <style>{`
          .input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }

          .input-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-text);
          }

          .required-asterisk {
            color: var(--color-primary);
            margin-left: 0.25rem;
          }

          .input-field {
            padding: 0.75rem 1rem;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            background: var(--color-background);
            color: var(--color-text);
            font-size: 1rem;
            transition: all 0.2s ease;
            width: 100%;
          }

          .input-field:focus {
            outline: none;
            border-color: var(--color-secondary);
            box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
          }

          .input-field:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .input-field::placeholder {
            color: var(--color-text-light);
          }

          .input-field.input-error {
            border-color: var(--color-primary);
          }

          .input-field.input-error:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
          }

          .input-error-message {
            font-size: 0.75rem;
            color: var(--color-primary);
            font-weight: 500;
          }

          .input-helper {
            font-size: 0.75rem;
            color: var(--color-text-light);
          }
        `}</style>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
