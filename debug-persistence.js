// Run this in browser console to check current state
console.log('=== CURRENT LOCALSTORAGE STATE ===');
console.log('admin-current-view:', localStorage.getItem('mkn-admin-current-view'));
console.log('founder-current-view:', localStorage.getItem('mkn-founder-current-view'));
console.log('tech-current-view:', localStorage.getItem('mkn-tech-current-view'));
console.log('member-layout-current-view:', localStorage.getItem('mkn-member-layout-current-view'));
console.log('admin-view-mode:', localStorage.getItem('mkn-admin-view-mode'));
console.log('founder-view-mode:', localStorage.getItem('mkn-founder-view-mode'));

// Test the getPersistedView functions from route files
function testRoutePersistence() {
  const adminView = localStorage.getItem('admin-current-view');
  const founderView = localStorage.getItem('mkn-founder-current-view');
  const techView = localStorage.getItem('tech-current-view');
  const memberView = localStorage.getItem('member-layout-current-view');
  
  console.log('=== ROUTE FILE PERSISTENCE ===');
  console.log('AdminRoutes would redirect to:', adminView && adminView !== 'undefined' ? adminView : 'dashboard');
  console.log('FounderRoutes would redirect to:', founderView && founderView !== 'undefined' ? founderView : 'founder-dashboard');
  console.log('TechRoutes would redirect to:', techView && techView !== 'undefined' ? techView : 'dashboard');
  console.log('MemberRoutes would redirect to:', memberView && memberView !== 'undefined' ? memberView : 'home');
}

testRoutePersistence();
