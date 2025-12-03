import { serviceSchedule, getServiceByDayAndTime, getTodaysServices, Service } from '../config/services';
import { getDutiesByServiceType, getDutyById, canMemberPerformDuty, getEligibleMembersForDuty, Position } from '../config/duties';
import { ChurchMember, AssignedDuty } from './types/service';

class ServiceManagerCore {
  getServiceSchedule() { return serviceSchedule; }

  getUpcomingServices(days: number = 7): (Service & { date: string })[] {
    const upcoming: (Service & { date: string })[] = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(today); date.setDate(today.getDate() + i);
      const dayName = date.toLocaleString('en', { weekday: 'lowercase' });
      const dayServices = serviceSchedule.find(schedule => schedule.day === dayName)?.services || [];
      upcoming.push(...dayServices.map(service => ({ ...service, date: date.toISOString().split('T')[0] })));
    }
    return upcoming;
  }

  assignDuty(member: ChurchMember, dutyId: string, serviceDate: string, serviceTime: 'morning' | 'afternoon' | 'evening', day: string): AssignedDuty | null {
    console.log(`Assigning duty ${dutyId} to ${member.name} (${member.position}) for ${day} ${serviceTime}`);
    if (!canMemberPerformDuty(member.position, dutyId, day)) { console.log(`Member cannot perform duty ${dutyId} on ${day}`); return null; }
    if (day === 'wednesday' && dutyId === 'chair' && (!member.isYouth || member.virginityStatus !== true)) { console.log(`Wednesday Chair requires Youth virgin`); return null; }
    if (day === 'thursday' && dutyId === 'chair' && member.isYouth) { console.log(`Thursday Chair cannot be Youth`); return null; }
    return { dutyId, memberId: member.id, serviceId: `${serviceDate}_${serviceTime}`, date: serviceDate, time: serviceTime, status: 'assigned' };
  }

  getAvailableDutiesForMember(member: ChurchMember, serviceType: 'full' | 'short', day: string): string[] {
    return getDutiesByServiceType(serviceType).filter(duty => canMemberPerformDuty(member.position, duty.id, day)).map(duty => duty.id);
  }

  autoAssignDuties(availableMembers: ChurchMember[], serviceDate: string, serviceTime: 'morning' | 'afternoon' | 'evening', day: string, serviceType: 'full' | 'short'): AssignedDuty[] {
    const assignments: AssignedDuty[] = []; const assignedMembers = new Set<string>();
    const requiredDuties = getDutiesByServiceType(serviceType);
    for (const duty of requiredDuties) {
      const eligibleMembers = getEligibleMembersForDuty(duty.id, availableMembers, day).filter(member => !assignedMembers.has(member.id));
      if (eligibleMembers.length > 0) {
        const priorityMembers = (duty.id === 'inside_facilitator' || duty.id === 'outside_facilitator') ? eligibleMembers.filter(m => m.isFemale) : [];
        const selectedMember = priorityMembers.length > 0 ? priorityMembers[0] : eligibleMembers[0];
        const assignment = this.assignDuty(selectedMember, duty.id, serviceDate, serviceTime, day);
        if (assignment) { assignments.push(assignment); assignedMembers.add(selectedMember.id); }
      } else console.log(`No eligible members for duty: ${duty.id}`);
    }
    return assignments;
  }

  markAttendance(memberId: string, serviceDate: string, serviceTime: 'morning' | 'afternoon' | 'evening'): boolean {
    console.log(`Marking attendance for ${memberId} at ${serviceTime} on ${serviceDate}`); return true;
  }

  getMemberAttendance(memberId: string, startDate: string, endDate: string): any[] {
    console.log(`Getting attendance for ${memberId} from ${startDate} to ${endDate}`); return [];
  }

  getAvailableDuties(serviceType: 'full' | 'short') { return getDutiesByServiceType(serviceType); }
  getTodaysServiceInfo() { return getTodaysServices(); }

  isServiceActive(day: string, time: 'morning' | 'afternoon' | 'evening'): boolean {
    const service = getServiceByDayAndTime(day, time); if (!service) return false;
    const now = new Date(); const [hours, minutes] = service.defaultTime.split(':').map(Number);
    const serviceTime = new Date(); serviceTime.setHours(hours, minutes, 0, 0);
    const startWindow = new Date(serviceTime.getTime() - 30 * 60000); const endWindow = new Date(serviceTime.getTime() + 2 * 60 * 60000);
    return now >= startWindow && now <= endWindow;
  }

  getCurrentService(): { service: Service; day: string } | null {
    const now = new Date(); const day = now.toLocaleString('en', { weekday: 'lowercase' });
    const currentHour = now.getHours(); let serviceTime: 'morning' | 'afternoon' | 'evening' = 'evening';
    if (currentHour < 12) serviceTime = 'morning'; else if (currentHour < 17) serviceTime = 'afternoon';
    const service = getServiceByDayAndTime(day, serviceTime);
    return (service && this.isServiceActive(day, serviceTime)) ? { service, day } : null;
  }
}

export const serviceManager = new ServiceManagerCore();
