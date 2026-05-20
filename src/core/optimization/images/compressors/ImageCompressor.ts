interface CompressionOptions {
  quality?: number
  maxWidth?: number
  maxHeight?: number
  format?: 'webp' | 'jpeg' | 'png'
}

export class ImageCompressor {
  static async compressImage(
    file: File, 
    options: CompressionOptions = {}
  ): Promise<Blob> {
    const {
      quality = 0.8,
      maxWidth = 1200,
      maxHeight = 1200,
      format = 'webp'
    } = options
    
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      
      img.onload = () => {
        URL.revokeObjectURL(url)
        
        // Calculate new dimensions
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.floor(width * ratio)
          height = Math.floor(height * ratio)
        }
        
        canvas.width = width
        canvas.height = height
        
        // Draw and compress
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context not available'))
          return
        }
        
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Image compression failed'))
            }
          },
          `image/${format}`,
          quality
        )
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load image'))
      }
      
      img.src = url
    })
  }
  
  static async compressImageFromUrl(
    url: string, 
    options?: CompressionOptions
  ): Promise<string> {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], 'image', { type: blob.type })
      
      const compressedBlob = await this.compressImage(file, options)
      return URL.createObjectURL(compressedBlob)
    } catch (error) {
      console.error('Image compression failed:', error)
      return url // Fallback to original
    }
  }
  
  static optimizePageImages(): void {
    const images = document.querySelectorAll('img:not([data-optimized])')
    
    images.forEach(img => {
      if (!(img instanceof HTMLImageElement)) return
      
      // Skip already optimized or small images
      if (img.dataset.optimized === 'true') return
      if (img.naturalWidth < 100 && img.naturalHeight < 100) return
      
      // Set loading attribute
      img.loading = 'lazy'
      img.decoding = 'async'
      img.dataset.optimized = 'true'
      
      // Add error handling
      img.onerror = () => {
        console.warn(`Failed to load image: ${img.src}`)
        img.style.opacity = '0.5'
      }
      
      // Add loading state
      if (!img.complete) {
        img.style.opacity = '0.5'
        img.style.transition = 'opacity 0.3s ease'
        
        img.onload = () => {
          img.style.opacity = '1'
        }
      }
    })
    
    console.log(`Optimized ${images.length} images`)
  }
  
  static async getImageSize(url: string): Promise<{ width: number; height: number; size: number }> {
    return new Promise((resolve) => {
      const img = new Image()
      
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          size: 0 // Would need fetch to get actual size
        })
      }
      
      img.onerror = () => {
        resolve({ width: 0, height: 0, size: 0 })
      }
      
      img.src = url
    })
  }
}
