import { Member } from '../../../config/members';
import { ExtendedMember } from '../../../data/mock/types';
import { 
  bulawayoMembers, 
  harareMembers, 
  johannesburgMembers, 
  pretoriaMembers, 
  gaboroneMembers 
} from '../../../data/mock';

// Combine all members from all branches
const allMembers: ExtendedMember[] = [
  ...bulawayoMembers,
  ...harareMembers,
  ...johannesburgMembers,
  ...pretoriaMembers,
  ...gaboroneMembers
];

export interface MemberFilters {
  branch?: string;
  status?: string;
  position?: string;
  purity?: string;
  search?: string;
  isYouth?: boolean;
  isFemale?: boolean;
}

class MemberService {
  private members: ExtendedMember[] = allMembers;

  // Get all members
  getAllMembers(): ExtendedMember[] {
    return this.members;
  }

  // Get members by branch
  getMembersByBranch(branchId: string): ExtendedMember[] {
    return this.members.filter(member => member.mainBranch === branchId);
  }

  // Get member by ID
  getMemberById(id: string): ExtendedMember | undefined {
    return this.members.find(member => member.id === id);
  }

  // Filter members with multiple criteria
  filterMembers(filters: MemberFilters): ExtendedMember[] {
    return this.members.filter(member => {
      if (filters.branch && member.mainBranch !== filters.branch) return false;
      if (filters.status && member.status !== filters.status) return false;
      if (filters.position && member.position !== filters.position) return false;
      if (filters.purity && member.purity !== filters.purity) return false;
      if (filters.isYouth !== undefined && member.isYouth !== filters.isYouth) return false;
      if (filters.isFemale !== undefined && member.isFemale !== filters.isFemale) return false;
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const fullName = `${member.name} ${member.surname}`.toLowerCase();
        const phone = member.phone.toLowerCase();
        
        if (!fullName.includes(searchTerm) && !phone.includes(searchTerm)) {
          return false;
        }
      }
      
      return true;
    });
  }

  // Get members by status
  getMembersByStatus(status: string): ExtendedMember[] {
    return this.members.filter(member => member.status === status);
  }

  // Get statistics
  getMemberStats() {
    const total = this.members.length;
    const active = this.members.filter(m => m.status === 'active').length;
    const preRa = this.members.filter(m => m.status === 'preRa').length;
    const ra = this.members.filter(m => m.status === 'ra').length;
    const inactive = this.members.filter(m => m.status === 'inactive').length;
    const deceased = this.members.filter(m => m.status === 'deceased').length;
    const youth = this.members.filter(m => m.isYouth).length;
    const female = this.members.filter(m => m.isFemale).length;

    return {
      total,
      active,
      preRa,
      ra,
      inactive,
      deceased,
      youth,
      female,
      male: total - female
    };
  }

  // Get branch statistics
  getBranchStats() {
    const branches = ['bulawayo-hq', 'harare', 'johannesburg-shq', 'pretoria', 'gaborone'];
    
    return branches.map(branchId => {
      const branchMembers = this.getMembersByBranch(branchId);
      return {
        branchId,
        total: branchMembers.length,
        active: branchMembers.filter(m => m.status === 'active').length,
        preRa: branchMembers.filter(m => m.status === 'preRa').length,
        ra: branchMembers.filter(m => m.status === 'ra').length
      };
    });
  }

  // Update member
  updateMember(id: string, updates: Partial<ExtendedMember>): ExtendedMember | null {
    const index = this.members.findIndex(member => member.id === id);
    if (index === -1) return null;

    this.members[index] = { ...this.members[index], ...updates };
    return this.members[index];
  }

  // Add new member
  addMember(member: ExtendedMember): ExtendedMember {
    this.members.push(member);
    return member;
  }

  // Delete member
  deleteMember(id: string): boolean {
    const index = this.members.findIndex(member => member.id === id);
    if (index === -1) return false;

    this.members.splice(index, 1);
    return true;
  }

  // Search members
  searchMembers(query: string): ExtendedMember[] {
    const searchTerm = query.toLowerCase();
    return this.members.filter(member => {
      const fullName = `${member.name} ${member.surname}`.toLowerCase();
      const phone = member.phone.toLowerCase();
      const email = member.email?.toLowerCase() || '';
      
      return fullName.includes(searchTerm) || 
             phone.includes(searchTerm) || 
             email.includes(searchTerm);
    });
  }

  // Get unique values for filters
  getUniqueValues() {
    const branches = [...new Set(this.members.map(m => m.mainBranch))];
    const statuses = [...new Set(this.members.map(m => m.status))];
    const positions = [...new Set(this.members.map(m => m.position))];
    const purityStatuses = [...new Set(this.members.map(m => m.purity))];

    return {
      branches,
      statuses,
      positions,
      purityStatuses
    };
  }
}

export const memberService = new MemberService();
export default memberService;
