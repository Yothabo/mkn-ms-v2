import { ExtendedMember } from './interfaces';
import { createMember } from './memberTemplate';

export const generateBulawayoMembers = (): ExtendedMember[] => {
  const members: ExtendedMember[] = [];

  // Active members (40%)
  for (let i = 1; i <= 40; i++) {
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'bulawayo', gender, 'active', i <= 10));
  }

  // Pre-RA members (25%)
  for (let i = 41; i <= 65; i++) {
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'bulawayo', gender, 'preRa', false));
  }

  // RA members (20%)
  for (let i = 66; i <= 85; i++) {
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'bulawayo', gender, 'ra', false));
  }

  // Inactive members (10%)
  for (let i = 86; i <= 95; i++) {
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'bulawayo', gender, 'inactive', false));
  }

  // Deceased members (5%)
  for (let i = 96; i <= 100; i++) {
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'bulawayo', gender, 'deceased', false));
  }

  return members;
};

export const generateGaboroneMembers = (): ExtendedMember[] => {
  const members: ExtendedMember[] = [];

  for (let i = 1; i <= 80; i++) {
    const status = i <= 32 ? 'active' : i <= 52 ? 'preRa' : i <= 68 ? 'ra' : i <= 76 ? 'inactive' : 'deceased';
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'gaborone', gender, status, i <= 8));
  }

  return members;
};

export const generateHarareMembers = (): ExtendedMember[] => {
  const members: ExtendedMember[] = [];

  for (let i = 1; i <= 80; i++) {
    const status = i <= 32 ? 'active' : i <= 52 ? 'preRa' : i <= 68 ? 'ra' : i <= 76 ? 'inactive' : 'deceased';
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'harare', gender, status, i <= 8));
  }

  return members;
};

export const generateJohannesburgMembers = (): ExtendedMember[] => {
  const members: ExtendedMember[] = [];

  for (let i = 1; i <= 80; i++) {
    const status = i <= 32 ? 'active' : i <= 52 ? 'preRa' : i <= 68 ? 'ra' : i <= 76 ? 'inactive' : 'deceased';
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'johannesburg', gender, status, i <= 8));
  }

  return members;
};

export const generatePretoriaMembers = (): ExtendedMember[] => {
  const members: ExtendedMember[] = [];

  for (let i = 1; i <= 80; i++) {
    const status = i <= 32 ? 'active' : i <= 52 ? 'preRa' : i <= 68 ? 'ra' : i <= 76 ? 'inactive' : 'deceased';
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'other';
    members.push(createMember(i, 'pretoria', gender, status, i <= 8));
  }

  return members;
};
