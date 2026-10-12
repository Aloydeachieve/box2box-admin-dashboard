'use client';

import React, { useState } from 'react';
import { X, Flag } from 'lucide-react';

interface FlagBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  boxId: string;
  isLightMode?: boolean;
  onConfirm: () => void;
}

export const FlagBoxModal: React.FC<FlagBoxModalProps> = ({
  isOpen,
  onClose,
  boxId,
  isLightMode = false,
  onConfirm,
}) => {
  const [typedKeyword, setTypedKeyword] = useState('');

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#1C1C20';

  const isKeywordMatched = typedKeyword.trim().toLowerCase() === 'flag';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isKeywordMatched) {
      onConfirm();
      setTypedKeyword('');
      onClose();
    }
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
          maxWidth: '420px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          boxShadow: isLightMode
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'scaleIn 0.2s ease-out',
          textAlign: 'center',
        }}
      >
        {/* Header with Title & Close X */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>Flag box</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Center Graphic: Red Flag */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '8px',
          }}
        >
          <Flag size={32} color="#EF4444" fill="#EF4444" />
        </div>

        {/* Form with keyword input */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            type="text"
            value={typedKeyword}
            onChange={(e) => setTypedKeyword(e.target.value)}
            placeholder='Type "flag" to continue'
            style={{
              width: '100%',
              height: '42px',
              backgroundColor: inputBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '0 14px',
              fontSize: '13px',
              color: textColor,
              outline: 'none',
              boxSizing: 'border-box',
              textAlign: 'center',
            }}
          />

          {/* Description text matching Figma Image 4 */}
          <div style={{ fontSize: '12px', color: subtextColor, lineHeight: '18px', textAlign: 'left' }}>
            <p style={{ margin: '0 0 8px 0' }}>
              Flagging marks a unit as suspicious, problematic, or needing attention without stopping its usage.
            </p>
            <p style={{ margin: 0, fontWeight: 500, color: textColor }}>
              Are you sure you want to flag this box?
            </p>
          </div>

          {/* Buttons: Cancel & Flag box */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
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
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isKeywordMatched}
              style={{
                flex: 1,
                height: '40px',
                borderRadius: '8px',
                backgroundColor: isKeywordMatched ? '#F5C842' : isLightMode ? '#E5E7EB' : '#2C2A1E',
                border: 'none',
                color: isKeywordMatched ? '#000000' : isLightMode ? '#9CA3AF' : '#8E8E93',
                fontSize: '13px',
                fontWeight: 600,
                cursor: isKeywordMatched ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s ease',
              }}
            >
              Flag box
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
