'use client';

import React, { useState } from 'react';
import { REVENUE_SERIES } from '@/lib/mockData';
import {
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const RevenueChart: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = REVENUE_SERIES;
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const maxStorage = Math.max(...data.map((d) => d.storageM3));

  const chartHeight = 200;
  const chartWidth = 580;

  // Compute SVG polyline points for Revenue
  const revenuePoints = data
    .map((item, idx) => {
      const x = (idx / (data.length - 1)) * chartWidth;
      const y = chartHeight - (item.revenue / (maxRevenue * 1.15)) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${revenuePoints} ${chartWidth},${chartHeight} 0,${chartHeight}`;

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <TrendingUp size={18} color="var(--primary-400)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
              Storage Volume & Revenue Trends
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Growth in recurring storage space subscriptions and daily logistics fees
          </p>
        </div>

        {/* Period Selector */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['7d', '30d', '90d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: activePeriod === period ? '1px solid var(--border-glow-primary)' : '1px solid var(--border-glass)',
                background: activePeriod === period ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: activePeriod === period ? '#ffffff' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {period === '7d' ? 'Last 7 Days' : period === '30d' ? '30 Days' : 'Quarterly'}
            </button>
          ))}
        </div>
      </div>

      {/* Highlights Bar */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '16px',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1' }}></span>
          <span style={{ color: 'var(--text-muted)' }}>Storage Revenue: </span>
          <span style={{ fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
            €130,350 (7D Total)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4' }}></span>
          <span style={{ color: 'var(--text-muted)' }}>Occupied Space: </span>
          <span style={{ fontWeight: 700, color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
            1,830 m³
          </span>
        </div>
      </div>

      {/* SVG Chart Graphic */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: '100%', height: '220px', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <line
              key={i}
              x1="0"
              y1={chartHeight * pct}
              x2={chartWidth}
              y2={chartHeight * pct}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area Fill */}
          <polygon fill="url(#revGrad)" points={areaPoints} />

          {/* Line Stroke */}
          <polyline
            fill="none"
            stroke="#818cf8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={revenuePoints}
          />

          {/* Data Points */}
          {data.map((item, idx) => {
            const cx = (idx / (data.length - 1)) * chartWidth;
            const cy = chartHeight - (item.revenue / (maxRevenue * 1.15)) * chartHeight;
            const isHovered = hoveredIndex === idx;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 7 : 4}
                  fill={isHovered ? '#22d3ee' : '#6366f1'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  style={{ transition: 'all 0.2s' }}
                />

                {/* Day Label on X-axis */}
                <text
                  x={cx}
                  y={chartHeight + 18}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontSize="11"
                  fontFamily="var(--font-display)"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hover Information Box */}
      {hoveredIndex !== null && (
        <div
          style={{
            marginTop: '16px',
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass-bright)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}
        >
          <div>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>
              {data[hoveredIndex].label} Summary:
            </span>{' '}
            <span style={{ color: 'var(--text-muted)' }}>Daily Collected Revenue: </span>
            <span style={{ fontWeight: 700, color: '#818cf8', fontFamily: 'var(--font-mono)' }}>
              €{data[hoveredIndex].revenue.toLocaleString()}
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Stored Space: </span>
            <span style={{ fontWeight: 700, color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
              {data[hoveredIndex].storageM3} m³
            </span>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--text-muted)' }}>Pickups: </span>
            <span style={{ fontWeight: 700, color: 'var(--emerald-400)', fontFamily: 'var(--font-mono)' }}>
              {data[hoveredIndex].pickups}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
