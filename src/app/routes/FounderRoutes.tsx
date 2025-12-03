import { Routes, Route } from 'react-router-dom';
import FounderDashboard from '../../pages/founder/FounderDashboard/FounderDashboard';
import SystemSettings from '../../pages/founder/SystemSettings/SystemSettings';
import UserManagement from '../../pages/founder/UserManagement/UserManagement';
import Analytics from '../../pages/admin/Analytics/Analytics';

export default function FounderRoutes() {
  return (
    <Routes>
      <Route path="founder-dashboard" element={<FounderDashboard />} />
      <Route path="system-settings" element={<SystemSettings />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="analytics" element={<Analytics />} />

      {/* Empty catch-all - let the layout handle ALL persistence */}
      <Route path="*" element={null} />
    </Routes>
  );
}
