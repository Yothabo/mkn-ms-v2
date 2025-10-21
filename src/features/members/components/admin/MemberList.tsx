import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import DataTable from '../../../../shared/components/tables/DataTable';
import { ExtendedMember, MemberStatus, Position } from '../../../../config/members';
import { FilterList, PersonAdd, Clear, Check, Search } from '@mui/icons-material';
import MemberFiltersModal from './MemberFiltersModal';
import '../../styles/member-styles.css';

// Types
interface MemberListProps {
  members: ExtendedMember[];
  onMemberSelect: (member: ExtendedMember) => void;
  onAddMember: () => void;
  onEditMember: (member: ExtendedMember) => void;
  isLoading?: boolean;
}

interface FilterState {
  ageGroup: string[];
  branch: string[];
  position: string[];
  status: string[];
  gender: string[];
  purity: string[];
}

// Constants
const AGE_GROUPS = [
  { value: '0-12', label: '0 - 12' },
  { value: '13-23', label: '13 - 23' },
  { value: '23-35', label: '23 - 35' },
  { value: '36-49', label: '36 - 49' },
  { value: '60+', label: '60+' }
];

const BRANCHES = [
  { value: 'bulawayo-hq', label: 'Bulawayo' },
  { value: 'harare', label: 'Harare' },
  { value: 'johannesburg-shq', label: 'Johannesburg' },
  { value: 'pretoria', label: 'Pretoria' },
  { value: 'gaborone', label: 'Gaborone' }
];

const POSITIONS = [
  { value: 'facilitator', label: 'Facilitator' },
  { value: 'evangelist', label: 'Evangelist' },
  { value: 'messenger', label: 'Messenger' },
  { value: 'member', label: 'Member' },
  { value: 'songster', label: 'Songster' },
  { value: 'steward', label: 'Steward' },
  { value: 'conciliator', label: 'Conciliator' },
  { value: 'clerk', label: 'Clerk' }
];

const STATUSES = [
  { value: 'active', label: 'Active Members' },
  { value: 'new', label: 'New Members' },
  { value: 'preRa', label: 'Pre-RA Members' },
  { value: 'ra', label: 'RA Members' },
  { value: 'inactive', label: 'Inactive Members' },
  { value: 'deceased', label: 'Deceased Members' }
];

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const PURITY_STATUS = [
  { value: 'virgin', label: 'Virgin' },
  { value: 'non-virgin', label: 'Non-Virgin' },
  { value: 'inapplicable', label: 'Inapplicable' }
];

const DEFINITIONS = [
  {
    title: 'RA (Re-Admission)',
    status: 'ra',
    description: 'A status assigned to a member who has not attended for 3 months. This indicates they are eligible for re-admission into active participation, subject to congregational processes, and serves as a marker for tracking their return.'
  },
  {
    title: 'Pre-RA',
    status: 'preRa',
    description: 'A warning status applied to a member who is 30 days away from attaining RA status due to inactivity. This acts as a final notice to encourage attendance before re-admission becomes necessary.'
  },
  {
    title: 'Inactive',
    status: 'inactive',
    description: 'Denotes a member who is no longer actively participating, either because they are deceased or have formally left the religion. This status is permanent and excludes them from active attendance or duty rosters.'
  },
  {
    title: 'RA Lock',
    status: 'ra',
    description: 'Restricts a member\'s account due to prolonged inactivity leading to RA status (3 months without attendance), preventing further activity until re-admission is processed.'
  },
  {
    title: 'Warning',
    status: 'preRa',
    description: 'A temporary restriction applied to a member\'s account when they are approaching the inactivity threshold (e.g., 30 days from RA), serving as a cautionary measure to prompt engagement.'
  },
  {
    title: 'Deceased',
    status: 'deceased',
    description: 'Permanently locks a member\'s account upon confirmation of their passing, halting all activity and tracking.'
  },
  {
    title: 'Untracked',
    status: 'inactive',
    description: 'Indicates a member\'s account is fully restricted and no longer monitored for attendance or other metrics. This applies after a member has accumulated 4 RA statuses, signifying a long-term disengagement from the congregation.'
  },
  {
    title: 'Regular Attendance',
    status: 'active',
    description: 'Records a member\'s attendance at their designated home branch, fully contributing to their activity requirements and maintaining their active status.'
  },
  {
    title: 'Guest Attendance',
    status: 'active',
    description: 'Logs attendance at a branch other than the member\'s home branch, still counting toward activity requirements as valid participation and reflecting flexibility in attendance options.'
  },
  {
    title: 'Virgin',
    status: 'active',
    description: 'Actively monitored for youths aged 13 to 35, where spiritual purity (virginity) is a requirement for specific duties or rites within the congregation. This status is critical for eligibility in roles demanding this criterion.'
  },
  {
    title: 'Non-Virgin',
    status: 'inactive',
    description: 'Applies to youth members (ages 13-35) who no longer meet the virginity requirement for certain congregational duties and rites.'
  },
  {
    title: 'Inapplicable',
    status: 'other',
    description: 'Indicates exemption from the virginity status check, applying to members who are Evangelists, Holy Messengers, married, have children, are above 35 years old, or are below 13 years old. This status reflects roles, life stages, or ages where the requirement does not apply.'
  },
  {
    title: 'New Member',
    status: 'new',
    description: 'Members who have joined within the last 3 months. They are considered new members and may have different participation requirements or mentorship arrangements during their initial integration period.'
  }
];

// Helper functions
const getAgeGroup = (birthDate?: string): string => {
  if (!birthDate) return 'unknown';

  try {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const hasHadBirthday = today.getMonth() > birth.getMonth() ||
                          (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    const actualAge = hasHadBirthday ? age : age - 1;

    if (actualAge <= 12) return '0-12';
    if (actualAge <= 23) return '13-23';
    if (actualAge <= 35) return '23-35';
    if (actualAge <= 49) return '36-49';
    return '60+';
  } catch {
    return 'unknown';
  }
};

// Helper function to check if member is "new" (dateOfEntry less than 3 months)
const isNewMember = (dateOfEntry?: string): boolean => {
  if (!dateOfEntry) return false;

  try {
    const entryDate = new Date(dateOfEntry);
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    return entryDate > threeMonthsAgo;
  } catch {
    return false;
  }
};

// Helper function to get effective status for filtering and display
const getEffectiveStatus = (member: Member): string => {
  // If member has dateOfEntry less than 3 months, they are considered "new"
  if (isNewMember(member.dateOfEntry)) {
    return 'new';
  }
  // Otherwise use their actual status
  return member.status;
};

const capitalizeText = (text: string): string => {
  if (!text) return '';
  return text.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Custom hook for debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Mobile detection hook that works immediately
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    // Add listener for future changes
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export default function MemberList({
  members,
  onMemberSelect,
  onAddMember,
  onEditMember,
  isLoading = false
}: MemberListProps) {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    ageGroup: [],
    branch: [],
    position: [],
    status: [],
    gender: [],
    purity: []
  });

  // Hooks
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const isMobile = useIsMobile(); // This now works immediately

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => value.length > 0);
  }, [filters]);

  // Filtered members - matches the original filtering logic
  const filteredMembers = useMemo(() => {
    let filtered = members.filter(member => {
      // Search term filter
      const searchLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(searchLower) ||
        member.surname.toLowerCase().includes(searchLower) ||
        member.phone.includes(debouncedSearchTerm) ||
        member.email?.toLowerCase().includes(searchLower);

      const memberAgeGroup = getAgeGroup(member.dateOfBirth);
      const matchesAge = filters.ageGroup.length === 0 || filters.ageGroup.includes(memberAgeGroup);
      const matchesBranch = filters.branch.length === 0 || filters.branch.includes(member.mainBranch);
      const matchesPosition = filters.position.length === 0 || filters.position.includes(member.position);

      // Status filter - use effective status for "new" members
      const effectiveStatus = getEffectiveStatus(member);
      const matchesStatus = filters.status.length === 0 || filters.status.includes(effectiveStatus);

      const matchesGender = filters.gender.length === 0 || filters.gender.includes(member.gender);
      const matchesPurity = filters.purity.length === 0 || filters.purity.includes(member.purity);

      return matchesSearch && matchesAge && matchesBranch && matchesPosition && matchesStatus && matchesGender && matchesPurity;
    });

    // Sort alphabetically by surname, then by name
    filtered.sort((a, b) => {
      const surnameCompare = a.surname.localeCompare(b.surname);
      if (surnameCompare !== 0) return surnameCompare;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [members, debouncedSearchTerm, filters]);

  // Count new members for statistics
  const newMembersCount = useMemo(() => {
    return members.filter(member => isNewMember(member.dateOfEntry)).length;
  }, [members]);

  // Event handlers
  const handleRowClick = useCallback((member: Member) => {
    onMemberSelect(member);
  }, [onMemberSelect]);

  const handleApplyFilters = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      ageGroup: [],
      branch: [],
      position: [],
      status: [],
      gender: [],
      purity: []
    });
    setSearchTerm('');
  }, []);

  const handleOpenFilters = useCallback(() => {
    setShowFiltersModal(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setShowFiltersModal(false);
  }, []);

  // Columns configuration - use isMobile immediately
  const desktopColumns = useMemo(() => [
    {
      key: 'name' as const,
      header: 'Name',
      width: '18%',
      render: (_value: unknown, row: Member) => {
        const effectiveStatus = getEffectiveStatus(row);
        return (
          <div className="name-container">
            <div className={`status-dot status-${effectiveStatus}`} />
            <div className="name truncate">{row.name} {row.surname}</div>
          </div>
        );
      }
    },
    {
      key: 'cardNumber' as const,
      header: 'Card No',
      width: '12%',
      render: (_value: unknown, row: Member) => (
        <div className="card-number truncate">{row.cardNumber || 'N/A'}</div>
      )
    },
    {
      key: 'phone' as const,
      header: 'Phone',
      width: '15%',
      render: (_value: unknown, row: Member) => (
        <div className="phone truncate">{row.phone}</div>
      )
    },
    {
      key: 'email' as const,
      header: 'Email',
      width: '25%',
      render: (_value: unknown, row: Member) => (
        <div className="email-cell truncate">
          {row.email || '—'}
        </div>
      )
    },
    {
      key: 'mainBranch' as const,
      header: 'Branch',
      width: '15%',
      render: (_value: unknown, row: Member) => (
        <div className="branch-cell truncate">
          {capitalizeText(row.mainBranch)}
        </div>
      )
    },
    {
      key: 'position' as const,
      header: 'Position',
      width: '15%',
      render: (value: Position) => (
        <div className="position truncate">{capitalizeText(value)}</div>
      )
    }
  ], []);

  const mobileColumns = useMemo(() => [
    {
      key: 'name' as const,
      header: 'Name',
      width: '40%',
      render: (_value: unknown, row: Member) => {
        const effectiveStatus = getEffectiveStatus(row);
        return (
          <div className="name-container">
            <div className={`status-dot status-${effectiveStatus}`} />
            <div className="mobile-content">
              <div className="name name-mobile truncate">{row.name} {row.surname}</div>
              <div className="card-number truncate">Card: {row.cardNumber || 'N/A'}</div>
              {effectiveStatus === 'new' && (
                <div className="position truncate" style={{color: '#3b82f6', fontSize: '0.5rem'}}>New Member</div>
              )}
            </div>
          </div>
        );
      }
    },
    {
      key: 'contact' as const,
      header: 'Contact',
      width: '35%',
      render: (_value: unknown, row: Member) => (
        <div className="contact-cell">
          <div className="phone phone-mobile truncate">{row.phone}</div>
          <div className="email-truncate truncate">
            {row.email || 'No email'}
          </div>
        </div>
      )
    },
    {
      key: 'branch' as const,
      header: 'Branch',
      width: '25%',
      render: (_value: unknown, row: Member) => (
        <div className="branch-content">
          <div className="branch branch-mobile truncate">{capitalizeText(row.mainBranch)}</div>
          <div className="position truncate">{capitalizeText(row.position)}</div>
        </div>
      )
    }
  ], []);

  const columns = isMobile ? mobileColumns : desktopColumns;

  const activeFiltersCount = Object.values(filters).reduce((count: number, value: any) => {
    return count + value.length;
  }, 0);

  return (
    <div className="member-list">
      {/* Header with controls */}
      <div className="header">
        <div className="controls-row">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search members by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <button
            className={`member-modal-icon-button filter-button ${hasActiveFilters ? 'active' : ''}`}
            onClick={handleOpenFilters}
            aria-label="Open filters"
          >
            <FilterList className="member-modal-action-icon" />
            {activeFiltersCount > 0 && (
              <span className="filter-count-badge">{activeFiltersCount}</span>
            )}
          </button>

          <button
            className="member-modal-icon-button add-button member-modal-save-button"
            onClick={onAddMember}
            aria-label="Add Member"
            title="Add Member"
          >
            <PersonAdd className="member-modal-action-icon" />
          </button>
        </div>
      </div>

      {/* Status Legend */}
      <div className="status-section">
        <div className="status-content">
          <div className="status-items">
            <div className="status-item">
              <div className="status-dot status-active" />
              <span className="status-label">Active ({members.filter(m => getEffectiveStatus(m) === 'active').length})</span>
            </div>
            <div className="status-item">
              <div className="status-dot status-new" />
              <span className="status-label">New ({newMembersCount})</span>
            </div>
            <div className="status-item">
              <div className="status-dot status-preRa" />
              <span className="status-label">Pre-RA ({members.filter(m => getEffectiveStatus(m) === 'preRa').length})</span>
            </div>
            <div className="status-item">
              <div className="status-dot status-ra" />
              <span className="status-label">RA ({members.filter(m => getEffectiveStatus(m) === 'ra').length})</span>
            </div>
            <div className="status-item">
              <div className="status-dot status-inactive" />
              <span className="status-label">Inactive ({members.filter(m => getEffectiveStatus(m) === 'inactive').length})</span>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="members-table-container">
        <DataTable
          columns={columns}
          data={filteredMembers}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          emptyMessage="No members found matching your criteria"
        />
      </div>

      {/* Definitions Section */}
      <div className="definitions-header">
        <h2>Status & Policy Definitions</h2>
      </div>

      <div className="definitions-container">
        {DEFINITIONS.map((definition, index) => (
          <div key={index} className="definition-item">
            <div className="definition-header">
              <div className={`status-dot definition-dot status-${definition.status}`} />
              <strong>{definition.title}</strong>
            </div>
            <p>{definition.description}</p>
          </div>
        ))}
      </div>

      {/* Privacy Disclaimer */}
      <div className="privacy-disclaimer">
        <h3>Privacy & Data Usage Policy</h3>
        <p>
          All member information contained in this system is confidential and intended solely for official congregational management. Unauthorized use, disclosure, or distribution of member data is strictly prohibited. Access is granted exclusively for the purpose of supporting religious operations and administrative functions. Any misuse is prohibited.
        </p>
      </div>

      {/* Empty space for bottom navigation */}
      <div className="bottom-spacing" />

      {/* Filters Modal */}
      <MemberFiltersModal
        isOpen={showFiltersModal}
        onClose={handleCloseFilters}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
}
