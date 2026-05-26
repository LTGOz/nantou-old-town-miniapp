import { activities } from '@/data/activities';
import { Activity } from '@/types';

export const getActivities = (): Activity[] => {
  return activities;
};

export const getActivityById = (id: number): Activity | undefined => {
  return activities.find((a) => a.id === id);
};

export const getActivitiesByType = (type: string): Activity[] => {
  if (!type || type === 'all') return activities;
  return activities.filter((a) => a.type === type);
};
