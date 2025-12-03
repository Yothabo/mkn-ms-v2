import React from 'react';
import { ExtendedMember } from '../../../../../../data/mock/types';

interface MemberDetailsSectionsProps {
  viewState: string;
  editedMember: ExtendedMember;
  age: number | null;
  isEligibleForCard: boolean;
  isAddingNew: boolean;
  isDeceased: boolean;
  currentRAInfo: any;
  onFieldChange: (field: string, value: string) => void;
  onNextOfKinChange: (field: string, value: string) => void;
  validationErrors: Record<string, string>;
}

export const MemberDetailsSections: React.FC<MemberDetailsSectionsProps> = ({
  viewState,
  editedMember,
  age,
  isEligibleForCard,
  isAddingNew,
  isDeceased,
  currentRAInfo,
  onFieldChange,
  onNextOfKinChange,
  validationErrors,
}) => {
  const isEditing = viewState === 'editing';

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDisplayValue = (value: any, fallback: string = ''): string => {
    if (value === null || value === undefined || value === '') return fallback;
    return String(value);
  };

  const calculateDuration = (startDate: string, endDate?: string): string => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    }
  };

  const calculateDaysSinceLastAttendance = (): number => {
    if (!editedMember.lastAttendance) return 0;
    const lastAttended = new Date(editedMember.lastAttendance);
    const today = new Date();
    return Math.floor((today.getTime() - lastAttended.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysSinceLastAttendance = calculateDaysSinceLastAttendance();

  const raHistory = editedMember.raHistory || [];

  // Check if member is new (joined within last 3 months)
  const isNewMember = () => {
    if (!editedMember.dateOfEntry) return true; // New members being added
    const entryDate = new Date(editedMember.dateOfEntry);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return entryDate > threeMonthsAgo;
  };

  const isMemberNew = isNewMember();

  // Check if member is eligible for other positions (after 3 months)
  const isEligibleForOtherPositions = () => {
    if (!editedMember.dateOfEntry) return false;
    const entryDate = new Date(editedMember.dateOfEntry);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return entryDate <= threeMonthsAgo;
  };

  // Helper to render non-editable fields with proper values or placeholders for new members
  const renderNonEditableField = (value: any, displayValue?: string) => (
    <div className={`member-modal-field-border ${isMemberNew && !value ? 'empty-field' : ''}`}>
      {isMemberNew && !value ? '' : (displayValue || getDisplayValue(value))}
    </div>
  );

  // Helper to render input fields with placeholders for new members
  const renderInputField = (
    field: string, 
    value: string, 
    type: string = 'text',
    placeholder: string = '',
    options?: { value: string; label: string }[]
  ) => {
    const displayValue = isMemberNew && !value ? '' : value;
    const inputPlaceholder = isMemberNew ? placeholder : '';

    if (type === 'select' && options) {
      return (
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
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          value={displayValue}
          onChange={(e) => onFieldChange(field, e.target.value)}
          className={`member-modal-edit-input member-modal-textarea ${validationErrors[field] ? 'input-error' : ''}`}
          placeholder={inputPlaceholder}
          rows={3}
        />
      );
    }

    return (
      <input
        type={type}
        value={displayValue}
        onChange={(e) => onFieldChange(field, e.target.value)}
        className={`member-modal-edit-input ${validationErrors[field] ? 'input-error' : ''}`}
        placeholder={inputPlaceholder}
      />
    );
  };

  // Get current status for display (non-editable)
  const getCurrentStatus = () => {
    return editedMember.status || 'active';
  };

  // Position options based on eligibility
  const getPositionOptions = () => {
    if (!isEligibleForOtherPositions()) {
      return [{ value: 'member', label: 'Member' }];
    }

    return [
      { value: 'member', label: 'Member' },
      { value: 'facilitator', label: 'Facilitator' },
      { value: 'evangelist', label: 'Evangelist' },
      { value: 'messenger', label: 'Messenger' },
      { value: 'songster', label: 'Songster' },
      { value: 'steward', label: 'Steward' },
      { value: 'conciliator', label: 'Conciliator' },
      { value: 'clerk', label: 'Clerk' }
    ];
  };

  return (
    <div className="member-modal-sections-container">
      {/* Personal Information */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Personal Information</h3>
        <div className="member-modal-info-content">
          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Name:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('name', editedMember.name || '', 'text', 'Enter given name')}
                  {validationErrors.name && <div className="validation-error">{validationErrors.name}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.name)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Surname:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('surname', editedMember.surname || '', 'text', 'Enter surname')}
                  {validationErrors.surname && <div className="validation-error">{validationErrors.surname}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.surname)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Date of Birth:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('dateOfBirth', editedMember.dateOfBirth || '', 'date', 'Select date of birth')}
                  {validationErrors.dateOfBirth && <div className="validation-error">{validationErrors.dateOfBirth}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.dateOfBirth, formatDate(editedMember.dateOfBirth))
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Age:</span>
            <div className="member-modal-age-container">
              {renderNonEditableField(age !== null ? `${age} years` : '')}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Gender:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('gender', editedMember.gender || '', 'select', 'Select gender', [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' }
                  ])}
                </div>
              ) : (
                renderNonEditableField(editedMember.gender)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Phone:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('phone', editedMember.phone || '', 'tel', 'Enter phone number')}
                  {validationErrors.phone && <div className="validation-error">{validationErrors.phone}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.phone)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Email:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('email', editedMember.email || '', 'email', 'Enter email address')}
                  {validationErrors.email && <div className="validation-error">{validationErrors.email}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.email)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Physical Address:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('address', editedMember.address || '', 'textarea', 'Enter physical address')}
                  {validationErrors.address && <div className="validation-error">{validationErrors.address}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.address)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Membership Information */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Membership Information</h3>
        <div className="member-modal-info-content">
          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Status:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                isMemberNew ? (
                  // New members can only be active
                  <select
                    value="active"
                    className="member-modal-edit-input"
                    disabled
                  >
                    <option value="active">Active</option>
                  </select>
                ) : (
                  // Existing members can choose between current status and deceased
                  <select
                    value={editedMember.status || ''}
                    onChange={(e) => onFieldChange('status', e.target.value)}
                    className="member-modal-edit-input"
                  >
                    <option value={getCurrentStatus()}>{getCurrentStatus()}</option>
                    <option value="deceased">Deceased</option>
                  </select>
                )
              ) : (
                <div className="member-modal-field-border">
                  <div className="member-modal-status-display">
                    <div className={`member-modal-status-dot member-modal-status-${editedMember.status}`} />
                    {getDisplayValue(editedMember.status)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Position:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                isEligibleForOtherPositions() ? (
                  // Eligible members can choose from all positions
                  <div>
                    {renderInputField('position', editedMember.position || '', 'select', 'Select position', getPositionOptions())}
                  </div>
                ) : (
                  // New members can only be "Member"
                  <select
                    value="member"
                    className="member-modal-edit-input"
                    disabled
                  >
                    <option value="member">Member</option>
                  </select>
                )
              ) : (
                renderNonEditableField(editedMember.position)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Main Branch:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('mainBranch', editedMember.mainBranch || '', 'select', 'Select branch', [
                    { value: 'bulawayo-hq', label: 'Bulawayo' },
                    { value: 'harare', label: 'Harare' },
                    { value: 'johannesburg-shq', label: 'Johannesburg' },
                    { value: 'pretoria', label: 'Pretoria' },
                    { value: 'gaborone', label: 'Gaborone' }
                  ])}
                </div>
              ) : (
                renderNonEditableField(editedMember.mainBranch)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Purity Status:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('purity', editedMember.purity || '', 'select', 'Select purity status', [
                    { value: 'virgin', label: 'Virgin' },
                    { value: 'none', label: 'None' },
                    { value: 'inapplicable', label: 'Inapplicable' }
                  ])}
                </div>
              ) : (
                renderNonEditableField(editedMember.purity)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Reason of Entry:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('reasonOfEntry', editedMember.reasonOfEntry || '', 'textarea', 'Enter reason for joining')}
                  {validationErrors.reasonOfEntry && <div className="validation-error">{validationErrors.reasonOfEntry}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.reasonOfEntry)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Date of Entry:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('dateOfEntry', editedMember.dateOfEntry || '', 'date', 'Select date of entry')}
                </div>
              ) : (
                renderNonEditableField(editedMember.dateOfEntry, formatDate(editedMember.dateOfEntry))
              )}
            </div>
          </div>

          {/* Receipt Number - Always show for new members in edit mode */}
          {isEditing && isMemberNew && (
            <div className="member-modal-info-row">
              <span className="member-modal-info-label">Receipt Number:</span>
              <div className="member-modal-input-container">
                {renderInputField('receiptNumber', editedMember.receiptNumber || '', 'text', 'Enter receipt number')}
              </div>
            </div>
          )}

          {/* Card Number - Only show for eligible members */}
          {isEligibleForCard && editedMember.cardNumber && (
            <div className="member-modal-info-row">
              <span className="member-modal-info-label">Card Number:</span>
              <div className="member-modal-input-container">
                {renderNonEditableField(editedMember.cardNumber)}
              </div>
            </div>
          )}

          {/* Deceased Information Fields - Only show when deceased status is selected */}
          {isEditing && editedMember.status === 'deceased' && (
            <>
              <div className="member-modal-info-row">
                <span className="member-modal-info-label">Date of Death:</span>
                <div className="member-modal-input-container">
                  <input
                    type="date"
                    value={editedMember.deceasedInfo?.dateOfDeath || ''}
                    onChange={(e) => onFieldChange('deceasedInfo', { ...editedMember.deceasedInfo, dateOfDeath: e.target.value })}
                    className="member-modal-edit-input"
                  />
                </div>
              </div>

              <div className="member-modal-info-row">
                <span className="member-modal-info-label">Cause of Death:</span>
                <div className="member-modal-input-container">
                  <input
                    type="text"
                    value={editedMember.deceasedInfo?.causeOfDeath || ''}
                    onChange={(e) => onFieldChange('deceasedInfo', { ...editedMember.deceasedInfo, causeOfDeath: e.target.value })}
                    className="member-modal-edit-input"
                    placeholder="Enter cause of death"
                  />
                </div>
              </div>

              <div className="member-modal-info-row">
                <span className="member-modal-info-label">Burial Place:</span>
                <div className="member-modal-input-container">
                  <input
                    type="text"
                    value={editedMember.deceasedInfo?.burialPlace || ''}
                    onChange={(e) => onFieldChange('deceasedInfo', { ...editedMember.deceasedInfo, burialPlace: e.target.value })}
                    className="member-modal-edit-input"
                    placeholder="Enter burial place"
                  />
                </div>
              </div>
            </>
          )}

          {/* Display deceased information when viewing (not editing) */}
          {!isEditing && isDeceased && editedMember.deceasedInfo && (
            <>
              <div className="member-modal-info-row">
                <span className="member-modal-info-label">Date of Death:</span>
                <div className="member-modal-input-container">
                  {renderNonEditableField(editedMember.deceasedInfo.dateOfDeath, formatDate(editedMember.deceasedInfo.dateOfDeath))}
                </div>
              </div>

              <div className="member-modal-info-row">
                <span className="member-modal-info-label">Cause of Death:</span>
                <div className="member-modal-input-container">
                  {renderNonEditableField(editedMember.deceasedInfo.causeOfDeath)}
                </div>
              </div>

              <div className="member-modal-info-row">
                <span className="member-modal-info-label">Burial Place:</span>
                <div className="member-modal-input-container">
                  {renderNonEditableField(editedMember.deceasedInfo.burialPlace)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Next of Kin Information */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Next of Kin Information</h3>
        <div className="member-modal-info-content">
          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Name:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('nokName', editedMember.nextOfKin?.name || '', 'text', 'Enter next of kin name')}
                  {validationErrors.nokName && <div className="validation-error">{validationErrors.nokName}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.nextOfKin?.name)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Surname:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('nokSurname', editedMember.nextOfKin?.surname || '', 'text', 'Enter next of kin surname')}
                  {validationErrors.nokSurname && <div className="validation-error">{validationErrors.nokSurname}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.nextOfKin?.surname)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Relationship:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('nokRelationship', editedMember.nextOfKin?.relationship || '', 'select', 'Select relationship', [
                    { value: 'parent', label: 'Parent' },
                    { value: 'spouse', label: 'Spouse' },
                    { value: 'child', label: 'Child' },
                    { value: 'sibling', label: 'Sibling' },
                    { value: 'other', label: 'Other' }
                  ])}
                  {validationErrors.nokRelationship && <div className="validation-error">{validationErrors.nokRelationship}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.nextOfKin?.relationship)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Phone:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('nokPhone', editedMember.nextOfKin?.phone || '', 'tel', 'Enter next of kin phone')}
                  {validationErrors.nokPhone && <div className="validation-error">{validationErrors.nokPhone}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.nextOfKin?.phone)
              )}
            </div>
          </div>

          <div className="member-modal-info-row">
            <span className="member-modal-info-label">Address:</span>
            <div className="member-modal-input-container">
              {isEditing ? (
                <div>
                  {renderInputField('nokAddress', editedMember.nextOfKin?.address || '', 'textarea', 'Enter next of kin address')}
                  {validationErrors.nokAddress && <div className="validation-error">{validationErrors.nokAddress}</div>}
                </div>
              ) : (
                renderNonEditableField(editedMember.nextOfKin?.address)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Information - Hide for new members */}
      {!isMemberNew && (
        <div className="member-modal-info-container">
          <h3 className="member-modal-section-title">Attendance Information</h3>
          <div className="member-modal-info-content">
            <div className="member-modal-info-row">
              <span className="member-modal-info-label">Last Attended:</span>
              <div className="member-modal-input-container">
                <div className="member-modal-field-border">
                  {formatDate(editedMember.lastAttendance)}
                </div>
              </div>
            </div>

            <div className="member-modal-info-row">
              <span className="member-modal-info-label">RA Count:</span>
              <div className="member-modal-input-container">
                {renderNonEditableField(editedMember.raCount)}
              </div>
            </div>

            <div className="member-modal-info-row">
              <span className="member-modal-info-label">RA Lock:</span>
              <div className="member-modal-input-container">
                {renderNonEditableField(editedMember.raLock ? 'Yes' : 'No')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RA History - Hide for new members */}
      {!isMemberNew && raHistory.length > 0 && (
        <div className="member-modal-info-container">
          <h3 className="member-modal-section-title">RA History</h3>
          <div className="member-modal-info-content">
            {raHistory.map((ra, index) => (
              <div key={index} className="member-modal-ra-history-item">
                <div className="member-modal-info-row">
                  <span className="member-modal-info-label">Start Date:</span>
                  <div className="member-modal-value-container">
                    {renderNonEditableField(ra.raStartDate, formatDate(ra.raStartDate))}
                  </div>
                </div>

                {ra.raEndDate && (
                  <div className="member-modal-info-row">
                    <span className="member-modal-info-label">End Date:</span>
                    <div className="member-modal-value-container">
                      {renderNonEditableField(ra.raEndDate, formatDate(ra.raEndDate))}
                    </div>
                  </div>
                )}

                {ra.raRemovalReason && (
                  <div className="member-modal-info-row">
                    <span className="member-modal-info-label">Removal Reason:</span>
                    <div className="member-modal-value-container">
                      {renderNonEditableField(ra.raRemovalReason)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
