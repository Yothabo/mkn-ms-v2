---
Feature: Duties Module
Component: DutyManager, AssignmentForm
Document Type: Data Flow Specification
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

# Duties Assignment Data Flow – Complete Report

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

The duties module handles controlled assignment of roles for each Sunday service.
It enforces strict position-based rules to maintain spiritual and operational order.

---

## 1. Duty Lifecycle

Duty Pool → Member Eligibility → Admin Selection → Assignment → Confirmation

---

## 2. Eligibility Rules

| Duty | Allowed Positions | Gender Restriction |
| :--- | :--- | :--- |
| Izithunywa | Messenger only | None |
| Omele Abavangeli | Evangelist | None |
| Izaziso | Evangelist | None |
| Umgcini sihlalo | Evangelist | None |
| Umkhokheli phakathi | Facilitator | Female only |
| Umkhokheli phandle | Facilitator | Female only |

---

## 3. Data Flow

Admin Selects Duty → System Filters Eligible Members → Assign Duty → Commit to DB → Sync with Schedule

* Duties stored under `duty_assignments` table
* Each record linked to `member_id` and `service_id`

---

## 4. Error Prevention

* Ineligible members filtered automatically
* Duplicate assignments blocked
* Messenger-exclusive enforcement for Izithunywa

---

### Future Enhancements

- **Duty Rota Generation:** Implement an automated Rota feature that suggests and assigns duties based on member availability, attendance history, and previous duty frequency.
- **WhatsApp Notification:** Integrate a mock WhatsApp service to send duty assignment notifications directly to members' registered numbers.

---

## 5. Future Integrations

* Attendance-linked validation (duty → presence check)
* Notification simulation via WhatsApp API
* NFC-based member check-in (planned)

---

**End of Feature Report**
