import { useEffect } from 'react';

export const useVerificationOtpHooks = (
  otp: string,
  isLoading: boolean,
  error: string | undefined,
  onOtpSubmit: () => void,
  onOtpChange: (otp: string) => void,
  onErrorClear: () => void
) => {
  // Auto-submit when OTP reaches 6 digits
  useEffect(() => {
    console.log('OTP Step - OTP changed:', otp, 'Length:', otp.length, 'IsLoading:', isLoading);

    if (otp.length === 6 && !isLoading && !error) {
      console.log('OTP Step - Auto-submitting OTP:', otp);
      onOtpSubmit();
    }
  }, [otp, isLoading, error, onOtpSubmit]);

  // Clear OTP input when there's an error (failed attempt)
  useEffect(() => {
    if (error && otp.length === 6 && error.includes('Invalid OTP code')) {
      console.log('OTP Step - Clearing OTP input due to invalid code error');
      onOtpChange('');

      // Clear error after 5 seconds if user doesn't type
      const timer = setTimeout(() => {
        onErrorClear();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, otp.length, onOtpChange, onErrorClear]);
};
