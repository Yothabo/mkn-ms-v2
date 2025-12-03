// Simple test to check if member data loads
console.log('Testing member data...');

// Try to import and check the data
import('./src/data/mock/members/bulawayoMembers.js').then(module => {
  console.log('Bulawayo members:', module.bulawayoMembers.length);
}).catch(err => {
  console.error('Error loading members:', err);
});
