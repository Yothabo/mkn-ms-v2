import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import Members from '../pages/admin/Members';
import Attendance from '../pages/admin/Attendance';
import Duties from '../pages/admin/Duties';
import Analytics from '../pages/admin/Analytics';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="members" element={<Members />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="duties" element={<Duties />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}
