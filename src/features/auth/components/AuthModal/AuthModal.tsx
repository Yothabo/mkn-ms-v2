import React, { useState } from 'react';
import { useAuth } from '../../../../shared/context/AuthContext';
import { LoginForm } from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import { Modal } from '../../../../shared/ui/Modal/Modal';

// Import single source of truth styles
import styles from './AuthModal.module.css';

// Import split components
import { useAuthModalHandlers } from './AuthModal.handlers';
import { useAuthModalActions } from './AuthModal.actions';
import { 
  getModalTitle, 
  getModalSize, 
  getModalVariant, 
  showBackButton, 
  showCloseButton, 
  handleBack 
} from './AuthModal.helpers';
import { RegisterSuccessState, ForgotPasswordSuccessState } from './AuthModal.successStates';
import { TermsContent } from './AuthModal.terms';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register' | 'forgot-password';
}

export type AuthView = 'login' | 'register' | 'forgot-password' | 'terms' | 'register-success' | 'forgot-password-success';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultView = 'login'
}) => {
  const { login } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>(defaultView);
  const [registerFormData, setRegisterFormData] = useState({ cardReceiptNumber: '', password: '' });
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState({ cardReceiptNumber: '', newPassword: '' });

  const handlers = useAuthModalHandlers(
    setCurrentView,
    setRegisterFormData,
    setForgotPasswordFormData,
    defaultView,
    onClose
  );

  const { handleContinueToApp } = useAuthModalActions(login, handlers.handleClose);

  // Show success state for registration
  if (currentView === 'register-success') {
    return (
      <RegisterSuccessState
        isOpen={isOpen}
        onClose={handlers.handleClose}
        title={getModalTitle(currentView)}
        showCloseButton={showCloseButton(currentView)}
        showBackButton={showBackButton(currentView)}
        onBack={() => handleBack(currentView, setCurrentView)}
        size={getModalSize(currentView)}
        variant={getModalVariant()}
        type="register"
        onContinue={() => handleContinueToApp(currentView, registerFormData, forgotPasswordFormData)}
      />
    );
  }

  // Show success state for forgot password
  if (currentView === 'forgot-password-success') {
    return (
      <ForgotPasswordSuccessState
        isOpen={isOpen}
        onClose={handlers.handleClose}
        title={getModalTitle(currentView)}
        showCloseButton={showCloseButton(currentView)}
        showBackButton={showBackButton(currentView)}
        onBack={() => handleBack(currentView, setCurrentView)}
        size={getModalSize(currentView)}
        variant={getModalVariant()}
        type="forgot-password"
        onContinue={() => handleContinueToApp(currentView, registerFormData, forgotPasswordFormData)}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handlers.handleClose}
      title={getModalTitle(currentView)}
      showCloseButton={showCloseButton(currentView)}
      showBackButton={showBackButton(currentView)}
      onBack={() => handleBack(currentView, setCurrentView)}
      size={getModalSize(currentView)}
      variant={getModalVariant()}
    >
      <div className={styles.authModalContent}>
        {currentView === 'login' && (
          <LoginForm
            onSwitchToRegister={handlers.handleSwitchToRegister}
            onForgotPassword={handlers.handleSwitchToForgotPassword}
          />
        )}

        {currentView === 'register' && (
          <RegisterForm
            onSwitchToLogin={handlers.handleSwitchToLogin}
            onShowTerms={handlers.handleSwitchToTerms}
            onClose={handlers.handleVerificationModalClose}
            onSuccess={handlers.handleRegisterSuccess}
          />
        )}

        {currentView === 'forgot-password' && (
          <ForgotPassword
            onSwitchToLogin={handlers.handleSwitchToLogin}
            onClose={handlers.handleVerificationModalClose}
            onSuccess={handlers.handleForgotPasswordSuccess}
          />
        )}

        {currentView === 'terms' && <TermsContent />}
      </div>
    </Modal>
  );
};
