'use client';

import React from 'react';
import {
  Boxes,
  Truck,
  TrendingUp,
  Warehouse,
  Coins,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
} from 'lucide-react';

export const StatCards: React.FC = () => {
  const stats = [
    {
      id: 'vol',
      title: 'Active Storage Volume',
      value: '1,830 m³',
      change: '+18.4%',
      isPositive: true,
      subtext: 'Across 3 Vault Zones (87.2% cap)',
      icon: Warehouse,
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)',
      accentColor: '#818cf8',
      sparkline: [35, 42, 45, 52, 58, 64, 78],
    },
    {
      id: 'pickups',
      title: 'Pickups & Returns Today',
      value: '42 Orders',
      change: '+12 today',
      isPositive: true,
      subtext: '28 Collected, 14 Scheduled',
      icon: Boxes,
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 100%)',
      accentColor: '#22d3ee',
      sparkline: [20, 28, 30, 26, 38, 40, 42],
    },
    {
      id: 'fleet',
      title: 'Fleet On-Duty Dispatch',
      value: '4 / 4 Active',
      change: '100% SLA',
      isPositive: true,
      subtext: 'Average Delivery ETA: 18 mins',
      icon: Truck,
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
      accentColor: '#34d399',
      sparkline: [85, 90, 88, 92, 95, 98, 100],
    },
    {
      id: 'lockers',
      title: 'Smart Locker Network',
      value: '76 / 108 Bays',
      change: '70.3% Occupied',
      isPositive: true,
      subtext: '32 Available across Madrid Stations',
      icon: Cpu,
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 100%)',
      accentColor: '#fbbf24',
      sparkline: [50, 58, 62, 65, 70, 74, 76],
    },
    {
      id: 'rev',
      title: 'Monthly Recurring Storage',
      value: '€284,500',
      change: '+14.2% MoM',
      isPositive: true,
      subtext: 'Avg Storage Retention: 8.6 mo',
      icon: Coins,
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 100%)',
      accentColor: '#c084fc',
      sparkline: [210, 225, 240, 255, 265, 274, 284],
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        const minSpark = Math.min(...stat.sparkline);
        const maxSpark = Math.max(...stat.sparkline);
        const range = maxSpark - minSpark || 1;

        // Generate SVG points
        const points = stat.sparkline
          .map((val, idx) => {
            const x = (idx / (stat.sparkline.length - 1)) * 70;
            const y = 28 - ((val - minSpark) / range) * 22;
            return `${x},${y}`;
          })
          .join(' ');

        return (
          <div
            key={stat.id}
            className="glass-card-interactive"
            style={{
              padding: '18px 20px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.02em',
                }}
              >
                {stat.title}
              </span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: stat.gradient,
                  border: `1px solid ${stat.accentColor}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.accentColor,
                }}
              >
                <Icon size={18} />
              </div>
            </div>

            {/* Middle row: Big Value + Sparkline */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '6px 0 10px 0' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '26px',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                  }}
                >
                  {stat.value}
                </div>
              </div>

              {/* Sparkline graphic */}
              <div style={{ width: '70px', height: '32px' }}>
                <svg width="70" height="32" viewBox="0 0 70 32">
                  <polyline
                    fill="none"
                    stroke={stat.accentColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>

            {/* Bottom row: Subtext & Trend Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                fontSize: '11px',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>{stat.subtext}</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontWeight: 700,
                  color: stat.isPositive ? 'var(--emerald-400)' : 'var(--rose-400)',
                }}
              >
                {stat.isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
