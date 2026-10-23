export interface BoxModelItem {
  id: string;
  model: string;
  sku: string;
  cabinets: number;
  material: 'Wood' | 'Metal';
  amount: string;
  status: 'Active' | 'Discontinued';
  noAvailable: number;
  noAssigned: number;
  noDeployed: number;
  noFaulty: number;
  image: string;
  isDiscontinued?: boolean;
}

export interface StockLocationItem {
  id: string;
  model: string;
  sku: string;
  cabinets: number;
  material: 'Wood' | 'Metal';
  status: 'Available' | 'Low stock' | 'Out of stock';
  noAvailable: number;
  noAssigned: number;
  noDeployed: number;
  noFaulty: number;
  location: string;
  image: string;
}

export interface BoxStockUnit {
  id: string;
  boxId: string;
  status: 'Available' | 'Deployed' | 'Sold' | 'Assigned';
  addedBy: {
    name: string;
    timestamp: string;
  };
  soldBy?: {
    name: string;
    timestamp: string;
  };
  owner?: {
    name: string;
    code: string;
  };
  orderId?: string;
  isFaulty?: boolean;
}

export interface PartDistributionItem {
  id: string;
  component: string;
  partId: string;
  usage: 'Universal' | 'A1' | 'A2' | 'A3';
  supplier: string;
  installedBy: {
    name: string;
    timestamp: string;
  };
  status: 'Good' | 'Faulty';
  isFaulty?: boolean;
}

export interface ActivityHistoryItem {
  id: string;
  title: string;
  description: string;
  actor: string;
  role: 'Auto' | 'Admin';
  timestamp: string;
}

export const initialBoxModels: BoxModelItem[] = [
  {
    id: 'mybox-standard',
    model: 'MyBox-Standard',
    sku: 'MBX-789012',
    cabinets: 3,
    material: 'Wood',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 100,
    noAssigned: 10,
    noDeployed: 2000,
    noFaulty: 2,
    image: '/image/closed cabinet.svg',
    isDiscontinued: false,
  },
  {
    id: 'mybox-elite',
    model: 'MyBox-Elite',
    sku: 'MBX-789013',
    cabinets: 3,
    material: 'Metal',
    amount: '₦150,000',
    status: 'Discontinued',
    noAvailable: 30,
    noAssigned: 0,
    noDeployed: 2000,
    noFaulty: 0,
    image: '/image/closed cabinet.svg',
    isDiscontinued: true,
  },
  {
    id: 'mybox-star',
    model: 'MyBox-Star',
    sku: 'MBX-789014',
    cabinets: 3,
    material: 'Metal',
    amount: '₦150,000',
    status: 'Discontinued',
    noAvailable: 0,
    noAssigned: 0,
    noDeployed: 2000,
    noFaulty: 0,
    image: '/image/closed cabinet.svg',
    isDiscontinued: true,
  },
];

export const initialStockByLocation: StockLocationItem[] = [
  {
    id: 'stock-standard-ikeja',
    model: 'MyBox-Standard',
    sku: 'MBX-789012',
    cabinets: 3,
    material: 'Wood',
    status: 'Available',
    noAvailable: 100,
    noAssigned: 10,
    noDeployed: 2000,
    noFaulty: 2,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/closed cabinet.svg',
  },
  {
    id: 'stock-elite-ikeja',
    model: 'MyBox-Elite',
    sku: 'MBX-789013',
    cabinets: 3,
    material: 'Metal',
    status: 'Low stock',
    noAvailable: 30,
    noAssigned: 0,
    noDeployed: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/closed cabinet.svg',
  },
  {
    id: 'stock-star-ikeja',
    model: 'MyBox-Star',
    sku: 'MBX-789014',
    cabinets: 3,
    material: 'Metal',
    status: 'Out of stock',
    noAvailable: 0,
    noAssigned: 0,
    noDeployed: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/closed cabinet.svg',
  },
];

export const initialStockUnits: BoxStockUnit[] = [
  {
    id: 'unit-1',
    boxId: 'MyBox-123456',
    status: 'Available',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    isFaulty: false,
  },
  {
    id: 'unit-2',
    boxId: 'MyBox-123456',
    status: 'Deployed',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    soldBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    owner: {
      name: 'Aku cynthia',
      code: 'S-123546',
    },
    orderId: '#123456',
    isFaulty: false,
  },
  {
    id: 'unit-3',
    boxId: 'MyBox-123456',
    status: 'Sold',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    soldBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    owner: {
      name: 'Aku cynthia',
      code: 'S-123546',
    },
    orderId: '#123456',
    isFaulty: false,
  },
  {
    id: 'unit-4',
    boxId: 'MyBox-123456',
    status: 'Assigned',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    soldBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    owner: {
      name: 'Aku cynthia',
      code: 'S-123546',
    },
    orderId: '#123456',
    isFaulty: false,
  },
];

export const initialPartsDistribution: PartDistributionItem[] = [
  {
    id: 'part-1',
    component: 'Battery',
    partId: 'P-123456',
    usage: 'Universal',
    supplier: 'Aeon Tech',
    installedBy: {
      name: 'Aku cynthia',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    status: 'Good',
    isFaulty: false,
  },
  {
    id: 'part-2',
    component: 'Motherboard',
    partId: 'P-123457',
    usage: 'Universal',
    supplier: 'Aeon Tech',
    installedBy: {
      name: 'Aku cynthia',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    status: 'Good',
    isFaulty: false,
  },
  {
    id: 'part-3',
    component: 'Lock',
    partId: 'P-123458',
    usage: 'A1',
    supplier: 'CDC Tools',
    installedBy: {
      name: 'Aku cynthia',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    status: 'Good',
    isFaulty: false,
  },
  {
    id: 'part-4',
    component: 'Lock',
    partId: 'P-123459',
    usage: 'A2',
    supplier: 'CDC Tools',
    installedBy: {
      name: 'Aku cynthia',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    status: 'Good',
    isFaulty: false,
  },
  {
    id: 'part-5',
    component: 'Lock',
    partId: 'P-123460',
    usage: 'A3',
    supplier: 'CDC Tools',
    installedBy: {
      name: 'Aku cynthia',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    status: 'Good',
    isFaulty: false,
  },
];

export const modelActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'act-1',
    title: 'Part replaced',
    description: 'P-123456 Cabinet 1 Door of MyBox-123456 replaced with P-123457',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'act-2',
    title: 'Part recorded as faulty',
    description: 'P-123456 Cabinet 1 Door of MyBox-123456 marked faulty',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'act-3',
    title: 'Stock status updated',
    description: 'MyBox-123456 sold',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'act-4',
    title: 'Stock updated',
    description: 'MyBox-123456 added to stock',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

export const unitActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'uact-1',
    title: 'Unit status updated',
    description: 'Assigned → Sold',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'uact-2',
    title: 'Unit status updated',
    description: 'Available → Assigned',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'uact-3',
    title: 'Location updated',
    description: 'Unit moved to Awka',
    actor: 'Ada Chike',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'uact-4',
    title: 'Battery replaced',
    description: 'Unit battery replaced',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'uact-5',
    title: 'Unit added',
    description: 'MyBox-123456 added to MyBox-Standard...',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

export const availableBatteries = ['B-123456', 'B-123457', 'B-123458', 'B-123459'];

export interface ModelLocationBreakdownItem {
  id: string;
  location: string;
  status: 'Available' | 'Low stock' | 'Out of stock';
  noAvailable: number;
  noAssigned: number;
  noDeployed: number;
  noSold: number;
  noFaulty: number;
}

export const initialModelLocationsBreakdown: ModelLocationBreakdownItem[] = [
  {
    id: 'loc-1',
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    status: 'Available',
    noAvailable: 100,
    noAssigned: 10,
    noDeployed: 2000,
    noSold: 2000,
    noFaulty: 2,
  },
  {
    id: 'loc-2',
    location: 'Awka, Anambra',
    status: 'Low stock',
    noAvailable: 30,
    noAssigned: 0,
    noDeployed: 2000,
    noSold: 2000,
    noFaulty: 0,
  },
  {
    id: 'loc-3',
    location: 'Onitsha, Anambra',
    status: 'Out of stock',
    noAvailable: 0,
    noAssigned: 0,
    noDeployed: 2000,
    noSold: 2000,
    noFaulty: 0,
  },
];

export const modelOverviewActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'moact-1',
    title: 'Model name changed',
    description: 'MyBox-Standard → MyBox-Zero',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'moact-2',
    title: 'Amount updated',
    description: '₦300,000 → ₦150,000',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'moact-3',
    title: 'Model created',
    description: 'MyBox-Standard model created',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

export const defaultPartsList = [
  'Battery',
  'Motherboard',
  'Wheels',
  'Doors',
  'Locks',
  'Hinge',
];

export interface AccessoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  linkedBox: string;
  amount: string;
  status: 'Active' | 'Discontinue';
  noAvailable: number;
  noAssigned: number;
  noInstalled: number;
  noFaulty: number;
  image: string;
}

export interface AccessoryStockItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  linkedBox: string;
  boxMaterial?: 'Metal' | 'Wood';
  status: 'Available' | 'Low stock' | 'Out of stock';
  noAvailable: number;
  noAssigned: number;
  noInstalled: number;
  noFaulty: number;
  location: string;
  image: string;
}

export interface AccessoryCategoryItem {
  id: string;
  name: string;
  description: string;
  createdBy: {
    name: string;
    timestamp: string;
  };
  lastUpdated: {
    name: string;
    timestamp: string;
  };
  accessoriesCount: number;
}

export const initialAccessories: AccessoryItem[] = [
  {
    id: 'acc-1',
    name: 'Name of accessory',
    sku: 'MBX-789012',
    category: 'Main Module',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 100,
    noAssigned: 10,
    noInstalled: 2000,
    noFaulty: 2,
    image: '/image/box1.png',
  },
  {
    id: 'acc-2',
    name: 'Name of accessory',
    sku: 'MBX-789013',
    category: 'Extension',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 30,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
  {
    id: 'acc-3',
    name: 'Name of accessory',
    sku: 'MBX-789014',
    category: 'Locks',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 0,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
  {
    id: 'acc-4',
    name: 'Name of accessory',
    sku: 'MBX-789014',
    category: 'Camera',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 0,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
];

export const initialAccessoryStock: AccessoryStockItem[] = [
  {
    id: 'astk-1',
    name: 'Name of accessory',
    sku: 'MBX-789012',
    category: 'Main Module',
    linkedBox: 'MyBox-Premium',
    boxMaterial: 'Wood',
    status: 'Available',
    noAvailable: 100,
    noAssigned: 10,
    noInstalled: 2000,
    noFaulty: 2,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
  {
    id: 'astk-2',
    name: 'Name of accessory',
    sku: 'MBX-789013',
    category: 'Extension',
    linkedBox: 'MyBox-Premium',
    boxMaterial: 'Metal',
    status: 'Available',
    noAvailable: 30,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
  {
    id: 'astk-3',
    name: 'Name of accessory',
    sku: 'MBX-789014',
    category: 'Locks',
    linkedBox: 'MyBox-Premium',
    boxMaterial: 'Metal',
    status: 'Low stock',
    noAvailable: 0,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
  {
    id: 'astk-4',
    name: 'Name of accessory',
    sku: 'MBX-789014',
    category: 'Camera',
    linkedBox: 'MyBox-Premium',
    boxMaterial: 'Wood',
    status: 'Out of stock',
    noAvailable: 0,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
];

export const initialAccessoryCategories: AccessoryCategoryItem[] = [
  {
    id: 'acat-1',
    name: 'Main module',
    description: 'MBX-789012',
    createdBy: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    lastUpdated: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    accessoriesCount: 2,
  },
  {
    id: 'acat-2',
    name: 'Name of category',
    description: 'MBX-789013',
    createdBy: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    lastUpdated: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    accessoriesCount: 0,
  },
  {
    id: 'acat-3',
    name: 'Name of category',
    description: 'MBX-789014',
    createdBy: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    lastUpdated: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    accessoriesCount: 0,
  },
  {
    id: 'acat-4',
    name: 'Name of category',
    description: 'MBX-789014',
    createdBy: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    lastUpdated: {
      name: 'Aku Cynthia',
      timestamp: 'Jun 24, 2026 | 11:15 AM',
    },
    accessoriesCount: 0,
  },
];

export interface AccessoryUnitItem {
  id: string;
  itemId: string;
  status: 'Available' | 'Installed' | 'Sold' | 'Assigned' | 'Faulty';
  addedBy: {
    name: string;
    timestamp: string;
  };
  soldBy?: {
    name: string;
    timestamp: string;
  };
  orderId?: string;
  linkedUnit: string;
  isFaulty?: boolean;
}

export const initialAccessoryUnits: AccessoryUnitItem[] = [
  {
    id: 'aunit-1',
    itemId: 'P-123457',
    status: 'Available',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    linkedUnit: 'MyBox-123456',
  },
  {
    id: 'aunit-2',
    itemId: 'P-123458',
    status: 'Installed',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    soldBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    orderId: '#123456',
    linkedUnit: 'MyBox-123456',
  },
  {
    id: 'aunit-3',
    itemId: 'P-123459',
    status: 'Sold',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    soldBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    orderId: '#123456',
    linkedUnit: 'MyBox-123456',
  },
  {
    id: 'aunit-4',
    itemId: 'P-123450',
    status: 'Assigned',
    addedBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    soldBy: {
      name: 'James Moses',
      timestamp: 'Jun 12, 2025 | 11:15 AM',
    },
    orderId: '#123456',
    linkedUnit: 'MyBox-123456',
  },
];

export const accessoryOverviewActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'ao-act-1',
    title: 'Accessory name changed',
    description: 'Battery → Battery-Zero',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'ao-act-2',
    title: 'Amount updated',
    description: '₦300,000 → ₦150,000',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'ao-act-3',
    title: 'Accessory created',
    description: 'Battery created',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

export const accessoryUnitsActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'au-act-1',
    title: 'Stock status updated',
    description: 'P-123451 was installed on a box',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'au-act-2',
    title: 'Stock status updated',
    description: 'P-123450 was assigned to an order',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'au-act-3',
    title: 'Stock updated',
    description: 'P-123456 was added to stock',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

export const categoryDetailActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'cat-act-1',
    title: 'Category description updated',
    description: 'Old desc → New desc',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'cat-act-2',
    title: 'Category name updated',
    description: '"Main Module" → "Core Module"',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'cat-act-3',
    title: 'Accessory removed',
    description: 'Sensor Unit removed from "Main Module"',
    actor: 'Ada Chike',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'cat-act-4',
    title: 'Accessory added',
    description: 'Battery Module added to "Main Module"',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'cat-act-5',
    title: 'Category created',
    description: 'Category name',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

export interface AccessoryUnitPartItem {
  id: string;
  part: string;
  partId: string;
  supplier: string;
  installedBy: string;
  installedDate: string;
  status: 'Good' | 'Faulty';
  isFaulty: boolean;
}

export const initialAccessoryUnitParts: AccessoryUnitPartItem[] = [
  {
    id: 'aup-1',
    part: 'Battery',
    partId: 'P-123456',
    supplier: 'Axon Tech',
    installedBy: 'Aku cynthia',
    installedDate: 'Jun 12, 2025 | 11:15 AM',
    status: 'Good',
    isFaulty: false,
  },
  {
    id: 'aup-2',
    part: 'Motherboard',
    partId: 'P-123457',
    supplier: 'Agon Tech',
    installedBy: 'Aku cynthia',
    installedDate: 'Jun 12, 2025 | 11:15 AM',
    status: 'Good',
    isFaulty: false,
  },
  {
    id: 'aup-3',
    part: 'Lock',
    partId: 'P-123458',
    supplier: 'CDC Tools',
    installedBy: 'Aku cynthia',
    installedDate: 'Jun 12, 2025 | 11:15 AM',
    status: 'Good',
    isFaulty: false,
  },
];

export const accessoryUnitActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'acu-act-1',
    title: 'Assigned to order',
    description: 'Accessory assigned to Order #123789',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'acu-act-2',
    title: 'Part replaced',
    description: 'Assigned → Sold',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'acu-act-3',
    title: 'Part marked faulty',
    description: 'Lock (P-123458) was marked faulty',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'acu-act-4',
    title: 'Part added',
    description: 'Motherboard (P-123457) was added',
    actor: 'Ada Chike',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'acu-act-5',
    title: 'Part added',
    description: 'Battery (P-123456) was added',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'acu-act-6',
    title: 'Unit added',
    description: 'A-123456 added to Battery stock',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

// ==========================================
// BOX PARTS INVENTORY DATA (Images 1 - 5)
// ==========================================

export interface BoxPartItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  status: 'Active' | 'Discontinue';
  noAvailable: number;
  noInstalled: number;
  noFaulty: number;
  image: string;
}

export const initialBoxParts: BoxPartItem[] = [
  {
    id: 'bp-1',
    name: 'Name of part',
    sku: 'MBX-789012',
    category: 'Main Module',
    status: 'Active',
    noAvailable: 100,
    noInstalled: 2000,
    noFaulty: 2,
    image: '/image/box1.png',
  },
  {
    id: 'bp-2',
    name: 'Name of part',
    sku: 'MBX-789013',
    category: 'Extension',
    status: 'Active',
    noAvailable: 30,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
  {
    id: 'bp-3',
    name: 'Name of part',
    sku: 'MBX-789014',
    category: 'Locks',
    status: 'Active',
    noAvailable: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
  {
    id: 'bp-4',
    name: 'Name of part',
    sku: 'MBX-789014',
    category: 'Camera',
    status: 'Active',
    noAvailable: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
];

export interface BoxPartStockItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  status: 'Available' | 'Low stock' | 'Out of stock';
  noAvailable: number;
  noInstalled: number;
  noFaulty: number;
  location: string;
  image: string;
}

export const initialBoxPartsStock: BoxPartStockItem[] = [
  {
    id: 'bps-1',
    name: 'Name of part',
    sku: 'MBX-789012',
    category: 'Main Module',
    status: 'Available',
    noAvailable: 100,
    noInstalled: 2000,
    noFaulty: 2,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
  {
    id: 'bps-2',
    name: 'Name of part',
    sku: 'MBX-789013',
    category: 'Extension',
    status: 'Out of stock',
    noAvailable: 30,
    noInstalled: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
  {
    id: 'bps-3',
    name: 'Name of part',
    sku: 'MBX-789014',
    category: 'Locks',
    status: 'Low stock',
    noAvailable: 0,
    noInstalled: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
  {
    id: 'bps-4',
    name: 'Name of part',
    sku: 'MBX-789014',
    category: 'Camera',
    status: 'Low stock',
    noAvailable: 0,
    noInstalled: 2000,
    noFaulty: 0,
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    image: '/image/box1.png',
  },
];

export interface BoxPartCategoryItem {
  id: string;
  name: string;
  description: string;
  createdBy: { name: string; timestamp: string };
  lastUpdated: { name: string; timestamp: string };
  partsCount: number;
}

export const initialBoxPartCategories: BoxPartCategoryItem[] = [
  {
    id: 'bpc-1',
    name: 'Name of category',
    description: 'Description of category',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    partsCount: 2,
  },
  {
    id: 'bpc-2',
    name: 'Name of category',
    description: 'Description of category',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    partsCount: 2,
  },
  {
    id: 'bpc-3',
    name: 'Name of category',
    description: 'Description of category',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    partsCount: 2,
  },
  {
    id: 'bpc-4',
    name: 'Name of category',
    description: 'Description of category',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    partsCount: 2,
  },
];

export interface BoxPartSupplierItem {
  id: string;
  name: string;
  email: string;
  location: string;
  createdBy: { name: string; timestamp: string };
  lastUpdated: { name: string; timestamp: string };
  quantitySupplied: number;
}

export const initialBoxPartSuppliers: BoxPartSupplierItem[] = [
  {
    id: 'bpsup-1',
    name: 'Abc ltd',
    email: 'supply@abc.com',
    location: 'Lagos',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    quantitySupplied: 2,
  },
  {
    id: 'bpsup-2',
    name: 'Abc ltd',
    email: 'supply@abc.com',
    location: 'Lagos',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    quantitySupplied: 2,
  },
  {
    id: 'bpsup-3',
    name: 'Abc ltd',
    email: 'supply@abc.com',
    location: 'Lagos',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    quantitySupplied: 2,
  },
  {
    id: 'bpsup-4',
    name: 'Abc ltd',
    email: 'supply@abc.com',
    location: 'Lagos',
    createdBy: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    lastUpdated: { name: 'Aku Cynthia', timestamp: 'Jun 24, 2026 | 11:15 AM' },
    quantitySupplied: 2,
  },
];

// Activity History for Part Detail Overview (Image 1)
export const partOverviewActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'po-act-1',
    title: 'Part name changed',
    description: 'Battery -> Battery-Zero System',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'po-act-2',
    title: 'Part created',
    description: 'Battery created',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

// Part Stock Locations breakdown (Image 1)
export interface PartStockLocationItem {
  id: string;
  location: string;
  status: 'Available' | 'Low stock' | 'Out of stock';
  noAvailable: number;
  noInstalled: number;
  noFaulty: number;
}

export const initialPartStockLocations: PartStockLocationItem[] = [
  {
    id: 'psl-1',
    location: 'Ibariogwa Expressway, Ikeja, Lagos',
    status: 'Available',
    noAvailable: 100,
    noInstalled: 2000,
    noFaulty: 2,
  },
  {
    id: 'psl-2',
    location: 'Awka, Anambra',
    status: 'Low stock',
    noAvailable: 30,
    noInstalled: 2000,
    noFaulty: 0,
  },
  {
    id: 'psl-3',
    location: 'Onitsha, Anambra',
    status: 'Out of stock',
    noAvailable: 0,
    noInstalled: 2000,
    noFaulty: 0,
  },
];

// Part Units per Location breakdown (Image 2)
export interface PartUnitItem {
  id: string;
  itemId: string;
  serialNumber: string;
  supplierName: string;
  supplierEmail: string;
  priceBought: string;
  status: 'Available' | 'Installed' | 'Faulty' | 'Assigned' | 'Deployed';
  addedBy: {
    name: string;
    timestamp: string;
  };
  linkedBy?: {
    name: string;
    timestamp: string;
  };
  linkedUnit?: string;
  isFaulty?: boolean;
}

export const initialPartUnits: PartUnitItem[] = [
  {
    id: 'pu-1',
    itemId: 'P-123457',
    serialNumber: 'KL890233',
    supplierName: 'Abc Ltd',
    supplierEmail: 'supply@abc.com',
    priceBought: '₦150,000',
    status: 'Available',
    addedBy: { name: 'James Moses', timestamp: 'Jun 12, 2026 | 11:15 AM' },
    isFaulty: false,
  },
  {
    id: 'pu-2',
    itemId: 'P-123458',
    serialNumber: 'KL890234',
    supplierName: 'Abc Ltd',
    supplierEmail: 'supply@abc.com',
    priceBought: '₦150,000',
    status: 'Installed',
    addedBy: { name: 'James Moses', timestamp: 'Jun 12, 2026 | 11:15 AM' },
    linkedBy: { name: 'James Moses', timestamp: 'Jun 12, 2026 | 11:15 AM' },
    linkedUnit: 'NyBox-1234...',
    isFaulty: false,
  },
  {
    id: 'pu-3',
    itemId: 'P-123459',
    serialNumber: 'KL890235',
    supplierName: 'Abc Ltd',
    supplierEmail: 'supply@abc.com',
    priceBought: '₦150,000',
    status: 'Installed',
    addedBy: { name: 'James Moses', timestamp: 'Jun 12, 2026 | 11:15 AM' },
    linkedBy: { name: 'James Moses', timestamp: 'Jun 12, 2026 | 11:15 AM' },
    linkedUnit: 'NyBox-1234...',
    isFaulty: false,
  },
  {
    id: 'pu-4',
    itemId: 'P-123450',
    serialNumber: 'KL890236',
    supplierName: 'Abc Ltd',
    supplierEmail: 'supply@abc.com',
    priceBought: '₦150,000',
    status: 'Installed',
    addedBy: { name: 'James Moses', timestamp: 'Jun 12, 2026 | 11:15 AM' },
    linkedBy: { name: 'James Moses', timestamp: 'Jun 12, 2026 | 11:15 AM' },
    linkedUnit: 'NyBox-1234...',
    isFaulty: false,
  },
];

// Activity History for Part Stock Units (Image 2)
export const partStockUnitsActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'psu-act-1',
    title: 'Stock status updated',
    description: 'P-123451 was installed to A-123456',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'psu-act-2',
    title: 'Stock status updated',
    description: 'P-123450 was installed to MyBox-123456',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'psu-act-3',
    title: 'Stock updated',
    description: 'P-123456 was added to stock',
    actor: 'Aku Cynthia',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

// Category Detail Parts (Image 3)
export interface CategoryPartItem {
  id: string;
  name: string;
  suppliers: string;
  sku: string;
  status: 'Active' | 'Discontinue';
  image: string;
}

export const initialCategoryParts: CategoryPartItem[] = [
  {
    id: 'cp-1',
    name: 'Name of part',
    suppliers: 'GlobalTech Solutions, VarTech Systems',
    sku: 'MBX-789012',
    status: 'Active',
    image: '/image/box1.png',
  },
  {
    id: 'cp-2',
    name: 'Name of part',
    suppliers: 'PrimeSource Ltd, Allied Manufacturing',
    sku: 'MBX-789013',
    status: 'Active',
    image: '/image/box1.png',
  },
  {
    id: 'cp-3',
    name: 'Name of part',
    suppliers: 'Apex Industrial, PetroCorp, PrimeSource Ltd, Abc...',
    sku: 'MBX-789014',
    status: 'Active',
    image: '/image/box1.png',
  },
  {
    id: 'cp-4',
    name: 'Name of part',
    suppliers: 'Zenith Innovations',
    sku: 'MBX-789014',
    status: 'Active',
    image: '/image/box1.png',
  },
];

// Activity History for Category Detail (Image 3)
export const partCategoryActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'pca-act-1',
    title: 'Category description updated',
    description: 'Old desc -> New desc',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'pca-act-2',
    title: 'Category name updated',
    description: '"Main Module" -> "Core Module"',
    actor: 'Gwen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'pca-act-3',
    title: 'Part removed',
    description: 'Sensor Unit removed from "Main Module"',
    actor: 'Ada Chike',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'pca-act-4',
    title: 'Part added',
    description: 'Battery Module added to "Main Module"',
    actor: 'Gwen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'pca-act-5',
    title: 'Category created',
    description: 'Category name',
    actor: 'Gwen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

// Supplier Detail Parts (Image 4)
export interface SupplierPartItem {
  id: string;
  name: string;
  sku: string;
  avgAmount: string;
  totalAmount: string;
  noPurchased: number;
  noAvailable: number;
  noFaulty: number;
  image: string;
}

export const initialSupplierParts: SupplierPartItem[] = [
  {
    id: 'sp-1',
    name: 'Name of part',
    sku: 'MBX-789012',
    avgAmount: '₦150,000',
    totalAmount: '₦150,000',
    noPurchased: 100,
    noAvailable: 100,
    noFaulty: 2,
    image: '/image/box1.png',
  },
  {
    id: 'sp-2',
    name: 'Name of part',
    sku: 'MBX-789013',
    avgAmount: '₦150,000',
    totalAmount: '₦150,000',
    noPurchased: 100,
    noAvailable: 100,
    noFaulty: 2,
    image: '/image/box1.png',
  },
  {
    id: 'sp-3',
    name: 'Name of part',
    sku: 'MBX-789014',
    avgAmount: '₦150,000',
    totalAmount: '₦150,000',
    noPurchased: 100,
    noAvailable: 100,
    noFaulty: 2,
    image: '/image/box1.png',
  },
];

// Activity History for Supplier Detail (Image 4)
export const partSupplierActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'psup-act-1',
    title: 'Supplier updated',
    description: 'Email changed, abcsupply@gmail.com -> supply@abc.com',
    actor: 'System',
    role: 'Auto',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'psup-act-2',
    title: 'Supplier created',
    description: 'Category name',
    actor: 'Gwen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];
// Activity History for Part Unit Detail (Image 3)
export const partUnitActivityHistory: ActivityHistoryItem[] = [
  {
    id: 'pu-act-1',
    title: 'Linked to accessory',
    description: 'Part was linked to Battery P-123456',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
  {
    id: 'pu-act-2',
    title: 'Unit added',
    description: 'A-123456 added to Battery stock',
    actor: 'Owen Benjamin',
    role: 'Admin',
    timestamp: 'March 15, 2026 | 13:25',
  },
];

// ==========================================
// INVENTORY LOG DATA (Figma Image 4 & 5)
// ==========================================

export interface InventoryLogStatItem {
  id: string;
  title: string;
  value: string;
  change: string;
}

export const initialInventoryLogStats: InventoryLogStatItem[] = [
  {
    id: 'inv-val',
    title: 'Total Inventory Value',
    value: '₦120,000,000',
    change: '+12% today',
  },
  {
    id: 'units-stock',
    title: 'Total Units in Stock',
    value: '7,935',
    change: '+12% today',
  },
  {
    id: 'faulty-units',
    title: 'Faulty Units',
    value: '30,908',
    change: '+2% today',
  },
  {
    id: 'total-boxes',
    title: 'Total Boxes',
    value: '1,500',
    change: '+12% today',
  },
  {
    id: 'total-accessories',
    title: 'Total Accessories',
    value: '72,000',
    change: '+12% today',
  },
  {
    id: 'total-parts',
    title: 'Total Parts',
    value: '72,000',
    change: '+12% today',
  },
];

export interface InventoryAlertItem {
  id: string;
  category: 'Stock level' | 'Faulty stock';
  title: string;
  location: string;
  status: 'In progress' | 'Low stock' | 'Limited stock' | 'Out of stock';
  countText: string;
}

export const initialInventoryLogAlerts: InventoryAlertItem[] = [
  // Stock level alerts
  {
    id: 'al-1',
    category: 'Stock level',
    title: 'Battery (SKU No)',
    location: 'Abuja',
    status: 'Out of stock',
    countText: '0 left',
  },
  {
    id: 'al-2',
    category: 'Stock level',
    title: 'Camera (SKU No)',
    location: 'Abuja',
    status: 'Low stock',
    countText: '14 left',
  },
  {
    id: 'al-3',
    category: 'Stock level',
    title: 'Camera (SKU No)',
    location: 'Lagos',
    status: 'Low stock',
    countText: '15 left',
  },
  {
    id: 'al-4',
    category: 'Stock level',
    title: 'MyBox-Standard (SKU No)',
    location: 'Abuja',
    status: 'Limited stock',
    countText: '2 left',
  },
  {
    id: 'al-5',
    category: 'Stock level',
    title: 'Speaker (SKU No)',
    location: 'Port Harcourt',
    status: 'Limited stock',
    countText: '7 left',
  },
  {
    id: 'al-6',
    category: 'Stock level',
    title: 'MyBox-Standard (SKU No)',
    location: 'Lagos',
    status: 'Low stock',
    countText: '14 left',
  },
  // Faulty stock alerts
  {
    id: 'al-7',
    category: 'Faulty stock',
    title: 'Battery (SKU No)',
    location: 'Abuja',
    status: 'In progress',
    countText: '12',
  },
  {
    id: 'al-8',
    category: 'Faulty stock',
    title: 'MyBox-Standard (SKU No)',
    location: 'Abuja',
    status: 'In progress',
    countText: '3',
  },
  {
    id: 'al-9',
    category: 'Faulty stock',
    title: 'Camera (SKU No)',
    location: 'Lagos',
    status: 'In progress',
    countText: '2',
  },
  {
    id: 'al-10',
    category: 'Faulty stock',
    title: 'MyBox-Standard (SKU No)',
    location: 'Abuja',
    status: 'In progress',
    countText: '1',
  },
];

export interface InventoryLogAccessoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  linkedBox: string;
  amount: string;
  status: 'Active' | 'Discontinued';
  noAvailable: number;
  noAssigned: number;
  noInstalled: number;
  noFaulty: number;
  image: string;
}

export const initialInventoryLogAccessories: InventoryLogAccessoryItem[] = [
  {
    id: 'ila-1',
    name: 'Name of accessory',
    sku: 'S-123546',
    category: 'Main Module',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 100,
    noAssigned: 10,
    noInstalled: 2000,
    noFaulty: 2,
    image: '/image/box1.png',
  },
  {
    id: 'ila-2',
    name: 'Name of accessory',
    sku: 'S-123546',
    category: 'Extension',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 30,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
  {
    id: 'ila-3',
    name: 'Name of accessory',
    sku: 'S-123546',
    category: 'Locks',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 0,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
  {
    id: 'ila-4',
    name: 'Name of accessory',
    sku: 'S-123546',
    category: 'Camera',
    linkedBox: 'MyBox-Premium',
    amount: '₦150,000',
    status: 'Active',
    noAvailable: 0,
    noAssigned: 0,
    noInstalled: 2000,
    noFaulty: 0,
    image: '/image/box1.png',
  },
];

