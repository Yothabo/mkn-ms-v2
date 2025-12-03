// Service definitions and schedules
export interface ServiceSchedule {
  day: string;
  services: Service[];
}

export interface Service {
  time: 'morning' | 'afternoon' | 'evening';
  type: 'full' | 'short';
  theme: string;
  defaultTime: string;
  requiredDuties: string[];
}

export const serviceSchedule: ServiceSchedule[] = [
  {
    day: 'monday',
    services: [
      {
        time: 'evening',
        type: 'short',
        theme: 'Healing service',
        defaultTime: '18:00',
        requiredDuties: ['chair', 'messenger', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'tuesday',
    services: [
      {
        time: 'evening',
        type: 'full',
        theme: 'Service of the duty bearers',
        defaultTime: '18:00',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'wednesday',
    services: [
      {
        time: 'evening',
        type: 'full',
        theme: 'Miriam service leading the Youth',
        defaultTime: '18:00',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'thursday',
    services: [
      {
        time: 'evening',
        type: 'full',
        theme: 'Janet service',
        defaultTime: '18:00',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'friday',
    services: [
      {
        time: 'evening',
        type: 'full',
        theme: 'God\'s Revelation',
        defaultTime: '18:00',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'saturday',
    services: [
      {
        time: 'morning',
        type: 'short',
        theme: 'Healing service',
        defaultTime: '09:00',
        requiredDuties: ['chair', 'messenger', 'announcements', 'inside_facilitator', 'outside_facilitator']
      },
      {
        time: 'afternoon',
        type: 'full',
        theme: 'Robed',
        defaultTime: '15:00',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'sunday',
    services: [
      {
        time: 'morning',
        type: 'full',
        theme: 'Robed',
        defaultTime: '09:00',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      },
      {
        time: 'afternoon',
        type: 'full',
        theme: 'The Departure',
        defaultTime: '15:00',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  }
];

// Helper functions
export const getServiceByDayAndTime = (day: string, time: 'morning' | 'afternoon' | 'evening'): Service | undefined => {
  const daySchedule = serviceSchedule.find(schedule => schedule.day === day.toLowerCase());
  return daySchedule?.services.find(service => service.time === time);
};

export const getTodaysServices = (): Service[] => {
  const today = new Date().toLocaleString('en', { weekday: 'lowercase' });
  const daySchedule = serviceSchedule.find(schedule => schedule.day === today);
  return daySchedule?.services || [];
};

export const isServiceDay = (day: string): boolean => {
  return serviceSchedule.some(schedule => schedule.day === day.toLowerCase());
};
