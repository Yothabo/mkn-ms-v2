/* src/features/members/components/admin/MemberDetailsModal/constants.ts */
import { branches } from '../../../../../config/branches';

export const SELECT_OPTIONS = {
  gender: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ],
  status: [
    { value: 'deceased', label: 'Deceased' } // Only deceased for existing members
  ],
  statusForNew: [
    { value: 'active', label: 'Active' } // Only active for new members
  ],
  position: [
    { value: 'facilitator', label: 'Facilitator' },
    { value: 'evangelist', label: 'Evangelist' },
    { value: 'messenger', label: 'Messenger' },
    { value: 'member', label: 'Member' },
    { value: 'songster', label: 'Songster' },
    { value: 'steward', label: 'Steward' },
    { value: 'conciliator', label: 'Conciliator' },
    { value: 'clerk', label: 'Clerk' }
  ],
  branch: branches.map(branch => ({
    value: branch.id,
    label: branch.name
  })),
  purity: [
    { value: 'virgin', label: 'Virgin' },
    { value: 'none', label: 'None' },
    { value: 'inapplicable', label: 'Inapplicable' }
  ],
  relationship: [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'other', label: 'Other' }
  ]
};
