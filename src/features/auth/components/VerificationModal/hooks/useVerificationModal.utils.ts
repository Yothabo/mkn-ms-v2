export const resetOtpState = (
  setOtp: (otp: string) => void,
  setError: (error: string) => void,
  setMaxAttemptsReached: (reached: boolean) => void,
  resetTimer: () => void
) => {
  console.log('Resetting OTP state for fresh start');
  setOtp('');
  setError('');
  setMaxAttemptsReached(false);
  resetTimer();
};

export const updateResendCount = (
  setResendCount: (updater: (prev: number) => number) => void
) => {
  return (updater: (prev: number) => number) => {
    setResendCount(prev => {
      const newCount = updater(prev);
      console.log('Updating resend count to:', newCount);
      return newCount;
    });
  };
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const handleErrorClear = (setError: (error: string) => void) => {
  setError('');
};
