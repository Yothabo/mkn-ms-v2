import { AuthView } from './AuthModal';

export const useAuthModalHandlers = (
  setCurrentView: (view: AuthView) => void,
  setRegisterFormData: (data: { cardReceiptNumber: string; password: string }) => void,
  setForgotPasswordFormData: (data: { cardReceiptNumber: string; newPassword: string }) => void,
  defaultView: AuthView,
  onClose: () => void
) => {
  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleSwitchToTerms = () => {
    setCurrentView('terms');
  };

  const handleClose = () => {
    setCurrentView(defaultView);
    setRegisterFormData({ cardReceiptNumber: '', password: '' });
    setForgotPasswordFormData({ cardReceiptNumber: '', newPassword: '' });
    onClose();
  };

  const handleVerificationModalClose = () => {
    console.log('Verification modal closed - not affecting AuthModal view');
  };

  const handleRegisterSuccess = (formData: { cardReceiptNumber: string; password: string }) => {
    setRegisterFormData(formData);
    setCurrentView('register-success');
  };

  const handleForgotPasswordSuccess = (formData: { cardReceiptNumber: string; newPassword: string }) => {
    setForgotPasswordFormData(formData);
    setCurrentView('forgot-password-success');
  };

  return {
    handleSwitchToLogin,
    handleSwitchToRegister,
    handleSwitchToForgotPassword,
    handleSwitchToTerms,
    handleClose,
    handleVerificationModalClose,
    handleRegisterSuccess,
    handleForgotPasswordSuccess
  };
};
