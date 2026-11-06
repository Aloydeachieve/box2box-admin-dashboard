'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return '#10B981'; // Green
      case 'in progress':
      case 'needs review':
        return '#F59E0B'; // Amber
      case 'critical':
      case 'theft':
        return '#EF4444'; // Red
      default:
        return '#71717A'; // Gray / Pending
    }
  };

  const getReportSvg = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('cleanliness')) return '/image/cleanliness-report.svg';
    if (t.includes('theft')) return '/image/theft-report.svg';
    if (t.includes('payment')) return '/image/payment-report.svg';
    return '/image/package-report.svg';
  };

  const dividerStyle: React.CSSProperties = {
    width: '100%',
    height: '0px',
    borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.12)',
    margin: '22px 0',
  };

  return (
    <aside
      style={{
        width: '320px',
        backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
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

      {/* 1. Reports Section (Figma Screenshot 1 & 2) */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
            cursor: 'pointer',
          }}
        >
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
          <span style={{ color: '#8E8E93', fontSize: '11px', fontWeight: 500 }}>
            See more
          </span>
        </div>
        {/* Prominent Bold Date matching Figma */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: isLightMode ? '#111827' : '#FFFFFF',
            marginBottom: '14px',
          }}
        >
          June 05, 2025
        </div>

        {/* Clean flat list with left color-coded indicators and actual report SVGs */}
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
                {/* Official SVG Report Thumbnail from /public/image/ */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: isLightMode ? '#F3F4F6' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)'}`,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={getReportSvg(rep.title)}
                    alt={rep.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
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

      {/* Division line between sections */}
      <div style={dividerStyle} />

      {/* 2. Flag triggers Section (Figma Screenshot 1 & 2) */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
            cursor: 'pointer',
          }}
        >
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
          <span style={{ color: '#8E8E93', fontSize: '11px', fontWeight: 500 }}>
            See more
          </span>
        </div>
        {/* Prominent Bold Date matching Figma */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: isLightMode ? '#111827' : '#FFFFFF',
            marginBottom: '14px',
          }}
        >
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
                  {/* Clean yellow action button WITHOUT underline matching Figma */}
                  <button
                    onClick={() => alert(`Triggered action: ${flag.actionLabel} on ${flag.boxId}`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#F5C842',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'none',
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

      {/* Division line between sections */}
      <div style={dividerStyle} />

      {/* 3. New Bookings Section (Colourless - No left color border matching Figma) */}
      <div>
        <div
          onClick={() => router.push('/transactions')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
            cursor: 'pointer',
          }}
        >
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
          <span style={{ color: '#8E8E93', fontSize: '11px', fontWeight: 500 }}>
            See more
          </span>
        </div>
        {/* Prominent Bold Date matching Figma */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: isLightMode ? '#111827' : '#FFFFFF',
            marginBottom: '14px',
          }}
        >
          June 05, 2025
        </div>

        {/* Clean arrangement without left border color coding */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {BOOKINGS_DATA.map((bk) => (
            <div
              key={bk.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: isLightMode ? '#111827' : '#FFFFFF' }}>
                  {bk.bookingCode}
                </span>
                <span style={{ fontSize: '10px', color: '#71717A' }}>{bk.time}</span>
              </div>
              <div style={{ fontSize: '10px', color: '#8E8E93' }}>{bk.boxInfo}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Division line between sections */}
      <div style={dividerStyle} />

      {/* 4. Active Deliveries Section (Colourless - Clean white/gray text matching Figma) */}
      <div>
        <div
          onClick={() => router.push('/transactions')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
            cursor: 'pointer',
          }}
        >
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
          <span style={{ color: '#8E8E93', fontSize: '11px', fontWeight: 500 }}>
            See more
          </span>
        </div>
        {/* Prominent Bold Date matching Figma */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: isLightMode ? '#111827' : '#FFFFFF',
            marginBottom: '14px',
          }}
        >
          June 05, 2025
        </div>

        {/* Clean arrangement without left border color coding and without colored status text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ACTIVE_DELIVERIES_DATA.map((del) => {
            return (
              <div
                key={del.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: isLightMode ? '#111827' : '#FFFFFF' }}>
                    {del.bookingCode}
                  </span>
                  <span style={{ fontSize: '10px', color: '#71717A' }}>{del.time}</span>
                </div>
                {/* Clean neutral light gray status text matching Figma */}
                <div style={{ fontSize: '10px', color: '#8E8E93' }}>{del.statusText}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Division line after Active Deliveries */}
      <div style={dividerStyle} />
    </aside>
  );
};
