import React from 'react';
import { ExtendedMember } from '../../../../../../../data/mock/types';
import { getDisplayValue, capitalizeText, formatDate } from './SectionUtils';
import { renderInputField } from './FormUtils';

interface MembershipInfoSectionProps {
  viewState: string;
  editedMember: ExtendedMember;
  isEditing: boolean;
  isEligibleForCard: boolean;
  onFieldChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
}

export const MembershipInfoSection: React.FC<MembershipInfoSectionProps> = ({
  viewState,
  editedMember,
  isEditing,
  isEligibleForCard,
  onFieldChange,
  validationErrors,
}) => {
  const renderNonEditableField = (value: any) => (
    <div className="member-modal-field-border">{getDisplayValue(value, '—')}</div>
  );

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'preRa', label: 'Pre-RA' },
    { value: 'ra', label: 'RA' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'deceased', label: 'Deceased' }
  ];

  const positionOptions = [
    { value: 'member', label: 'Member' },
    { value: 'facilitator', label: 'Facilitator' },
    { value: 'evangelist', label: 'Evangelist' },
    { value: 'messenger', label: 'Messenger' },
    { value: 'songster', label: 'Songster' },
    { value: 'steward', label: 'Steward' },
    { value: 'conciliator', label: 'Conciliator' },
    { value: 'clerk', label: 'Clerk' }
  ];

  const branchOptions = [
    { value: 'bulawayo-hq', label: 'Bulawayo HQ' },
    { value: 'harare', label: 'Harare' },
    { value: 'johannesburg-shq', label: 'Johannesburg SHQ' },
    { value: 'pretoria', label: 'Pretoria' },
    { value: 'gaborone', label: 'Gaborone' }
  ];

  const purityOptions = [
    { value: 'virgin', label: 'Virgin' },
    { value: 'none', label: 'Non-Virgin' },
    { value: 'inapplicable', label: 'Inapplicable' }
  ];

  return (
    <>
      {/* Status */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Status:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'status',
              editedMember.status || '',
              'select',
              '',
              statusOptions,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(capitalizeText(editedMember.status))
          )}
        </div>
      </div>

      {/* Position */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Position:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'position',
              editedMember.position || '',
              'select',
              '',
              positionOptions,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(capitalizeText(editedMember.position))
          )}
        </div>
      </div>

      {/* Main Branch */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Main Branch:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'mainBranch',
              editedMember.mainBranch || '',
              'select',
              '',
              branchOptions,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(capitalizeText(editedMember.mainBranch))
          )}
        </div>
      </div>

      {/* Purity Status */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Purity Status:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'purity',
              editedMember.purity || '',
              'select',
              '',
              purityOptions,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(capitalizeText(editedMember.purity))
          )}
        </div>
      </div>

      {/* Date of Entry */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Date of Entry:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'dateOfEntry',
              editedMember.dateOfEntry || '',
              'date',
              '',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            <div className="member-modal-field-border">
              {formatDate(editedMember.dateOfEntry)}
            </div>
          )}
        </div>
      </div>

      {/* Reason of Entry */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Reason of Entry:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'reasonOfEntry',
              editedMember.reasonOfEntry || '',
              'textarea',
              'Enter reason for joining',
              undefined,
              onFieldChange,
              validationErrors,
              false
            )
          ) : (
            renderNonEditableField(editedMember.reasonOfEntry)
          )}
        </div>
      </div>

      {/* Card Number */}
      {editedMember.cardNumber && (
        <div className="member-modal-info-row">
          <span className="member-modal-info-label">Card Number:</span>
          <div className="member-modal-input-container">
            <div className="member-modal-field-border">
              {editedMember.cardNumber}
            </div>
          </div>
        </div>
      )}

      {/* Receipt Number */}
      {editedMember.receiptNumber && (
        <div className="member-modal-info-row">
          <span className="member-modal-info-label">Receipt Number:</span>
          <div className="member-modal-input-container">
            <div className="member-modal-field-border">
              {editedMember.receiptNumber}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
