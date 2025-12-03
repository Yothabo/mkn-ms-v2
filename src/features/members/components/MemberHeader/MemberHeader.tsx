import React from 'react';
import { HiFilter, HiPlus } from 'react-icons/hi';
import Button from '../../../../shared/ui/Button/Button';
import { StatusDot, StatusCount } from '../StatusDot';
import styles from './MemberHeader.module.css';

export interface MemberFilter {
  search: string;
  status?: keyof StatusCount;
}

interface MemberHeaderProps {
  filters: MemberFilter;
  onFiltersChange: (filters: MemberFilter) => void;
  onAddMember: () => void;
  onOpenFilters: () => void;
  statusCounts: StatusCount;
  memberCount?: number;
  isLoading?: boolean;
}

export const MemberHeader: React.FC<MemberHeaderProps> = ({
  filters,
  onFiltersChange,
  onAddMember,
  onOpenFilters,
  statusCounts,
  memberCount,
  isLoading = false
}) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      search: value
    });
  };

  const handleStatusClick = (status: keyof StatusCount) => {
    onFiltersChange({
      ...filters,
      status: status === filters.status ? undefined : status
    });
  };

  return (
    <div className={styles.memberHeader}>
      <div className={styles.headerContent}>
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search members..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.actionsContainer}>
          <Button
            variant="secondary"
            size="md"
            onClick={onOpenFilters}
            className={styles.filterButton}
            title="Filter members"
          >
            <HiFilter size={18} />
            <span className={styles.buttonText}>Filter</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onAddMember}
            isLoading={isLoading}
            className={styles.addButton}
            title="Add new member"
          >
            <HiPlus size={18} />
            <span className={styles.buttonText}>Add Member</span>
          </Button>
        </div>
      </div>

      <div className={styles.statusSection}>
        <StatusDot
          statusCounts={statusCounts}
          onStatusClick={handleStatusClick}
        />
      </div>
    </div>
  );
};
