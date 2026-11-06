'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/components/common/UserAvatar';
import { EarningsFilterState } from '../modals/EarningsFilterModal';

export interface EarningItem {
  id: string;
  user: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  userType: 'Box owner' | 'Rider';
  totalEarnings: string;
  totalJobs: number;
  avgPerJob: string;
  firstActivity: string;
  lastActivity: string;
  status: 'Active' | 'Inactive';
}

const DEFAULT_EARNINGS: EarningItem[] = [
  {
    id: 'earn-1',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    userType: 'Box owner',
    totalEarnings: '₦300,000,000,000',
    totalJobs: 134,
    avgPerJob: '₦500',
    firstActivity: 'Jun 12, 2025',
    lastActivity: '3h ago',
    status: 'Inactive',
  },
  {
    id: 'earn-2',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    userType: 'Rider',
    totalEarnings: '₦300,000,000,000',
    totalJobs: 329,
    avgPerJob: '₦1,200',
    firstActivity: 'Jun 12, 2025',
    lastActivity: '6h ago',
    status: 'Active',
  },
  {
    id: 'earn-3',
    user: {
      name: 'Akuagwuagwu Mmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
    },
    userType: 'Box owner',
    totalEarnings: '₦300,000,000,000',
    totalJobs: 287,
    avgPerJob: '₦500',
    firstActivity: 'Jun 12, 2025',
    lastActivity: '6h ago',
    status: 'Active',
  },
];

interface EarningsTabProps {
  searchQuery: string;
  filters: EarningsFilterState;
  isLightMode?: boolean;
  onViewItem?: (item: EarningItem) => void;
}

export const EarningsTab: React.FC<EarningsTabProps> = ({
  searchQuery,
  filters,
  isLightMode = false,
  onViewItem,
}) => {
  const router = useRouter();
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const filteredItems = DEFAULT_EARNINGS.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        item.user.name.toLowerCase().includes(q) ||
        item.user.phone.toLowerCase().includes(q) ||
        item.user.email.toLowerCase().includes(q) ||
        item.userType.toLowerCase().includes(q) ||
        item.totalEarnings.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.statuses.length > 0 && !filters.statuses.includes(item.status)) {
      return false;
    }
    if (filters.types.length > 0 && !filters.types.includes(item.userType)) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* 5 Summary Stat Cards for Earnings (Figma Image 3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Earnings', value: '₦80,000', change: '+12% today' },
          { label: 'Avg Earnings Value', value: '₦7,935', change: '+12% today' },
          { label: 'Rider Earnings', value: '70%', change: '+2% today' },
          { label: 'Box Owner Earnings', value: '28%', change: '+2% today' },
          { label: 'Earnings growth', value: '28%', change: '+2% today' },
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
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>User</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>User type</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Total Earnings</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Total jobs</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Avg. per job</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>First activity</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Last activity</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '16px 20px', fontWeight: 500 }}>Action</th>
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
                  {/* User */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <UserAvatar src={item.user.avatar} name={item.user.name} size={32} />
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

                  {/* Total Earnings */}
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap' }}>
                    {item.totalEarnings}
                  </td>

                  {/* Total jobs */}
                  <td style={{ padding: '16px 20px', color: textColor }}>
                    {item.totalJobs}
                  </td>

                  {/* Avg. per job */}
                  <td style={{ padding: '16px 20px', color: textColor }}>
                    {item.avgPerJob}
                  </td>

                  {/* First activity */}
                  <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                    {item.firstActivity}
                  </td>

                  {/* Last activity */}
                  <td style={{ padding: '16px 20px', color: subtextColor, whiteSpace: 'nowrap' }}>
                    {item.lastActivity}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: item.status === 'Active' ? '#22C55E' : subtextColor,
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action: View */}
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (onViewItem) {
                          onViewItem(item);
                        } else {
                          router.push(`/transactions/${item.id}?type=earning`);
                        }
                      }}
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
