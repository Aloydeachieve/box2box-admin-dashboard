'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { OrderItemDetail } from '@/lib/ordersMockData';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface BatchUpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: OrderItemDetail[];
  isLightMode?: boolean;
  onConfirmUpdate: (updatedIds: string[]) => void;
}

export const BatchUpdateStatusModal: React.FC<BatchUpdateStatusModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  isLightMode = false,
  onConfirmUpdate,
}) => {
  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const tableHeaderBg = isLightMode ? '#F9FAFB' : '#1A1A1E';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const greenColor = '#10B981';
  const purpleColor = '#A855F7';
  const orangeColor = '#F59E0B';

  // Items eligible for update to 'Delivered' (must have assigned inventory)
  const eligibleItems = selectedItems.filter((i) => i.inventoryId && i.inventoryId !== '-');

  const handleConfirm = () => {
    onConfirmUpdate(eligibleItems.map((i) => i.id));
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
            Update status
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

        {/* Table List matching Figma Image 3 */}
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
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Item
                </th>
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Assigned inventory
                </th>
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Current status
                </th>
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Next status
                </th>
                <th style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: subtextColor }}>
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => {
                const hasInventory = item.inventoryId && item.inventoryId !== '-';
                const willUpdate = hasInventory;
                const nextStatus = hasInventory ? 'Delivered' : item.deliveryStatus;

                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: index < selectedItems.length - 1 ? `1px solid ${borderColor}` : 'none',
                      fontSize: '12px',
                    }}
                  >
                    {/* Item */}
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: textColor }}>
                      {item.name}
                    </td>

                    {/* Assigned inventory */}
                    <td style={{ padding: '12px 14px', color: hasInventory ? textColor : subtextColor }}>
                      {hasInventory ? item.inventoryId : '-'}
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

                    {/* Next status */}
                    <td style={{ padding: '12px 14px' }}>
                      <span
                        style={{
                          color: hasInventory ? greenColor : subtextColor,
                          fontWeight: hasInventory ? 600 : 500,
                          fontSize: '11px',
                        }}
                      >
                        {nextStatus}
                      </span>
                    </td>

                    {/* Result */}
                    <td style={{ padding: '12px 14px' }}>
                      {willUpdate ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: greenColor,
                            }}
                          />
                          <span style={{ color: greenColor, fontSize: '11px', fontWeight: 600 }}>
                            Will be updated
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              border: `1px solid ${orangeColor}`,
                            }}
                          />
                          <span style={{ color: orangeColor, fontSize: '11px', fontWeight: 500 }}>
                            Inventory not assigned
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

        {/* Footer Row matching Figma Image 3 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
            {selectedItems.length} Selected
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                border: `1px solid ${borderColor}`,
                color: textColor,
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Discard
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '8px',
                backgroundColor: yellowColor,
                color: '#000000',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              }}
            >
              <span>Confirm update</span>
              <Box2BoxPulsingBadge size={14} inverted={false} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
