export type BoxStatus = 'Activated' | 'Disabled' | 'Maintenance';
export type BatteryStatus = 'Excellent' | 'Good' | 'Fair' | 'Critical';
export type SignalStrength = 'Strong' | 'Moderate' | 'Weak' | 'Offline';
export type CompartmentStatus = 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
export type CompartmentSize = 'Small' | 'Medium' | 'Large' | 'Extra Large';

export interface CabinetCompartment {
  id: string;
  compartmentNumber: number;
  label: string; // e.g. "Door 1 (A1)", "Door 2 (A2)", etc.
  size: CompartmentSize;
  status: CompartmentStatus;
  currentBookingId?: string;
  currentCustomerName?: string;
  currentCustomerPhone?: string;
  trackingNumber?: string;
  isLocked: boolean;
  isDoorClosed: boolean;
  lastOpenedAt?: string;
  parcelDescription?: string;
}

export interface BoxEventLog {
  id: string;
  timestamp: string;
  eventType: 'unlock' | 'dropoff' | 'pickup' | 'tamper_alert' | 'maintenance' | 'power_event';
  title: string;
  description: string;
  compartmentLabel?: string;
  actor: string;
  severity: 'normal' | 'warning' | 'critical';
}

export interface BoxUnit {
  id: string;
  boxId: string; // e.g. "MyBox-123456"
  serialNumber: string; // e.g. "B2B-LKR-9821-X"
  name: string; // e.g. "Thomas Estate Smart Hub"
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAvatar: string;
  model: '2 Cabinets' | '4 Cabinets' | '6 Cabinets' | '8 Cabinets';
  status: BoxStatus;
  batteryHealth: {
    status: BatteryStatus;
    percentage: number;
    voltage: string;
    isCharging: boolean;
  };
  iotStatus: {
    isOnline: boolean;
    signalStrength: SignalStrength;
    firmwareVersion: string;
    temperature: string;
    humidity: string;
    lastPing: string;
  };
  usageRate: string;
  rating: number;
  totalBookings: number;
  dateInstalled: string;
  compartments: CabinetCompartment[];
  eventLogs?: BoxEventLog[];
}
