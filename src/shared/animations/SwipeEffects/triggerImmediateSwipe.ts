/**
 * Trigger immediate swipe effects when navigation happens
 * Call this from Landing.tsx in navigateNext() and navigatePrev()
 */

export const triggerImmediateSwipe = (direction: 'up' | 'down') => {
  // Dispatch event that SwipeEffects listens to
  const event = new CustomEvent('swipe-detected', {
    detail: { 
      direction, 
      intensity: 0.9,
      immediate: true 
    }
  });
  
  // Add a small delay to ensure animation starts after navigation
  setTimeout(() => {
    window.dispatchEvent(event);
  }, 0);
};

export default triggerImmediateSwipe;
