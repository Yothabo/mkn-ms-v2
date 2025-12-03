import React, { useState, useMemo, useEffect } from 'react';
import { Close, Check } from '@mui/icons-material';
import { Person } from '@mui/icons-material';
import "../../styles/member-details-modal.css";

interface MemberFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  currentFilters: any;
  onClearAll?: () => void;
}

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

export default function MemberFiltersModal({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
  onClearAll
}: MemberFiltersModalProps) {
  const [filters, setFilters] = useState(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  const handleClearAll = () => {
    const emptyFilters = {
      ageGroup: [],
      branch: [],
      position: [],
      status: [],
      gender: [],
      purity: []
    };
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).reduce((count: number, value: any) => {
      return count + value.length;
    }, 0);
  }, [filters]);

  if (!isOpen) return null;

  return (
    <div className="member-modal-overlay" onClick={onClose}>
      <div className="member-modal-frosty-overlay" />

      <div className="member-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="member-modal-top-bar">
          <div className="member-modal-profile-avatar status-default">
            <Person className="member-modal-profile-icon" />
          </div>

          <div className="member-modal-action-buttons">
            <button
              className="member-modal-icon-button member-modal-save-button"
              onClick={handleApply}
            >
              <Check className="member-modal-action-icon" />
            </button>
            <button
              className="member-modal-icon-button"
              onClick={onClose}
            >
              <Close className="member-modal-action-icon" />
            </button>
          </div>
        </div>

        <div className="member-modal-body">
          <div className="member-modal-sections-container">
            {/* Age Group Filter */}
            <div className="member-modal-info-container">
              <h3 className="member-modal-section-title">Age Group</h3>
              <div className="member-modal-info-content">
                {AGE_GROUPS.map(group => (
                  <label key={group.value} className="member-modal-checkbox-label">
                    <input
                      type="checkbox"
                      className="member-modal-checkbox"
                      checked={filters.ageGroup?.includes(group.value) || false}
                      onChange={() => handleFilterChange('ageGroup', group.value)}
                    />
                    <span className="member-modal-checkmark"></span>
                    <span className="member-modal-checkbox-text">{group.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Branch Filter */}
            <div className="member-modal-info-container">
              <h3 className="member-modal-section-title">Branch</h3>
              <div className="member-modal-info-content">
                {BRANCHES.map(branch => (
                  <label key={branch.value} className="member-modal-checkbox-label">
                    <input
                      type="checkbox"
                      className="member-modal-checkbox"
                      checked={filters.branch?.includes(branch.value) || false}
                      onChange={() => handleFilterChange('branch', branch.value)}
                    />
                    <span className="member-modal-checkmark"></span>
                    <span className="member-modal-checkbox-text">{branch.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Position Filter */}
            <div className="member-modal-info-container">
              <h3 className="member-modal-section-title">Position</h3>
              <div className="member-modal-info-content">
                {POSITIONS.map(position => (
                  <label key={position.value} className="member-modal-checkbox-label">
                    <input
                      type="checkbox"
                      className="member-modal-checkbox"
                      checked={filters.position?.includes(position.value) || false}
                      onChange={() => handleFilterChange('position', position.value)}
                    />
                    <span className="member-modal-checkmark"></span>
                    <span className="member-modal-checkbox-text">{position.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="member-modal-info-container">
              <h3 className="member-modal-section-title">Status</h3>
              <div className="member-modal-info-content">
                {STATUSES.map(status => (
                  <label key={status.value} className="member-modal-checkbox-label">
                    <input
                      type="checkbox"
                      className="member-modal-checkbox"
                      checked={filters.status?.includes(status.value) || false}
                      onChange={() => handleFilterChange('status', status.value)}
                    />
                    <span className="member-modal-checkmark"></span>
                    <span className="member-modal-checkbox-text">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="member-modal-info-container">
              <h3 className="member-modal-section-title">Gender</h3>
              <div className="member-modal-info-content">
                {GENDERS.map(gender => (
                  <label key={gender.value} className="member-modal-checkbox-label">
                    <input
                      type="checkbox"
                      className="member-modal-checkbox"
                      checked={filters.gender?.includes(gender.value) || false}
                      onChange={() => handleFilterChange('gender', gender.value)}
                    />
                    <span className="member-modal-checkmark"></span>
                    <span className="member-modal-checkbox-text">{gender.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Purity Status Filter */}
            <div className="member-modal-info-container">
              <h3 className="member-modal-section-title">Purity Status</h3>
              <div className="member-modal-info-content">
                {PURITY_STATUS.map(purity => (
                  <label key={purity.value} className="member-modal-checkbox-label">
                    <input
                      type="checkbox"
                      className="member-modal-checkbox"
                      checked={filters.purity?.includes(purity.value) || false}
                      onChange={() => handleFilterChange('purity', purity.value)}
                    />
                    <span className="member-modal-checkmark"></span>
                    <span className="member-modal-checkbox-text">{purity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Clear All Filters Button */}
          <div style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
            <button
              onClick={handleClearAll}
              className="clear-filters-button"
              style={{ width: '100%' }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
