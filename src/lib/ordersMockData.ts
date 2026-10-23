export interface OrderItem {
  id: string;
  orderNumber: string;
  buyer: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  paymentStructure: 'Full' | 'Installment';
  totalPrice: string;
  totalPaid: string;
  balanceDue: string;
  paymentStatus: 'Complete' | 'Refunded' | 'Pending' | 'Instalment due';
  fulfillmentStatus: 'Partially fulfilled' | 'Cancelled' | 'Pending' | 'Delivered';
  date: string;
}

export const initialOrders: OrderItem[] = [
  {
    id: '128625',
    orderNumber: '#196723',
    buyer: {
      name: 'Akuagwuagw...',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: '/image/order.svg',
    },
    paymentStructure: 'Full',
    totalPrice: '₦150,000',
    totalPaid: '₦150,000',
    balanceDue: '₦150,000',
    paymentStatus: 'Complete',
    fulfillmentStatus: 'Partially fulfilled',
    date: 'Jun 12, 2025 | 11:15AM',
  },
  {
    id: '128626',
    orderNumber: '#196723',
    buyer: {
      name: 'Akuagwuagw...',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: '/image/order.svg',
    },
    paymentStructure: 'Installment',
    totalPrice: '₦150,000',
    totalPaid: '₦150,000',
    balanceDue: '₦150,000',
    paymentStatus: 'Refunded',
    fulfillmentStatus: 'Cancelled',
    date: 'Jun 12, 2025 | 11:15AM',
  },
  {
    id: '128627',
    orderNumber: '#196723',
    buyer: {
      name: 'Akuagwuagw...',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: '/image/order.svg',
    },
    paymentStructure: 'Installment',
    totalPrice: '₦150,000',
    totalPaid: '₦150,000',
    balanceDue: '₦150,000',
    paymentStatus: 'Pending',
    fulfillmentStatus: 'Pending',
    date: 'Jun 12, 2025 | 11:15AM',
  },
  {
    id: '128628',
    orderNumber: '#196723',
    buyer: {
      name: 'Akuagwuagw...',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: '/image/order.svg',
    },
    paymentStructure: 'Installment',
    totalPrice: '₦150,000',
    totalPaid: '₦150,000',
    balanceDue: '₦150,000',
    paymentStatus: 'Instalment due',
    fulfillmentStatus: 'Delivered',
    date: 'Jun 12, 2025 | 11:15AM',
  },
];

export interface OrderItemDetail {
  id: string;
  name: string;
  sku: string;
  material: string;
  inventoryId: string;
  cabinets: number;
  deliveryStatus: 'Pending' | 'Dispatched' | 'In Transit' | 'Delivered';
  image: string;
  price?: number;
}

export const initialOrderItems: OrderItemDetail[] = [
  {
    id: 'item-1',
    name: 'MyBox-Standard',
    sku: 'SKU - 12567879198',
    material: 'Wood',
    inventoryId: 'MyBox-S987654',
    cabinets: 4,
    deliveryStatus: 'In Transit',
    image: '/image/box1.png',
    price: 150000,
  },
  {
    id: 'item-2',
    name: 'Charger',
    sku: 'SKU - 12567879199',
    material: 'Plastic',
    inventoryId: '-',
    cabinets: 1,
    deliveryStatus: 'Pending',
    image: '/image/box1.png',
    price: 1500,
  },
  {
    id: 'item-3',
    name: 'MyBox-Standard',
    sku: 'SKU - 12567879200',
    material: 'Wood',
    inventoryId: 'MyBox-S987654',
    cabinets: 4,
    deliveryStatus: 'Delivered',
    image: '/image/box1.png',
    price: 150000,
  },
  {
    id: 'item-4',
    name: 'Battery',
    sku: 'SKU - 12567879201',
    material: 'Lithium',
    inventoryId: '-',
    cabinets: 1,
    deliveryStatus: 'Pending',
    image: '/image/box1.png',
    price: 1000,
  },
];

export interface PaymentScheduleItem {
  id: string;
  paymentLabel: string;
  amount: string;
  paymentSource: string;
  dueDate: string;
  paidDate: string;
  status: 'Paid' | 'Pending';
  txnId: string;
}

export const initialPaymentSchedule: PaymentScheduleItem[] = [
  {
    id: 'pay-1',
    paymentLabel: 'Payment 1 of 4',
    amount: '₦150,000',
    paymentSource: 'External',
    dueDate: 'Jun 12, 2025',
    paidDate: 'Jun 12, 2025 | 11:15 AM',
    status: 'Paid',
    txnId: '#1234567',
  },
  {
    id: 'pay-2',
    paymentLabel: 'Payment 2 of 4',
    amount: '₦150,000',
    paymentSource: '-',
    dueDate: 'Jun 12, 2025',
    paidDate: '-',
    status: 'Pending',
    txnId: '-',
  },
  {
    id: 'pay-3',
    paymentLabel: 'Payment 3 of 4',
    amount: '₦150,000',
    paymentSource: '-',
    dueDate: 'Jun 12, 2025',
    paidDate: '-',
    status: 'Pending',
    txnId: '-',
  },
  {
    id: 'pay-4',
    paymentLabel: 'Payment 4 of 4',
    amount: '₦150,000',
    paymentSource: '-',
    dueDate: 'Jun 12, 2025',
    paidDate: '-',
    status: 'Pending',
    txnId: '-',
  },
];
