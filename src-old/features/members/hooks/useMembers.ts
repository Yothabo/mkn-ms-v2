import { useState, useMemo, useEffect } from 'react';
import { ExtendedMember } from '../../../data/mock/types';
import { memberService, MemberFilters } from '../services/memberService';

export const useMembers = () => {
  const [members, setMembers] = useState<ExtendedMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MemberFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadMembers = () => {
      setLoading(true);
      try {
        const allMembers = memberService.getAllMembers();
        setMembers(allMembers);
      } catch (error) {
        console.error('Error loading members:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    let result = members;

    if (searchQuery) {
      result = memberService.searchMembers(searchQuery);
    }

    if (Object.keys(filters).length > 0) {
      result = memberService.filterMembers(filters);
    }

    return result;
  }, [members, filters, searchQuery]);

  const stats = useMemo(() => memberService.getMemberStats(), [members]);
  const branchStats = useMemo(() => memberService.getBranchStats(), [members]);
  const uniqueValues = useMemo(() => memberService.getUniqueValues(), [members]);
  const newMembers = useMemo(() => memberService.getNewMembers(), [members]);

  const updateMember = (id: string, updates: Partial<ExtendedMember>) => {
    const updatedMember = memberService.updateMember(id, updates);
    if (updatedMember) {
      setMembers(prev => prev.map(m => m.id === id ? updatedMember : m));
      return updatedMember;
    }
    return null;
  };

  const addMember = (memberData: Partial<ExtendedMember>) => {
    try {
      const newMember = memberService.addMember(memberData);
      setMembers(prev => [...prev, newMember]);
      return newMember;
    } catch (error) {
      console.error('Error adding member:', error);
      throw error;
    }
  };

  const deleteMember = (id: string) => {
    const success = memberService.deleteMember(id);
    if (success) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
    return success;
  };

  const getMemberById = (id: string) => {
    return memberService.getMemberById(id);
  };

  const getMembersByBranch = (branchId: string) => {
    return memberService.getMembersByBranch(branchId);
  };

  const getMembersByStatus = (status: string) => {
    return memberService.getMembersByStatus(status);
  };

  const createEmptyMember = (branch?: string): Partial<ExtendedMember> => {
    const today = new Date().toISOString().split('T')[0];
    return {
      name: '',
      surname: '',
      gender: 'male',
      dateOfBirth: today,
      phone: '',
      dateOfEntry: today,
      reasonOfEntry: '',
      nextOfKin: {
        name: '',
        surname: '',
        relationship: 'parent',
        phone: '',
        address: ''
      },
      address: '',
      status: 'active',
      position: 'member',
      purity: 'virgin',
      mainBranch: branch || 'bulawayo-hq',
      lastAttendance: today,
      isYouth: false,
      isFemale: false,
      raHistory: [] // New members don't have RA history
    };
  };

  const isNewMember = (member: ExtendedMember): boolean => {
    const entryDate = new Date(member.dateOfEntry);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return entryDate > threeMonthsAgo && member.status !== 'deceased';
  };

  return {
    members: filteredMembers,
    allMembers: members,
    loading,
    filters,
    searchQuery,
    newMembers,
    setFilters,
    setSearchQuery,
    updateMember,
    addMember,
    deleteMember,
    getMemberById,
    getMembersByBranch,
    getMembersByStatus,
    createEmptyMember,
    isNewMember,
    stats,
    branchStats,
    uniqueValues
  };
};

export default useMembers;
