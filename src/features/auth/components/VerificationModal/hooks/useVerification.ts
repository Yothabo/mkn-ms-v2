import { useState, useCallback } from 'react';
import { VerificationMethod } from '../../types/verification';
import { useOtpHandlers } from './modules/useOtpHandlers';
import { useVerificationHandlers } from './modules/useVerificationHandlers';

export const useVerification = (
  cardReceiptNumber: string,
  onVerificationSuccess: (user: any, token: string) => void,
  onClose: () => void
) => {
  const [step, setStep] = useState<'method-selection' | 'sending' | 'otp' | 'success' | 'error'>('method-selection');
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [maskedContact, setMaskedContact] = useState('');

  // Clear error when OTP changes to allow retry
  const handleOtpChange = useCallback((value: string) => {
    setOtp(value);
    if (error && value.length === 6) {
      setError('');
    }
  }, [error]);

  const verificationHandlers = useVerificationHandlers({
    cardReceiptNumber,
    selectedMethod,
    setStep,
    setError,
    setIsLoading,
    setMaskedContact,
    setOtp
  });

  const otpHandlers = useOtpHandlers({
    otp,
    selectedMethod,
    setStep,
    setError,
    setIsLoading,
    onVerificationSuccess,
    onClose
  });

  const handleMethodSelect = (method: VerificationMethod) => {
    setSelectedMethod(method);
    setError('');
  };

  const handleBackToMethodSelection = () => {
    setStep('method-selection');
    setError('');
    setOtp(''); // Reset OTP when going back
  };

  const handleResendOtp = async () => {
    if (!selectedMethod) return;
    
    setError('');
    setIsLoading(true);
    
    try {
      await verificationHandlers.handleSendOtp();
      setOtp(''); // Reset OTP on resend
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    selectedMethod,
    otp,
    error,
    isLoading,
    maskedContact,
    setStep,
    setError,
    handleOtpChange,
    handleMethodSelect,
    handleBackToMethodSelection,
    handleResendOtp,
    handleSendOtp: verificationHandlers.handleSendOtp,
    handleOtpSubmit: otpHandlers.handleOtpSubmit
  };
};
