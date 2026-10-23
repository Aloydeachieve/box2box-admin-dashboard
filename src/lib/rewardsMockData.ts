export interface PointRule {
  id: string;
  ruleId: string;
  title: string;
  subtitle: string;
  action: string;
  app: 'Customer' | 'Owner' | 'Rider';
  frequency: number;
  points: number;
  status: boolean;
}

export interface BadgeItem {
  id: string;
  ruleId: string;
  badgeId?: string;
  title: string;
  subtitle: string;
  action: string;
  app: 'Customer' | 'Owner' | 'Rider';
  frequencyValue: string;
  noOfPoints: number;
  usersUnlocked: number;
  status: boolean;
  name?: string;
  description?: string;
  requirement?: string;
  pointsReward?: number;
  unlockedCount?: number;
}

export interface ReferralItem {
  id: string;
  referrer: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  referred: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  userType: string;
  pointsEarned: number;
  date: string;
}

export interface HistoryItem {
  id: string;
  user: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  action: string;
  source: string;
  points: number;
  date: string;
}

export const INITIAL_POINT_RULES: PointRule[] = [
  {
    id: 'pr-1',
    ruleId: 'PTX-987654',
    title: 'Deposit bonus',
    subtitle: 'Points to earn when a new user is referred',
    action: 'Refer user',
    app: 'Customer',
    frequency: 3,
    points: 3,
    status: true,
  },
  {
    id: 'pr-2',
    ruleId: 'PTX-987654',
    title: 'Referral bonus',
    subtitle: 'Points to earn when a new user is referred',
    action: 'Book a storage',
    app: 'Owner',
    frequency: 5,
    points: 5,
    status: true,
  },
  {
    id: 'pr-3',
    ruleId: 'PTX-987664',
    title: 'Referral bonus',
    subtitle: 'Points to earn when a new user is referred',
    action: 'Send parcel',
    app: 'Rider',
    frequency: 3,
    points: 3,
    status: true,
  },
  {
    id: 'pr-4',
    ruleId: 'PTX-987664',
    title: 'Referral bonus',
    subtitle: 'Points to earn when a new user is referred',
    action: 'Complete order',
    app: 'Customer',
    frequency: 2,
    points: 2,
    status: true,
  },
  {
    id: 'pr-5',
    ruleId: 'PTX-987654',
    title: 'Referral bonus',
    subtitle: 'Points to earn when a new user is referred',
    action: 'Complete delivery',
    app: 'Owner',
    frequency: 1,
    points: 1,
    status: true,
  },
];

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'bdg-1',
    ruleId: 'BR-459201',
    title: 'Starter Badge',
    subtitle: 'Earned after completing 3 orders',
    action: 'Complete order',
    app: 'Customer',
    frequencyValue: '3',
    noOfPoints: 3,
    usersUnlocked: 30000,
    status: true,
    name: 'Starter Badge',
    description: 'Earned after completing 3 orders',
  },
  {
    id: 'bdg-2',
    ruleId: 'BR-734892',
    title: 'Leader Badge',
    subtitle: 'Earned after completing storage booking worth ₦5,000',
    action: 'Book a storage',
    app: 'Customer',
    frequencyValue: '₦5,000',
    noOfPoints: 5,
    usersUnlocked: 23451,
    status: true,
    name: 'Leader Badge',
    description: 'Earned after completing storage booking worth ₦5,000',
  },
  {
    id: 'bdg-3',
    ruleId: 'BR-239075',
    title: 'Leader Badge',
    subtitle: 'Earned after completing storage booking worth ₦5,000',
    action: 'Send parcel',
    app: 'Rider',
    frequencyValue: '3',
    noOfPoints: 3,
    usersUnlocked: 12987,
    status: true,
    name: 'Leader Badge',
    description: 'Earned after completing storage booking worth ₦5,000',
  },
  {
    id: 'bdg-4',
    ruleId: 'BR-896321',
    title: 'Leader Badge',
    subtitle: 'Earned after completing storage booking worth ₦5,000',
    action: 'Complete order',
    app: 'Customer',
    frequencyValue: '2',
    noOfPoints: 2,
    usersUnlocked: 98765,
    status: true,
    name: 'Leader Badge',
    description: 'Earned after completing storage booking worth ₦5,000',
  },
  {
    id: 'bdg-5',
    ruleId: 'BR-578139',
    title: 'Leader Badge',
    subtitle: 'Earned after completing storage booking worth ₦5,000',
    action: 'Complete delivery',
    app: 'Owner',
    frequencyValue: '1',
    noOfPoints: 1,
    usersUnlocked: 45678,
    status: true,
    name: 'Leader Badge',
    description: 'Earned after completing storage booking worth ₦5,000',
  },
];

export const INITIAL_REFERRALS: ReferralItem[] = [
  {
    id: 'ref-1',
    referrer: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08166724558',
      email: 'ac@gmail.com',
    },
    referred: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08166724558',
      email: 'ac@gmail.com',
    },
    userType: 'Booking',
    pointsEarned: 1,
    date: 'Jun 12, 2025 | 11:15 AM',
  },
];

export const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08166724558',
      email: 'ac@gmail.com',
    },
    action: 'Booking',
    source: 'Booking bonus',
    points: 1,
    date: 'Jun 12, 2025 | 11:15 AM',
  },
];
