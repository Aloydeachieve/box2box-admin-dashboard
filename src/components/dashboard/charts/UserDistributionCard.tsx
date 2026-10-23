'use client';

import React from 'react';
import { Info } from 'lucide-react';

interface UserDistributionCardProps {
  isLightMode?: boolean;
}

export const UserDistributionCard: React.FC<UserDistributionCardProps> = ({ isLightMode = false }) => {
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
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', color: subtextColor, fontWeight: 500, marginBottom: '4px' }}>
            User distribution
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
            200,000,000
          </div>
          <div style={{ fontSize: '11px', color: isLightMode ? '#9CA3AF' : '#71717A', marginTop: '2px' }}>
            Customers, riders, box owners
          </div>
        </div>

        <button
          title="Info"
          style={{
            background: 'none',
            border: 'none',
            color: '#71717A',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Info size={16} />
        </button>
      </div>

      {/* Semi-circle Gauge Graphic matching Figma */}
      <div style={{ margin: '8px 0 4px 0', display: 'flex', justifyContent: 'center' }}>
        <svg width="240" height="115" viewBox="0 0 240 115">
          {/* Background semi-circle track */}
          <path
            d="M 25 110 A 95 95 0 0 1 215 110"
            fill="none"
            stroke={isLightMode ? '#E5E7EB' : '#202025'}
            strokeWidth="30"
          />

          {/* Left 50% segment: Deep Teal (Box owner) */}
          <path
            d="M 25 110 A 95 95 0 0 1 120 15"
            fill="none"
            stroke="#0C4A4D"
            strokeWidth="30"
          />

          {/* Top Right 25% segment: Bright Yellow (Rider) */}
          <path
            d="M 120 15 A 95 95 0 0 1 187 43"
            fill="none"
            stroke="#F5C842"
            strokeWidth="30"
          />

          {/* Bottom Right 25% segment: Bronze / Amber (Customer) */}
          <path
            d="M 187 43 A 95 95 0 0 1 215 110"
            fill="none"
            stroke="#B37D14"
            strokeWidth="30"
          />

          {/* Percentage labels inside segments */}
          <text x="68" y="72" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle">50%</text>
          <text x="156" y="40" fill="#000000" fontSize="11" fontWeight="700" textAnchor="middle">25%</text>
          <text x="195" y="82" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">25%</text>
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          fontSize: '11px',
          color: isLightMode ? '#6B7280' : '#8E8E93',
          paddingTop: '2px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0C4A4D' }} />
          <span>Box owner</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
          <span>Rider</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B37D14' }} />
          <span>Customer</span>
        </div>
      </div>
    </div>
  );
};
