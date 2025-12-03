import { useEffect } from 'react';
import { verificationService } from '../../../services/verificationService';

export const useVerificationModalEffects = (
  registrationData: any,
  setIsProfileLocked: (locked: boolean) => void,
  setError: (error: string) => void,
  setStep: (step: any) => void,
  timeLeft: number,
  resendCount: number,
  selectedMethod: any,
  step: any,
  error: string,
  setMaxAttemptsReached: (reached: boolean) => void,
  stopTimer: () => void,
  setResendCount: (count: number) => void,
  maskedContact: string
) => {
  // CHECK PROFILE LOCK STATUS ON INITIAL LOAD AND IMMEDIATELY SHOW ERROR SCREEN
  useEffect(() => {
    const checkProfileLockStatus = async () => {
      try {
        console.log('Checking profile lock status for:', registrationData.cardReceiptNumber);
        const canResend = verificationService.canResendOtp(registrationData.cardReceiptNumber);
        console.log('Profile lock status:', canResend);

        if (!canResend.canResend) {
          setIsProfileLocked(true);
          setError(canResend.message || 'This profile has been locked due to too many verification attempts.');
          setStep('error');
        } else {
          setIsProfileLocked(false);
        }
      } catch (err) {
        console.error('Error checking profile lock status:', err);
      }
    };

    checkProfileLockStatus();
  }, [registrationData.cardReceiptNumber]);

  // Detect when max attempts are reached and stop the timer
  useEffect(() => {
    if (error && error.includes('Too many incorrect attempts')) {
      console.log('Max attempts reached, stopping timer');
      setMaxAttemptsReached(true);
      stopTimer();
    }
  }, [error, stopTimer]);

  // Handle timer expiration - IMMEDIATELY navigate to error screen for final attempt
  useEffect(() => {
    if (timeLeft === 0 && resendCount >= 3 && selectedMethod && step === 'otp') {
      console.log('Final attempt timer expired, IMMEDIATELY navigating to error screen');
      setError('Verification failed. You have used all available attempts. Please contact support.');
      setStep('error');
    }
  }, [timeLeft, resendCount, selectedMethod, step]);

  // Reset max attempts flag when starting new OTP session
  useEffect(() => {
    if (step === 'sending') {
      setMaxAttemptsReached(false);
    }
  }, [step]);

  // Update resend count when we start a new verification (first time)
  useEffect(() => {
    if (step === 'otp' && maskedContact && resendCount === 0) {
      console.log('First OTP request, setting resend count to 1');
      setResendCount(1);
    }
  }, [step, maskedContact, resendCount]);
};
