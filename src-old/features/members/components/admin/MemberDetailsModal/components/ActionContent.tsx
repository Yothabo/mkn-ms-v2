import React from 'react';
import { Warning, CheckCircle, Chat } from '@mui/icons-material';

interface ActionContentProps {
  viewState: string;
  editedMember: any;
  isDeleting: boolean;
  isSaving: boolean;
  onCancelAction: () => void;
  onConfirmDelete: () => void;
  onClose: () => void;
  onPhoneClick: () => void;
  onEmailClick: () => void;
  onSaveDeceasedInfo: () => void;
  onOpenCustomModal: (type: any, field: string, options?: any[]) => void;
}

export const ActionContent: React.FC<ActionContentProps> = ({
  viewState,
  editedMember,
  isDeleting,
  isSaving,
  onCancelAction,
  onConfirmDelete,
  onClose,
  onPhoneClick,
  onEmailClick,
  onSaveDeceasedInfo,
  onOpenCustomModal,
}) => {
  switch (viewState) {
    case 'delete-warning':
      return (
        <div className="member-modal-action-content">
          <Warning className="member-modal-action-icon-large" />
          <h2 className="member-modal-action-title">Delete {editedMember.name}</h2>
          <p className="member-modal-action-message">
            This action is permanent and cannot be reversed. All member data including
            personal information, congregation records, and attendance history will be
            permanently erased from the system.
          </p>
          <div className="member-modal-action-buttons-group">
            <button
              onClick={onCancelAction}
              className="member-modal-cancel-button"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={onConfirmDelete}
              className="member-modal-confirm-delete-button"
              disabled={isDeleting}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      );

    case 'delete-loading':
      return (
        <div className="member-modal-action-content">
          <div className="member-modal-loading-spinner" />
          <p className="member-modal-action-message">Deleting {editedMember.name}...</p>
        </div>
      );

    case 'delete-success':
      return (
        <div className="member-modal-action-content">
          <CheckCircle className="member-modal-action-icon-large" />
          <h2 className="member-modal-action-title">{editedMember.name} Permanently Erased!</h2>
          <p className="member-modal-action-message">
            All member data has been successfully deleted from the system.
          </p>
          <div className="member-modal-action-buttons-group">
            <button
              onClick={onClose}
              className="member-modal-cancel-button"
            >
              Close
            </button>
          </div>
        </div>
      );

    case 'chat':
      return (
        <div className="member-modal-action-content">
          <Chat className="member-modal-action-icon-large" style={{ color: '#3b82f6' }} />
          <h2 className="member-modal-action-title">Messaging Unavailable</h2>
          <p className="member-modal-action-message">
            Messaging functionality is currently not available. Please reach {editedMember.name} through{' '}
            {editedMember.phone ? (
              <button
                onClick={onPhoneClick}
                className="member-modal-contact-link"
              >
                phone
              </button>
            ) : (
              'phone'
            )}{' '}
            or{' '}
            {editedMember.email ? (
              <button
                onClick={onEmailClick}
                className="member-modal-contact-link"
              >
                email
              </button>
            ) : (
              'email'
            )}
            .
          </p>
          <div className="member-modal-action-buttons-group">
            <button
              onClick={onCancelAction}
              className="member-modal-cancel-button"
            >
              Back to Details
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
};
