interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  branch?: string;
  agreeToTerms?: string;
  submit?: string;
}

export const validateField = (name: string, value: any): string => {
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
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
        return 'Password must contain uppercase, lowercase, and numbers';
      return '';
    case 'confirmPassword':
      if (!value) return 'Please confirm your password';
      if (value !== value) return 'Passwords do not match';
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

export const validateForm = (formData: any): { errors: FormErrors; isValid: boolean } => {
  const errors: FormErrors = {};
  errors.fullName = validateField('fullName', formData.fullName);
  errors.email = validateField('email', formData.email);
  errors.password = validateField('password', formData.password);
  errors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
  errors.branch = validateField('branch', formData.branch);
  errors.agreeToTerms = validateField('agreeToTerms', formData.agreeToTerms);

  const isValid = !Object.values(errors).some((error) => error);
  return { errors, isValid };
};
