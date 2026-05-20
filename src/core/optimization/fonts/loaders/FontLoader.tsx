import React, { useEffect, useState } from 'react'

interface FontLoaderProps {
  fontFamilies?: string[]
  children: React.ReactNode
}

const FontLoader: React.FC<FontLoaderProps> = ({
  fontFamilies = [],
  children
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      try {
        if (fontFamilies.length > 0) {
          await Promise.all(
            fontFamilies.map(font => 
              document.fonts.load(`1em "${font}"`)
            )
          )
        }
        
        setFontsLoaded(true)
        document.documentElement.classList.add('fonts-loaded')
      } catch (error) {
        console.warn('Font loading failed:', error)
        setFontsLoaded(true)
      }
    }

    loadFonts()
  }, [fontFamilies])

  if (!fontsLoaded) {
    return (
      <div className="fonts-loading">
        {children}
      </div>
    )
  }

  return <>{children}</>
}

export default FontLoader
