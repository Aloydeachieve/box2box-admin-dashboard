'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RevenueCardProps {
  isLightMode?: boolean;
}

export const RevenueCard: React.FC<RevenueCardProps> = ({ isLightMode = false }) => {
  const [revenuePeriod, setRevenuePeriod] = useState('Monthly');
  const [showRevMenu, setShowRevMenu] = useState(false);

  // 7 days from Monday through Sunday matching Figma
  const revenueBars = [
    { label: 'Mon', value: 0.38 },
    { label: 'Tue', value: 0.68 },
    { label: 'Wed', value: 0.42 },
    { label: 'Thu', value: 0.55 },
    { label: 'Fri', value: 0.88 },
    { label: 'Sat', value: 0.95 },
    { label: 'Sun', value: 0.60 },
  ];

  const yTicks = [
    { label: '1B', y: 20 },
    { label: '800M', y: 51 },
    { label: '600M', y: 82 },
    { label: '400M', y: 113 },
    { label: '200M', y: 144 },
    { label: '0', y: 175 },
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', color: subtextColor, fontWeight: 500, marginBottom: '4px' }}>
            Revenue
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
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              backgroundColor: isLightMode ? '#F3F4F6' : 'transparent',
              border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.12)',
              color: isLightMode ? '#111827' : '#FFFFFF',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <span>{revenuePeriod}</span>
            <ChevronDown size={14} color={isLightMode ? '#6B7280' : '#8E8E93'} />
          </button>
          {showRevMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                width: '105px',
                backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
                borderRadius: '8px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.12)',
                padding: '4px',
                zIndex: 20,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
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
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
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

      {/* Spacious SVG Bar Chart with white ticks and labels matching Figma */}
      <div style={{ marginTop: '12px', height: '205px' }}>
        <svg width="100%" height="100%" viewBox="0 0 390 205" preserveAspectRatio="none">
          {/* Y-axis Ticks & Horizontal Dotted Gridlines in white */}
          {yTicks.map((tick) => (
            <g key={tick.label}>
              <text
                x="30"
                y={tick.y + 4}
                fill={isLightMode ? '#111827' : '#FFFFFF'}
                fontSize="9.5"
                fontWeight="500"
                textAnchor="end"
                fontFamily="inherit"
              >
                {tick.label}
              </text>
              {/* Dotted horizontal grid line running across chart */}
              <line
                x1="36"
                y1={tick.y}
                x2="380"
                y2={tick.y}
                stroke={isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255, 255, 255, 0.08)'}
                strokeDasharray={tick.label === '0' ? 'none' : '3 3'}
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Vertical Y-axis line */}
          <line
            x1="36"
            y1="20"
            x2="36"
            y2="175"
            stroke={isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255, 255, 255, 0.15)'}
            strokeWidth="1"
          />

          {/* 7 Bars (Mon through Sun) with rounded top tips */}
          {revenueBars.map((bar, idx) => {
            const colWidth = 330 / 7;
            const cx = 40 + colWidth * idx + colWidth / 2;
            const barWidth = 18;
            const barHeight = bar.value * 155;
            const barY = 175 - barHeight;

            return (
              <g key={bar.label}>
                <rect
                  x={cx - barWidth / 2}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  ry="4"
                  fill="#F5C842"
                />
                <text
                  x={cx}
                  y="195"
                  fill={isLightMode ? '#111827' : '#FFFFFF'}
                  fontSize="9.5"
                  fontWeight="500"
                  textAnchor="middle"
                  fontFamily="inherit"
                >
                  {bar.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
