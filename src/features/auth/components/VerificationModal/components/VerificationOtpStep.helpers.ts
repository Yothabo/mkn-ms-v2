export const getErrorMessage = (
  timeLeft: number,
  resendCount: number,
  error: string | undefined
): string | null => {
  if (timeLeft === 0 && resendCount >= 3) {
    return null; // Don't show inline error - navigation will handle it
  }
  if (timeLeft === 0) {
    return 'Code expired. Please request a new one.';
  }
  return error || null;
};

export const getTimeDisplay = (timeLeft: number, resendCount: number): string => {
  if (timeLeft > 0) {
    return `Time left: ${formatTime(timeLeft)}`;
  }
  if (resendCount >= 3) {
    return 'Final attempt used';
  }
  return 'Code expired';
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const shouldShowResendButton = (
  timeLeft: number,
  resendCount: number,
  error: string | undefined
): boolean => {
  const isFinalAttempt = resendCount >= 3;
  return timeLeft === 0 && !isFinalAttempt && !error?.includes('Verification failed');
};
