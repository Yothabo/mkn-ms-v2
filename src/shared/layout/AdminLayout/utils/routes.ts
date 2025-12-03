import { AdminView, MemberView } from '../types';

export const ADMIN_VIEWS: AdminView[] = ['dashboard', 'members', 'attendance', 'duties', 'analytics'];
export const MEMBER_VIEWS: MemberView[] = ['home', 'announcements', 'hymns', 'duties', 'profile'];

export const isValidAdminView = (view: string): view is AdminView => 
  (ADMIN_VIEWS as string[]).includes(view);

export const isValidMemberView = (view: string): view is MemberView => 
  (MEMBER_VIEWS as string[]).includes(view);

export const getRoleFromPath = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  return pathSegments[0] || '';
};

export const getViewFromPath = (pathname: string): string => 
  pathname.split('/').pop() || '';
