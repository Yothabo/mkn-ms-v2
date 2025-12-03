// Generation utilities for members
import { countryPhoneCodes, countryPhonePrefixes, raRemovalReasons } from './constants';
import {
  zimbabweMaleNames,
  zimbabweFemaleNames,
  zimbabweSurnames,
  zimbabweCountryName
} from './namePools/zimbabwe';
import {
  botswanaMaleNames,
  botswanaFemaleNames,
  botswanaSurnames,
  botswanaCountryName
} from './namePools/botswana';
import {
  southAfricaMaleNames,
  southAfricaFemaleNames,
  southAfricaSurnames,
  southAfricaCountryName
} from './namePools/southAfrica';

export const generatePhoneNumber = (country: string): string => {
  const code = countryPhoneCodes[country] || '+263';
  const prefixList = countryPhonePrefixes[country] || ['77', '78'];
  const prefix = prefixList[Math.floor(Math.random() * prefixList.length)];
  const number = Math.floor(1000000 + Math.random() * 9000000);

  return `${code} ${prefix} ${number.toString().slice(0, 3)} ${number.toString().slice(3)}`;
};

export const generateCardNumber = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const generateReceiptNumber = (): string => {
  const prefix = 'RCP';
  const number = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${number}`;
};

export const getCountryNames = (branch: string) => {
  const countryMap: { [key: string]: { male: string[], female: string[], surnames: string[], country: string } } = {
    'bulawayo': { male: zimbabweMaleNames, female: zimbabweFemaleNames, surnames: zimbabweSurnames, country: zimbabweCountryName },
    'harare': { male: zimbabweMaleNames, female: zimbabweFemaleNames, surnames: zimbabweSurnames, country: zimbabweCountryName },
    'gaborone': { male: botswanaMaleNames, female: botswanaFemaleNames, surnames: botswanaSurnames, country: botswanaCountryName },
    'johannesburg': { male: southAfricaMaleNames, female: southAfricaFemaleNames, surnames: southAfricaSurnames, country: southAfricaCountryName },
    'pretoria': { male: southAfricaMaleNames, female: southAfricaFemaleNames, surnames: southAfricaSurnames, country: southAfricaCountryName }
  };

  return countryMap[branch] || { male: zimbabweMaleNames, female: zimbabweFemaleNames, surnames: zimbabweSurnames, country: zimbabweCountryName };
};

export const generateRAHistory = (member: any): any[] => {
  const history = [];
  const today = new Date();

  if (member.status === 'ra' || member.status === 'preRa') {
    const raStart = new Date(today.getTime());
    raStart.setDate(today.getDate() - (member.status === 'ra' ? 120 : 75));

    history.push({
      raStartDate: raStart.toISOString().split('T')[0],
      raEndDate: null,
      raRemovalReason: null
    });
  }

  // Add some past RA history for some members
  if (Math.random() > 0.7 && member.raCount > 0) {
    for (let i = 0; i < member.raCount; i++) {
      const startDate = new Date(today.getTime());
      startDate.setFullYear(startDate.getFullYear() - (i + 1));
      startDate.setMonth(Math.floor(Math.random() * 12));

      const endDate = new Date(startDate.getTime());
      endDate.setMonth(endDate.getMonth() + 2 + Math.floor(Math.random() * 4));

      history.push({
        raStartDate: startDate.toISOString().split('T')[0],
        raEndDate: endDate.toISOString().split('T')[0],
        raRemovalReason: raRemovalReasons[Math.floor(Math.random() * raRemovalReasons.length)]
      });
    }
  }

  return history;
};
