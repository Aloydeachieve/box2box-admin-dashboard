'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { PromotionFilterModal, PromotionFilterState } from './PromotionFilterModal';
import { DeleteRevenueItemModal } from './DeleteRevenueItemModal';

interface PromotionDetailViewProps {
  promoId?: string;
}

export const PromotionDetailView: React.FC<PromotionDetailViewProps> = ({
  promoId = 'promo-1',
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
  const [filters, setFilters] = useState<PromotionFilterState>({
    plans: ['7 days', '1 month', '3 months', '6 months', '12 months'],
    statuses: ['Successful', 'Failed', 'Pending'],
    duration: 'Today',
  });

  // Wire Top Header Actions (Edit & Delete)
  useEffect(() => {
    setHeaderActions([
      {
        label: 'Edit',
        onClick: () =>
          router.push(`/transactions/revenue-configuration/promotions/${promoId}/edit`),
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
  }, [setHeaderActions, router, promoId]);

  // Summary Stat Cards (Matching Image 5)
  const summaryStats = [
    { label: 'Total Transactions', value: '6,000' },
    { label: 'Participating Users', value: '4,000' },
    { label: 'Total Savings', value: '₦2,000,000' },
    { label: 'Revenue Impact', value: '1,200,000' },
    { label: 'Conversion Boost', value: '+18%' },
  ];

  // Transactions list (Matching Image 5)
  const [transactions] = useState([
    {
      id: 'txn-1',
      txnId: '#196723',
      user: 'Zainab Ayoola',
      role: 'Customer',
      type: 'Booking',
      date: 'Jun 12, 2025',
      origAmount: '₦3,000',
      promoAmount: '₦300',
      finalAmount: '₦2,700',
    },
    {
      id: 'txn-2',
      txnId: '#198096',
      user: 'Chinadu Okeke',
      role: 'Rider',
      type: 'Earnings',
      date: 'Jun 12, 2025',
      origAmount: '₦500',
      promoAmount: '₦50',
      finalAmount: '₦450',
    },
    {
      id: 'txn-3',
      txnId: '#109456',
      user: 'Halima Musa',
      role: 'Customer',
      type: 'Deposit',
      date: 'Jun 12, 2025',
      origAmount: '₦30',
      promoAmount: '₦3',
      finalAmount: '₦27',
    },
    {
      id: 'txn-4',
      txnId: '#124897',
      user: 'Obinna Eze',
      role: 'Box Owner',
      type: 'Earnings',
      date: 'Jun 12, 2025',
      origAmount: '₦100',
      promoAmount: '₦10',
      finalAmount: '₦90',
    },
  ]);

  // Activity History mock entries (Matching Image 5)
  const activityItems = [
    {
      title: 'Promo updated',
      detail: 'End date changed Apr 12, 2026 → Apr 26, 2026',
      author: 'System',
      badge: 'Auto',
      date: 'March 15, 2026 | 13:25',
    },
    {
      title: 'Promo deactivated',
      detail: 'Deadline reached',
      author: 'System',
      badge: 'Auto',
      date: 'March 15, 2026 | 13:25',
    },
    {
      title: 'Promo updated',
      detail: 'Effect changed: Discount → Disable fees',
      author: 'Anthony Joshua',
      badge: 'Admin',
      date: 'March 15, 2026 | 13:25',
    },
    {
      title: 'Promo created',
      detail: '"First Booking Discount - 10%"',
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
      {/* 2-Column Responsive Layout: Left Main Column & Border-Divided Right Activity Sidebar */}
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
              gap: '12px',
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
                No fees weekend
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

            {/* Metadata Line */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: subtextColor }}>Type</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>Discount</strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Apply to</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>
                Delivery fee | Booking fee | Box fee commission
              </strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Start date</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>
                Aug 02, 2024 | 11:56 AM
              </strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>End date</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>
                Aug 02, 2024 | 11:56 AM
              </strong>
            </div>

            {/* Expiration Note */}
            <div style={{ fontSize: '12.5px', color: '#E5A83B', fontWeight: 600 }}>
              Ends in 21 days
            </div>
          </div>

          {/* Decoupled Toolbar (Rule 1: hanging cleanly above table on page background) */}
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
              Transaction history
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Search Input */}
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

          {/* 5 Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
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

          {/* Table Container Card (Rule 1: Only holds rows & batch bars) */}
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
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Txn ID</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>User</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Type</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Date</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Original amount</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Promo amount</th>
                    <th style={{ padding: '14px 20px', fontWeight: 500 }}>Final amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, index) => (
                    <tr
                      key={txn.id}
                      style={{
                        borderBottom:
                          index !== transactions.length - 1
                            ? `1px solid ${borderColor}`
                            : 'none',
                        color: textColor,
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontWeight: 500 }}>
                        {txn.txnId}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div>{txn.user}</div>
                        <div style={{ fontSize: '11px', color: subtextColor }}>
                          {txn.role}
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>{txn.type}</td>
                      <td style={{ padding: '14px 20px' }}>{txn.date}</td>
                      <td style={{ padding: '14px 20px' }}>{txn.origAmount}</td>
                      <td style={{ padding: '14px 20px' }}>{txn.promoAmount}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 600 }}>
                        {txn.finalAmount}
                      </td>
                    </tr>
                  ))}
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

      {/* Promotion Filter Modal */}
      <PromotionFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        isLightMode={isLightMode}
        initialFilters={filters}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
      />

      {/* Delete Promotion Modal */}
      <DeleteRevenueItemModal
        isOpen={isDeleteModalOpen}
        itemType="promotion"
        itemName="No fees weekend"
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
