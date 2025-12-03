import React from 'react';
import { ExtendedMember } from '../../../../../../data/mock/types';
import { PersonalInfoSection } from './PersonalInfoSection';
import { MembershipInfoSection } from './MembershipInfoSection';
import { NextOfKinSection } from './NextOfKinSection';
import { AttendanceSection } from './AttendanceSection';
import { RAHistorySection } from './RAHistorySection';
import { DeceasedInfoSection } from './DeceasedInfoSection';

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
      {/* Personal Information */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Personal Information</h3>
        <div className="member-modal-info-content">
          <PersonalInfoSection
            viewState={viewState}
            editedMember={editedMember}
            age={age}
            isEditing={isEditing}
            onFieldChange={onFieldChange}
            validationErrors={validationErrors}
          />
        </div>
      </div>

      {/* Membership Information */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Membership Information</h3>
        <div className="member-modal-info-content">
          <MembershipInfoSection
            viewState={viewState}
            editedMember={editedMember}
            isEligibleForCard={isEligibleForCard}
            isEditing={isEditing}
            onFieldChange={onFieldChange}
            validationErrors={validationErrors}
          />
        </div>
      </div>

      {/* Next of Kin */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Next of Kin</h3>
        <div className="member-modal-info-content">
          <NextOfKinSection
            viewState={viewState}
            editedMember={editedMember}
            isEditing={isEditing}
            onNextOfKinChange={onNextOfKinChange}
            validationErrors={validationErrors}
          />
        </div>
      </div>

      {/* Attendance Information */}
      <div className="member-modal-info-container">
        <h3 className="member-modal-section-title">Attendance Information</h3>
        <div className="member-modal-info-content">
          <AttendanceSection
            editedMember={editedMember}
            isAddingNew={isAddingNew}
          />
        </div>
      </div>

      {/* RA History - VISIBLE TEST */}
      <div className="member-modal-info-container" style={{ background: 'red', border: '3px solid darkred' }}>
        <h3 className="member-modal-section-title" style={{ background: 'darkred', color: 'white' }}>
          🔴 RA HISTORY SECTION - THIS SHOULD BE VISIBLE 🔴
        </h3>
        <div className="member-modal-info-content" style={{ background: 'pink', padding: '10px' }}>
          <div style={{ color: 'darkred', fontWeight: 'bold', textAlign: 'center' }}>
            RA HISTORY CONTENT AREA - IF YOU SEE THIS, THE SECTION IS RENDERING
          </div>
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

      {/* Deceased Information */}
      {isDeceased && (
        <div className="member-modal-info-container">
          <h3 className="member-modal-section-title">Deceased Information</h3>
          <div className="member-modal-info-content">
            <DeceasedInfoSection
              viewState={viewState}
              editedMember={editedMember}
              isEditing={isEditing}
              onFieldChange={onFieldChange}
              validationErrors={validationErrors}
            />
          </div>
        </div>
      )}
    </div>
  );
};
