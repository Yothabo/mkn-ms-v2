---
Feature: App Shell
Component: AppRoutes, ProtectedRoute, Layout Components
Document Type: Data Flow Specification
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

# App Routes Data Flow – Complete Report (v2)

## Disclaimer

This system is entirely **developed, tested, and optimized within Termux**.
All builds, simulations, and environment configurations are native to Termux’s mobile Linux layer.

While current versions may simulate certain backend behaviors for demonstration,
the underlying architecture and methods are production-ready for direct backend integration.

Every feature in this repository reflects Termux-first principles:
* Lightweight resource efficiency
* Local-first resilience
* Offline-compatible simulation
* Full code portability to standard Node environments

---

## Executive Summary

The AppRoutes system implements a role-based authentication routing architecture with three main user roles (**Founder, Admin, Member**) and sophisticated view mode switching capabilities. The data flow follows a hierarchical structure from authentication state management down to individual page components, ensuring clear separation of duties and secure access control.

---

## Architecture Overview

### 1. Authentication Flow

```
LocalStorage → AuthContext → AppRoutes → ProtectedRoute → Layout Components
```

**Key Data Points:**
* **Storage:** `localStorage` with key `mkn-auth-user`
* **Auth State:** Managed via `AuthContext` with user object and `isAuthenticated` boolean
* **Persistence:** User data persists across browser sessions

### 2. Role Hierarchy & Permissions

| Role | Access | View Modes | Primary Layout |
| :--- | :--- | :--- | :--- |
| **Founder** (Top-level) | Founder, Admin, Member routes | Founder, Admin, Member | `FounderLayout` |
| **Admin** (Mid-level) | Admin, Member routes | Admin, Member | `AdminLayout` |
| **Member** (Base-level) | Member routes only | Member only | `MemberLayout` |

---

## Detailed Data Flow Analysis

### Phase 1: Authentication Initialization

```typescript
// AuthContext.tsx - Initialization sequence
useEffect(() → checkAuth() → localStorage.getItem('mkn-auth-user') → setUser(parsedUser)
```

1.  **Component Mount:** `AuthProvider` initializes.
2.  **Storage Check:** Reads `mkn-auth-user` from `localStorage`.
3.  **State Setting:** Parses JSON and sets user state.
4.  **Context Provision:** Makes auth data available to entire app via Context API.

### Phase 2: Route Resolution

```typescript
// AppRoutes.tsx - Authentication-based routing
isAuthenticated ? (AuthenticatedRoutes) : (PublicRoutes)
```

| Flow | Structure | Target |
| :--- | :--- | :--- |
| **Public** (Unauthenticated) | `BrowserRouter` → `Routes` → Landing Page | `/` |
| **Authenticated** | `BrowserRouter` → `Routes` → `ProtectedRoute` → Role-based Layout → Nested Routes | Role-dependent |

### Phase 3: Role-Based Access Control

**ProtectedRoute Logic:**

The `ProtectedRoute` component compares the `requiredRole` prop against the authenticated `user.role` to determine access:

* **'founder'** → `user?.role === 'founder'`
* **'admin'** → `user?.role === 'founder' || 'admin'`
* **'member'** → any authenticated user
* **'any'** → all authenticated users

**Redirect Logic (Default Fallbacks):**

```typescript
const redirectPath =
  user?.role === 'founder' ? '/founder/founder-dashboard' :
  user?.role === 'admin' ? '/admin/dashboard' : '/member/home';
```

### Phase 4: Layout & View Mode Management

Layouts provide role-specific view mode switching, persisted using custom hooks.

| Layout | View Modes | Persistence Hook Example |
| :--- | :--- | :--- |
| **FounderLayout** (Most powerful) | `'founder' | 'admin' | 'member'` | `usePersistedState<'founder' | 'admin' | 'member'>('founder-view-mode', 'founder')` |
| **AdminLayout** (Moderate) | `'admin' | 'member'` | `usePersistedState<'admin' | 'member'>('admin-view-mode', 'admin')` |
| **MemberLayout** (Basic) | `'member'` (fixed) | N/A |

### Phase 5: Nested Route Resolution

Each layout renders its own isolated route set:

* **FounderRoutes:** `/founder/founder-dashboard`, `/founder/system-settings`, `/founder/user-management`, `/founder/analytics`
* **AdminRoutes:** `/admin/dashboard`, `/admin/members`, `/admin/attendance`, `/admin/duties`, `/admin/analytics`
* **MemberRoutes:** `/member/home`, `/member/feed`, `/member/media`, `/member/duties`, `/member/profile`

---

## Data Flow Characteristics & Security

### 1. Unidirectional Flow

```
Authentication State → Route Decision → Layout Selection → View Mode → Page Component
```

### 2. State Persistence Layers
* **Authentication:** `localStorage` (`mkn-auth-user`)
* **View Preferences:** `localStorage` (via `usePersistedState`)
* **UI State:** React component state (`currentView`, `isTransitioning`)

### 3. Transition Management
* Smooth UI transitions between views are managed by `[isTransitioning, setIsTransitioning] = useState(false)`.
* A **150ms** transition timeout is applied for balanced smoothness and performance.

### 4. Security Implementation (Defense in Depth)
* **Route-level protection** (`ProtectedRoute`).
* **Layout-level role enforcement** via conditional rendering and view modes.
* **Secure Defaults:** Unauthenticated users redirect to landing; role violations redirect to permitted areas.

---

### Future Enhancements

- **Dynamic Route Loading:** Implement React.lazy() and Suspense to enable code-splitting for all authenticated routes, improving initial load performance.
- **Session Activity Monitor:** Add a global listener to track user inactivity and automatically log out the user after a set duration, enforcing enhanced security.

---

**End of Feature Report**
