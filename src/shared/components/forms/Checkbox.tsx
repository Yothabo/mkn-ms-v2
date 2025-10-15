import { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="checkbox-wrapper">
        <label className="checkbox-label">
          <input
            ref={ref}
            type="checkbox"
            className={`checkbox-field ${className || ''}`}
            {...props}
          />
          <span className="checkbox-custom"></span>
          {label && (
            <span className="checkbox-text">
              {label}
              {props.required && <span className="required-asterisk">*</span>}
            </span>
          )}
        </label>
        {error && <div className="checkbox-error-message">{error}</div>}
        {helperText && !error && <div className="checkbox-helper">{helperText}</div>}
        
        <style>{`
          .checkbox-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            cursor: pointer;
            font-size: 0.875rem;
            color: var(--color-text);
            line-height: 1.4;
          }

          .checkbox-field {
            display: none;
          }

          .checkbox-custom {
            width: 1.25rem;
            height: 1.25rem;
            border: 2px solid var(--color-border);
            border-radius: var(--radius-sm);
            background: var(--color-background);
            transition: all 0.2s ease;
            flex-shrink: 0;
            margin-top: 0.125rem;
            position: relative;
          }

          .checkbox-field:checked + .checkbox-custom {
            background: var(--color-secondary);
            border-color: var(--color-secondary);
          }

          .checkbox-field:checked + .checkbox-custom::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 0.75rem;
            font-weight: bold;
          }

          .checkbox-field:focus + .checkbox-custom {
            border-color: var(--color-secondary);
            box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
          }

          .checkbox-field:disabled + .checkbox-custom {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .checkbox-text {
            flex: 1;
          }

          .required-asterisk {
            color: var(--color-primary);
            margin-left: 0.25rem;
          }

          .checkbox-error-message {
            font-size: 0.75rem;
            color: var(--color-primary);
            font-weight: 500;
            margin-left: 2rem;
          }

          .checkbox-helper {
            font-size: 0.75rem;
            color: var(--color-text-light);
            margin-left: 2rem;
          }
        `}</style>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
