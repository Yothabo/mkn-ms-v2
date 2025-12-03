import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../shared/context/AuthContext';
import styles from "../AuthModal/AuthModal.module.css";
import { VerificationModal } from '../VerificationModal/VerificationModal';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { useForgotPassword } from './hooks/useForgotPassword';
import { forgotPasswordService } from '../../services/forgotPasswordService';

interface ForgotPasswordProps {
  onSwitchToLogin: () => void;
  onClose?: () => void;
  onSuccess?: (formData: { cardReceiptNumber: string; newPassword: string }) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSwitchToLogin,
  onClose,
  onSuccess
}) => {
  const { login } = useAuth();
  const {
    formData,
    isLoading,
    error,
    showVerificationModal,
    verificationSuccess,
    handleFieldChange,
    handleSubmit,
    handleVerificationSuccess,
    handleVerificationClose
  } = useForgotPassword(onClose);

  const [verificationData, setVerificationData] = useState<{
    firstName: string;
    lastName: string;
    cardReceiptNumber: string;
  } | null>(null);

  // When verification modal should show, lookup member details
  useEffect(() => {
    if (showVerificationModal && formData.cardReceiptNumber) {
      console.log('Looking up member for verification...');
      try {
        const memberData = forgotPasswordService.lookupMemberForVerification(formData.cardReceiptNumber);
        setVerificationData({
          firstName: memberData.firstName,
          lastName: memberData.lastName,
          cardReceiptNumber: memberData.cardReceiptNumber
        });
      } catch (error) {
        console.error('Member lookup failed:', error);
        // Close verification modal
        handleVerificationClose();
      }
    }
  }, [showVerificationModal, formData.cardReceiptNumber, handleVerificationClose]);

  // Call onSuccess when verification is successful
  useEffect(() => {
    if (verificationSuccess && onSuccess) {
      onSuccess({
        cardReceiptNumber: formData.cardReceiptNumber,
        newPassword: formData.newPassword
      });
    }
  }, [verificationSuccess, onSuccess, formData]);

  // If verification modal is showing, render the modal (same pattern as RegisterForm)
  if (showVerificationModal && verificationData) {
    return (
      <VerificationModal
        isOpen={showVerificationModal} // Use hook state for visibility
        onClose={handleVerificationClose} // Single function from hook (same as RegisterForm)
        onVerificationSuccess={(user, token) => {
          // After successful verification, show success state
          handleVerificationSuccess(user, token);
        }}
        registrationData={verificationData}
        hideHeader={true}
      />
    );
  }

  // Show the main form
  return (
    <ForgotPasswordForm
      formData={formData}
      isLoading={isLoading}
      error={error}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
      onSwitchToLogin={onSwitchToLogin}
    />
  );
};
