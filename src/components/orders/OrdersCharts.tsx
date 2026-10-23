'use client';

import React from 'react';

interface OrdersChartsProps {
  isLightMode?: boolean;
}

export const OrdersCharts: React.FC<OrdersChartsProps> = ({ isLightMode = false }) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const yTicks = ['100M', '75M', '50M', '25M', '0'];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const paymentTypeBars = [
    { day: 'Mon', full: 35, instalment: 15 },
    { day: 'Tue', full: 55, instalment: 30 },
    { day: 'Wed', full: 40, instalment: 25 },
    { day: 'Thu', full: 60, instalment: 20 },
    { day: 'Fri', full: 45, instalment: 35 },
    { day: 'Sat', full: 50, instalment: 25 },
    { day: 'Sun', full: 65, instalment: 30 },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '16px',
        width: '100%',
      }}
      className="orders-charts-grid"
    >
      {/* 1. ORDERS TREND (Plotted Curve Graph) */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '235px',
          boxSizing: 'border-box',
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
          Orders trend
        </h4>

        <div style={{ display: 'flex', alignItems: 'flex-end', height: '135px', gap: '8px', marginTop: '6px' }}>
          {/* Y-axis Ticks */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '110px',
              fontSize: '8px',
              color: subtextColor,
              marginBottom: '18px',
              textAlign: 'right',
              minWidth: '24px',
            }}
          >
            {yTicks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          {/* SVG Line / Area Graph */}
          <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <svg width="100%" height="110" viewBox="0 0 240 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="orderTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5C842" stopOpacity="0.45" />
                  <stop offset="70%" stopColor="#F5C842" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Baseline */}
              <line x1="5" y1="95" x2="235" y2="95" stroke={isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'} strokeWidth="1" />

              {/* Gradient Area Fill */}
              <path
                d="M 10 95 C 25 80, 40 25, 60 25 C 80 25, 95 70, 115 70 C 135 70, 145 92, 160 92 C 175 92, 185 40, 205 30 C 220 22, 230 45, 235 55 L 235 95 L 10 95 Z"
                fill="url(#orderTrendGrad)"
              />

              {/* Smooth Golden Curve */}
              <path
                d="M 10 95 C 25 80, 40 25, 60 25 C 80 25, 95 70, 115 70 C 135 70, 145 92, 160 92 C 175 92, 185 40, 205 30 C 220 22, 230 45, 235 55"
                fill="none"
                stroke="#F5C842"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* X-axis Days */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: subtextColor, paddingLeft: '4px', paddingRight: '4px' }}>
              {daysOfWeek.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. FULFILLMENT STATUS (4-Segment Pie Chart with Top Legends) */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '235px',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
            Fulfillment status
          </h4>

          {/* Top Legends: Delivered, Partially fulfilled, Pending, Cancelled */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '9px',
              marginTop: '6px',
              color: subtextColor,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              Delivered
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488' }} />
              Partially fulfilled
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
              Pending
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F43F5E' }} />
              Cancelled
            </span>
          </div>
        </div>

        {/* Pie Chart Graphic - 100% complete 360° circle with contiguous slices */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px 0' }}>
          <svg width="125" height="125" viewBox="0 0 120 120">
            {/* Delivered (37% = 133.2°): from 35° to 168.2° */}
            <path
              d="M 60 60 L 89.8 17.4 A 52 52 0 0 1 70.6 110.9 Z"
              fill="#10B981"
            />
            {/* Cancelled (20% = 72°): from 168.2° to 240.2° */}
            <path
              d="M 60 60 L 70.6 110.9 A 52 52 0 0 1 14.8 85.8 Z"
              fill="#F43F5E"
            />
            {/* Pending (23% = 82.8°): from 240.2° to 323.0° */}
            <path
              d="M 60 60 L 14.8 85.8 A 52 52 0 0 1 28.7 18.5 Z"
              fill="#8B5CF6"
            />
            {/* Partially fulfilled (20% = 72°): from 323.0° to 395.0° (35°) */}
            <path
              d="M 60 60 L 28.7 18.5 A 52 52 0 0 1 89.8 17.4 Z"
              fill="#0D9488"
            />

            {/* Percentage Text Labels centered inside slices */}
            <text x="88" y="70" fill="#FFFFFF" fontSize="9.5" fontWeight="700" textAnchor="middle">37%</text>
            <text x="46" y="94" fill="#FFFFFF" fontSize="9.5" fontWeight="700" textAnchor="middle">20%</text>
            <text x="28" y="55" fill="#FFFFFF" fontSize="9.5" fontWeight="700" textAnchor="middle">23%</text>
            <text x="60" y="32" fill="#FFFFFF" fontSize="9.5" fontWeight="700" textAnchor="middle">20%</text>
          </svg>
        </div>
      </div>

      {/* 3. PAYMENT TYPE (Bar Chart with Embedded Mini Card Tooltip) */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '235px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
            Payment type
          </h4>

          {/* Top Legends: Full (yellow), Instalment (orange) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '9px', marginTop: '6px', color: subtextColor }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
              Full
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} />
              Instalment
            </span>
          </div>
        </div>

        {/* Embedded Mini Card / Tooltip matching Figma Image 2 */}
        <div
          style={{
            position: 'absolute',
            top: '72px',
            left: '60px',
            backgroundColor: isLightMode ? '#FFFFFF' : '#1F1F24',
            border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            padding: '4px 8px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            zIndex: 10,
            fontSize: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
            <span style={{ color: textColor, fontWeight: 600 }}>Full ₦150,000,000</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#D97706' }} />
            <span style={{ color: subtextColor }}>₦50,000,000</span>
          </div>
        </div>

        {/* Bar Chart Area with Y-axis numbers & Days of Week */}
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '135px', gap: '8px', marginTop: '6px' }}>
          {/* Y-axis Ticks */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '110px',
              fontSize: '8px',
              color: subtextColor,
              marginBottom: '18px',
              textAlign: 'right',
              minWidth: '24px',
            }}
          >
            {yTicks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          {/* Stacked / Grouped Bars with Days of the Week */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '100%',
              gap: '4px',
            }}
          >
            {paymentTypeBars.map((b) => (
              <div
                key={b.day}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  flex: 1,
                }}
              >
                {/* Stacked Segments: Yellow (Full) + Orange (Instalment) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '2px',
                    width: '100%',
                    maxWidth: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${b.instalment}px`,
                      backgroundColor: '#D97706',
                      borderRadius: '2px 2px 0 0',
                    }}
                  />
                  <div
                    style={{
                      width: '100%',
                      height: `${b.full}px`,
                      backgroundColor: '#F5C842',
                      borderRadius: '0 0 2px 2px',
                    }}
                  />
                </div>

                {/* Day label */}
                <span
                  style={{
                    fontSize: '8.5px',
                    color: subtextColor,
                    marginTop: '5px',
                    fontWeight: 500,
                  }}
                >
                  {b.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. BOX USAGE REVENUE (Half-circle pie with two distinct colors) */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '235px',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
            Box usage revenue
          </h4>

          {/* Top Legends: Storage (teal), B2B Delivery (yellow) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '9px', marginTop: '6px', color: subtextColor }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488' }} />
              Storage
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
              B2B Delivery
            </span>
          </div>
        </div>

        {/* Half Circle Pie / Gauge Chart with 75% Teal and 25% Yellow */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '14px 0 6px 0' }}>
          <svg viewBox="0 0 220 115" width="100%" height="115" style={{ maxWidth: '210px' }}>
            {/* Background track */}
            <path
              d="M 20 110 A 90 90 0 0 1 200 110"
              fill="none"
              stroke={isLightMode ? '#E5E7EB' : '#202025'}
              strokeWidth="34"
            />

            {/* Left 75% Segment: Teal (#0D9488) */}
            <path
              d="M 20 110 A 90 90 0 0 1 173.6 46.4"
              fill="none"
              stroke="#0D9488"
              strokeWidth="34"
            />

            {/* Right 25% Segment: Yellow (#F5C842) */}
            <path
              d="M 173.6 46.4 A 90 90 0 0 1 200 110"
              fill="none"
              stroke="#F5C842"
              strokeWidth="34"
            />

            {/* Text labels inside the half-circle segments */}
            <text x="85" y="60" fill="#FFFFFF" fontSize="13" fontWeight="700" textAnchor="middle">
              75%
            </text>
            <text x="180" y="84" fill="#000000" fontSize="11" fontWeight="700" textAnchor="middle">
              25%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
