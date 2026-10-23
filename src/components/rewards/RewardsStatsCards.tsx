'use client';

import React from 'react';

interface RewardsStatsCardsProps {
  isLightMode?: boolean;
}

export const RewardsStatsCards: React.FC<RewardsStatsCardsProps> = ({ isLightMode = false }) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const stats = [
    { label: 'Total Points', value: '12,000,000' },
    { label: 'Total Badges Created', value: '7,935' },
    { label: 'Total Badges Unlocked', value: '2,050' },
    { label: 'Total Referrals', value: '30,908' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        width: '100%',
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: isLightMode ? '0 1px 3px rgba(0, 0, 0, 0.05)' : 'none',
          }}
        >
          <span style={{ fontSize: '12px', color: subtextColor, fontWeight: 500 }}>
            {stat.label}
          </span>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              fontFamily: 'var(--font-outfit), sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};
