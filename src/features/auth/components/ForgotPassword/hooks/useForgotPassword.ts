import { useState } from 'react';

export const useForgotPassword = (onClose?: () => void) => {
  const [formData, setFormData] = useState({
    cardReceiptNumber: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form only - don't check member existence here
    if (!formData.cardReceiptNumber.trim()) {
      setError('Please enter your card or receipt number');
      return;
    }

    if (!formData.newPassword) {
      setError('Please enter a new password');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Show verification modal - let the verification service handle member lookup
    setShowVerificationModal(true);
  };

  const handleVerificationSuccess = async (user: any, token: string) => {
    try {
      setIsLoading(true);

      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would call an API to reset the password
      console.log('Password reset successful for:', user);
      console.log('New password:', formData.newPassword);

      // Mark verification as successful but DO NOT login yet
      setVerificationSuccess(true);
      setShowVerificationModal(false);

    } catch (err) {
      console.error('Password reset failed:', err);
      throw new Error('Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationClose = () => {
    setShowVerificationModal(false);
  };

  return {
    formData,
    isLoading: isLoading,
    error,
    showVerificationModal,
    verificationSuccess,
    handleFieldChange,
    handleSubmit,
    handleVerificationSuccess,
    handleVerificationClose
  };
};
