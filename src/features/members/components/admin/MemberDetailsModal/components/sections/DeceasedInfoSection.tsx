import React from 'react';
import { ExtendedMember } from '../../../../../../../data/mock/types';
import { getDisplayValue } from './SectionUtils';
import { renderInputField } from './FormUtils';

interface DeceasedInfoSectionProps {
  viewState: string;
  editedMember: ExtendedMember;
  isEditing: boolean;
  isDeceased: boolean;
  isAddingNew: boolean;
  onFieldChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
}

export const DeceasedInfoSection: React.FC<DeceasedInfoSectionProps> = ({
  viewState,
  editedMember,
  isEditing,
  isDeceased,
  isAddingNew,
  onFieldChange,
  validationErrors,
}) => {
  const renderNonEditableField = (value: any) => (
    <div className="member-modal-field-border">{getDisplayValue(value, '—')}</div>
  );

  // Only show deceased information if member is deceased
  if (!isDeceased) {
    return null;
  }

  return (
    <>
      {/* Date of Death */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Date of Death:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'deceasedInfo.dateOfDeath',
              editedMember.deceasedInfo?.dateOfDeath || '',
              'date',
              '',
              undefined,
              onFieldChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            renderNonEditableField(editedMember.deceasedInfo?.dateOfDeath)
          )}
        </div>
      </div>

      {/* Cause of Death */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Cause of Death:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'deceasedInfo.causeOfDeath',
              editedMember.deceasedInfo?.causeOfDeath || '',
              'text',
              'Enter cause of death',
              undefined,
              onFieldChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            renderNonEditableField(editedMember.deceasedInfo?.causeOfDeath)
          )}
        </div>
      </div>

      {/* Burial Place */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Burial Place:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'deceasedInfo.burialPlace',
              editedMember.deceasedInfo?.burialPlace || '',
              'textarea',
              'Enter burial place',
              undefined,
              onFieldChange,
              validationErrors,
              isAddingNew
            )
          ) : (
            renderNonEditableField(editedMember.deceasedInfo?.burialPlace)
          )}
        </div>
      </div>
    </>
  );
};
