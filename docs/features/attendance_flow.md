---
Feature: Attendance Module
Component: AttendancePanel, AttendanceTable
Document Type: Data Flow Specification
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

# Attendance Data Flow – Complete Report

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

The attendance module manages real-time service attendance across dynamic time windows.
It enforces editable windows per branch, automatic RA status updates, and multi-admin collaboration.

---

## 1. Attendance Lifecycle

Service Starts → Window Opens → Attendance Editable → Real-time Updates → Window Closes → Auto Finalization

---

## 2. State Control Logic

**Editable Window:**
* Opens dynamically based on each branch’s schedule
* Remains open during the defined service window
* Becomes read-only after window ends

**RA Management:**
* Pre-RA: Triggered **7 days** before full RA (orange)
* RA: Triggered at **90 days** of absence (red)
* RA Removal: Requires reason if full RA

---

## 3. Core Data Flow

Member Loads → Presence Toggle → Update State → Sync Timestamp → Auto Save → Status Recalculate

**On Toggle:**
* Updates member `lastSeen`
* Triggers absence recalculation
* Syncs with backend simulation store

**Finalization:**
* Once window closes, attendance is locked
* Dashboard recalculates RA/Pre-RA cards

---

## 4. Dashboard Cards

| Card | Description | Source |
| :--- | :--- | :--- |
| Total Members | Active branch members | Member table |
| RA Members | Members with 3-month absences | Attendance records |
| Pre-RA Members | Members nearing RA | Attendance records |

---

## 5. Collaboration Rules

* Multi-admin real-time marking enabled
* Conflict resolution by latest timestamp
* Instant visual sync across connected sessions

---

## 6. Security & Data Integrity

* Attendance only editable within service window
* Timestamps ensure traceable changes
* Lock state enforced to prevent tampering

---

# 🧭 Future Enhancements

**NFC Attendance Integration:**
In future iterations, attendance marking will support NFC-enabled member cards. This will allow instant presence detection via NFC tap, directly linked to each member’s unique card number. The system will automatically update the attendance register and trigger RA logic events in real-time.

> The NFC feature will be introduced once hardware readiness and multi-branch scaling are complete, ensuring smooth integration with the existing Termux-optimized foundation.

---

## 7. Data Summary Flow

Member Presence → Attendance Update → Status Evaluation → Dashboard Refresh

---

**End of Feature Report**
