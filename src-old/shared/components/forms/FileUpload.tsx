import { forwardRef, useState } from 'react';

interface FileUploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  accept?: string;
  onFileSelect?: (file: File) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, error, helperText, accept, onFileSelect, ...props }, ref) => {
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        onFileSelect?.(file);
      }
    };

    return (
      <div className="file-upload-wrapper">
        {label && (
          <label className="file-upload-label">
            {label}
            {props.required && <span className="required-asterisk">*</span>}
          </label>
        )}
        
        <div className="file-upload-container">
          <input
            ref={ref}
            type="file"
            className="file-upload-input"
            accept={accept}
            onChange={handleFileChange}
            {...props}
          />
          <div className="file-upload-display">
            <span className="file-upload-text">
              {fileName || 'Choose a file...'}
            </span>
            <button type="button" className="file-upload-button">
              Browse
            </button>
          </div>
        </div>

        {error && <div className="file-upload-error-message">{error}</div>}
        {helperText && !error && <div className="file-upload-helper">{helperText}</div>}
        
        <style>{`
          .file-upload-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }

          .file-upload-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-text);
          }

          .required-asterisk {
            color: var(--color-primary);
            margin-left: 0.25rem;
          }

          .file-upload-container {
            position: relative;
          }

          .file-upload-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }

          .file-upload-display {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 1rem;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            background: var(--color-background);
            transition: all 0.2s ease;
          }

          .file-upload-input:focus + .file-upload-display {
            border-color: var(--color-secondary);
            box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
          }

          .file-upload-text {
            font-size: 0.875rem;
            color: var(--color-text-light);
          }

          .file-upload-button {
            padding: 0.5rem 1rem;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-sm);
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--color-text);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .file-upload-button:hover {
            background: var(--color-border);
          }

          .file-upload-error-message {
            font-size: 0.75rem;
            color: var(--color-primary);
            font-weight: 500;
          }

          .file-upload-helper {
            font-size: 0.75rem;
            color: var(--color-text-light);
          }
        `}</style>
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
