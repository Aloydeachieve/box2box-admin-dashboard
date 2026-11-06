'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface BatteryHealthCardProps {
  isLightMode?: boolean;
  onOpenInfo?: () => void;
}

export const BatteryHealthCard: React.FC<BatteryHealthCardProps> = ({
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
            Battery health
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
            20,000
          </div>
          <div style={{ fontSize: '12px', color: isLightMode ? '#9CA3AF' : '#71717A', marginTop: '2px' }}>
            Deployed boxes
          </div>
        </div>

        <button
          onClick={onOpenInfo}
          title="Battery Health Info"
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
          <AlertCircle size={18} />
        </button>
      </div>

      {/* Semi-circle Gauge Graphic with 5 distinct colors matching Figma Images 3 & 4 */}
      <div style={{ margin: '8px 0 4px 0', display: 'flex', justifyContent: 'center' }}>
        <svg width="280" height="145" viewBox="0 0 280 145">
          {/* Background track */}
          <path
            d="M 40 135 A 100 100 0 0 1 240 135"
            fill="none"
            stroke={isLightMode ? '#E5E7EB' : '#1C1C20'}
            strokeWidth="38"
          />

          {/* Segment 1: 25% Medium Gold Yellow (Excellent) - 0 to 45 deg */}
          <path
            d="M 40 135 A 100 100 0 0 1 69.3 64.3"
            fill="none"
            stroke="#D4A72C"
            strokeWidth="38"
          />

          {/* Segment 2: 25% Bright Vibrant Yellow (Good) - 45 to 90 deg */}
          <path
            d="M 69.3 64.3 A 100 100 0 0 1 140 35"
            fill="none"
            stroke="#F5C842"
            strokeWidth="38"
          />

          {/* Segment 3: 15% Violet/Purple (Fair) - 90 to 117 deg */}
          <path
            d="M 140 35 A 100 100 0 0 1 185.3 45.6"
            fill="none"
            stroke="#A855F7"
            strokeWidth="38"
          />

          {/* Segment 4: 25% Orange (Poor) - 117 to 162 deg */}
          <path
            d="M 185.3 45.6 A 100 100 0 0 1 235.1 104.1"
            fill="none"
            stroke="#F97316"
            strokeWidth="38"
          />

          {/* Segment 5: 10% Red (Critical) - 162 to 180 deg */}
          <path
            d="M 235.1 104.1 A 100 100 0 0 1 240 135"
            fill="none"
            stroke="#EF4444"
            strokeWidth="38"
          />

          {/* Percentage text labels cleanly centered inside each arc segment */}
          <text x="51" y="98" fill="#000000" fontSize="12" fontWeight="700" textAnchor="middle">25%</text>
          <text x="100" y="54" fill="#000000" fontSize="12" fontWeight="700" textAnchor="middle">25%</text>
          <text x="162" y="42" fill="#000000" fontSize="11" fontWeight="700" textAnchor="middle">15%</text>
          <text x="211" y="74" fill="#000000" fontSize="12" fontWeight="700" textAnchor="middle">25%</text>
          <text x="232" y="118" fill="#000000" fontSize="11" fontWeight="700" textAnchor="middle">10%</text>
        </svg>
      </div>

      {/* 5-item Legend left-aligned starting from the edge under the arc matching Figma */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '6px',
          fontSize: '11.5px',
          color: isLightMode ? '#4B5563' : '#D1D1D6',
          paddingLeft: '16px',
          paddingTop: '2px',
        }}
      >
        {/* Row 1: Excellent, Good, Fair, Poor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#D4A72C' }} />
            <span>Excellent</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
            <span>Good</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#A855F7' }} />
            <span>Fair</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#F97316' }} />
            <span>Poor</span>
          </div>
        </div>

        {/* Row 2: Critical aligned directly under Excellent on the left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
};
