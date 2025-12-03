---
Feature: Tech Console
Component: System Oversight & Maintenance
Document Type: Implementation Design Report
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

# Tech Console Implementation Report (v1.0)

## Executive Summary

The Tech Console module is a specialized, highly controlled interface for technical personnel. It is designed to provide operational oversight, real-time health monitoring, and secure account recovery capabilities, isolating these maintenance functions from both organizational management (Admin) and sensitive personal data (Member). The architecture ensures high accountability through comprehensive audit logging for all privileged actions.

## Purpose Statement

The Tech Console provides operational oversight for system reliability, security, and maintenance within the MKN Management System. It enables technical personnel to manage incidents, monitor performance, and execute controlled recovery operations *without* accessing private member data (names, contacts, branches, etc.). This enforces data privacy while ensuring system resilience and maximum operational uptime.

---

## 1. Directory Structure Analysis

The module is structured to support clean separation of concerns for development, testing, and maintenance.

```
src/features/tech/
├── components/
│   ├── AccountRecovery/          # Card-based account management
│   ├── AuditLogViewer/           # Action tracking & filtering
│   ├── SystemHealth/             # Real-time metrics dashboard
│   ├── NotificationPanel/        # Alert configuration
│   └── MaintenanceTools/         # Safe operational controls
├── services/
│   ├── techService.ts            # Core tech operations
│   ├── auditService.ts           # Audit logging & queries
│   └── systemHealthService.ts    # Health metrics & monitoring
├── routes/
│   ├── TechDashboard.tsx         # Main console layout
│   ├── TechAccountRecovery.tsx   # Account state management
│   ├── TechSystemHealth.tsx      # System metrics display
│   ├── TechAuditLog.tsx          # Action history viewer
│   └── TechMaintenance.tsx       # Maintenance controls
├── hooks/
│   ├── useSystemHealth.ts        # Real-time health monitoring
│   ├── useAuditLog.ts            # Audit log queries & filtering
│   └── useAccountRecovery.ts     # Account recovery operations
└── types/
    ├── tech.ts                   # Tech role interfaces
    ├── system.ts                 # System health types
    └── audit.ts                  # Audit logging types
```

---

## 2. Route Configuration

The Tech routes are nested under a primary `/tech` path, managed by a dedicated layout component, and protected by strong authorization checks.

```typescript
// To be added to AppRoutes.tsx
{
  path: '/tech',
  element: <TechProtectedRoute><TechDashboard /></TechProtectedRoute>, // Protected Route
  children: [
    { path: 'recovery', element: <TechAccountRecovery /> },
    { path: 'health', element: <TechSystemHealth /> },
    { path: 'audit', element: <TechAuditLog /> },
    { path: 'maintenance', element: <TechMaintenance /> },
  ],
}
```

## Tech Console Access Flow

A high-level view of the navigation and privilege management:

```
Login → AuthContext validates role → /tech/dashboard
│
├─ recovery → AccountRecoveryPanel (Account state changes)
├─ health → SystemHealthPanel (Read-only metrics)
├─ audit → AuditLogViewer (Action history)
└─ maintenance → MaintenanceToolsPanel (System controls)
```

---

## 3. Authentication & Authorization

Access is granted exclusively to the `tech` role and, by extension, the `founder` role for emergency and full oversight.

**Required AuthContext Updates:**

```typescript
// Extend UserRole type
type UserRole = 'member' | 'admin' | 'founder' | 'tech';

// Add role check function
function hasTechPrivileges(role: UserRole): boolean {
  return role === 'tech' || role === 'founder';
}

// Create TechProtectedRoute component
const TechProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return hasTechPrivileges(user?.role) ? children : <Navigate to="/unauthorized" />;
};
```

---

## 4. Core Data Models

### Tech Member View (Privacy-Controlled Access)

This view is strictly limited to operational data needed for account recovery and incident management.

```typescript
interface TechMemberView {
  version: '1.0';
  cardNumber: string;
  accountStatus: 'active' | 'locked' | 'flagged' | 'recovery';
  lastLogin: Date | null;
  failedAttempts: number;
  securityFlags: string[];
  // Explicitly EXCLUDED: name, branch, role, contact info, personal data
}
```

### Audit Log Schema (Accountability)

Every privileged action performed within the Tech Console is logged comprehensively.

```typescript
interface TechAuditLog {
  id: string;
  techUserId: string;
  actionType: 'ACCOUNT_UNLOCK' | 'PASSWORD_RESET' | 'CACHE_CLEAR' | 'BACKUP_TRIGGER';
  targetCardNumber: string; // References member
  oldState: Record<string, any>;
  newState: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}
```

### System Health Metrics (Monitoring)

Read-only data providing real-time system performance and status information.

```typescript
interface SystemHealth {
  version: '1.0';
  apiStatus: 'healthy' | 'degraded' | 'down';
  databaseStatus: 'connected' | 'disconnected';
  queueStatus: 'running' | 'stalled' | 'stopped';
  memoryUsage: number; // Percentage
  cpuUsage: number;    // Percentage
  errorRate: number;   // Errors per minute
  activeSessions: number;
  frontendVersion: string;
  lastDeployment: Date;
}
```

---

## 5. Security Boundaries and Permissions Matrix

| Role | Data Access | Primary Actions | System View | Edit Configurations |
| :--- | :--- | :--- | :--- | :--- |
| **Tech** | Card numbers + account states only | Account recovery, system maintenance | Full health metrics | No |
| **Admin** | Full member data (organizational) | Member management, duties, attendance | Limited (Org context) | No |
| **Founder** | Complete system access | Strategic controls, system ownership | Full health metrics | Yes |

**Action-Specific Permissions:**

| Action | Tech | Admin | Founder |
| :--- | :--- | :--- | :--- |
| View member info (personal) | No | Yes | Yes |
| Unlock accounts | Yes | Yes | Yes |
| Clear cache / backups | Yes | No | Yes |
| System health view | Yes | Limited | Yes |
| Edit configurations | No | No | Yes |

---

## 6. Implementation Priority Order (Phase 1 Complete)

**PHASE 1: Foundation (Week 1) [COMPLETED]**
1.  ✅ Extend AuthContext with Tech role
2.  ✅ Create Tech route structure
3.  ✅ Build TechDashboard layout
4.  🔄 Implement useSystemHealth hook (mock data) - *Pushed to Phase 2*
5.  🔄 Create AccountRecovery panel (card number lookup) - *Pushed to Phase 2*

**PHASE 2: Core Features (Week 2) [CURRENT FOCUS]**
1.  🔄 Implement audit logging service
2.  🔄 Build SystemHealth dashboard
3.  🔄 Create MaintenanceTools panel
4.  🔄 Add Telegram notification mock

**PHASE 3: Polish (Week 3)**
1.  🔄 Implement AuditLog viewer with filters
2.  🔄 Add email digest system
3.  🔄 Performance optimization
4.  🔄 Security hardening

---

## 7. Key Technical Decisions

1.  **Card-Number-Only Access:** Tech cannot view personal member information, upholding privacy.
2.  **Comprehensive Audit Logging:** Every privileged action is tracked with full context for accountability.
3.  **Real-time Health Monitoring:** System status is visible at a glance for immediate incident response.
4.  **Safe Operational Controls:** Maintenance tools include necessary confirmation dialogs to prevent accidental system changes.
5.  **Modular Architecture:** Each panel is independently testable and maintainable, crucial for a sensitive operational module.

---

## Disclaimer

The Tech Console is currently under frontend-only simulation within the Termux environment. All system health metrics, recovery operations, and notifications are mock implementations designed to define the architectural contract for future backend integration. No real data or credentials are processed in this phase, and all services use simulated local data stores.

**End of Report**
