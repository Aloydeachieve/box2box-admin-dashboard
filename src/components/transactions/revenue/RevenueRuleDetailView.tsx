'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface RevenueRuleDetailViewProps {
  ruleId?: string;
}

export const RevenueRuleDetailView: React.FC<RevenueRuleDetailViewProps> = ({ ruleId = 'rule-1' }) => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#FFFFFF' : 'transparent';

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<'User' | 'Duration'>('User');

  // Filter selections
  const userOptions = ['All', 'Customer', 'Rider', 'Box owner'];
  const [selectedUsers, setSelectedUsers] = useState<string[]>(['All']);

  const durationOptions = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];
  const [selectedDuration, setSelectedDuration] = useState('Last 7 days');

  // Activity History mock entries (Matching Image 5)
  const activityItems = [
    {
      title: 'Rule updated',
      detail: 'Fee changed: ₦500 → ₦700',
      user: 'Anthony Joshua',
      time: 'March 15, 2026 | 13:25',
      badge: 'Admin',
    },
    {
      title: 'Rule created',
      detail: '"Weekend Delivery Fee"',
      user: 'Aku Cynthia',
      time: 'March 15, 2026 | 13:25',
      badge: 'Admin',
    },
  ];

  // Summary Stat Cards (Matching Image 5)
  const summaryStats = [
    { label: 'Total Transactions Affected', value: '80,000' },
    { label: 'Revenue Generated', value: '₦500,000,000' },
    { label: 'Average Fee Per Transaction', value: '₦20' },
    { label: 'Contribution to platform revenue', value: '35%' },
  ];

  // Transaction rows (Matching Image 5)
  const [transactions] = useState([
    {
      id: 'txn-1',
      txnId: '#196723',
      user: 'Obinna Eze',
      role: 'Box Owner',
      baseAmount: '₦3,000',
      adjustment: '-₦30',
      finalAmount: '₦2,700',
      date: 'Jun 12, 2025',
    },
    {
      id: 'txn-2',
      txnId: '#196723',
      user: 'Obinna Eze',
      role: 'Box Owner',
      baseAmount: '₦3,000',
      adjustment: '-₦30',
      finalAmount: '₦2,700',
      date: 'Jun 12, 2025',
    },
    {
      id: 'txn-3',
      txnId: '#196723',
      user: 'Obinna Eze',
      role: 'Box Owner',
      baseAmount: '₦3,000',
      adjustment: '-₦30',
      finalAmount: '₦2,700',
      date: 'Jun 12, 2025',
    },
    {
      id: 'txn-4',
      txnId: '#196723',
      user: 'Obinna Eze',
      role: 'Box Owner',
      baseAmount: '₦3,000',
      adjustment: '-₦30',
      finalAmount: '₦2,700',
      date: 'Jun 12, 2025',
    },
  ]);

  // Checkbox toggle logic
  const handleUserToggle = (opt: string) => {
    if (opt === 'All') {
      if (selectedUsers.includes('All')) {
        setSelectedUsers([]);
      } else {
        setSelectedUsers(['All', 'Customer', 'Rider', 'Box owner']);
      }
      return;
    }

    let updated = selectedUsers.filter((u) => u !== 'All');
    if (updated.includes(opt)) {
      updated = updated.filter((u) => u !== opt);
    } else {
      updated.push(opt);
    }

    if (updated.length === userOptions.length - 1) {
      updated = ['All', ...updated];
    }
    setSelectedUsers(updated);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
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
        {/* ========================================================= */}
        {/* LEFT COLUMN: Top Info Card + Decoupled Stats & Table */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', minWidth: 0 }}>
          {/* 1. Top Section: Detailed Information Card (Matching Image 5) */}
          <div
            style={{
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Title Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: textColor,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Booking commission
              </h1>

              <span style={{ fontSize: '13px', color: subtextColor }}>#198725</span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#22C55E',
                  backgroundColor: 'rgba(34, 197, 94, 0.08)',
                }}
              >
                Active
              </span>
            </div>

            {/* Subtitle Description */}
            <p style={{ margin: 0, fontSize: '13px', color: subtextColor }}>
              This rule charges 10% of every box usage fee.
            </p>

            {/* Metadata Tags Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
                fontSize: '12.5px',
                paddingTop: '2px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Apply To</span>
                <span style={{ fontWeight: 600, color: textColor }}>Box usage fee</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Fee Type</span>
                <span style={{ fontWeight: 600, color: textColor }}>Percentage</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Value</span>
                <span style={{ fontWeight: 600, color: textColor }}>10%</span>
              </div>
            </div>
          </div>

          {/* 2. Decoupled Section (Strict Rule 1 Table Decoupling): */}
          {/* Toolbar hangs cleanly ABOVE stat cards and table directly on page background */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <h2
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: yellowColor,
                  margin: 0,
                }}
              >
                Transaction history
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Search Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: inputBg,
                    padding: '6px 12px',
                    minWidth: '200px',
                  }}
                >
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
                      fontSize: '12px',
                      width: '100%',
                    }}
                  />
                  <Search size={14} color={subtextColor} />
                </div>

                {/* Filter Button (Opens Type 4 Tabbed Filter Modal) */}
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: inputBg,
                    color: textColor,
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  <span>Filter</span>
                  <ChevronDown size={14} color={subtextColor} />
                </button>
              </div>
            </div>

            {/* 4 Summary Stat Cards: Hanging directly on background (Rule 1) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '14px',
              }}
            >
              {summaryStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>{stat.label}</span>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: textColor,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Standalone Table Card Container (Only encloses rows & pagination) */}
            <div
              style={{
                borderRadius: '16px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ overflowX: 'auto', width: '100%' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                      {['Txn ID', 'User', 'Base Amount', 'Adjustment', 'Final Amount', 'Date'].map(
                        (col) => (
                          <th
                            key={col}
                            style={{
                              padding: '14px 18px',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: subtextColor,
                            }}
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        style={{
                          borderBottom: `1px solid ${borderColor}`,
                          fontSize: '12.5px',
                        }}
                      >
                        <td style={{ padding: '14px 18px', fontWeight: 600, color: textColor }}>
                          {tx.txnId}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontWeight: 600, color: textColor }}>{tx.user}</span>
                            <span style={{ fontSize: '11px', color: subtextColor }}>{tx.role}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 18px', color: textColor, fontWeight: 500 }}>
                          {tx.baseAmount}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#EF4444', fontWeight: 500 }}>
                          {tx.adjustment}
                        </td>
                        <td style={{ padding: '14px 18px', color: textColor, fontWeight: 600 }}>
                          {tx.finalAmount}
                        </td>
                        <td style={{ padding: '14px 18px', color: subtextColor, fontSize: '12px' }}>
                          {tx.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '16px',
                  padding: '14px 18px',
                  borderTop: `1px solid ${borderColor}`,
                  fontSize: '12px',
                  color: subtextColor,
                }}
              >
                <span>1 - 100 of 5,000,045</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Activity History Feed (Matching Image 5) */}
        {/* ========================================================= */}
        <div
          style={{
            borderLeft: `1px solid ${borderColor}`,
            paddingLeft: '24px',
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activityItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>{item.detail}</span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>{item.user}</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>{item.time}</span>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    color: subtextColor,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: isLightMode ? '#F3F4F6' : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FILTER MODAL (Type 4 Tabbed Filter Modal, Fixed Height 440px) */}
      {/* ========================================================= */}
      {isFilterModalOpen && (
        <div
          onClick={() => setIsFilterModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 90,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '420px',
              maxWidth: '100%',
              height: '440px',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: dropdownBg,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
                Filter
              </h3>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: isLightMode ? '#F3F4F6' : 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: subtextColor,
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Hairline Divider */}
            <div style={{ height: '1px', backgroundColor: borderColor }} />

            {/* Underline Tabs: User & Duration (Rule 3 Type 4) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '0 20px',
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              {(['User', 'Duration'] as const).map((tab) => {
                const isActive = activeFilterTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilterTab(tab)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '12px 0',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? yellowColor : subtextColor,
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    {tab}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-1px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: yellowColor,
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Modal Body: Scrollable area with fixed height container (Rule 8) */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {activeFilterTab === 'User' ? (
                // User Checkbox list (Rule 8: Right-Aligned Indicators)
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {userOptions.map((opt) => {
                    const isChecked = selectedUsers.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => handleUserToggle(opt)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: textColor,
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = isLightMode
                            ? '#F9FAFB'
                            : 'rgba(255, 255, 255, 0.04)')
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                      >
                        <span>{opt}</span>

                        {/* Square Checkbox (4px radius, yellow when checked) */}
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            backgroundColor: isChecked ? yellowColor : 'transparent',
                            border: isChecked
                              ? `1.5px solid ${yellowColor}`
                              : isLightMode
                              ? '1.5px solid #D1D5DB'
                              : '1.5px solid rgba(255, 255, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Duration Radio list (Rule 8: Right-Aligned Indicators)
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {durationOptions.map((opt) => {
                    const isSelected = selectedDuration === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => setSelectedDuration(opt)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: textColor,
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = isLightMode
                            ? '#F9FAFB'
                            : 'rgba(255, 255, 255, 0.04)')
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                      >
                        <span>{opt}</span>

                        {/* Circular Radio Indicator */}
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: isSelected
                              ? `2px solid ${yellowColor}`
                              : isLightMode
                              ? '1.5px solid #D1D5DB'
                              : '1.5px solid rgba(255, 255, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isSelected && (
                            <div
                              style={{
                                width: '9px',
                                height: '9px',
                                borderRadius: '50%',
                                backgroundColor: yellowColor,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons Row */}
            <div
              style={{
                padding: '14px 20px',
                borderTop: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedUsers(['All']);
                  setSelectedDuration('Last 7 days');
                  setIsFilterModalOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                style={{
                  flex: 1,
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                }}
              >
                <span>Save</span>
                <Box2BoxPulsingBadge size={14} inverted={false} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
