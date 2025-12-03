import { Routes, Route } from 'react-router-dom';
import {
  TechDashboard,
  TechAccountRecovery,
  TechSystemHealth,
  TechAuditLog,
  TechMaintenance
} from '../../pages/tech';

export default function TechRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<TechDashboard />} />
      <Route path="recovery" element={<TechAccountRecovery />} />
      <Route path="health" element={<TechSystemHealth />} />
      <Route path="audit" element={<TechAuditLog />} />
      <Route path="maintenance" element={<TechMaintenance />} />
      
      {/* Empty catch-all - let the layout handle ALL persistence */}
      <Route path="*" element={null} />
    </Routes>
  );
}
