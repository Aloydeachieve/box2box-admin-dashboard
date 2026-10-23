'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { ReferralItem } from '@/lib/rewardsMockData';

interface ReferralsTableProps {
  isLightMode?: boolean;
  referrals: ReferralItem[];
}

export const ReferralsTable: React.FC<ReferralsTableProps> = ({
  isLightMode = false,
  referrals,
}) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: '16px',
        border: `1px solid ${borderColor}`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
      }}
    >
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Referrer</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Referred</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>User Type</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Points Earned</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: `1px solid ${borderColor}`,
                  transition: 'background-color 0.15s ease',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.03)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
              >
                {/* Referrer */}
                <td style={{ padding: '14px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src="/image/order.svg"
                        alt={item.referrer.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                        {item.referrer.name}
                      </span>
                      <span style={{ fontSize: '11px', color: subtextColor }}>
                        {item.referrer.phone}
                      </span>
                      <span style={{ fontSize: '11px', color: subtextColor }}>
                        {item.referrer.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Referred */}
                <td style={{ padding: '14px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#4B5563',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src="/image/order.svg"
                        alt={item.referred.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                        {item.referred.name}
                      </span>
                      <span style={{ fontSize: '11px', color: subtextColor }}>
                        {item.referred.phone}
                      </span>
                      <span style={{ fontSize: '11px', color: subtextColor }}>
                        {item.referred.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* User Type */}
                <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor, fontWeight: 500 }}>
                  {item.userType}
                </td>

                {/* Points Earned */}
                <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor, fontWeight: 600 }}>
                  {item.pointsEarned}
                </td>

                {/* Date */}
                <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination matching Image 3 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '8px',
          fontSize: '12px',
          color: subtextColor,
        }}
      >
        <span>1 - 100 of 5,000,045</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            disabled
            style={{
              background: 'none',
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              padding: '4px 6px',
              color: subtextColor,
              opacity: 0.5,
              cursor: 'not-allowed',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            style={{
              background: 'none',
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              padding: '4px 6px',
              color: textColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
