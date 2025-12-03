import { useState } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { AuthModal } from '../../features/auth/components/AuthModal/AuthModal';
import Button from '../../shared/ui/Button/Button';
import LoadingScreen from '../../shared/components/LoadingScreen/LoadingScreen';
import Bg2 from '../../assets/Bg2.svg';
import styles from './Landing.module.css';

export default function Landing() {
  const { user, isLoading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen message="Preparing your experience..." />;
  }

  // Don't return null for authenticated users - AppRoutes will handle redirect
  // if (user) {
  //   return null; // AppRoutes will handle redirect
  // }

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleVisitWebsite = () => {
    window.open('https://www.muzikankulunkulu.com/', '_blank');
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className={`${styles.landingPage} ${styles.lightTheme}`}>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />

      <div className={styles.landingContainer}>
        <div className={styles.landingContent}>
          <div className={styles.topImage}>
            <img
              src={Bg2}
              alt="Muzi ka Nkulunkulu"
              className={styles.headerImage}
              loading="lazy"
            />
          </div>

          <div className={styles.textContent}>
            <h1 className={styles.title}>Muzi ka Nkulunkulu</h1>
            <p className={styles.description}>
              A centralized platform for unified guidance and seamless coordination. Foster harmony,
              uphold order, and support collective spiritual practice.
            </p>
          </div>

          <div className={styles.actionButtons}>
            <Button
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
              className={styles.getStartedBtn}
              aria-label="Get started with MKN"
            >
              Get Started
            </Button>
            <Button
              onClick={handleVisitWebsite}
              variant="outline"
              size="lg"
              className={styles.websiteBtn}
              aria-label="Visit official website"
            >
              Visit Our Website
            </Button>
          </div>

          <p className={styles.disclaimer}>
            By continuing, you affirm your membership in the religion and agree to its{' '}
            <span className={styles.highlight}>values</span>,{' '}
            <span className={styles.highlight}>duties</span>, and{' '}
            <span className={styles.highlight}>structure</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
