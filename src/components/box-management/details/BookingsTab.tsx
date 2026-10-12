'use client';

import React from 'react';

interface BookingsTabProps {
  isLightMode?: boolean;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({ isLightMode = false }) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Section: 5 Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Bookings Value', value: '₦80,000', change: '+12% today' },
          { label: 'Total Bookings', value: '7,935', change: '+12% today' },
          { label: 'Avg Booking Value', value: '₦2,050', change: '+4% today' },
          { label: 'Box2Box delivery', value: '72%', change: '+2% today' },
          { label: 'Storage booking', value: '28%', change: '+2% today' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '6px' }}>{stat.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor, marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 600 }}>{stat.change}</div>
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
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Order ID</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Cabinet</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Usage</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Amount</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '1', orderId: '#196723', cabinet: 'A5', usage: 'Pick up', type: 'Storage', date: 'Jun 12, 2025', amount: '₦300', status: 'In storage' },
                { id: '2', orderId: '#198096', cabinet: 'A3', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'Delivered' },
                { id: '3', orderId: '#109456', cabinet: 'A4', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'Delivered' },
                { id: '4', orderId: '#124897', cabinet: 'A6', usage: 'Pick up', type: 'Storage', date: 'Jun 12, 2025', amount: '₦300', status: 'Picked up' },
                { id: '5', orderId: '#105677', cabinet: 'A3', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'In progress' },
                { id: '6', orderId: '#108567', cabinet: 'A3', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'Delivered' },
              ].map((row) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.04)',
                    fontSize: '12px',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1A1A1E')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.orderId}</td>
                  <td style={{ padding: '14px 16px', color: textColor, fontWeight: 600 }}>{row.cabinet}</td>
                  <td style={{ padding: '14px 16px', color: subtextColor }}>{row.usage}</td>
                  <td style={{ padding: '14px 16px', color: textColor }}>{row.type}</td>
                  <td style={{ padding: '14px 16px', color: subtextColor }}>{row.date}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.amount}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        color:
                          row.status === 'Delivered' || row.status === 'Picked up'
                            ? '#10B981'
                            : row.status === 'In progress'
                            ? '#F5C842'
                            : '#A1A1AA',
                        backgroundColor:
                          row.status === 'Delivered' || row.status === 'Picked up'
                            ? 'rgba(16, 185, 129, 0.12)'
                            : row.status === 'In progress'
                            ? 'rgba(245, 200, 66, 0.12)'
                            : isLightMode ? '#F3F4F6' : '#27272A',
                      }}
                    >
                      {row.status}
                    </span>
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
