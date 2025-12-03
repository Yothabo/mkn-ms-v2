import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import styles from '../VerificationModal.module.css';

// Import split components
import { useVerificationOtpHooks } from './VerificationOtpStep.hooks';
import { 
  getErrorMessage, 
  getTimeDisplay, 
  shouldShowResendButton 
} from './VerificationOtpStep.helpers';
import { handleOtpChange } from './VerificationOtpStep.utils';

interface VerificationOtpStepProps {
  selectedMethod: VerificationMethod | null;
  otp: string;
  maskedContact: string;
  timeLeft: number;
  isLoading: boolean;
  error?: string;
  resendCount?: number;
  onOtpSubmit: () => void;
  onResendOtp: () => void;
  onClose: () => void;
  onStepChange: (step: 'method-selection' | 'sending' | 'otp' | 'success' | 'error') => void;
  formatTime: (seconds: number) => string;
  onOtpChange: (otp: string) => void;
  onErrorClear: () => void;
  hideHeader?: boolean;
}

export const VerificationOtpStep: React.FC<VerificationOtpStepProps> = ({
  maskedContact,
  timeLeft,
  otp,
  onOtpChange,
  onOtpSubmit,
  onResendOtp,
  isLoading,
  error,
  onErrorClear,
  resendCount = 0,
}) => {
  useVerificationOtpHooks(otp, isLoading, error, onOtpSubmit, onOtpChange, onErrorClear);

  const displayError = getErrorMessage(timeLeft, resendCount, error);
  const showResendButton = shouldShowResendButton(timeLeft, resendCount, error);

  return (
    <div className={styles.otpVerification}>
      <div className={styles.otpSentMessage}>
        <div className={styles.successIcon}>
          <IoCheckmarkCircle />
        </div>
        <h2>Code Sent!</h2>
        <p className={styles.otpSentText}>
          We sent a verification code to <span className={styles.maskedContact}>{maskedContact}</span>
        </p>
        <div className={styles.debugInfo}>
          <small>OTP: {otp.length}/6 digits | OTP resend: {resendCount} | {getTimeDisplay(timeLeft, resendCount)}</small>
        </div>
      </div>

      <div className={styles.otpForm}>
        <div className={styles.otpInputGroup}>
          <label className={styles.otpLabel} htmlFor="otp">
            Enter Verification Code
          </label>
          <input
            id="otp"
            type="text"
            className={`${styles.otpInput} ${displayError ? styles.otpInputError : ''}`}
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value, error, onOtpChange, onErrorClear)}
            disabled={isLoading || timeLeft === 0 || (error && (error.includes('Too many incorrect attempts') || error.includes('Verification failed')))}
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            autoFocus
            required
          />
          {displayError && (
            <div className={styles.otpErrorText}>
              {displayError}
            </div>
          )}
          {isLoading && (
            <div className={styles.verifyingOverlay}>
              <div className={styles.loadingSpinnerSmall}></div>
              <span>Verifying code...</span>
            </div>
          )}
        </div>

        <div className={styles.otpActions}>
          {showResendButton && (
            <button
              type="button"
              className={styles.resendButton}
              onClick={onResendOtp}
              disabled={isLoading}
            >
              {isLoading ? 'Resending...' : 'Resend Code'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
