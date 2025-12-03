import React from 'react';
import { useAuth } from '../../../../shared/context/AuthContext';
import styles from "../AuthModal/AuthModal.module.css";
import { VerificationModal } from '../VerificationModal/VerificationModal';
import { RegisterFormContent } from './components/RegisterFormContent';
import { useRegisterForm } from './hooks/useRegisterForm';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onShowTerms: () => void;
  onClose?: () => void;
  onSuccess?: (formData: { cardReceiptNumber: string; password: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
  onShowTerms,
  onClose,
  onSuccess
}) => {
  const { login } = useAuth();
  const {
    formData,
    acceptedTerms,
    isLoading,
    error,
    showVerificationModal,
    verificationSuccess,
    handleFieldChange,
    handleAcceptedTermsChange,
    handleSubmit,
    handleVerificationSuccess,
    handleVerificationClose
  } = useRegisterForm(onClose);

  console.log('=== REGISTER FORM RENDER ===');
  console.log('showVerificationModal:', showVerificationModal);
  console.log('verificationSuccess:', verificationSuccess);

  // Call onSuccess when verification is successful
  React.useEffect(() => {
    if (verificationSuccess && onSuccess) {
      onSuccess({
        cardReceiptNumber: formData.cardReceiptNumber,
        password: formData.password
      });
    }
  }, [verificationSuccess, onSuccess, formData]);

  // If verification modal is showing, don't render the form
  if (showVerificationModal) {
    console.log('=== SHOWING VERIFICATION MODAL ===');
    return (
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={handleVerificationClose} // This should ONLY close the verification modal
        onVerificationSuccess={handleVerificationSuccess}
        registrationData={{
          firstName: formData.firstName,
          lastName: formData.lastName,
          cardReceiptNumber: formData.cardReceiptNumber
        }}
        hideHeader={true}
      />
    );
  }

  return (
    <RegisterFormContent
      formData={formData}
      acceptedTerms={acceptedTerms}
      isLoading={isLoading}
      error={error}
      onFieldChange={handleFieldChange}
      onAcceptedTermsChange={handleAcceptedTermsChange}
      onSubmit={handleSubmit}
      onSwitchToLogin={onSwitchToLogin}
      onShowTerms={onShowTerms}
    />
  );
};

export default RegisterForm;
