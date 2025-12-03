---
Feature: Member Module
Component: MemberList, MemberDetailsModal
Document Type: Data Flow Specification
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

# Member Management Data Flow – Complete Report

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

## Overview

The member module manages all registered users across branches, handling CRUD operations, RA tracking, and role eligibility.

---

## 1. Registration Logic

Add Member → Validate Card Number → Assign Position + Branch → Save → Confirmation

**Validation Includes:**
* Unique card number
* Valid branch ID
* Valid position

---

## 2. Data Structure

| Field | Type | Description |
| :--- | :--- | :--- |
| `cardNumber` | string | Unique ID |
| `name` | string | First name |
| `surname` | string | Last name |
| `position` | string | Role in church |
| `branch` | string | Branch name |
| `gender` | string | Used for duty filtering |

---

## 3. Key Behaviors

* Auto-link duties via position
* Tracks attendance via `lastSeen`
* Drives dashboard statistics

---

## 4. Security

* All member data simulated locally
* CRUD operations sandboxed under Termux storage
* No permanent backend connections

---

### Future Enhancements

- **Bulk Member Import:** Implement functionality to upload a CSV file for mass registration of new members.
- **Photo Upload Integration:** Add a feature for uploading and displaying member profile pictures, with local storage simulation.

---

**End of Feature Report**
