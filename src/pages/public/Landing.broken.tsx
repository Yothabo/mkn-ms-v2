import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import screenRegistry, {
  ScreenRegistration,
  getScreenByName,
  getNextScreen,
  getPreviousScreen
} from '../../modules/screens/screenRegistry';
import { ScreenName, SCREEN_ORDER } from '../../types/screens';
import { ScreenContext } from '../../app/providers/ScreenProvider';
import LoadingSpinner from '../../shared/animations/LoadingSpinner/LoadingSpinner';
import SwipeEffects from '../../shared/animations/SwipeEffects/SwipeEffects';
import { analytics } from '../../core/services/analytics';
import '../../styles/globals.css';
import styles from './Landing.module.css';

// FORCE IMPORTS to prevent tree-shaking
import '../../modules/screens/entry/EntryScreen';
import '../../modules/screens/intro/IntroScreen';
import '../../modules/screens/journey/JourneyScreen';
import '../../modules/screens/guidelines/GuidelinesScreen';
import '../../modules/screens/conduct/ConductScreen';
import '../../modules/screens/feedback/FeedbackScreen';

const Landing: React.FC = () => {
  const screenContext = useContext(ScreenContext);
  const [isInitialized, setIsInitialized] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [showSwipeEffects, setShowSwipeEffects] = useState(true);
  const [swipeIntensity, setSwipeIntensity] = useState(0);
  const [lastSwipeDirection, setLastSwipeDirection] = useState<'up' | 'down' | null>(null);
  const initTimeoutRef = useRef<NodeJS.Timeout>();
  const swipeTimeoutRef = useRef<NodeJS.Timeout>();

  const currentScreen = screenContext?.currentScreen || 'entry';
  const previousScreen = screenContext?.previousScreen || null;
  const isTransitioning = screenContext?.isTransitioning || false;
  const transitionDirection = screenContext?.transitionDirection || null;
  const goToScreen = screenContext?.goToScreen;
  const goToNextScreen = screenContext?.goToNextScreen;
  const goToPrevScreen = screenContext?.goToPrevScreen;

  useEffect(() => {
    initTimeoutRef.current = setTimeout(() => {
      setIsInitialized(true);
      analytics.track('landing_initialized', { screen: currentScreen });
    }, 800);

    return () => {
      if (initTimeoutRef.current) clearTimeout(initTimeoutRef.current);
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    };
  }, [currentScreen]);

  const navigateToScreen = useCallback((screenName: ScreenName) => {
    if (!goToScreen || isTransitioning || screenName === currentScreen) return;
    goToScreen(screenName);
  }, [currentScreen, isTransitioning, goToScreen]);

  const navigateNext = useCallback(() => {
    if (!goToNextScreen) return;

    // Show swipe up effect
    setLastSwipeDirection('up');
    setSwipeIntensity(1);
    setTimeout(() => setSwipeIntensity(0), 600);

    // Actually navigate to next screen
    goToNextScreen();
  }, [goToNextScreen]);

  const navigatePrev = useCallback(() => {
    if (!goToPrevScreen) return;

    // Show swipe down effect
    setLastSwipeDirection('down');
    setSwipeIntensity(1);
    setTimeout(() => setSwipeIntensity(0), 600);

    // Actually navigate to previous screen
    goToPrevScreen();
  }, [goToPrevScreen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioning) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        navigatePrev();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        navigateNext();
        break;
      case 'Home':
        e.preventDefault();
        navigateToScreen('entry');
        break;
      case 'End':
        e.preventDefault();
        navigateToScreen('feedback');
        break;
    }
  }, [isTransitioning, navigateNext, navigatePrev, navigateToScreen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartY || isTransitioning || !showSwipeEffects) return;

    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;
    const intensity = Math.min(1, Math.abs(diff) / 100);

    // Update swipe intensity for visual feedback
    setSwipeIntensity(intensity);
    setLastSwipeDirection(diff > 0 ? 'up' : 'down');
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartY || isTransitioning) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe up - NEXT screen (ORIGINAL)
        navigateNext();
      } else {
        // Swipe down - PREVIOUS screen (ORIGINAL)
        navigatePrev();
      }
    } else {
      // Swipe was too short, fade out the effect
      setSwipeIntensity(0);
    }

    setTouchStartY(null);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioning || Math.abs(e.deltaY) < 30) return;

    e.preventDefault();

    if (e.deltaY > 0) {
      // Scroll down - NEXT screen (ORIGINAL)
      navigateNext();
    } else {
      // Scroll up - PREVIOUS screen (ORIGINAL)
      navigatePrev();
    }
  }, [isTransitioning, navigateNext, navigatePrev]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Swipe handlers for react-swipeable - ORIGINAL DIRECTIONS
  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      if (isTransitioning || !showSwipeEffects) return;

      const intensity = Math.min(1, Math.abs(e.deltaY) / 100);
      setSwipeIntensity(intensity);
      setLastSwipeDirection(e.deltaY > 0 ? 'down' : 'up');
    },
    onSwipedUp: () => {
      if (!isTransitioning) {
        setLastSwipeDirection('up');
        setSwipeIntensity(1);
        setTimeout(() => setSwipeIntensity(0), 600);
        navigateNext();
      }
    },
    onSwipedDown: () => {
      if (!isTransitioning) {
        setLastSwipeDirection('down');
        setSwipeIntensity(1);
        setTimeout(() => setSwipeIntensity(0), 600);
        navigatePrev();
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 30,
    trackTouch: true
  });

  if (!isInitialized) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={styles.landingContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...swipeHandlers}
    >
      {/* Swipe Effects Overlay */}
      <SwipeEffects
        isActive={showSwipeEffects && !isTransitioning}
      />

      {/* Screen Container */}
      <div className={styles.screenContainer}>
        {screenRegistry.map((registration: ScreenRegistration) => {
          const { name, component: ScreenComponent } = registration;

          // Determine screen state
          const isCurrent = name === currentScreen;
          const isPrevious = name === previousScreen;
          const isVisible = isCurrent || (isPrevious && isTransitioning);

          if (!isVisible) return null;

          return (
            <div
              key={name}
              className={`${styles.screenWrapper} ${
                isCurrent ? styles.active : styles.inactive
              } ${isTransitioning ? styles.transitioning : ''} ${
                transitionDirection && isCurrent ? styles[transitionDirection] : ''
              } ${isPrevious && isTransitioning ? styles.exiting : ''}`}
              data-screen={name}
              data-screen-state={isCurrent ? 'current' : 'previous'}
              aria-hidden={!isCurrent}
            >
              <ScreenComponent
                isActive={isCurrent}
                transitionDirection={isVisible ? transitionDirection : null}
                onGetStarted={name === 'entry' && isCurrent ? navigateNext : undefined}
              />
            </div>
          );
        })}
      </div>

      {/* REMOVED: Navigation indicators (dots) */}

      {/* Footer with Muzi Ka Nkulunkulu */}
      <footer className={styles.landingFooter}>
        <p className={styles.footerText}>
          Muzi Ka Nkulunkulu
        </p>
      </footer>
    </div>
  );
};

export default Landing;
