import { useState, useMemo, useEffect } from 'react';
import { ExtendedMember } from '../../../data/mock/types';
import { memberService, MemberFilters } from '../services/memberService';

export const useMembers = () => {
  const [members, setMembers] = useState<ExtendedMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MemberFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Load all members on mount
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

  // Apply filters and search
  const filteredMembers = useMemo(() => {
    let result = members;

    // Apply search query
    if (searchQuery) {
      result = memberService.searchMembers(searchQuery);
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      result = memberService.filterMembers(filters);
    }

    return result;
  }, [members, filters, searchQuery]);

  // Statistics
  const stats = useMemo(() => memberService.getMemberStats(), [members]);
  const branchStats = useMemo(() => memberService.getBranchStats(), [members]);
  const uniqueValues = useMemo(() => memberService.getUniqueValues(), [members]);

  // Member actions
  const updateMember = (id: string, updates: Partial<ExtendedMember>) => {
    const updatedMember = memberService.updateMember(id, updates);
    if (updatedMember) {
      setMembers(prev => prev.map(m => m.id === id ? updatedMember : m));
      return updatedMember;
    }
    return null;
  };

  const addMember = (member: ExtendedMember) => {
    const newMember = memberService.addMember(member);
    setMembers(prev => [...prev, newMember]);
    return newMember;
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

  return {
    // State
    members: filteredMembers,
    allMembers: members,
    loading,
    filters,
    searchQuery,
    
    // Actions
    setFilters,
    setSearchQuery,
    updateMember,
    addMember,
    deleteMember,
    getMemberById,
    getMembersByBranch,
    getMembersByStatus,
    
    // Data
    stats,
    branchStats,
    uniqueValues
  };
};

export default useMembers;
