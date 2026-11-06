'use client';

import React from 'react';
import { SubscriptionsFilterState } from '../modals/SubscriptionsFilterModal';

export interface SubscriptionTransactionItem {
  id: string;
  subscriptionId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  plan: string;
  amount: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive';
}

const DEFAULT_SUBSCRIPTIONS: SubscriptionTransactionItem[] = [
  {
    id: 'sub-1',
    subscriptionId: '#196723',
    customer: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    plan: '7 days',
    amount: '₦300,000,000.000',
    startDate: 'Jun 12, 2025 | 11:55 AM',
    endDate: 'Jun 12, 2025 | 11:55 AM',
    status: 'Inactive',
  },
  {
    id: 'sub-2',
    subscriptionId: '#198096',
    customer: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    plan: '1 month',
    amount: '₦300,000,000.000',
    startDate: 'Jun 12, 2025 | 11:55 AM',
    endDate: 'Jun 12, 2025 | 11:55 AM',
    status: 'Active',
  },
  {
    id: 'sub-3',
    subscriptionId: '#109456',
    customer: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'aa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    plan: '3 months',
    amount: '₦300,000,000.000',
    startDate: 'Jun 12, 2025 | 11:55 AM',
    endDate: 'Jun 12, 2025 | 11:55 AM',
    status: 'Active',
  },
];

interface SubscriptionsTabProps {
  searchQuery: string;
  filters: SubscriptionsFilterState;
  isLightMode?: boolean;
}

export const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({
  searchQuery,
  filters,
  isLightMode = false,
}) => {
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const filteredItems = DEFAULT_SUBSCRIPTIONS.filter((item) => {
    // Search query matching
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        item.subscriptionId.toLowerCase().includes(q) ||
        item.customer.name.toLowerCase().includes(q) ||
        item.customer.email.toLowerCase().includes(q) ||
        item.plan.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Filter matching
    if (filters.statuses && filters.statuses.length > 0) {
      if (!filters.statuses.includes(item.status)) return false;
    }
    if (filters.plans && filters.plans.length > 0) {
      if (!filters.plans.includes(item.plan)) return false;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Subscriptions 5 Stat Cards (Matching Image 1) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Subscription Revenue', value: '₦ 80,000', change: '+12% today' },
          { label: 'Active Subscriptions', value: '7,935', change: '+12% today' },
          { label: 'Churn rate', value: '72%', change: '+2% today' },
          { label: 'Retention rate', value: '28%', change: '+2% today' },
          { label: 'Subscription renewal rate', value: '78%', change: '+2% today' },
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

      {/* 2. Subscriptions Table Card Container (Rule 1: Pure table only) */}
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
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Subscription ID</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Customer</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Plan</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Amount</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Start date</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>End date</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((sub) => (
                <tr
                  key={sub.id}
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
                  {/* Subscription ID */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor }}>
                    {sub.subscriptionId}
                  </td>

                  {/* Customer Avatar & Details */}
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
                        {sub.customer.avatar ? (
                          <img
                            src={sub.customer.avatar}
                            alt={sub.customer.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>
                            {sub.customer.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontWeight: 600, color: textColor }}>{sub.customer.name}</span>
                        <span style={{ fontSize: '11px', color: subtextColor }}>
                          {sub.customer.phone}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor }}>
                          {sub.customer.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Plan */}
                  <td style={{ padding: '16px 20px', color: textColor }}>{sub.plan}</td>

                  {/* Amount */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap' }}>
                    {sub.amount}
                  </td>

                  {/* Start Date */}
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {sub.startDate}
                  </td>

                  {/* End Date */}
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {sub.endDate}
                  </td>

                  {/* Status Pill Badge */}
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
                          sub.status === 'Active'
                            ? 'rgba(34, 197, 94, 0.12)'
                            : 'rgba(255, 255, 255, 0.08)',
                        color: sub.status === 'Active' ? '#22C55E' : '#9CA3AF',
                      }}
                    >
                      {sub.status}
                    </span>
                  </td>

                  {/* Action Link: View */}
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: yellowColor,
                        fontWeight: 600,
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      View
                    </button>
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
