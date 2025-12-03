import { VerificationMethod, VerificationRequest } from '../../../../types/verification';
import { verificationService } from '../../../../services/verificationService';

interface UseVerificationFlowProps {
  registrationData: {
    firstName: string;
    lastName: string;
    cardReceiptNumber: string;
  };
  setSelectedMethod: (method: VerificationMethod | null) => void;
  setStep: (step: 'method-selection' | 'sending' | 'otp' | 'success' | 'error') => void;
  setMaskedContact: (contact: string) => void;
  setExpiryTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
  setError: (error: string) => void;
  setIsLoading: (loading: boolean) => void;
  selectedMethod: VerificationMethod | null;
  onResetOtpState?: () => void;
  onResendCountUpdate?: (updater: (prev: number) => number) => void;
  isProfileLocked?: boolean;
}

export const useVerificationFlow = ({
  registrationData,
  setSelectedMethod,
  setStep,
  setMaskedContact,
  setExpiryTime,
  setTimeLeft,
  setError,
  setIsLoading,
  selectedMethod,
  onResetOtpState,
  onResendCountUpdate,
  isProfileLocked = false
}: UseVerificationFlowProps) => {
  const handleVerificationRequest = async (method: VerificationMethod, isResend: boolean = false) => {
    console.log('Starting verification request for method:', method, 'isResend:', isResend);

    // CHECK PROFILE LOCK STATUS BEFORE SENDING OTP
    const canResend = verificationService.canResendOtp(registrationData.cardReceiptNumber);
    if (!canResend.canResend) {
      console.log('Profile is locked, blocking OTP request');
      throw new Error(canResend.message || 'This profile has been locked due to too many verification attempts.');
    }

    const verificationRequest: VerificationRequest = {
      ...registrationData,
      method
    };

    console.log('Sending verification request:', verificationRequest);

    const response = await verificationService.requestVerification(verificationRequest);

    console.log('Verification response received:', response);

    setMaskedContact(response.maskedContact || '');
    const newExpiryTime = response.expiresIn || 60;
    setExpiryTime(newExpiryTime);
    setTimeLeft(newExpiryTime);
    setStep('otp');

    if (isResend && onResendCountUpdate) {
      onResendCountUpdate((prevCount: number) => prevCount + 1);
    }
  };

  const handleMethodSelect = async (method: VerificationMethod) => {
    console.log('Method selected:', method);

    // CHECK PROFILE LOCK STATUS BEFORE PROCEEDING
    const canResend = verificationService.canResendOtp(registrationData.cardReceiptNumber);
    if (!canResend.canResend) {
      console.log('Profile is locked, blocking method selection');
      setError(canResend.message || 'This profile has been locked due to too many verification attempts.');
      setStep('error');
      return;
    }

    setIsLoading(true);
    setError('');
    setSelectedMethod(method);
    setStep('sending');

    try {
      await handleVerificationRequest(method, false);
      console.log('Verification request completed, should be on OTP step');
    } catch (err) {
      console.error('Verification request failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      setStep('error');
      setSelectedMethod(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!selectedMethod) return;

    console.log('Resending OTP for method:', selectedMethod);

    // CHECK PROFILE LOCK STATUS BEFORE RESENDING
    const canResend = verificationService.canResendOtp(registrationData.cardReceiptNumber);
    if (!canResend.canResend) {
      console.log('Profile is locked, blocking OTP resend');
      setError(canResend.message || 'This profile has been locked due to too many verification attempts.');
      setStep('error');
      return;
    }

    setIsLoading(true);
    setError('');
    setStep('sending');

    if (onResetOtpState) {
      onResetOtpState();
    }

    try {
      await handleVerificationRequest(selectedMethod, true);
      console.log('OTP resend completed');
    } catch (err) {
      console.error('OTP resend failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      setError(errorMessage);
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleMethodSelect,
    handleResendOtp
  };
};
