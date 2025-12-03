export type VerificationMethod = 'email' | 'phone';

export interface VerificationRequest {
  firstName: string;
  lastName: string;
  cardReceiptNumber: string;
  method: VerificationMethod;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  maskedContact?: string;
  expiresIn?: number;
}

export interface VerifyOtpRequest {
  contact: string;
  otp: string;
  method: VerificationMethod;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    branch: string;
    role: 'member' | 'admin' | 'leader';
  };
  token?: string;
}
