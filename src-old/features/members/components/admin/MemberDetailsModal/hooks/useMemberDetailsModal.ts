/* src/features/members/components/admin/MemberDetailsModal/hooks/useMemberDetailsModal.ts */
import { useState, useEffect } from 'react';
import { ExtendedMember } from '../../../../../data/mock/types';

export const useMemberDetailsModal = (
  member: ExtendedMember,
  isAddingNew: boolean = false,
  onEdit?: (member: ExtendedMember) => void,
  onClose?: () => void
) => {
  const [viewState, setViewState] = useState<'details' | 'editing' | 'deceased-info' | 'chat' | 'delete-warning' | 'delete-loading' | 'delete-success'>(
    isAddingNew ? 'editing' : 'details'
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeAction, setActiveAction] = useState<'chat' | 'edit' | 'delete' | null>(null);
  const [editedMember, setEditedMember] = useState<ExtendedMember>({} as ExtendedMember);
  const [isSaving, setIsSaving] = useState(false);
  const [customModal, setCustomModal] = useState<{ type: string; field: string; options?: any[] } | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    console.log('useEffect triggered:', { isAddingNew, member });

    if (isAddingNew) {
      console.log('Creating new member with empty fields');
      const newMember: ExtendedMember = {
        id: '',
        name: '',
        surname: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        physicalAddress: '',
        status: 'active', // Default to active for new members
        position: '',
        mainBranch: '',
        purity: '',
        spiritualReason: '',
        dateOfEntry: '',
        cardNumber: '',
        receiptNumber: '',
        lastAttendance: '',
        raCount: 0,
        raLock: false,
        nextOfKin: {
          name: '',
          surname: '',
          relationship: '',
          phone: '',
          address: ''
        },
        deceasedInfo: {
          dateOfDeath: '',
          causeOfDeath: '',
          burialPlace: ''
        },
        raHistory: []
      } as ExtendedMember;
      setEditedMember(newMember);
    } else if (member) {
      console.log('Setting existing member:', member);
      setEditedMember(member);
    }
  }, [member, isAddingNew]);

  // Add a debug effect to log the current editedMember state
  useEffect(() => {
    console.log('Current editedMember:', {
      position: editedMember.position,
      mainBranch: editedMember.mainBranch,
      purity: editedMember.purity,
      gender: editedMember.gender,
      relationship: editedMember.nextOfKin?.relationship,
      status: editedMember.status
    });
  }, [editedMember]);

  const isEligibleForCard = editedMember?.status === 'active' || editedMember?.status === 'pre-ra';
  const isDeceased = editedMember?.status === 'deceased';

  const age = editedMember?.dateOfBirth
    ? new Date().getFullYear() - new Date(editedMember.dateOfBirth).getFullYear()
    : null;

  const currentRAInfo = editedMember?.status === 'ra' && editedMember.raHistory?.[0]
    ? editedMember.raHistory[0]
    : null;

  const validateField = (field: string, value: any): string | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rules: { [key: string]: (value: any) => string | null } = {
      name: (val: string) => !val?.trim() ? 'Name is required' : val.length < 2 ? 'Name must be at least 2 characters' : null,
      surname: (val: string) => !val?.trim() ? 'Surname is required' : val.length < 2 ? 'Surname must be at least 2 characters' : null,
      dateOfBirth: (val: string) => {
        if (!val) return 'Date of birth is required';
        const dob = new Date(val);
        dob.setHours(0, 0, 0, 0);
        if (dob > today) return 'Date of birth cannot be in the future';
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 120);
        if (dob < minDate) return 'Date of birth is too far in the past';
        return null;
      },
      gender: (val: string) => !val ? 'Gender is required' : null,
      phone: (val: string) => {
        if (!val?.trim()) return 'Phone number is required';
        const phoneRegex = /^[+\-\s()\d]+$/;
        if (!phoneRegex.test(val)) return 'Phone number can only contain numbers, +, -, (, ) and spaces';
        const digitsOnly = val.replace(/[^\d]/g, '');
        if (digitsOnly.length < 8) return 'Phone number is too short';
        if (digitsOnly.length > 15) return 'Phone number is too long';
        return null;
      },
      email: (val: string) => {
        if (val && val.trim()) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
          if (val.length > 100) return 'Email must be less than 100 characters';
        }
        return null;
      },
      status: (val: string) => !val ? 'Status is required' : null,
      mainBranch: (val: string) => !val ? 'Main branch is required' : null,
      cardNumber: (val: string) => {
        if (isEligibleForCard && val) {
          if (!/^\d+$/.test(val)) return 'Card number must contain only numbers';
          if (val.length > 20) return 'Card number must be less than 20 digits';
        }
        return null;
      },
      'deceasedInfo.dateOfDeath': (val: string) => {
        if (isDeceased && !val) return 'Date of death is required';
        if (val) {
          const dod = new Date(val);
          dod.setHours(0, 0, 0, 0);
          if (dod > today) return 'Date of death cannot be in the future';
          if (editedMember?.dateOfBirth) {
            const dob = new Date(editedMember.dateOfBirth);
            dob.setHours(0, 0, 0, 0);
            if (dod < dob) return 'Date of death cannot be before date of birth';
          }
        }
        return null;
      },
      'deceasedInfo.causeOfDeath': (val: string) => isDeceased && !val?.trim() ? 'Cause of death is required' : null,
      'nextOfKin.phone': (val: string) => {
        if (val && val.trim()) {
          const phoneRegex = /^[+\-\s()\d]+$/;
          if (!phoneRegex.test(val)) return 'Phone number can only contain numbers, +, -, (, ) and spaces';
          const digitsOnly = val.replace(/[^\d]/g, '');
          if (digitsOnly.length < 8) return 'Phone number is too short';
          if (digitsOnly.length > 15) return 'Phone number is too long';
        }
        return null;
      },
    };

    return rules[field] ? rules[field](value) : null;
  };

  const validateSingleField = (field: string, value: any) => {
    const error = validateField(field, value);
    setValidationErrors(prev => {
      if (error) {
        return { ...prev, [field]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
    });
  };

  const validateForm = (): boolean => {
    if (!editedMember) return false;

    const errors: { [key: string]: string } = {};

    const fieldsToValidate = [
      'name', 'surname', 'dateOfBirth', 'gender', 'phone', 'email',
      'status', 'mainBranch', 'cardNumber', 'deceasedInfo.dateOfDeath',
      'deceasedInfo.causeOfDeath', 'nextOfKin.phone'
    ];

    fieldsToValidate.forEach(field => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        const value = (editedMember as any)[parent]?.[child];
        const error = validateField(field, value);
        if (error) errors[field] = error;
      } else {
        const value = (editedMember as any)[field];
        const error = validateField(field, value);
        if (error) errors[field] = error;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isFormValid =
    editedMember?.name?.trim() &&
    editedMember?.surname?.trim() &&
    editedMember?.dateOfBirth &&
    editedMember?.gender &&
    editedMember?.phone?.trim() &&
    editedMember?.status &&
    editedMember?.mainBranch?.trim();

  const handleActionClick = (action: 'chat' | 'edit' | 'delete') => {
    setActiveAction(action);
    switch (action) {
      case 'chat': setViewState('chat'); break;
      case 'edit': setViewState('editing'); break;
      case 'delete': setViewState('delete-warning'); break;
    }
  };

  const handleCancelAction = () => {
    if (viewState === 'editing' || viewState === 'deceased-info') {
      setEditedMember(member);
      setValidationErrors({});
    }

    setViewState('details');
    setActiveAction(null);
    setIsDeleting(false);

    return isAddingNew;
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    setViewState('delete-loading');
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false);
    setViewState('details');
    setActiveAction(null);
  };

  const handleDeleteSuccess = () => {
    setViewState('delete-success');
    setIsDeleting(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditedMember(prev => {
      if (!prev) return prev;
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });

    validateSingleField(field, value);
  };

  const handleNextOfKinChange = (field: string, value: string) => {
    setEditedMember(prev => ({
      ...prev!,
      nextOfKin: { ...prev!.nextOfKin, [field]: value }
    }));

    validateSingleField(`nextOfKin.${field}`, value);
  };

  const openCustomModal = (type: string, field: string, options?: any[]) => {
    setCustomModal({ type, field, options });
  };

  const closeCustomModal = () => {
    setCustomModal(null);
  };

  const handleCustomModalSelect = (value: string) => {
    if (customModal?.field) {
      handleFieldChange(customModal.field, value);
    }
    closeCustomModal();
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Please fix the validation errors before saving');
      return;
    }

    if (!isFormValid) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (onEdit) onEdit(editedMember);
      if (isAddingNew) {
        if (onClose) onClose();
      } else {
        setViewState('details');
        setActiveAction(null);
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDeceasedInfo = async () => {
    const deceasedErrors: { [key: string]: string } = {};
    const dateOfDeathError = validateField('deceasedInfo.dateOfDeath', editedMember.deceasedInfo?.dateOfDeath);
    const causeOfDeathError = validateField('deceasedInfo.causeOfDeath', editedMember.deceasedInfo?.causeOfDeath);

    if (dateOfDeathError) deceasedErrors['deceasedInfo.dateOfDeath'] = dateOfDeathError;
    if (causeOfDeathError) deceasedErrors['deceasedInfo.causeOfDeath'] = causeOfDeathError;

    if (Object.keys(deceasedErrors).length > 0) {
      setValidationErrors(prev => ({ ...prev, ...deceasedErrors }));
      alert('Please fix the validation errors before saving');
      return;
    }

    if (!editedMember.deceasedInfo?.dateOfDeath || !editedMember.deceasedInfo?.causeOfDeath) {
      alert('Please fill in all required deceased information');
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (onEdit) onEdit(editedMember);
      setViewState('details');
      setActiveAction(null);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    viewState,
    isDeleting,
    activeAction,
    editedMember,
    isSaving,
    customModal,
    isEligibleForCard,
    isFormValid: !!isFormValid,
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
  };
};
