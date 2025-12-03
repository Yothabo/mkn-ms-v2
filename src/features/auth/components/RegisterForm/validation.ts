export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  branch?: string;
  agreeToTerms?: string;
  submit?: string;
}

export const validateField = (name: string, value: any, formData?: any): string => {
  const validations: Record<string, () => string> = {
    fullName: () =>
      !value.trim()
        ? 'Full name is required'
        : value.trim().length < 2
        ? 'Full name must be at least 2 characters'
        : '',
    email: () =>
      !value
        ? 'Email is required'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? 'Please enter a valid email address'
        : '',
    password: () =>
      !value
        ? 'Password is required'
        : value.length < 8
        ? 'Password must be at least 8 characters'
        : !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)
        ? 'Password must contain uppercase, lowercase, and numbers'
        : '',
    confirmPassword: () =>
      !value
        ? 'Please confirm your password'
        : value !== formData?.password
        ? 'Passwords do not match'
        : '',
    branch: () => (!value ? 'Please select a branch' : ''),
    agreeToTerms: () => (!value ? 'You must agree to the terms and conditions' : ''),
  };
  return validations[name]?.() || '';
};
