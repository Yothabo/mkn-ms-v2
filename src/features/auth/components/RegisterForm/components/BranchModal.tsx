import { branches } from '../../../../../config/branches';
import styles from '../RegisterForm.module.css';

interface BranchModalProps {
  isOpen: boolean;
  selectedBranch: string;
  onSelectBranch: (branchId: string) => void;
  onClose: () => void;
}

const branchOptions = branches.map((branch) => ({
  value: branch.id,
  label: branch.name,
}));

export default function BranchModal({
  isOpen,
  selectedBranch,
  onSelectBranch,
  onClose,
}: BranchModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={styles.authBranchModalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Select home branch"
    >
      <div className={styles.authBranchModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.authBranchModalHeader}>
          <h3>Select Home Branch</h3>
          <button
            className={styles.authBranchModalClose}
            onClick={onClose}
            aria-label="Close branch selection"
          >
            ×
          </button>
        </div>
        <div className={styles.authBranchList}>
          {branchOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.authBranchOption} ${selectedBranch === option.value ? styles.selected : ''}`}
              onClick={() => onSelectBranch(option.value)}
              aria-pressed={selectedBranch === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
