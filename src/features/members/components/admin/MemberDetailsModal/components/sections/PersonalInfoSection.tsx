import React from 'react';
import { ExtendedMember } from '../../../../../../../data/mock/types';
import { formatDate, getDisplayValue, capitalizeText } from './SectionUtils';
import { renderInputField } from './FormUtils';

interface PersonalInfoSectionProps {
  viewState: string;
  editedMember: ExtendedMember;
  isEditing: boolean;
  age: number | null;
  onFieldChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  viewState,
  editedMember,
  isEditing,
  age,
  onFieldChange,
  validationErrors,
}) => {
  const renderNonEditableField = (value: any) => (
    <div className="member-modal-field-border">{getDisplayValue(value, '—')}</div>
  );

  return (
    <>
      {/* Name */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Name:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'name',
              editedMember.name || '',
              'text',
              'Enter given name',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(editedMember.name)
          )}
        </div>
      </div>

      {/* Surname */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Surname:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'surname',
              editedMember.surname || '',
              'text',
              'Enter surname',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(editedMember.surname)
          )}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Date of Birth:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'dateOfBirth',
              editedMember.dateOfBirth || '',
              'date',
              '',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            <div className="member-modal-field-border">
              {editedMember.dateOfBirth ? (
                <>
                  {formatDate(editedMember.dateOfBirth)}
                  {age !== null && age !== undefined && (
                    <span style={{color: '#666', fontStyle: 'italic', marginLeft: '8px'}}>
                      ({age} years)
                    </span>
                  )}
                </>
              ) : (
                '—'
              )}
            </div>
          )}
        </div>
      </div>

      {/* Gender */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Gender:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'gender',
              editedMember.gender || '',
              'select',
              '',
              [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
              ],
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(capitalizeText(editedMember.gender))
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Phone:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'phone',
              editedMember.phone || '',
              'tel',
              'Enter phone number',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(editedMember.phone)
          )}
        </div>
      </div>

      {/* Email */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Email:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'email',
              editedMember.email || '',
              'email',
              'Enter email address',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(editedMember.email)
          )}
        </div>
      </div>

      {/* Address */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Address:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'address',
              editedMember.address || '',
              'text',
              'Enter physical address',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(editedMember.address)
          )}
        </div>
      </div>
    </>
  );
};
