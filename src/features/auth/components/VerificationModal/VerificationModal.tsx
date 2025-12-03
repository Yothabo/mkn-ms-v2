import React from 'react';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { VerificationModalContent } from './components/VerificationModalContent';
import { useVerificationModal } from './hooks/useVerificationModal';
import styles from './VerificationModal.module.css';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationSuccess: (user: any, token: string) => void;
  registrationData: {
    firstName: string;
    lastName: string;
    cardReceiptNumber: string;
  };
  hideHeader?: boolean;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationSuccess,
  registrationData,
  hideHeader = false
}) => {
  const {
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
    formatTime,
    setOtp,
    setStep,
    onErrorClear
  } = useVerificationModal(registrationData, onVerificationSuccess, onClose);

  const getModalTitle = () => {
    switch (step) {
      case 'method-selection':
        return 'Choose Verification Method';
      case 'sending':
        return 'Sending Code';
      case 'otp':
        return 'Enter Verification Code';
      case 'error':
        return 'Verification Failed';
      default:
        return 'Verification';
    }
  };

  const getModalSize = () => {
    switch (step) {
      case 'method-selection':
      case 'otp':
        return 'sm';
      case 'error':
        return 'md';
      default:
        return 'sm';
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size={getModalSize()}
    >
      <div className={styles.verificationModalContent}>
        <VerificationModalContent
          step={step}
          selectedMethod={selectedMethod}
          otp={otp}
          maskedContact={maskedContact}
          timeLeft={timeLeft}
          isLoading={isLoading}
          error={error}
          resendCount={resendCount}
          isProfileLocked={isProfileLocked}
          onMethodSelect={handleMethodSelect}
          onOtpSubmit={handleOtpSubmit}
          onResendOtp={handleResendOtp}
          onClose={onClose}
          formatTime={formatTime}
          onOtpChange={setOtp}
          onStepChange={setStep}
          onErrorClear={onErrorClear}
          hideHeader={hideHeader}
        />
      </div>
    </Modal>
  );
};
