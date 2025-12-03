export function BottomNavResponsiveStyles() {
  return (
    <style>{`
      @media (max-width: 640px) {
        .bottom-nav {
          width: 100vw;
          bottom: 0;
          left: 0;
          right: 0;
          transform: none;
          border-radius: 0;
          border: none;
          border-top: 1px solid var(--color-border);
          padding: var(--spacing-sm) var(--spacing-xs) var(--spacing-md) var(--spacing-xs);
          margin: 0;
          max-width: none;
          min-height: var(--spacing-4xl);
        }

        .nav-items {
          padding: 0;
          margin: 0;
          gap: var(--spacing-xs);
          height: 100%;
        }

        .nav-item {
          padding: var(--spacing-sm) 0.125rem;
          min-width: auto;
          gap: var(--spacing-xs);
          flex: 1;
          max-width: 20%;
          min-height: 3.5rem;
        }

        .nav-item:hover {
          transform: none;
        }

        .nav-item.active {
          transform: none;
        }

        .nav-icon {
          width: var(--spacing-lg);
          height: var(--spacing-lg);
        }

        .nav-label {
          font-size: 0.65rem;
        }
      }

      @media (max-width: 380px) {
        .bottom-nav {
          padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-sm) var(--spacing-xs);
          min-height: var(--spacing-3xl);
        }

        .nav-items {
          gap: 0.125rem;
        }

        .nav-item {
          padding: var(--spacing-xs) 0.0625rem;
          gap: 0.25rem;
          min-height: 3rem;
        }

        .nav-label {
          font-size: 0.6rem;
        }

        .nav-icon {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
    `}</style>
  );
}
