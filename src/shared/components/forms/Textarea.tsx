import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="textarea-wrapper">
        {label && (
          <label className="textarea-label">
            {label}
            {props.required && <span className="required-asterisk">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`textarea-field ${error ? 'textarea-error' : ''} ${className || ''}`}
          {...props}
        />
        {error && <div className="textarea-error-message">{error}</div>}
        {helperText && !error && <div className="textarea-helper">{helperText}</div>}
        
        <style>{`
          .textarea-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }

          .textarea-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-text);
          }

          .required-asterisk {
            color: var(--color-primary);
            margin-left: 0.25rem;
          }

          .textarea-field {
            padding: 0.75rem 1rem;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            background: var(--color-background);
            color: var(--color-text);
            font-size: 1rem;
            transition: all 0.2s ease;
            width: 100%;
            min-height: 100px;
            resize: vertical;
            font-family: inherit;
          }

          .textarea-field:focus {
            outline: none;
            border-color: var(--color-secondary);
            box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
          }

          .textarea-field:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .textarea-field::placeholder {
            color: var(--color-text-light);
          }

          .textarea-field.textarea-error {
            border-color: var(--color-primary);
          }

          .textarea-field.textarea-error:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
          }

          .textarea-error-message {
            font-size: 0.75rem;
            color: var(--color-primary);
            font-weight: 500;
          }

          .textarea-helper {
            font-size: 0.75rem;
            color: var(--color-text-light);
          }
        `}</style>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
