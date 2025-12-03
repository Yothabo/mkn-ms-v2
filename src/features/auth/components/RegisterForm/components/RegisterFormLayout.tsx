import React from 'react';
import { RegisterFormFields } from './RegisterFormFields';

// Import single source of truth styles
import styles from '../../AuthModal/AuthModal.module.css';

interface RegisterFormLayoutProps {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export const RegisterFormLayout: React.FC<RegisterFormLayoutProps> = ({
  formData,
  onFieldChange,
  isLoading
}) => {
  return (
    <div className={styles.authFormLayout}>
      <div className={styles.authFormContent}>
        <RegisterFormFields
          formData={formData}
          onFieldChange={onFieldChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
