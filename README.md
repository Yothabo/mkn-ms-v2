# MKN Media v3.0.0

**Real-Time Updates for MKN Religion Events**

Experience the pulse of our events as they unfold. Stay connected with real-time updates and announcements for MKN Religion gatherings and community events.

🌐 **Live**: [https://mknmedia.vercel.app/](https://mknmedia.vercel.app/)

---

## 📋 Overview

MKN Media is a modern, progressive web application (PWA) designed to deliver real-time event updates and announcements for the MKN (Muzi KaNkulunkulu) Religion community. The application provides a seamless experience across all devices with a focus on performance, accessibility, and user engagement.

### Key Features

- ⚡ **Real-Time Updates** - Stay informed with live event information as it unfolds
- 📱 **Progressive Web App** - Works offline and can be installed on any device
- 🎨 **Modern UI** - Clean, responsive design built with React and TypeScript
- 🚀 **Performance Optimized** - Fast load times with compression and lazy loading
- ♿ **Accessible** - Built with accessibility best practices
- 📊 **SEO Optimized** - Complete Open Graph and JSON-LD structured data

---

## 🛠️ Tech Stack

### Core Technologies

- **React** `^18.2.0` - UI library
- **TypeScript** `^5.0.2` - Static type checking
- **Vite** `^7.3.0` - Build tool and dev server
- **CSS** - Styling with global styles

### Key Dependencies

- **react-dom** `^18.2.0` - React rendering for web
- **react-hook-form** `^7.70.0` - Form management and validation
- **zod** `^4.3.5` - Schema validation
- **react-icons** `^5.5.0` - Icon library
- **react-swipeable** `^7.0.2` - Touch gesture handling
- **clsx** `^1.2.1` - Utility for conditional classnames
- **@lottiefiles/dotlottie-react** `^0.17.12` - Animated graphics

### Build & Development Tools

- **TypeScript ESLint** - Code linting and type checking
- **Prettier** - Code formatting
- **Vite Plugin Compression** - Automatic asset compression
- **Vite React Plugin** - React optimization

---

## 📁 Project Structure

```
mkn-ms-v2/
├── src/
│   ├── app/                          # Application core
│   │   ├── main.tsx                  # React DOM entry point
│   │   ├── App.tsx                   # Root component with providers
│   │   └── providers/                # Context providers
│   │       └── ScreenProvider.tsx    # Screen/device detection
│   │
│   ├── pages/                        # Page components
│   │   └── public/                   # Public pages
│   │       └── Landing.tsx           # Landing page
│   │
│   ├── modules/                      # Feature modules
│   │   ├── screens/                  # Screen components
│   │   └── shared/                   # Shared module components
│   │
│   ├── core/                         # Core functionality
│   │   ├── services/                 # API and service layer
│   │   └── optimization/             # Performance optimization
│   │
│   ├── shared/                       # Global shared resources
│   │   ├── components/               # Reusable UI components
│   │   │   └── ErrorBoundary/        # Error boundary component
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── utils/                    # Utility functions
│   │   └── constants/                # Global constants
│   │
│   ├── types/                        # TypeScript type definitions
│   ├── styles/                       # Global styles
│   │   └── globals.css               # Global stylesheet
│   ├── assets/                       # Static assets (images, etc)
│   │
│   └── custom.d.ts                   # TypeScript module declarations
│
├── public/                           # Public static files
│   ├── index.html                    # Main HTML template
│   ├── manifest.json                 # PWA manifest
│   ├── MKN.png                       # Logo and favicon
│   └── icon.svg                      # App icon
│
├── index.html                        # Root HTML file with SEO
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite build configuration
└── eslint.config.js                  # ESLint configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yothabo/mkn-ms-v2.git
   cd mkn-ms-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production with TypeScript checking |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint TypeScript and TSX files |
| `npm run type-check` | Check TypeScript types without emitting |
| `npm run format` | Format code with Prettier |
| `npm run clean` | Clear dist folder and Vite cache |
| `npm run dev:clean` | Clean and start dev server |
| `npm run build:clean` | Clean and build for production |

---

## 🎯 Application Flow

1. **Entry Point** (`index.html` → `main.tsx`)
   - Mounts React app to DOM

2. **Root Component** (`App.tsx`)
   - Wraps app with ErrorBoundary for error handling
   - Provides ScreenProvider for device/screen detection
   - Loads global styles

3. **Landing Page** (`pages/public/Landing.tsx`)
   - Main user-facing page
   - Displays event updates and announcements

4. **Core Services** (`src/core/services/`)
   - Handles API communication
   - Manages data fetching and caching

5. **Shared Components** (`src/shared/components/`)
   - Reusable UI elements
   - Error handling and boundary components

---

## 🔧 Configuration

### TypeScript Module Declarations

The project includes custom type declarations (`src/custom.d.ts`) for static assets:
- Images: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Vectors: `.svg`
- Styles: `.css` (CSS Modules)

### Vite Configuration

- ⚡ Fast HMR (Hot Module Replacement)
- 🗜️ Automatic compression with `vite-plugin-compression`
- ✅ React Fast Refresh for optimal DX
- 📦 Optimized build with code splitting

### ESLint & Prettier

- Strict TypeScript linting
- React Hooks validation
- Consistent code formatting
- Max warnings: 0 (zero tolerance)

---

## 📱 PWA Features

The application is configured as a Progressive Web App:

- **Web Manifest** (`public/manifest.json`) - App metadata and icons
- **Service Worker Support** - Offline functionality
- **Installable** - Add to home screen on mobile devices
- **App Shell Architecture** - Fast initial load and offline support
- **Meta Tags** - iOS and Android PWA configuration
- **Theme Color** - `#0E4839` (primary brand color)

### PWA Configuration Details

```html
<!-- iOS PWA -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="MKN Media">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- Web Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Theme -->
<meta name="theme-color" content="#0E4839">
```

---

## 🎨 Design System

### Brand Colors

- **Primary**: `#0E4839` (Dark Green)
- **Accent**: `#FDFCE7` (Cream)

### Typography

- **Font Family**: Inter (from Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Responsive Design

- Mobile-first approach
- Touch-optimized interactions
- Gesture support (swipe gestures via `react-swipeable`)

---

## 🔒 Security & Performance

### Security Features

- Strict Content Security Policy compatibility
- No JavaScript required fallback
- XSS protection through React's built-in escaping
- Type safety with TypeScript

### Performance Optimizations

- Code splitting with Vite
- Lazy loading of components
- Asset compression
- Optimized image formats (WebP support)
- Minimal runtime overhead with React 18

### Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- iOS 12+
- Android 6+

---

## 📊 SEO & Metadata

The application includes comprehensive SEO configuration:

- **Open Graph Tags** - Social media sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **JSON-LD Structured Data** - Schema.org organization markup
- **Canonical URL** - Duplicate content prevention
- **Meta Descriptions** - Clear page descriptions

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MKN Media",
  "alternateName": "Muzi KaNkulunkulu Media",
  "url": "https://mknmedia.vercel.app/",
  "description": "Real-time event updates and announcements for MKN Religion."
}
```

---

## 🐛 Error Handling

- **Error Boundary** - Catches and displays React errors gracefully
- **Fallback UI** - No-JavaScript fallback in HTML
- **Validation** - Form validation with `zod` and `react-hook-form`

---

## 📦 Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

This will:
1. Run TypeScript type checking
2. Create optimized bundle
3. Clear output directory
4. Apply asset compression

### Preview Production Build

```bash
npm run preview
```

---

## 🚢 Deployment

The project is deployed on **Vercel**:

- **URL**: https://mknmedia.vercel.app/
- **Auto-deployments** on push to main branch
- **Zero-config** deployment

### Vercel Features Used

- Edge Functions (if applicable)
- Serverless Functions (if applicable)
- Automatic SSL/TLS
- CDN distribution
- Analytics integration

---

## 📝 Code Quality

### Linting

```bash
npm run lint
```

Enforced rules:
- TypeScript strict mode
- React Hooks best practices
- No unused variables
- No console warnings

### Type Checking

```bash
npm run type-check
```

Ensures full TypeScript compatibility.

### Code Formatting

```bash
npm run format
```

Formats all TypeScript, TSX, and CSS files consistently.

---

## 🤝 Contributing

1. **Create a feature branch** from `main`
2. **Make your changes** with clear commit messages
3. **Follow the code style** - Run `npm run format` and `npm run lint`
4. **Test your changes** - Ensure `npm run build` succeeds
5. **Submit a pull request** with a clear description

### Development Workflow

```bash
# Start dev server
npm run dev

# In another terminal, run linter in watch mode
npm run lint

# Before committing
npm run format
npm run type-check
```

---

## 📄 License

This project is the property of MKN Media. All rights reserved.

---

## 📞 Support

For issues, questions, or contributions, please reach out through:
- GitHub Issues: [https://github.com/Yothabo/mkn-ms-v2/issues](https://github.com/Yothabo/mkn-ms-v2/issues)
- Website: [https://mknmedia.vercel.app/](https://mknmedia.vercel.app/)

---

## 🎉 Acknowledgments

Built with ❤️ for the MKN Religion community.

**Version**: 3.0.0  
**Last Updated**: 2026  
**Maintained by**: [@Yothabo](https://github.com/Yothabo)
