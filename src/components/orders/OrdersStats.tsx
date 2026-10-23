'use client';

import React from 'react';

interface OrdersStatsProps {
  isLightMode?: boolean;
}

export const OrdersStats: React.FC<OrdersStatsProps> = ({ isLightMode = false }) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const defaultBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  // 6 cards matching Figma Image 2
  const stats = [
    {
      title: 'Total Orders',
      value: '1,235',
      change: '+0% today',
      hasActiveBorder: false,
    },
    {
      title: 'Total Orders Value',
      value: '₦500,000,000',
      change: '+0% today',
      hasActiveBorder: false,
    },
    {
      title: 'Fulfilled Orders',
      value: '1,090',
      change: '+12% today',
      hasActiveBorder: false,
    },
    {
      title: 'Returned Items',
      value: '30,908',
      change: '+2% today',
      hasActiveBorder: false,
    },
    {
      title: 'Pending Fulfillment',
      value: '7,935',
      change: '+12% today',
      hasActiveBorder: true, // Golden border matching Figma Image 2
    },
    {
      title: 'Unpaid Balance',
      value: '₦150,000',
      change: '+0% today',
      hasActiveBorder: false,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: '14px',
        width: '100%',
      }}
      className="orders-stats-grid"
    >
      {stats.map((s) => (
        <div
          key={s.title}
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: s.hasActiveBorder ? '1.5px solid #D97706' : defaultBorder,
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '105px',
            boxSizing: 'border-box',
            boxShadow: s.hasActiveBorder
              ? '0 0 15px rgba(217, 119, 6, 0.12)'
              : (isLightMode ? '0 2px 6px rgba(0, 0, 0, 0.04)' : 'none'),
          }}
        >
          <div style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
            {s.title}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: s.value.length > 8 ? '16px' : '20px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.02em',
              margin: '6px 0',
            }}
          >
            {s.value}
          </div>

          <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 600 }}>
            {s.change}
          </div>
        </div>
      ))}
    </div>
  );
};
