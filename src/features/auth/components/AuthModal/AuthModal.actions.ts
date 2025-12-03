import { useAuth } from '../../../../shared/context/AuthContext';

export const useAuthModalActions = (
  login: (cardReceiptNumber: string, password: string) => Promise<boolean>,
  handleClose: () => void
) => {
  const handleContinueToApp = async (
    currentView: string,
    registerFormData: { cardReceiptNumber: string; password: string },
    forgotPasswordFormData: { cardReceiptNumber: string; newPassword: string }
  ) => {
    try {
      let loginSuccess = false;

      if (currentView === 'register-success') {
        // Login with registration credentials
        loginSuccess = await login(registerFormData.cardReceiptNumber, registerFormData.password);
      } else if (currentView === 'forgot-password-success') {
        // Login with new password credentials
        loginSuccess = await login(forgotPasswordFormData.cardReceiptNumber, forgotPasswordFormData.newPassword);
      }

      if (loginSuccess) {
        console.log('User logged in successfully');
        handleClose();
        console.log('Navigating to main app...');
      } else {
        console.error('Login failed');
        handleClose();
      }
    } catch (error) {
      console.error('Error during login:', error);
      handleClose();
    }
  };

  return {
    handleContinueToApp
  };
};
