import React from 'react';
import { renderNonEditableField } from './sections/FormUtils';
import { ExtendedMember } from '../../../../../../data/mock/types';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { MembershipInfoSection } from './sections/MembershipInfoSection';
import { NextOfKinSection } from './sections/NextOfKinSection';
import { AttendanceSection } from './sections/AttendanceSection';
import { RAHistorySection } from './sections/RAHistorySection';
import { DeceasedInfoSection } from './sections/DeceasedInfoSection';

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

  return (
    <div className="member-modal-sections-container">
      {/* Personal Information Section */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Personal Information</h3>
        <div className="member-modal-info-content">
          <PersonalInfoSection
            viewState={viewState}
            editedMember={editedMember}
            isEditing={isEditing}
            age={age}
            onFieldChange={onFieldChange}
            validationErrors={validationErrors}
          />
        </div>
      </div>

      {/* Membership Information Section */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Membership Information</h3>
        <div className="member-modal-info-content">
          <MembershipInfoSection
            viewState={viewState}
            editedMember={editedMember}
            isEditing={isEditing}
            age={age}
            isEligibleForCard={isEligibleForCard}
            isAddingNew={isAddingNew}
            isDeceased={isDeceased}
            onFieldChange={onFieldChange}
            validationErrors={validationErrors}
          />
        </div>
      </div>

      {/* Deceased Information Section (only shows if deceased) */}
      {isDeceased && (
        <div className="member-modal-info-container">
          <h3 className="member-modal-section-title">Deceased Information</h3>
          <div className="member-modal-info-content">
            <DeceasedInfoSection
              viewState={viewState}
              editedMember={editedMember}
              isEditing={isEditing}
              isDeceased={isDeceased}
              isAddingNew={isAddingNew}
              onFieldChange={onFieldChange}
              validationErrors={validationErrors}
            />
          </div>
        </div>
      )}

      {/* Next of Kin Section */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Next of Kin Information</h3>
        <div className="member-modal-info-content">
          <NextOfKinSection
            viewState={viewState}
            editedMember={editedMember}
            isEditing={isEditing}
            isAddingNew={isAddingNew}
            onFieldChange={onFieldChange}
            onNextOfKinChange={onNextOfKinChange}
            validationErrors={validationErrors}
          />
        </div>
      </div>

      {/* Attendance Section (hidden for new members) */}
      {!isAddingNew && (
        <div className="member-modal-info-container">
          <h3 className="member-modal-section-title">Attendance Information</h3>
          <div className="member-modal-info-content">
            <AttendanceSection
              viewState={viewState}
              editedMember={editedMember}
              isEditing={isEditing}
              isAddingNew={isAddingNew}
              currentRAInfo={currentRAInfo}
              onFieldChange={onFieldChange}
              validationErrors={validationErrors}
            />
          </div>
        </div>
      )}

      {/* RA History Section - NOW WITH ORIGINAL STYLING */}
      {!isAddingNew && (
        <div className="member-modal-info-container">
          <h3 className="member-modal-section-title">RA History</h3>
          <div className="member-modal-info-content">
            <RAHistorySection
              viewState={viewState}
              editedMember={editedMember}
              isEditing={isEditing}
              isAddingNew={isAddingNew}
              currentRAInfo={currentRAInfo}
              onFieldChange={onFieldChange}
              validationErrors={validationErrors}
            />
          </div>
        </div>
      )}
    </div>
  );
};
