'use client';

import React from 'react';

interface TransactionChartsProps {
  isLightMode?: boolean;
}

export const TransactionCharts: React.FC<TransactionChartsProps> = ({ isLightMode = false }) => {
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        alignItems: 'stretch',
      }}
    >
      {/* Chart 1: Revenue Trend (Line Graph with Golden Gradient) */}
      <div
        style={{
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
          Revenue trend
        </span>

        <div style={{ position: 'relative', width: '100%', height: '160px' }}>
          <svg viewBox="0 0 300 140" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="revTrendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5C842" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="30" y1="20" x2="290" y2="20" stroke={borderColor} strokeDasharray="3 3" />
            <line x1="30" y1="50" x2="290" y2="50" stroke={borderColor} strokeDasharray="3 3" />
            <line x1="30" y1="80" x2="290" y2="80" stroke={borderColor} strokeDasharray="3 3" />
            <line x1="30" y1="110" x2="290" y2="110" stroke={borderColor} strokeDasharray="3 3" />

            {/* Y Axis Labels */}
            <text x="5" y="24" fill={subtextColor} fontSize="8">100M</text>
            <text x="8" y="54" fill={subtextColor} fontSize="8">75M</text>
            <text x="8" y="84" fill={subtextColor} fontSize="8">50M</text>
            <text x="8" y="114" fill={subtextColor} fontSize="8">25M</text>

            {/* Area fill */}
            <path
              d="M 30,110 L 30,85 C 50,75 60,30 80,30 C 100,30 110,65 130,70 C 150,75 160,105 180,105 C 200,105 210,35 230,35 C 250,35 260,80 290,95 L 290,110 Z"
              fill="url(#revTrendGrad)"
            />

            {/* Smooth Wavy Line */}
            <path
              d="M 30,85 C 50,75 60,30 80,30 C 100,30 110,65 130,70 C 150,75 160,105 180,105 C 200,105 210,35 230,35 C 250,35 260,80 290,95"
              fill="none"
              stroke="#F5C842"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* X Axis Labels */}
            <text x="30" y="132" fill={subtextColor} fontSize="8" textAnchor="middle">Mon</text>
            <text x="73" y="132" fill={subtextColor} fontSize="8" textAnchor="middle">Tue</text>
            <text x="116" y="132" fill={subtextColor} fontSize="8" textAnchor="middle">Wed</text>
            <text x="160" y="132" fill={subtextColor} fontSize="8" textAnchor="middle">Thu</text>
            <text x="203" y="132" fill={subtextColor} fontSize="8" textAnchor="middle">Fri</text>
            <text x="246" y="132" fill={subtextColor} fontSize="8" textAnchor="middle">Sat</text>
            <text x="288" y="132" fill={subtextColor} fontSize="8" textAnchor="middle">Sun</text>
          </svg>
        </div>
      </div>

      {/* Chart 2: Revenue Breakdown (True Solid 3-Color Pie Chart, matching Figma) */}
      <div
        style={{
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        {/* Header & Legend */}
        <div>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
            Revenue breakdown
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '6px',
              fontSize: '10.5px',
              color: subtextColor,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: yellowColor }} />
              <span>Booking</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A855F7' }} />
              <span>Subscription</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span>Box sales</span>
            </div>
          </div>
        </div>

        {/* Solid Pie Chart (Wedges meeting at center (80,80), zero hole!) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '145px' }}>
          <svg viewBox="0 0 160 160" style={{ width: '140px', height: '140px' }}>
            {/* Slice 1: Booking 42% (Yellow #F5C842) - Angle from -90° (top) to 61.2° */}
            <path
              d="M 80,80 L 80,20 A 60,60 0 0,1 132.6,108.8 Z"
              fill="#F5C842"
            />
            {/* Slice 2: Subscription 38% (Purple #A855F7) - Angle from 61.2° to 198° */}
            <path
              d="M 80,80 L 132.6,108.8 A 60,60 0 0,1 22.9,98.5 Z"
              fill="#A855F7"
            />
            {/* Slice 3: Box Sales 20% (Teal/Green #10B981) - Angle from 198° to 270° (-90°) */}
            <path
              d="M 80,80 L 22.9,98.5 A 60,60 0 0,1 80,20 Z"
              fill="#10B981"
            />

            {/* Labels centered in wedges */}
            <text x="105" y="66" fill="#000000" fontSize="11" fontWeight="700" textAnchor="middle">
              42%
            </text>
            <text x="64" y="112" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">
              38%
            </text>
            <text x="52" y="58" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">
              20%
            </text>
          </svg>
        </div>
      </div>

      {/* Chart 3: Deposit vs Withdrawals (Dual-Color Bars with Prominent Semi-Circle Top Curves) */}
      <div
        style={{
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        {/* Header & Legend */}
        <div>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
            Deposit vs Withdrawals
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '6px',
              fontSize: '10.5px',
              color: subtextColor,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: yellowColor }} />
              <span>Deposits</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B48C28' }} />
              <span>Withdrawal</span>
            </div>
          </div>
        </div>

        {/* Bar Chart SVG */}
        <div style={{ position: 'relative', width: '100%', height: '140px' }}>
          <svg viewBox="0 0 300 130" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Y Axis labels */}
            <text x="5" y="16" fill={subtextColor} fontSize="8">100M</text>
            <text x="8" y="42" fill={subtextColor} fontSize="8">75M</text>
            <text x="8" y="68" fill={subtextColor} fontSize="8">50M</text>
            <text x="8" y="94" fill={subtextColor} fontSize="8">25M</text>

            {/* Grid Lines */}
            <line x1="30" y1="12" x2="290" y2="12" stroke={borderColor} strokeDasharray="3 3" />
            <line x1="30" y1="38" x2="290" y2="38" stroke={borderColor} strokeDasharray="3 3" />
            <line x1="30" y1="64" x2="290" y2="64" stroke={borderColor} strokeDasharray="3 3" />
            <line x1="30" y1="90" x2="290" y2="90" stroke={borderColor} strokeDasharray="3 3" />

            {/* Interactive / Prominent tooltip on Wed */}
            <g transform="translate(100, 36)">
              <rect x="-35" y="-14" width="90" height="20" rx="4" fill="#1C1C20" stroke={borderColor} />
              <text x="10" y="-1" fill="#FFFFFF" fontSize="7" textAnchor="middle">
                NET: ₦100,000,000 | W: 40M
              </text>
            </g>

            {/* Bars: bottom amber base + top yellow segment with full rx="7" semi-circle curve */}
            {/* Mon */}
            <g transform="translate(40, 0)">
              <rect x="0" y="80" width="14" height="20" fill="#B48C28" />
              <rect x="0" y="70" width="14" height="15" rx="7" fill={yellowColor} />
            </g>
            {/* Tue */}
            <g transform="translate(76, 0)">
              <rect x="0" y="70" width="14" height="30" fill="#B48C28" />
              <rect x="0" y="55" width="14" height="20" rx="7" fill={yellowColor} />
            </g>
            {/* Wed */}
            <g transform="translate(114, 0)">
              <rect x="0" y="65" width="14" height="35" fill="#B48C28" />
              <rect x="0" y="45" width="14" height="25" rx="7" fill={yellowColor} />
            </g>
            {/* Thu */}
            <g transform="translate(152, 0)">
              <rect x="0" y="55" width="14" height="45" fill="#B48C28" />
              <rect x="0" y="40" width="14" height="20" rx="7" fill={yellowColor} />
            </g>
            {/* Fri */}
            <g transform="translate(190, 0)">
              <rect x="0" y="50" width="14" height="50" fill="#B48C28" />
              <rect x="0" y="32" width="14" height="24" rx="7" fill={yellowColor} />
            </g>
            {/* Sat */}
            <g transform="translate(228, 0)">
              <rect x="0" y="60" width="14" height="40" fill="#B48C28" />
              <rect x="0" y="42" width="14" height="24" rx="7" fill={yellowColor} />
            </g>
            {/* Sun */}
            <g transform="translate(266, 0)">
              <rect x="0" y="52" width="14" height="48" fill="#B48C28" />
              <rect x="0" y="35" width="14" height="22" rx="7" fill={yellowColor} />
            </g>

            {/* X Axis Labels */}
            <text x="47" y="118" fill={subtextColor} fontSize="8" textAnchor="middle">Mon</text>
            <text x="83" y="118" fill={subtextColor} fontSize="8" textAnchor="middle">Tue</text>
            <text x="121" y="118" fill={subtextColor} fontSize="8" textAnchor="middle">Wed</text>
            <text x="159" y="118" fill={subtextColor} fontSize="8" textAnchor="middle">Thu</text>
            <text x="197" y="118" fill={subtextColor} fontSize="8" textAnchor="middle">Fri</text>
            <text x="235" y="118" fill={subtextColor} fontSize="8" textAnchor="middle">Sat</text>
            <text x="273" y="118" fill={subtextColor} fontSize="8" textAnchor="middle">Sun</text>
          </svg>
        </div>
      </div>

      {/* Chart 4: Box Usage Revenue (Half Pie / Gauge Chart) */}
      <div
        style={{
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        {/* Header & Legend */}
        <div>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
            Box usage revenue
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '6px',
              fontSize: '10.5px',
              color: subtextColor,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488' }} />
              <span>Storage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: yellowColor }} />
              <span>B2B Delivery</span>
            </div>
          </div>
        </div>

        {/* Half Pie Arc */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '140px', paddingBottom: '10px' }}>
          <svg viewBox="0 0 200 110" style={{ width: '180px', height: '100px' }}>
            {/* Storage segment: 75% of 220 = 165 */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#0D9488"
              strokeWidth="28"
              strokeDasharray="165 440"
              strokeDashoffset="0"
              transform="rotate(180 100 100)"
            />
            {/* B2B Delivery segment: 25% of 220 = 55 */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#F5C842"
              strokeWidth="28"
              strokeDasharray="55 440"
              strokeDashoffset="-165"
              transform="rotate(180 100 100)"
            />

            {/* Labels on arcs */}
            <text x="65" y="55" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle">
              75%
            </text>
            <text x="145" y="75" fill="#000000" fontSize="12" fontWeight="700" textAnchor="middle">
              25%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
