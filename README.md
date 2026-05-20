# MKN Management System v2

A reengineered and modular rebuild of the MKN Management System, designed and developed entirely within the **Termux** environment on Android.
This version replaces the **MVP 1** build with a complete architectural redesign emphasizing modularity, scalability, and structural clarity.

---

## Development Context

This project is fully developed and optimized for **Termux**—a Linux environment on Android.
Every build, configuration, and test phase was executed on mobile hardware without external IDEs or desktop dependencies.

**Optimized for:**
* Termux runtime and Android file system
* Vite server performance under mobile constraints
* Lightweight module-based architecture for limited resources
* Mobile-hosted previews via `npx serve`

---

## Version Overview

### Evolution: MVP 1 → v2

**Architectural Overhaul**
* **Monolithic → Modular**: Features isolated into domain-based modules.
* **Full TypeScript migration** for strict type safety and maintainability.
* **Context-driven state management** (`AuthContext`, `LoadingContext`).
* **Dedicated service layer** separating logic from presentation.

**Directory Reorganization**

| Legacy MVP 1 | → | New v2 Structure |
| :--- | :---: | :--- |
| `src/components/` | → | `src/features/` |
| `src/pages/` | → | `src/pages/` + `src/routes/` |
| `src/shared/` | → | `src/shared/` |
| `src/services/` | → | `src/services/` |

**Technical Enhancements**
* Updated build tooling to **Vite 4.5.14**
* Global error boundaries and unified loading state control
* Optimized SVG and asset management
* Compatible with mobile and static hosting environments

---

## Authentication Module

A simulated, frontend-only authentication system designed to replicate real-world behavior for testing, UX validation, and backend readiness.

### Functional Summary
* Member registration with OTP verification (mocked service)
* Secure login via card number and password
* Password recovery and OTP-based reset
* Session persistence via `AuthContext` and `localStorage`

---

## Attendance Module

The Attendance system is designed for real-time tracking of service presence, optimized for multi-admin collaboration within dynamic time windows.

### Functional Summary
* Editable window based on service schedule.
* Automated calculation and visual tracking of **RA** (90-day absence) and **Pre-RA** (7-day warning) statuses.
* Role-based access for marking and finalization.
* Local date comparison simulation for trigger events.

### Integration Ready
The core logic for attendance recording is **backend-ready**, relying on the `lastSeen` attribute of the member data structure for all RA calculations.

---

### Future Enhancements

- **NFC Attendance Integration:** The attendance system is designed with forward compatibility for **NFC-enabled check-ins**.  
  In future versions, members will be able to mark presence using NFC cards linked to their unique `cardNumber`.  
  When tapped, the system will automatically update attendance, refresh the `lastSeen` value, and trigger RA or Pre-RA calculations in real time.  

  The NFC workflow will be introduced once the project reaches multi-branch deployment and backend synchronization milestones. This ensures secure data flow between local sessions and cloud records while maintaining Termux optimization principles.

---

## Authentication Workflows

### Registration
1. User submits details
2. OTP verification triggered via mock service
3. Successful verification triggers auto-login
4. Auth state persisted in context

### Login
1. User enters credentials
2. Authenticated via simulated JWT
3. Redirects to member dashboard

### Password Recovery
1. Lookup by card number
2. Mock OTP verification
3. Simulated reset flow
4. Auto-login on completion

---

## Security Logic (Simulated)

* OTP expiration after **1 minute**
* Account lockout after **3 failed attempts**
* `LocalStorage` token persistence
* Mock JWT session simulation
* Manual unlock after verified success

---

## Project Structure (Core)

`src/features/auth/`
`├── components/`
`│   ├── AuthModal/             # Main flow controller`
`├── components/`
`│   ├── RegisterForm/`
`│   ├── LoginForm/`
`│   ├── ForgotPassword/`
`│   └── VerificationModal/`
`├── services/`
`│   ├── authService.ts         # Authentication abstraction`
`│   ├── verificationService.ts # Verification coordination`
`│   ├── otpService.ts          # OTP logic and simulation`
`│   └── forgotPasswordService.ts # Password reset handling`
`├── hooks/`
`│   └── useAuthForm.ts         # Shared form utilities`
`├── types/`
`│   ├── auth.ts                # Authentication types`
`│   ├── forms.ts               # Form data types`
`│   └── verification.ts        # Verification structures`

---

## Core Components

**AuthModal** – Central controller managing authentication flows and modal transitions.  
**VerificationModal** – Handles OTP timers, validation, and attempt logic.  
**Service Layer** – Abstraction of all API, validation, and verification logic.  
**AuthContext** – Global session control and user state management.

---

## Performance Considerations

* Controlled re-renders through `useCallback` and dependency isolation
* Optimized modal cleanup for predictable UI behavior
* Timed UI transitions for realistic authentication feedback
* Fully executable within Termux using mobile CPU resources

---

## Local Setup (Termux-Optimized)

```bash
npm install
npm run dev
npm run build
npx serve dist -p 4173 --no-clipboard
```

---

## Deployment

The build output under `/dist` can be deployed to any static host such as Vercel or Netlify.

```bash
npm run build
# Upload /dist directory to preferred host
```

---

## Repository Links

* v1 (Legacy): `https://github.com/Yothabo/MKN-ms`
* v2 (Current): `https://github.com/Yothabo/mknmedia`

---

## Technical Disclaimer

This system is a solo-engineered, independently developed build intended for architectural validation, frontend simulation, and Termux environment testing.
All authentication, database, and OTP mechanisms are simulated for demonstration and testing purposes.

There are no live databases or production APIs connected at this stage. This version functions as a working prototype and proof of architecture, built exclusively within Termux using mobile-based development practices. Backend integrations will be added in future iterations following the defined service contracts and architecture.
