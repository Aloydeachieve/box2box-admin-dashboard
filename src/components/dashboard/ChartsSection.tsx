'use client';

import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

interface ChartsSectionProps {
  isLightMode?: boolean;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ isLightMode = false }) => {
  const [revenuePeriod, setRevenuePeriod] = useState('Monthly');
  const [growthPeriod, setGrowthPeriod] = useState('Monthly');
  const [showRevMenu, setShowRevMenu] = useState(false);
  const [showGrowthMenu, setShowGrowthMenu] = useState(false);

  // Revenue bars data
  const revenueBars = [
    { label: 'Mon', value: 0.65 },
    { label: 'Tue', value: 0.90 },
    { label: 'Wed', value: 0.45 },
    { label: 'Thu', value: 0.55 },
    { label: 'Fri', value: 0.98 },
  ];

  const growthMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yTicks = ['90M', '80M', '70M', '60M', '50M', '40M', '30M', '20M', '10M', '0'];

  const cardBg = isLightMode ? '#FFFFFF' : '#161619';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(310px, 1fr))',
        gap: '16px',
        marginBottom: '20px',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        paddingBottom: '6px',
      }}
      className="charts-horizontal-track"
    >
      {/* 1. User Distribution Card */}
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
          minWidth: '310px',
        }}
      >
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
            <div style={{ fontSize: '11px', color: '#71717A', marginTop: '2px' }}>
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

        {/* Semi-circle Gauge Graphic matching Figma Screenshot */}
        <div style={{ margin: '14px 0 6px 0', display: 'flex', justifyContent: 'center' }}>
          <svg width="240" height="125" viewBox="0 0 240 125">
            {/* Background semi-circle track */}
            <path
              d="M 25 115 A 95 95 0 0 1 215 115"
              fill="none"
              stroke="#202025"
              strokeWidth="32"
            />

            {/* Left 50% segment: Deep Teal (Box owner) */}
            <path
              d="M 25 115 A 95 95 0 0 1 120 20"
              fill="none"
              stroke="#0C4A4D"
              strokeWidth="32"
            />

            {/* Top Right 25% segment: Bright Yellow (Rider) */}
            <path
              d="M 120 20 A 95 95 0 0 1 187 48"
              fill="none"
              stroke="#F5C842"
              strokeWidth="32"
            />

            {/* Bottom Right 25% segment: Bronze / Amber (Customer) */}
            <path
              d="M 187 48 A 95 95 0 0 1 215 115"
              fill="none"
              stroke="#B37D14"
              strokeWidth="32"
            />

            {/* Percentage labels inside segments */}
            <text x="68" y="76" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle">50%</text>
            <text x="156" y="44" fill="#000000" fontSize="11" fontWeight="700" textAnchor="middle">25%</text>
            <text x="195" y="86" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">25%</text>
          </svg>
        </div>

        {/* Legend from Figma */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            fontSize: '11px',
            color: '#8E8E93',
            paddingTop: '6px',
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

      {/* 2. User Growth Smooth Bezier Curve Card */}
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
          minWidth: '310px',
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

          {/* Monthly Dropdown matching Figma Image 2 */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowGrowthMenu(!showGrowthMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
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
                  backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
                  borderRadius: '6px',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
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
        <div style={{ marginTop: '12px', height: '145px' }}>
          <svg width="100%" height="100%" viewBox="0 0 350 145" preserveAspectRatio="none">
            <defs>
              <linearGradient id="smoothGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5C842" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#F5C842" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Y-axis values on the left matching Figma Image 2 */}
            {yTicks.map((tick, idx) => {
              const y = 14 + idx * 11.8;
              return (
                <text
                  key={tick}
                  x="20"
                  y={y}
                  fill="#71717A"
                  fontSize="7"
                  textAnchor="end"
                  fontFamily="inherit"
                >
                  {tick}
                </text>
              );
            })}

            {/* Subtle baseline */}
            <line x1="28" y1="122" x2="345" y2="122" stroke={isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.05)'} strokeWidth="1" />

            {/* Smooth Gradient Area Fill */}
            <path
              d="M 38 122 C 55 120, 68 95, 82 85 C 96 75, 105 48, 118 36 C 130 24, 140 22, 150 34 C 160 46, 168 76, 178 84 C 188 92, 196 60, 206 48 C 216 36, 222 18, 232 18 C 242 18, 248 68, 258 84 C 268 100, 276 118, 286 118 C 296 118, 304 88, 314 74 C 324 60, 332 46, 342 42 L 342 122 L 38 122 Z"
              fill="url(#smoothGrowthGrad)"
            />

            {/* Smooth Golden Yellow Bezier Wave Line */}
            <path
              d="M 38 122 C 55 120, 68 95, 82 85 C 96 75, 105 48, 118 36 C 130 24, 140 22, 150 34 C 160 46, 168 76, 178 84 C 188 92, 196 60, 206 48 C 216 36, 222 18, 232 18 C 242 18, 248 68, 258 84 C 268 100, 276 118, 286 118 C 296 118, 304 88, 314 74 C 324 60, 332 46, 342 42"
              fill="none"
              stroke="#F5C842"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Golden Milestone Highlight Circles */}
            <circle cx="150" cy="34" r="3.5" fill="#F5C842" />
            <circle cx="178" cy="84" r="3" fill="#F5C842" />
            <circle cx="232" cy="18" r="4" fill="#F5C842" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="286" cy="118" r="3" fill="#F5C842" />
            <circle cx="342" cy="42" r="3.5" fill="#F5C842" />

            {/* Months on X-Axis matching Figma Image 2 */}
            {growthMonths.map((m, idx) => {
              const x = 38 + idx * 27.6;
              return (
                <text
                  key={m}
                  x={x}
                  y="136"
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

      {/* 3. Revenue Bar Chart Card */}
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
          minWidth: '310px',
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

          {/* Monthly Dropdown matching Figma */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowRevMenu(!showRevMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
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
                  backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
                  borderRadius: '6px',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
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
              color: '#71717A',
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
                <span style={{ fontSize: '9px', color: '#8E8E93' }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
