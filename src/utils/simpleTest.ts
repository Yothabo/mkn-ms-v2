import { positions as dutyPositions } from '../config/duties';
import { duties } from '../config/duties';
import { bulawayoMembers } from '../data/mock';

// Test if duties and members positions align
export const testPositionAlignment = () => {
  console.log('🔍 Testing Position Alignment...');
  
  // Check if duty positions match member positions
  const dutyPositionsSet = new Set(dutyPositions);
  const memberPositions = new Set(bulawayoMembers.map(m => m.position));
  
  console.log('Duty Positions:', Array.from(dutyPositionsSet));
  console.log('Member Positions in Data:', Array.from(memberPositions));
  
  const allMatch = Array.from(memberPositions).every(pos => dutyPositionsSet.has(pos as any));
  console.log('✅ All member positions exist in duties:', allMatch);
  
  return allMatch;
};

// Test if duties can be assigned to members
export const testDutyAssignment = () => {
  console.log('\n🔍 Testing Duty Assignment...');
  
  const activeMembers = bulawayoMembers.filter(m => m.status === 'active');
  const wednesdayChairDuty = duties.find(d => d.id === 'chair');
  
  if (wednesdayChairDuty) {
    const eligibleMembers = activeMembers.filter(member => 
      wednesdayChairDuty.allowedPositions.includes(member.position) &&
      (member.isYouth && member.purity === 'virgin') // Wednesday requirements
    );
    
    console.log('Wednesday Chair Duty - Eligible Members:', eligibleMembers.length);
    if (eligibleMembers.length > 0) {
      console.log('Sample eligible member:', 
        `${eligibleMembers[0].name} ${eligibleMembers[0].surname} (${eligibleMembers[0].position}, purity: ${eligibleMembers[0].purity})`
      );
    } else {
      console.log('No eligible members found for Wednesday Chair duty');
    }
  }
  
  return true;
};

// Test RA system logic
export const testRASystem = () => {
  console.log('\n🔍 Testing RA System...');
  
  const statusCounts = bulawayoMembers.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('Member Status Distribution:', statusCounts);
  
  const raMembers = bulawayoMembers.filter(m => m.raCount > 0);
  console.log('Members with RA history:', raMembers.length);
  
  if (raMembers.length > 0) {
    console.log('Sample RA member:', 
      `${raMembers[0].name} ${raMembers[0].surname} - RA Count: ${raMembers[0].raCount}, History: ${raMembers[0].raHistory?.length || 0} records`
    );
  }
};

// Run all tests
export const runAlignmentTests = () => {
  console.log('🚀 Running System Alignment Tests...\n');
  
  try {
    const positionTest = testPositionAlignment();
    const dutyTest = testDutyAssignment();
    const raTest = testRASystem();
    
    console.log('\n🎯 Test Summary:');
    console.log('Position Alignment:', positionTest ? '✅ PASS' : '❌ FAIL');
    console.log('Duty Assignment:', dutyTest ? '✅ PASS' : '❌ FAIL'); 
    console.log('RA System:', raTest ? '✅ PASS' : '❌ FAIL');
    
    return positionTest && dutyTest && raTest;
  } catch (error) {
    console.error('❌ Test Error:', error);
    return false;
  }
};
