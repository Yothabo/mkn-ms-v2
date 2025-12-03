import React from 'react';
import styles from './TechAccountRecovery.module.css';

const TechAccountRecovery: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Recovery</h1>
      <p className={styles.description}>Account recovery tools will be implemented here.</p>
      <div className={styles.placeholder}>
        <p>Feature coming soon: Card-based account lookup and state management</p>
      </div>
    </div>
  );
};

export default TechAccountRecovery;
