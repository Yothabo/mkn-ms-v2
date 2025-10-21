import React from 'react';

// Helper function to render form fields consistently with proper container structure
export const renderInputField = (
  field: string,
  value: string,
  type: string = 'text',
  placeholder: string = '',
  options?: { value: string; label: string }[],
  onFieldChange: (field: string, value: string) => void,
  validationErrors: Record<string, string>,
  isMemberNew: boolean = false
) => {
  const displayValue = isMemberNew && !value ? '' : value;
  const inputPlaceholder = isMemberNew ? placeholder : '';

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
export const renderNonEditableField = (value: any, isMemberNew: boolean = false) => (
  <div className={`member-modal-field-border ${isMemberNew && !value ? 'empty-field' : ''}`}>
    {isMemberNew && !value ? '' : String(value || '—')}
  </div>
);

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
