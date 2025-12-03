export const maskContact = (contact: string, method: string): string => {
  if (method === 'email') {
    const [username, domain] = contact.split('@');
    
    // Handle short usernames - if username is 4 chars or less, mask middle characters
    if (username.length <= 4) {
      const firstChar = username.slice(0, 1);
      const lastChar = username.length > 1 ? username.slice(-1) : '';
      const maskLength = Math.max(1, username.length - 2);
      return `${firstChar}${'*'.repeat(maskLength)}${lastChar}@${domain}`;
    } else {
      // Original logic for longer usernames
      const maskedUsername = username.slice(0, 2) + '*'.repeat(Math.max(0, username.length - 4)) + username.slice(-2);
      return `${maskedUsername}@${domain}`;
    }
  } else {
    // Phone number masking
    return contact.slice(0, -3).replace(/./g, '*') + contact.slice(-3);
  }
};
