'use client';

import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { OrderItemDetail } from '@/lib/ordersMockData';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface RefundOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItemDetail[];
  isLightMode?: boolean;
  onConfirmRefund: (refundAmount: number, refundedCount: number) => void;
}

export const RefundOrderModal: React.FC<RefundOrderModalProps> = ({
  isOpen,
  onClose,
  items,
  isLightMode = false,
  onConfirmRefund,
}) => {
  // Pre-select items that are eligible for refund (e.g. Charger and Battery with status 'Pending')
  const [checkedIds, setCheckedIds] = useState<string[]>(['item-2', 'item-4']);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const tableHeaderBg = isLightMode ? '#F9FAFB' : '#1A1A1E';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const purpleColor = '#A855F7';
  const greenColor = '#10B981';
  const redColor = '#EF4444';

  const toggleItem = (id: string, canRefund: boolean) => {
    if (!canRefund) return;
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((i) => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  // Calculate subtotal of selected refundable items
  const subtotal = checkedIds.reduce((sum, id) => {
    const it = items.find((item) => item.id === id);
    return sum + (it?.price || 0);
  }, 0);

  const maxRefundable = 1000;

  const handleRefundSubmit = () => {
    onConfirmRefund(subtotal, checkedIds.length);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 60,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Title + Close (X) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
            Refund order
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
              border: `1px solid ${borderColor}`,
              color: subtextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Table List matching Figma Image 4 */}
        <div
          style={{
            borderRadius: '10px',
            border: `1px solid ${borderColor}`,
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: tableHeaderBg, borderBottom: `1px solid ${borderColor}` }}>
                <th style={{ width: '36px', padding: '10px 14px' }} />
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Item
                </th>
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Assigned Inventory
                </th>
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Current status
                </th>
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                // In Transit and Delivered cannot be refunded; Pending can be refunded
                const canRefund = item.deliveryStatus === 'Pending';
                const isChecked = checkedIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: index < items.length - 1 ? `1px solid ${borderColor}` : 'none',
                      fontSize: '12px',
                    }}
                  >
                    {/* Checkbox */}
                    <td style={{ padding: '12px 14px' }}>
                      <div
                        onClick={() => toggleItem(item.id, canRefund)}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: `1.5px solid ${isChecked ? yellowColor : borderColor}`,
                          backgroundColor: isChecked ? yellowColor : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: canRefund ? 'pointer' : 'not-allowed',
                          opacity: canRefund ? 1 : 0.35,
                        }}
                      >
                        {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                      </div>
                    </td>

                    {/* Item */}
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: textColor }}>
                      {item.name}
                    </td>

                    {/* Assigned inventory */}
                    <td style={{ padding: '12px 14px', color: item.inventoryId !== '-' ? textColor : subtextColor }}>
                      {item.inventoryId}
                    </td>

                    {/* Current status */}
                    <td style={{ padding: '12px 14px' }}>
                      {item.deliveryStatus === 'In Transit' ? (
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '12px',
                            border: `1px solid ${purpleColor}`,
                            backgroundColor: 'rgba(168, 85, 247, 0.1)',
                            color: purpleColor,
                            fontSize: '10.5px',
                            fontWeight: 600,
                          }}
                        >
                          In Transit
                        </span>
                      ) : item.deliveryStatus === 'Delivered' ? (
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '12px',
                            border: `1px solid ${greenColor}`,
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: greenColor,
                            fontSize: '10.5px',
                            fontWeight: 600,
                          }}
                        >
                          Delivered
                        </span>
                      ) : (
                        <span style={{ color: subtextColor, fontSize: '11px' }}>
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Result */}
                    <td style={{ padding: '12px 14px' }}>
                      {canRefund ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <AlertCircle size={13} color={yellowColor} />
                          <span style={{ color: yellowColor, fontSize: '11px', fontWeight: 600 }}>
                            Can be refunded
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <AlertCircle size={13} color="#71717A" />
                          <span style={{ color: '#71717A', fontSize: '11px', fontWeight: 500 }}>
                            Cannot be refunded
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Refund summary Card matching Figma Image 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
            Refund summary
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: subtextColor }}>Subtotal (Selected items)</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: subtextColor }}>Maximum refundable amount (Amount paid)</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                ₦{maxRefundable.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Row matching Figma Image 4 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
            {checkedIds.length} Selected
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#FFFFFF',
                border: 'none',
                color: '#111827',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Discard
            </button>

            <button
              type="button"
              onClick={handleRefundSubmit}
              disabled={checkedIds.length === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 24px',
                borderRadius: '8px',
                backgroundColor: yellowColor,
                color: '#000000',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                cursor: checkedIds.length > 0 ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              }}
            >
              <span>Refund</span>
              <Box2BoxPulsingBadge size={16} inverted={false} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
