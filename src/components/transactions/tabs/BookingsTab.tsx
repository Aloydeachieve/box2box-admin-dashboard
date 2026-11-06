'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/components/common/UserAvatar';
import { BookingsFilterState } from '../modals/BookingsFilterModal';

export interface BookingTransactionItem {
  id: string;
  orderId: string;
  user: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  pickup: string;
  dropoff: string;
  type: 'Storage' | 'Delivery';
  date: string;
  amount: string;
  status: 'In storage' | 'Delivered' | 'In progress' | 'Stored';
}

const DEFAULT_BOOKINGS: BookingTransactionItem[] = [
  {
    id: 'tx-1',
    orderId: '#196723',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    pickup: 'A5 9201 MyBox locker 136YR6',
    dropoff: '-',
    type: 'Storage',
    date: 'Jun 12, 2025',
    amount: '₦300,000,000',
    status: 'In storage',
  },
  {
    id: 'tx-2',
    orderId: '#198096',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    pickup: 'J3 2910 MyBox locker 90WEX7',
    dropoff: 'A5 9201 MyBox locker 136YR6',
    type: 'Delivery',
    date: 'Jun 12, 2025',
    amount: '₦300,000,000',
    status: 'Delivered',
  },
  {
    id: 'tx-3',
    orderId: '#109456',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    pickup: 'K8 7435 MyBox locker 29HYU6',
    dropoff: 'A5 9201 MyBox locker 136YR6',
    type: 'Delivery',
    date: 'Jun 12, 2025',
    amount: '₦300,000,000',
    status: 'Delivered',
  },
  {
    id: 'tx-4',
    orderId: '#109457',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    pickup: 'A5 9201 MyBox locker 136YR6',
    dropoff: '-',
    type: 'Storage',
    date: 'Jun 12, 2025',
    amount: '₦300,000,000',
    status: 'In storage',
  },
  {
    id: 'tx-5',
    orderId: '#109458',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    pickup: 'L2 1102 MyBox locker 44TRX1',
    dropoff: 'A5 9201 MyBox locker 136YR6',
    type: 'Delivery',
    date: 'Jun 11, 2025',
    amount: '₦150,000,000',
    status: 'Delivered',
  },
];

interface BookingsTabProps {
  searchQuery: string;
  filters: BookingsFilterState;
  isLightMode?: boolean;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({
  searchQuery,
  filters,
  isLightMode = false,
}) => {
  const router = useRouter();
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const filteredItems = DEFAULT_BOOKINGS.filter((tx) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        tx.orderId.toLowerCase().includes(q) ||
        tx.user.name.toLowerCase().includes(q) ||
        tx.pickup.toLowerCase().includes(q) ||
        tx.dropoff.toLowerCase().includes(q) ||
        tx.amount.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.types.length > 0 && !filters.types.includes(tx.type)) {
      return false;
    }
    if (filters.statuses.length > 0 && !filters.statuses.includes(tx.status)) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* 5 Summary Stat Cards for Bookings */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Bookings Value', value: '₦80,000', change: '+12% today' },
          { label: 'Total Bookings', value: '7,935', change: '+12% today' },
          { label: 'Avg Booking Value', value: '₦2,050', change: '+4% today' },
          { label: 'Box2Box delivery', value: '72%', change: '+2% today' },
          { label: 'Storage booking', value: '28%', change: '+2% today' },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: '12px',
              border: `1px solid ${borderColor}`,
              backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '11.5px', color: subtextColor }}>{stat.label}</span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: textColor,
                letterSpacing: '-0.01em',
              }}
            >
              {stat.value}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#22C55E' }}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div
        style={{
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12.5px',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${borderColor}`,
                  color: subtextColor,
                  fontWeight: 500,
                  fontSize: '12px',
                }}
              >
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Order ID</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>User</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Pick up</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Drop off</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Amount</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((tx) => (
                <tr
                  key={tx.id}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode
                      ? '#F9FAFB'
                      : 'rgba(255, 255, 255, 0.02)')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <td
                    onClick={() => {
                      const cleanId = tx.orderId ? tx.orderId.replace('#', '') : tx.id;
                      router.push(`/transactions/bookings/${cleanId}`);
                    }}
                    style={{
                      padding: '16px 20px',
                      fontWeight: 600,
                      color: textColor,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {tx.orderId}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <UserAvatar src={tx.user.avatar} name={tx.user.name} size={32} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontWeight: 600, color: textColor }}>{tx.user.name}</span>
                        <span style={{ fontSize: '11px', color: subtextColor }}>
                          {tx.user.phone}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor }}>
                          {tx.user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: textColor, maxWidth: '180px' }}>
                    {tx.pickup}
                  </td>
                  <td style={{ padding: '16px 20px', color: textColor, maxWidth: '180px' }}>
                    {tx.dropoff}
                  </td>
                  <td style={{ padding: '16px 20px', color: textColor }}>{tx.type}</td>
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {tx.date}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap' }}>
                    {tx.amount}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        backgroundColor:
                          tx.status === 'Delivered'
                            ? 'rgba(34, 197, 94, 0.12)'
                            : tx.status === 'In storage'
                            ? 'rgba(59, 130, 246, 0.12)'
                            : 'rgba(245, 200, 66, 0.12)',
                        color:
                          tx.status === 'Delivered'
                            ? '#22C55E'
                            : tx.status === 'In storage'
                            ? '#3B82F6'
                            : '#F5C842',
                      }}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
