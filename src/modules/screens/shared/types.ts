export interface TextGridSpan {
  id: number;
  content: string;
  className: string;
  style: React.CSSProperties;
}

export interface FeedbackOption {
  value: string;
  label: string;
}

export interface FormData {
  name: string;
  surname: string;
  cardNumber: string;
  email: string;
  helpType: string;
  comments: string;
}

export interface SectionItem {
  id: number;
  title: string;
  items: string[];
}

export interface RegistrationLine {
  label: string;
  value: string;
}

export interface RegistrationCard {
  id: number;
  lines: RegistrationLine[];
}

export interface ActivityButton {
  id: number;
  label: string;
}
