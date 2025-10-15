// src/pages/admin/Members.tsx
import React, { useState } from 'react';
import MemberList from '../../features/members/components/admin/MemberList';
import MemberDetailsModal from '../../features/members/components/admin/MemberDetailsModal';
import { Member } from '../../config/members';
import { ExtendedMember } from '../../data/mock/types';
import { bulawayoMembers, harareMembers, johannesburgMembers, pretoriaMembers, gaboroneMembers } from '../../data/mock';

// Combine all members
const allMembersInitial: ExtendedMember[] = [
  ...bulawayoMembers,
  ...harareMembers,
  ...johannesburgMembers,
  ...pretoriaMembers,
  ...gaboroneMembers
];

// Create empty member template for adding new members - ALL FIELDS EMPTY
const emptyMember: ExtendedMember = {
  id: '',
  name: '',
  surname: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  physicalAddress: '',
  status: '', // EMPTY - will show "Select status"
  position: '', // EMPTY - will show "Select position"
  mainBranch: '', // EMPTY - will show "Select branch"
  purity: '', // EMPTY - will show "Select purity status"
  spiritualReason: '',
  dateOfEntry: '',
  cardNumber: '',
  receiptNumber: '',
  lastAttendance: '',
  raCount: 0,
  raLock: false,
  raHistory: [],
  nextOfKin: {
    name: '',
    surname: '',
    relationship: '', // EMPTY - will show "Select relationship"
    phone: '',
    address: ''
  },
  deceasedInfo: {
    dateOfDeath: '',
    causeOfDeath: '',
    burialPlace: ''
  }
};

export default function Members() {
  const [members, setMembers] = useState<ExtendedMember[]>(allMembersInitial);
  const [selectedMember, setSelectedMember] = useState<ExtendedMember | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member as ExtendedMember);
    setIsAddingNew(false);
    setShowMemberModal(true);
  };

  const handleAddMember = () => {
    setSelectedMember({
      ...emptyMember,
      id: `new-${Date.now()}`,
      name: '',
      surname: '',
      phone: '',
      email: ''
    });
    setIsAddingNew(true);
    setShowMemberModal(true);
  };

  const handleCloseModal = () => {
    setShowMemberModal(false);
    setSelectedMember(null);
    setIsAddingNew(false);
  };

  const handleSaveMember = (updatedMember: ExtendedMember) => {
    if (isAddingNew) {
      // Add new member
      const newMember = {
        ...updatedMember,
        id: `member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      setMembers(prev => [...prev, newMember]);
      console.log('Added new member:', newMember);
    } else {
      // Update existing member
      setMembers(prev =>
        prev.map(member =>
          member.id === updatedMember.id ? updatedMember : member
        )
      );
      console.log('Updated member:', updatedMember);
    }
    handleCloseModal();
  };

  const handleDeleteMember = () => {
    if (selectedMember && !isAddingNew) {
      // Delete existing member
      setMembers(prev =>
        prev.filter(member => member.id !== selectedMember.id)
      );
      console.log('Deleted member:', selectedMember.id);
    }
    handleCloseModal();
  };

  return (
    <div className="member-page-container">
      <MemberList
        members={members}
        onMemberSelect={handleMemberSelect}
        onAddMember={handleAddMember}
        onEditMember={handleMemberSelect}
      />

      {showMemberModal && selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={handleCloseModal}
          onEdit={handleSaveMember}
          onDelete={handleDeleteMember}
          isAddingNew={isAddingNew}
        />
      )}
    </div>
  );
}
