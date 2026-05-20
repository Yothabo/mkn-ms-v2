import { useState, useEffect, useRef } from 'react';

interface UseWarningModalProps {
  delay?: number; // Delay in milliseconds
  triggerCondition?: boolean;
}

export const useWarningModal = ({ 
  delay = 5000, 
  triggerCondition = true 
}: UseWarningModalProps = {}) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (triggerCondition && !showWarningModal) {
      // Clear any existing timer
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }

      // Set new timer
      warningTimerRef.current = setTimeout(() => {
        setShowWarningModal(true);
      }, delay);

      // Cleanup timer
      return () => {
        if (warningTimerRef.current) {
          clearTimeout(warningTimerRef.current);
          warningTimerRef.current = null;
        }
      };
    }

    // Clear timer if warning is shown or condition changes
    if (!triggerCondition || showWarningModal) {
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
        warningTimerRef.current = null;
      }
    }
  }, [triggerCondition, showWarningModal, delay]);

  const closeWarningModal = () => {
    setShowWarningModal(false);
  };

  const openWarningModal = () => {
    setShowWarningModal(true);
  };

  return {
    showWarningModal,
    closeWarningModal,
    openWarningModal
  };
};
