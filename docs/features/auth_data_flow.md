---
Feature: Authentication Module
Component: AuthModal, RegisterForm, ForgotPassword
Document Type: Data Flow Specification
Last Updated: November 2025
Maintainer: @thabo (Termux Native Build)
---

# Auth Data Flow – Complete Report

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

The authentication system provides a consistent, user-controlled flow where navigation only occurs when the user explicitly clicks **"Continue to App"**.

This document captures the complete logical data flow for registration, password reset, and their verification processes.

---

## 1. Registration Flow

### Step 1: Form Submission

User fills registration form → `RegisterForm.handleSubmit()`
↓
Basic validation (required fields, password match, terms acceptance)
↓
`setShowVerificationModal(true)`
↓
Render `VerificationModal`

### Step 2: Verification Process

`VerificationModal` renders with user data
↓
User selects verification method (SMS/Email)
↓
OTP sent → User enters OTP → Verification
↓
`handleVerificationSuccess()` called
↓
`setVerificationSuccess(true)` + Store credentials
↓
`onSuccess({cardReceiptNumber, password})` callback

### Step 3: Success State

`AuthModal` receives `onSuccess()` → `setCurrentView('register-success')`
↓
Render success Modal (NO header buttons)
↓
User sees: "Registration Successful!" + "Continue to App" button
↓
User clicks "Continue to App" → `handleContinueToApp()`
↓
`login(cardReceiptNumber, password)` → Navigate to app

---

## 2. Forgot Password Flow

### Step 1: Form Submission

User enters card/receipt number + new password → `ForgotPassword.handleSubmit()`
↓
Basic validation (card number, password length, password match)
↓
`setShowVerificationModal(true)`
↓
Member lookup via `forgotPasswordService.lookupMemberForVerification()`
↓
Render `VerificationModal` with member data

### Step 2: Verification Process

`VerificationModal` renders with member data
↓
User selects verification method (SMS/Email)
↓
OTP sent → User enters OTP → Verification
↓
`handleVerificationSuccess()` called
↓
`setVerificationSuccess(true)` + Store credentials
↓
`onSuccess({cardReceiptNumber, newPassword})` callback

### Step 3: Success State

`AuthModal` receives `onSuccess()` → `setCurrentView('forgot-password-success')`
↓
Render success Modal (NO header buttons)
↓
User sees: "Password Changed Successfully!" + "Continue to App" button
↓
User clicks "Continue to App" → `handleContinueToApp()`
↓
`login(cardReceiptNumber, newPassword)` → Navigate to app

---

## 3. Key Architecture Decisions

**A. No Automatic Navigation** * Before: Login triggered automatically after verification
* Now: User must click “Continue to App”
* Benefit: Full user control over navigation timing

**B. Success States at Modal Level** * Success states are rendered by `AuthModal`, not forms
* Benefit: Consistent UX and clean state isolation

**C. Credential Storage** * Temporary only, cleared after modal close
* Ensures no residual sensitive data

**D. Header Control**
```typescript
showCloseButton = currentView !== 'register-success' && currentView !== 'forgot-password-success'
showBackButton = currentView === 'terms' || currentView === 'forgot-password'
```

---

## 4. State Management

### AuthModal
* `currentView`: `'login' | 'register' | 'forgot-password' | 'terms' | 'register-success' | 'forgot-password-success'`
* `registerFormData`: `{ cardReceiptNumber: string; password: string }`
* `forgotPasswordFormData`: `{ cardReceiptNumber: string; newPassword: string }`

### Form Components
* `showVerificationModal`: boolean
* `verificationSuccess`: boolean
* `formData`: respective form fields

---

## 5. User Experience Flow

### Registration
Landing → AuthModal(Register) → Form → Verification → Success → Continue → App

### Password Reset
Landing → AuthModal(Login) → Forgot Password → Form → Verification → Success → Continue → App

---

## 6. Security Considerations

* Verification mandatory for registration and password reset
* **OTP expiration set to 1 minute**
* No auto-login post-verification
* Temporary state cleanup on modal close
* Graceful fallback handling for all failures

---

## 7. Error Handling

* Client-side validation before verification
* Member lookup before OTP dispatch
* OTP retry options on failure
* Graceful modal recovery if login fails

---

## 8. Benefits Achieved

1. Clear, controlled user navigation
2. Clean UI with consistent success screens
3. Secure verification pipeline
4. Predictable modular state handling
5. Extendable for future authentication endpoints

---

## 9. Data Flow Summary

User Input → Form Validation → Verification Modal → OTP Verification →
Success Callback → AuthModal Success State → User Click Continue →
Login → Navigation → App

---

**End of Feature Report**
