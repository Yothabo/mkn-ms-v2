import React from 'react';
import { ExtendedMember } from '../../../../../../../data/mock/types';
import { formatDate, getDisplayValue, calculateDuration } from './SectionUtils';
import { renderInputField } from './FormUtils';

interface RAHistorySectionProps {
  viewState: string;
  editedMember: ExtendedMember;
  isEditing: boolean;
  isAddingNew: boolean;
  currentRAInfo: any;
  onFieldChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
}

export const RAHistorySection: React.FC<RAHistorySectionProps> = ({
  viewState,
  editedMember,
  isEditing,
  isAddingNew,
  currentRAInfo,
  onFieldChange,
  validationErrors,
}) => {
  const renderNonEditableField = (value: any) => (
    <div className="member-modal-field-border">{getDisplayValue(value, '—')}</div>
  );

  // Get RA history from the member data
  const raHistory = editedMember.raHistory || [];

  // For new members, show empty state
  if (isAddingNew) {
    return (
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">RA History:</span>
        <div className="member-modal-input-container">
          <div className="member-modal-field-border" style={{ fontStyle: 'italic', color: '#666' }}>
            RA history will be available after member is created
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* RA Count */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">RA Count:</span>
        <div className="member-modal-input-container">
          <div className="member-modal-field-border">
            {editedMember.raCount || 0}
          </div>
        </div>
      </div>

      {/* RA Lock Status */}
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">RA Lock:</span>
        <div className="member-modal-input-container">
          <div className="member-modal-field-border">
            {editedMember.raLock ? 'Yes' : 'No'}
          </div>
        </div>
      </div>

      {/* Current RA Information */}
      {currentRAInfo && (
        <div className="member-modal-info-row">
          <span className="member-modal-info-label">Current RA Duration:</span>
          <div className="member-modal-input-container">
            <div className="member-modal-field-border">
              {calculateDuration(currentRAInfo.raStartDate)}
            </div>
          </div>
        </div>
      )}

      {/* RA History Records - Using same structure as other sections */}
      {raHistory.length > 0 && (
        <div className="member-modal-info-row">
          <span className="member-modal-info-label">RA History:</span>
          <div className="member-modal-input-container">
            <div className="member-modal-field-border">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {raHistory.map((ra: any, index: number) => (
                  <div key={index} style={{ padding: '8px 0', borderBottom: index < raHistory.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div>
                        <span>Start Date:</span> {formatDate(ra.raStartDate)}
                      </div>
                      <div>
                        <span>End Date:</span> {ra.raEndDate ? formatDate(ra.raEndDate) : 'Ongoing'}
                      </div>
                      {ra.raRemovalReason && (
                        <div>
                          <span>Removal Reason:</span> {ra.raRemovalReason}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
