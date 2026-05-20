import { useState, useEffect, useRef } from 'react';

interface UseScreenModalOptions {
  isActive?: boolean;
  autoCloseOnScreenChange?: boolean;
}

export const useScreenModal = (options: UseScreenModalOptions = {}) => {
  const { isActive = true, autoCloseOnScreenChange = true } = options;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wasActiveRef = useRef(isActive);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen(prev => !prev);

  useEffect(() => {
    if (autoCloseOnScreenChange && wasActiveRef.current && !isActive && isModalOpen) {
      const timer = setTimeout(() => {
        closeModal();
      }, 800);
      return () => clearTimeout(timer);
    }
    wasActiveRef.current = isActive;
  }, [isActive, isModalOpen, autoCloseOnScreenChange]);

  return { isModalOpen, openModal, closeModal, toggleModal };
};

export default useScreenModal;
