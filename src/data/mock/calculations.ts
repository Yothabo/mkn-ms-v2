// Calculation utilities for members
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const getPurityStatus = (age: number, gender: string): 'virgin' | 'none' | 'inapplicable' => {
  if (age < 18) return 'inapplicable';
  if (age > 60) return 'inapplicable';
  return Math.random() > 0.7 ? 'virgin' : 'none';
};

export const getPositionByAge = (age: number, isNewMember: boolean): string => {
  if (isNewMember) return 'member';
  if (age >= 60) return 'conciliator';
  if (age >= 40) return Math.random() > 0.5 ? 'facilitator' : 'evangelist';
  if (age >= 30) return Math.random() > 0.5 ? 'messenger' : 'steward';
  if (age >= 25) return Math.random() > 0.5 ? 'songster' : 'clerk';
  return 'member';
};

export const calculateStatus = (lastAttendance: string, raHistory: any[]): { status: string, raCount: number } => {
  const today = new Date();
  const lastAttended = new Date(lastAttendance);
  const daysSinceLastAttendance = Math.floor((today.getTime() - lastAttended.getTime()) / (1000 * 60 * 60 * 24));

  let raCount = raHistory.filter(ra => ra.raEndDate).length;

  if (daysSinceLastAttendance >= 90) {
    return { status: 'ra', raCount: raCount + 1 };
  } else if (daysSinceLastAttendance >= 60) {
    return { status: 'preRa', raCount };
  } else {
    return { status: 'active', raCount };
  }
};
