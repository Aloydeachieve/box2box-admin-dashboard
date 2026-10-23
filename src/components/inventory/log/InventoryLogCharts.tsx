'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InventoryLogChartsProps {
  isLightMode?: boolean;
}

export const InventoryLogCharts: React.FC<InventoryLogChartsProps> = ({ isLightMode = false }) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const axisColor = isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.16)';
  const gridLineColor = isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  // Chart 2: Stock locations bars with numbering on Y-axis & state abbreviations on X-axis
  const stockLocationsBars = [
    { state: 'LAG', percent: '25%', heightPercent: 78 },
    { state: 'ABJ', percent: '20%', heightPercent: 64 },
    { state: 'PHC', percent: '18%', heightPercent: 56 },
    { state: 'KAN', percent: '15%', heightPercent: 47 },
    { state: 'ENU', percent: '12%', heightPercent: 38 },
    { state: 'BEN', percent: '10%', heightPercent: 31 },
  ];
  const stockLocationYTicks = ['1,100', '800', '600', '400', '200', '0'];

  // Chart 4: Stock overview days of the week & numbering on Y-axis
  const stockOverviewYTicks = ['100M', '75M', '50M', '25M', '0'];
  const stockOverviewDays = [
    { day: 'Mon', boxes: 30, accessories: 22, parts: 18 },
    { day: 'Tue', boxes: 42, accessories: 18, parts: 26 },
    { day: 'Wed', boxes: 28, accessories: 32, parts: 22 },
    { day: 'Thu', boxes: 52, accessories: 16, parts: 22 },
    { day: 'Fri', boxes: 38, accessories: 28, parts: 20 },
    { day: 'Sat', boxes: 48, accessories: 20, parts: 24 },
    { day: 'Sun', boxes: 35, accessories: 24, parts: 20 },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '16px',
        width: '100%',
      }}
      className="inventory-log-charts-grid"
    >
      {/* =========================================================================
          1. DISTRIBUTION: Half Circle with 50%, 25%, 25% inside & info at TOP
      ========================================================================== */}
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
        {/* Info & Legend at TOP */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
                Distribution
              </h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'var(--font-outfit), sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: textColor,
                }}
              >
                200,000,000
              </div>
            </div>
          </div>

          {/* Top Legends: Boxes (teal), Accessories (yellow), Parts (amber) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '10px',
              marginTop: '6px',
              color: subtextColor,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488' }} />
              Boxes
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
              accessories
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} />
              Parts
            </span>
          </div>
        </div>

        {/* Half Circle SVG with 50%, 25%, 25% cleanly inside each arc slice */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '8px 0 0 0' }}>
          <svg viewBox="0 0 220 115" width="100%" height="115" style={{ maxWidth: '210px' }}>
            {/* Background track */}
            <path
              d="M 20 110 A 90 90 0 0 1 200 110"
              fill="none"
              stroke={isLightMode ? '#E5E7EB' : '#202025'}
              strokeWidth="34"
            />

            {/* Left 50% segment: Deep Teal (Boxes) */}
            <path
              d="M 20 110 A 90 90 0 0 1 110 20"
              fill="none"
              stroke="#0D9488"
              strokeWidth="34"
            />

            {/* Top Right 25% segment: Bright Yellow (Accessories) */}
            <path
              d="M 110 20 A 90 90 0 0 1 173.6 46.4"
              fill="none"
              stroke="#F5C842"
              strokeWidth="34"
            />

            {/* Bottom Right 25% segment: Amber (Parts) */}
            <path
              d="M 173.6 46.4 A 90 90 0 0 1 200 110"
              fill="none"
              stroke="#D97706"
              strokeWidth="34"
            />

            {/* Percentage text labels centered cleanly inside each arc segment */}
            <text
              x="46"
              y="47"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
            >
              50%
            </text>
            <text
              x="144"
              y="27"
              fill="#000000"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
            >
              25%
            </text>
            <text
              x="185"
              y="76"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
            >
              25%
            </text>
          </svg>
        </div>
      </div>

      {/* =========================================================================
          2. STOCK LOCATIONS: Bar chart with X/Y axes lines, dotted grid lines & Overall badge
      ========================================================================== */}
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
        {/* Header: Title with < > navigation & Top-Right Overall card */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
              Stock locations
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
              <button
                type="button"
                aria-label="Previous location range"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: subtextColor,
                  cursor: 'pointer',
                  display: 'flex',
                }}
              >
                <ChevronLeft size={12} />
              </button>
              <button
                type="button"
                aria-label="Next location range"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: subtextColor,
                  cursor: 'pointer',
                  display: 'flex',
                }}
              >
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Top-right card/box replicated from Figma */}
          <div
            style={{
              backgroundColor: isLightMode ? '#F4F4F5' : '#18181B',
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '3px 8px',
              textAlign: 'right',
            }}
          >
            <span style={{ fontSize: '8.5px', color: subtextColor, display: 'block', textTransform: 'capitalize' }}>
              Overall
            </span>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: textColor,
                fontFamily: 'var(--font-outfit), sans-serif',
              }}
            >
              21,500
            </div>
          </div>
        </div>

        {/* Bar Chart Area with Cardinal Points (X & Y axis lines) and Horizontal Dotted Grid Lines */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            height: '135px',
            gap: '6px',
            marginTop: '8px',
          }}
        >
          {/* Y-axis Labels: 1,100 down to 0 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100px',
              fontSize: '8px',
              color: subtextColor,
              textAlign: 'right',
              minWidth: '24px',
              paddingRight: '2px',
            }}
          >
            {stockLocationYTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          {/* Plot Area with X & Y Axes and Dotted Grid Lines */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            {/* Plot Canvas */}
            <div
              style={{
                position: 'relative',
                height: '100px',
                width: '100%',
                borderLeft: `1px solid ${axisColor}`,
                borderBottom: `1px solid ${axisColor}`,
                boxSizing: 'border-box',
              }}
            >
              {/* Horizontal dotted grid lines across the chart */}
              {[0, 20, 40, 60, 80].map((topPercent) => (
                <div
                  key={topPercent}
                  style={{
                    position: 'absolute',
                    top: `${topPercent}%`,
                    left: 0,
                    right: 0,
                    borderTop: `1px dotted ${gridLineColor}`,
                    pointerEvents: 'none',
                  }}
                />
              ))}

              {/* Bars track */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                  padding: '0 4px',
                  zIndex: 2,
                }}
              >
                {stockLocationsBars.map((bar) => (
                  <div
                    key={bar.state}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end',
                      width: '14px',
                    }}
                  >
                    {/* Percentage value label above bar */}
                    <span
                      style={{
                        fontSize: '7.5px',
                        color: subtextColor,
                        marginBottom: '2px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bar.percent}
                    </span>

                    {/* Golden Yellow Bar */}
                    <div
                      style={{
                        width: '100%',
                        height: `${bar.heightPercent}%`,
                        backgroundColor: '#F5C842',
                        borderRadius: '2px 2px 0 0',
                        transition: 'height 0.3s ease',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* X-axis State Abbreviations directly below baseline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '4px 4px 0 4px',
              }}
            >
              {stockLocationsBars.map((bar) => (
                <span
                  key={bar.state}
                  style={{
                    fontSize: '8.5px',
                    color: subtextColor,
                    fontWeight: 600,
                    width: '14px',
                    textAlign: 'center',
                  }}
                >
                  {bar.state}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. FAULTY STOCK: Half-Circle Gauge reading only 2%
      ========================================================================== */}
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
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
              Faulty stock
            </h4>
            <div style={{ fontSize: '10px', color: subtextColor, marginTop: '2px' }}>
              Parts & Accessories marked faulty
            </div>
          </div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: textColor,
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            15
          </div>
        </div>

        {/* Half Circle Gauge SVG reading 2% */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginTop: '8px',
          }}
        >
          <svg viewBox="0 0 200 110" width="100%" height="110" style={{ maxWidth: '190px' }}>
            {/* Background Half Circle Track */}
            <path
              d="M 25 105 A 75 75 0 0 1 175 105"
              fill="none"
              stroke={isLightMode ? '#E5E7EB' : '#222226'}
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* 2% Yellow Gauge Indicator: Tiny arc at bottom-left start */}
            <path
              d="M 25 105 A 75 75 0 0 1 29 88"
              fill="none"
              stroke="#F5C842"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Marker dot */}
            <circle cx="28" cy="88" r="5" fill="#F5C842" />
          </svg>

          {/* Centered label inside the half circle gauge */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
              Faulty
            </div>
            <div
              style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: '24px',
                fontWeight: 800,
                color: textColor,
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              2%
            </div>
          </div>
        </div>

        <div style={{ fontSize: '10px', color: subtextColor, textAlign: 'center', marginTop: '4px' }}>
          2% total items flagged faulty
        </div>
      </div>

      {/* =========================================================================
          4. STOCK OVERVIEW: Double Decker / Stacked bar chart with X & Y axes,
             tiny dotted lines, and info card (P, A, B)
      ========================================================================== */}
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
        {/* Header: Title and Top Legends */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: textColor, margin: 0 }}>
            Stock overview
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: subtextColor }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '1px', backgroundColor: '#DEC91B' }} />
              Boxes
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: subtextColor }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '1px', backgroundColor: '#B37300' }} />
              Accessories
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: subtextColor }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '1px', backgroundColor: '#06545B' }} />
              Parts
            </span>
          </div>
        </div>

        {/* Stacked Bar Chart Area with Cardinal Points (X & Y axis lines) and Dotted Lines */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            height: '135px',
            gap: '6px',
            marginTop: '8px',
          }}
        >
          {/* Y-axis Labels: 100M down to 0 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100px',
              fontSize: '8px',
              color: subtextColor,
              textAlign: 'right',
              minWidth: '24px',
              paddingRight: '2px',
            }}
          >
            {stockOverviewYTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          {/* Plot Area with X & Y Axes, Dotted Grid Lines, and Info Tooltip Box */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            {/* Plot Canvas */}
            <div
              style={{
                position: 'relative',
                height: '100px',
                width: '100%',
                borderLeft: `1px solid ${axisColor}`,
                borderBottom: `1px solid ${axisColor}`,
                boxSizing: 'border-box',
              }}
            >
              {/* Horizontal dotted grid lines across the chart */}
              {[0, 25, 50, 75].map((topPercent) => (
                <div
                  key={topPercent}
                  style={{
                    position: 'absolute',
                    top: `${topPercent}%`,
                    left: 0,
                    right: 0,
                    borderTop: `1px dotted ${gridLineColor}`,
                    pointerEvents: 'none',
                  }}
                />
              ))}

              {/* Small card/box overlay containing the 3 key values matching user quotation */}
              <div
                style={{
                  position: 'absolute',
                  top: '6px',
                  left: '42%',
                  transform: 'translateX(-50%)',
                  backgroundColor: isLightMode ? '#FFFFFF' : '#18181B',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '6px',
                  padding: '4px 7px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.55)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  fontSize: '8.5px',
                  fontWeight: 700,
                  fontFamily: 'monospace, var(--font-outfit), sans-serif',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ color: 'var(--text-brand, #06545B)' }}>P: 150,000,000</div>
                <div style={{ color: 'var(--Text-warning, #B37300)' }}>A: 150,000,000</div>
                <div style={{ color: 'var(--Text-primary, #DEC91B)' }}>B: 8,000,000</div>
              </div>

              {/* Stacked Bars Track */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                  padding: '0 2px',
                  zIndex: 2,
                }}
              >
                {stockOverviewDays.map((bar) => (
                  <div
                    key={bar.day}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '1.5px',
                      width: '12px',
                    }}
                  >
                    {/* Top segment: Parts (Brand Teal) */}
                    <div
                      style={{
                        width: '100%',
                        height: `${bar.parts * 0.9}px`,
                        backgroundColor: '#06545B',
                        borderRadius: '2px 2px 0 0',
                      }}
                    />
                    {/* Middle segment: Accessories (Amber / Warning) */}
                    <div
                      style={{
                        width: '100%',
                        height: `${bar.accessories * 0.9}px`,
                        backgroundColor: '#B37300',
                      }}
                    />
                    {/* Bottom segment: Boxes (Yellow / Primary) */}
                    <div
                      style={{
                        width: '100%',
                        height: `${bar.boxes * 0.9}px`,
                        backgroundColor: '#DEC91B',
                        borderRadius: '0 0 1px 1px',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* X-axis Days of the week directly below baseline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '4px 2px 0 2px',
              }}
            >
              {stockOverviewDays.map((bar) => (
                <span
                  key={bar.day}
                  style={{
                    fontSize: '8.5px',
                    color: subtextColor,
                    fontWeight: 500,
                    width: '12px',
                    textAlign: 'center',
                  }}
                >
                  {bar.day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
