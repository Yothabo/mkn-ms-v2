import React from 'react';
import styles from './TechDashboard.module.css';

const TechDashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tech Dashboard</h1>
      <p className={styles.description}>Tech dashboard will be implemented here.</p>
      <div className={styles.placeholder}>
        <p>Feature coming soon: System overview and quick access to tech tools</p>
      </div>
    </div>
  );
};

export default TechDashboard;
