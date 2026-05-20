interface FontConfig {
  family: string
  src: string
  weight?: string
  style?: string
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
}

export class FontOptimizer {
  private static loadedFonts = new Set<string>()
  private static fontConfigs: FontConfig[] = []
  
  static registerFont(config: FontConfig): void {
    this.fontConfigs.push({
      display: 'swap',
      weight: '400',
      style: 'normal',
      ...config
    })
  }
  
  static loadCriticalFonts(): Promise<void> {
    if (typeof document === 'undefined') {
      return Promise.resolve()
    }
    
    const criticalFonts = this.fontConfigs.filter(font => 
      font.display === 'swap' || font.display === 'block'
    )
    
    if (criticalFonts.length === 0) {
      return Promise.resolve()
    }
    
    // Add font faces to document
    criticalFonts.forEach(font => {
      const fontFace = new FontFace(
        font.family,
        `url(${font.src})`,
        {
          weight: font.weight,
          style: font.style,
          display: font.display
        }
      )
      
      document.fonts.add(fontFace)
      
      fontFace.load()
        .then(() => {
          this.loadedFonts.add(font.family)
          this.updateFontStatus()
        })
        .catch(error => {
          console.warn(`Failed to load font ${font.family}:`, error)
        })
    })
    
    // Set timeout for font loading
    return new Promise((resolve) => {
      setTimeout(() => {
        this.updateFontStatus()
        resolve()
      }, 3000) // Max 3 seconds for font loading
    })
  }
  
  static loadNonCriticalFonts(): void {
    const nonCriticalFonts = this.fontConfigs.filter(font => 
      font.display === 'fallback' || font.display === 'optional'
    )
    
    nonCriticalFonts.forEach(font => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.href = font.src
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.onload = () => {
        this.loadedFonts.add(font.family)
        this.updateFontStatus()
      }
      
      document.head.appendChild(link)
    })
  }
  
  private static updateFontStatus(): void {
    const html = document.documentElement
    
    if (this.loadedFonts.size > 0) {
      html.classList.add('fonts-loaded')
      html.classList.remove('fonts-loading')
    } else {
      html.classList.add('fonts-loading')
      html.classList.remove('fonts-loaded')
    }
  }
  
  static getFontLoadingStatus(): { loaded: string[]; loading: string[] } {
    const loaded = Array.from(this.loadedFonts)
    const loading = this.fontConfigs
      .map(font => font.family)
      .filter(family => !this.loadedFonts.has(family))
    
    return { loaded, loading }
  }
  
  static isFontLoaded(family: string): boolean {
    return this.loadedFonts.has(family)
  }
  
  static preloadFonts(): void {
    // Add preconnect for font domains
    const fontDomains = new Set<string>()
    
    this.fontConfigs.forEach(font => {
      try {
        const url = new URL(font.src)
        fontDomains.add(url.origin)
      } catch {
        // Invalid URL, skip
      }
    })
    
    // Add preconnect links
    fontDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
    
    // Add preload for critical fonts
    const criticalFonts = this.fontConfigs.filter(font => 
      font.display === 'swap' || font.display === 'block'
    )
    
    criticalFonts.forEach(font => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.href = font.src
      link.type = this.getFontType(font.src)
      link.crossOrigin = 'anonymous'
      link.setAttribute('data-font-family', font.family)
      
      document.head.appendChild(link)
    })
  }
  
  private static getFontType(src: string): string {
    if (src.endsWith('.woff2')) return 'font/woff2'
    if (src.endsWith('.woff')) return 'font/woff'
    if (src.endsWith('.ttf')) return 'font/ttf'
    return 'font/woff2' // Default
  }
}
