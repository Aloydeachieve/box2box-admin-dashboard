export interface StatItem {
  id: string;
  title: string;
  value: string;
  change?: string;
  subtext: string;
  isPositive?: boolean;
}

export interface NewUserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  dateJoined: string;
  userType: 'Customer' | 'Box owner' | 'Rider';
}

export interface RecentBoxRow {
  id: string;
  boxId: string;
  address: string;
  ownerName: string;
  ownerEmail: string;
  capacity: string;
  status: 'Activated' | 'Disabled';
  batteryHealth: {
    status: 'Excellent' | 'Good' | 'Fair' | 'Critical';
    percentage: number;
  };
  usageRate: string;
  rating: number;
}

export interface InventoryRow {
  id: string;
  item: string;
  type: string;
  modelCategory: string;
  quantity: number;
  lastUpdated: string;
  updatedBy: string;
  status: 'Available' | 'In demand' | 'Out of stock';
  location: string;
}

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  reportCode: string;
  time: string;
  status: 'Pending' | 'Resolved' | 'In progress';
  thumbnail?: string;
}

export interface FlagTriggerItem {
  id: string;
  title: string;
  boxId: string;
  time: string;
  severity: 'Critical' | 'Needs review';
  actionLabel: string;
}

export interface BookingItem {
  id: string;
  bookingCode: string;
  boxInfo: string;
  time: string;
}

export interface ActiveDeliveryItem {
  id: string;
  bookingCode: string;
  statusText: 'Waiting drop off' | 'Pickup confirmed' | 'In transit';
  time: string;
}
