import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  animationDuration?: number;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  animationDuration = 300,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'entering' | 'entered' | 'exiting'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleClose = useCallback(() => {
    if (animationState !== 'exiting') {
      setAnimationState('exiting');
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        onClose();
        setAnimationState('idle');
      }, animationDuration);
    }
  }, [animationState, animationDuration, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      
      // Start entrance animation
      requestAnimationFrame(() => {
        setAnimationState('entering');
        timerRef.current = setTimeout(() => {
          setAnimationState('entered');
        }, animationDuration);
      });

      // Focus trap
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else if (isVisible) {
      handleClose();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      document.body.style.overflow = '';
    };
  }, [isOpen, isVisible, handleClose, animationDuration]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen && animationState === 'entered') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEsc, isOpen, animationState, handleClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current && animationState === 'entered') {
      handleClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isVisible && !isOpen) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className={`${styles.modalOverlay} ${styles[animationState]}`}
      onClick={handleOverlayClick}
      style={{
        animationDuration: `${animationDuration}ms`
      }}
    >
      <div
        ref={modalRef}
        className={`${styles.modalContent} ${className}`}
        onClick={handleModalClick}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          animationDuration: `${animationDuration}ms`
        }}
      >
        <div className={styles.modalInner}>
          {showCloseButton && (
            <button
              type="button"
              className={styles.modalCloseButton}
              onClick={handleClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root') || document.body
  );
};

export default Modal;
