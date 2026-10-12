'use client';

import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface StockUpdatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  message?: string;
}

export const StockUpdatedModal: React.FC<StockUpdatedModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  message = 'Item returned to stock successfully',
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 120,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '320px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'fadeIn 0.2s ease-out',
          position: 'relative',
        }}
      >
        {/* Top Header Row with Title and Close Button */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
            Stock updated
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Big Teal Checkmark Icon matching Image 5 box 5 */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#008080',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '8px 0 4px 0',
            boxShadow: '0 8px 20px rgba(0, 128, 128, 0.35)',
          }}
        >
          <Check size={32} color="#FFFFFF" strokeWidth={3} />
        </div>

        {/* Status Message */}
        <div
          style={{
            fontSize: '12px',
            color: subtextColor,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
};
