export const handleOtpChange = (
  value: string,
  error: string | undefined,
  onOtpChange: (otp: string) => void,
  onErrorClear: () => void
): void => {
  console.log('OTP Step - Raw input:', value);
  // Only allow numbers and limit to 6 digits
  const numericValue = value.replace(/\D/g, '').slice(0, 6);
  console.log('OTP Step - Processed OTP:', numericValue);

  // Clear error when user starts typing again (but not for terminal errors)
  if (error && numericValue.length > 0 && error.includes('Invalid OTP code')) {
    console.log('OTP Step - Clearing error because user is typing again');
    onErrorClear();
  }

  onOtpChange(numericValue);
};
