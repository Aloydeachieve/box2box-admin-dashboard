'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DeliveryVolumeCardProps {
  isLightMode?: boolean;
}

export const DeliveryVolumeCard: React.FC<DeliveryVolumeCardProps> = ({ isLightMode = false }) => {
  const [period, setPeriod] = useState('Daily');
  const [showMenu, setShowMenu] = useState(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const yTicks = [
    { label: '90M', y: 20 },
    { label: '80M', y: 37 },
    { label: '70M', y: 54 },
    { label: '60M', y: 71 },
    { label: '50M', y: 88 },
    { label: '40M', y: 105 },
    { label: '30M', y: 122 },
    { label: '20M', y: 139 },
    { label: '10M', y: 156 },
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
            Delivery volume
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
            Parcels delivered successfully
          </div>
        </div>

        {/* Daily Dropdown matching Figma Image 4 */}
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
      </div>

      {/* Spacious Spline Wave Graph with white ticks and labels matching Figma */}
      <div style={{ marginTop: '12px', height: '205px' }}>
        <svg width="100%" height="100%" viewBox="0 0 390 205" preserveAspectRatio="none">
          <defs>
            <linearGradient id="deliveryAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5C842" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#F5C842" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Y-axis values on the left in crisp white text */}
          {yTicks.map((tick) => (
            <text
              key={tick.label}
              x="26"
              y={tick.y + 3}
              fill={isLightMode ? '#111827' : '#FFFFFF'}
              fontSize="9"
              fontWeight="500"
              textAnchor="end"
              fontFamily="inherit"
            >
              {tick.label}
            </text>
          ))}

          {/* Distinct Y-axis line */}
          <line
            x1="32"
            y1="14"
            x2="32"
            y2="175"
            stroke={isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255, 255, 255, 0.15)'}
            strokeWidth="1"
          />

          {/* Distinct X-axis baseline */}
          <line
            x1="32"
            y1="175"
            x2="385"
            y2="175"
            stroke={isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255, 255, 255, 0.15)'}
            strokeWidth="1"
          />

          {/* Smooth Gradient Area Fill */}
          <path
            d="M 45 105 C 70 85, 85 37, 105 37 C 130 37, 145 110, 172 110 C 198 110, 215 65, 238 65 C 262 65, 275 156, 305 156 C 335 156, 355 48, 385 48 L 385 175 L 45 175 Z"
            fill="url(#deliveryAreaGrad)"
          />

          {/* Smooth Golden Yellow Bezier Wave Line */}
          <path
            d="M 45 105 C 70 85, 85 37, 105 37 C 130 37, 145 110, 172 110 C 198 110, 215 65, 238 65 C 262 65, 275 156, 305 156 C 335 156, 355 48, 385 48"
            fill="none"
            stroke="#F5C842"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Milestone Circles matching Figma Image 4 */}
          <circle cx="105" cy="37" r="4.5" fill="#F5C842" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="172" cy="110" r="4" fill="#F5C842" />
          <circle cx="238" cy="65" r="4" fill="#F5C842" />
          <circle cx="305" cy="156" r="4" fill="#F5C842" />
          <circle cx="385" cy="48" r="4" fill="#F5C842" stroke="#FFFFFF" strokeWidth="1" />

          {/* Days on X-Axis Mon through Sun in crisp white text */}
          {days.map((d, idx) => {
            const x = 50 + idx * 53;
            return (
              <text
                key={d}
                x={x}
                y="195"
                fill={isLightMode ? '#111827' : '#FFFFFF'}
                fontSize="9.5"
                fontWeight="500"
                textAnchor="middle"
                fontFamily="inherit"
              >
                {d}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
