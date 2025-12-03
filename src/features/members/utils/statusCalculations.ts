import { ExtendedMember } from '../../../data/mock/interfaces';
import { StatusCount } from '../components/StatusDot';

export const calculateStatusCounts = (members: ExtendedMember[]): StatusCount => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  const counts: StatusCount = {
    active: 0,
    inactive: 0,
    ra: 0,
    preRa: 0,
    new: 0
  };

  members.forEach(member => {
    const entryDate = new Date(member.dateOfEntry);
    const isNewMember = entryDate >= threeMonthsAgo;
    
    // Count by official status
    switch (member.status) {
      case 'active':
        counts.active++;
        break;
      case 'inactive':
        counts.inactive++;
        break;
      case 'ra':
        counts.ra++;
        break;
      case 'preRa':
        counts.preRa++;
        break;
      case 'deceased':
        // Deceased members are counted as inactive for this display
        counts.inactive++;
        break;
    }
    
    // Count new members separately (can overlap with other statuses)
    if (isNewMember) {
      counts.new++;
    }
  });

  return counts;
};
