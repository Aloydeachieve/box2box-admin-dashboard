'use client';

import React from 'react';
import { Mail } from 'lucide-react';

interface OrderBuyerDeliveryCardsProps {
  isLightMode?: boolean;
  onSendEmail?: () => void;
}

export const OrderBuyerDeliveryCards: React.FC<OrderBuyerDeliveryCardsProps> = ({
  isLightMode = false,
  onSendEmail,
}) => {
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '20px',
        width: '100%',
      }}
    >
      {/* CARD 1: Buyer Information */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            Buyer Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: subtextColor }}>Name</span>
              <span style={{ color: textColor, fontWeight: 600 }}>Aku Cynthia</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: subtextColor }}>Phone</span>
              <span style={{ color: textColor, fontWeight: 500 }}>+234 801 234 5678</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: subtextColor }}>Email</span>
              <a
                href="mailto:akucynthia@gmail.com"
                style={{
                  color: textColor,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                akucynthia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Send Email Action Button */}
        <div>
          <button
            type="button"
            onClick={onSendEmail}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: `1px solid ${yellowColor}`,
              color: yellowColor,
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 200, 66, 0.1)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Mail size={14} color={yellowColor} />
            <span>Send email</span>
          </button>
        </div>
      </div>

      {/* CARD 2: Delivery information */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
          }}
        >
          Delivery information
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>Address</span>
            <span style={{ color: textColor, fontWeight: 600, textAlign: 'right' }}>
              24 Okoli Street, Independence layout
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>Country</span>
            <span style={{ color: textColor, fontWeight: 500 }}>Nigeria</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>State</span>
            <span style={{ color: textColor, fontWeight: 500 }}>Anambra</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>Area</span>
            <span style={{ color: textColor, fontWeight: 500 }}>Awka</span>
          </div>
        </div>
      </div>
    </div>
  );
};
