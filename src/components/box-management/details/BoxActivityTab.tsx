'use client';

import React from 'react';

interface BoxActivityTabProps {
  isLightMode?: boolean;
}

export const BoxActivityTab: React.FC<BoxActivityTabProps> = ({ isLightMode = false }) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Stat Cards (4 cards: Total access events, Successful access attempts, Failed access attempts, Security incidents) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total access events', value: '7,935' },
          { label: 'Successful access attempts', value: '94%' },
          { label: 'Failed access attempts', value: '90' },
          { label: 'Security incidents', value: '20' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>{stat.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Table Container Card */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '760px' }}>
            <thead>
              <tr style={{ borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)', color: subtextColor, fontSize: '11px' }}>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Cabinet</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Actor</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Method</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Outcome</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Flag</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  cabinet: 'A5',
                  actor: 'Chioma Ibekwe',
                  role: 'Customer',
                  method: 'Code access',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Successful',
                  flag: '-',
                  status: 'Closed',
                  statusDate: 'Jun 03, 2025 | 11:52 AM',
                  statusColor: '#EF4444',
                },
                {
                  cabinet: 'A3',
                  actor: 'Ahmed Musa',
                  role: 'Rider',
                  method: 'Code access',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Successful',
                  flag: '-',
                  status: 'Closed',
                  statusDate: 'Jun 03, 2025 | 11:52 AM',
                  statusColor: '#EF4444',
                },
                {
                  cabinet: 'A4',
                  actor: 'Marycynthia John',
                  role: 'Owner',
                  method: 'Owner app',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Successful',
                  flag: '-',
                  status: 'Closed',
                  statusDate: 'Jun 03, 2025 | 11:52 AM',
                  statusColor: '#EF4444',
                },
                {
                  cabinet: 'B3',
                  actor: 'Chioma Ibekwe',
                  role: 'Admin',
                  method: 'Admin override',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Successful',
                  flag: '-',
                  status: 'Closed',
                  statusDate: 'Jun 03, 2025 | 11:52 AM',
                  statusColor: '#EF4444',
                },
                {
                  cabinet: 'All',
                  actor: 'Unidentified',
                  role: '',
                  method: 'Forced entry',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Forced open',
                  flag: 'Forced access',
                  flagColor: '#EF4444',
                  status: 'Open',
                  statusColor: '#F5C842',
                },
                {
                  cabinet: '-',
                  actor: 'Unidentified',
                  role: '',
                  method: 'Code access',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Failed',
                  flag: 'Multiple failures',
                  flagColor: '#EF4444',
                  status: '-',
                },
                {
                  cabinet: '-',
                  actor: 'Unidentified',
                  role: '',
                  method: 'Code access',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Failed',
                  flag: 'Suspicious',
                  flagColor: '#EF4444',
                  status: '-',
                },
                {
                  cabinet: '-',
                  actor: 'Unidentified',
                  role: '',
                  method: 'Code access',
                  time: 'Jun 03, 2025 | 11:52 AM',
                  outcome: 'Failed',
                  flag: 'Suspicious',
                  flagColor: '#EF4444',
                  status: '-',
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.04)',
                    fontSize: '12px',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1A1A1E')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.cabinet}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: textColor }}>{row.actor}</div>
                    {row.role && <div style={{ fontSize: '11px', color: subtextColor }}>{row.role}</div>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: textColor }}>{row.method}</div>
                    <div style={{ fontSize: '11px', color: subtextColor }}>{row.time}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>{row.outcome}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {row.flag !== '-' ? (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: row.flagColor || '#EF4444',
                          backgroundColor: 'rgba(239, 68, 68, 0.12)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {row.flag}
                      </span>
                    ) : (
                      <span style={{ color: subtextColor }}>-</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {row.status !== '-' ? (
                      <div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: row.statusColor,
                          }}
                        >
                          {row.status}
                        </span>
                        {row.statusDate && (
                          <div style={{ fontSize: '10px', color: subtextColor, marginTop: '2px' }}>
                            {row.statusDate}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: subtextColor }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
