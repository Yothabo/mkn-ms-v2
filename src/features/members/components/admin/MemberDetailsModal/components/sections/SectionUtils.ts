// Shared utilities for member detail sections

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDisplayValue = (value: any, fallback: string = ''): string => {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
};

export const calculateDuration = (startDate: string, endDate?: string): string => {
  if (!startDate) return '';
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears !== 1 ? 's' : ''}`;
};

export const capitalizeText = (text: string): string => {
  if (!text) return '';
  return text.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};
