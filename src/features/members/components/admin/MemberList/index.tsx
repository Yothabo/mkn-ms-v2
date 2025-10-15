/* src/features/members/components/admin/MemberList/index.tsx */
import React, { useState, useMemo } from 'react';
import DataTable from '../../../../../shared/components/tables/DataTable';
import { PersonAdd, Search } from '@mui/icons-material';
import { Member } from '../../../../../config/members';
import { capitalizeText } from './helpers';

interface MemberListProps {
  members: Member[];
  onMemberSelect: (member: Member) => void;
  onAddMember: () => void;
  onEditMember: (member: Member) => void;
  isLoading?: boolean;
}

interface TableColumn {
  key: string;
  header: string;
  width?: string;
  render: (value: any, row?: any) => React.ReactNode;
}

// Simple helper function
const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const MemberList: React.FC<MemberListProps> = ({
  members,
  onMemberSelect,
  onAddMember,
  onEditMember,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Simple search filtering
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members;
    
    const searchLower = searchTerm.toLowerCase();
    return members.filter(member => 
      member.name.toLowerCase().includes(searchLower) ||
      member.surname.toLowerCase().includes(searchLower) ||
      member.phone.includes(searchTerm) ||
      member.email?.toLowerCase().includes(searchLower)
    );
  }, [members, searchTerm]);

  const handleAddMemberClick = () => {
    onAddMember();
  };

  const handleMemberRowClick = (member: any) => {
    onMemberSelect(member);
  };

  // Columns configuration
  const desktopColumns: TableColumn[] = [
    {
      key: 'name',
      header: 'Name',
      width: '18%',
      render: (_value: unknown, row) => (
        <div className="name-container">
          <div className={`status-dot status-${row.status}`} />
          <div className="name truncate">{row.name} {row.surname}</div>
        </div>
      )
    },
    {
      key: 'cardNumber',
      header: 'Card No',
      width: '12%',
      render: (_value: unknown, row) => (
        <div className="card-number truncate">{row.cardNumber || 'N/A'}</div>
      )
    },
    {
      key: 'phone',
      header: 'Phone',
      width: '15%',
      render: (_value: unknown, row) => (
        <div className="phone truncate">{row.phone}</div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      width: '25%',
      render: (_value: unknown, row) => (
        <div className="email-cell truncate">
          {row.email || '—'}
        </div>
      )
    },
    {
      key: 'mainBranch',
      header: 'Branch',
      width: '15%',
      render: (_value: unknown, row) => (
        <div className="branch-cell truncate">
          {capitalizeText(row.mainBranch)}
        </div>
      )
    },
    {
      key: 'position',
      header: 'Position',
      width: '15%',
      render: (value) => (
        <div className="position truncate">{capitalizeText(value)}</div>
      )
    }
  ];

  const mobileColumns: TableColumn[] = [
    {
      key: 'name',
      header: 'Name',
      width: '40%',
      render: (_value: unknown, row) => (
        <div className="name-container">
          <div className={`status-dot status-${row.status}`} />
          <div className="mobile-content">
            <div className="name name-mobile truncate">{row.name} {row.surname}</div>
            <div className="card-number truncate">Card: {row.cardNumber || 'N/A'}</div>
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      header: 'Contact',
      width: '35%',
      render: (_value: unknown, row) => (
        <div className="contact-cell">
          <div className="phone phone-mobile truncate">{row.phone}</div>
          <div className="email-truncate truncate">
            {row.email || 'No email'}
          </div>
        </div>
      )
    },
    {
      key: 'branch',
      header: 'Branch',
      width: '25%',
      render: (_value: unknown, row) => (
        <div className="branch-content">
          <div className="branch branch-mobile truncate">{capitalizeText(row.mainBranch)}</div>
          <div className="position truncate">{capitalizeText(row.position)}</div>
        </div>
      )
    }
  ];

  const isMobile = window.innerWidth < 768;
  const columns = isMobile ? mobileColumns : desktopColumns;

  return (
    <div className="member-list">
      {/* Header with controls */}
      <div className="header">
        <div className="controls">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <button
            className="add-member-button"
            onClick={handleAddMemberClick}
            aria-label="Add Member"
            title="Add Member"
          >
            <PersonAdd className="add-icon" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="members-table-container">
        <DataTable
          columns={columns}
          data={filteredMembers}
          isLoading={isLoading}
          onRowClick={handleMemberRowClick}
          emptyMessage="No members found matching your criteria"
        />
      </div>

      {/* Empty space for bottom navigation */}
      <div className="bottom-spacing" />
    </div>
  );
};

export default MemberList;
