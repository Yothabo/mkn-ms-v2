/* src/features/members/components/admin/MemberDetailsModal/index.tsx */
import React, { useState, useMemo } from 'react';
import { Person } from '@mui/icons-material';
import { MemberDetailsModalProps } from './types';
import { useMemberDetailsModal } from './hooks/useMemberDetailsModal';
import { CustomModal } from './components/CustomModal';
import { ActionContent } from './components/ActionContent';
import { MemberDetailsSections } from './components/MemberDetailsSections';
import { ActionButtons } from './components/ActionButtons';
import '../../../styles/member-details-modal.css';

// Helper function to check if member is "new" (dateOfEntry less than 3 months)
const isNewMember = (dateOfEntry?: string): boolean => {
  if (!dateOfEntry) return false;

  try {
    const entryDate = new Date(dateOfEntry);
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    return entryDate > threeMonthsAgo;
  } catch {
    return false;
  }
};

// Helper function to get effective status for display
const getEffectiveStatus = (member: any): string => {
  // If member has dateOfEntry less than 3 months, they are considered "new"
  if (isNewMember(member.dateOfEntry)) {
    return 'new';
  }
  // Otherwise use their actual status
  return member.status || 'active';
};

export const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({
  member,
  onClose,
  onEdit,
  onDelete,
  onChat,
  isAddingNew = false,
}) => {
  const [isAvatarZoomed, setIsAvatarZoomed] = useState(false);

  // Add debug logging to see what data is being passed
  console.log('MemberDetailsModal received:', {
    isAddingNew,
    memberData: member,
    position: member?.position,
    mainBranch: member?.mainBranch,
    purity: member?.purity
  });

  const {
    viewState,
    isDeleting,
    activeAction,
    editedMember,
    isSaving,
    customModal,
    isEligibleForCard,
    isFormValid,
    age,
    isDeceased,
    currentRAInfo,
    validationErrors,
    handleActionClick,
    handleCancelAction,
    handleFieldChange,
    handleNextOfKinChange,
    openCustomModal,
    closeCustomModal,
    handleCustomModalSelect,
    handleSave,
    handleSaveDeceasedInfo,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleDeleteSuccess,
  } = useMemberDetailsModal(member, isAddingNew, onEdit, onClose);

  // Get effective status for avatar styling
  const avatarStatus = useMemo(() => {
    return getEffectiveStatus(editedMember);
  }, [editedMember]);

  const handleAvatarClick = () => {
    setIsAvatarZoomed(true);
    setTimeout(() => setIsAvatarZoomed(false), 1500);
  };

  const handleClose = () => {
    console.log('handleClose called');
    onClose();
  };

  const handleCancelButtonClick = () => {
    console.log('handleCancelButtonClick called');
    const shouldClose = handleCancelAction();
    if (shouldClose) {
      onClose();
    }
  };

  const handleConfirmDelete = async () => {
    console.log('handleConfirmDelete called');
    handleDeleteConfirm();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onDelete) {
        onDelete();
      }

      handleDeleteSuccess();

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('handleConfirmDelete: Error:', error);
      handleDeleteCancel();
    }
  };

  const handlePhoneClick = () => {
    if (editedMember.phone) {
      console.log(`handlePhoneClick: Opening tel:${editedMember.phone}`);
      window.open(`tel:${editedMember.phone}`);
    }
  };

  const handleEmailClick = () => {
    if (editedMember.email) {
      console.log(`handleEmailClick: Opening mailto:${editedMember.email}`);
      window.open(`mailto:${editedMember.email}`);
    }
  };

  const handleDateFieldClick = (field: string) => {
    console.log(`handleDateFieldClick: field=${field}`);
  };

  const renderModalContent = () => {
    console.log(`renderModalContent: viewState=${viewState}`);
    if (viewState === 'editing' || viewState === 'deceased-info') {
      return (
        <MemberDetailsSections
          viewState={viewState}
          editedMember={editedMember}
          age={age}
          isEligibleForCard={isEligibleForCard}
          isAddingNew={isAddingNew}
          isDeceased={isDeceased}
          currentRAInfo={currentRAInfo}
          validationErrors={validationErrors}
          onFieldChange={handleFieldChange}
          onNextOfKinChange={handleNextOfKinChange}
          onOpenCustomModal={openCustomModal}
        />
      );
    }

    if (
      viewState === 'chat' ||
      viewState === 'delete-warning' ||
      viewState === 'delete-loading' ||
      viewState === 'delete-success'
    ) {
      return (
        <ActionContent
          viewState={viewState}
          editedMember={editedMember}
          isDeleting={isDeleting}
          isSaving={isSaving}
          onCancelAction={handleCancelButtonClick}
          onConfirmDelete={handleConfirmDelete}
          onClose={handleClose}
          onPhoneClick={handlePhoneClick}
          onEmailClick={handleEmailClick}
        />
      );
    }

    return (
      <MemberDetailsSections
        viewState={viewState}
        editedMember={editedMember}
        age={age}
        isEligibleForCard={isEligibleForCard}
        isAddingNew={isAddingNew}
        isDeceased={isDeceased}
        currentRAInfo={currentRAInfo}
        validationErrors={validationErrors}
        onFieldChange={handleFieldChange}
        onNextOfKinChange={handleNextOfKinChange}
        onOpenCustomModal={openCustomModal}
      />
    );
  };

  return (
    <div className="member-modal-overlay" onClick={handleClose}>
      <div className="member-modal-frosty-overlay" />

      <div className="member-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="member-modal-top-bar">
          <div
            className={`member-modal-profile-avatar status-${avatarStatus} ${isAvatarZoomed ? 'avatar-zoomed' : ''}`}
            data-status={avatarStatus}
            onClick={handleAvatarClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleAvatarClick();
              }
            }}
          >
            <Person className="member-modal-profile-icon" />
          </div>

          <div className="member-modal-action-buttons">
            <ActionButtons
              viewState={viewState}
              activeAction={activeAction}
              isAddingNew={isAddingNew}
              isSaving={isSaving}
              isFormValid={isFormValid}
              onActionClick={handleActionClick}
              onCancelAction={handleCancelButtonClick}
              onClose={handleClose}
              onSave={handleSave}
              onSaveDeceasedInfo={handleSaveDeceasedInfo}
            />
          </div>
        </div>

        <div className="member-modal-body">{renderModalContent()}</div>

        <CustomModal
          modal={customModal}
          onClose={closeCustomModal}
          onSelect={handleCustomModalSelect}
        />
      </div>
    </div>
  );
};

export default MemberDetailsModal;
