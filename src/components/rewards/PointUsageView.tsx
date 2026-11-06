'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectFeeModal } from './modals/SelectFeeModal';
import { PointUsageFilterModal } from './PointUsageFilterModal';

interface UsageBreakdownRow {
  id: string;
  feeType: string;
  totalPointsUsed: string;
  nairaValue: string;
  percentOfTotal: string;
  app: string;
}

interface UsageHistoryRow {
  id: string;
  txnId: string;
  userName: string;
  userEmail: string;
  feeType: string;
  pointsUsed: string;
  nairaValue: string;
  date: string;
  app: string;
}

const INITIAL_BREAKDOWN: UsageBreakdownRow[] = [
  {
    id: 'b-1',
    feeType: 'Withdrawal fee',
    totalPointsUsed: '300,000',
    nairaValue: '₦15,000',
    percentOfTotal: '15%',
    app: 'Rider',
  },
  {
    id: 'b-2',
    feeType: 'Deposit fee',
    totalPointsUsed: '120',
    nairaValue: '₦10',
    percentOfTotal: '85%',
    app: 'Customer',
  },
];

const INITIAL_HISTORY: UsageHistoryRow[] = [
  {
    id: 'h-1',
    txnId: '#196723',
    userName: 'Zainab Ayoola',
    userEmail: 'za@gmail.com',
    feeType: 'Withdrawal fee',
    pointsUsed: '300,000',
    nairaValue: '₦15,000',
    date: 'Jun 12, 2025 | 11:24 AM',
    app: 'Rider',
  },
  {
    id: 'h-2',
    txnId: '#196723',
    userName: 'Zainab Ayoola',
    userEmail: 'za@gmail.com',
    feeType: 'Deposit fee',
    pointsUsed: '120',
    nairaValue: '₦10',
    date: 'Jun 12, 2025 | 11:24 AM',
    app: 'Customer',
  },
];

export const PointUsageView: React.FC = () => {
  const { isLightMode } = useAdmin();

  // Top Configuration State
  const [isRedemptionActive, setIsRedemptionActive] = useState(true);
  const [pointsPerNaira, setPointsPerNaira] = useState('1');
  const [selectedFees, setSelectedFees] = useState<string[]>([
    'Box usage fee',
    'Delivery fee',
    'Deposit fee',
  ]);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);

  // Table Tabs & Filters State
  const [activeTableTab, setActiveTableTab] = useState<'breakdown' | 'history'>('breakdown');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('This week');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);

  // Breakdown Filter State
  const [breakdownFilters, setBreakdownFilters] = useState<{
    apps: string[];
    fees: string[];
  }>({
    apps: ['Owner app', 'Customer app', 'Rider app'],
    fees: ['Booking fee', 'Delivery fee', 'Deposit fee'],
  });

  // History Filter State
  const [historyFilters, setHistoryFilters] = useState<{
    apps: string[];
    fees: string[];
    duration?: string;
  }>({
    apps: ['Owner app', 'Customer app', 'Rider app'],
    fees: ['Booking fee', 'Delivery fee', 'Deposit fee'],
    duration: 'Last 30 days',
  });

  // Toast Notification State
  const [toast, setToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Color tokens adhering to Zero Extra Contrast Rule (natural page dark background, no elevated gray)
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const greenColor = '#22C55E';

  const handleUpdateSettings = () => {
    setToast({
      type: 'success',
      title: 'Settings Updated',
      message: 'Redemption configuration updated successfully',
    });
  };

  const filteredBreakdown = INITIAL_BREAKDOWN.filter((row) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!row.feeType.toLowerCase().includes(q) && !row.app.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const filteredHistory = INITIAL_HISTORY.filter((row) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !row.txnId.toLowerCase().includes(q) &&
        !row.userName.toLowerCase().includes(q) &&
        !row.feeType.toLowerCase().includes(q) &&
        !row.app.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '28px',
        width: '100%',
        alignItems: 'flex-start',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
    >
      {/* ========================================================================= */}
      {/* MAIN LEFT COLUMN: Header, Redemption Config, Usage Analytics, & Table    */}
      {/* ========================================================================= */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        {/* 1. Header Area: Manage points usage */}
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 4px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Manage points usage
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: subtextColor,
              margin: 0,
            }}
          >
            Configure how points are valued and can be used
          </p>
        </div>

        {/* 2. Redemption Configuration Card (Zero Extra Contrast: transparent/natural page background) */}
        <div
          style={{
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Card Header with Status Toggle Switch */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
              Redemption configuration
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: subtextColor }}>Status</span>
              <div
                onClick={() => setIsRedemptionActive(!isRedemptionActive)}
                style={{
                  width: '38px',
                  height: '22px',
                  borderRadius: '12px',
                  backgroundColor: isRedemptionActive ? yellowColor : isLightMode ? '#D1D5DB' : '#27272A',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    top: '3px',
                    left: isRedemptionActive ? '19px' : '3px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Inputs Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: '16px',
            }}
          >
            {/* How many points equal N1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <span style={{ fontSize: '11px', color: subtextColor }}>
                  How many points equal ₦1
                </span>
                <input
                  type="text"
                  value={pointsPerNaira}
                  onChange={(e) => setPointsPerNaira(e.target.value)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: textColor,
                    fontSize: '14px',
                    fontWeight: 600,
                    outline: 'none',
                    padding: 0,
                  }}
                />
              </div>
              <span style={{ fontSize: '11px', color: subtextColor, paddingLeft: '2px' }}>
                {pointsPerNaira || '1'}Bpts = ₦1
              </span>
            </div>

            {/* Where can points be used (Triggers SelectFeeModal) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setIsFeeModalOpen(true)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    Where can points be used
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: textColor,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {selectedFees.length === 4 ? 'All fees' : selectedFees.join(', ')}
                  </span>
                </div>
                <ChevronDown size={16} color={subtextColor} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </div>
            </div>
          </div>

          {/* Update Settings Yellow Action Button with Box2BoxPulsingBadge */}
          <div>
            <button
              type="button"
              onClick={handleUpdateSettings}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                backgroundColor: yellowColor,
                color: '#000000',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Update settings</span>
              <Box2BoxPulsingBadge size={14} inverted={false} />
            </button>
          </div>
        </div>

        {/* 3. Usage Analytics Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: textColor,
                  margin: '0 0 2px 0',
                }}
              >
                Usage Analytics
              </h2>
              <span style={{ fontSize: '12.5px', color: subtextColor }}>
                Track how points are used
              </span>
            </div>

            {/* Time Filter Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>{selectedPeriod}</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>

              {isPeriodDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    width: '130px',
                    backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    padding: '4px',
                    zIndex: 30,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {['Today', 'This week', 'This month', 'This year'].map((period) => (
                    <div
                      key={period}
                      onClick={() => {
                        setSelectedPeriod(period);
                        setIsPeriodDropdownOpen(false);
                      }}
                      style={{
                        padding: '8px 10px',
                        fontSize: '12px',
                        color: selectedPeriod === period ? yellowColor : textColor,
                        cursor: 'pointer',
                        borderRadius: '6px',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {period}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 5 Stat Cards (Zero Extra Contrast: transparent background + 1px subtle border) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '12px',
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                padding: '16px 16px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor, lineHeight: '14px' }}>
                Total Points Redeemed
              </span>
              <span style={{ fontSize: '17px', fontWeight: 700, color: textColor }}>8,980</span>
              <span style={{ fontSize: '11px', color: greenColor, fontWeight: 500 }}>+12% today</span>
            </div>

            {/* Card 2 */}
            <div
              style={{
                padding: '16px 16px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor, lineHeight: '14px' }}>
                Redeemed Points Value
              </span>
              <span style={{ fontSize: '17px', fontWeight: 700, color: textColor }}>₦2,050</span>
              <span style={{ fontSize: '11px', color: greenColor, fontWeight: 500 }}>+4% today</span>
            </div>

            {/* Card 3 */}
            <div
              style={{
                padding: '16px 16px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor, lineHeight: '14px' }}>
                Total Unredeemed Points
              </span>
              <span style={{ fontSize: '17px', fontWeight: 700, color: textColor }}>160,000</span>
              <span style={{ fontSize: '11px', color: greenColor, fontWeight: 500 }}>+2% today</span>
            </div>

            {/* Card 4 */}
            <div
              style={{
                padding: '16px 16px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor, lineHeight: '14px' }}>
                Unredeemed Points Value
              </span>
              <span style={{ fontSize: '17px', fontWeight: 700, color: textColor }}>₦890</span>
              <span style={{ fontSize: '11px', color: greenColor, fontWeight: 500 }}>+2% today</span>
            </div>

            {/* Card 5 */}
            <div
              style={{
                padding: '16px 16px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor, lineHeight: '14px' }}>
                Transactions Using Points
              </span>
              <span style={{ fontSize: '17px', fontWeight: 700, color: textColor }}>16,000</span>
              <span style={{ fontSize: '11px', color: greenColor, fontWeight: 500 }}>+2% today</span>
            </div>
          </div>
        </div>

        {/* 4. Decoupled Table Section (Table Decoupling Rule) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Decoupled Toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {/* Left Table Tabs: Usage breakdown vs History */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                type="button"
                onClick={() => setActiveTableTab('breakdown')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  fontSize: '13.5px',
                  fontWeight: activeTableTab === 'breakdown' ? 700 : 500,
                  color: activeTableTab === 'breakdown' ? yellowColor : subtextColor,
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                }}
              >
                Usage breakdown
              </button>

              <button
                type="button"
                onClick={() => setActiveTableTab('history')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  fontSize: '13.5px',
                  fontWeight: activeTableTab === 'history' ? 700 : 500,
                  color: activeTableTab === 'history' ? yellowColor : subtextColor,
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                }}
              >
                History
              </button>
            </div>

            {/* Right Toolbar: Search & Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Search Input */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  width: '210px',
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: textColor,
                    fontSize: '12.5px',
                    outline: 'none',
                    width: '100%',
                  }}
                />
                <Search size={15} color={subtextColor} />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '12.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>Filter</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>
            </div>
          </div>

          {/* Table Container Card (Zero Extra Contrast Rule) */}
          <div
            style={{
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
              overflow: 'hidden',
            }}
          >
            {activeTableTab === 'breakdown' ? (
              /* TAB 1: Usage Breakdown Table */
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
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Fee type</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Total points used</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Naira value</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>% of total usage</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>App</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBreakdown.map((row) => (
                      <tr
                        key={row.id}
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
                        <td style={{ padding: '18px 24px', fontWeight: 600, color: textColor }}>
                          {row.feeType}
                        </td>
                        <td style={{ padding: '18px 24px', color: textColor }}>
                          {row.totalPointsUsed}
                        </td>
                        <td style={{ padding: '18px 24px', color: textColor }}>
                          {row.nairaValue}
                        </td>
                        <td style={{ padding: '18px 24px', color: textColor }}>
                          {row.percentOfTotal}
                        </td>
                        <td style={{ padding: '18px 24px', color: textColor }}>
                          {row.app}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* TAB 2: History Table */
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
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Txn ID</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>User</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Fee type</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Points used</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Naira Value</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>Date</th>
                      <th style={{ padding: '16px 24px', fontWeight: 500 }}>App</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((row) => (
                      <tr
                        key={row.id}
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
                        <td style={{ padding: '16px 24px', color: textColor }}>
                          {row.txnId}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600, color: textColor }}>{row.userName}</span>
                            <span style={{ fontSize: '11px', color: subtextColor }}>{row.userEmail}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', color: textColor }}>
                          {row.feeType}
                        </td>
                        <td style={{ padding: '16px 24px', color: textColor }}>
                          {row.pointsUsed}
                        </td>
                        <td style={{ padding: '16px 24px', color: textColor }}>
                          {row.nairaValue}
                        </td>
                        <td style={{ padding: '16px 24px', color: subtextColor }}>
                          {row.date}
                        </td>
                        <td style={{ padding: '16px 24px', color: textColor }}>
                          {row.app}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table Footer: Pagination */}
            <div
              style={{
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '16px',
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
                    padding: '2px',
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
                    color: subtextColor,
                    cursor: 'pointer',
                    padding: '2px',
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
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDEBAR PANEL: Activity History with Full-Height Dividing Border     */}
      {/* ========================================================================= */}
      <div
        style={{
          width: '260px',
          flexShrink: 0,
          paddingLeft: '24px',
          borderLeft: `1px solid ${borderColor}`,
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          paddingTop: '6px',
        }}
      >
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
          }}
        >
          Activity history
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Activity Item 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                Redemption status updated
              </span>
              <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
            </div>
            <span style={{ fontSize: '11.5px', color: subtextColor }}>
              Points redemption turned off
            </span>
            <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: subtextColor, marginTop: '1px' }}>
              <span>Uche Ejiaffor</span>
              <span>•</span>
              <span>March 15, 2026 | 13:25</span>
            </div>
          </div>

          {/* Activity Item 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                Affected fee updated
              </span>
              <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
            </div>
            <span style={{ fontSize: '11.5px', color: subtextColor }}>
              Box usage fee removed
            </span>
            <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: subtextColor, marginTop: '1px' }}>
              <span>Aku Cynthia</span>
              <span>•</span>
              <span>March 15, 2026 | 13:25</span>
            </div>
          </div>

          {/* Activity Item 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                Points value changed
              </span>
              <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
            </div>
            <span style={{ fontSize: '11.5px', color: subtextColor }}>
              1 → 30
            </span>
            <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: subtextColor, marginTop: '1px' }}>
              <span>Aku Cynthia</span>
              <span>•</span>
              <span>March 15, 2026 | 13:25</span>
            </div>
          </div>
        </div>
      </div>

      {/* Select Fee Modal (Type 1 Modal for Redemption Configuration) */}
      <SelectFeeModal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        isLightMode={isLightMode}
        selectedFees={selectedFees}
        onSelectFees={(fees) => setSelectedFees(fees)}
      />

      {/* Filter Modal (Supports 2-tab Breakdown & 3-tab History) */}
      <PointUsageFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        isLightMode={isLightMode}
        mode={activeTableTab}
        initialFilters={activeTableTab === 'breakdown' ? breakdownFilters : historyFilters}
        onApplyFilters={(filters) => {
          if (activeTableTab === 'breakdown') {
            setBreakdownFilters({ apps: filters.apps, fees: filters.fees });
          } else {
            setHistoryFilters({
              apps: filters.apps,
              fees: filters.fees,
              duration: filters.duration,
            });
          }
        }}
      />

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          isLightMode={isLightMode}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
