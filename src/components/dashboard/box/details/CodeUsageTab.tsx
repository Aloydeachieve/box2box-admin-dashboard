'use client';

import React from 'react';

interface CodeUsageTabProps {
  isLightMode?: boolean;
}

export const CodeUsageTab: React.FC<CodeUsageTabProps> = ({ isLightMode = false }) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Stat Cards (4 cards: Total Access, Successful Access, Failed Access Attempts, Successful Access Rate) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Access', value: '7,935' },
          { label: 'Successful Access', value: '7,860' },
          { label: 'Failed Access Attempts', value: '75' },
          { label: 'Successful Access Rate', value: '93%' },
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)', color: subtextColor, fontSize: '11px' }}>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Code</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Cabinet</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Usage</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Used by</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: '196723', cabinet: 'A5', usage: 'Rider pick up', usedBy: 'Chioma Ibekwe', date: 'Jun 12, 2025 | 11:52 AM' },
                { code: '198096', cabinet: 'A3', usage: 'Rider drop off', usedBy: 'Ahmed Musa', date: 'Jun 12, 2025 | 11:45 AM' },
                { code: '109456', cabinet: 'A4', usage: 'Customer pick up', usedBy: 'Marycynthia John', date: 'Jun 12, 2025 | 11:43 AM' },
                { code: '124898', cabinet: 'B3', usage: 'Customer pick up', usedBy: 'Chioma Ibekwe', date: 'Jun 12, 2025 | 11:45 AM' },
                { code: '124899', cabinet: 'C7', usage: 'Customer drop off', usedBy: 'Chioma Ibekwe', date: 'Jun 12, 2025 | 11:45 AM' },
                { code: '124900', cabinet: 'D2', usage: 'Customer drop off', usedBy: 'Chioma Ibekwe', date: 'Jun 12, 2025 | 11:45 AM' },
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
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.code}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.cabinet}</td>
                  <td style={{ padding: '14px 16px', color: textColor }}>{row.usage}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}>
                      {row.usedBy}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: subtextColor }}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
