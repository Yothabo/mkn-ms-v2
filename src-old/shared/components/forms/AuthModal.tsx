import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<'login' | 'register'>(defaultView);

  if (!isOpen) return null;

  const handleSwitchToLogin = () => setCurrentView('login');
  const handleSwitchToRegister = () => setCurrentView('register');

  const handleClose = () => {
    onClose();
    // Reset to default view when closing
    setTimeout(() => setCurrentView(defaultView), 300);
  };

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        {currentView === 'login' ? (
          <LoginForm 
            onSwitchToSignup={handleSwitchToRegister}
            onClose={handleClose}
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={handleSwitchToLogin}
            onClose={handleClose}
          />
        )}
      </div>

      <style>{`
        .auth-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: backdropFadeIn 0.2s ease-out;
        }

        [data-theme="dark"] .auth-modal-overlay {
          background: rgba(0, 0, 0, 0.5);
        }

        .auth-modal-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 0.75rem;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.18);
          width: 90vw;
          max-width: 28rem;
          max-height: 85vh;
          overflow-y: auto;
          animation: modalSlideIn 0.2s ease-out;
        }

        [data-theme="dark"] .auth-modal-container {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Mobile styles */
        @media (max-width: 640px) {
          .auth-modal-overlay {
            padding: 0.5rem;
          }
          
          .auth-modal-container {
            width: 95vw;
            max-width: none;
            max-height: 95vh;
            border-radius: 0.5rem;
          }
        }

        /* Small mobile devices */
        @media (max-width: 380px) {
          .auth-modal-container {
            width: 98vw;
            max-height: 98vh;
            border-radius: 0.25rem;
          }
        }

        /* Large desktop screens */
        @media (min-width: 1536px) {
          .auth-modal-container {
            max-width: 32rem;
          }
        }
      `}</style>
    </div>
  );
}
