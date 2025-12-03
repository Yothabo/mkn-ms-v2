import { embeddedMembers } from './verificationMembers.data';

// Convert to mock verification format
const mockMembers = embeddedMembers.map(member => ({
  firstName: member.name,
  lastName: member.surname,
  cardReceiptNumber: member.cardNumber ? member.cardNumber.toString() : member.receiptNumber || '',
  email: member.email || `${member.name.toLowerCase()}.${member.surname.toLowerCase()}@mkn.org`,
  phone: member.phone,
  branch: member.mainBranch || 'system',
  fullMember: member // Include full member data for auth context
}));

export const logTestAccounts = () => {
  console.log('=== AVAILABLE TEST ACCOUNTS ===');
  console.log('Use these card/receipt numbers for testing:');
  mockMembers.forEach((member, index) => {
    console.log(`${index + 1}. ${member.firstName} ${member.lastName} - ${member.cardReceiptNumber} (${embeddedMembers[index].position})`);
  });
  console.log('');
  console.log('=== TEST SCENARIOS ===');
  console.log('Active Member: 1001 (Sipho Ndlovu)');
  console.log('New Member: RCPT20241001 (Thandeka Khumalo)');
  console.log('Pre-RA Member: 1003 (Bongani Moyo)');
  console.log('RA Member: 1004 (Nompumelelo Dube)');
  console.log('Inactive Member: 1005 (Jabulani Mpofu)');
  console.log('Deceased Member: 1006 (Nkosinathi Sibanda)');
  console.log('Admin User: 1111 (Admin User) - Evangelist position');
  console.log('Founder: 9999 (Founder MKN)');
};

export { mockMembers };
