'use client';

import React from 'react';
import { X, RefreshCw } from 'lucide-react';

interface UpdateBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  boxId?: string;
  isLightMode?: boolean;
  onUpdate?: () => void;
}

export const UpdateBoxModal: React.FC<UpdateBoxModalProps> = ({
  isOpen,
  onClose,
  boxId = 'MyBox-123456',
  isLightMode = false,
  onUpdate,
}) => {
  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const modalBg = isLightMode ? '#FFFFFF' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  const handleConfirmUpdate = () => {
    onUpdate?.();
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
          maxWidth: '420px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          fontFamily: 'Rubik, var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
            Update Box
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: subtextColor, margin: 0, lineHeight: '22px' }}>
          Updating a box will sync the latest updates to the box
        </p>

        {/* Cancel and Update buttons side by side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#2A2A30',
              border: 'none',
              color: textColor,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmUpdate}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '8px',
              backgroundColor: '#F5C842',
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
