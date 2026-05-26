export interface Merchant {
  id: number;
  name: string;
  category: 'cafe' | 'restaurant' | 'library';
  categoryLabel: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  rating: number;
  totalSeats: number;
  openTime: string;
  description: string;
  tags: string[];
}

export interface OccupancyRecord {
  merchantId: number;
  currentOccupancy: number;
  occupiedSeats: number;
  totalSeats: number;
  trend: 'up' | 'down' | 'stable';
  updateTime: string;
  hourlyData: HourlyOccupancy[];
}

export interface HourlyOccupancy {
  hour: string;
  rate: number;
}

export interface Activity {
  id: number;
  title: string;
  type: 'community' | 'merchant' | 'personal';
  typeLabel: string;
  category: string;
  merchantId?: number;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  fee: number;
  description: string;
  image: string;
  organizer: string;
}

export interface CircleGroup {
  id: number;
  name: string;
  icon: string;
  memberCount: number;
  description: string;
  category: string;
}

export interface NeighborPost {
  id: number;
  title: string;
  content: string;
  user: string;
  avatar: string;
  time: string;
  type: 'borrow' | 'exchange' | 'help' | 'rent';
}

export type OccupancyLevel = 'low' | 'medium' | 'high';

export interface OccupancyFilter {
  category: string;
  level: OccupancyLevel | 'all';
}
