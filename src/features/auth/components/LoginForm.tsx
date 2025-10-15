import { useState } from 'react';
import Button from '../../../shared/components/ui/Button';
import { useAuth } from '../../../shared/context/AuthContext';
import '../../../shared/styles/auth.css';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onClose: () => void;
}

interface LoginErrors {
  email?: string;
  password?: string;
  submit?: string;
}

export default function LoginForm({ onSwitchToSignup, onClose }: LoginFormProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRequiredErrors, setShowRequiredErrors] = useState(false);

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof LoginErrors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: string, value: any) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);

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
      const success = await login(formData.email, formData.password);
      if (success) {
        onClose();
      } else {
        setErrors({ submit: 'Invalid email or password. Please try again.' });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
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

      <button className="auth-modal-close" onClick={onClose} aria-label="Close login modal">
        ×
      </button>

      <div className="auth-header">
        <h2>Sign in</h2>
      </div>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="auth-input-group">
          <label htmlFor="login-email">
            Email Address <span className={isFieldRequired('email') ? 'required-asterisk' : ''}>*</span>
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={(e) => handleBlur('email', e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isLoading}
            className="auth-input"
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="login-password">
            Password <span className={isFieldRequired('password') ? 'required-asterisk' : ''}>*</span>
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onBlur={(e) => handleBlur('password', e.target.value)}
            placeholder="Enter your password"
            required
            disabled={isLoading}
            className="auth-input"
            aria-invalid={!!errors.password}
            autoComplete="current-password"
          />
        </div>

        <div className="auth-form-options">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              disabled={isLoading}
            />
            Remember me
          </label>
          <button
            type="button"
            className="auth-link-button"
            onClick={handleForgotPassword}
            disabled={isLoading}
          >
            Forgot password?
          </button>
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
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="auth-link-button"
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
