'use client';

import React from 'react';
import {
  Battery as BatteryIcon,
  Zap,
  Box,
  Clock,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface BatteryTabProps {
  isLightMode?: boolean;
}

export const BatteryTab: React.FC<BatteryTabProps> = ({ isLightMode = false }) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const gridLineColor = isLightMode ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Top Stat Cards (4 cards: Health Status, Charge Cycles, Avg. Daily Drain, 87% with visual) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {/* Card 1: Health Status */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ fontSize: '11px', color: subtextColor }}>Health Status</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: textColor }}>85%</div>
        </div>

        {/* Card 2: Charge Cycles */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ fontSize: '11px', color: subtextColor }}>Charge Cycles</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: textColor }}>12</div>
        </div>

        {/* Card 3: Avg. Daily Drain */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ fontSize: '11px', color: subtextColor }}>Avg. Daily Drain</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: textColor }}>3.1%</div>
        </div>

        {/* Card 4: 87% 42 days remaining + Battery Level Indicator Graphic */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>87%</div>
            <div style={{ fontSize: '11px', color: subtextColor }}>42 days remaining</div>
          </div>

          <div
            style={{
              width: '56px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: '#10B981',
              position: 'relative',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: '-4px',
                top: '7px',
                width: '4px',
                height: '14px',
                backgroundColor: '#10B981',
                borderTopRightRadius: '3px',
                borderBottomRightRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Battery Performance with 3 Grounded Coordinate Charts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
          Battery performance
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Chart 1: Battery activity */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Battery activity</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', color: subtextColor }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
                <span>In use</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B45309' }} />
                <span>Idle time</span>
              </div>
            </div>

            <div style={{ display: 'flex', height: '145px', gap: '8px', position: 'relative', paddingTop: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '110px',
                  fontSize: '10px',
                  color: subtextColor,
                  textAlign: 'right',
                  width: '20px',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                <span>24</span>
                <span>18</span>
                <span>12</span>
                <span>6</span>
                <span>0</span>
              </div>

              <div style={{ flex: 1, position: 'relative', height: '110px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: `1px dashed ${gridLineColor}` }} />
                <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, borderTop: `1px dashed ${gridLineColor}` }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: `1px dashed ${gridLineColor}` }} />
                <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, borderTop: `1px dashed ${gridLineColor}` }} />
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, borderTop: `1px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.15)'}` }} />

                <div
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '26px',
                    backgroundColor: isLightMode ? '#FFFFFF' : '#1F1F23',
                    border: cardBorder,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '9px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div style={{ color: '#F5C842', fontWeight: 600 }}>In use: 3.5 hrs</div>
                  <div style={{ color: '#B45309', fontWeight: 600 }}>Idle time: 8.5 hrs</div>
                </div>

                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
                  {[
                    { day: 'Mon', inUse: 18, idle: 38 },
                    { day: 'Tue', inUse: 30, idle: 55 },
                    { day: 'Wed', inUse: 15, idle: 40 },
                    { day: 'Thu', inUse: 24, idle: 46 },
                    { day: 'Fri', inUse: 28, idle: 50 },
                    { day: 'Sat', inUse: 22, idle: 48 },
                    { day: 'Sun', inUse: 28, idle: 52 },
                  ].map((item) => (
                    <div
                      key={item.day}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        width: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '95px',
                          display: 'flex',
                          flexDirection: 'column-reverse',
                          borderRadius: '4px 4px 0 0',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ height: `${item.idle}%`, backgroundColor: '#B45309' }} />
                        <div style={{ height: `${item.inUse}%`, backgroundColor: '#F5C842' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '114px',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-around',
                    fontSize: '10px',
                    color: subtextColor,
                  }}
                >
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 2: Battery level trend */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Battery level trend</div>

            <div style={{ display: 'flex', height: '145px', gap: '8px', position: 'relative', paddingTop: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '110px',
                  fontSize: '10px',
                  color: subtextColor,
                  textAlign: 'right',
                  width: '28px',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              <div style={{ flex: 1, position: 'relative', height: '110px' }}>
                <svg viewBox="0 0 280 110" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="batteryTrendGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5C842" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="0" x2="280" y2="0" stroke={gridLineColor} strokeDasharray="3 3" />
                  <line x1="0" y1="27.5" x2="280" y2="27.5" stroke={gridLineColor} strokeDasharray="3 3" />
                  <line x1="0" y1="55" x2="280" y2="55" stroke={gridLineColor} strokeDasharray="3 3" />
                  <line x1="0" y1="82.5" x2="280" y2="82.5" stroke={gridLineColor} strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="280" y2="110" stroke={isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.15)'} />

                  <path
                    d="M 5 60 C 40 40, 60 10, 90 15 C 120 20, 140 75, 170 60 C 195 48, 210 95, 230 90 C 250 85, 260 25, 275 20 L 275 110 L 5 110 Z"
                    fill="url(#batteryTrendGrad2)"
                  />

                  <path
                    d="M 5 60 C 40 40, 60 10, 90 15 C 120 20, 140 75, 170 60 C 195 48, 210 95, 230 90 C 250 85, 260 25, 275 20"
                    fill="none"
                    stroke="#F5C842"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    top: '114px',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    color: subtextColor,
                  }}
                >
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 3: Drain by compartment */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Drain by compartment</div>

            <div style={{ display: 'flex', height: '145px', gap: '8px', position: 'relative', paddingTop: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '110px',
                  fontSize: '10px',
                  color: subtextColor,
                  textAlign: 'right',
                  width: '28px',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              <div style={{ flex: 1, position: 'relative', height: '110px' }}>
                <line x1="0" y1="0" x2="280" y2="0" stroke={gridLineColor} strokeDasharray="3 3" />
                <line x1="0" y1="27.5" x2="280" y2="27.5" stroke={gridLineColor} strokeDasharray="3 3" />
                <line x1="0" y1="55" x2="280" y2="55" stroke={gridLineColor} strokeDasharray="3 3" />
                <line x1="0" y1="82.5" x2="280" y2="82.5" stroke={gridLineColor} strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="280" y2="110" stroke={isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.15)'} />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                  }}
                >
                  {[
                    { cab: 'A1', pct: '10%', heightPx: 22 },
                    { cab: 'A2', pct: '12%', heightPx: 26 },
                    { cab: 'A3', pct: '15%', heightPx: 33 },
                    { cab: 'A4', pct: '16%', heightPx: 36 },
                    { cab: 'A5', pct: '18%', heightPx: 42 },
                    { cab: 'A6', pct: '18%', heightPx: 42 },
                    { cab: 'A7', pct: '20%', heightPx: 48 },
                  ].map((item) => (
                    <div
                      key={item.cab}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span style={{ fontSize: '9px', color: subtextColor, fontWeight: 500 }}>{item.pct}</span>
                      <div
                        style={{
                          width: '12px',
                          height: `${item.heightPx}px`,
                          backgroundColor: '#F5C842',
                          borderRadius: '3px 3px 0 0',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '114px',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-around',
                    fontSize: '10px',
                    color: subtextColor,
                  }}
                >
                  <span>A1</span>
                  <span>A2</span>
                  <span>A3</span>
                  <span>A4</span>
                  <span>A5</span>
                  <span>A6</span>
                  <span>A7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Battery usage by activity */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
          Battery usage by activity
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '14px',
          }}
          className="battery-activity-2x3-grid"
        >
          {[
            {
              title: 'Lock/Unlock Operations',
              subtitle: '24 actions',
              pct: '35%',
              color: '#F5C842',
              icon: <BatteryIcon size={16} color="#F5C842" />,
            },
            {
              title: 'Network Connectivity',
              subtitle: 'Continuous',
              pct: '25%',
              color: '#06B6D4',
              icon: <Zap size={16} color="#06B6D4" />,
            },
            {
              title: 'Display & UI',
              subtitle: '42 displays',
              pct: '15%',
              color: '#10B981',
              icon: <Box size={16} color="#10B981" />,
            },
            {
              title: 'Sensor Monitoring',
              subtitle: 'Continuous',
              pct: '12%',
              color: '#3B82F6',
              icon: <Clock size={16} color="#3B82F6" />,
            },
            {
              title: 'Code Verification',
              subtitle: '12 verifications',
              pct: '8%',
              color: '#EAB308',
              icon: <CheckCircle2 size={16} color="#EAB308" />,
            },
            {
              title: 'Other',
              subtitle: 'Background',
              pct: '5%',
              color: '#64748B',
              icon: <Layers size={16} color="#64748B" />,
            },
          ].map((act) => (
            <div
              key={act.title}
              style={{
                backgroundColor: cardBg,
                borderRadius: '14px',
                border: cardBorder,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {act.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{act.title}</div>
                    <div style={{ fontSize: '11px', color: subtextColor }}>{act.subtitle}</div>
                  </div>
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>{act.pct}</div>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '5px',
                  borderRadius: '3px',
                  backgroundColor: isLightMode ? '#E5E7EB' : '#222226',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: act.pct,
                    height: '100%',
                    backgroundColor: act.color,
                    borderRadius: '3px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .battery-activity-2x3-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
