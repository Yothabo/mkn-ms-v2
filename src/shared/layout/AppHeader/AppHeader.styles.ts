export const APP_HEADER_STYLES = `
  .sticky-header-container {
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
    background: var(--color-surface) !important;
    backdrop-filter: blur(20px) saturate(180%) !important;
    border-bottom: 1px solid var(--color-border) !important;
    padding: 1rem !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .header-content {
    display: flex !important;
    justify-content: flex-end !important;
    align-items: center !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
    width: 100% !important;
  }

  .header-actions {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
  }

  /* View Mode Switcher Styles */
  .view-mode-switcher {
    display: flex !important;
    gap: 0.25rem !important;
    background: var(--color-background-muted) !important;
    border: 1px solid var(--color-border) !important;
    border-radius: 0.5rem !important;
    padding: 0.25rem !important;
  }

  .view-mode-button {
    display: flex !important;
    align-items: center !important;
    gap: 0.375rem !important;
    background: transparent !important;
    border: 1px solid transparent !important;
    border-radius: 0.375rem !important;
    padding: 0.5rem 0.75rem !important;
    cursor: pointer !important;
    color: var(--color-text-light) !important;
    transition: all 0.2s ease !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
  }

  .view-mode-button:hover {
    background: color-mix(in srgb, var(--color-secondary) 10%, transparent) !important;
    color: var(--color-text) !important;
    border-color: var(--color-border) !important;
  }

  .view-mode-button.active {
    background: var(--color-secondary) !important;
    color: white !important;
    border-color: var(--color-secondary) !important;
  }

  .view-mode-label {
    font-size: 0.875rem !important;
    font-weight: 500 !important;
  }

  .theme-toggle-btn, .logout-btn {
    background: transparent !important;
    border: 1px solid var(--color-border) !important;
    border-radius: 0.5rem !important;
    padding: 0.75rem !important;
    cursor: pointer !important;
    color: var(--color-text-light) !important;
    transition: all 0.2s ease !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 3rem !important;
    height: 3rem !important;
  }

  .theme-toggle-btn:hover, .logout-btn:hover {
    background: var(--color-secondary) !important;
    color: white !important;
    border-color: var(--color-secondary) !important;
    transform: translateY(-1px) !important;
  }

  .theme-toggle-btn:active, .logout-btn:active, .view-mode-button:active {
    transform: translateY(0) !important;
  }

  @media (max-width: 640px) {
    .sticky-header-container {
      padding: 0.75rem !important;
    }

    .header-actions {
      gap: 0.5rem !important;
    }

    .view-mode-button {
      padding: 0.375rem 0.5rem !important;
      gap: 0.25rem !important;
    }

    .view-mode-label {
      font-size: 0.8rem !important;
    }

    .theme-toggle-btn, .logout-btn {
      padding: 0.625rem !important;
      width: 2.75rem !important;
      height: 2.75rem !important;
      border-radius: 0.5rem !important;
    }
  }

  @media (max-width: 480px) {
    .view-mode-label {
      display: none !important;
    }

    .view-mode-button {
      padding: 0.5rem !important;
    }

    .theme-toggle-btn, .logout-btn {
      padding: 0.5rem !important;
      width: 2.5rem !important;
      height: 2.5rem !important;
      border-radius: 0.5rem !important;
    }
  }
`;
