/**
 * Utility function to trigger immediate swipe effects programmatically
 * Call this from Landing.tsx or any other component to trigger swipe effects
 */

export const triggerSwipe = (direction: 'up' | 'down', intensity: number = 0.8) => {
  // Dispatch a custom event that SwipeEffects listens to
  const event = new CustomEvent('custom-swipe', {
    detail: { direction, intensity }
  });
  window.dispatchEvent(event);
  
  // Also directly create particles if SwipeEffects is available
  if (typeof window !== 'undefined') {
    const swipeEffects = (window as any).__swipeEffects;
    if (swipeEffects && typeof swipeEffects.createParticleWave === 'function') {
      swipeEffects.createParticleWave(direction, intensity);
    }
  }
};

// Export for global access if needed
if (typeof window !== 'undefined') {
  (window as any).triggerSwipe = triggerSwipe;
}

export default triggerSwipe;
