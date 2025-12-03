import React from 'react';
import { ArrowDropDown } from '@mui/icons-material';

// Helper function to render form fields consistently with proper container structure
export const renderInputField = (
  field: string,
  value: string,
  type: string = 'text',
  placeholder: string = '',
  options?: { value: string; label: string }[],
  onFieldChange: (field: string, value: string) => void,
  validationErrors: Record<string, string>,
  isMemberNew: boolean = false,
  onOpenCustomModal?: (type: string, field: string, options?: any[]) => void
) => {
  const displayValue = isMemberNew && !value ? '' : value;
  const inputPlaceholder = placeholder; // Always show placeholder

  // For select fields, use custom modal trigger instead of browser select
  if (type === 'select' && options && onOpenCustomModal) {
    const selectedOption = options.find(opt => opt.value === value);
    const displayText = selectedOption ? selectedOption.label : inputPlaceholder || 'Select an option';
    
    return (
      <div className="member-modal-input-container">
        <button
          type="button"
          className={`custom-select-trigger ${validationErrors[field] ? 'input-error' : ''}`}
          onClick={() => onOpenCustomModal('select', field, options)}
        >
          <span className="custom-select-value">
            {displayText}
          </span>
          <ArrowDropDown className="custom-select-arrow" />
        </button>
      </div>
    );
  }

  // Fallback to regular select if no modal handler provided
  if (type === 'select' && options) {
    return (
      <div className="member-modal-input-container">
        <select
          value={displayValue}
          onChange={(e) => onFieldChange(field, e.target.value)}
          className={`member-modal-edit-input ${validationErrors[field] ? 'input-error' : ''}`}
        >
          <option value="">{inputPlaceholder}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="member-modal-input-container">
        <textarea
          value={displayValue}
          onChange={(e) => onFieldChange(field, e.target.value)}
          className={`member-modal-edit-input member-modal-textarea ${validationErrors[field] ? 'input-error' : ''}`}
          placeholder={inputPlaceholder}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div className="member-modal-input-container">
      <input
        type={type}
        value={displayValue}
        onChange={(e) => onFieldChange(field, e.target.value)}
        className={`member-modal-edit-input ${validationErrors[field] ? 'input-error' : ''}`}
        placeholder={inputPlaceholder}
      />
    </div>
  );
};

// Helper to render non-editable fields with proper styling
export const renderNonEditableField = (value: any, fieldName?: string) => {
  if (!value) {
    // Show informative text based on field type
    switch (fieldName) {
      case 'email':
        return <div className="member-modal-field-border empty-field">No email provided</div>;
      case 'phone':
        return <div className="member-modal-field-border empty-field">No phone number</div>;
      case 'address':
        return <div className="member-modal-field-border empty-field">No address provided</div>;
      case 'cardNumber':
        return <div className="member-modal-field-border empty-field">No card number</div>;
      case 'reasonOfEntry':
        return <div className="member-modal-field-border empty-field">No reason provided</div>;
      default:
        return <div className="member-modal-field-border empty-field">—</div>;
    }
  }
  return <div className="member-modal-field-border">{String(value)}</div>;
};

// Eligibility check functions
export const isEligibleForOtherPositions = (age: number | null): boolean => {
  return age !== null && age >= 18;
};

export const isEligibleForCard = (editedMember: any): boolean => {
  if (!editedMember.dateOfEntry) return true; // New members being added
  const entryDate = new Date(editedMember.dateOfEntry);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return entryDate > threeMonthsAgo;
};

export const isMemberNew = (editedMember: any): boolean => {
  if (!editedMember.dateOfEntry) return false;
  const entryDate = new Date(editedMember.dateOfEntry);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return entryDate <= threeMonthsAgo;
};
