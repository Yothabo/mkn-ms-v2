import React, { useState, useMemo } from 'react';
import { ExtendedMember } from '../../../../../data/mock/types';
import { Edit, Close, Delete, Person, Chat, Warning, CheckCircle, Save } from '@mui/icons-material';
import { validateMember } from '../../../../../utils/validation';
import '../../../styles/member-details-modal.css';
import { MemberDetailsSections } from './components/MemberDetailsSections';
import { ActionButtons } from './components/ActionButtons';
import { ActionContent } from './components/ActionContent';

interface MemberDetailsModalProps {
  member?: ExtendedMember;
  onClose: () => void;
  onEdit: (updatedMember: ExtendedMember) => void;
  onDelete?: () => void;
  onChat?: () => void;
  isAddingNew?: boolean;
}

type ViewState = 'details' | 'delete-warning' | 'delete-loading' | 'delete-success' | 'chat' | 'editing' | 'deceased-info';

export default function MemberDetailsModal({
  member,
  onClose,
  onEdit,
  onDelete,
  onChat,
  isAddingNew = false
}: MemberDetailsModalProps) {
  const [viewState, setViewState] = useState<ViewState>(isAddingNew ? 'editing' : 'details');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [editedMember, setEditedMember] = useState<ExtendedMember>(() => {
    if (isAddingNew && !member) {
      return {
        id: 'temp-new-member',
        name: '',
        surname: '',
        gender: 'male',
        dateOfBirth: new Date().toISOString().split('T')[0],
        phone: '',
        dateOfEntry: new Date().toISOString().split('T')[0],
        reasonOfEntry: '',
        nextOfKin: {
          name: '',
          surname: '',
          relationship: 'parent',
          phone: '',
          address: ''
        },
        address: '',
        raCount: 0,
        raLock: false,
        status: 'active',
        position: 'member',
        purity: 'virgin',
        mainBranch: 'bulawayo-hq',
        lastAttendance: new Date().toISOString().split('T')[0],
        isYouth: false,
        isFemale: false
      } as ExtendedMember;
    }
    return member!;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [avatarZoomed, setAvatarZoomed] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Check if member is new (joined within last 3 months)
  const isNewMember = useMemo(() => {
    if (isAddingNew) return true;
    if (!member?.dateOfEntry) return false;
    const entryDate = new Date(member.dateOfEntry);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return entryDate > threeMonthsAgo;
  }, [member?.dateOfEntry, isAddingNew]);

  // Validate form whenever editedMember changes in editing mode
  const formValidation = useMemo(() => {
    if (viewState !== 'editing') return { isValid: true, errors: {} };
    
    const errors = validateMember(editedMember);
    const errorMap: Record<string, string> = {};
    
    errors.forEach(error => {
      // Map validation errors to field names
      if (error.error?.includes('Name') && error.error?.includes('required')) {
        errorMap.name = error.error;
      } else if (error.error?.includes('Surname') && error.error?.includes('required')) {
        errorMap.surname = error.error;
      } else if (error.error?.includes('Phone')) {
        errorMap.phone = error.error;
      } else if (error.error?.includes('Email')) {
        errorMap.email = error.error;
      } else if (error.error?.includes('Address')) {
        errorMap.address = error.error;
      } else if (error.error?.includes('Date of birth')) {
        errorMap.dateOfBirth = error.error;
      } else if (error.error?.includes('Reason of entry')) {
        errorMap.reasonOfEntry = error.error;
      } else if (error.error?.includes('Next of Kin Name')) {
        errorMap.nokName = error.error;
      } else if (error.error?.includes('Next of Kin Surname')) {
        errorMap.nokSurname = error.error;
      } else if (error.error?.includes('Next of Kin Phone')) {
        errorMap.nokPhone = error.error;
      } else if (error.error?.includes('Next of Kin Address')) {
        errorMap.nokAddress = error.error;
      } else if (error.error?.includes('Relationship')) {
        errorMap.nokRelationship = error.error;
      }
    });

    setValidationErrors(errorMap);
    return { isValid: errors.length === 0, errors: errorMap };
  }, [editedMember, viewState]);

  const isFormValid = formValidation.isValid;

  const age = useMemo(() => {
    if (!editedMember.dateOfBirth) return null;
    const birthDate = new Date(editedMember.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, [editedMember.dateOfBirth]);

  const isEligibleForCard = useMemo(() => {
    if (!editedMember.dateOfEntry) return false;
    const entryDate = new Date(editedMember.dateOfEntry);
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    return entryDate <= threeMonthsAgo;
  }, [editedMember.dateOfEntry]);

  const isDeceased = editedMember.status === 'deceased';

  const currentRAInfo = useMemo(() => {
    if (editedMember.status !== 'ra') return null;
    return editedMember.raHistory?.find(ra => !ra.raEndDate) || null;
  }, [editedMember.status, editedMember.raHistory]);

  const handleActionClick = (action: 'chat' | 'edit' | 'delete') => {
    setActiveAction(action);
    switch (action) {
      case 'delete':
        setViewState('delete-warning');
        break;
      case 'chat':
        setViewState('chat');
        break;
      case 'edit':
        setViewState('editing');
        setEditedMember({ ...member! });
        break;
    }
  };

  const handleCancelAction = () => {
    if (isAddingNew) {
      onClose();
    } else {
      setActiveAction(null);
      setViewState('details');
      setEditedMember({ ...member! });
      setValidationErrors({});
      setSaveSuccess(false);
    }
  };

  const handleClose = () => {
    if (activeAction && viewState !== 'delete-success') {
      handleCancelAction();
    } else {
      onClose();
    }
  };

  const handleConfirmDelete = async () => {
    setViewState('delete-loading');
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDelete?.();
      setViewState('delete-success');
      setIsDeleting(false);
    } catch (error) {
      setViewState('details');
      setActiveAction(null);
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!isFormValid) {
      const errorMessages = Object.values(validationErrors).join(', ');
      alert(`Please fix the following errors: ${errorMessages}`);
      return;
    }

    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onEdit(editedMember);
      setSaveSuccess(true);
      
      // Show success state briefly before closing
      setTimeout(() => {
        setViewState('details');
        setActiveAction(null);
        setValidationErrors({});
        setIsSaving(false);
        setSaveSuccess(false);
      }, 800);
    } catch (error: any) {
      alert(`Error saving member: ${error.message}`);
      setIsSaving(false);
      setSaveSuccess(false);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    if (field === 'deceasedInfo') {
      // Handle deceased info updates
      setEditedMember(prev => ({ 
        ...prev, 
        deceasedInfo: { ...prev.deceasedInfo, ...value } 
      }));
    } else if (field === 'status' && value === 'deceased') {
      // When status changes to deceased, initialize deceased info if not present
      setEditedMember(prev => ({ 
        ...prev, 
        status: value,
        deceasedInfo: prev.deceasedInfo || {
          dateOfDeath: '',
          causeOfDeath: '',
          burialPlace: ''
        }
      }));
    } else {
      setEditedMember(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNextOfKinChange = (field: string, value: string) => {
    setEditedMember(prev => ({
      ...prev,
      nextOfKin: { ...prev.nextOfKin, [field]: value }
    }));
    // Clear validation error for this next of kin field
    const errorField = `nok${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (validationErrors[errorField]) {
      setValidationErrors(prev => ({ ...prev, [errorField]: '' }));
    }
  };

  const handlePhoneClick = () => {
    if (editedMember.phone) {
      window.open(`tel:${editedMember.phone}`);
    }
  };

  const handleEmailClick = () => {
    if (editedMember.email) {
      window.open(`mailto:${editedMember.email}`);
    }
  };

  const handleAvatarClick = () => {
    setAvatarZoomed(!avatarZoomed);
    if (avatarZoomed) {
      setTimeout(() => setAvatarZoomed(false), 3000);
    }
  };

  const renderActionContent = () => {
    if (viewState === 'details' || viewState === 'editing') {
      return (
        <MemberDetailsSections
          viewState={viewState}
          editedMember={editedMember}
          age={age}
          isEligibleForCard={isEligibleForCard}
          isAddingNew={isAddingNew}
          isDeceased={isDeceased}
          currentRAInfo={currentRAInfo}
          onFieldChange={handleFieldChange}
          onNextOfKinChange={handleNextOfKinChange}
          validationErrors={validationErrors}
        />
      );
    }

    return (
      <ActionContent
        viewState={viewState}
        editedMember={editedMember}
        isDeleting={isDeleting}
        isSaving={isSaving}
        onCancelAction={handleCancelAction}
        onConfirmDelete={handleConfirmDelete}
        onClose={onClose}
        onPhoneClick={handlePhoneClick}
        onEmailClick={handleEmailClick}
      />
    );
  };

  return (
    <div className="member-modal-overlay" onClick={handleClose}>
      <div className="member-modal-frosty-overlay" />

      <div className="member-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="member-modal-top-bar">
          <div
            className={`member-modal-profile-avatar ${avatarZoomed ? 'avatar-zoomed' : ''} ${isNewMember ? 'new-member' : ''}`}
            onClick={handleAvatarClick}
          >
            <Person className="member-modal-profile-icon" />
          </div>

          <div className="member-modal-action-buttons">
            <ActionButtons
              viewState={viewState}
              activeAction={activeAction}
              isAddingNew={isAddingNew}
              isSaving={isSaving}
              saveSuccess={saveSuccess}
              isFormValid={isFormValid}
              onActionClick={handleActionClick}
              onCancelAction={handleCancelAction}
              onClose={handleClose}
              onSave={handleSave}
            />
          </div>
        </div>

        <div className="member-modal-body">
          {renderActionContent()}
        </div>
      </div>
    </div>
  );
}
