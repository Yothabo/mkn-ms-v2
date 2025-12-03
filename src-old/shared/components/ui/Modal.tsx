import { useEffect, ReactNode, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, children, size = 'md' }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSize, setCurrentSize] = useState(size);

  useEffect(() => {
    setCurrentSize(size);
  }, [size]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div
      className={`modal-backdrop ${!isOpen ? 'closing' : ''}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`modal-content ${sizeClasses[currentSize]} ${!isOpen ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

      <style>{`
        .modal-backdrop {
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
          padding: 2rem;
          opacity: 1;
          animation: backdropFadeIn 0.3s ease-out;
        }

        .modal-backdrop.closing {
          animation: backdropFadeOut 0.3s ease-out forwards;
        }

        .modal-content {
          background: rgba(248, 250, 252, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 1rem;
          width: 100%;
          height: auto;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid var(--color-border);
          transform: translateY(0);
          opacity: 1;
          animation: modalSlideIn 0.3s ease-out;
          margin: auto;
        }

        @supports not (backdrop-filter: blur(8px)) {
          .modal-content {
            background: var(--color-surface);
          }
        }

        .modal-content.closing {
          animation: modalSlideOut 0.3s ease-out forwards;
        }

        [data-theme="dark"] .modal-content {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid var(--color-border);
        }

        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 3px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: var(--color-text-light);
        }

        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes backdropFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @media (max-width: 640px) {
          .modal-backdrop {
            padding: 1rem;
          }

          .modal-content {
            max-height: 85vh;
            border-radius: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
