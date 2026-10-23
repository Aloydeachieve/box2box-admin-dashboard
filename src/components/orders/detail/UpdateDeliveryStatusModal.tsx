'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { OrderItemDetail } from '@/lib/ordersMockData';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface UpdateDeliveryStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: OrderItemDetail | null;
  isLightMode?: boolean;
  onUpdateStatus: (itemId: string, newStatus: 'Delivered') => void;
}

export const UpdateDeliveryStatusModal: React.FC<UpdateDeliveryStatusModalProps> = ({
  isOpen,
  onClose,
  item,
  isLightMode = false,
  onUpdateStatus,
}) => {
  // Track whether user has toggled "Delivered" checkbox
  const [isDeliveredChecked, setIsDeliveredChecked] = useState(false);
  const [isDeliveredComplete, setIsDeliveredComplete] = useState(false);

  useEffect(() => {
    if (item) {
      const alreadyDelivered = item.deliveryStatus === 'Delivered';
      setIsDeliveredComplete(alreadyDelivered);
      setIsDeliveredChecked(alreadyDelivered);
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBg = isLightMode ? '#F9FAFB' : '#1A1A1E';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const greenColor = '#10B981';
  const purpleColor = '#A855F7';

  const isDelivered = isDeliveredComplete;

  const handleApplyUpdate = () => {
    if (isDeliveredChecked && !isDeliveredComplete) {
      setIsDeliveredComplete(true);
      onUpdateStatus(item.id, 'Delivered');
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header: Update status + Close (X) */}
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

        {/* 2. Top Item Thumbnail & Status Pill Card (Matching Figma Image 4) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#E5E7EB' : '#27272A',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Image
                src={item.image || '/image/box1.png'}
                alt={item.name}
                width={40}
                height={40}
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                {item.name}
              </span>
              <span style={{ fontSize: '10.5px', color: subtextColor }}>
                {item.sku}
              </span>
              <span style={{ fontSize: '10px', color: subtextColor }}>
                {item.material}
              </span>
            </div>
          </div>

          {/* Current Status Badge Pill */}
          <div>
            {isDelivered ? (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: `1px solid ${greenColor}`,
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: greenColor,
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                Delivered
              </span>
            ) : (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: `1px solid ${purpleColor}`,
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  color: purpleColor,
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                In Transit
              </span>
            )}
          </div>
        </div>

        {/* 3. Stepper Timeline with Connecting Line (Matching Figma Image 4) */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 4px 0 4px' }}>
          {/* STEP 1: PENDING (Completed) */}
          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: yellowColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={12} color="#000000" strokeWidth={3} />
              </div>
              <div
                style={{
                  width: '2px',
                  height: '36px',
                  backgroundColor: yellowColor,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: yellowColor }}>
                Pending
              </span>
              <span style={{ fontSize: '10.5px', color: subtextColor }}>
                Chizoba Agome Jan 12, 2026 | 11:37 AM
              </span>
            </div>
          </div>

          {/* STEP 2: DISPATCHED (Completed) */}
          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: yellowColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={12} color="#000000" strokeWidth={3} />
              </div>
              <div
                style={{
                  width: '2px',
                  height: '36px',
                  backgroundColor: yellowColor,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: yellowColor }}>
                Dispatched
              </span>
              <span style={{ fontSize: '10.5px', color: subtextColor }}>
                Chizoba Agome Jan 12, 2026 | 11:37 AM
              </span>
            </div>
          </div>

          {/* STEP 3: IN TRANSIT (Completed mode carried over) */}
          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: yellowColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={12} color="#000000" strokeWidth={3} />
              </div>
              <div
                style={{
                  width: '2px',
                  height: '36px',
                  backgroundColor: isDelivered ? yellowColor : borderColor,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: yellowColor }}>
                In Transit
              </span>
              <span style={{ fontSize: '10.5px', color: subtextColor }}>
                Chizoba Agome Jan 12, 2026 | 11:37 AM
              </span>
            </div>
          </div>

          {/* STEP 4: DELIVERED (Checkbox on right, matching Figma Image 4) */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: isDelivered ? yellowColor : 'transparent',
                border: isDelivered ? `1px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              {isDelivered && <Check size={12} color="#000000" strokeWidth={3} />}
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isDelivered || isDeliveredChecked ? textColor : subtextColor,
                  }}
                >
                  Delivered
                </span>
                {isDelivered && (
                  <span style={{ fontSize: '10.5px', color: subtextColor }}>
                    Chizoba Agome Jan 12, 2026 | 11:37 AM
                  </span>
                )}
              </div>

              {/* Checkbox on the right to toggle delivered state */}
              {!isDeliveredComplete ? (
                <div
                  onClick={() => setIsDeliveredChecked(!isDeliveredChecked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: `1.5px solid ${isDeliveredChecked ? yellowColor : borderColor}`,
                    backgroundColor: isDeliveredChecked ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isDeliveredChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              ) : (
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    backgroundColor: yellowColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={13} color="#000000" strokeWidth={3} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Action Buttons (Discard & Update status) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '4px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
              border: `1px solid ${borderColor}`,
              color: textColor,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleApplyUpdate}
            disabled={!isDeliveredChecked && !isDeliveredComplete}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: isDeliveredChecked || isDeliveredComplete ? yellowColor : (isLightMode ? '#E5E7EB' : '#2A2A2E'),
              color: isDeliveredChecked || isDeliveredComplete ? '#000000' : subtextColor,
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              cursor: isDeliveredChecked || isDeliveredComplete ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span>Update status</span>
            {(isDeliveredChecked || isDeliveredComplete) && (
              <Box2BoxPulsingBadge size={14} inverted={false} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
