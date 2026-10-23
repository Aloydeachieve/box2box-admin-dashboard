'use client';

import React from 'react';
import { initialInventoryLogAlerts } from '@/lib/inventoryMockData';

interface InventoryLogAlertsProps {
  isLightMode?: boolean;
}

export const InventoryLogAlerts: React.FC<InventoryLogAlertsProps> = ({ isLightMode = false }) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const stockLevelAlerts = initialInventoryLogAlerts.filter((a) => a.category === 'Stock level');
  const faultyStockAlerts = initialInventoryLogAlerts.filter((a) => a.category === 'Faulty stock');

  // Status badge styling helper
  // "always when 'in progress' - green, when 'low stock' - yellow, when 'limited stock' or 'out of stock' red"
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In progress':
        return '#10B981'; // Green
      case 'Low stock':
        return '#F5C842'; // Yellow
      case 'Limited stock':
      case 'Out of stock':
        return '#EF4444'; // Red
      default:
        return '#8E8E93';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        paddingLeft: '12px',
      }}
    >
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: textColor,
          margin: 0,
        }}
      >
        Alerts
      </h3>

      {/* 1. STOCK LEVEL GROUP */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: subtextColor }}>
          Stock level
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {stockLevelAlerts.map((item) => {
            const statusColor = getStatusColor(item.status);
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                {/* Left: Title, Location, and Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '11px', color: subtextColor }}>
                    {item.location}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: statusColor,
                      marginTop: '2px',
                    }}
                  >
                    {item.status}
                  </div>
                </div>

                {/* Right: Count */}
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: subtextColor,
                    whiteSpace: 'nowrap',
                    paddingTop: '2px',
                  }}
                >
                  {item.countText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. FAULTY STOCK GROUP */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: subtextColor }}>
          Faulty stock
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faultyStockAlerts.map((item) => {
            const statusColor = getStatusColor(item.status);
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                {/* Left: Title, Location, and Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '11px', color: subtextColor }}>
                    {item.location}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: statusColor,
                      marginTop: '2px',
                    }}
                  >
                    {item.status}
                  </div>
                </div>

                {/* Right: Count */}
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: subtextColor,
                    whiteSpace: 'nowrap',
                    paddingTop: '2px',
                  }}
                >
                  {item.countText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
