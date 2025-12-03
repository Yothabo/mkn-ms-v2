import { useState, useCallback } from 'react';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  cardReceiptNumber: string;
  password: string;
  confirmPassword: string;
}

export const useRegisterForm = (onClose?: () => void) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    cardReceiptNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleFieldChange = useCallback((field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  }, [error]);

  const handleAcceptedTermsChange = useCallback((accepted: boolean) => {
    setAcceptedTerms(accepted);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.cardReceiptNumber.trim()) {
        throw new Error('Please fill in all required fields');
      }

      if (!acceptedTerms) {
        throw new Error('Please accept the terms and conditions');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      setShowVerificationModal(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [formData, acceptedTerms]);

  const handleVerificationSuccess = useCallback(async (user: any, token: string) => {
    console.log('Registration verification successful');

    try {
      // Mark verification as successful but DO NOT login yet
      setVerificationSuccess(true);
      setShowVerificationModal(false);
      console.log('Registration completed successfully - waiting for user to click continue');
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
      setShowVerificationModal(false);
    }
  }, []);

  const handleVerificationClose = useCallback(() => {
    console.log('Closing verification modal immediately');
    setShowVerificationModal(false);
  }, []);

  return {
    formData,
    acceptedTerms,
    isLoading,
    error,
    showVerificationModal,
    verificationSuccess,
    handleFieldChange,
    handleAcceptedTermsChange,
    handleSubmit,
    handleVerificationSuccess,
    handleVerificationClose
  };
};
