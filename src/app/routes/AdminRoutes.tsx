import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard/Dashboard';
import Members from '../../pages/admin/Members/Members';
import Attendance from '../../pages/admin/Attendance/Attendance';
import Duties from '../../pages/admin/Duties/Duties';
import Feed from '../../pages/member/Feed/Feed';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="members" element={<Members />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="duties" element={<Duties />} />
      <Route path="feed" element={<Feed />} />
      
      {/* Empty catch-all - let the layout handle ALL persistence */}
      <Route path="*" element={null} />
    </Routes>
  );
}
