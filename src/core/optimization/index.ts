import { ImageCompressor } from './images/compressors/ImageCompressor'
import LazyImage from './images/loaders/LazyImage'
import { FontOptimizer } from './fonts/optimizers/FontOptimizer'
import FontLoader from './fonts/loaders/FontLoader'
import { BundleAnalyzer } from './bundles/analyzers/BundleAnalyzer'
import { CodeSplitter } from './bundles/splitters/CodeSplitter'
import PerformanceMonitor from './PerformanceMonitor'

export {
  ImageCompressor,
  LazyImage,
  FontOptimizer,
  FontLoader,
  BundleAnalyzer,
  CodeSplitter,
  PerformanceMonitor
}

export async function initializeOptimizations(): Promise<void> {
  try {
    console.log('Initializing optimizations')
    
    FontOptimizer.registerFont({
      family: 'System Font',
      src: '',
      display: 'swap'
    })
    
    FontOptimizer.loadCriticalFonts()
    FontOptimizer.loadNonCriticalFonts()
    
    setTimeout(() => {
      ImageCompressor.optimizePageImages()
    }, 100)
    
    if (process.env.NODE_ENV === 'development') {
      const stopMonitoring = BundleAnalyzer.monitorBundleSize((report) => {
        console.log('Bundle Analysis Report:', report)
        
        if (report.recommendations.length > 0) {
          console.log('Recommendations:', report.recommendations)
        }
      }, 30000)
      
      window.addEventListener('beforeunload', () => {
        stopMonitoring()
      })
    }
    
    addPerformanceCSS()
    
    console.log('Optimizations initialized')
    
  } catch (error) {
    console.error('Failed to initialize optimizations:', error)
  }
}

function addPerformanceCSS(): void {
  if (typeof document === 'undefined') return
  
  const style = document.createElement('style')
  style.textContent = `
    .fonts-loading body {
      visibility: hidden;
    }
    
    .fonts-loaded body {
      visibility: visible;
    }
    
    img[loading="lazy"] {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    img[loading="lazy"].loaded {
      opacity: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }
  `
  
  document.head.appendChild(style)
}

export async function getPerformanceMetrics() {
  const [bundleReport, webVitals] = await Promise.all([
    BundleAnalyzer.analyzeCurrentBundle(),
    BundleAnalyzer.getCoreWebVitals()
  ])
  
  return {
    bundle: bundleReport,
    webVitals
  }
}

export function optimizePageImages(): void {
  ImageCompressor.optimizePageImages()
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    
    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(initializeOptimizations, 0)
  })
}
