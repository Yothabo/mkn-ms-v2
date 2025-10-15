import { useState } from 'react';
import Button from '../../../shared/components/ui/Button';
import { branches } from '../../../config/branches';
import '../../../shared/styles/auth.css';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  branch?: string;
  agreeToTerms?: string;
  submit?: string;
}

const branchOptions = branches.map(branch => ({
  value: branch.id,
  label: branch.name
}));

export default function RegisterForm({ onSwitchToLogin, onClose }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    branch: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showRequiredErrors, setShowRequiredErrors] = useState(false);

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and numbers';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'branch':
        if (!value) return 'Please select a branch';
        return '';
      case 'agreeToTerms':
        if (!value) return 'You must agree to the terms and conditions';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: string, value: any) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    newErrors.fullName = validateField('fullName', formData.fullName);
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);
    newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    newErrors.branch = validateField('branch', formData.branch);
    newErrors.agreeToTerms = validateField('agreeToTerms', formData.agreeToTerms);

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error);
    setShowRequiredErrors(hasErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Registration attempt:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBranchSelect = (branchId: string) => {
    setFormData(prev => ({ ...prev, branch: branchId }));
    setShowBranchModal(false);
    setErrors(prev => ({ ...prev, branch: '' }));
  };

  const getSelectedBranchName = () => {
    if (!formData.branch) return '';
    const branch = branches.find(b => b.id === formData.branch);
    return branch ? branch.name : '';
  };

  const isFieldRequired = (fieldName: string) => {
    return showRequiredErrors && !formData[fieldName as keyof typeof formData];
  };

  return (
    <div className="auth-form-container">
      {Object.keys(errors).length > 0 && (
        <div className="auth-sr-only" aria-live="polite" aria-atomic="true">
          Form has errors. Please check the fields below.
        </div>
      )}

      <button className="auth-modal-close" onClick={onClose} aria-label="Close registration modal">
        ×
      </button>

      {showBranchModal && (
        <div className="auth-branch-modal-overlay" onClick={() => setShowBranchModal(false)} role="dialog" aria-modal="true" aria-label="Select home branch">
          <div className="auth-branch-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-branch-modal-header">
              <h3>Select Home Branch</h3>
              <button className="auth-branch-modal-close" onClick={() => setShowBranchModal(false)} aria-label="Close branch selection">
                ×
              </button>
            </div>
            <div className="auth-branch-list">
              {branchOptions.map((option) => (
                <button
                  key={option.value}
                  className={`auth-branch-option ${formData.branch === option.value ? 'selected' : ''}`}
                  onClick={() => handleBranchSelect(option.value)}
                  aria-pressed={formData.branch === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="auth-header">
        <h2>Sign up</h2>
      </div>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="auth-form-grid">
          <div className="auth-input-group">
            <label htmlFor="fullName">
              Full Name <span className={isFieldRequired('fullName') ? 'required-asterisk' : ''}>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              onBlur={(e) => handleBlur('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
              className="auth-input"
              aria-invalid={!!errors.fullName}
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="email">
              Email Address <span className={isFieldRequired('email') ? 'required-asterisk' : ''}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="auth-input"
              aria-invalid={!!errors.email}
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="branch">
              Home Branch <span className={isFieldRequired('branch') ? 'required-asterisk' : ''}>*</span>
            </label>
            <div
              className="auth-branch-select-trigger"
              onClick={() => setShowBranchModal(true)}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-expanded={showBranchModal}
              aria-invalid={!!errors.branch}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowBranchModal(true);
                }
              }}
            >
              {formData.branch ? (
                <span>{getSelectedBranchName()}</span>
              ) : (
                <span className="auth-branch-placeholder">Select your branch</span>
              )}
              <span className="auth-branch-dropdown-arrow">▼</span>
            </div>
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">
              Password <span className={isFieldRequired('password') ? 'required-asterisk' : ''}>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onBlur={(e) => handleBlur('password', e.target.value)}
              placeholder="Create a password"
              required
              disabled={isLoading}
              className="auth-input"
              aria-invalid={!!errors.password}
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="confirmPassword">
              Confirm Password <span className={isFieldRequired('confirmPassword') ? 'required-asterisk' : ''}>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
              className="auth-input"
              aria-invalid={!!errors.confirmPassword}
            />
          </div>
        </div>

        <div className="auth-terms-container">
          <label className="auth-terms-checkbox">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              required
              disabled={isLoading}
              aria-invalid={!!errors.agreeToTerms}
            />
            <span className="auth-terms-text">
              I agree to the{' '}
              <button type="button" className="auth-link-button">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="auth-link-button">
                Privacy Policy
              </button>
              <span className={isFieldRequired('agreeToTerms') ? 'required-asterisk' : ''}>*</span>
            </span>
          </label>
        </div>

        {errors.submit && (
          <div className="auth-error-message" role="alert">
            {errors.submit}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="auth-submit-btn"
          aria-disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>

      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="auth-link-button"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
