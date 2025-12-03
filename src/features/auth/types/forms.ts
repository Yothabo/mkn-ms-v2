export interface BaseFormProps {
  isLoading?: boolean;
  error?: string;
  onClose?: () => void;
}

export interface AuthFormData {
  cardNumber?: string;
  cardReceiptNumber?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  rememberMe?: boolean;
  acceptedTerms?: boolean;
}

export interface FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}
