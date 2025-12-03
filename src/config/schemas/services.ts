export interface Service {
  id: string;
  name: string;
  type: 'morning' | 'afternoon' | 'evening';
  defaultTime: string;
  duration: number;
  description: string;
  requiredDuties: string[];
}

export interface ServiceSchedule {
  day: string;
  services: Service[];
}
