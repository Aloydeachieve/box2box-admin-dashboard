export type OrderStatus =
  | 'pending_pickup'
  | 'in_transit'
  | 'stored_in_vault'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export type ServiceType =
  | 'door-to-door'
  | 'smart-locker'
  | 'b2b-vault';

export interface CourierInfo {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  vehiclePlate: string;
  vehicleType: string;
}

export interface StorageOrder {
  id: string;
  trackingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAvatar: string;
  serviceType: ServiceType;
  itemsSummary: string;
  itemsCount: number;
  volumeM3: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: OrderStatus;
  courierAssigned?: CourierInfo;
  warehouseHub: string;
  warehouseBay: string;
  lockerCode?: string;
  scheduledDate: string;
  createdAt: string;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  climateControlled: boolean;
  qrCodeToken: string;
}

export interface WarehouseBay {
  id: string;
  code: string;
  rack: string;
  level: number;
  capacityM3: number;
  occupiedM3: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  currentOrderId?: string;
  customerName?: string;
  temperatureC: number;
  humidityPercent: number;
}

export interface WarehouseZone {
  id: string;
  name: string;
  code: string;
  city: string;
  totalUnits: number;
  occupiedUnits: number;
  capacityM3: number;
  usedM3: number;
  temperatureC: number;
  humidityPercent: number;
  status: 'nominal' | 'alert' | 'maintenance';
  bays: WarehouseBay[];
}

export interface CourierFleet {
  id: string;
  name: string;
  callsign: string;
  vehicleType: 'Electric Van' | 'Cargo E-Bike' | 'Sprinter Max';
  vehiclePlate: string;
  batteryLevel: number;
  currentOrders: number;
  maxCapacityM3: number;
  currentLoadM3: number;
  status: 'active_route' | 'idle' | 'charging' | 'returning_hub';
  currentZone: string;
  speedKmH: number;
  etaNextStop: string;
  lastPing: string;
}

export interface SmartLockerBank {
  id: string;
  name: string;
  city: string;
  address: string;
  totalCompartments: number;
  availableCompartments: number;
  status: 'online' | 'degraded' | 'offline';
  temperatureC: number;
  lastSync: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'pickup' | 'vault_move' | 'locker_deposit' | 'fleet_dispatch' | 'alert';
  title: string;
  description: string;
  actor: string;
  badge: string;
  hub: string;
}

export interface HubMetric {
  hubId: string;
  hubName: string;
  totalVolumeM3: number;
  utilizationRate: number;
  activeOrdersToday: number;
  fleetCount: number;
}
