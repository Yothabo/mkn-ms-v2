# MKN Management System v2

Production rebuild with major architectural improvements over v1.

## What's New in v2

### 🏗️ Architecture Changes
- **Monolithic to Modular**: Split v1's monolithic components into feature-based architecture
- **TypeScript Enforcement**: Full type safety vs v1's partial TypeScript
- **Context-Based State**: Replaced prop drilling with AuthContext + LoadingContext
- **Service Layer**: Proper service abstraction with `serviceManager.ts`

### 📁 Restructured Codebase
```

v1 (flat) → v2 (organized)
src/components/src/features/
src/pages/admin/src/pages/admin/
src/pages/congregation/src/routes/
src/shared/
src/services/

```

### 🎯 New Features
- **Member Details Modal**: Comprehensive member management with tabs
- **Advanced Filtering**: Multi-criteria member search and filtering
- **Form System**: Reusable form components with validation
- **Theme System**: CSS custom properties for dark/light themes
- **Responsive Layouts**: AdminLayout + MemberLayout components

### 🔧 Technical Improvements
- **Vite 4.5.14**: Updated build tooling
- **MUI Integration**: Material-UI component library
- **Better Error Handling**: Global error boundaries and loading states
- **Asset Optimization**: Proper SVG and image handling

### 🐛 Production Fixes
- **No Blank Screens**: Fixed MUI bundle issues in production
- **Static Host Ready**: `base: './'` config for Vercel/Netlify
- **Termux Compatible**: Works on mobile development environments

## Quick Start

```bash
npm install
npm run dev          # Development
npm run build        # Production build  
npm run preview      # Preview build
```

Better Preview (Termux)

```bash
npx serve dist -p 4173 --no-clipboard
```

Core Rules

· Attendance: Time-bound windows, auto-finalizes
· RA System: 83-89 days = warning, 90+ days = RA, 3 strikes = removal
· Duty Rotation: Rules by position/gender

Project Structure

```
src/
├── features/          # Feature modules (auth, members)
├── pages/            # Page components  
├── routes/           # Route configurations
├── shared/           # Reusable components & utilities
├── services/         # API and data layer
└── styles/           # Global styles and themes
```

Key Files

· src/features/members/components/admin/ - Enhanced member management
· src/shared/context/ - Global state management
· src/routes/AppRoutes.tsx - Centralized routing
· vite.config.ts - Production-ready build config

Deployment

```bash
npm run build
# Upload dist/ to any static host
```

---

v1: https://github.com/Yothabo/MKN-ms
v2: https://github.com/Yothabo/mkn-ms-v2

