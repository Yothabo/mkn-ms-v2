import React, { useState, useEffect, useRef } from 'react'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholder?: string
  threshold?: number
  rootMargin?: string
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%230E4839" opacity="0.1"/%3E%3C/svg%3E',
  threshold = 0.01,
  rootMargin = '50px',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    if (!imgRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observerRef.current.observe(imgRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin])

  useEffect(() => {
    if (isInView && imgRef.current) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setIsLoaded(true)
        if (imgRef.current) {
          imgRef.current.src = src
        }
      }
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`)
      }
    }
  }, [isInView, src])

  return (
    <div className="lazy-image-container" style={{ position: 'relative' }}>
      <img
        ref={imgRef}
        src={isInView && isLoaded ? src : placeholder}
        alt={alt}
        loading="lazy"
        decoding="async"
        data-optimized="true"
        style={{
          opacity: isLoaded ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
          ...props.style
        }}
        onError={(e) => {
          console.warn(`Image failed to load: ${src}`)
          if (props.onError) props.onError(e)
        }}
        {...props}
      />
      
      {!isLoaded && isInView && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  )
}

export default LazyImage
