import { useState } from 'react';
import { VerificationMethod } from '../../../types/verification';
import { useTimer } from './modules/useTimer';
import { useVerificationFlow } from './modules/useVerificationFlow';

// Import split components
import { useVerificationModalHandlers } from './useVerificationModal.handlers';
import { useVerificationModalEffects } from './useVerificationModal.effects';
import { 
  resetOtpState, 
  updateResendCount, 
  formatTime, 
  handleErrorClear 
} from './useVerificationModal.utils';

export const useVerificationModal = (
  registrationData: {
    firstName: string;
    lastName: string;
    cardReceiptNumber: string;
  },
  onVerificationSuccess: (user: any, token: string) => void,
  onClose: () => void
) => {
  const [step, setStep] = useState<'method-selection' | 'sending' | 'otp' | 'success' | 'error'>('method-selection');
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);
  const [otp, setOtp] = useState('');
  const [maskedContact, setMaskedContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [isProfileLocked, setIsProfileLocked] = useState(false);

  const { timeLeft, setTimeLeft, expiryTime, setExpiryTime, stopTimer, resetTimer } = useTimer(step, maxAttemptsReached);

  // Use split effects
  useVerificationModalEffects(
    registrationData,
    setIsProfileLocked,
    setError,
    setStep,
    timeLeft,
    resendCount,
    selectedMethod,
    step,
    error,
    setMaxAttemptsReached,
    stopTimer,
    setResendCount,
    maskedContact
  );

  // Use split handlers
  const { handleOtpSubmit } = useVerificationModalHandlers(
    otp,
    selectedMethod,
    setIsLoading,
    setError,
    setStep,
    onVerificationSuccess,
    onClose,
    stopTimer,
    setMaxAttemptsReached
  );

  const { handleMethodSelect, handleResendOtp } = useVerificationFlow({
    registrationData,
    setSelectedMethod,
    setStep,
    setMaskedContact,
    setExpiryTime,
    setTimeLeft,
    setError,
    setIsLoading,
    selectedMethod,
    onResetOtpState: () => resetOtpState(setOtp, setError, setMaxAttemptsReached, resetTimer),
    onResendCountUpdate: updateResendCount(setResendCount),
    isProfileLocked
  });

  // CLEAN CLOSE HANDLER - just call the original onClose directly
  const handleClose = () => {
    console.log('useVerificationModal - Direct close called, calling onClose');
    console.log('onClose function:', onClose);
    onClose();
  };

  return {
    step,
    selectedMethod,
    otp,
    maskedContact,
    timeLeft,
    isLoading,
    error,
    resendCount,
    isProfileLocked,
    handleMethodSelect,
    handleOtpSubmit,
    handleResendOtp,
    handleClose,
    formatTime,
    setOtp,
    setStep,
    onErrorClear: () => handleErrorClear(setError),
    resetOtpState: () => resetOtpState(setOtp, setError, setMaxAttemptsReached, resetTimer)
  };
};
