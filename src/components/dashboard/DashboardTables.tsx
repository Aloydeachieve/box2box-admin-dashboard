'use client';

import React from 'react';
import {
  NEW_USERS_DATA,
  RECENT_BOXES_DATA,
  INVENTORY_DATA,
} from '@/lib/dashboardMockData';
import { Star } from 'lucide-react';

interface DashboardTablesProps {
  isLightMode?: boolean;
  onNavigateToSection?: (sectionId: string) => void;
}

export const DashboardTables: React.FC<DashboardTablesProps> = ({ isLightMode = false, onNavigateToSection }) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const headingColor = isLightMode ? '#111827' : '#FFFFFF';
  const thBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)';
  const trBorder = isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)';
  const hoverBg = isLightMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)';
  const primaryText = isLightMode ? '#111827' : '#FFFFFF';
  const secondaryText = isLightMode ? '#4B5563' : '#E5E7EB';
  const mutedText = isLightMode ? '#6B7280' : '#8E8E93';
  const subMutedText = isLightMode ? '#9CA3AF' : '#71717A';

  const getBatteryBadgeStyle = (status: string) => {
    switch (status) {
      case 'Excellent':
        return {
          color: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
      case 'Good':
        return {
          color: '#84CC16',
          backgroundColor: 'rgba(132, 204, 22, 0.12)',
          border: '1px solid rgba(132, 204, 22, 0.3)',
        };
      case 'Fair':
        return {
          color: '#F5C842',
          backgroundColor: 'rgba(245, 200, 66, 0.12)',
          border: '1px solid rgba(245, 200, 66, 0.3)',
        };
      case 'Poor':
        return {
          color: '#F97316',
          backgroundColor: 'rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
        };
      case 'Critical':
        return {
          color: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      default:
        return {
          color: '#71717A',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        };
    }
  };

  const getInventoryStatusStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return {
          color: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
      case 'Discontinued':
        return {
          color: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      case 'Out of stock':
        return {
          color: '#F59E0B',
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        };
      default:
        return {
          color: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
      {/* 1. New Users Update Table */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          overflow: 'hidden',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Table Title Row (Interactive Giant Button taking to /users) */}
        <div
          onClick={() => onNavigateToSection?.('users')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: thBorder,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
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
          <span
            style={{
              color: mutedText,
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            See more
          </span>
        </div>

        <div style={{ overflowX: 'auto', padding: '0 8px 8px 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: thBorder }}>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Name</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Location</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Date joined</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>User type</th>
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
                  {/* Name: Avatar, Name (underlined), Phone, Email stacked vertically */}
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: primaryText,
                            textDecoration: 'underline',
                          }}
                        >
                          {user.name}
                        </span>
                        <span style={{ fontSize: '10px', color: '#A0A0A5' }}>{user.phone || '08155724568'}</span>
                        <span style={{ fontSize: '10px', color: subMutedText }}>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  {/* Location: Light white text matching Figma */}
                  <td style={{ padding: '12px', fontSize: '12px', color: secondaryText }}>{user.location}</td>
                  {/* Date joined: Date in light white with time stamp underneath */}
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: secondaryText }}>{user.dateJoined}</div>
                    <div style={{ fontSize: '10px', color: subMutedText, marginTop: '2px' }}>{user.timeJoined || '11:55 AM'}</div>
                  </td>
                  {/* User type */}
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
          overflow: 'hidden',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Table Title Row (Interactive Giant Button taking to /box-management) */}
        <div
          onClick={() => onNavigateToSection?.('boxes')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: thBorder,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
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
          <span
            style={{
              color: mutedText,
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            See more
          </span>
        </div>

        <div style={{ overflowX: 'auto', padding: '0 8px 8px 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ borderBottom: thBorder }}>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Box ID</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Owner</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Capacity</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Status</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Battery health</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Usage rate</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BOXES_DATA.map((box) => {
                const batteryStyle = getBatteryBadgeStyle(box.batteryHealth.status);
                const isActivated = box.status === 'Activated';

                return (
                  <tr
                    key={box.id}
                    style={{
                      borderBottom: trBorder,
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Box ID (underlined) + Address */}
                    <td style={{ padding: '12px' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: primaryText,
                          textDecoration: 'underline',
                        }}
                      >
                        {box.boxId}
                      </div>
                      <div style={{ fontSize: '10px', color: subMutedText, marginTop: '2px' }}>{box.address}</div>
                    </td>
                    {/* Owner (underlined) + Email */}
                    <td style={{ padding: '12px' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          color: secondaryText,
                          fontWeight: 500,
                          textDecoration: 'underline',
                        }}
                      >
                        {box.ownerName}
                      </div>
                      <div style={{ fontSize: '10px', color: subMutedText, marginTop: '2px' }}>{box.ownerEmail}</div>
                    </td>
                    {/* Capacity */}
                    <td style={{ padding: '12px', fontSize: '12px', color: secondaryText }}>{box.capacity}</td>
                    {/* Status (pill badge) */}
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: isActivated ? '#10B981' : '#EF4444',
                          backgroundColor: isActivated ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          border: isActivated ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          display: 'inline-block',
                        }}
                      >
                        {box.status}
                      </span>
                    </td>
                    {/* Battery health inside a colored pill badge card matching Figma */}
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: batteryStyle.color,
                          backgroundColor: batteryStyle.backgroundColor,
                          border: batteryStyle.border,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          display: 'inline-block',
                        }}
                      >
                        {box.batteryHealth.status} ({box.batteryHealth.percentage}%)
                      </span>
                    </td>
                    {/* Usage rate */}
                    <td style={{ padding: '12px', fontSize: '12px', color: secondaryText, fontWeight: 500 }}>
                      {box.usageRate}
                    </td>
                    {/* Rating */}
                    <td style={{ padding: '12px', fontSize: '12px', color: primaryText, fontWeight: 500 }}>
                      {box.rating.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
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
          overflow: 'hidden',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Table Title Row (Interactive Giant Button taking to /inventory) */}
        <div
          onClick={() => onNavigateToSection?.('inventory')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: thBorder,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
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
          <span
            style={{
              color: mutedText,
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            See more
          </span>
        </div>

        <div style={{ overflowX: 'auto', padding: '0 8px 8px 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ borderBottom: thBorder }}>
                {/* Column named "Stock" with image + item name + description matching Figma */}
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Stock</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Model/Category</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Quantity</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Last updated</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Status</th>
                <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 500 }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY_DATA.map((inv) => {
                const statusStyle = getInventoryStatusStyle(inv.status);

                return (
                  <tr
                    key={inv.id}
                    style={{
                      borderBottom: trBorder,
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Stock: Thumbnail image + Item Name + Item Type Description */}
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: isLightMode ? '#F3F4F6' : '#1C1C20',
                            border: `1px solid ${isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={inv.image || '/image/box1.png'}
                            alt={inv.item}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>{inv.item}</div>
                          <div style={{ fontSize: '10px', color: subMutedText, marginTop: '2px' }}>{inv.type}</div>
                        </div>
                      </div>
                    </td>
                    {/* Model/Category */}
                    <td style={{ padding: '12px', fontSize: '12px', color: secondaryText }}>{inv.modelCategory}</td>
                    {/* Quantity */}
                    <td style={{ padding: '12px', fontSize: '12px', fontWeight: 600, color: primaryText }}>
                      {inv.quantity}
                    </td>
                    {/* Last updated: Updated by on top, date/time stamp underneath */}
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '12px', color: secondaryText, fontWeight: 500 }}>{inv.updatedBy}</div>
                      <div style={{ fontSize: '10px', color: subMutedText, marginTop: '2px' }}>{inv.lastUpdated}</div>
                    </td>
                    {/* Status pill badge */}
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: statusStyle.color,
                          backgroundColor: statusStyle.backgroundColor,
                          border: statusStyle.border,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          display: 'inline-block',
                        }}
                      >
                        {inv.status}
                      </span>
                    </td>
                    {/* Location in clean light white */}
                    <td style={{ padding: '12px', fontSize: '12px', color: secondaryText }}>{inv.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
