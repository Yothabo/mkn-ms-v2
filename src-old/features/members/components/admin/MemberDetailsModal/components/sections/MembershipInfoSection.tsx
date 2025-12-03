import React from 'react';
import { ExtendedMember } from '../../../../../../../data/mock/types';
import { formatDate, getDisplayValue, capitalizeText } from './SectionUtils';
import { renderInputField, isEligibleForOtherPositions } from './FormUtils';
import { branches } from '../../../../../../../config/branches';
import { MemberStatus, Position, PurityStatus } from '../../../../../../../config/members';

interface MembershipInfoSectionProps {
  viewState: string;
  editedMember: ExtendedMember;
  isEditing: boolean;
  age: number | null;
  isEligibleForCard: boolean;
  isAddingNew: boolean;
  isDeceased: boolean;
  onFieldChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
  onOpenCustomModal?: (type: string, field: string, options?: any[]) => void;
}

export const MembershipInfoSection: React.FC<MembershipInfoSectionProps> = ({
  viewState,
  editedMember,
  isEditing,
  age,
  isEligibleForCard,
  isAddingNew,
  isDeceased,
  onFieldChange,
  validationErrors,
  onOpenCustomModal,
}) => {
  const renderNonEditableField = (value: any) => (
    <div className="member-modal-field-border">{getDisplayValue(value, '—')}</div>
  );

  const positionOptions: { value: Position; label: string }[] = [
    { value: 'facilitator', label: 'Facilitator' },
    { value: 'evangelist', label: 'Evangelist' },
    { value: 'messenger', label: 'Messenger' },
    { value: 'member', label: 'Member' },
    { value: 'songster', label: 'Songster' },
    { value: 'steward', label: 'Steward' },
    { value: 'conciliator', label: 'Conciliator' },
    { value: 'clerk', label: 'Clerk' }
  ];

  const statusOptions: { value: MemberStatus; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'ra', label: 'RA' },
    { value: 'preRa', label: 'Pre-RA' },
    { value: 'deceased', label: 'Deceased' }
  ];

  const purityOptions: { value: PurityStatus; label: string }[] = [
    { value: 'virgin', label: 'Virgin' },
    { value: 'none', label: 'None' },
    { value: 'inapplicable', label: 'Inapplicable' }
  ];

  const branchOptions = branches.map(branch => ({ 
    value: branch.id, 
    label: branch.name 
  }));

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
              'Select status',
              statusOptions,
              onFieldChange,
              validationErrors,
              false,
              onOpenCustomModal
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
              'Select position',
              positionOptions,
              onFieldChange,
              validationErrors,
              false,
              onOpenCustomModal
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
              'Select branch',
              branchOptions,
              onFieldChange,
              validationErrors,
              false,
              onOpenCustomModal
            )
          ) : (
            renderNonEditableField(capitalizeText(editedMember.mainBranch))
          )}
        </div>
      </div>

      {/* Purity */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Purity:</span>
        <div className="member-modal-input-container">
          {isEditing ? (
            renderInputField(
              'purity',
              editedMember.purity || '',
              'select',
              'Select purity status',
              purityOptions,
              onFieldChange,
              validationErrors,
              false,
              onOpenCustomModal
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
              'Select date',
              undefined,
              onFieldChange,
              validationErrors,
              false,
              onOpenCustomModal
            )
          ) : (
            renderNonEditableField(formatDate(editedMember.dateOfEntry))
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
              'text',
              'Enter reason for joining',
              undefined,
              onFieldChange,
              validationErrors,
              false,
              onOpenCustomModal
            )
          ) : (
            renderNonEditableField(editedMember.reasonOfEntry)
          )}
        </div>
      </div>

      {/* Card Number (only for eligible members) */}
      {isEligibleForCard && (
        <div className="member-modal-info-row">
          <span className="member-modal-info-label">Card Number:</span>
          <div className="member-modal-input-container">
            {isEditing ? (
              renderInputField(
                'cardNumber',
                editedMember.cardNumber || '',
                'text',
                'Enter card number',
                undefined,
                onFieldChange,
                validationErrors,
                false,
                onOpenCustomModal
              )
            ) : (
              renderNonEditableField(editedMember.cardNumber)
            )}
          </div>
        </div>
      )}
    </>
  );
};
