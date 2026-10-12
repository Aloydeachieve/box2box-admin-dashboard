'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ReturnToStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  boxId?: string;
  onConfirmReturn: (reason: string) => void;
}

export const ReturnToStockModal: React.FC<ReturnToStockModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  boxId = 'MyBox-123456',
  onConfirmReturn,
}) => {
  const [reason, setReason] = useState('');
  const maxLength = 150;

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#1A1A1E';

  const isReasonProvided = reason.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReasonProvided) return;
    onConfirmReturn(reason);
    setReason('');
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '380px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Header: Title + Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: textColor, margin: 0 }}>
            Return item to stock
          </h3>
          <button
            onClick={handleClose}
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

        {/* Textarea Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <textarea
              placeholder="Enter reason for return"
              value={reason}
              maxLength={maxLength}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                backgroundColor: inputBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '10px',
                padding: '12px',
                fontSize: '13px',
                color: textColor,
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
            {/* Character Counter */}
            <div
              style={{
                fontSize: '11px',
                color: subtextColor,
                marginTop: '4px',
              }}
            >
              {reason.length}/{maxLength}
            </div>
          </div>

          {/* Subtext description matching Image 5 box 3 & 4 */}
          <div style={{ fontSize: '11px', color: subtextColor, lineHeight: '16px' }}>
            By returning item to stock, this box would be available for re-sale
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                color: textColor,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isReasonProvided}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isReasonProvided ? '#F5C842' : (isLightMode ? '#E5E7EB' : '#332E20'),
                color: isReasonProvided ? '#111827' : '#716A54',
                fontSize: '12px',
                fontWeight: 700,
                cursor: isReasonProvided ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              Return to stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
