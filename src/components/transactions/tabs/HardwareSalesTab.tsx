'use client';

import React from 'react';
import { HardwareSalesFilterState } from '../modals/HardwareSalesFilterModal';

export interface HardwareSalesTransactionItem {
  id: string;
  orderId: string;
  user: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  itemSummary: string;
  totalQty: number;
  totalAmount: string;
  amountPaid: string;
  paymentStatus: 'Paid' | 'Partially paid';
  date: string;
}

const DEFAULT_HARDWARE_SALES: HardwareSalesTransactionItem[] = [
  {
    id: 'hw-1',
    orderId: '#196723',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    itemSummary: 'Box (2), Battery (1)',
    totalQty: 3,
    totalAmount: '₦300,000,000.000',
    amountPaid: '₦300,000,000.000',
    paymentStatus: 'Partially paid',
    date: 'Jun 12, 2025',
  },
  {
    id: 'hw-2',
    orderId: '#198096',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    itemSummary: 'Box (2), Battery (1)',
    totalQty: 3,
    totalAmount: '₦300,000,000.000',
    amountPaid: '₦300,000,000.000',
    paymentStatus: 'Paid',
    date: 'Jun 12, 2025',
  },
  {
    id: 'hw-3',
    orderId: '#109456',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    itemSummary: 'Box (2), Battery (1)',
    totalQty: 3,
    totalAmount: '₦300,000,000.000',
    amountPaid: '₦300,000,000.000',
    paymentStatus: 'Paid',
    date: 'Jun 12, 2025',
  },
];

interface HardwareSalesTabProps {
  searchQuery: string;
  filters: HardwareSalesFilterState;
  isLightMode?: boolean;
}

export const HardwareSalesTab: React.FC<HardwareSalesTabProps> = ({
  searchQuery,
  filters,
  isLightMode = false,
}) => {
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const filteredItems = DEFAULT_HARDWARE_SALES.filter((item) => {
    // Search query matching
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        item.orderId.toLowerCase().includes(q) ||
        item.user.name.toLowerCase().includes(q) ||
        item.user.email.toLowerCase().includes(q) ||
        item.itemSummary.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Filter matching
    if (filters.statuses && filters.statuses.length > 0) {
      if (!filters.statuses.includes(item.paymentStatus)) return false;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Hardware Sales 5 Stat Cards (Matching Image 2) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Box Sales', value: '₦ 80,000', change: '+12% today' },
          { label: 'Total Accessories sale', value: '7,935', change: '+12% today' },
          { label: 'Avg sales value', value: '₦ 2,050', change: '+4% today' },
          { label: 'Total Box Sold', value: '72', change: '+2% today' },
          { label: 'Total Accessories Sold', value: '28', change: '+2% today' },
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

      {/* 2. Hardware Sales Table Card Container (Rule 1: Pure table only) */}
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
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Item summary</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Total qty</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Total amount</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Amount paid</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Payment status</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
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
                  {/* Order ID */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor }}>
                    {item.orderId}
                  </td>

                  {/* User Avatar & Details */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#374151',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {item.user.avatar ? (
                          <img
                            src={item.user.avatar}
                            alt={item.user.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>
                            {item.user.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontWeight: 600, color: textColor }}>{item.user.name}</span>
                        <span style={{ fontSize: '11px', color: subtextColor }}>
                          {item.user.phone}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor }}>
                          {item.user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Item summary */}
                  <td style={{ padding: '16px 20px', color: textColor }}>{item.itemSummary}</td>

                  {/* Total qty */}
                  <td style={{ padding: '16px 20px', color: textColor }}>{item.totalQty}</td>

                  {/* Total amount */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap' }}>
                    {item.totalAmount}
                  </td>

                  {/* Amount paid */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap' }}>
                    {item.amountPaid}
                  </td>

                  {/* Payment status */}
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
                          item.paymentStatus === 'Paid'
                            ? 'rgba(34, 197, 94, 0.12)'
                            : 'rgba(245, 200, 66, 0.15)',
                        color: item.paymentStatus === 'Paid' ? '#22C55E' : '#F5C842',
                      }}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {item.date}
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
