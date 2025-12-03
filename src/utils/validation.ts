export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  if (!name || name.trim().length === 0)
    return { isValid: false, error: `${fieldName} is required.` };
  if (name.length > 100)
    return { isValid: false, error: `${fieldName} must be less than 100 characters.` };
  const nameRegex = /^[\p{L} ,.'-]+$/u;
  if (!nameRegex.test(name))
    return {
      isValid: false,
      error: `${fieldName} can only contain letters, spaces, hyphens, apostrophes, and diacritics.`,
    };
  const punctuationRegex = /[^\p{L}]{3,}/u;
  if (punctuationRegex.test(name))
    return {
      isValid: false,
      error: `${fieldName} has too many consecutive non-letter characters.`,
    };
  const onlyPunctuationRegex = /^[^\\p{L}]+$/u;
  if (onlyPunctuationRegex.test(name))
    return { isValid: false, error: `${fieldName} must contain letters.` };
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim().length === 0)
    return { isValid: false, error: 'Phone number is required.' };
  const normalized = phone.replace(/[^\d+]/g, '');
  if (normalized.length < 7 || normalized.length > 16)
    return {
      isValid: false,
      error: 'Phone number must be between 7 and 16 digits including country code.',
    };
  if (!normalized.startsWith('+'))
    return {
      isValid: false,
      error: 'Phone number must start with a country code (e.g., +27 for South Africa).',
    };
  const digitsPart = normalized.slice(1);
  if (!/^\d+$/.test(digitsPart))
    return { isValid: false, error: 'Phone number can only contain digits and a leading plus.' };
  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim().length === 0) return { isValid: true };
  if (email.length > 254)
    return { isValid: false, error: 'Email must be less than 254 characters.' };
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email))
    return { isValid: false, error: 'Please enter a valid email address.' };
  return { isValid: true };
};

export const validateAddress = (
  address: string,
  fieldName: string = 'Address'
): ValidationResult => {
  if (!address || address.trim().length === 0)
    return { isValid: false, error: `${fieldName} is required.` };
  if (address.length > 200)
    return { isValid: false, error: `${fieldName} must be less than 200 characters.` };
  const addressRegex = /^[\p{L}0-9 .,\-'/#&]+$/u;
  if (!addressRegex.test(address))
    return { isValid: false, error: `${fieldName} contains invalid characters.` };
  return { isValid: true };
};

export const validateDateOfBirth = (dob: string): ValidationResult => {
  if (!dob) return { isValid: false, error: 'Date of birth is required.' };
  const birthDate = new Date(dob);
  const today = new Date();
  if (isNaN(birthDate.getTime())) return { isValid: false, error: 'Please enter a valid date.' };
  if (birthDate > today) return { isValid: false, error: 'Date of birth cannot be in the future.' };
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const adjustedAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  if (adjustedAge < 0) return { isValid: false, error: 'Date of birth cannot be in the future.' };
  if (adjustedAge > 120)
    return {
      isValid: false,
      error: 'Please enter a valid date of birth (age must be less than 120).',
    };
  return { isValid: true };
};

export const validateReasonOfEntry = (reason: string): ValidationResult => {
  if (!reason || reason.trim().length === 0)
    return { isValid: false, error: 'Reason of entry is required.' };
  if (reason.length > 500)
    return { isValid: false, error: 'Reason of entry must be less than 500 characters.' };
  const reasonRegex = /^[\p{L}0-9 .,!?\-'"]+$/u;
  if (!reasonRegex.test(reason))
    return { isValid: false, error: 'Reason of entry contains invalid characters.' };
  return { isValid: true };
};

export const validateNextOfKinName = (
  name: string,
  fieldName: string = 'Next of Kin Name'
): ValidationResult => validateName(name, fieldName);
export const validateNextOfKinPhone = (phone: string): ValidationResult => validatePhone(phone);
export const validateNextOfKinAddress = (address: string): ValidationResult =>
  validateAddress(address, 'Next of Kin Address');

export const validateRelationship = (relationship: string): ValidationResult => {
  if (!relationship || relationship.trim().length === 0)
    return { isValid: false, error: 'Relationship is required.' };
  const validRelationships = ['parent', 'spouse', 'child', 'sibling', 'other'];
  if (!validRelationships.includes(relationship))
    return { isValid: false, error: 'Please select a valid relationship.' };
  return { isValid: true };
};

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
  return errors.filter((error) => !error.isValid);
};
