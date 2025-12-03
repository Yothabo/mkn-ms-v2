import React from 'react';
import {
  Edit, Close, Delete, Chat, Save
} from '@mui/icons-material';

interface ActionButtonsProps {
  viewState: string;
  activeAction: string | null;
  isAddingNew: boolean;
  isSaving: boolean;
  isFormValid: boolean;
  onActionClick: (action: 'chat' | 'edit' | 'delete') => void;
  onCancelAction: () => void;
  onClose: () => void;
  onSave: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  viewState,
  activeAction,
  isAddingNew,
  isSaving,
  isFormValid,
  onActionClick,
  onCancelAction,
  onClose,
  onSave,
}) => {
  console.log('ActionButtons rendering:', { viewState, activeAction, isAddingNew });

  if (viewState === 'delete-success') {
    return (
      <button
        onClick={onClose}
        className="member-modal-icon-button"
        aria-label="Close"
        title="Close"
      >
        <Close className="member-modal-action-icon" />
      </button>
    );
  }

  if (viewState === 'editing') {
    return (
      <>
        <button
          onClick={onSave}
          className={`member-modal-icon-button member-modal-save-button ${!isFormValid ? 'save-button-disabled' : ''}`}
          aria-label="Save Changes"
          title="Save Changes"
          disabled={isSaving || !isFormValid}
        >
          {isSaving ? (
            <div className="member-modal-saving-spinner" />
          ) : (
            <Save className="member-modal-action-icon" />
          )}
        </button>
        <button
          onClick={onCancelAction}
          className="member-modal-icon-button"
          aria-label="Cancel"
          title="Cancel"
          disabled={isSaving}
        >
          <Close className="member-modal-action-icon" />
        </button>
      </>
    );
  }

  if (activeAction) {
    return (
      <>
        <button
          className={`member-modal-icon-button ${
            activeAction === 'chat' ? 'member-modal-chat-button' :
            activeAction === 'edit' ? '' :
            'member-modal-delete-button'
          }`}
          style={{
            backgroundColor:
              activeAction === 'chat' ? '#3b82f6' :
              activeAction === 'edit' ? '#22c55e' :
              '#ef4444',
            color: 'white',
          }}
          disabled
        >
          {activeAction === 'chat' && <Chat className="member-modal-action-icon" />}
          {activeAction === 'edit' && <Edit className="member-modal-action-icon" />}
          {activeAction === 'delete' && <Delete className="member-modal-action-icon" />}
        </button>
        <button
          onClick={onClose}
          className="member-modal-icon-button"
          aria-label="Close"
          title="Close"
        >
          <Close className="member-modal-action-icon" />
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => onActionClick('chat')}
        className="member-modal-icon-button member-modal-chat-button"
        aria-label="Chat with Member"
        title="Chat with Member"
      >
        <Chat className="member-modal-action-icon" />
      </button>
      <button
        onClick={() => onActionClick('edit')}
        className="member-modal-icon-button"
        aria-label="Edit Member"
        title="Edit Member"
      >
        <Edit className="member-modal-action-icon" />
      </button>
      {!isAddingNew && (
        <button
          onClick={() => onActionClick('delete')}
          className="member-modal-icon-button member-modal-delete-button"
          aria-label="Delete Member"
          title="Delete Member"
        >
          <Delete className="member-modal-action-icon" />
        </button>
      )}
      <button
        onClick={onClose}
        className="member-modal-icon-button"
        aria-label="Close"
        title="Close"
      >
        <Close className="member-modal-action-icon" />
      </button>
    </>
  );
};
