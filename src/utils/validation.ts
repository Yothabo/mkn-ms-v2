// Validation utilities for member data

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Name validation (given name)
export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required.` };
  }

  if (name.length > 100) {
    return { isValid: false, error: `${fieldName} must be less than 100 characters.` };
  }

  // Allow Unicode letters, spaces, hyphens, apostrophes, diacritics
  const nameRegex = /^[\p{L} ,.'-]+$/u;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, apostrophes, and diacritics.` };
  }

  // Check for long runs of punctuation (more than 2 consecutive non-letter characters)
  const punctuationRegex = /[^\p{L}]{3,}/u;
  if (punctuationRegex.test(name)) {
    return { isValid: false, error: `${fieldName} has too many consecutive non-letter characters.` };
  }

  // Check if name is only punctuation or numbers
  const onlyPunctuationRegex = /^[^\\p{L}]+$/u;
  if (onlyPunctuationRegex.test(name)) {
    return { isValid: false, error: `${fieldName} must contain letters.` };
  }

  return { isValid: true };
};

// Phone validation
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required.' };
  }

  // Normalize: remove any non-digit and non-plus characters
  const normalized = phone.replace(/[^\d+]/g, '');

  // Check for reasonable length (6-15 digits after country code)
  if (normalized.length < 7 || normalized.length > 16) {
    return { isValid: false, error: 'Phone number must be between 7 and 16 digits including country code.' };
  }

  // Require + for international format
  if (!normalized.startsWith('+')) {
    return { isValid: false, error: 'Phone number must start with a country code (e.g., +27 for South Africa).' };
  }

  // After the +, we expect digits only
  const digitsPart = normalized.slice(1);
  if (!/^\d+$/.test(digitsPart)) {
    return { isValid: false, error: 'Phone number can only contain digits and a leading plus.' };
  }

  return { isValid: true };
};

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim().length === 0) {
    return { isValid: true }; // Email is optional
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email must be less than 254 characters.' };
  }

  // Basic email regex (pragmatic)
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  return { isValid: true };
};

// Address validation (free text)
export const validateAddress = (address: string, fieldName: string = 'Address'): ValidationResult => {
  if (!address || address.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required.` };
  }

  if (address.length > 200) {
    return { isValid: false, error: `${fieldName} must be less than 200 characters.` };
  }

  // Check for allowed characters: letters, digits, spaces, common punctuation
  const addressRegex = /^[\p{L}0-9 .,\-'/#&]+$/u;
  if (!addressRegex.test(address)) {
    return { isValid: false, error: `${fieldName} contains invalid characters.` };
  }

  return { isValid: true };
};

// Date of Birth validation
export const validateDateOfBirth = (dob: string): ValidationResult => {
  if (!dob) {
    return { isValid: false, error: 'Date of birth is required.' };
  }

  const birthDate = new Date(dob);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    return { isValid: false, error: 'Please enter a valid date.' };
  }

  if (birthDate > today) {
    return { isValid: false, error: 'Date of birth cannot be in the future.' };
  }

  // Check for reasonable age (0-120 years old)
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const adjustedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;

  if (adjustedAge < 0) {
    return { isValid: false, error: 'Date of birth cannot be in the future.' };
  }

  if (adjustedAge > 120) {
    return { isValid: false, error: 'Please enter a valid date of birth (age must be less than 120).' };
  }

  return { isValid: true };
};

// Reason of Entry validation
export const validateReasonOfEntry = (reason: string): ValidationResult => {
  if (!reason || reason.trim().length === 0) {
    return { isValid: false, error: 'Reason of entry is required.' };
  }

  if (reason.length > 500) {
    return { isValid: false, error: 'Reason of entry must be less than 500 characters.' };
  }

  // Allow letters, digits, spaces, and common punctuation.
  const reasonRegex = /^[\p{L}0-9 .,!?\-'"]+$/u;
  if (!reasonRegex.test(reason)) {
    return { isValid: false, error: 'Reason of entry contains invalid characters.' };
  }

  return { isValid: true };
};

// Next of Kin name validation (same as name validation)
export const validateNextOfKinName = (name: string, fieldName: string = 'Next of Kin Name'): ValidationResult => {
  return validateName(name, fieldName);
};

// Next of Kin phone validation (same as phone validation)
export const validateNextOfKinPhone = (phone: string): ValidationResult => {
  return validatePhone(phone);
};

// Next of Kin address validation (same as address validation)
export const validateNextOfKinAddress = (address: string): ValidationResult => {
  return validateAddress(address, 'Next of Kin Address');
};

// Relationship validation
export const validateRelationship = (relationship: string): ValidationResult => {
  if (!relationship || relationship.trim().length === 0) {
    return { isValid: false, error: 'Relationship is required.' };
  }

  const validRelationships = ['parent', 'spouse', 'child', 'sibling', 'other'];
  if (!validRelationships.includes(relationship)) {
    return { isValid: false, error: 'Please select a valid relationship.' };
  }

  return { isValid: true };
};

// Comprehensive member validation
export const validateMember = (member: any): ValidationResult[] => {
  const errors: ValidationResult[] = [];

  errors.push(validateName(member.name, 'Name'));
  errors.push(validateName(member.surname, 'Surname'));
  errors.push(validatePhone(member.phone));
  errors.push(validateEmail(member.email || ''));
  errors.push(validateAddress(member.address, 'Address'));
  errors.push(validateDateOfBirth(member.dateOfBirth));
  errors.push(validateReasonOfEntry(member.reasonOfEntry));
  
  if (member.nextOfKin) {
    errors.push(validateNextOfKinName(member.nextOfKin.name, 'Next of Kin Name'));
    errors.push(validateNextOfKinName(member.nextOfKin.surname, 'Next of Kin Surname'));
    errors.push(validateRelationship(member.nextOfKin.relationship));
    errors.push(validateNextOfKinPhone(member.nextOfKin.phone));
    errors.push(validateNextOfKinAddress(member.nextOfKin.address));
  }

  return errors.filter(error => !error.isValid);
};
