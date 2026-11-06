'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface BoxDistributionCardProps {
  isLightMode?: boolean;
}

export const BoxDistributionCard: React.FC<BoxDistributionCardProps> = ({ isLightMode = false }) => {
  const [period, setPeriod] = useState('Daily');
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState<1 | 2>(1);

  // Page 1 Cities from Figma Image 3
  const page1Cities = [
    { name: 'Lag', active: 0.65, inactive: 0.35 },
    { name: 'Abj', active: 0.85, inactive: 0.45 },
    { name: 'Phc', active: 0.40, inactive: 0.60 },
    { name: 'Kan', active: 0.70, inactive: 0.30 },
    { name: 'Enu', active: 0.55, inactive: 0.45 },
    { name: 'Iba', active: 0.75, inactive: 0.50 },
    { name: 'Ben', active: 0.90, inactive: 0.40 },
    { name: 'Kad', active: 0.60, inactive: 0.75 },
    { name: 'Jos', active: 0.50, inactive: 0.35 },
    { name: 'Uyo', active: 0.65, inactive: 0.40 },
    { name: 'War', active: 0.80, inactive: 0.55 },
    { name: 'Cal', active: 0.45, inactive: 0.60 },
  ];

  // Page 2 Cities from Figma Image 4
  const page2Cities = [
    { name: 'Mai', active: 0.70, inactive: 0.40 },
    { name: 'Abe', active: 0.55, inactive: 0.50 },
    { name: 'Aku', active: 0.80, inactive: 0.35 },
    { name: 'Awa', active: 0.60, inactive: 0.65 },
    { name: 'Mak', active: 0.45, inactive: 0.55 },
    { name: 'Bau', active: 0.75, inactive: 0.40 },
    { name: 'Sok', active: 0.50, inactive: 0.60 },
    { name: 'Yol', active: 0.85, inactive: 0.45 },
    { name: 'Ada', active: 0.65, inactive: 0.35 },
    { name: 'Min', active: 0.75, inactive: 0.50 },
    { name: 'Dut', active: 0.40, inactive: 0.65 },
    { name: 'Jal', active: 0.60, inactive: 0.40 },
  ];

  const currentCities = page === 1 ? page1Cities : page2Cities;

  const yTicks = [
    { label: '1M', y: 20 },
    { label: '800K', y: 51 },
    { label: '600K', y: 82 },
    { label: '400K', y: 113 },
    { label: '200K', y: 144 },
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
      {/* Top Header with Title, Legend & Stacked Controls (Daily on top, Directional Chevrons underneath) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', color: subtextColor, fontWeight: 500, marginBottom: '4px' }}>
            Box distribution
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
            200 Cities
          </div>
          {/* Active & Inactive Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', fontSize: '11px', color: subtextColor }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
              <span style={{ color: isLightMode ? '#374151' : '#E5E7EB' }}>Active</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
              <span style={{ color: isLightMode ? '#374151' : '#E5E7EB' }}>Inactive</span>
            </div>
          </div>
        </div>

        {/* Stacked Controls: Daily dropdown on top, Chevron buttons directly underneath matching Figma */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          {/* Daily Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
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
              <span>{period}</span>
              <ChevronDown size={14} color={isLightMode ? '#6B7280' : '#8E8E93'} />
            </button>
            {showMenu && (
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
                      setPeriod(p);
                      setShowMenu(false);
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

          {/* Directional Chevrons: switches between Page 1 and Page 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setPage(1)}
              title="Previous page"
              style={{
                background: 'none',
                border: 'none',
                color: page === 1 ? '#71717A' : '#FFFFFF',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setPage(2)}
              title="Next page"
              style={{
                background: 'none',
                border: 'none',
                color: page === 2 ? '#71717A' : '#FFFFFF',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Dual Bar Chart: Touching bars for each city pair (no space between active & inactive), spaced between cities */}
      <div style={{ marginTop: '8px', height: '200px' }}>
        <svg width="100%" height="100%" viewBox="0 0 390 200" preserveAspectRatio="none">
          {/* Y-axis Ticks & Horizontal Dotted Gridlines in white */}
          {yTicks.map((tick) => (
            <g key={tick.label}>
              <text
                x="30"
                y={tick.y + 4}
                fill={isLightMode ? '#111827' : '#FFFFFF'}
                fontSize="9"
                fontWeight="500"
                textAnchor="end"
                fontFamily="inherit"
              >
                {tick.label}
              </text>
              <line
                x1="36"
                y1={tick.y}
                x2="385"
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

          {/* 12 Dual Bar Pairs (Gum body side-by-side: Active Yellow + Inactive White touching each other) */}
          {currentCities.map((city, idx) => {
            const colWidth = 345 / 12; // ~28.75px per city
            const cx = 38 + colWidth * idx + colWidth / 2;
            const barW = 5.5;
            const maxH = 150;

            const activeH = city.active * maxH;
            const inactiveH = city.inactive * maxH;

            const activeY = 175 - activeH;
            const inactiveY = 175 - inactiveH;

            return (
              <g key={city.name}>
                {/* Active Bar (Yellow) - Left half, touching inactive bar */}
                <rect
                  x={cx - barW}
                  y={activeY}
                  width={barW}
                  height={activeH}
                  rx="1"
                  ry="1"
                  fill="#F5C842"
                />
                {/* Inactive Bar (White) - Right half, directly adjacent touching active bar */}
                <rect
                  x={cx}
                  y={inactiveY}
                  width={barW}
                  height={inactiveH}
                  rx="1"
                  ry="1"
                  fill="#FFFFFF"
                />
                {/* City Name on X-axis in crisp white text */}
                <text
                  x={cx}
                  y="192"
                  fill={isLightMode ? '#111827' : '#FFFFFF'}
                  fontSize="8.5"
                  fontWeight="500"
                  textAnchor="middle"
                  fontFamily="inherit"
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
