export function BottomNavBaseStyles() {
  return (
    <style>{`
      .bottom-nav {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 1200px;
        background: color-mix(in srgb, var(--color-surface) 80%, transparent);
        backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid var(--color-border);
        border-radius: 1.25rem;
        padding: 1.25rem;
        z-index: 999;
        box-sizing: border-box;
        min-height: 6rem; /* Increased height for bigger icons */
      }

      .nav-items {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: transparent;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        cursor: pointer;
        min-width: 5rem;
        color: var(--color-text-light);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        flex: 1;
        text-align: center;
        height: 100%;
        min-height: 4rem; /* Increased height for bigger icons */
        position: relative;
        overflow: hidden;
      }

      .nav-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--color-secondary);
        border-radius: 0.75rem;
        transform: scale(0.95);
        opacity: 0;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: -1;
      }

      .nav-item:hover {
        color: var(--color-secondary);
      }

      .nav-item:hover::before {
        opacity: 0.08;
        transform: scale(1);
      }

      .nav-item.active {
        color: white;
      }

      .nav-item.active::before {
        opacity: 1;
        transform: scale(1);
      }

      .nav-icon {
        width: 1.75rem; /* Increased icon size */
        height: 1.75rem; /* Increased icon size */
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 1;
      }

      .nav-item.active .nav-icon {
        transform: scale(1.1); /* Slightly bigger scale for active state */
      }

      .nav-label {
        font-size: 0.75rem; /* Smaller font size to match placeholder fonts */
        font-weight: 500;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 1;
      }

      .nav-item.active .nav-label {
        font-weight: 600;
      }
    `}</style>
  );
}
