'use client';

import React from 'react';
import { initialInventoryLogStats } from '@/lib/inventoryMockData';

interface InventoryLogStatsProps {
  isLightMode?: boolean;
}

export const InventoryLogStats: React.FC<InventoryLogStatsProps> = ({ isLightMode = false }) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: '12px',
        width: '100%',
      }}
      className="inventory-log-stats-grid"
    >
      {initialInventoryLogStats.map((stat) => (
        <div
          key={stat.id}
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px',
            minHeight: '88px',
          }}
        >
          <div style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
            {stat.title}
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.02em',
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#10B981',
            }}
          >
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
};
