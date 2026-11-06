'use client';

import React from 'react';
import { Info } from 'lucide-react';

interface UserDistributionCardProps {
  isLightMode?: boolean;
  onOpenInfo?: () => void;
}

export const UserDistributionCard: React.FC<UserDistributionCardProps> = ({
  isLightMode = false,
  onOpenInfo,
}) => {
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
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none',
        flex: '0 0 440px',
        minWidth: '430px',
        maxWidth: '450px',
        boxSizing: 'border-box',
        height: '320px',
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
              fontSize: '24px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.02em',
            }}
          >
            200,000,000
          </div>
          <div style={{ fontSize: '12px', color: isLightMode ? '#9CA3AF' : '#71717A', marginTop: '2px' }}>
            Customers, riders, box owners
          </div>
        </div>

        <button
          onClick={onOpenInfo}
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
          <Info size={18} />
        </button>
      </div>

      {/* Semi-circle Gauge Graphic with 3 shades of yellow matching Figma */}
      <div style={{ margin: '8px 0 4px 0', display: 'flex', justifyContent: 'center' }}>
        <svg width="280" height="145" viewBox="0 0 280 145">
          {/* Background semi-circle track */}
          <path
            d="M 40 130 A 100 100 0 0 1 240 130"
            fill="none"
            stroke={isLightMode ? '#E5E7EB' : '#1C1C20'}
            strokeWidth="38"
          />

          {/* Left 50% segment: Vibrant Bright Yellow (Box owner) */}
          <path
            d="M 40 130 A 100 100 0 0 1 140 30"
            fill="none"
            stroke="#F5C842"
            strokeWidth="38"
          />

          {/* Top Right 25% segment: Warm Medium Gold Yellow (Rider) */}
          <path
            d="M 140 30 A 100 100 0 0 1 210.7 59.3"
            fill="none"
            stroke="#D49A15"
            strokeWidth="38"
          />

          {/* Bottom Right 25% segment: Deep Amber Bronze Yellow (Customer) */}
          <path
            d="M 210.7 59.3 A 100 100 0 0 1 240 130"
            fill="none"
            stroke="#85580A"
            strokeWidth="38"
          />

          {/* Percentage labels cleanly centered inside arc segments */}
          <text x="69" y="65" fill="#000000" fontSize="13" fontWeight="700" textAnchor="middle">50%</text>
          <text x="178" y="43" fill="#000000" fontSize="12" fontWeight="700" textAnchor="middle">25%</text>
          <text x="231" y="96" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle">25%</text>
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '12px',
          color: isLightMode ? '#6B7280' : '#8E8E93',
          paddingTop: '2px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
          <span>Box owner</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D49A15' }} />
          <span>Rider</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#85580A' }} />
          <span>Customer</span>
        </div>
      </div>
    </div>
  );
};
