import { AuthView } from './AuthModal';

export const getModalTitle = (currentView: AuthView): string => {
  switch (currentView) {
    case 'login':
      return 'Sign In';
    case 'register':
      return 'Create Account';
    case 'forgot-password':
      return 'Reset Password';
    case 'terms':
      return 'Terms & Conditions';
    case 'register-success':
    case 'forgot-password-success':
      return ''; // No title for success states
    default:
      return 'Authentication';
  }
};

export const getModalSize = (currentView: AuthView): string => {
  switch (currentView) {
    case 'terms':
      return 'lg';
    case 'register':
      return 'md';
    case 'register-success':
    case 'forgot-password-success':
      return 'sm';
    default:
      return 'sm';
  }
};

export const getModalVariant = (): string => {
  return 'mobile';
};

export const showBackButton = (currentView: AuthView): boolean => {
  return currentView === 'terms' || currentView === 'forgot-password';
};

export const showCloseButton = (currentView: AuthView): boolean => {
  return currentView !== 'terms' && currentView !== 'register-success' && currentView !== 'forgot-password-success';
};

export const handleBack = (currentView: AuthView, setCurrentView: (view: AuthView) => void): void => {
  if (currentView === 'terms') {
    setCurrentView('register');
  } else if (currentView === 'forgot-password') {
    setCurrentView('login');
  }
};
