import React from 'react';
import { ExtendedMember } from '../../../../../../../data/mock/types';
import { getDisplayValue, capitalizeText } from './SectionUtils';
import { renderInputField } from './FormUtils';

interface NextOfKinSectionProps {
  viewState: string;
  editedMember: ExtendedMember;
  isEditing: boolean;
  isAddingNew: boolean;
  onFieldChange: (field: string, value: string) => void;
  onNextOfKinChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
}

export const NextOfKinSection: React.FC<NextOfKinSectionProps> = ({
  viewState,
  editedMember,
  isEditing,
  isAddingNew,
  onFieldChange,
  onNextOfKinChange,
  validationErrors,
}) => {
  const relationshipOptions = [
    { value: 'parent', label: 'Parent' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'child', label: 'Child' },
    { value: 'relative', label: 'Relative' },
    { value: 'friend', label: 'Friend' },
    { value: 'other', label: 'Other' }
  ];

  const renderNonEditableField = (value: any) => (
    <div className="member-modal-field-border">{getDisplayValue(value, '—')}</div>
  );

  return (
    <>
      {/* Next of Kin Name */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Name:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nextOfKin.name',
              editedMember.nextOfKin?.name || '',
              'text',
              'Enter name',
              undefined,
              onNextOfKinChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            renderNonEditableField(editedMember.nextOfKin?.name)
          )}
        </div>
      </div>

      {/* Next of Kin Surname */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Surname:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nextOfKin.surname',
              editedMember.nextOfKin?.surname || '',
              'text',
              'Enter surname',
              undefined,
              onNextOfKinChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            renderNonEditableField(editedMember.nextOfKin?.surname)
          )}
        </div>
      </div>

      {/* Relationship */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Relationship:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nextOfKin.relationship',
              editedMember.nextOfKin?.relationship || '',
              'select',
              'Select relationship',
              relationshipOptions,
              onNextOfKinChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            <div className="member-modal-field-border">
              {capitalizeText(getDisplayValue(editedMember.nextOfKin?.relationship, '—'))}
            </div>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Phone:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nextOfKin.phone',
              editedMember.nextOfKin?.phone || '',
              'tel',
              'Enter phone number',
              undefined,
              onNextOfKinChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            renderNonEditableField(editedMember.nextOfKin?.phone)
          )}
        </div>
      </div>

      {/* Address */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Address:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nextOfKin.address',
              editedMember.nextOfKin?.address || '',
              'textarea',
              'Enter address',
              undefined,
              onNextOfKinChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            renderNonEditableField(editedMember.nextOfKin?.address)
          )}
        </div>
      </div>
    </>
  );
};
