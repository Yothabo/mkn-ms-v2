import React from 'react';
import { ExtendedMember } from '../../../../../../../data/mock/types';
import { formatDate } from './SectionUtils';

interface AttendanceSectionProps {
  editedMember: ExtendedMember;
  isAddingNew: boolean;
}

export const AttendanceSection: React.FC<AttendanceSectionProps> = ({
  editedMember,
  isAddingNew,
}) => {
  const calculateDaysSinceLastAttendance = (): number => {
    if (!editedMember.lastAttendance) return 0;
    const lastAttended = new Date(editedMember.lastAttendance);
    const today = new Date();
    return Math.floor((today.getTime() - lastAttended.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysSinceLastAttendance = calculateDaysSinceLastAttendance();

  // For new members, show empty state
  if (isAddingNew) {
    return (
      <div className="member-modal-info-row">
        <span className="member-modal-info-label">Last Attendance:</span>
        <div className="member-modal-input-container">
          <div className="member-modal-field-border" style={{ fontStyle: 'italic', color: '#666' }}>
            Attendance data will be available after member creation
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="member-modal-info-row">
      <span className="member-modal-info-label">Last Attendance:</span>
      <div className="member-modal-input-container">
        <div className="member-modal-field-border">
          {editedMember.lastAttendance ? (
            <>
              {formatDate(editedMember.lastAttendance)}
              {daysSinceLastAttendance > 0 && (
                <span className="attendance-days-ago">
                  {' '}({daysSinceLastAttendance} day{daysSinceLastAttendance !== 1 ? 's' : ''} ago)
                </span>
              )}
            </>
          ) : (
            'No attendance recorded'
          )}
        </div>
      </div>
    </div>
  );
};
