import React from 'react';
import styles from './StatusDot.module.css';

export interface StatusCount {
  active: number;
  inactive: number;
  ra: number;
  preRa: number;
  new: number;
  deceased: number;
}

interface StatusDotProps {
  statusCounts: StatusCount;
  onStatusClick?: (status: keyof StatusCount) => void;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  statusCounts,
  onStatusClick
}) => {
  const statusItems = [
    {
      key: 'active' as const,
      label: 'Active',
      color: 'var(--color-status-active)',
      count: statusCounts.active
    },
    {
      key: 'inactive' as const,
      label: 'Inactive',
      color: 'var(--color-status-inactive)',
      count: statusCounts.inactive
    },
    {
      key: 'ra' as const,
      label: 'RA',
      color: 'var(--color-status-ra)',
      count: statusCounts.ra
    },
    {
      key: 'preRa' as const,
      label: 'Pre-RA',
      color: 'var(--color-status-pre-ra)',
      count: statusCounts.preRa
    },
    {
      key: 'new' as const,
      label: 'New',
      color: 'var(--color-status-info)',
      count: statusCounts.new
    },
    {
      key: 'deceased' as const,
      label: 'Deceased',
      color: 'var(--color-status-deceased)',
      count: statusCounts.deceased
    }
  ];

  const handleStatusClick = (status: keyof StatusCount) => {
    if (onStatusClick) {
      onStatusClick(status);
    }
  };

  return (
    <div className={styles.statusDotContainer}>
      {statusItems.map((item) => (
        <div
          key={item.key}
          className={styles.statusItem}
          onClick={() => handleStatusClick(item.key)}
        >
          <span
            className={styles.statusDot}
            style={{ backgroundColor: item.color }}
            title={`${item.label} members: ${item.count}`}
          />
          <span className={styles.statusLabel}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
