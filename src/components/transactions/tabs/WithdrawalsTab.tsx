'use client';

import React from 'react';
import { WithdrawalsFilterState } from '../modals/WithdrawalsFilterModal';

export interface WithdrawalItem {
  id: string;
  txnId: string;
  user: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  userType: 'Box owner' | 'Rider' | 'Customer';
  amount: string;
  account: string;
  date: string;
  status: 'Pending' | 'Successful' | 'Failed';
}

const DEFAULT_WITHDRAWALS: WithdrawalItem[] = [
  {
    id: 'wth-1',
    txnId: '#196723',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    userType: 'Box owner',
    amount: '₦300,000,000,000',
    account: '0987654312 | Access Bank',
    date: 'Jun 12, 2025',
    status: 'Failed',
  },
  {
    id: 'wth-2',
    txnId: '#198096',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    userType: 'Rider',
    amount: '₦300,000,000,000',
    account: '8907134685 | GTB',
    date: 'Jun 12, 2025',
    status: 'Successful',
  },
  {
    id: 'wth-3',
    txnId: '#109456',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    userType: 'Box owner',
    amount: '₦300,000,000,000',
    account: '8907134685 | GTB',
    date: 'Jun 12, 2025',
    status: 'Successful',
  },
];

interface WithdrawalsTabProps {
  searchQuery: string;
  filters: WithdrawalsFilterState;
  isLightMode?: boolean;
}

export const WithdrawalsTab: React.FC<WithdrawalsTabProps> = ({
  searchQuery,
  filters,
  isLightMode = false,
}) => {
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const filteredItems = DEFAULT_WITHDRAWALS.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        item.txnId.toLowerCase().includes(q) ||
        item.user.name.toLowerCase().includes(q) ||
        item.user.phone.toLowerCase().includes(q) ||
        item.user.email.toLowerCase().includes(q) ||
        item.account.toLowerCase().includes(q) ||
        item.amount.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.statuses.length > 0 && !filters.statuses.includes(item.status)) {
      return false;
    }
    if (filters.userTypes.length > 0 && !filters.userTypes.includes(item.userType)) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* 5 Summary Stat Cards for Withdrawals (Figma Image 5) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Withdrawals value', value: '₦80,000', change: '+12% today' },
          { label: 'Withdrawal Requests', value: '7,935', change: '+12% today' },
          { label: 'Avg withdrawal value', value: '₦2,050', change: '+4% today' },
          { label: 'Pending Withdrawals value', value: '72,000', change: '+2% today' },
          { label: 'Pending Withdrawals', value: '28', change: '+2% today' },
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
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Txn ID</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>User</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>User type</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Amount</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Account</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
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
                  {/* Txn ID */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor }}>
                    {item.txnId}
                  </td>

                  {/* User */}
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
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      >
                        {item.user.name.charAt(0)}
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

                  {/* User type */}
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {item.userType}
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap' }}>
                    {item.amount}
                  </td>

                  {/* Account */}
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {item.account}
                  </td>

                  {/* Date */}
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {item.date}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color:
                          item.status === 'Successful'
                            ? '#22C55E'
                            : item.status === 'Pending'
                            ? '#F59E0B'
                            : '#EF4444',
                      }}
                    >
                      {item.status}
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
