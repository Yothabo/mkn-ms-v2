export * from './schemas/services';

export const serviceSchedule = [
  {
    day: 'sunday',
    services: [
      {
        id: 'sunday-morning',
        name: 'Sunday Morning Service',
        type: 'morning',
        defaultTime: '09:00',
        duration: 120,
        description: 'Main Sunday worship service with full program',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'evangelist', 'announcements', 'inside_facilitator', 'outside_facilitator']
      },
      {
        id: 'sunday-afternoon',
        name: 'Sunday Youth Service',
        type: 'afternoon',
        defaultTime: '14:00',
        duration: 90,
        description: 'Youth-focused service with contemporary elements',
        requiredDuties: ['chair', 'messenger', 'announcements', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'wednesday',
    services: [
      {
        id: 'wednesday-evening',
        name: 'Wednesday Bible Study',
        type: 'evening',
        defaultTime: '18:00',
        duration: 90,
        description: 'Mid-week Bible study and prayer service',
        requiredDuties: ['chair', 'reader', 'word_reader', 'messenger', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'thursday',
    services: [
      {
        id: 'thursday-evening',
        name: 'Thursday Prayer Service',
        type: 'evening',
        defaultTime: '18:00',
        duration: 60,
        description: 'Weekly prayer and intercession service',
        requiredDuties: ['chair', 'messenger', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'friday',
    services: [
      {
        id: 'friday-evening',
        name: 'Friday Night Vigil',
        type: 'evening',
        defaultTime: '20:00',
        duration: 120,
        description: 'Overnight prayer and worship vigil',
        requiredDuties: ['chair', 'reader', 'messenger', 'inside_facilitator', 'outside_facilitator']
      }
    ]
  },
  {
    day: 'saturday',
    services: [
      {
        id: 'saturday-morning',
        name: 'Saturday Choir Practice',
        type: 'morning',
        defaultTime: '10:00',
        duration: 90,
        description: 'Choir rehearsal and music practice',
        requiredDuties: ['chair', 'messenger']
      }
    ]
  }
];

export const getServiceByDayAndTime = (day: string, time: 'morning' | 'afternoon' | 'evening') => {
  const daySchedule = serviceSchedule.find(schedule => schedule.day === day);
  return daySchedule?.services.find(service => service.type === time);
};

export const getTodaysServices = () => {
  const today = new Date().toLocaleString('en', { weekday: 'lowercase' });
  const daySchedule = serviceSchedule.find(schedule => schedule.day === today);
  return daySchedule?.services || [];
};
