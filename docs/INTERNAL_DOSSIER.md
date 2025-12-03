# Internal Development Dossier: MKN Management System v2

---
Document Type: Internal Dossier
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

## Environment Context

This project is developed and maintained entirely within **Termux** on Android.
All builds, runs, and file operations are executed in a constrained mobile environment without desktop dependencies.
The system has been optimized to handle these constraints with minimal resource overhead.

### Key Optimizations

* Lightweight dependency graph and minimal external tooling
* Vite configuration adjusted for Termux I/O
* Static file serving through `npx serve`
* Port consistency maintained for local previews (`4173`)
* All environment paths resolved for Linux-based mobile shells

---

## Technical Audits

A dedicated technical audit details the current state of optimization and performance:
* **[Performance Analysis Report](./PERFORMANCE_ANALYSIS.md)**: Comprehensive analysis of build configuration, React performance, and critical PWA/Touch optimization gaps.
* **[Refactoring and Build Integrity Report](./REFACTOR_REPORT_V2.md)**: Documents the successful architectural migration to a modular, scalable v2 core structure and verifies file size compliance.

---

## Backend Simulation Strategy

The current system is frontend-driven with backend simulation, structured to easily plug into a real API in later phases.
Each feature module contains a service layer defining the contract between UI and backend logic.

### Simulation Layer Design

* OTP verification, authentication, and password recovery are simulated via mocked services.
* Each service replicates real-world flow: data validation, response delay, token creation, and error handling.
* Session management uses `localStorage` as a temporary persistence layer.
* The architecture is **API-ready**: every mock function aligns with an eventual REST or GraphQL endpoint.

### Intended Integration Flow

1.  Replace each mock service with live API endpoints.
2.  Maintain function signatures to avoid frontend breaking changes.
3.  Enable real-time data persistence once backend becomes available.
4.  Introduce middleware for request validation and secure token handling.

---

## Architectural Snapshot

### Core Layers

| Layer | Path | Responsibility |
| :--- | :--- | :--- |
| **Feature Modules** | `features/` | Domain-specific modules (auth, attendance, dashboard, etc.) |
| **Service Contracts** | `services/` | Abstracted logic for communication between UI and backend |
| **State Logic** | `hooks/` | Local and shared state management and logic |
| **Data Contracts** | `types/` | Strong typing for all data interfaces |
| **Global State** | `contexts/` | Global app state management (Auth, Loading) |

The structure mirrors a production-ready monorepo but compacted for Termux compatibility.

### Current Functional Coverage

| Status | Features Covered |
| :--- | :--- |
| **Fully Functional** (Frontend Simulation) | Authentication (register, login, password recovery, OTP), Session management, Modular modal navigation, Persistent UI state |
| **Partial** (Backend Ready) | Attendance tracking logic, Dashboard statistics, Multi-branch structure |

### Next Development Targets (Sprint 3 Roadmap)

1.  Implement Attendance Register frontend logic with dynamic service window.
2.  Simulate RA and Pre-RA status triggers using local date comparisons.
3.  Create Dashboard Overview with live card statistics (mock data).
4.  Add Service Scheduler to restrict attendance editing to service hours.
5.  Document backend contracts for upcoming API integration.

### Future Integration Plan (Transitioning to Live Backend)

* Replace mock service logic with real HTTP clients (Axios or Fetch wrapper).
* Integrate JWT authentication and session tokens.
* Shift data persistence from `localStorage` to database-driven API calls.
* Keep architecture intact; only replace service internals.

---

## System Philosophy

The MKN Management System v2 is intentionally built and optimized for a mobile-first, Termux-only environment. This approach prioritizes:

### 1. Self-Sufficiency
Every module, service, and feature operates independently within Termux, minimizing reliance on external servers or desktop tooling. This ensures that the system can run and evolve entirely from a mobile device.

### 2. Experimentation and Prototyping
Frontend simulation and mock services allow rapid testing of architectural decisions, UI flows, and state management without waiting for backend dependencies. Each simulated feature mirrors real-world behavior, enabling realistic validation.

### 3. Scalable Architecture
While currently mobile-constrained, the system’s modular design supports future expansion:
* Multi-branch support
* Full backend integration with real APIs
* Integration of live notifications, cloud storage, and advanced analytics

### 4. Mobile-Optimized Performance
Termux imposes resource limitations. Every dependency, render cycle, and file operation is chosen for efficiency and responsiveness. The architecture balances functionality with minimal CPU and memory overhead.

### 5. Proof of Concept for Broader Ecosystems
The design demonstrates principles that can scale to any small- to medium-sized organizational management system. This includes modular feature expansion, API-ready service layers, and portable deployment strategies.

**Core Vision:**
Empower mobile-first environments to run production-grade applications independently. Every feature built, from authentication to attendance tracking, reflects a deliberate philosophy of simplicity, maintainability, and future-proof modularity, with Termux as the primary development and execution platform.

---

**Note:**
This system represents a live architectural prototype built under mobile constraints for research, validation, and demonstration purposes. It operates as a functional simulation, not a production backend implementation — all authentication and data persistence remain local.
