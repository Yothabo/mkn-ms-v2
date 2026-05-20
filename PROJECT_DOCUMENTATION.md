
# MKN Media - PWA Application

## Project Overview
A Progressive Web App (PWA) designed for real-time updates of MKN Religion events. The application features a mobile-first interface with swipe-based navigation and fluid screen transitions.

---

## Architecture & Module Structure

### Core Application
`src/app/`
* `App.tsx`: Main entry component integrating PWA logic.
* `main.tsx`: React application mounting point.
* `providers/`: Context providers for `ScreenProvider` and `CacheProvider`.

### Feature Modules
`src/modules/screens/`
* `BaseScreen.tsx`: Parent component for standard screen transitions.
* `ModalScreen.tsx`: Specialized container for overlay content.
* `screenRegistry.ts`: Central configuration for routing and screen metadata.
* **Active Screens**: `entry`, `intro`, `journey`, `guidelines`, `conduct`, `feedback`.

`src/modules/shared/`
* `components/`: Reusable UI elements.
* `layout/`: Structural components like `DotPattern`.
* `hooks/`: Shared logic for UI interactions.

### System Services
`src/core/`
* `hooks/usePWAEnhanced.ts`: Logic for installation prompts and SW management.
* `optimization/`: Bundle, font, and image optimization strategies.
* `services/`: Analytic tracking, caching mechanisms, and PWA lifecycle.

### Specialized Logic
`src/shared/`
* `animations/`: Global animation components (`LoadingSpinner`, `SwipeEffects`).
* `components/ErrorBoundary/`: Resilience layer for runtime failures.

---

## Core Systems & Features

1.  **Attendance Management**: Verified logic for member ID assignment (e.g., ID 3: Alice Johnson) and duty allocation (e.g., `band_drums`) with qualification checks.
2.  **PWA Integration**: Fully installable with offline capabilities and service worker caching.
3.  **Gesture Navigation**: High-performance horizontal swipe transitions between application states.
4.  **Theming Engine**: Centralized CSS variables managed through `src/styles/tokens/`.

---

## Maintenance & Build

### Development Summary
* **Cleanup**: Removed duplicate containers, redundant modal hooks, and empty directories in `assets` and `core/utils`.
* **Framework**: React + TypeScript.
* **Build Tool**: Vite.
* **Deployment**: Vercel.

### Build Commands
```bash
# Build and deploy to production
npm run build && vercel --prod

