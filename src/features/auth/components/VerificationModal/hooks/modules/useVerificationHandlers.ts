import { VerificationMethod, VerificationRequest } from '../../../../types/verification';
import { verificationService } from '../../../../services/verificationService';

interface UseVerificationHandlersProps {
  cardReceiptNumber: string;
  selectedMethod: VerificationMethod | null;
  setStep: (step: 'method-selection' | 'sending' | 'otp' | 'success' | 'error') => void;
  setError: (error: string) => void;
  setIsLoading: (loading: boolean) => void;
  setMaskedContact: (contact: string) => void;
  setOtp: (otp: string) => void;
}

export const useVerificationHandlers = ({
  cardReceiptNumber,
  selectedMethod,
  setStep,
  setError,
  setIsLoading,
  setMaskedContact,
  setOtp
}: UseVerificationHandlersProps) => {
  const handleSendOtp = async (): Promise<void> => {
    console.log('Verification Handler - Sending OTP');
    
    if (!selectedMethod) {
      const errorMsg = 'Please select a verification method';
      console.log('Verification Handler - No method selected');
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Verification Handler - Starting verification for:', cardReceiptNumber);
      
      const requestData: VerificationRequest = {
        cardReceiptNumber,
        method: selectedMethod
      };

      console.log('Verification Handler - Request data:', requestData);

      const response = await verificationService.requestVerification(requestData);
      console.log('Verification Handler - Verification response:', response);

      if (response.success) {
        console.log('Verification Handler - OTP sent successfully');
        setMaskedContact(response.maskedContact || '');
        setStep('otp');
        setOtp(''); // Clear any previous OTP
      } else {
        const errorMsg = response.message || 'Failed to send verification code';
        console.log('Verification Handler - OTP send failed:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Verification Handler - Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification code';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSendOtp
  };
};
