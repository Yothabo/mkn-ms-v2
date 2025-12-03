import { VerificationMethod, VerifyOtpRequest } from '../../../../types/verification';
import { verificationService } from '../../../../services/verificationService';

interface UseOtpHandlersProps {
  otp: string;
  selectedMethod: VerificationMethod | null;
  setStep: (step: 'method-selection' | 'sending' | 'otp' | 'success' | 'error') => void;
  setError: (error: string) => void;
  setIsLoading: (loading: boolean) => void;
  onVerificationSuccess: (user: any, token: string) => void;
  onClose: () => void;
}

export const useOtpHandlers = ({
  otp,
  selectedMethod,
  setStep,
  setError,
  setIsLoading,
  onVerificationSuccess,
  onClose
}: UseOtpHandlersProps) => {
  const handleOtpSubmit = async () => {
    console.log('OTP Handler - Submit triggered');
    console.log('OTP Handler - OTP:', otp, 'Length:', otp.length);
    console.log('OTP Handler - Selected method:', selectedMethod);

    if (otp.length !== 6) {
      const errorMsg = `Please enter a complete 6-digit OTP (currently ${otp.length}/6 digits)`;
      console.log('OTP Handler - Invalid OTP length:', errorMsg);
      setError(errorMsg);
      return;
    }

    if (!selectedMethod) {
      const errorMsg = 'No verification method selected. Please go back and choose a method.';
      console.log('OTP Handler - No method selected');
      setError(errorMsg);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('OTP Handler - Submitting OTP for verification...');

      const verifyRequest: VerifyOtpRequest = {
        contact: '', // The service will find the contact based on stored OTP
        otp,
        method: selectedMethod
      };

      console.log('OTP Handler - Verify request:', verifyRequest);

      const response = await verificationService.verifyOtp(verifyRequest);
      console.log('OTP Handler - Verification response:', response);

      // Handle silent system cleanup - no error shown to user
      if (response.message === 'system_cleanup') {
        console.log('OTP Handler - System cleanup detected, no error shown to user');
        // Just stay on OTP step without showing any error
        setStep('otp');
        return;
      }

      if (response.success && response.user && response.token) {
        console.log('OTP Handler - OTP verification successful, moving to success step');
        setStep('success');
        
        // Wait a moment to show success state, then call the success callback
        setTimeout(() => {
          console.log('OTP Handler - Calling onVerificationSuccess with user:', response.user);
          onVerificationSuccess(response.user, response.token!);
          onClose();
        }, 1500);
      } else {
        const errorMsg = 'Verification failed - invalid response from server';
        console.log('OTP Handler -', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('OTP Handler - OTP verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Verification failed. Please check the code and try again.';
      setError(errorMessage);
      
      // If it's a final verification failed error, go to error step
      if (errorMessage.includes('Verification failed. You have used all available attempts')) {
        console.log('OTP Handler - Final verification failed, moving to error step');
        setStep('error');
      } else {
        // Stay on OTP step to allow retry for normal errors
        setStep('otp');
      }
    } finally {
      console.log('OTP Handler - Setting isLoading to false');
      setIsLoading(false);
    }
  };

  return {
    handleOtpSubmit
  };
};
