import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`member-form-section ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};
