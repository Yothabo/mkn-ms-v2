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
  onOpenCustomModal?: (type: string, field: string, options?: any[]) => void;
}

export const NextOfKinSection: React.FC<NextOfKinSectionProps> = ({
  viewState,
  editedMember,
  isEditing,
  isAddingNew,
  onFieldChange,
  onNextOfKinChange,
  validationErrors,
  onOpenCustomModal,
}) => {
  const renderNonEditableField = (value: any) => (
    <div className="member-modal-field-border">{getDisplayValue(value, '—')}</div>
  );

  const relationshipOptions = [
    { value: 'parent', label: 'Parent' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'child', label: 'Child' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <>
      {/* Next of Kin Name */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Next of Kin Name:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nokName',
              editedMember.nextOfKin?.name || '',
              'text',
              'Enter next of kin name',
              undefined,
              onNextOfKinChange,
              validationErrors,
              false,
              onOpenCustomModal
            )
          ) : (
            renderNonEditableField(editedMember.nextOfKin?.name)
          )}
        </div>
      </div>

      {/* Next of Kin Surname */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Next of Kin Surname:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nokSurname',
              editedMember.nextOfKin?.surname || '',
              'text',
              'Enter next of kin surname',
              undefined,
              onNextOfKinChange,
              validationErrors,
              false,
              onOpenCustomModal
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
              'nokRelationship',
              editedMember.nextOfKin?.relationship || '',
              'select',
              'Select relationship',
              relationshipOptions,
              onNextOfKinChange,
              validationErrors,
              false,
              onOpenCustomModal
            )
          ) : (
            renderNonEditableField(capitalizeText(editedMember.nextOfKin?.relationship))
          )}
        </div>
      </div>

      {/* Next of Kin Phone */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Next of Kin Phone:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nokPhone',
              editedMember.nextOfKin?.phone || '',
              'tel',
              'Enter next of kin phone',
              undefined,
              onNextOfKinChange,
              validationErrors,
              false,
              onOpenCustomModal
            )
          ) : (
            renderNonEditableField(editedMember.nextOfKin?.phone)
          )}
        </div>
      </div>

      {/* Next of Kin Address */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Next of Kin Address:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'nokAddress',
              editedMember.nextOfKin?.address || '',
              'text',
              'Enter next of kin address',
              undefined,
              onNextOfKinChange,
              validationErrors,
              false,
              onOpenCustomModal
            )
          ) : (
            renderNonEditableField(editedMember.nextOfKin?.address)
          )}
        </div>
      </div>
    </>
  );
};
