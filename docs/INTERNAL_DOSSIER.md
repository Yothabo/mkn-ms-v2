---
Feature: System Overview
Component: Documentation, Strategy
Document Type: Internal Dossier
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

# Internal Development Dossier: MKN Management System v2

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

### Next Development Targets (Sprint 3 Roadmap)

1.  Implement Attendance Register frontend logic with dynamic service window.
2.  Simulate RA and Pre-RA status triggers using local date comparisons.
3.  Create Dashboard Overview with live card statistics (mock data).
4.  Add Service Scheduler to restrict attendance editing to service hours.
5.  Document backend contracts for upcoming API integration.

---

## System Philosophy

The MKN Management System v2 is intentionally built and optimized for a mobile-first, Termux-only environment. This approach prioritizes:

### 1. Self-Sufficiency
Every module, service, and feature operates independently within Termux, minimizing reliance on external servers.

### 2. Experimentation and Prototyping
Frontend simulation allows rapid testing of architectural decisions without waiting for backend dependencies.

### 3. Scalable Architecture
The modular design supports future expansion to multi-branch support and full backend integration.

**Core Vision:**
Empower mobile-first environments to run production-grade applications independently. Every feature reflects a philosophy of simplicity and maintainability, with Termux as the primary platform.

---

**Note:**
This system represents a live architectural prototype built under mobile constraints. It operates as a functional simulation; all authentication and data persistence remain local.

