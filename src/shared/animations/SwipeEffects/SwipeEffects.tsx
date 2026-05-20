import React, { useState, useEffect, useRef } from 'react';
import styles from './SwipeEffects.module.css';

interface SwipeEffectsProps {
  isActive?: boolean;
  disableEffects?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  type: 'orange' | 'cream' | 'green';
  shape: 'dot' | 'circle' | 'square' | 'diamond';
  opacity: number;
}

const SwipeEffects: React.FC<SwipeEffectsProps> = ({
  isActive = true,
  disableEffects = false
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | 'left' | 'right' | null>(null);
  const [swipeIntensity, setSwipeIntensity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTouchY = useRef<number>(0);
  const particleIdCounter = useRef(0);
  const lastUpdateTime = useRef<number>(0);
  const particlePool = useRef<Particle[]>([]);

  const colors = {
    orange: 'var(--color-orange)',
    cream: 'var(--color-cream)',
    green: 'var(--color-dark-green)',
    orangeLight: 'rgba(237, 143, 76, 0.8)',
    creamLight: 'rgba(253, 252, 231, 0.8)',
    greenLight: 'rgba(40, 54, 24, 0.8)'
  };

  // Pre-calculate common values for performance
  const particleConfigs = {
    green: { baseSize: 1.8, sizeVariation: 3.5, velocityMultiplier: 0.9, lifeMultiplier: 1.3, rotationMultiplier: 0.8 },
    orange: { baseSize: 1.5, sizeVariation: 4.5, velocityMultiplier: 1.1, lifeMultiplier: 1.1, rotationMultiplier: 1.2 },
    cream: { baseSize: 1.5, sizeVariation: 4.5, velocityMultiplier: 1.1, lifeMultiplier: 1.1, rotationMultiplier: 1.2 }
  };

  const createParticleWave = (direction: 'up' | 'down', intensity: number) => {
    if (disableEffects || !containerRef.current || !isActive) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    const newParticles: Particle[] = [];

    // Keep the perfect particle amount (120)
    const particleCount = Math.min(120, Math.floor(intensity * 50));
    const waveCenterX = width / 2;
    const waveCenterY = direction === 'up' ? height - 100 : 100;

    // Use pre-calculated values for performance
    const layers = 3;
    const particlesPerLayer = Math.ceil(particleCount / layers);

    // Pre-calculate random values in batches
    const randomValues = Array.from({ length: particlesPerLayer * layers }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: 30 + Math.random() * 150,
      sizeRand: Math.random(),
      colorRand: Math.random(),
      shapeRand: Math.random(),
      velocityXRand: Math.random() - 0.5,
      velocityYRand: Math.random(),
      lifeRand: Math.random(),
      rotationRand: Math.random() * 360,
      rotationSpeedRand: Math.random() - 0.5,
      layerOffset: Math.random() * 15
    }));

    for (let layer = 0; layer < layers; layer++) {
      const layerMultiplier = 0.8 + (layer * 0.2);

      for (let i = 0; i < particlesPerLayer; i++) {
        const index = layer * particlesPerLayer + i;
        if (index >= randomValues.length) break;

        const rand = randomValues[index];
        let particleType: 'orange' | 'cream' | 'green';
        let particleColor: string;
        let shape: 'dot' | 'circle' | 'square' | 'diamond';

        // Optimized type selection
        if (rand.sizeRand < 0.35) {
          particleType = 'green';
          particleColor = rand.colorRand > 0.5 ? colors.green : colors.greenLight;
          shape = 'circle';
        } else if (rand.sizeRand < 0.7) {
          particleType = 'orange';
          particleColor = rand.colorRand > 0.5 ? colors.orange : colors.orangeLight;
          shape = rand.shapeRand > 0.5 ? 'dot' : 'circle';
        } else {
          particleType = 'cream';
          particleColor = rand.colorRand > 0.5 ? colors.cream : colors.creamLight;
          shape = rand.shapeRand > 0.3 ? 'dot' : 'square';
        }

        // Diamond shapes (10% chance)
        if (rand.shapeRand > 0.9) {
          shape = 'diamond';
        }

        const config = particleConfigs[particleType];
        const size = (config.baseSize + rand.sizeRand * config.sizeVariation) * layerMultiplier;
        const baseVelocityY = direction === 'up' ? -4 - rand.velocityYRand * 7 : 4 + rand.velocityYRand * 7;

        newParticles.push({
          id: particleIdCounter.current++,
          x: waveCenterX + Math.cos(rand.angle) * rand.distance + (rand.velocityXRand) * 40,
          y: waveCenterY + Math.sin(rand.angle) * rand.distance + (rand.velocityXRand) * 40,
          size: size,
          color: particleColor,
          velocityX: rand.velocityXRand * 6 * config.velocityMultiplier,
          velocityY: baseVelocityY * config.velocityMultiplier,
          life: 1,
          maxLife: config.lifeMultiplier + rand.lifeRand * 1.5,
          rotation: rand.rotationRand,
          rotationSpeed: rand.rotationSpeedRand * 12 * config.rotationMultiplier,
          type: particleType,
          shape: shape,
          opacity: 0.8
        });
      }
    }

    // Batch update particles for smoother rendering
    setParticles(prev => {
      const combined = [...prev, ...newParticles];
      // Keep only active particles to prevent memory buildup
      return combined.slice(-400); // Limit to 400 particles max
    });

    setSwipeDirection(direction);
    setSwipeIntensity(intensity);
  };

  const updateParticles = (timestamp: number) => {
    if (!lastUpdateTime.current) {
      lastUpdateTime.current = timestamp;
    }

    const deltaTime = timestamp - lastUpdateTime.current;
    lastUpdateTime.current = timestamp;

    // Use delta time for frame-independent animation
    const timeFactor = Math.min(deltaTime / 16, 2); // Normalize to 60fps

    setParticles(prev => {
      const updated: Particle[] = [];

      for (const particle of prev) {
        const newLife = particle.life - (timeFactor / 60) / particle.maxLife;

        if (newLife <= 0) continue;

        const config = particleConfigs[particle.type];
        const gravity = particle.type === 'green' ? 0.07 : 0.09;
        const drag = particle.type === 'green' ? 0.988 : 0.985;

        const newVelocityY = particle.velocityY + gravity * timeFactor;
        const newVelocityX = particle.velocityX * Math.pow(drag, timeFactor);

        // Calculate opacity based on life for smooth fade-out
        const opacity = newLife * (particle.type === 'green' ? 0.9 : 0.8);

        updated.push({
          ...particle,
          x: particle.x + newVelocityX * timeFactor,
          y: particle.y + newVelocityY * timeFactor,
          velocityX: newVelocityX,
          velocityY: newVelocityY,
          life: newLife,
          rotation: particle.rotation + particle.rotationSpeed * timeFactor,
          opacity: opacity
        });
      }

      return updated;
    });

    animationFrameRef.current = requestAnimationFrame(updateParticles);
  };

  const handleTouchStart = (e: TouchEvent) => {
    lastTouchY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isActive) return;

    const touchY = e.touches[0].clientY;
    const deltaY = touchY - lastTouchY.current;

    // Smooth intensity calculation with easing
    const intensity = Math.min(1, Math.abs(deltaY) / 80);

    if (Math.abs(deltaY) > 8) {
      createParticleWave(deltaY > 0 ? 'down' : 'up', intensity);
    }

    lastTouchY.current = touchY;
  };

  useEffect(() => {
    if (!isActive || disableEffects) return;

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateParticles);

    // Use passive listeners for better performance
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      lastUpdateTime.current = 0;
    };
  }, [isActive, disableEffects]);

  useEffect(() => {
    if (disableEffects) {
      setParticles([]);
      setSwipeIntensity(0);
      setSwipeDirection(null);
    }
  }, [disableEffects]);

  if (!isActive || disableEffects) return null;

  return (
    <div
      ref={containerRef}
      className={styles.swipeEffectsContainer}
      aria-hidden="true"
      style={{ zIndex: 10001 }}
    >
      {/* REMOVED: Direction indicator (↑/↓ arrows) */}

      {particles.map(particle => {
        let borderRadius = '50%';

        switch (particle.shape) {
          case 'square':
            borderRadius = '2px';
            break;
          case 'diamond':
            borderRadius = '0';
            break;
          case 'circle':
            borderRadius = '50%';
            break;
          case 'dot':
          default:
            borderRadius = particle.size > 3 ? '50%' : '1px';
        }

        const transform = particle.shape === 'diamond'
          ? `translate(-50%, -50%) rotate(${particle.rotation}deg) rotate(45deg)`
          : `translate(-50%, -50%) rotate(${particle.rotation}deg)`;

        return (
          <div
            key={particle.id}
            className={`${styles.particle} ${styles[particle.shape]}`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: transform,
              borderRadius: borderRadius,
              boxShadow: particle.type === 'green' ? '0 0 4px rgba(40, 54, 24, 0.3)' : 'none',
              transition: 'opacity 0.1s linear' // Smooth opacity changes
            }}
          />
        );
      })}

      {/* REMOVED: Wave effect that showed direction */}
    </div>
  );
};

export default SwipeEffects;
