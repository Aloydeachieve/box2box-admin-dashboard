'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { OrdersCharts } from './OrdersCharts';
import { OrdersStats } from './OrdersStats';
import { OrdersFilterModal } from './OrdersFilterModal';
import { initialOrders, OrderItem } from '@/lib/ordersMockData';
import { ToastNotification } from '@/components/common/ToastNotification';

export const OrdersView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<'orders' | 'stock'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [timePeriod, setTimePeriod] = useState('This week');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const tableHeaderBg = isLightMode ? '#F9FAFB' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const inputBg = isLightMode ? '#F3F4F6' : 'transparent';
  const yellowColor = '#F5C842';

  // Status badge styling helper
  const getPaymentStatusStyle = (status: string) => {
    switch (status) {
      case 'Complete':
        return {
          bg: isLightMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.18)',
          color: '#10B981',
        };
      case 'Refunded':
        return {
          bg: isLightMode ? 'rgba(168, 85, 247, 0.12)' : 'rgba(168, 85, 247, 0.18)',
          color: '#A855F7',
        };
      case 'Pending':
        return {
          bg: isLightMode ? 'rgba(245, 200, 66, 0.15)' : 'rgba(245, 200, 66, 0.18)',
          color: '#F5C842',
        };
      case 'Instalment due':
        return {
          bg: isLightMode ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.18)',
          color: '#EF4444',
        };
      default:
        return { bg: 'rgba(255, 255, 255, 0.08)', color: subtextColor };
    }
  };

  const getFulfillmentStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return {
          bg: isLightMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.18)',
          color: '#10B981',
        };
      case 'Partially fulfilled':
        return {
          bg: isLightMode ? 'rgba(168, 85, 247, 0.12)' : 'rgba(168, 85, 247, 0.18)',
          color: '#A855F7',
        };
      case 'Cancelled':
        return {
          bg: isLightMode ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.18)',
          color: '#EF4444',
        };
      case 'Pending':
        return {
          bg: isLightMode ? 'rgba(245, 200, 66, 0.15)' : 'rgba(245, 200, 66, 0.18)',
          color: '#F5C842',
        };
      default:
        return { bg: 'rgba(255, 255, 255, 0.08)', color: subtextColor };
    }
  };

  const filteredOrders = orders.filter((o) =>
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.buyer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.fulfillmentStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
    >
      {/* 1. TOP HEADER ROW */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Manage hardware orders
          </h1>
          <p
            style={{
              fontSize: '12px',
              color: subtextColor,
              margin: '3px 0 0 0',
            }}
          >
            Handle box sales lifecycle from purchase → delivery
          </p>
        </div>

        {/* Time period filter dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              color: textColor,
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <span>{timePeriod}</span>
            <ChevronDown size={14} color={subtextColor} />
          </button>

          {showTimeDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                width: '120px',
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '4px',
                zIndex: 30,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              }}
            >
              {['Today', 'This week', 'This month', 'All time'].map((p) => (
                <div
                  key={p}
                  onClick={() => {
                    setTimePeriod(p);
                    setShowTimeDropdown(false);
                  }}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    color: textColor,
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
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. SECTION 1: 4 CHARTS ROW */}
      <OrdersCharts isLightMode={isLightMode} />

      {/* 3. SECTION 2: 6 STAT CARDS ROW */}
      <OrdersStats isLightMode={isLightMode} />

      {/* 4. SECTION 3: TOOLBAR (Sitting cleanly on page background above table) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '6px',
        }}
      >
        {/* Tabs: Orders (4) and Stock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '14px',
              fontWeight: activeTab === 'orders' ? 700 : 500,
              color: activeTab === 'orders' ? yellowColor : subtextColor,
              cursor: 'pointer',
            }}
          >
            Orders ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stock')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '14px',
              fontWeight: activeTab === 'stock' ? 700 : 500,
              color: activeTab === 'stock' ? yellowColor : subtextColor,
              cursor: 'pointer',
            }}
          >
            Stock
          </button>
        </div>

        {/* Search & Filter Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 32px 7px 12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                color: textColor,
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <Search
              size={14}
              color={subtextColor}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: cardBg,
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

      {/* 5. SECTION 4: STANDALONE ORDERS TABLE CARD */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
        }}
      >
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              minWidth: '1000px',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: tableHeaderBg,
                  borderRadius: '8px',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Buyer</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Payment structure</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Total Price</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Total Paid</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Balance Due</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Payment Status</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Fulfillment status</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Date</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => {
                const payStyle = getPaymentStatusStyle(o.paymentStatus);
                const fulStyle = getFulfillmentStatusStyle(o.fulfillmentStatus);

                return (
                  <tr
                    key={o.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#19191D')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    {/* Order ID */}
                    <td style={{ padding: '14px 14px', fontSize: '12px', fontWeight: 600, color: textColor }}>
                      {o.orderNumber}
                    </td>

                    {/* Buyer: Avatar + Name + Phone + Email */}
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#27272A',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={o.buyer.avatar || '/image/order.svg'}
                            alt={o.buyer.name}
                            width={32}
                            height={32}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>
                            {o.buyer.name}
                          </span>
                          <span style={{ fontSize: '10px', color: subtextColor }}>
                            {o.buyer.phone}
                          </span>
                          <span style={{ fontSize: '10px', color: subtextColor }}>
                            {o.buyer.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Payment Structure */}
                    <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                      {o.paymentStructure}
                    </td>

                    {/* Total Price */}
                    <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                      {o.totalPrice}
                    </td>

                    {/* Total Paid */}
                    <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                      {o.totalPaid}
                    </td>

                    {/* Balance Due */}
                    <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                      {o.balanceDue}
                    </td>

                    {/* Payment Status Pill */}
                    <td style={{ padding: '14px 14px' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: payStyle.bg,
                          color: payStyle.color,
                          display: 'inline-block',
                        }}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>

                    {/* Fulfillment Status Pill */}
                    <td style={{ padding: '14px 14px' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: fulStyle.bg,
                          color: fulStyle.color,
                          display: 'inline-block',
                        }}
                      >
                        {o.fulfillmentStatus}
                      </span>
                    </td>

                    {/* Date */}
                    <td style={{ padding: '14px 14px', fontSize: '11.5px', color: subtextColor }}>
                      {o.date}
                    </td>

                    {/* Action: View */}
                    <td style={{ padding: '14px 14px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => router.push(`/orders/${o.id}`)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: yellowColor,
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: '4px 8px',
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Figma */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px',
            fontSize: '12px',
            color: subtextColor,
          }}
        >
          <span>1 - 100 of 5,000,045</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: subtextColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: subtextColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <OrdersFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Orders filtered successfully',
          });
        }}
      />

      {/* Toast Notification */}
      {activeToast && (
        <ToastNotification
          type={activeToast.type}
          title={activeToast.title}
          message={activeToast.message}
          isLightMode={isLightMode}
          onClose={() => setActiveToast(null)}
        />
      )}
    </div>
  );
};
