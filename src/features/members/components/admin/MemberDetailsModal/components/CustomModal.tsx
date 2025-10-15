/* src/features/members/components/admin/MemberDetailsModal/components/CustomModal.tsx */
import React from 'react';
import { Close } from '@mui/icons-material';
import { CustomModalState } from '../types';

interface CustomModalProps {
  modal: CustomModalState;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  modal,
  onClose,
  onSelect,
}) => {
  console.log('CustomModal rendering with:', modal);

  if (!modal || !modal.type || !modal.field) {
    console.log('CustomModal: No modal data, returning null');
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    console.log('CustomModal overlay clicked');
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOptionClick = (value: string) => {
    console.log('CustomModal option clicked:', value);
    onSelect(value);
  };

  if (modal.type === 'select' && modal.options) {
    return (
      <div className="custom-modal-overlay" onClick={handleOverlayClick}>
        <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="custom-modal-header">
            <h3>Select {modal.field === 'mainBranch' ? 'Branch' : 'Option'}</h3>
            <button onClick={onClose} className="custom-modal-close">
              <Close />
            </button>
          </div>
          <div className="custom-modal-options">
            {modal.options.map((option) => (
              <button
                key={option.value}
                className="custom-modal-option"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log('CustomModal: Unsupported modal type or missing options');
  return null;
};
