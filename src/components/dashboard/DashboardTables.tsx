'use client';

import React from 'react';
import {
  NEW_USERS_DATA,
  RECENT_BOXES_DATA,
  INVENTORY_DATA,
} from '@/lib/dashboardMockData';
import { Star, Battery, ChevronRight } from 'lucide-react';

interface DashboardTablesProps {
  isLightMode?: boolean;
  onNavigateToSection?: (sectionId: string) => void;
}

export const DashboardTables: React.FC<DashboardTablesProps> = ({ isLightMode = false, onNavigateToSection }) => {
  const cardBg = isLightMode ? '#FFFFFF' : '#161619';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const headingColor = isLightMode ? '#111827' : '#FFFFFF';
  const thBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)';
  const trBorder = isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)';
  const hoverBg = isLightMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)';
  const primaryText = isLightMode ? '#111827' : '#FFFFFF';
  const secondaryText = isLightMode ? '#4B5563' : '#D1D1D6';
  const mutedText = isLightMode ? '#6B7280' : '#8E8E93';
  const subMutedText = isLightMode ? '#9CA3AF' : '#71717A';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
      {/* 1. New Users Update Table */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          padding: '20px 22px',
          overflow: 'hidden',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: headingColor,
              margin: 0,
            }}
          >
            New users update
          </h2>
          <button
            onClick={() => onNavigateToSection?.('users')}
            style={{
              background: 'none',
              border: 'none',
              color: mutedText,
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            See more
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
            <thead>
              <tr style={{ borderBottom: thBorder }}>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Name</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Location</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Date joined</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>User type</th>
              </tr>
            </thead>
            <tbody>
              {NEW_USERS_DATA.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: trBorder,
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>{user.name}</div>
                        <div style={{ fontSize: '10px', color: subMutedText }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: mutedText }}>{user.location}</td>
                  <td style={{ padding: '12px', fontSize: '12px', color: mutedText }}>{user.dateJoined}</td>
                  <td style={{ padding: '12px', fontSize: '12px', color: secondaryText }}>{user.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Recent Box Update Table */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          padding: '20px 22px',
          overflow: 'hidden',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: headingColor,
              margin: 0,
            }}
          >
            Recent Box update
          </h2>
          <button
            onClick={() => onNavigateToSection?.('box_regt')}
            style={{
              background: 'none',
              border: 'none',
              color: mutedText,
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            See more
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
            <thead>
              <tr style={{ borderBottom: thBorder }}>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Box ID</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Owner</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Capacity</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Status</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Battery health</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Usage rate</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BOXES_DATA.map((box) => (
                <tr
                  key={box.id}
                  style={{
                    borderBottom: trBorder,
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>{box.boxId}</div>
                    <div style={{ fontSize: '10px', color: subMutedText }}>{box.address}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: secondaryText }}>{box.ownerName}</div>
                    <div style={{ fontSize: '10px', color: subMutedText }}>{box.ownerEmail}</div>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: mutedText }}>{box.capacity}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: box.status === 'Activated' ? '#10B981' : '#EF4444',
                        backgroundColor: box.status === 'Activated' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {box.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        color:
                          box.batteryHealth.status === 'Excellent'
                            ? '#10B981'
                            : box.batteryHealth.status === 'Good'
                            ? '#F5C842'
                            : '#EF4444',
                      }}
                    >
                      {box.batteryHealth.status} ({box.batteryHealth.percentage}%)
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: primaryText, fontWeight: 600 }}>{box.usageRate}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#F5C842' }}>
                      <Star size={12} fill="#F5C842" />
                      <span>{box.rating.toFixed(1)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Recent Inventory Update Table */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          padding: '20px 22px',
          overflow: 'hidden',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: headingColor,
              margin: 0,
            }}
          >
            Recent inventory update
          </h2>
          <button
            onClick={() => onNavigateToSection?.('inventory')}
            style={{
              background: 'none',
              border: 'none',
              color: mutedText,
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            See more
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: thBorder }}>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Item</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Model/Category</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Quantity</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Last updated</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Status</th>
                <th style={{ padding: '8px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY_DATA.map((inv) => (
                <tr
                  key={inv.id}
                  style={{
                    borderBottom: trBorder,
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>{inv.item}</div>
                    <div style={{ fontSize: '10px', color: subMutedText }}>{inv.type}</div>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: mutedText }}>{inv.modelCategory}</td>
                  <td style={{ padding: '12px', fontSize: '12px', fontWeight: 600, color: primaryText }}>{inv.quantity}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: secondaryText }}>{inv.updatedBy}</div>
                    <div style={{ fontSize: '10px', color: subMutedText }}>{inv.lastUpdated}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color:
                          inv.status === 'Available'
                            ? '#10B981'
                            : inv.status === 'In demand'
                            ? '#F5C842'
                            : '#EF4444',
                        backgroundColor:
                          inv.status === 'Available'
                            ? 'rgba(16, 185, 129, 0.1)'
                            : inv.status === 'In demand'
                            ? 'rgba(245, 200, 66, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: mutedText }}>{inv.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
