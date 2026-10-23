'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLightMode?: boolean;
  title: string;
  itemType: 'admin' | 'branch';
  itemName?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLightMode = false,
  title,
  itemType,
  itemName,
}) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputText('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isDeleteEnabled = inputText.trim().toLowerCase() === 'delete';

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const handleConfirm = () => {
    if (isDeleteEnabled) {
      onConfirm();
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
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
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header: Title & Close Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: subtextColor,
              transition: 'all 0.15s ease',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Big Red Circular X Icon (Matching Figma Image 5) */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)',
            }}
          >
            <X size={32} color="#FFFFFF" strokeWidth={3} />
          </div>
        </div>

        {/* Input Field: Type 'delete' to continue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: isLightMode ? '#F9FAFB' : 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder="Type 'delete' to continue"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: textColor,
                fontSize: '13px',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* Warning Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p
            style={{
              fontSize: '12.5px',
              color: subtextColor,
              margin: 0,
              lineHeight: '18px',
            }}
          >
            Deleting {itemName ? `"${itemName}"` : `a ${itemType}`} removes role data from the database.
          </p>
          <p
            style={{
              fontSize: '12.5px',
              color: textColor,
              fontWeight: 500,
              margin: 0,
            }}
          >
            Are you sure you want to delete this {itemType}?
          </p>
        </div>

        {/* Action Buttons: Cancel and Delete (Inactive until 'delete' is typed) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '4px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#27272A',
              color: textColor,
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!isDeleteEnabled}
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: isDeleteEnabled ? '#DC2626' : isLightMode ? '#FEE2E2' : '#3F1D1D',
              color: isDeleteEnabled ? '#FFFFFF' : isLightMode ? '#F87171' : '#7F2D2D',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: isDeleteEnabled ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              boxShadow: isDeleteEnabled ? '0 2px 8px rgba(220, 38, 38, 0.4)' : 'none',
            }}
          >
            Delete {itemType}
          </button>
        </div>
      </div>
    </div>
  );
};
