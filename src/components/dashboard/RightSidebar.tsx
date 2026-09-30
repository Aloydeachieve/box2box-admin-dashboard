'use client';

import React from 'react';
import {
  REPORTS_DATA,
  FLAG_TRIGGERS_DATA,
  BOOKINGS_DATA,
  ACTIVE_DELIVERIES_DATA,
} from '@/lib/dashboardMockData';
import { X } from 'lucide-react';

interface RightSidebarProps {
  onClose?: () => void;
  isLightMode?: boolean;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onClose, isLightMode = false }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
      case 'pickup confirmed':
        return '#10B981'; // Green
      case 'in progress':
      case 'in transit':
      case 'needs review':
        return '#F59E0B'; // Amber
      case 'critical':
      case 'theft':
        return '#EF4444'; // Red
      default:
        return '#71717A'; // Gray / Pending
    }
  };

  const dividerStyle = {
    height: '1px',
    backgroundColor: isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.07)',
    margin: '18px 0',
  };

  return (
    <aside
      style={{
        width: '320px',
        backgroundColor: isLightMode ? '#FFFFFF' : '#121214',
        borderLeft: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
        height: '100%',
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        flexShrink: 0,
        transition: 'background-color 0.2s, border-color 0.2s',
      }}
      className="dashboard-right-sidebar"
    >
      {/* Mobile close button if open as drawer */}
      {onClose && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }} className="show-on-mobile-btn">
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: isLightMode ? '#4B5563' : '#8E8E93',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* 1. Reports Section (Figma Screenshot 2) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: isLightMode ? '#111827' : '#FFFFFF',
              margin: 0,
            }}
          >
            Reports
          </h3>
          <button style={{ background: 'none', border: 'none', color: '#8E8E93', fontSize: '11px', cursor: 'pointer' }}>
            See more
          </button>
        </div>
        <div style={{ fontSize: '10px', color: '#71717A', marginBottom: '14px' }}>
          June 05, 2025
        </div>

        {/* Clean flat list with left color-coded indicators matching Figma */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {REPORTS_DATA.map((rep) => {
            const colorCode =
              rep.title.toLowerCase().includes('theft')
                ? '#EF4444'
                : getStatusColor(rep.status);

            return (
              <div
                key={rep.id}
                style={{
                  display: 'flex',
                  gap: '10px',
                  paddingLeft: '8px',
                  borderLeft: `2.5px solid ${colorCode}`,
                  transition: 'opacity 0.15s',
                }}
              >
                {/* Thumbnail Icon */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: isLightMode ? '#F3F4F6' : '#26262B',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F5C842',
                    fontSize: '12px',
                  }}
                >
                  📦
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: isLightMode ? '#111827' : '#FFFFFF',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {rep.title}
                    </span>
                    <span style={{ fontSize: '9px', color: '#71717A', marginLeft: '4px' }}>{rep.time}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '10px',
                      color: isLightMode ? '#6B7280' : '#8E8E93',
                      margin: '0 0 4px 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {rep.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '9px', color: '#71717A', fontFamily: 'monospace' }}>
                      {rep.reportCode}
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 600,
                        color: colorCode,
                      }}
                    >
                      {rep.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Light division line between sections */}
      <div style={dividerStyle} />

      {/* 2. Flag triggers Section (Figma Screenshot 2 & 5) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: isLightMode ? '#111827' : '#FFFFFF',
              margin: 0,
            }}
          >
            Flag triggers
          </h3>
          <button style={{ background: 'none', border: 'none', color: '#8E8E93', fontSize: '11px', cursor: 'pointer' }}>
            See more
          </button>
        </div>
        <div style={{ fontSize: '10px', color: '#71717A', marginBottom: '14px' }}>
          June 05, 2025
        </div>

        {/* Clean flat list with vertical color codes on the left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FLAG_TRIGGERS_DATA.map((flag) => {
            const isCritical = flag.severity === 'Critical';
            const colorCode = isCritical ? '#EF4444' : '#F59E0B';

            return (
              <div
                key={flag.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '8px',
                  borderLeft: `2.5px solid ${colorCode}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: isLightMode ? '#111827' : '#FFFFFF' }}>
                    {flag.title}
                  </span>
                  <span style={{ fontSize: '9px', color: '#71717A' }}>{flag.time}</span>
                </div>
                <div style={{ fontSize: '10px', color: isLightMode ? '#6B7280' : '#8E8E93', marginBottom: '4px' }}>
                  {flag.boxId}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => alert(`Triggered action: ${flag.actionLabel} on ${flag.boxId}`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#F5C842',
                      fontSize: '10px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {flag.actionLabel}
                  </button>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: colorCode,
                      textTransform: 'capitalize',
                    }}
                  >
                    {flag.severity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Light division line between sections */}
      <div style={dividerStyle} />

      {/* 3. New Bookings Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: isLightMode ? '#111827' : '#FFFFFF',
              margin: 0,
            }}
          >
            New bookings
          </h3>
          <button style={{ background: 'none', border: 'none', color: '#8E8E93', fontSize: '11px', cursor: 'pointer' }}>
            See more
          </button>
        </div>
        <div style={{ fontSize: '10px', color: '#71717A', marginBottom: '12px' }}>
          June 05, 2025
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {BOOKINGS_DATA.map((bk) => (
            <div
              key={bk.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '8px',
                borderLeft: '2.5px solid #F5C842',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: isLightMode ? '#111827' : '#FFFFFF' }}>
                  {bk.bookingCode}
                </div>
                <div style={{ fontSize: '9px', color: '#71717A' }}>{bk.boxInfo}</div>
              </div>
              <span style={{ fontSize: '9px', color: '#71717A' }}>{bk.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Light division line between sections */}
      <div style={dividerStyle} />

      {/* 4. Active Deliveries Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: isLightMode ? '#111827' : '#FFFFFF',
              margin: 0,
            }}
          >
            Active Deliveries
          </h3>
          <button style={{ background: 'none', border: 'none', color: '#8E8E93', fontSize: '11px', cursor: 'pointer' }}>
            See more
          </button>
        </div>
        <div style={{ fontSize: '10px', color: '#71717A', marginBottom: '12px' }}>
          June 05, 2025
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ACTIVE_DELIVERIES_DATA.map((del) => {
            const colorCode =
              del.statusText === 'Pickup confirmed'
                ? '#10B981'
                : del.statusText === 'In transit'
                ? '#F59E0B'
                : '#71717A';

            return (
              <div
                key={del.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: '8px',
                  borderLeft: `2.5px solid ${colorCode}`,
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: isLightMode ? '#111827' : '#FFFFFF' }}>
                    {del.bookingCode}
                  </div>
                  <div style={{ fontSize: '9px', color: colorCode }}>{del.statusText}</div>
                </div>
                <span style={{ fontSize: '9px', color: '#71717A' }}>{del.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
