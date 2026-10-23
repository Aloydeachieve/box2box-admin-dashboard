'use client';

import React, { useState } from 'react';
import { initialPaymentSchedule, PaymentScheduleItem } from '@/lib/ordersMockData';

interface OrderPaymentSummarySectionProps {
  isLightMode?: boolean;
}

export const OrderPaymentSummarySection: React.FC<OrderPaymentSummarySectionProps> = ({
  isLightMode = false,
}) => {
  const [payments] = useState<PaymentScheduleItem[]>(initialPaymentSchedule);

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
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
        Payment summary
      </h3>

      {/* Table */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Payment</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Amount</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Payment source</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Due Date</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Paid Date</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Txn ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => {
              const isPaid = p.status === 'Paid';
              return (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#19191D')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <td style={{ padding: '14px 14px', fontSize: '12px', fontWeight: 600, color: textColor }}>
                    {p.paymentLabel}
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                    {p.amount}
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: '12px', color: subtextColor }}>
                    {p.paymentSource}
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: '12px', color: subtextColor }}>
                    {p.dueDate}
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: '12px', color: subtextColor }}>
                    {p.paidDate}
                  </td>
                  <td style={{ padding: '14px 14px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: isPaid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                        color: isPaid ? '#10B981' : subtextColor,
                        display: 'inline-block',
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: '12px', color: subtextColor }}>
                    {p.txnId}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Badges matching Figma Image 5 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '6px',
          flexWrap: 'wrap',
        }}
      >
        {/* Total Amount */}
        <div
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            backgroundColor: isLightMode ? '#F3F4F6' : 'transparent',
            border: `1px solid ${borderColor}`,
            fontSize: '11.5px',
            color: subtextColor,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>Total Amount</span>
          <span style={{ color: textColor, fontWeight: 700 }}>₦150,000</span>
        </div>

        {/* Amount Paid */}
        <div
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            fontSize: '11.5px',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 600,
          }}
        >
          <span>Amount Paid</span>
          <span style={{ fontWeight: 700 }}>₦150,000</span>
        </div>

        {/* Unpaid Balance */}
        <div
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #F5C842',
            backgroundColor: 'rgba(245, 200, 66, 0.08)',
            fontSize: '11.5px',
            color: '#F5C842',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 600,
          }}
        >
          <span>Unpaid Balance</span>
          <span style={{ fontWeight: 700 }}>₦150,000</span>
        </div>
      </div>
    </div>
  );
};
