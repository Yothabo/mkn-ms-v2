import { useState } from 'react';
import { MemberFilter } from '../components/MemberHeader';
import { ExtendedMember } from '../../../data/mock/interfaces';

export const useMemberFilters = (initialFilters: MemberFilter = {
  search: ''
}) => {
  const [filters, setFilters] = useState<MemberFilter>(initialFilters);

  const filterMembers = (members: ExtendedMember[]): ExtendedMember[] => {
    if (!filters.search) return members;

    const searchTerm = filters.search.toLowerCase();
    return members.filter((member) => {
      const searchableFields = [
        member.name,
        member.surname,
        member.phone,
        member.email
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchableFields.includes(searchTerm);
    });
  };

  return {
    filters,
    setFilters,
    filterMembers
  };
};
