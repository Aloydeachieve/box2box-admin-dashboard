'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RevenueCardProps {
  isLightMode?: boolean;
}

export const RevenueCard: React.FC<RevenueCardProps> = ({ isLightMode = false }) => {
  const [revenuePeriod, setRevenuePeriod] = useState('Monthly');
  const [showRevMenu, setShowRevMenu] = useState(false);

  const revenueBars = [
    { label: 'Mon', value: 0.65 },
    { label: 'Tue', value: 0.90 },
    { label: 'Wed', value: 0.45 },
    { label: 'Thu', value: 0.55 },
    { label: 'Fri', value: 0.98 },
  ];

  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: '16px',
        border: cardBorder,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none',
        flex: '0 0 380px',
        minWidth: '380px',
        maxWidth: '380px',
        boxSizing: 'border-box',
        height: '240px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', color: subtextColor, fontWeight: 500, marginBottom: '4px' }}>
            Revenue
          </div>
          <div
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.02em',
            }}
          >
            ₦334,657,900
          </div>
        </div>

        {/* Monthly Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRevMenu(!showRevMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: isLightMode ? '#F3F4F6' : 'transparent',
              border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.08)',
              color: isLightMode ? '#111827' : '#FFFFFF',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            <span>{revenuePeriod}</span>
            <ChevronDown size={12} color={isLightMode ? '#6B7280' : '#8E8E93'} />
          </button>
          {showRevMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                width: '100px',
                backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
                borderRadius: '6px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '4px',
                zIndex: 20,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              {['Daily', 'Weekly', 'Monthly'].map((p) => (
                <div
                  key={p}
                  onClick={() => {
                    setRevenuePeriod(p);
                    setShowRevMenu(false);
                  }}
                  style={{
                    padding: '5px 8px',
                    fontSize: '11px',
                    borderRadius: '4px',
                    color: isLightMode ? '#111827' : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2B2B30')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bar chart area */}
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-end', height: '140px', gap: '12px' }}>
        {/* Y-axis Labels: 1B, 800M, 600M, 400M, 200M, 0 from Figma */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            fontSize: '8px',
            color: isLightMode ? '#9CA3AF' : '#71717A',
            marginBottom: '20px',
          }}
        >
          <span>1B</span>
          <span>800M</span>
          <span>600M</span>
          <span>400M</span>
          <span>200M</span>
          <span>0</span>
        </div>

        {/* Bars */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '100%' }}>
          {revenueBars.map((bar) => (
            <div
              key={bar.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: `${bar.value * 100}px`,
                  backgroundColor: '#F5C842',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                }}
              />
              <span style={{ fontSize: '9px', color: isLightMode ? '#6B7280' : '#8E8E93' }}>{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
