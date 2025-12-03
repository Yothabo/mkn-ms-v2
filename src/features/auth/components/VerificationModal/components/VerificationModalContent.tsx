import React from 'react';
import { VerificationMethod } from '../../../../types/verification';
import { VerificationMethodSelection } from './VerificationMethodSelection';
import { VerificationSendingState } from './VerificationSendingState';
import { VerificationOtpStep } from './VerificationOtpStep';
import { VerificationSuccessState } from './VerificationSuccessState';
import { VerificationErrorState } from './VerificationErrorState';
import styles from '../VerificationModal.module.css';

interface VerificationModalContentProps {
  step: 'method-selection' | 'sending' | 'otp' | 'success' | 'error';
  selectedMethod: VerificationMethod | null;
  otp: string;
  maskedContact: string;
  timeLeft: number;
  isLoading: boolean;
  error: string;
  resendCount: number;
  isProfileLocked?: boolean;
  onMethodSelect: (method: VerificationMethod) => void;
  onOtpSubmit: () => void;
  onResendOtp: () => void;
  onClose: () => void;
  formatTime: (seconds: number) => string;
  onOtpChange: (otp: string) => void;
  onStepChange: (step: 'method-selection' | 'sending' | 'otp' | 'success' | 'error') => void;
  onErrorClear: () => void;
  hideHeader?: boolean;
}

export const VerificationModalContent: React.FC<VerificationModalContentProps> = ({
  step,
  selectedMethod,
  otp,
  maskedContact,
  timeLeft,
  isLoading,
  error,
  resendCount,
  isProfileLocked = false,
  onMethodSelect,
  onOtpSubmit,
  onResendOtp,
  onClose,
  formatTime,
  onOtpChange,
  onStepChange,
  onErrorClear,
  hideHeader = false
}) => {
  // Show profile locked error state
  if (isProfileLocked) {
    return (
      <VerificationErrorState
        error={error}
        onClose={onClose}
        hideHeader={hideHeader}
        isCardLocked={true}
      />
    );
  }

  switch (step) {
    case 'method-selection':
      return (
        <VerificationMethodSelection
          onMethodSelect={onMethodSelect}
          isLoading={isLoading}
          error={error}
          onErrorClear={onErrorClear}
          hideHeader={hideHeader}
        />
      );

    case 'sending':
      return (
        <VerificationSendingState
          selectedMethod={selectedMethod}
          hideHeader={hideHeader}
        />
      );

    case 'otp':
      return (
        <VerificationOtpStep
          selectedMethod={selectedMethod}
          otp={otp}
          maskedContact={maskedContact}
          timeLeft={timeLeft}
          isLoading={isLoading}
          error={error}
          resendCount={resendCount}
          onOtpSubmit={onOtpSubmit}
          onResendOtp={onResendOtp}
          onClose={onClose}
          formatTime={formatTime}
          onOtpChange={onOtpChange}
          onStepChange={onStepChange}
          onErrorClear={onErrorClear}
          hideHeader={hideHeader}
        />
      );

    case 'success':
      return (
        <VerificationSuccessState
          onClose={onClose}
          hideHeader={hideHeader}
        />
      );

    case 'error':
      return (
        <VerificationErrorState
          error={error}
          onClose={onClose}
          hideHeader={hideHeader}
          isCardLocked={false}
        />
      );

    default:
      return null;
  }
};
