export * from './schemas/members';

export const memberPositions = {
  facilitator: { name: 'Facilitator', description: 'Service coordination and management' },
  evangelist: { name: 'Evangelist', description: 'Spiritual guidance and evangelism' },
  messenger: { name: 'Messenger', description: 'Message delivery and assistance' },
  member: { name: 'Member', description: 'Regular congregation member' },
  songster: { name: 'Songster', description: 'Leads hymns and worship songs' },
  steward: { name: 'Steward', description: 'Church administration and logistics' },
  conciliator: { name: 'Conciliator', description: 'Conflict resolution and counseling' },
  clerk: { name: 'Clerk', description: 'Record keeping and documentation' }
};

export const purityStatuses = {
  virgin: { name: 'Virgin', description: 'Never engaged in sexual activity' },
  none: { name: 'None', description: 'Not a virgin' },
  inapplicable: { name: 'N/A', description: 'Not applicable (age or position)' }
};

export const memberStatuses = {
  active: { name: 'Active', description: 'Regularly attending services' },
  preRa: { name: 'Pre-RA', description: '60+ days absent from services' },
  ra: { name: 'RA', description: '90+ days absent from services' },
  inactive: { name: 'Inactive', description: 'Permanently removed from active roster' },
  deceased: { name: 'Deceased', description: 'Passed away' }
};
