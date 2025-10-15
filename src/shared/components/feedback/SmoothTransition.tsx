import React, { useState, useEffect, useRef } from 'react';

interface SmoothTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
  duration?: number;
  onTransitionEnd?: () => void;
}

export default function SmoothTransition({ 
  children, 
  isActive, 
  duration = 300,
  onTransitionEnd 
}: SmoothTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
      // Small delay to ensure DOM is updated before starting animation
      timeoutRef.current = setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        onTransitionEnd?.();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, duration, onTransitionEnd]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? '0' : '8px'})`,
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        height: '100%',
        width: '100%',
      }}
    >
      {shouldRender && children}
    </div>
  );
}
