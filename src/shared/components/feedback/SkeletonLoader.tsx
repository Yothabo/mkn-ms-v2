import React from 'react';

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'dashboard';
}

export default function SkeletonLoader({ type = 'card' }: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="skeleton-dashboard">
            <div className="skeleton-header"></div>
            <div className="skeleton-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-card"></div>
              ))}
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="skeleton-list">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-item"></div>
            ))}
          </div>
        );
      default:
        return (
          <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line long"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderSkeleton()}
      <style>{`
        .skeleton-dashboard,
        .skeleton-list,
        .skeleton-card {
          animation: pulse 2s infinite;
        }

        .skeleton-header {
          height: 3rem;
          background: var(--color-border);
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .skeleton-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: 1rem;
          border: 1px solid var(--color-border);
        }

        .skeleton-image {
          height: 120px;
          background: var(--color-border);
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .skeleton-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skeleton-line {
          height: 0.75rem;
          background: var(--color-border);
          border-radius: var(--radius-sm);
        }

        .skeleton-line.short {
          width: 60%;
        }

        .skeleton-line.medium {
          width: 80%;
        }

        .skeleton-line.long {
          width: 100%;
        }

        .skeleton-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skeleton-item {
          height: 4rem;
          background: var(--color-border);
          border-radius: var(--radius-md);
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
