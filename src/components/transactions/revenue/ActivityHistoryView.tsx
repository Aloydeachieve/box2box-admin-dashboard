'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';

export const ActivityHistoryView: React.FC = () => {
  const { isLightMode } = useAdmin();

  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#1C1C20';

  const [activeTab, setActiveTab] = useState<'All' | 'Revenue rule' | 'Promotion' | 'Subscription'>('All');
  const [duration, setDuration] = useState('Duration');
  const [isDurationOpen, setIsDurationOpen] = useState(false);

  const durationOptions = ['Today', 'Last 7 days', 'Last 30 days', 'All time'];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
      onClick={() => setIsDurationOpen(false)}
    >
      {/* Centralized Container Holding the Activity History (Matching users ActivityHistoryPageView) */}
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          margin: '0 auto',
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        {/* Top Header Inside Container: Tabs on Left & Duration Dropdown on Right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Underline Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', overflowX: 'auto' }}>
            {(['All', 'Revenue rule', 'Promotion', 'Subscription'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px 0',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? yellowColor : subtextColor,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: yellowColor,
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Duration Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDurationOpen(!isDurationOpen);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: textColor,
                fontSize: '12.5px',
                cursor: 'pointer',
              }}
            >
              <span>{duration}</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>

            {isDurationOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '38px',
                  backgroundColor: dropdownBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '4px',
                  zIndex: 20,
                  minWidth: '130px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                }}
              >
                {durationOptions.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setDuration(opt);
                      setIsDurationOpen(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: duration === opt ? yellowColor : textColor,
                      cursor: 'pointer',
                      borderRadius: '6px',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = isLightMode
                        ? '#F3F4F6'
                        : 'rgba(255, 255, 255, 0.05)')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Activity Items Group 1: June 02, 2025 */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.01em',
            }}
          >
            June 02, 2025
          </span>

          {/* Item 1 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Subscription created
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Basic plan</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Uche Oduah</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Admin</span>
            </div>
          </div>

          {/* Item 2 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Promotion started
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Black friday</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>System</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Auto</span>
            </div>
          </div>

          {/* Item 3 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Promotion created
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Weekend discount</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Blessing Abang</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Admin</span>
            </div>
          </div>

          {/* Item 4 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Revenue rule created
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>
                Delivery fee commission
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Anthony Joshua</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Admin</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Activity Items Group 2: June 02, 2025 */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingTop: '10px' }}>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.01em',
            }}
          >
            June 02, 2025
          </span>

          {/* Item 1 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Subscription created
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Basic plan</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Uche Oduah</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Admin</span>
            </div>
          </div>

          {/* Item 2 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Promotion started
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Black friday</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>System</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Auto</span>
            </div>
          </div>

          {/* Item 3 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Promotion created
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Weekend discount</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Blessing Abang</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Admin</span>
            </div>
          </div>

          {/* Item 4 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                Revenue rule created
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>
                Delivery fee commission
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Anthony Joshua</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '12px', color: subtextColor }}>13:25</span>
              <span style={{ fontSize: '12px', color: subtextColor }}>Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
