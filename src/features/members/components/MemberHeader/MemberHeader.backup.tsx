import React from 'react';
import { Input, Button, Select } from '../../../../shared/ui';
import { Member, MemberStatus } from '../../../../config/schemas/members';
import { branches } from '../../../../config/branches';
import { memberPositions, memberStatuses } from '../../../../config/members';
import styles from './MemberHeader.module.css';

export interface MemberFilter {
  search: string;
  branch: string;
  position: string;
  status: string;
}

interface MemberHeaderProps {
  filters: MemberFilter;
  onFiltersChange: (filters: MemberFilter) => void;
  onAddMember: () => void;
  memberCount?: number;
  isLoading?: boolean;
}

export const MemberHeader: React.FC<MemberHeaderProps> = ({
  filters,
  onFiltersChange,
  onAddMember,
  memberCount,
  isLoading = false
}) => {
  const handleFilterChange = (key: keyof MemberFilter, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const branchOptions = [
    { value: '', label: 'All Branches' },
    ...branches.map(branch => ({
      value: branch.id,
      label: branch.name
    }))
  ];

  const positionOptions = [
    { value: '', label: 'All Positions' },
    ...Object.entries(memberPositions).map(([key, value]) => ({
      value: key,
      label: value.name
    }))
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...Object.entries(memberStatuses).map(([key, value]) => ({
      value: key,
      label: value.name
    }))
  ];

  return (
    <div className={styles.memberHeader}>
      <div className={styles.headerTop}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Members</h1>
          {memberCount !== undefined && (
            <span className={styles.memberCount}>
              {memberCount} {memberCount === 1 ? 'member' : 'members'}
            </span>
          )}
        </div>
        
        <Button
          variant="primary"
          size="md"
          onClick={onAddMember}
          isLoading={isLoading}
          className={styles.addButton}
        >
          Add Member
        </Button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <Input
            placeholder="Search members by name, phone, or email..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <Select
            value={filters.branch}
            onChange={(e) => handleFilterChange('branch', e.target.value)}
            options={branchOptions}
            placeholder="Branch"
            className={styles.filterSelect}
          />

          <Select
            value={filters.position}
            onChange={(e) => handleFilterChange('position', e.target.value)}
            options={positionOptions}
            placeholder="Position"
            className={styles.filterSelect}
          />

          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            options={statusOptions}
            placeholder="Status"
            className={styles.filterSelect}
          />
        </div>
      </div>
    </div>
  );
};
