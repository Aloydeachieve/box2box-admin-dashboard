'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface StockThresholdModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onSave?: (threshold: number) => void;
}

export const StockThresholdModal: React.FC<StockThresholdModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onSave,
}) => {
  const [thresholdValue, setThresholdValue] = useState<number>(10);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#1C1C20';

  const handleSave = () => {
    onSave?.(thresholdValue);
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
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '380px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isLightMode
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'scaleIn 0.2s ease-out',
        }}
      >
        {/* Header: Title bolder + cancel button on same inline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
            Stock threshold
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Description / Sublabel */}
        <div style={{ marginTop: '4px' }}>
          <div style={{ fontSize: '13px', color: textColor, fontWeight: 500, marginBottom: '8px' }}>
            Stock threshold
          </div>
          <input
            type="number"
            value={thresholdValue}
            onChange={(e) => setThresholdValue(Number(e.target.value))}
            style={{
              width: '100%',
              height: '42px',
              backgroundColor: inputBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '0 14px',
              fontSize: '14px',
              fontWeight: 600,
              color: textColor,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Action Buttons: Discard & Save */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              height: '40px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              color: textColor,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#F5C842',
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
