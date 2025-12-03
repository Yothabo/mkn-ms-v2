import { useState } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import AuthModal from '../../features/auth/components/AuthModal';
import '../../styles/globals.css';
import Bg2 from '../../assets/Bg2.svg';

export default function Landing() {
  const { user, isLoading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="landing-page">
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
        <style>{`
          .landing-page {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-background);
          }
          .loading-container {
            text-align: center;
          }
          .loading-spinner {
            font-size: 1.25rem;
            color: var(--color-text);
          }
        `}</style>
      </div>
    );
  }

  if (user) {
    return null; // AppRoutes will handle redirect
  }

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
    <div className="landing-page">
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />

      <div className="landing-container">
        <div className="landing-content">
          <div className="top-image">
            <img
              src={Bg2}
              alt="Welcome Header"
              className="header-image"
              loading="lazy"
            />
          </div>

          <div className="text-content">
            <h1 className="title">Muzi ka Nkulunkulu</h1>
            <p className="description">
              A centralized platform for unified guidance and seamless coordination. Foster harmony, uphold order, and support collective spiritual practice.
            </p>
          </div>

          <div className="action-buttons">
            <button
              onClick={handleGetStarted}
              className="get-started-btn"
              aria-label="Get started with MKN"
            >
              Get Started
            </button>
            <button
              onClick={handleVisitWebsite}
              className="website-btn"
              aria-label="Visit official website"
            >
              Visit Our Website
            </button>
          </div>

          <p className="disclaimer">
            By continuing, you affirm your membership in the religion and agree to its{' '}
            <span className="highlight">values</span>,{' '}
            <span className="highlight">duties</span>, and{' '}
            <span className="highlight">structure</span>.
          </p>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        #root {
          width: 100%;
          height: 100%;
        }

        .landing-page {
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .landing-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .landing-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(1.5rem, 4vw, 3rem);
          width: 100%;
          max-width: min(90vw, 50rem);
          text-align: center;
        }

        .top-image {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .header-image {
          width: 100%;
          max-width: min(80vw, 30rem);
          height: auto;
          object-fit: contain;
        }

        .text-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.75rem, 2vw, 1.5rem);
          width: 100%;
          max-width: min(90vw, 50rem);
        }

        .title {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: bold;
          color: var(--color-text);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .description {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: var(--color-text-light);
          font-weight: 500;
          line-height: 1.5;
          max-width: min(90vw, 50rem);
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: clamp(0.75rem, 2vw, 1.25rem);
          width: 100%;
          max-width: min(90vw, 25rem);
        }

        @media (min-width: 768px) {
          .action-buttons {
            flex-direction: row;
            max-width: min(90vw, 30rem);
          }

          .action-buttons button {
            flex: 1;
          }
        }

        .get-started-btn {
          background: linear-gradient(135deg, var(--color-secondary), #0d9460);
          color: white;
          font-weight: 600;
          padding: clamp(1.25rem, 3vw, 1.75rem) clamp(1.5rem, 4vw, 2.5rem);
          border-radius: 9999px;
          border: none;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          min-height: clamp(3.5rem, 8vw, 5rem);
          line-height: 1;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .get-started-btn:hover {
          background: linear-gradient(135deg, #14532d, #0a7c4d);
          transform: scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .get-started-btn:active {
          transform: scale(0.98);
        }

        .get-started-btn:focus {
          outline: none;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .website-btn {
          background: transparent;
          color: var(--color-secondary);
          font-weight: 600;
          padding: clamp(1rem, 2.5vw, 1.5rem) clamp(1.5rem, 4vw, 2.5rem);
          border-radius: 9999px;
          border: 2px solid var(--color-secondary);
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
          font-size: clamp(0.875rem, 2vw, 1.125rem);
          min-height: clamp(3rem, 7vw, 4rem);
          line-height: 1;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .website-btn:hover {
          background: var(--color-secondary);
          color: white;
          transform: scale(1.02);
        }

        .website-btn:active {
          transform: scale(0.98);
        }

        .website-btn:focus {
          outline: none;
        }

        .disclaimer {
          font-size: clamp(0.375rem, 1.5vw, 0.75rem);
          color: var(--color-text-light);
          line-height: 1.4;
          max-width: min(90vw, 35rem);
        }

        .highlight {
          color: var(--color-accent);
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .landing-container {
            padding: 1rem;
          }
        }

        @media (min-width: 1200px) {
          .landing-content {
            gap: clamp(2rem, 3vw, 4rem);
          }

          .header-image {
            max-width: min(60vw, 35rem);
          }
        }

        @media (min-width: 1600px) {
          .landing-content {
            max-width: min(80vw, 70rem);
          }

          .text-content {
            max-width: min(80vw, 60rem);
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .landing-container {
            padding: 0.75rem;
          }

          .landing-content {
            gap: 1rem;
          }

          .header-image {
            max-width: 12rem;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .top-image {
          animation: fadeIn 0.8s ease-out;
        }

        .text-content {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }

        .action-buttons {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .disclaimer {
          animation: fadeIn 0.8s ease-out 0.6s both;
        }

        @media (hover: none) {
          .get-started-btn:hover,
          .website-btn:hover {
            transform: none;
          }

          .get-started-btn:active,
          .website-btn:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
