'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface UserGrowthCardProps {
  isLightMode?: boolean;
}

export const UserGrowthCard: React.FC<UserGrowthCardProps> = ({ isLightMode = false }) => {
  const [growthPeriod, setGrowthPeriod] = useState('Monthly');
  const [showGrowthMenu, setShowGrowthMenu] = useState(false);

  const growthMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yTicks = ['90M', '80M', '70M', '60M', '50M', '40M', '30M', '20M', '10M', '0'];

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
            User growth
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
            Track user growth
          </div>
        </div>

        {/* Monthly Dropdown matching Figma */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowGrowthMenu(!showGrowthMenu)}
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
            <span>{growthPeriod}</span>
            <ChevronDown size={12} color={isLightMode ? '#6B7280' : '#8E8E93'} />
          </button>
          {showGrowthMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                width: '95px',
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
                    setGrowthPeriod(p);
                    setShowGrowthMenu(false);
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

      {/* Smooth Cubic Bezier Spline Wave Graph with Y-Axis and X-Axis */}
      <div style={{ marginTop: '10px', height: '140px' }}>
        <svg width="100%" height="100%" viewBox="0 0 350 140" preserveAspectRatio="none">
          <defs>
            <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5C842" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#F5C842" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Y-axis values on the left matching Figma */}
          {yTicks.map((tick, idx) => {
            const y = 14 + idx * 11.2;
            return (
              <text
                key={tick}
                x="20"
                y={y}
                fill={isLightMode ? '#9CA3AF' : '#71717A'}
                fontSize="7"
                textAnchor="end"
                fontFamily="inherit"
              >
                {tick}
              </text>
            );
          })}

          {/* Subtle baseline */}
          <line
            x1="28"
            y1="118"
            x2="345"
            y2="118"
            stroke={isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.05)'}
            strokeWidth="1"
          />

          {/* Smooth Gradient Area Fill */}
          <path
            d="M 38 118 C 55 116, 68 93, 82 83 C 96 73, 105 46, 118 34 C 130 22, 140 20, 150 32 C 160 44, 168 74, 178 82 C 188 90, 196 58, 206 46 C 216 34, 222 16, 232 16 C 242 16, 248 66, 258 82 C 268 98, 276 116, 286 116 C 296 116, 304 86, 314 72 C 324 58, 332 44, 342 40 L 342 118 L 38 118 Z"
            fill="url(#growthAreaGrad)"
          />

          {/* Smooth Golden Yellow Bezier Wave Line */}
          <path
            d="M 38 118 C 55 116, 68 93, 82 83 C 96 73, 105 46, 118 34 C 130 22, 140 20, 150 32 C 160 44, 168 74, 178 82 C 188 90, 196 58, 206 46 C 216 34, 222 16, 232 16 C 242 16, 248 66, 258 82 C 268 98, 276 116, 286 116 C 296 116, 304 86, 314 72 C 324 58, 332 44, 342 40"
            fill="none"
            stroke="#F5C842"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Milestone Circles */}
          <circle cx="150" cy="32" r="3.5" fill="#F5C842" />
          <circle cx="178" cy="82" r="3" fill="#F5C842" />
          <circle cx="232" cy="16" r="4" fill="#F5C842" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="286" cy="116" r="3" fill="#F5C842" />
          <circle cx="342" cy="40" r="3.5" fill="#F5C842" />

          {/* Months on X-Axis matching Figma */}
          {growthMonths.map((m, idx) => {
            const x = 38 + idx * 27.6;
            return (
              <text
                key={m}
                x={x}
                y="132"
                fill={isLightMode ? '#9CA3AF' : '#71717A'}
                fontSize="7.5"
                textAnchor="middle"
                fontFamily="inherit"
              >
                {m}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
