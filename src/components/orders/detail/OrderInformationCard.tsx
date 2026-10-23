'use client';

import React from 'react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface OrderInformationCardProps {
  isLightMode?: boolean;
  orderStatus?: 'Pending' | 'Cancelled' | 'Delivered';
  onRefund?: () => void;
  onCancelOrder?: () => void;
}

export const OrderInformationCard: React.FC<OrderInformationCardProps> = ({
  isLightMode = false,
  orderStatus = 'Pending',
  onRefund,
  onCancelOrder,
}) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: '16px',
        border: `1px solid ${borderColor}`,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* 1. TOP HEADER: Title + Refund & Cancel Order */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
          Order Information
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="button"
            onClick={onRefund}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '12.5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Refund</span>
            <Box2BoxPulsingBadge size={13} inverted={false} />
          </button>

          <button
            type="button"
            onClick={onCancelOrder}
            style={{
              background: 'none',
              border: 'none',
              color: '#EF4444',
              fontWeight: 600,
              fontSize: '12.5px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            Cancel order
          </button>
        </div>
      </div>

      {/* 2. ORDER DETAILS HEADER ROW */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.02em',
            }}
          >
            128625
          </span>
          <span style={{ fontSize: '13px', color: subtextColor }}>
            #1234567879
          </span>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: '12px',
              backgroundColor: orderStatus === 'Cancelled'
                ? 'rgba(239, 68, 68, 0.15)'
                : isLightMode ? 'rgba(245, 200, 66, 0.15)' : 'rgba(245, 200, 66, 0.18)',
              color: orderStatus === 'Cancelled' ? '#EF4444' : '#F5C842',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            {orderStatus}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '12px', color: subtextColor, marginTop: '2px' }}>
          <div>
            Payment structure <span style={{ color: textColor, fontWeight: 600 }}>Instalment</span>
          </div>
          <div>
            Date <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2024 | 11:56 AM</span>
          </div>
        </div>
      </div>

      {/* SINGLE BORDER LINE DIVIDER matching Figma Image 2 */}
      <div style={{ borderTop: `1px solid ${borderColor}`, margin: '2px 0' }} />

      {/* 3. PAYMENT INFORMATION SUB-SECTION (in a straight horizontal line) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
          Payment Information
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: subtextColor }}>Total Amount</span>
            <span style={{ color: textColor, fontWeight: 700 }}>₦250</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: subtextColor }}>Amount Paid</span>
            <span style={{ color: textColor, fontWeight: 700 }}>₦250</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: subtextColor }}>Unpaid Balance</span>
            <span style={{ color: textColor, fontWeight: 700 }}>₦250</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: subtextColor }}>Next payment due date</span>
            <span style={{ color: textColor, fontWeight: 700 }}>Aug 02, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};
