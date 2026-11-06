'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { SubscriptionDetailsFilterModal, SubscriptionDetailsFilterState } from './SubscriptionDetailsFilterModal';
import { DeleteRevenueItemModal } from './DeleteRevenueItemModal';

interface SubscriptionPlanDetailViewProps {
  planId?: string;
}

export const SubscriptionPlanDetailView: React.FC<SubscriptionPlanDetailViewProps> = ({
  planId = 'sub-plan-1',
}) => {
  const router = useRouter();
  const { isLightMode, setHeaderActions } = useAdmin();

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  // Modals & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState<SubscriptionDetailsFilterState>({
    statuses: ['Active', 'Expired'],
    duration: 'Today',
  });

  // Top Header Actions (Edit & Delete)
  useEffect(() => {
    setHeaderActions([
      {
        label: 'Edit',
        onClick: () =>
          router.push(`/transactions/revenue-configuration/subscriptions/${planId}/edit`),
      },
      {
        label: 'Delete',
        onClick: () => setIsDeleteModalOpen(true),
        color: '#EF4444',
      },
    ]);

    return () => {
      setHeaderActions([]);
    };
  }, [setHeaderActions, router, planId]);

  // 4 Summary Stat Cards matching Image 3
  const summaryStats = [
    { label: 'Total subscribers', value: '6,000' },
    { label: 'Active Subscribers', value: '4,000' },
    { label: 'Total Revenue', value: '₦2,000,000' },
    { label: 'Renewal Rate', value: '18%' },
  ];

  // Subscribers Table Rows matching Image 3
  const [subscribers] = useState([
    {
      id: 'sub-row-1',
      subId: '#196723',
      user: 'Zainab Ayoola',
      role: 'Customer',
      startDate: 'Jun 12, 2025',
      endDate: 'Jun 12, 2025',
      status: 'Expired',
      totalBookings: '8',
      bookingsCost: '₦3,000',
      savings: '₦3,000',
    },
    {
      id: 'sub-row-2',
      subId: '#198096',
      user: 'Chinadu Okeke',
      role: 'Customer',
      startDate: 'Jun 12, 2025',
      endDate: 'Jun 12, 2025',
      status: 'Active',
      totalBookings: '5',
      bookingsCost: '₦500',
      savings: '₦500',
    },
    {
      id: 'sub-row-3',
      subId: '#109456',
      user: 'Halima Musa',
      role: 'Customer',
      startDate: 'Jun 12, 2025',
      endDate: 'Jun 12, 2025',
      status: 'Expired',
      totalBookings: '8',
      bookingsCost: '₦30',
      savings: '₦30',
    },
    {
      id: 'sub-row-4',
      subId: '#124897',
      user: 'Obinna Eze',
      role: 'Customer',
      startDate: 'Jun 12, 2025',
      endDate: 'Jun 12, 2025',
      status: 'Active',
      totalBookings: '4',
      bookingsCost: '₦100',
      savings: '₦100',
    },
  ]);

  // Activity History mock entries matching Image 3
  const activityItems = [
    {
      title: 'Subscription plan disabled',
      detail: 'Basic plan no longer available to new subscribers or renewal',
      author: 'Aku Cynthia',
      badge: 'Admin',
      date: 'March 15, 2026 | 13:25',
    },
    {
      title: 'Subscription plan created',
      detail: 'Fee changed: ₦5,000 → ₦6,800',
      author: 'Anthony Joshua',
      badge: 'Admin',
      date: 'March 15, 2026 | 13:25',
    },
    {
      title: 'Subscription plan created',
      detail: 'Basic plan – ₦6,000',
      author: 'Aku Cynthia',
      badge: 'Admin',
      date: 'March 15, 2026 | 13:25',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
    >
      {/* 2-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: '32px',
          alignItems: 'stretch',
        }}
      >
        {/* Main Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Overview Container */}
          <div
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              backgroundColor: 'transparent',
            }}
          >
            {/* Title, ID & Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  margin: 0,
                  color: textColor,
                }}
              >
                Basic plan
              </h1>
              <span style={{ fontSize: '13px', color: subtextColor }}>#19B725</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#19B725',
                  backgroundColor: 'rgba(25, 183, 37, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                Active
              </span>
            </div>

            {/* Subtitle */}
            <div style={{ fontSize: '13px', color: subtextColor, lineHeight: 1.4 }}>
              Ideal for frequent users who need multiple storage spaces with added flexibility
            </div>

            {/* Metadata Line */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                lineHeight: 1.5,
                marginTop: '4px',
              }}
            >
              <span style={{ color: subtextColor }}>Amount</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>₦5000</strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Duration</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>7 days</strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Subscribers</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>7,890</strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Date created</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>
                Aug 02, 2024 | 11:56 AM
              </strong>
            </div>
          </div>

          {/* Decoupled Toolbar (Rule 1) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '4px',
            }}
          >
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
              }}
            >
              Subscribers
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '7px 12px',
                  width: '220px',
                  backgroundColor: 'transparent',
                }}
              >
                <Search size={15} color={subtextColor} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: textColor,
                    fontSize: '13px',
                    width: '100%',
                  }}
                />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '7px 14px',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <span>Filter</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
            {summaryStats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '16px',
                  backgroundColor: 'transparent',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: subtextColor,
                    marginBottom: '8px',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: textColor,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Table Container Card (Rule 1: Only contains rows & batch actions) */}
          <div
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          >
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontSize: '13px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      color: subtextColor,
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Subscription ID</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>User</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Start date</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>End date</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Total bookings</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Bookings cost</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((row, index) => {
                    const isExpired = row.status.toLowerCase() === 'expired';
                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom:
                            index !== subscribers.length - 1
                              ? `1px solid ${borderColor}`
                              : 'none',
                          color: textColor,
                        }}
                      >
                        <td style={{ padding: '14px 20px', fontWeight: 500 }}>
                          {row.subId}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div>{row.user}</div>
                          <div style={{ fontSize: '11px', color: subtextColor }}>
                            {row.role}
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px' }}>{row.startDate}</td>
                        <td style={{ padding: '14px 20px' }}>{row.endDate}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: isExpired ? '#EF4444' : '#19B725',
                              backgroundColor: isExpired
                                ? 'rgba(239, 68, 68, 0.12)'
                                : 'rgba(25, 183, 37, 0.15)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px' }}>{row.totalBookings}</td>
                        <td style={{ padding: '14px 20px' }}>{row.bookingsCost}</td>
                        <td style={{ padding: '14px 20px', fontWeight: 600 }}>
                          {row.savings}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderTop: `1px solid ${borderColor}`,
                fontSize: '12px',
                color: subtextColor,
              }}
            >
              <span>1 - 100 of 5,000,045</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: subtextColor,
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Continuous Vertical Line & Activity History Feed */}
        <aside
          style={{
            borderLeft: `1px solid ${borderColor}`,
            paddingLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignSelf: 'stretch',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: textColor,
              paddingBottom: '4px',
            }}
          >
            Activity history
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {activityItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: textColor,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: subtextColor,
                    lineHeight: 1.4,
                  }}
                >
                  {item.detail}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '2px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>
                    {item.author}
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      color: subtextColor,
                      border: `1px solid ${borderColor}`,
                      padding: '1px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: subtextColor }}>
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Filter Modal */}
      <SubscriptionDetailsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        isLightMode={isLightMode}
        initialFilters={filters}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
      />

      {/* Delete Subscription Modal */}
      <DeleteRevenueItemModal
        isOpen={isDeleteModalOpen}
        itemType="subscription"
        itemName="Basic plan"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setTimeout(() => {
            router.push('/transactions/revenue-configuration');
          }, 2600);
        }}
        isLightMode={isLightMode}
      />
    </div>
  );
};
