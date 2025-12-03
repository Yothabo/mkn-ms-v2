import React from 'react';
import Input from './Input';
import Select from './Select';

interface FormFieldProps {
  type: 'text' | 'email' | 'tel' | 'select' | 'date';
  name: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  required?: boolean;
  error?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  required = false,
  error,
  options = [],
  placeholder
}) => {
  if (type === 'select') {
    return (
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        required={required}
        error={error}
      />
    );
  }

  return (
    <Input
      type={type}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      error={error}
      placeholder={placeholder}
    />
  );
};
