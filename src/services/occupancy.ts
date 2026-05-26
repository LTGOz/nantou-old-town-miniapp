import { occupancyData } from '@/data/occupancy';
import { OccupancyRecord, HourlyOccupancy } from '@/types';

export const getOccupancyByMerchant = (merchantId: number): OccupancyRecord | undefined => {
  return occupancyData.find((o) => o.merchantId === merchantId);
};

export const getOccupancyList = (): OccupancyRecord[] => {
  return occupancyData;
};

export const getOccupancyTrend = (merchantId: number): HourlyOccupancy[] => {
  const record = occupancyData.find((o) => o.merchantId === merchantId);
  return record ? record.hourlyData : [];
};
