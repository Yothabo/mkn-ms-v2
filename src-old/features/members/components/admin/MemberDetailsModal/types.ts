/* src/features/members/components/admin/MemberDetailsModal/types.ts */
import { ExtendedMember } from '../../../../../data/mock/types';

export interface MemberDetailsModalProps {
  member: ExtendedMember;
  onClose: () => void;
  onEdit: (updatedMember: ExtendedMember) => void;
  onDelete: () => void;
  onChat?: () => void;
  isAddingNew?: boolean;
}

export type ViewState =
  | 'details'
  | 'delete-warning'
  | 'delete-loading'
  | 'delete-success'
  | 'chat'
  | 'editing'
  | 'deceased-info';

export type CustomModalType = 'date' | 'select' | null;
export type CustomModalField = string | null;

export interface DeceasedInfo {
  dateOfDeath: string;
  causeOfDeath: string;
  burialPlace: string;
}

export interface CustomModalState {
  type: CustomModalType;
  field: CustomModalField;
  options?: any[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface RAInfo {
  startDate: Date | null;
  raDuration: string;
  absenceDuration: string;
}
