import { ScreenName } from '@/types/screens'
import React from 'react'

export class CodeSplitter {
  private static loadedChunks = new Set<string>()
  private static loadingChunks = new Map<string, Promise<React.ComponentType<any>>>()
  
  static async loadScreenComponent(screenName: ScreenName): Promise<React.ComponentType<any>> {
    const chunkName = `screen-${screenName}`
    
    if (this.loadingChunks.has(chunkName)) {
      return this.loadingChunks.get(chunkName)!
    }
    
    if (this.loadedChunks.has(chunkName)) {
      const module = await this.dynamicImportScreen(screenName)
      return module.default
    }
    
    const loadPromise = this.dynamicImportScreen(screenName).then(module => module.default)
    this.loadingChunks.set(chunkName, loadPromise)
    
    try {
      const component = await loadPromise
      this.loadedChunks.add(chunkName)
      this.loadingChunks.delete(chunkName)
      return component
    } catch (error) {
      this.loadingChunks.delete(chunkName)
      console.error(`Failed to load screen ${screenName}:`, error)
      throw error
    }
  }
  
  private static async dynamicImportScreen(screenName: ScreenName): Promise<{ default: React.ComponentType<any> }> {
    switch (screenName) {
      case 'entry':
        return import('@/modules/screens/entry/EntryScreen')
      case 'intro':
        return import('@/modules/screens/intro/IntroScreen')
      case 'journey':
        return import('@/modules/screens/journey/JourneyScreen')
      case 'guidelines':
        return import('@/modules/screens/guidelines/GuidelinesScreen')
      case 'conduct':
        return import('@/modules/screens/conduct/ConductScreen')
      case 'feedback':
        return import('@/modules/screens/feedback/FeedbackScreen')
      default:
        return import('@/modules/screens/entry/EntryScreen')
    }
  }
  
  static prefetchScreen(screenName: ScreenName): void {
    if (this.loadedChunks.has(`screen-${screenName}`) || 
        this.loadingChunks.has(`screen-${screenName}`)) {
      return
    }
    
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'script'
    link.href = `/assets/screen-${screenName}.js`
    
    document.head.appendChild(link)
  }
  
  static clearCache(): void {
    this.loadedChunks.clear()
    this.loadingChunks.clear()
  }
  
  static getCacheStats(): { loaded: number; loading: number } {
    return {
      loaded: this.loadedChunks.size,
      loading: this.loadingChunks.size
    }
  }
}
