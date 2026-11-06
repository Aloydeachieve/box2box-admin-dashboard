'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { DeleteRevenueItemModal } from './DeleteRevenueItemModal';

interface RevenueRuleItem {
  id: string;
  name: string;
  appliesTo: string;
  type: string;
  value: string;
  status: boolean;
}

interface PromotionItem {
  id: string;
  name: string;
  duration: string;
  appliesTo: string;
  type: string;
  value: string;
  status: boolean;
}

interface SubscriptionPlanItem {
  id: string;
  name: string;
  duration: string;
  amount: string;
  subscribers: string;
  revenue: string;
  status: boolean;
}

export const RevenueConfigurationView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#1C1C20';

  // Dropdown state for action menus (tableType-id)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Delete modal state
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    itemType: 'revenue rule' | 'promotion' | 'subscription';
    itemId: string;
    itemName: string;
  }>({
    isOpen: false,
    itemType: 'promotion',
    itemId: '',
    itemName: '',
  });

  // 1. Revenue Rules Data
  const [revenueRules, setRevenueRules] = useState<RevenueRuleItem[]>([
    {
      id: 'rule-1',
      name: 'Box fee commission',
      appliesTo: 'Box usage fee',
      type: '₦',
      value: '200',
      status: true,
    },
    {
      id: 'rule-2',
      name: 'Delivery fee commission',
      appliesTo: 'Delivery fee',
      type: '₦',
      value: '200',
      status: true,
    },
    {
      id: 'rule-3',
      name: 'Deposit fee',
      appliesTo: 'Deposit amount',
      type: '%',
      value: '7.5',
      status: true,
    },
    {
      id: 'rule-4',
      name: 'Withdrawal fee',
      appliesTo: 'Withdrawal amount',
      type: '%',
      value: '7.5',
      status: true,
    },
  ]);

  // 2. Promotions Data
  const [promotions, setPromotions] = useState<PromotionItem[]>([
    {
      id: 'promo-1',
      name: 'No fee weekend',
      duration: 'Apr 10 - Apr 12, 2026',
      appliesTo: 'Booking commission, Delivery fee, Deposit fee',
      type: 'Disable fees',
      value: '-',
      status: true,
    },
    {
      id: 'promo-2',
      name: 'Free delivery',
      duration: 'Apr 1 - Apr 2, 2026',
      appliesTo: 'Delivery fee',
      type: 'Disable fees',
      value: '-',
      status: true,
    },
    {
      id: 'promo-3',
      name: 'Box usage discount',
      duration: 'Feb 14 - Feb 24, 2026',
      appliesTo: 'Box usage fee',
      type: 'Discount',
      value: '20%',
      status: true,
    },
    {
      id: 'promo-4',
      name: 'Delivery fee discount',
      duration: 'Feb 14 - Feb 24, 2026',
      appliesTo: 'Delivery fee',
      type: 'Discount',
      value: '₦200',
      status: true,
    },
  ]);

  // 3. Subscriptions Data
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlanItem[]>([
    {
      id: 'sub-plan-1',
      name: 'Basic',
      duration: '7 days',
      amount: '₦5000',
      subscribers: '6,908',
      revenue: '₦35,000,000',
      status: true,
    },
    {
      id: 'sub-plan-2',
      name: 'Standard',
      duration: '1 month',
      amount: '₦15,000',
      subscribers: '10,678',
      revenue: '₦35,000,000',
      status: true,
    },
  ]);

  const toggleRuleStatus = (id: string) => {
    setRevenueRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: !r.status } : r))
    );
  };

  const togglePromoStatus = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p))
    );
  };

  const toggleSubStatus = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: !s.status } : s))
    );
  };

  const handleDeleteRule = (id: string) => {
    setRevenueRules((prev) => prev.filter((r) => r.id !== id));
    setActiveMenuId(null);
  };

  const handleDeletePromo = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
    setActiveMenuId(null);
  };

  const handleDeleteSub = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
      onClick={() => setActiveMenuId(null)}
    >
      {/* 2-Column Screen Sectioning: Middle Column & Clean Border-Divided Right Sidebar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '32px',
          alignItems: 'stretch',
        }}
      >
        {/* LEFT COLUMN: 3 Decoupled Tables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* ========================================================= */}
          {/* 1. REVENUE RULES TABLE */}
          {/* ========================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Decoupled Header: Title & Action Button directly on background (Rule 1 & 2) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: textColor,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Revenue rules
              </h2>

              <button
                type="button"
                onClick={() => router.push('/transactions/revenue-configuration/rules/new')}
                style={{
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                }}
              >
                <span>+ New rule</span>
                <Box2BoxPulsingBadge size={14} inverted={false} />
              </button>
            </div>

            {/* Table Card Container */}
            <div
              style={{
                borderRadius: '16px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                overflow: 'visible',
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
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Rule name</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Applies to</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Type</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Value</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500, textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueRules.map((rule, index) => {
                      const isMenuOpen = activeMenuId === `rule-${rule.id}`;
                      const isLastRows = index >= revenueRules.length - 2;
                      return (
                        <tr
                          key={rule.id}
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
                          <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor }}>
                            {rule.name}
                          </td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{rule.appliesTo}</td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{rule.type}</td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{rule.value}</td>

                          {/* Toggle Switch */}
                          <td style={{ padding: '16px 20px' }}>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRuleStatus(rule.id);
                              }}
                              style={{
                                width: '38px',
                                height: '20px',
                                borderRadius: '10px',
                                backgroundColor: rule.status
                                  ? yellowColor
                                  : isLightMode
                                  ? '#D1D5DB'
                                  : '#2A2A2E',
                                padding: '2px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: rule.status ? 'flex-end' : 'flex-start',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <div
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '50%',
                                  backgroundColor: '#FFFFFF',
                                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                                }}
                              />
                            </div>
                          </td>

                          {/* Action Column Three Dots with View / Edit / Delete */}
                          <td
                            style={{
                              padding: '16px 20px',
                              textAlign: 'right',
                              position: 'relative',
                            }}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : `rule-${rule.id}`);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: subtextColor,
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                              }}
                            >
                              <MoreVertical size={16} />
                            </button>

                            {isMenuOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  position: 'absolute',
                                  right: '20px',
                                  top: isLastRows ? 'auto' : '42px',
                                  bottom: isLastRows ? '32px' : 'auto',
                                  backgroundColor: dropdownBg,
                                  border: `1px solid ${borderColor}`,
                                  borderRadius: '8px',
                                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.45)',
                                  zIndex: 50,
                                  minWidth: '130px',
                                  padding: '4px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  textAlign: 'left',
                                }}
                              >
                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    router.push(`/transactions/revenue-configuration/rules/${rule.id}`);
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: textColor,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#F3F4F6'
                                      : 'rgba(255, 255, 255, 0.05)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Eye size={13} color={subtextColor} />
                                  <span>View</span>
                                </div>

                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    router.push(`/transactions/revenue-configuration/rules/${rule.id}/edit`);
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: textColor,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#F3F4F6'
                                      : 'rgba(255, 255, 255, 0.05)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Edit2 size={13} color={subtextColor} />
                                  <span>Edit</span>
                                </div>

                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setDeleteModalState({
                                      isOpen: true,
                                      itemType: 'revenue rule',
                                      itemId: rule.id,
                                      itemName: rule.name,
                                    });
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: '#EF4444',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#FEE2E2'
                                      : 'rgba(239, 68, 68, 0.1)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Trash2 size={13} color="#EF4444" />
                                  <span>Delete</span>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. PROMOTIONS TABLE */}
          {/* ========================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Decoupled Header: Title & Action Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: textColor,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Promotions
              </h2>

              <button
                type="button"
                onClick={() => router.push('/transactions/revenue-configuration/promotions/new')}
                style={{
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                }}
              >
                <span>+ New promo</span>
                <Box2BoxPulsingBadge size={14} inverted={false} />
              </button>
            </div>

            {/* Table Card Container */}
            <div
              style={{
                borderRadius: '16px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                overflow: 'visible',
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
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Promo name</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Duration</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Applies to</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Type</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Value</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500, textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promo, index) => {
                      const isMenuOpen = activeMenuId === `promo-${promo.id}`;
                      const isLastRows = index >= promotions.length - 2;
                      return (
                        <tr
                          key={promo.id}
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
                          <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor }}>
                            {promo.name}
                          </td>
                          <td style={{ padding: '16px 20px', color: textColor, whiteSpace: 'nowrap' }}>
                            {promo.duration}
                          </td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{promo.appliesTo}</td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{promo.type}</td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{promo.value}</td>

                          {/* Toggle Switch */}
                          <td style={{ padding: '16px 20px' }}>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePromoStatus(promo.id);
                              }}
                              style={{
                                width: '38px',
                                height: '20px',
                                borderRadius: '10px',
                                backgroundColor: promo.status
                                  ? yellowColor
                                  : isLightMode
                                  ? '#D1D5DB'
                                  : '#2A2A2E',
                                padding: '2px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: promo.status ? 'flex-end' : 'flex-start',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <div
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '50%',
                                  backgroundColor: '#FFFFFF',
                                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                                }}
                              />
                            </div>
                          </td>

                          {/* Action Column Three Dots with View / Edit / Delete */}
                          <td
                            style={{
                              padding: '16px 20px',
                              textAlign: 'right',
                              position: 'relative',
                            }}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : `promo-${promo.id}`);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: subtextColor,
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                              }}
                            >
                              <MoreVertical size={16} />
                            </button>

                            {isMenuOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  position: 'absolute',
                                  right: '20px',
                                  top: isLastRows ? 'auto' : '42px',
                                  bottom: isLastRows ? '32px' : 'auto',
                                  backgroundColor: dropdownBg,
                                  border: `1px solid ${borderColor}`,
                                  borderRadius: '8px',
                                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.45)',
                                  zIndex: 50,
                                  minWidth: '130px',
                                  padding: '4px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  textAlign: 'left',
                                }}
                              >
                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    router.push(`/transactions/revenue-configuration/promotions/${promo.id}`);
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: textColor,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#F3F4F6'
                                      : 'rgba(255, 255, 255, 0.05)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Eye size={13} color={subtextColor} />
                                  <span>View</span>
                                </div>

                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    router.push(`/transactions/revenue-configuration/promotions/${promo.id}/edit`);
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: textColor,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#F3F4F6'
                                      : 'rgba(255, 255, 255, 0.05)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Edit2 size={13} color={subtextColor} />
                                  <span>Edit</span>
                                </div>

                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setDeleteModalState({
                                      isOpen: true,
                                      itemType: 'promotion',
                                      itemId: promo.id,
                                      itemName: promo.name,
                                    });
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: '#EF4444',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#FEE2E2'
                                      : 'rgba(239, 68, 68, 0.1)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Trash2 size={13} color="#EF4444" />
                                  <span>Delete</span>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. SUBSCRIPTIONS TABLE */}
          {/* ========================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Decoupled Header: Title & Action Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: textColor,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Subscriptions
              </h2>

              <button
                type="button"
                onClick={() => router.push('/transactions/revenue-configuration/subscriptions/new')}
                style={{
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                }}
              >
                <span>+ New plan</span>
                <Box2BoxPulsingBadge size={14} inverted={false} />
              </button>
            </div>

            {/* Table Card Container */}
            <div
              style={{
                borderRadius: '16px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                overflow: 'visible',
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
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Subscription name</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Duration</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Amount</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Subscribers</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Revenue</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
                      <th style={{ padding: '16px 20px', fontWeight: 500, textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub, index) => {
                      const isMenuOpen = activeMenuId === `sub-${sub.id}`;
                      const isLastRows = index >= subscriptions.length - 2;
                      return (
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
                          <td style={{ padding: '16px 20px', fontWeight: 600, color: textColor }}>
                            {sub.name}
                          </td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{sub.duration}</td>
                          <td style={{ padding: '16px 20px', color: textColor, fontWeight: 600 }}>
                            {sub.amount}
                          </td>
                          <td style={{ padding: '16px 20px', color: textColor }}>{sub.subscribers}</td>
                          <td style={{ padding: '16px 20px', color: textColor, fontWeight: 600 }}>
                            {sub.revenue}
                          </td>

                          {/* Toggle Switch */}
                          <td style={{ padding: '16px 20px' }}>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubStatus(sub.id);
                              }}
                              style={{
                                width: '38px',
                                height: '20px',
                                borderRadius: '10px',
                                backgroundColor: sub.status
                                  ? yellowColor
                                  : isLightMode
                                  ? '#D1D5DB'
                                  : '#2A2A2E',
                                padding: '2px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: sub.status ? 'flex-end' : 'flex-start',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <div
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '50%',
                                  backgroundColor: '#FFFFFF',
                                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                                }}
                              />
                            </div>
                          </td>

                          {/* Action Column Three Dots with View / Edit / Delete */}
                          <td
                            style={{
                              padding: '16px 20px',
                              textAlign: 'right',
                              position: 'relative',
                            }}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : `sub-${sub.id}`);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: subtextColor,
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                              }}
                            >
                              <MoreVertical size={16} />
                            </button>

                            {isMenuOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  position: 'absolute',
                                  right: '20px',
                                  top: isLastRows ? 'auto' : '42px',
                                  bottom: isLastRows ? '32px' : 'auto',
                                  backgroundColor: dropdownBg,
                                  border: `1px solid ${borderColor}`,
                                  borderRadius: '8px',
                                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.45)',
                                  zIndex: 50,
                                  minWidth: '130px',
                                  padding: '4px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  textAlign: 'left',
                                }}
                              >
                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    router.push(`/transactions/revenue-configuration/subscriptions/${sub.id}`);
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: textColor,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#F3F4F6'
                                      : 'rgba(255, 255, 255, 0.05)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Eye size={13} color={subtextColor} />
                                  <span>View</span>
                                </div>

                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    router.push(`/transactions/revenue-configuration/subscriptions/${sub.id}/edit`);
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: textColor,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#F3F4F6'
                                      : 'rgba(255, 255, 255, 0.05)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Edit2 size={13} color={subtextColor} />
                                  <span>Edit</span>
                                </div>

                                <div
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setDeleteModalState({
                                      isOpen: true,
                                      itemType: 'subscription',
                                      itemId: sub.id,
                                      itemName: sub.name,
                                    });
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '12px',
                                    color: '#EF4444',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderRadius: '6px',
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = isLightMode
                                      ? '#FEE2E2'
                                      : 'rgba(239, 68, 68, 0.1)')
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.backgroundColor = 'transparent')
                                  }
                                >
                                  <Trash2 size={13} color="#EF4444" />
                                  <span>Delete</span>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Natural border-divided column (straight 1px line top-to-bottom, no card wrapper) */}
        <div
          style={{
            borderLeft: `1px solid ${borderColor}`,
            paddingLeft: '28px',
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Header Row: Functions as interactive button to open full activity history */}
          <div
            onClick={() => router.push('/transactions/revenue-configuration/activity')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                router.push('/transactions/revenue-configuration/activity');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              padding: '6px 8px',
              margin: '0 -8px',
              borderRadius: '8px',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = isLightMode
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.04)')
            }
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
              }}
            >
              Activity history
            </h3>

            <span
              style={{
                color: subtextColor,
                fontSize: '12.5px',
                fontWeight: 500,
              }}
            >
              See more
            </span>
          </div>

          {/* Activity items directly on page background */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Group 1: June 03, 2025 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: '-0.01em',
                }}
              >
                June 03, 2025
              </span>

              {/* Item 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Subscription created
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Basic plan</span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Uche Oduah</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
                </div>
              </div>

              {/* Item 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Promotion started
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Black friday</span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>System</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Auto</span>
                </div>
              </div>

              {/* Item 3 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Promotion created
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Weekend discount</span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Blessing Abang</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
                </div>
              </div>

              {/* Item 4 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Revenue rule created
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>
                    Delivery fee commission
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Anthony Joshua</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
                </div>
              </div>
            </div>

            {/* Group 2: June 02, 2025 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: '-0.01em',
                }}
              >
                June 02, 2025
              </span>

              {/* Item 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Subscription created
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Basic plan</span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Uche Oduah</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
                </div>
              </div>

              {/* Item 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Promotion started
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Black friday</span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>System</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Auto</span>
                </div>
              </div>

              {/* Item 3 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Promotion created
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Weekend discount</span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Blessing Abang</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
                </div>
              </div>

              {/* Item 4 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Revenue rule created
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>
                    Delivery fee commission
                  </span>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>Anthony Joshua</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation & Success Modal */}
      <DeleteRevenueItemModal
        isOpen={deleteModalState.isOpen}
        itemType={deleteModalState.itemType}
        itemName={deleteModalState.itemName}
        onClose={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={() => {
          if (deleteModalState.itemType === 'revenue rule') {
            handleDeleteRule(deleteModalState.itemId);
          } else if (deleteModalState.itemType === 'promotion') {
            handleDeletePromo(deleteModalState.itemId);
          } else if (deleteModalState.itemType === 'subscription') {
            handleDeleteSub(deleteModalState.itemId);
          }
        }}
        isLightMode={isLightMode}
      />
    </div>
  );
};
