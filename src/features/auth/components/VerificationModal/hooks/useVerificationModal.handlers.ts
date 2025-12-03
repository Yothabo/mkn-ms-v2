import { verificationService } from '../../../services/verificationService';

export const useVerificationModalHandlers = (
  otp: string,
  selectedMethod: any,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string) => void,
  setStep: (step: any) => void,
  onVerificationSuccess: (user: any, token: string) => void,
  onClose: () => void,
  stopTimer: () => void,
  setMaxAttemptsReached: (reached: boolean) => void
) => {
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

      const verifyRequest = {
        contact: '',
        otp,
        method: selectedMethod
      };

      console.log('OTP Handler - Verify request:', verifyRequest);

      const response = await verificationService.verifyOtp(verifyRequest);
      console.log('OTP Handler - Verification response:', response);

      if (response.message === 'system_cleanup') {
        console.log('OTP Handler - System cleanup detected, no error shown to user');
        setStep('otp');
        return;
      }

      if (response.success && response.user && response.token) {
        console.log('OTP Handler - OTP verification successful, calling onVerificationSuccess');
        onVerificationSuccess(response.user, response.token!);
        onClose();
      } else {
        const errorMsg = 'Verification failed - invalid response from server';
        console.log('OTP Handler -', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('OTP Handler - OTP verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Verification failed. Please check the code and try again.';
      setError(errorMessage);

      if (errorMessage.includes('Verification failed. You have used all available attempts')) {
        console.log('OTP Handler - Final verification failed, IMMEDIATELY navigating to error screen');
        setStep('error');
        setMaxAttemptsReached(true);
        stopTimer();
      } else {
        setStep('otp');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleOtpSubmit
  };
};
