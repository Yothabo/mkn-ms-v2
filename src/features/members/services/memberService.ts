import { Member } from '../../../config/members';
import { ExtendedMember, RAHistory, calculateDaysSinceLastAttendance, generatePhoneNumber, generateReceiptNumber } from '../../../data/mock/types';
import { validateMember } from '../../../../utils/validation';
import {
  bulawayoMembers,
  harareMembers,
  johannesburgMembers,
  pretoriaMembers,
  gaboroneMembers
} from '../../../data/mock';

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
  hasRAHistory?: boolean;
}

class MemberService {
  private members: ExtendedMember[] = allMembers;

  private generateMemberId(branch: string): string {
    const branchPrefixes: Record<string, string> = {
      'bulawayo-hq': 'bul',
      'harare': 'har', 
      'johannesburg-shq': 'jhb',
      'pretoria': 'pta',
      'gaborone': 'gab'
    };
    
    const prefix = branchPrefixes[branch] || 'mem';
    const existingIds = this.members
      .filter(m => m.id.startsWith(prefix))
      .map(m => parseInt(m.id.split('-')[1]))
      .filter(id => !isNaN(id));
    
    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    return `${prefix}-${nextId.toString().padStart(3, '0')}`;
  }

  private createNewMemberData(partialMember: Partial<ExtendedMember>): ExtendedMember {
    const today = new Date().toISOString().split('T')[0];
    const branch = partialMember.mainBranch || 'bulawayo-hq';
    
    const isNewMember = () => {
      if (!partialMember.dateOfEntry) return true;
      const entryDate = new Date(partialMember.dateOfEntry);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return entryDate > threeMonthsAgo;
    };

    const baseMember: ExtendedMember = {
      id: this.generateMemberId(branch),
      name: partialMember.name || '',
      surname: partialMember.surname || '',
      gender: partialMember.gender || 'male',
      dateOfBirth: partialMember.dateOfBirth || today,
      phone: partialMember.phone || generatePhoneNumber(branch.includes('zimbabwe') ? 'Zimbabwe' : 
                               branch.includes('south') ? 'South Africa' : 'Botswana'),
      dateOfEntry: partialMember.dateOfEntry || today,
      reasonOfEntry: partialMember.reasonOfEntry || 'Seeking spiritual guidance and community',
      nextOfKin: partialMember.nextOfKin || {
        name: '',
        surname: '',
        relationship: 'parent',
        phone: '',
        address: ''
      },
      address: partialMember.address || '',
      raCount: 0,
      raLock: false,
      status: 'active',
      position: partialMember.position || 'member',
      purity: partialMember.purity || 'virgin',
      mainBranch: branch,
      lastAttendance: partialMember.lastAttendance || today,
      isYouth: partialMember.isYouth || false,
      isFemale: partialMember.gender === 'female',
      email: partialMember.email,
      raHistory: [] // New members don't have RA history
    };

    // Add receipt number for new members (less than 3 months)
    if (isNewMember()) {
      baseMember.receiptNumber = generateReceiptNumber();
    } else {
      baseMember.cardNumber = Math.floor(1000 + Math.random() * 9000);
    }

    return baseMember;
  }

  validateRAHistory(raHistory: RAHistory[]): boolean {
    return raHistory.every(ra => {
      if (!ra.raStartDate) return false;
      
      if (ra.raEndDate) {
        const start = new Date(ra.raStartDate);
        const end = new Date(ra.raEndDate);
        return start < end;
      }
      
      return true;
    });
  }

  recalculateMemberStatus(member: ExtendedMember): ExtendedMember {
    if (member.status === 'deceased') return member;
    
    const daysAbsent = calculateDaysSinceLastAttendance(member.lastAttendance);
    const pastRAs = member.raHistory ? member.raHistory.filter(ra => ra.raEndDate).length : 0;
    
    let status: string = 'active';
    
    if (pastRAs >= 3) {
      status = 'inactive';
    } else if (daysAbsent >= 90) {
      status = 'ra';
    } else if (daysAbsent >= 60) {
      status = 'preRa';
    } else {
      status = 'active';
    }
    
    return {
      ...member,
      status,
      raCount: pastRAs + (status === 'ra' ? 1 : 0),
      raLock: pastRAs >= 3
    };
  }

  getAllMembers(): ExtendedMember[] {
    return this.members;
  }

  getMembersByBranch(branchId: string): ExtendedMember[] {
    return this.members.filter(member => member.mainBranch === branchId);
  }

  getMemberById(id: string): ExtendedMember | undefined {
    return this.members.find(member => member.id === id);
  }

  filterMembers(filters: MemberFilters): ExtendedMember[] {
    return this.members.filter(member => {
      if (filters.branch && member.mainBranch !== filters.branch) return false;
      if (filters.status && member.status !== filters.status) return false;
      if (filters.position && member.position !== filters.position) return false;
      if (filters.purity && member.purity !== filters.purity) return false;
      if (filters.isYouth !== undefined && member.isYouth !== filters.isYouth) return false;
      if (filters.isFemale !== undefined && member.isFemale !== filters.isFemale) return false;
      if (filters.hasRAHistory !== undefined) {
        const hasRAHistory = member.raHistory && member.raHistory.length > 0;
        if (hasRAHistory !== filters.hasRAHistory) return false;
      }
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

  getMembersByStatus(status: string): ExtendedMember[] {
    return this.members.filter(member => member.status === status);
  }

  getMembersWithCurrentRA(): ExtendedMember[] {
    return this.members.filter(member =>
      member.raHistory?.some(ra => !ra.raEndDate) && member.status === 'ra'
    );
  }

  getMembersWithRAHistory(): ExtendedMember[] {
    return this.members.filter(member =>
      member.raHistory && member.raHistory.length > 0
    );
  }

  getNewMembers(): ExtendedMember[] {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    return this.members.filter(member => {
      const entryDate = new Date(member.dateOfEntry);
      return entryDate > threeMonthsAgo && member.status !== 'deceased';
    });
  }

  getMemberStats() {
    const total = this.members.length;
    const active = this.members.filter(m => m.status === 'active').length;
    const preRa = this.members.filter(m => m.status === 'preRa').length;
    const ra = this.members.filter(m => m.status === 'ra').length;
    const inactive = this.members.filter(m => m.status === 'inactive').length;
    const deceased = this.members.filter(m => m.status === 'deceased').length;
    const youth = this.members.filter(m => m.isYouth).length;
    const female = this.members.filter(m => m.isFemale).length;
    const withRAHistory = this.getMembersWithRAHistory().length;
    const withCurrentRA = this.getMembersWithCurrentRA().length;
    const newMembers = this.getNewMembers().length;

    return {
      total,
      active,
      preRa,
      ra,
      inactive,
      deceased,
      youth,
      female,
      male: total - female,
      withRAHistory,
      withCurrentRA,
      newMembers
    };
  }

  getBranchStats() {
    const branches = ['bulawayo-hq', 'harare', 'johannesburg-shq', 'pretoria', 'gaborone'];
    return branches.map(branchId => {
      const branchMembers = this.getMembersByBranch(branchId);
      const withCurrentRA = branchMembers.filter(m =>
        m.raHistory?.some(ra => !ra.raEndDate) && m.status === 'ra'
      ).length;
      const newMembers = branchMembers.filter(m => {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const entryDate = new Date(m.dateOfEntry);
        return entryDate > threeMonthsAgo && m.status !== 'deceased';
      }).length;
      
      return {
        branchId,
        total: branchMembers.length,
        active: branchMembers.filter(m => m.status === 'active').length,
        preRa: branchMembers.filter(m => m.status === 'preRa').length,
        ra: branchMembers.filter(m => m.status === 'ra').length,
        withCurrentRA,
        newMembers
      };
    });
  }

  updateMember(id: string, updates: Partial<ExtendedMember>): ExtendedMember | null {
    // Backend validation
    const validationErrors = validateMember({ ...this.getMemberById(id), ...updates });
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map(error => error.error).join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    if (updates.raHistory && !this.validateRAHistory(updates.raHistory)) {
      throw new Error('Invalid RA history data');
    }
    
    const index = this.members.findIndex(member => member.id === id);
    if (index === -1) return null;

    const updatedMember = { ...this.members[index], ...updates };
    
    if (updates.lastAttendance || updates.raHistory) {
      const recalculatedMember = this.recalculateMemberStatus(updatedMember);
      this.members[index] = recalculatedMember;
      return recalculatedMember;
    }
    
    this.members[index] = updatedMember;
    return updatedMember;
  }

  addMember(memberData: Partial<ExtendedMember>): ExtendedMember {
    // Backend validation
    const validationErrors = validateMember(memberData);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map(error => error.error).join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    // Validate required fields
    if (!memberData.name?.trim() || !memberData.surname?.trim()) {
      throw new Error('Name and surname are required');
    }

    const newMember = this.createNewMemberData(memberData);
    
    // New members should not have RA history
    if (newMember.raHistory && newMember.raHistory.length > 0) {
      newMember.raHistory = [];
    }

    const validatedMember = this.recalculateMemberStatus(newMember);
    this.members.push(validatedMember);
    return validatedMember;
  }

  deleteMember(id: string): boolean {
    const index = this.members.findIndex(member => member.id === id);
    if (index === -1) return false;
    this.members.splice(index, 1);
    return true;
  }

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

  getRAHistoryStats() {
    const membersWithRAHistory = this.getMembersWithRAHistory();
    const totalRARecords = membersWithRAHistory.reduce((total, member) =>
      total + (member.raHistory?.length || 0), 0
    );
    const currentRAs = this.getMembersWithCurrentRA().length;
    const pastRAs = membersWithRAHistory.length - currentRAs;
    const removalReasons: Record<string, number> = {};
    membersWithRAHistory.forEach(member => {
      member.raHistory?.forEach(ra => {
        if (ra.raRemovalReason) {
          removalReasons[ra.raRemovalReason] = (removalReasons[ra.raRemovalReason] || 0) + 1;
        }
      });
    });
    return {
      totalRARecords,
      currentRAs,
      pastRAs,
      membersWithRAHistory: membersWithRAHistory.length,
      removalReasons
    };
  }
}

export const memberService = new MemberService();
export default memberService;
